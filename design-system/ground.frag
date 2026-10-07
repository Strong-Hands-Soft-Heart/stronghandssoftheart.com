// Strong Hands, Soft Heart — the Ground.
// The mark's geometry as a quiet ground: a grid of diamond outlines with their
// equators, drifting and breathing; one horizon line; air above, earth below;
// a trace of sun. Every colour is a token passed in by the page, so day and
// night both work. Alphas are capped so text keeps its contrast on top.
// Source of truth: the SH&SH design system, components/ground.frag.
precision mediump float;

uniform vec2 u_res;      // canvas size in device pixels
uniform float u_dpr;     // device pixels per CSS pixel
uniform float u_time;    // seconds; the page passes 0 under reduced motion
uniform vec3 u_ground;   // paper, or air-deep on the deep surface
uniform vec3 u_stroke;   // ink, or on-air-deep
uniform vec3 u_accent;   // earth: the horizon
uniform vec3 u_air;      // air: the wash above the horizon, the seal's top
uniform vec3 u_earth;    // earth: the wash below, the seal's bottom
uniform vec3 u_sun;      // sun: the glow, never more than 5%

float hash(vec2 id) {
  return fract(sin(dot(id, vec2(127.1, 311.7))) * 43758.5453);
}

// 1px line at distance d (CSS px), antialiased.
float line(float d) {
  return 1.0 - smoothstep(0.5, 1.5, d);
}

void main() {
  vec2 size = u_res / u_dpr;
  vec2 c = gl_FragCoord.xy / u_dpr - 0.5 * size;   // CSS px, centred, y up
  float t = u_time;

  // The horizon: the mark's equator, a little below centre, breathing.
  float h = -0.06 * size.y + 6.0 * sin(t * 0.12);

  vec3 col = u_ground;

  // Washes: air above, earth below. Faint.
  float above = smoothstep(h, h + 0.7 * size.y, c.y);
  float below = 1.0 - smoothstep(h - 0.7 * size.y, h, c.y);
  col = mix(col, u_air, 0.06 * above);
  col = mix(col, u_earth, 0.06 * below);

  // A trace of sun above the horizon, drifting.
  vec2 sunC = vec2(-0.25 * size.x + 40.0 * sin(t * 0.07), h + 0.22 * size.y);
  float glow = exp(-length(c - sunC) / (0.35 * size.y));
  col = mix(col, u_sun, 0.05 * glow);

  // The grid: diamonds at a 96px pitch (space-24), drifting 2px a second.
  float s = 96.0;
  vec2 g = c + vec2(t * 2.0, 0.0);
  vec2 id = floor(g / s);
  vec2 p = mod(g, s) - 0.5 * s;
  float r = 0.5 * s * 0.78;
  float n = hash(id);
  float breath = 0.5 + 0.5 * sin(t * 0.25 + n * 6.2832);

  // Every ~14th cell is the seal: air above its equator, earth below, faint.
  float seal = step(0.93, n);
  float inside = 1.0 - smoothstep(-1.0, 1.0, abs(p.x) + abs(p.y) - r);
  col = mix(col, u_air, 0.10 * seal * inside * step(0.0, p.y) * breath);
  col = mix(col, u_earth, 0.10 * seal * inside * step(p.y, 0.0) * breath);

  // Outline, and the equator in about half the cells.
  float a = line(abs(abs(p.x) + abs(p.y) - r)) * mix(0.05, 0.14, breath);
  float eq = line(abs(p.y)) * step(abs(p.x), r) * step(0.45, n);
  a = max(a, eq * mix(0.04, 0.10, breath));
  col = mix(col, u_stroke, a);

  // The horizon line, in earth.
  col = mix(col, u_accent, 0.35 * line(abs(c.y - h)));

  gl_FragColor = vec4(col, 1.0);
}
