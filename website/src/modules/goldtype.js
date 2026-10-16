// Liquid gold type. Each [data-goldtype] headline is drawn again in WebGL as polished
// metal: the letters are rasterised to a mask, blurred into a height map, lit by a studio
// environment and a light that follows the pointer, with a slow molten ripple across the
// flat of every letter. Without WebGL the CSS gilt underneath simply stays.
import { $$, reduce, finePointer } from './core.js';

const VERT = `
attribute vec2 aPos;
varying vec2 vUv;
void main(){ vUv = vec2(aPos.x * .5 + .5, .5 - aPos.y * .5); gl_Position = vec4(aPos, 0., 1.); }`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform sampler2D uMask, uHeight;
uniform vec2 uTexel, uSize, uLight;
uniform float uTime, uBump, uShadow, uShadowOff;

float h(vec2 p){ return texture2D(uHeight, p).r; }
float hash(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p), u = f * f * (3. - 2. * f);
  return mix(mix(hash(i), hash(i + vec2(1., 0.)), u.x), mix(hash(i + vec2(0., 1.)), hash(i + vec2(1., 1.)), u.x), u.y);
}
void main(){
  float a = texture2D(uMask, vUv).a;
  float sh = texture2D(uHeight, vUv - vec2(0., uShadowOff)).a * uShadow;
  vec4 shadow = vec4(vec3(.122, .153, .086) * sh, sh);
  if (a < .004) { gl_FragColor = shadow; return; }
  vec2 e = uTexel * 1.5;
  float H0 = h(vUv);
  float hx = h(vUv + vec2(e.x, 0.)) - h(vUv - vec2(e.x, 0.));
  float hy = h(vUv + vec2(0., e.y)) - h(vUv - vec2(0., e.y));

  // Molten ripple, strongest on the flat face of each letter.
  vec2 q = vUv * uSize / 130.;
  float t = uTime;
  vec2 flow = vec2(noise(q + vec2(t * .06, t * .04)) - .5, noise(q * 1.6 + vec2(-t * .04, t * .07) + 9.1) - .5);
  float flatTop = smoothstep(.5, .95, H0);
  vec3 N = normalize(vec3(-hx * uBump + flow.x * .17 * flatTop, -hy * uBump + flow.y * .17 * flatTop, 1.));
  vec3 R = reflect(vec3(0., 0., -1.), N);

  // Studio environment as brightness: a dark floor, a warm sky, a bright horizon, a sweep of light.
  float up = -R.y;
  float lum = mix(.1, .52, smoothstep(-.8, .05, up));
  lum = mix(lum, .95, smoothstep(.1, .65, up));
  lum += .24 * exp(-pow((up - .03) * 7., 2.));
  float sweep = sin((vUv.x * 1.3 - vUv.y * .5) * 3.1416 - t * .3 + uLight.x * 1.2);
  lum += .1 * smoothstep(.8, 1., sweep);
  lum *= mix(.45, 1., smoothstep(0., .75, H0));

  // Twenty-two karat: brown in the shadows, warm yellow in the body, champagne in the light.
  vec3 col = mix(vec3(.09, .05, .015), vec3(.45, .29, .11), smoothstep(0., .3, lum));
  col = mix(col, vec3(.8, .57, .3), smoothstep(.3, .62, lum));
  col = mix(col, vec3(.95, .79, .52), smoothstep(.62, .88, lum));
  col = mix(col, vec3(1., .95, .84), smoothstep(.88, 1.15, lum));

  // A soft box that follows the pointer.
  vec3 L = normalize(vec3(uLight.x + .2, uLight.y - .6, .75));
  float sb = max(dot(R, L), 0.);
  col += vec3(1., .96, .86) * (pow(sb, 16.) * .45 + pow(sb, 140.) * 1.1);
  gl_FragColor = vec4(col * a, a) + shadow * (1. - a);
}`;

function compile(gl, type, src) {
  const s = gl.createShader(type);
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(s));
  return s;
}

// Three box blurs approximate a gaussian; run on a single channel.
function blur(src, w, h, r) {
  const tmp = new Float32Array(w * h);
  let a = src, b = tmp;
  for (let pass = 0; pass < 3; pass++) {
    for (let y = 0; y < h; y++) {
      let acc = 0;
      const row = y * w;
      for (let x = -r; x <= r; x++) acc += a[row + Math.min(w - 1, Math.max(0, x))];
      for (let x = 0; x < w; x++) {
        b[row + x] = acc / (2 * r + 1);
        acc += a[row + Math.min(w - 1, x + r + 1)] - a[row + Math.max(0, x - r)];
      }
    }
    for (let x = 0; x < w; x++) {
      let acc = 0;
      for (let y = -r; y <= r; y++) acc += b[Math.min(h - 1, Math.max(0, y)) * w + x];
      for (let y = 0; y < h; y++) {
        a[y * w + x] = acc / (2 * r + 1);
        acc += b[Math.min(h - 1, y + r + 1) * w + x] - b[Math.max(0, y - r) * w + x];
      }
    }
  }
  return a;
}

class GoldType {
  constructor(el) {
    this.el = el;
    const c = this.canvas = document.createElement('canvas');
    c.className = 'gt-canvas';
    c.setAttribute('aria-hidden', 'true');
    const gl = this.gl = c.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) throw new Error('no webgl');
    const p = gl.createProgram();
    gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, VERT));
    gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(p);
    if (!gl.getProgramParameter(p, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(p));
    gl.useProgram(p);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(p, 'aPos');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    this.u = {};
    ['uMask', 'uHeight', 'uTexel', 'uSize', 'uLight', 'uTime', 'uBump', 'uShadow', 'uShadowOff'].forEach(n => { this.u[n] = gl.getUniformLocation(p, n); });
    this.tex = [gl.createTexture(), gl.createTexture()];
    this.tex.forEach(t => {
      gl.bindTexture(gl.TEXTURE_2D, t);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    });
    gl.uniform1i(this.u.uMask, 0);
    gl.uniform1i(this.u.uHeight, 1);
    this.light = [0, 0];
    // A soft moss shadow is drawn in the shader; dark scenes get a deeper one.
    this.shadow = /drop-shadow/.test(getComputedStyle(el).filter) ? 0.5 : 0.2;
    this.ready = false;
    this.visible = false;
    c.addEventListener('webglcontextlost', () => this.destroy());
  }

  layout() {
    const el = this.el, cs = getComputedStyle(el);
    const fs = parseFloat(cs.fontSize);
    if (!el.offsetWidth || !fs) { this.canvas.remove(); el.classList.remove('gt-on'); this.ready = false; return false; }
    let text = el.textContent.trim();
    if (cs.textTransform === 'uppercase') text = text.toUpperCase();

    // Where the DOM puts the first baseline, and how wide it sets the line (measured without
    // the canvas, which is wider than the text it covers).
    this.canvas.remove();
    const probe = document.createElement('span');
    probe.style.cssText = 'display:inline-block;width:0;height:0;vertical-align:baseline';
    const ws = el.style.whiteSpace;
    el.style.whiteSpace = 'nowrap'; // keep the probe on the same line as the text
    el.prepend(probe);
    const baseX = probe.offsetLeft, baseY = probe.offsetTop;
    probe.remove();
    el.style.whiteSpace = ws;
    const range = document.createRange();
    range.selectNodeContents(el);
    const k = el.getBoundingClientRect().width / el.offsetWidth || 1;
    const domW = range.getBoundingClientRect().width / k;

    const pad = Math.round(fs * 0.32);
    const W = el.offsetWidth + pad * 2, H = el.offsetHeight + pad * 2;
    const dpr = Math.min(window.devicePixelRatio || 1, 2, 2048 / W, 2048 / H);
    const cw = Math.round(W * dpr), ch = Math.round(H * dpr);
    Object.assign(this.canvas.style, { left: -pad + 'px', top: -pad + 'px', width: W + 'px', height: H + 'px' });
    this.canvas.width = cw;
    this.canvas.height = ch;

    // The letters as a mask; a hairline stroke keeps Bodoni's thin strokes solid.
    const m = document.createElement('canvas');
    m.width = cw; m.height = ch;
    const ctx = m.getContext('2d');
    ctx.font = `${cs.fontStyle} ${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;
    if ('letterSpacing' in ctx) ctx.letterSpacing = cs.letterSpacing === 'normal' ? '0px' : cs.letterSpacing;
    const sx = domW / Math.max(1, ctx.measureText(text).width);
    ctx.setTransform(dpr * sx, 0, 0, dpr, dpr * (pad + baseX), dpr * (pad + baseY));
    ctx.fillStyle = ctx.strokeStyle = '#fff';
    ctx.lineJoin = 'round';
    ctx.lineWidth = fs * 0.014;
    ctx.fillText(text, 0, 0);
    ctx.strokeText(text, 0, 0);

    // The height map: the mask at half size, blurred into rounded, polished relief.
    const hw = Math.max(1, cw >> 1), hh = Math.max(1, ch >> 1);
    const small = document.createElement('canvas');
    small.width = hw; small.height = hh;
    const sctx = small.getContext('2d');
    sctx.drawImage(m, 0, 0, hw, hh);
    const px = sctx.getImageData(0, 0, hw, hh).data;
    const f = new Float32Array(hw * hh);
    for (let i = 0; i < f.length; i++) f[i] = px[i * 4 + 3] / 255;
    const r = Math.max(2, Math.round(fs * 0.03 * dpr / 2));
    const sb = blur(Float32Array.from(f), hw, hh, Math.max(3, Math.round(fs * 0.075 * dpr / 2)));
    const hb = blur(f, hw, hh, r);
    const bytes = new Uint8Array(hw * hh * 2);
    for (let i = 0; i < hw * hh; i++) {
      const v = Math.min(1, hb[i] * 1.25);
      bytes[i * 2] = Math.round(v * v * (3 - 2 * v) * 255);
      bytes[i * 2 + 1] = Math.round(Math.min(1, sb[i] * 1.4) * 255);
    }

    const gl = this.gl;
    gl.viewport(0, 0, cw, ch);
    gl.pixelStorei(gl.UNPACK_ALIGNMENT, 1);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.tex[0]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, m);
    gl.activeTexture(gl.TEXTURE1);
    gl.bindTexture(gl.TEXTURE_2D, this.tex[1]);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.LUMINANCE_ALPHA, hw, hh, 0, gl.LUMINANCE_ALPHA, gl.UNSIGNED_BYTE, bytes);
    gl.uniform2f(this.u.uTexel, 1 / hw, 1 / hh);
    gl.uniform2f(this.u.uSize, W, H);
    gl.uniform1f(this.u.uBump, r * 0.62);
    gl.uniform1f(this.u.uShadow, this.shadow);
    gl.uniform1f(this.u.uShadowOff, fs * 0.04 / H);

    el.appendChild(this.canvas);
    el.classList.add('gt-on');
    this.ready = true;
    return true;
  }

  draw(t, pointer) {
    if (!this.ready) return;
    const r = this.el.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    let lx, ly;
    if (pointer) {
      lx = (pointer[0] - cx) / innerWidth * 2.2;
      ly = (pointer[1] - cy) / innerHeight * 2.2;
    } else {
      lx = Math.sin(t * 0.27) * 0.7;
      ly = Math.cos(t * 0.19) * 0.3 + (cy / innerHeight - 0.5) * 1.2;
    }
    this.light[0] += (Math.max(-1.6, Math.min(1.6, lx)) - this.light[0]) * 0.08;
    this.light[1] += (Math.max(-1.6, Math.min(1.6, ly)) - this.light[1]) * 0.08;
    const gl = this.gl;
    gl.uniform1f(this.u.uTime, t);
    gl.uniform2f(this.u.uLight, this.light[0], this.light[1]);
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  destroy() {
    this.ready = false;
    this.canvas.remove();
    this.el.classList.remove('gt-on');
  }
}

