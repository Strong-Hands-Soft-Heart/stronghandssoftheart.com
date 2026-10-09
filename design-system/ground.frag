// Strong Hands, Soft Heart — the Ground, second cut: entropy.
// Forty loose strokes drift in chaos. In eight places, on staggered cycles,
// five of them swing into line and assemble the mark: four edges in ink, the
// equator in strawberry. The mark holds, then dissolves back into the drift,
// and the next one forms. Every colour is a token the page passes in. The
// ground thins itself inside the text block (u_shield) so text keeps contrast.
// On a thank-you the page asks every mark to gather at once (u_gather).
// Source of truth: the SH&SH design system, components/ground.frag.
precision mediump float;

uniform vec2 u_res;      // canvas size in device pixels
uniform float u_dpr;     // device pixels per CSS pixel
uniform float u_time;    // seconds; the page passes 0 under reduced motion
uniform vec3 u_ground;   // paper, or deep
uniform vec3 u_stroke;   // ink, or on-deep
uniform vec3 u_heart;    // heart: the equator of an assembled mark
uniform vec4 u_shield;   // the text block, CSS px, centred, y up: x0 y0 x1 y1; x1 <= x0 means none
uniform float u_gather;  // seconds since a thank-you asked the ground to gather; < 0 means it has not

const int STROKES = 40;  // 8 marks × 5 strokes
const float CYCLE = 18.0;
const float R = 44.0;    // half-diagonal of an assembled mark, CSS px

float hash(float n) { return fract(sin(n * 127.1) * 43758.5453); }
float hash2(float n) { return fract(sin(n * 311.7 + 1.3) * 26137.1917); }

float sdSegment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  float t = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
  return length(pa - ba * t);
}

// Vertex k of a diamond centred at c: 0 top, 1 right, 2 bottom, 3 left.
vec2 vert(vec2 c, int k) {
  if (k == 0) return c + vec2(0.0, R);
  if (k == 1) return c + vec2(R, 0.0);
  if (k == 2) return c + vec2(0.0, -R);
  return c + vec2(-R, 0.0);
}

void main() {
  vec2 size = u_res / u_dpr;
  vec2 c = gl_FragCoord.xy / u_dpr - 0.5 * size;   // CSS px, centred, y up
  float t = u_time;

  // The text shield: strokes fade to 25% inside the block, over a 48px margin.
  float shield = 1.0;
  if (u_shield.z > u_shield.x) {
    vec2 d = max(u_shield.xy - c, c - u_shield.zw);
    float edge = length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
    shield = mix(0.25, 1.0, smoothstep(0.0, 48.0, edge));
  }

  vec3 col = u_ground;

  for (int i = 0; i < STROKES; i++) {
    float fi = float(i);
    int m = i / 5;          // which mark
    int e = i - m * 5;      // which stroke of it: 0..3 edges, 4 equator
    float fm = float(m);

    // Where this mark assembles: spread across the canvas, away from the edges.
    vec2 centre = vec2(
      (hash(fm + 7.0) * 0.84 - 0.42) * size.x,
      (hash2(fm + 7.0) * 0.76 - 0.38) * size.y);

    // Order envelope: chaos, assemble over 3s, hold 6s, dissolve over 3s.
    float cyc = mod(t + hash(fm + 3.0) * CYCLE, CYCLE);
    float s = smoothstep(2.0, 5.0, cyc) * (1.0 - smoothstep(11.0, 14.0, cyc));

    // Gather: on a thank-you, every mark assembles at once in a quick cascade,
    // holds, and lets go back into the drift.
    if (u_gather >= 0.0) {
      float g = u_gather - hash(fm + 5.0) * 1.2;
      s = max(s, smoothstep(0.0, 1.6, g) * (1.0 - smoothstep(7.0, 10.0, g)));
    }

    // Ordered endpoints: an edge of the diamond, or its equator.
    vec2 o0, o1;
    if (e == 4) { o0 = vert(centre, 3); o1 = vert(centre, 1); }
    else { o0 = vert(centre, e); o1 = vert(centre, e + 1 == 4 ? 0 : e + 1); }

    // Chaos endpoints: a slow wander around the mark's place, turning.
    float h1 = hash(fi + 11.0), h2 = hash2(fi + 11.0), h3 = hash(fi + 29.0);
    vec2 wander = centre + vec2(
      sin(t * (0.08 + 0.10 * h1) + h2 * 6.2832) * (90.0 + 120.0 * h3),
      cos(t * (0.07 + 0.09 * h2) + h1 * 6.2832) * (70.0 + 90.0 * h1));
    float ang = h3 * 6.2832 + t * (0.15 + 0.25 * h2) * (h1 > 0.5 ? 1.0 : -1.0);
    float len = 36.0 + 60.0 * h2;
    vec2 dir = vec2(cos(ang), sin(ang)) * 0.5 * len;
    vec2 k0 = wander - dir, k1 = wander + dir;

    vec2 a = mix(k0, o0, s);
    vec2 b = mix(k1, o1, s);

    float d = sdSegment(c, a, b);
    float w = 0.5 + 0.5 * s;                       // 1px loose, 1.5px assembled
    float cov = 1.0 - smoothstep(w, w + 1.0, d);

    bool equator = e == 4;
    vec3 tone = equator ? mix(u_stroke, u_heart, s) : u_stroke;
    float alpha = equator ? mix(0.16, 0.95, s) : mix(0.16, 0.70, s);
    col = mix(col, tone, cov * alpha * shield);
  }

  gl_FragColor = vec4(col, 1.0);
}
