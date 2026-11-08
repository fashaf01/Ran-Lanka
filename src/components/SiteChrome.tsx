"use client";

// The site frame: loader, page curtain, cursor, header, menu, smooth scrolling and every
// scroll and page behaviour. Pages are server-rendered; this wires them up after each route.
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Lenis from "lenis";
import { FX, HERO_SLIDES as HS, PAWN_GRAMS, PHONE, RATE, money } from "@/lib/data";

const NAV_L = [
  { href: "/collection", label: "Collection", key: "collection" },
  { href: "/bridal", label: "Bridal", key: "bridal" },
  { href: "/bespoke", label: "Bespoke", key: "bespoke" },
];
const NAV_R = [
  { href: "/gold-rate", label: "Gold rate", key: "gold-rate" },
  { href: "/exchange", label: "Exchange", key: "exchange" },
];
const MENU = [
  { href: "/", label: "Home", small: "Ranlanka", key: "home" },
  { href: "/collection", label: "Collection", small: "49 pieces", key: "collection" },
  { href: "/bridal", label: "Bridal", small: "Viewings", key: "bridal" },
  { href: "/bespoke", label: "Bespoke", small: "Your design", key: "bespoke" },
  { href: "/gold-rate", label: "Gold rate", small: "And old gold", key: "gold-rate" },
  { href: "/exchange", label: "Money exchange", small: "50+ currencies", key: "exchange" },
  { href: "/about", label: "Our story", small: "Since 2008", key: "about" },
  { href: "/visit", label: "Visit", small: "Main Street", key: "visit" },
];

const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector(s) as T | null;
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => Array.from(r.querySelectorAll(s)) as T[];
const clamp = (v: number, a: number, b: number) => (v < a ? a : v > b ? b : v);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));
const section = (path: string) => (path === "/" ? "home" : path.split("/")[1] === "product" ? "collection" : path.split("/")[1]);

type PageCtx = {
  home: boolean;
  hero: HTMLElement | null;
  hsMedia: HTMLElement | null;
  hsT: HTMLElement | null;
  hsIn: HTMLElement | null;
  words: HTMLElement[];
  wordsEl: HTMLElement | null;
  lit: number;
  mq: HTMLElement | null;
  mqX: number;
};

// shared between the long-lived effects
const G: {
  lenis: Lenis | null;
  RM: boolean;
  FINE: boolean;
  busy: boolean;
  first: boolean;
  loaderDone: boolean;
  onLoaderDone: (() => void) | null;
  ctx: PageCtx;
  io: IntersectionObserver | null;
  gio: IntersectionObserver | null;
} = {
  lenis: null, RM: false, FINE: false, busy: false, first: true, loaderDone: false, onLoaderDone: null,
  ctx: { home: false, hero: null, hsMedia: null, hsT: null, hsIn: null, words: [], wordsEl: null, lit: -1, mq: null, mqX: 0 },
  io: null, gio: null,
};

function goTo(t: Element | null) {
  if (!t) return;
  if (G.lenis) G.lenis.scrollTo(t as HTMLElement, { offset: -90, duration: 1.4, easing: (x: number) => 1 - Math.pow(1 - x, 4), force: true });
  else t.scrollIntoView({ behavior: G.RM ? "auto" : "smooth" });
}

function countUp(el: HTMLElement) {
  const t = +(el.dataset.count || 0);
  if (!t || G.RM) return;
  const t0 = performance.now(), D = 1600;
  const step = (now: number) => {
    const k = clamp((now - t0) / D, 0, 1);
    el.textContent = money(t * (1 - Math.pow(1 - k, 4)));
    if (k < 1) requestAnimationFrame(step);
  };
  requestAnimationFrame(step);
}

function observe(root: ParentNode) {
  if (!G.io || !G.gio) return;
  $$(".rv,.fade,.clip,.mf,[data-count]", root).forEach((el) => {
    if (!(el as any).__o) { (el as any).__o = 1; G.io!.observe(el); }
  });
  $$(".grid .pc", root).forEach((el, i) => {
    if (!(el as any).__o) { (el as any).__o = 1; el.dataset.i = String(i % 4); G.gio!.observe(el); }
  });
}