export function initGoldType() {
  const els = $$('[data-goldtype]');
  if (!els.length) return;
  const items = []; // built lazily, as each headline comes near
  const idle = window.requestIdleCallback || (fn => setTimeout(fn, 1));

  let pointer = null;
  if (finePointer) addEventListener('pointermove', e => { pointer = [e.clientX, e.clientY]; }, { passive: true });
  document.addEventListener('pointerleave', () => { pointer = null; });

  const t0 = performance.now();
  let raf = 0, lastDraw = 0;
  const interval = finePointer ? 0 : 1000 / 30;
  const loop = now => {
    raf = 0;
    const live = items.filter(i => i.visible && i.ready);
    if (!live.length) return;
    if (now - lastDraw >= interval) {
      lastDraw = now;
      const t = (now - t0) / 1000;
      live.forEach(i => i.draw(t, pointer));
    }
    if (!reduce) raf = requestAnimationFrame(loop);
  };
  const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };

  const fontsFor = el => {
    if (!document.fonts) return Promise.resolve();
    const cs = getComputedStyle(el);
    return document.fonts.load(`${cs.fontStyle} ${cs.fontWeight} 100px ${cs.fontFamily}`, el.textContent.trim()).catch(() => {});
  };
  const build = el => fontsFor(el).then(() => idle(() => {
    let it = items.find(i => i.el === el);
    if (!it) {
      try { it = new GoldType(el); } catch (e) { return; } // no WebGL: the CSS gilt stays
      items.push(it);
      ro.observe(el);
    }
    try { it.layout(); } catch (e) { it.destroy(); }
    it.visible = true;
    kick();
  }, { timeout: 800 }));

  const pending = new Set(els);
  const io = new IntersectionObserver(es => {
    es.forEach(e => {
      const it = items.find(i => i.el === e.target);
      if (it) it.visible = e.isIntersecting;
      if (e.isIntersecting && pending.has(e.target)) { pending.delete(e.target); build(e.target); }
    });
    kick();
  }, { rootMargin: '300px 0px' });

  let timer = 0;
  const ro = new ResizeObserver(() => {
    clearTimeout(timer);
    timer = setTimeout(() => { items.forEach(i => { try { i.layout(); } catch (e) { i.destroy(); } }); kick(); }, 160);
  });
  els.forEach(el => io.observe(el));
  if (reduce) addEventListener('scroll', kick, { passive: true });
}
