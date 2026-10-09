// Mounts the Ground on every <canvas data-sh-ground>. Vanilla WebGL, no library.
// Colours come from the design-system tokens on :root, so day and night both
// work and a token change trickles down. The text block inside the host
// ([data-sh-shield], else the container) is passed to the shader, which thins
// the strokes under it. Off under reduced motion (one still frame), paused
// when off-screen or the tab is hidden, hidden when WebGL fails or the context is lost.
import frag from '../../design-system/ground.frag?raw';

const VERT = 'attribute vec2 a;void main(){gl_Position=vec4(a,0.0,1.0);}';
const FPS = 30;

type Variant = 'paper' | 'deep';

const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
const dark = window.matchMedia('(prefers-color-scheme: dark)');

function token(name: string): [number, number, number] {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const hex = raw.startsWith('#') ? raw.slice(1) : '000000';
  const full = hex.length === 3 ? hex.replace(/./g, (ch) => ch + ch) : hex;
  const n = parseInt(full.slice(0, 6), 16);
  return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
}

function palette(variant: Variant) {
  return {
    u_ground: token(variant === 'deep' ? '--deep' : '--paper'),
    u_stroke: token(variant === 'deep' ? '--on-deep' : '--ink'),
    u_heart: token('--heart'),
  };
}

/** The union of the shield element's children, in the canvas's centred, y-up CSS px. */
function shieldRect(canvas: HTMLCanvasElement): [number, number, number, number] {
  const host = canvas.parentElement;
  const el =
    host?.querySelector<HTMLElement>('[data-sh-shield]') ??
    host?.querySelector<HTMLElement>('.sh-container');
  if (!el) return [0, 0, 0, 0];
  const items = el.children.length ? [...el.children] : [el];
  let left = Infinity,
    top = Infinity,
    right = -Infinity,
    bottom = -Infinity;
  for (const child of items) {
    const r = child.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    left = Math.min(left, r.left);
    top = Math.min(top, r.top);
    right = Math.max(right, r.right);
    bottom = Math.max(bottom, r.bottom);
  }
  if (right <= left) return [0, 0, 0, 0];
  const c = canvas.getBoundingClientRect();
  const w = c.width,
    h = c.height;
  return [
    left - c.left - w / 2,
    c.bottom - bottom - h / 2,
    right - c.left - w / 2,
    c.bottom - top - h / 2,
  ];
}

function mount(canvas: HTMLCanvasElement) {
  const variant: Variant = canvas.dataset.shGround === 'deep' ? 'deep' : 'paper';
  const gl = canvas.getContext('webgl', { antialias: false, alpha: false, depth: false });
  if (!gl) {
    canvas.hidden = true;
    return;
  }

  const compile = (type: number, src: string) => {
    const shader = gl.createShader(type)!;
    gl.shaderSource(shader, src);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS))
      throw new Error(gl.getShaderInfoLog(shader) ?? 'shader');
    return shader;
  };

  let program: WebGLProgram;
  try {
    program = gl.createProgram()!;
    gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(program, compile(gl.FRAGMENT_SHADER, frag));
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('link');
  } catch {
    canvas.hidden = true;
    return;
  }
  gl.useProgram(program);

  gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const a = gl.getAttribLocation(program, 'a');
  gl.enableVertexAttribArray(a);
  gl.vertexAttribPointer(a, 2, gl.FLOAT, false, 0, 0);

  const loc = (name: string) => gl.getUniformLocation(program, name);
  const uRes = loc('u_res');
  const uDpr = loc('u_dpr');
  const uTime = loc('u_time');
  const uShield = loc('u_shield');
  const uGather = loc('u_gather');

  // A thank-you ([data-sh-gather]) that the URL points at makes this Ground gather once.
  const thanks = canvas.parentElement?.querySelector<HTMLElement>('[data-sh-gather]');
  let gatherFrom = -1;
  const checkGather = () => {
    gatherFrom = thanks?.matches(':target') ? performance.now() : -1;
  };
  checkGather();

  const applyPalette = () => {
    for (const [name, rgb] of Object.entries(palette(variant))) gl.uniform3fv(loc(name), rgb);
  };

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    const w = Math.max(1, Math.round(canvas.clientWidth * dpr));
    const h = Math.max(1, Math.round(canvas.clientHeight * dpr));
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }
    gl.viewport(0, 0, w, h);
    gl.uniform2f(uRes, w, h);
    gl.uniform1f(uDpr, dpr);
    gl.uniform4fv(uShield, shieldRect(canvas));
  };

  const start = performance.now();
  const draw = () => {
    if (gl.isContextLost()) return;
    gl.uniform1f(uTime, motion.matches ? 7 : (performance.now() - start) / 1000);
    // Under reduced motion a gathered Ground is one still frame with every mark assembled.
    const gather = gatherFrom < 0 ? -1 : motion.matches ? 3 : (performance.now() - gatherFrom) / 1000;
    gl.uniform1f(uGather, gather);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  let visible = false;
  let frame = 0;
  let last = 0;
  const loop = (now: number) => {
    frame = 0;
    if (!visible || document.hidden || motion.matches || canvas.hidden) return;
    if (now - last >= 1000 / FPS) {
      last = now;
      draw();
    }
    frame = requestAnimationFrame(loop);
  };
  const wake = () => {
    if (!frame) frame = requestAnimationFrame(loop);
  };
  const still = () => {
    if (canvas.hidden || gl.isContextLost()) return;
    resize();
    applyPalette();
    draw();
    wake();
  };

  canvas.addEventListener('webglcontextlost', () => {
    canvas.hidden = true;
    visible = false;
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
  });

  const ro = new ResizeObserver(still);
  ro.observe(canvas);
  const shield =
    canvas.parentElement?.querySelector('[data-sh-shield]') ??
    canvas.parentElement?.querySelector('.sh-container');
  if (shield) ro.observe(shield);
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (visible && !canvas.hidden) wake();
  }).observe(canvas);
  document.addEventListener('visibilitychange', wake);
  window.addEventListener('hashchange', () => {
    checkGather();
    still();
  });
  motion.addEventListener('change', still);
  dark.addEventListener('change', still);
  new MutationObserver(still).observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['data-theme'],
  });
  document.fonts?.ready.then(still);

  still();
}

for (const canvas of document.querySelectorAll<HTMLCanvasElement>('canvas[data-sh-ground]'))
  mount(canvas);