function lkNow() {
  try {
    const p = new Intl.DateTimeFormat("en-US", { timeZone: "Asia/Colombo", weekday: "short", hour: "numeric", minute: "numeric", hourCycle: "h23" }).formatToParts(new Date());
    const g = (t: string) => (p.find((x) => x.type === t) || { value: "" }).value;
    return { d: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].indexOf(g("weekday")), m: (+g("hour") % 24) * 60 + +g("minute") };
  } catch {
    const n = new Date();
    return { d: n.getDay(), m: n.getHours() * 60 + n.getMinutes() };
  }
}
function paintStatus() {
  const { d, m } = lkNow(), work = d >= 1 && d <= 6, open = work && m >= 600 && m < 1170;
  const short = open ? "Open now" : work && m < 600 ? "Opens at 10:00 am" : "Closed now";
  const long = open ? "until 7:30 pm" : work && m < 600 ? "today" : "opens " + (d === 6 || d === 0 ? "Monday" : "tomorrow") + " at 10:00 am";
  $$(".status").forEach((s) => { s.classList.toggle("open", open); const sp = s.querySelector("span"); if (sp) sp.textContent = short + ", " + long + " (Sri Lanka time)"; });
  $$("[data-open]").forEach((s) => { s.textContent = short + " · " + long; });
  $$("[data-dot]").forEach((s) => s.classList.toggle("open", open));
  $$(".hours li").forEach((li) => li.classList.toggle("today", li.dataset.d === String(d)));
}

function copyText(t: string, b: HTMLElement) {
  const label = b.textContent;
  const done = (w: string) => { b.textContent = w; setTimeout(() => { b.textContent = label; }, 1600); };
  const pick = () => {
    try {
      const el = (b.previousElementSibling as HTMLElement) || b, r = document.createRange();
      r.selectNodeContents(el); const s = getSelection(); s?.removeAllRanges(); s?.addRange(r); done("Selected");
    } catch { /* nothing to select */ }
  };
  try { navigator.clipboard.writeText(t).then(() => done("Copied"), pick); } catch { pick(); }
}

/* ---------------- page behaviours, run after every route ---------------- */
function initPage(path: string): () => void {
  const off: (() => void)[] = [];
  const ctx: PageCtx = { home: path === "/", hero: $(".hero"), hsMedia: $("[data-hs-media]"), hsT: $(".hs-t"), hsIn: $("[data-hs-in]"), words: [], wordsEl: null, lit: -1, mq: null, mqX: 0 };
  G.ctx = ctx;

  // words that light up as the paragraph scrolls past
  const st = $("[data-words]");
  if (st) {
    if (!st.dataset.split) {
      st.dataset.split = "1";
      const split = (node: Node, it: boolean) => {
        Array.from(node.childNodes).forEach((n) => {
          if (n.nodeType === 3) {
            const f = document.createDocumentFragment();
            (n.textContent || "").split(/(\s+)/).forEach((t) => {
              if (!t) return;
              if (/^\s+$/.test(t)) { f.append(t); return; }
              const s = document.createElement("span"); s.className = "w" + (it ? " it" : ""); s.textContent = t; f.append(s);
            });
            (n as ChildNode).replaceWith(f);
          } else if (n.nodeName === "I") {
            const s = document.createElement("span"); split(n, true);
            while (n.firstChild) s.append(n.firstChild);
            (n as ChildNode).replaceWith(s);
          }
        });
      };
      split(st, false);
    }
    ctx.wordsEl = st; ctx.words = $$(".w", st);
  }

  // rate ticker: doubled so it can loop
  const mq = $("[data-marquee]");
  if (mq) { if (!mq.dataset.dup) { mq.dataset.dup = "1"; mq.innerHTML += mq.innerHTML; } ctx.mq = mq; }

  // home hero slider
  const hs = $(".hs");
  if (hs) off.push(initSlider(hs));

  // gold calculator
  const calcF = $<HTMLFormElement>("#calc");
  if (calcF) {
    const wIn = $<HTMLInputElement>("#weight")!, out = $("#value")!, conv = $("#conv")!;
    let unit = "g";
    const fmt = (n: number) => (Math.round(n * 1000) / 1000).toLocaleString("en-US", { maximumFractionDigits: 3 });
    const calc = () => {
      const k = +($<HTMLInputElement>("input[name=karat]:checked", calcF)!.value) as 22 | 24, v = parseFloat(wIn.value);
      if (!(v >= 0)) { out.textContent = "Enter a weight"; conv.textContent = "Type a weight in " + (unit === "g" ? "grams" : "pawn") + "."; return; }
      const g = unit === "g" ? v : v * PAWN_GRAMS;
      out.textContent = "LKR " + money(g * RATE[k]);
      conv.textContent = (unit === "g" ? fmt(g) + " g is " + fmt(g / PAWN_GRAMS) + " pawn." : fmt(v) + " pawn is " + fmt(g) + " g.") + " Gold value only, at the sample rate.";
    };
    const onSubmit = (e: Event) => e.preventDefault();
    const onInput = (e: Event) => {
      const t = e.target as HTMLInputElement;
      if (t.name === "unit") {
        const nu = t.value, v = parseFloat(wIn.value);
        if (v >= 0 && nu !== unit) wIn.value = String(Math.round((nu === "p" ? v / PAWN_GRAMS : v * PAWN_GRAMS) * 1000) / 1000);
        unit = nu; wIn.step = unit === "g" ? "0.1" : "0.125";
      }
      calc();
    };
    calcF.addEventListener("submit", onSubmit); calcF.addEventListener("input", onInput); calc();
    off.push(() => { calcF.removeEventListener("submit", onSubmit); calcF.removeEventListener("input", onInput); });
  }

  // exchange converter
  const fxF = $<HTMLFormElement>("#fxcalc");
  if (fxF) {
    const fxcalc = () => {
      const dir = $<HTMLInputElement>("input[name=fxdir]:checked", fxF)!.value, amt = parseFloat($<HTMLInputElement>("#fx-amt")!.value);
      const f = FX.find((x) => x[0] === $<HTMLSelectElement>("#fx-cur")!.value) || FX[0], o = $("#fx-out")!, cv = $("#fx-conv")!;
      $("#fx-outlab")!.textContent = dir === "sell" ? "You receive" : "You pay";
      if (!(amt >= 0)) { o.textContent = "Enter an amount"; cv.textContent = ""; return; }
      const rate = dir === "sell" ? f[2] : f[3];
      o.textContent = "LKR " + (amt * rate).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      cv.textContent = (dir === "sell" ? "We buy " + f[0] + " at " : "We sell " + f[0] + " at ") + rate.toFixed(2) + " rupees. Sample rate, no commission.";
    };
    const onSubmit = (e: Event) => e.preventDefault();
    fxF.addEventListener("submit", onSubmit); fxF.addEventListener("input", fxcalc); fxF.addEventListener("change", fxcalc); fxcalc();
    off.push(() => { fxF.removeEventListener("submit", onSubmit); fxF.removeEventListener("input", fxcalc); fxF.removeEventListener("change", fxcalc); });
  }

  // sketch / gold comparison
  $$<HTMLInputElement>(".compare input").forEach((r) => {
    const f = () => r.parentElement!.style.setProperty("--cut", r.value + "%");
    r.addEventListener("input", f); off.push(() => r.removeEventListener("input", f));
  });

  // collection: sort and keep the current case in view
  const sort = $<HTMLSelectElement>("#sort");
  if (sort) {
    const grid = $("[data-grid=collection]")!;
    const onSort = () => {
      const v = sort.value, cards = $$<HTMLElement>(".pc", grid);
      cards.sort((a, b) => (v === "az" ? a.dataset.name!.localeCompare(b.dataset.name!) : v === "za" ? b.dataset.name!.localeCompare(a.dataset.name!) : +a.dataset.order! - +b.dataset.order!));
      const inter = $(".interlude", grid);
      cards.forEach((c, i) => { grid.append(c); if (inter && i === 7) grid.append(inter); });
      if (inter) inter.hidden = v !== "case";
    };
    sort.addEventListener("change", onSort); off.push(() => sort.removeEventListener("change", onSort));
    const bar = $("#cats"), a = $("#cats a[aria-current]");
    if (bar && a) bar.scrollLeft = a.offsetLeft - bar.clientWidth / 2 + a.offsetWidth / 2;
  }

  // piece page: photos and zoom
  const thumbs = $("#pd-thumbs");
  if (thumbs) {
    const img = $<HTMLImageElement>("#pd-img")!, pm = $("#pd-main")!;
    const onThumb = (e: Event) => {
      const b = (e.target as HTMLElement).closest("button"); if (!b) return;
      img.style.opacity = "0";
      setTimeout(() => { img.src = b.dataset.src!; img.style.opacity = "1"; }, 160);
      $$("button", thumbs).forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
    };
    thumbs.addEventListener("click", onThumb); off.push(() => thumbs.removeEventListener("click", onThumb));
    if (G.FINE) {
      const en = () => pm.classList.add("zoom"), le = () => pm.classList.remove("zoom");
      const mv = (e: PointerEvent) => { const r = pm.getBoundingClientRect(); img.style.transformOrigin = `${(((e.clientX - r.left) / r.width) * 100).toFixed(1)}% ${(((e.clientY - r.top) / r.height) * 100).toFixed(1)}%`; };
      pm.addEventListener("pointerenter", en); pm.addEventListener("pointerleave", le); pm.addEventListener("pointermove", mv);
      off.push(() => { pm.removeEventListener("pointerenter", en); pm.removeEventListener("pointerleave", le); pm.removeEventListener("pointermove", mv); });
    }
  }

  // visit: an enquiry about a piece arrives as ?about=
  const about = $<HTMLInputElement>("#e-about");
  if (about) {
    const q = new URLSearchParams(location.search).get("about");
    if (q) { about.value = q; setTimeout(() => { goTo($("#enquiry")); $<HTMLInputElement>("#e-name")?.focus({ preventScroll: true }); }, G.first ? 80 : 700); }
  }

  paintStatus();
  observe(document);
  return () => off.forEach((f) => f());
}

/* ---------------- home hero slider ---------------- */
function initSlider(hs: HTMLElement): () => void {
  const D = 6500;
  const tabs = $(".hs-tabs", hs)!, panel = $("[data-hs-panel]", hs)!;
  const cur = $<HTMLImageElement>("[data-hs-cur] img", hs)!, prev = $<HTMLImageElement>("[data-hs-prev] img", hs)!;
  hs.style.setProperty("--hs-dur", D + "ms");
  HS.forEach((x) => { const a = new Image(); a.src = `/img/${x.img}.webp`; const b = new Image(); b.src = `/img/${x.arch}.webp`; });
  let i = 0, timer = 0 as unknown as ReturnType<typeof setTimeout>, t0 = 0, left = D, hold = false, alive = true;
  const set = (k: number) => {
    const x = HS[k], o = HS[i];
    prev.src = `/img/${o.img}.webp`; prev.style.objectPosition = o.pos;
    cur.src = `/img/${x.img}.webp`; cur.alt = x.alt; cur.style.objectPosition = x.pos;
    $("[data-hs-title]", hs)!.textContent = x.t; $("[data-hs-sub]", hs)!.textContent = x.sub;
    $("[data-hs-stone]", hs)!.textContent = x.stone + " · 22 karat"; $("[data-hs-count]", hs)!.textContent = `0${k + 1} / 0${HS.length}`;
    const ar = $<HTMLImageElement>("[data-hs-arch]", hs)!; ar.src = `/img/${x.arch}.webp`; ar.alt = x.aalt;
    $("[data-hs-text]", hs)!.textContent = x.text;
    const cta = $<HTMLAnchorElement>("[data-hs-cta]", hs)!; cta.firstChild!.textContent = x.cta + " "; cta.href = x.href;
    panel.style.backgroundColor = x.bg;
    $$("button", tabs).forEach((b, j) => { b.setAttribute("aria-selected", String(j === k)); b.classList.toggle("done", j < k); });
    i = k;
    if (!G.RM) { hs.classList.remove("play"); void hs.offsetWidth; hs.classList.add("play"); }
    arm(D);
  };
  const tick = () => { if (!alive) return; if (document.hidden) { arm(1500); return; } set((i + 1) % HS.length); };
  const arm = (ms: number) => { clearTimeout(timer); if (G.RM) return; left = ms; t0 = performance.now(); if (!hold) timer = setTimeout(tick, ms); };
  const pause = (on: boolean) => {
    if (G.RM || on === hold) return; hold = on; hs.classList.toggle("paused", on);
    if (on) { clearTimeout(timer); left = Math.max(400, left - (performance.now() - t0)); } else { t0 = performance.now(); timer = setTimeout(tick, left); }
  };
  const onTab = (e: Event) => { const b = (e.target as HTMLElement).closest("button"); if (b && +b.dataset.i! !== i) set(+b.dataset.i!); };
  const next = () => set((i + 1) % HS.length), prv = () => set((i - 1 + HS.length) % HS.length);
  const pe = () => pause(true), pl = () => pause(false), fi = () => pause(true);
  const fo = (e: FocusEvent) => { if (!hs.contains(e.relatedTarget as Node)) pause(false); };
  tabs.addEventListener("click", onTab);
  $("[data-hs-nextbtn]", hs)!.addEventListener("click", next);
  $("[data-hs-prevbtn]", hs)!.addEventListener("click", prv);
  if (G.FINE) { hs.addEventListener("pointerenter", pe); hs.addEventListener("pointerleave", pl); }
  hs.addEventListener("focusin", fi); hs.addEventListener("focusout", fo);
  const start = () => { if (!alive || hs.classList.contains("go")) return; hs.classList.add("go"); if (!G.RM) hs.classList.add("play"); arm(D); };
  if (G.loaderDone) start(); else G.onLoaderDone = start;
  return () => {
    alive = false; clearTimeout(timer); G.onLoaderDone = null;
    tabs.removeEventListener("click", onTab);
    $("[data-hs-nextbtn]", hs)?.removeEventListener("click", next);
    $("[data-hs-prevbtn]", hs)?.removeEventListener("click", prv);
    hs.removeEventListener("pointerenter", pe); hs.removeEventListener("pointerleave", pl);
    hs.removeEventListener("focusin", fi); hs.removeEventListener("focusout", fo);
  };
}

/* ---------------- component ---------------- */
export default function SiteChrome() {
  const pathname = usePathname() || "/";
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const headRef = useRef<HTMLElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef(menuOpen);
  menuRef.current = menuOpen;
  const routerRef = useRef(router);
  routerRef.current = router;
  const sec = section(pathname);

  // long-lived: smooth scroll, reveals, the frame loop, cursor, links, forms
  useEffect(() => {
    G.RM = matchMedia("(prefers-reduced-motion: reduce)").matches;
    G.FINE = matchMedia("(pointer: fine)").matches;
    if (!G.RM) {
      try { G.lenis = new Lenis({ lerp: 0.09, smoothWheel: true, wheelMultiplier: 0.95 }); } catch { G.lenis = null; }
    }
    G.io = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); G.io!.unobserve(e.target); countUp(e.target as HTMLElement); } }), { rootMargin: "0px 0px -10% 0px" });
    G.gio = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { const el = e.target as HTMLElement; setTimeout(() => el.classList.add("in"), (+(el.dataset.i || 0)) * 70); G.gio!.unobserve(el); } }), { rootMargin: "0px 0px -6% 0px" });

    const head = headRef.current!;
    const cur = $(".cursor")!, ring = $(".cursor .ring")!, dot = $(".cursor .dot")!, label = $(".cursor .ring b")!;
    const M = { x: innerWidth / 2, y: innerHeight / 2, rx: innerWidth / 2, ry: innerHeight / 2 };
    const offs: (() => void)[] = [];
    const on = <K extends keyof DocumentEventMap>(t: Document | Window, ev: K | string, fn: (e: any) => void, opt?: AddEventListenerOptions) => { t.addEventListener(ev, fn, opt); offs.push(() => t.removeEventListener(ev, fn, opt)); };

    if (G.FINE) {
      on(window, "pointermove", (e: PointerEvent) => { M.x = e.clientX; M.y = e.clientY; if (!cur.classList.contains("live")) { M.rx = M.x; M.ry = M.y; cur.classList.add("live"); } }, { passive: true });
      on(document, "pointerleave", () => cur.classList.remove("live"));
      on(document, "pointerover", (e: PointerEvent) => { const t = (e.target as HTMLElement).closest?.("[data-cursor]") as HTMLElement | null; if (t) { label.textContent = t.dataset.cursor || ""; cur.classList.add("big"); } });
      on(document, "pointerout", (e: PointerEvent) => { const t = (e.target as HTMLElement).closest?.("[data-cursor]"); if (t && !t.contains(e.relatedTarget as Node)) cur.classList.remove("big"); });
    }

    // internal links: curtain, then route
    on(document, "click", (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cp = target.closest?.("[data-copy]") as HTMLElement | null;
      if (cp) { copyText(cp.dataset.copy || "", cp); return; }
      const to = target.closest?.("[data-to]") as HTMLElement | null;
      if (to && to.tagName !== "A") { e.preventDefault(); goTo($(to.dataset.to!)); return; }
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = target.closest?.("a[href]") as HTMLAnchorElement | null;
      if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
      const url = new URL(a.href, location.href);
      if (url.origin !== location.origin) return;
      if (url.pathname === location.pathname && url.search === location.search) {
        if (url.hash) { e.preventDefault(); setMenuOpen(false); goTo($(decodeURIComponent(url.hash))); }
        else if (url.pathname === location.pathname) { e.preventDefault(); setMenuOpen(false); if (G.lenis) G.lenis.scrollTo(0, { duration: 1.2, force: true }); else scrollTo({ top: 0, behavior: "smooth" }); }
        return;
      }
      e.preventDefault();
      navigate(url.pathname + url.search + url.hash);
    });

    async function navigate(href: string) {
      if (G.busy) return;
      setMenuOpen(false);
      const c = curtainRef.current!;
      if (G.RM) { routerRef.current.push(href, { scroll: false }); return; }
      G.busy = true;
      routerRef.current.prefetch(href);
      c.className = "curtain in";
      await wait(620);
      const before = location.pathname;
      routerRef.current.push(href, { scroll: false });
      setTimeout(() => { if (G.busy && location.pathname === before) { c.className = "curtain in out"; setTimeout(() => { c.className = "curtain"; G.busy = false; }, 840); } }, 2500);
    }

    // forms that prepare a message (the site cannot send email itself)
    on(document, "submit", (e: SubmitEvent) => {
      const f = (e.target as HTMLElement).closest?.("form.compose") as HTMLFormElement | null;
      if (!f) return;
      e.preventDefault();
      const groups: Record<string, string[]> = {};
      new FormData(f).forEach((v, k) => { const t = String(v).trim(); if (t) (groups[k] = groups[k] || []).push(t); });
      const lines = [f.dataset.greet || "Hello Ranlanka,", ""];
      Object.entries(groups).forEach(([k, v]) => lines.push(k + ": " + v.join(", ")));
      lines.push("", "Thank you.");
      const box = $(".composed", f)!;
      box.innerHTML = '<span class="kicker">Your message</span><pre></pre><div><button type="button" class="copy">Copy message</button> <a class="copy" data-mail>Open in email</a></div><p>Send it to <b>ranlankanegombo@gmail.com</b>, or call <b>' + PHONE + "</b> and read it out.</p>";
      const pre = $("pre", box)!; pre.textContent = lines.join("\n"); box.hidden = false;
      const mail = $<HTMLAnchorElement>("[data-mail]", box)!;
      mail.href = "mailto:ranlankanegombo@gmail.com?subject=" + encodeURIComponent("Enquiry from the website") + "&body=" + encodeURIComponent(lines.join("\n"));
      $("button", box)!.addEventListener("click", (ev) => copyText(pre.textContent || "", ev.currentTarget as HTMLElement));
    });

    on(window, "keydown", (e: KeyboardEvent) => { if (e.key === "Escape" && menuRef.current) setMenuOpen(false); });
    on(window, "resize", () => { try { G.lenis?.resize(); } catch { /* ignore */ } });
    const statusTimer = setInterval(paintStatus, 60000);

    // loader: first visit to the home page only
    const loader = $(".loader");
    const finish = () => { G.loaderDone = true; const f = G.onLoaderDone; G.onLoaderDone = null; f?.(); };
    let seen = false;
    try { seen = !!sessionStorage.getItem("rl-site2"); } catch { /* private mode */ }
    if (!loader || G.RM || seen || location.pathname !== "/") { if (loader) loader.style.display = "none"; requestAnimationFrame(finish); }
    else {
      const bar = $(".ld-bar i")!, cnt = $(".ld-count")!, t0 = performance.now(), DUR = 1400;
      const tick = (now: number) => {
        const k = clamp((now - t0) / DUR, 0, 1), ez = 1 - Math.pow(1 - k, 3);
        bar.style.transform = `scaleX(${ez})`; cnt.textContent = String(Math.round(ez * 100)).padStart(3, "0");
        if (k < 1) requestAnimationFrame(tick);
        else setTimeout(() => { loader.classList.add("done"); setTimeout(finish, 250); setTimeout(() => { loader.style.display = "none"; }, 1200); try { sessionStorage.setItem("rl-site2", "1"); } catch { /* ignore */ } }, 160);
      };
      requestAnimationFrame(tick);
      setTimeout(() => { if (!G.loaderDone) { loader.classList.add("done"); finish(); } }, 4000);
    }

    // the frame loop
    let raf = 0, lastY = 0, prevY = 0, vel = 0, mqDir = 1;
    const frame = (now: number) => {
      G.lenis?.raf(now);
      const ctx = G.ctx, y = scrollY, vh = innerHeight;
      vel = lerp(vel, y - prevY, 0.2); prevY = y;
      if (ctx.home && ctx.hero) head.classList.toggle("over", y < ctx.hero.offsetHeight - 120);
      if (!menuRef.current && !G.busy) {
        if (y > lastY + 4 && y > vh * 0.5) { head.classList.add("hide"); document.body.classList.add("head-hidden"); }
        else if (y < lastY - 4 || y < vh * 0.5) { head.classList.remove("hide"); document.body.classList.remove("head-hidden"); }
        if (Math.abs(y - lastY) > 4) lastY = y;
      }
      if (!G.RM) {
        if (ctx.home && ctx.hsMedia && y < vh * 1.3) {
          ctx.hsMedia.style.transform = `translate3d(0,${(y * 0.28).toFixed(1)}px,0)`;
          if (ctx.hsT) { ctx.hsT.style.transform = `translate3d(0,calc(-50% + ${(y * 0.12).toFixed(1)}px),0)`; ctx.hsT.style.opacity = String(clamp(1 - y / (vh * 0.75), 0, 1)); }
          if (ctx.hsIn) ctx.hsIn.style.transform = `translate3d(0,${(-y * 0.07).toFixed(1)}px,0)`;
        }
        for (const el of $$("main [data-zoom]")) { const r = el.parentElement!.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) continue; const t = clamp((vh - r.top) / (vh + r.height), 0, 1); el.style.transform = `scale(${(1.16 - 0.16 * clamp(t * 1.7, 0, 1)).toFixed(4)})`; }
        for (const el of $$("main [data-spread]")) { const r = el.getBoundingClientRect(); if (r.bottom < 0 || r.top > vh) continue; const t = clamp((vh * 0.96 - r.top) / (vh * 0.55), 0, 1), ez = 1 - Math.pow(1 - t, 3); el.style.letterSpacing = (0.62 - 0.48 * ez).toFixed(3) + "em"; }
        for (const el of $$("main [data-speed]")) { const r = el.parentElement!.getBoundingClientRect(); if (r.bottom < -200 || r.top > vh + 200) continue; el.style.translate = `0 ${((r.top + r.height / 2 - vh / 2) * +(el.dataset.speed || 0)).toFixed(1)}px`; }
        if (ctx.mq) { if (Math.abs(vel) > 0.5) mqDir = vel > 0 ? 1 : -1; ctx.mqX -= (0.42 + Math.min(Math.abs(vel) * 0.05, 4)) * mqDir; const half = ctx.mq.scrollWidth / 2; if (ctx.mqX <= -half) ctx.mqX += half; if (ctx.mqX > 0) ctx.mqX -= half; ctx.mq.style.transform = `translate3d(${ctx.mqX.toFixed(1)}px,0,0)`; }
      }
      if (ctx.wordsEl && ctx.words.length) {
        const sr = ctx.wordsEl.getBoundingClientRect();
        if (sr.top < vh && sr.bottom > 0) {
          const p = G.RM ? 1 : clamp((vh * 0.82 - sr.top) / (sr.height + vh * 0.25), 0, 1), n = Math.round(p * ctx.words.length);
          if (n !== ctx.lit) { ctx.words.forEach((w, i) => w.classList.toggle("on", i < n)); ctx.lit = n; }
        }
      }
      if (G.FINE) { M.rx = lerp(M.rx, M.x, 0.18); M.ry = lerp(M.ry, M.y, 0.18); ring.style.transform = `translate3d(${M.rx}px,${M.ry}px,0) rotate(45deg)`; dot.style.transform = `translate3d(${M.x}px,${M.y}px,0)`; }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf); clearInterval(statusTimer); offs.forEach((f) => f());
      G.io?.disconnect(); G.gio?.disconnect(); G.lenis?.destroy(); G.lenis = null;
    };
  }, []);

  // every route: reset scroll, wire the page up, lift the curtain
  useEffect(() => {
    const head = headRef.current!;
    head.classList.remove("hide"); document.body.classList.remove("head-hidden");
    head.classList.toggle("over", pathname === "/");
    const hash = location.hash;
    if (G.lenis) G.lenis.scrollTo(0, { immediate: true, force: true });
    window.scrollTo(0, 0);
    const cleanup = initPage(pathname);
    if (hash) setTimeout(() => goTo($(decodeURIComponent(hash))), G.first ? 80 : 700);
    const c = curtainRef.current!;
    if (c.classList.contains("in")) {
      requestAnimationFrame(() => { c.className = "curtain in out"; setTimeout(() => { c.className = "curtain"; G.busy = false; }, 840); });
    }
    if (!G.first) { const h = $("main h1"); if (h) { h.setAttribute("tabindex", "-1"); h.focus({ preventScroll: true }); } }
    G.first = false;
    try { G.lenis?.resize(); } catch { /* ignore */ }
    return cleanup;
  }, [pathname]);

  // menu open: lock scroll
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    if (G.lenis) { if (menuOpen) G.lenis.stop(); else G.lenis.start(); }
    if (menuOpen) setTimeout(() => $<HTMLButtonElement>(".ov-close")?.focus({ preventScroll: true }), 300);
  }, [menuOpen]);

  const navCls = (key: string, base: string) => base + (sec === key ? " on" : "");

  return (
    <>
      <div className="loader" aria-hidden="true">
        <div className="ld-in">
          <p className="ld-si" lang="si">රන්ලංකා</p>
          <p className="ld-word">RANLANKA</p>
          <div className="ld-row"><span className="ld-bar"><i></i></span><span className="ld-count">000</span></div>
        </div>
      </div>
      <div className="curtain" aria-hidden="true" ref={curtainRef}><p>RANLANKA</p></div>
      <div className="cursor" aria-hidden="true"><div className="ring"><b>View</b></div><div className="dot"></div></div>

      <header className={"head" + (pathname === "/" ? " over" : "")} ref={headRef}>
        <div className="topbar">
          <div className="wrap tb-in">
            <p>22K today <b>LKR 312,000</b> per pawn <span className="tag">Sample</span></p>
            <p className="tb-r"><i className="tb-dot" data-dot=""></i><span data-open="">Open Monday to Saturday</span><span aria-hidden="true">·</span><span>{PHONE}</span></p>
          </div>
        </div>
        <div className="nav">
          <div className="wrap nav-in">
            <nav className="nav-l" aria-label="Main">
              <button className="menu-btn" type="button" aria-expanded={menuOpen} aria-controls="overlay" onClick={() => setMenuOpen(true)}><i></i><span>Menu</span></button>
              {NAV_L.map((n) => <a key={n.key} className={navCls(n.key, "nl wide")} href={n.href}>{n.label}</a>)}
            </nav>
            <a className="logo" href="/" aria-label="Ranlanka home"><b>RANLANKA</b><span lang="si">රන්ලංකා</span></a>
            <div className="nav-r">
              {NAV_R.map((n) => <a key={n.key} className={navCls(n.key, "nl wide")} href={n.href}>{n.label}</a>)}
              <a className={navCls("visit", "nl box")} href="/visit"><span className="long">Book a visit</span><span className="short">Visit</span></a>
            </div>
          </div>
        </div>
      </header>

      <div className={"overlay" + (menuOpen ? " open" : "")} id="overlay" aria-hidden={!menuOpen}>
        <div className="wrap ov-in">
          <div className="ov-top">
            <button className="ov-close" type="button" onClick={() => setMenuOpen(false)}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true"><path d="M5 5l14 14M19 5L5 19" /></svg>Close
            </button>
            <span className="logo" style={{ gridColumn: 2 }}><b>RANLANKA</b><span lang="si">රන්ලංකා</span></span>
          </div>
          <div className="ov-body">
            <nav className="ov-links" aria-label="Menu">
              {MENU.map((n) => <a key={n.key} href={n.href} className={sec === n.key ? "on" : undefined}><span>{n.label}</span><small>{n.small}</small></a>)}
            </nav>
            <div className="ov-side">
              <div className="ov-img"><img src="/img/bride.webp" alt="" loading="lazy" /></div>
              <dl>
                <dt>22K today</dt><dd><b>LKR 312,000</b> per pawn <span className="tag">Sample</span></dd>
                <dt>Showroom</dt><dd>192 Main Street, Negombo</dd>
                <dt>Hours</dt><dd data-open="">Monday to Saturday, 10:00 am to 7:30 pm</dd>
                <dt>Call</dt><dd><b>{PHONE}</b></dd>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
