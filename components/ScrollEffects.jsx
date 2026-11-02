'use client';

import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

const FRAME_COUNT = 94;
const frameSrc = (i) => `/frames/f${String(i).padStart(3, '0')}.webp`;

// All page-level motion: header state, smooth scroll, hero intro, ribbon drawing,
// the scrubbed box video, heading reveals, the four occasion transitions and the footer bow.
export default function ScrollEffects() {
  useEffect(() => {
    const head = document.querySelector('.site-head');
    const onScroll = () => head && head.classList.toggle('solid', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      document.documentElement.classList.remove('motion');
      return () => window.removeEventListener('scroll', onScroll);
    }
    document.documentElement.classList.add('motion');
    gsap.registerPlugin(ScrollTrigger);

    /* smooth scroll */
    const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (t) => lenis.raf(t * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    const anchorHandlers = [];
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      const handler = (e) => {
        const id = a.getAttribute('href');
        if (id.length < 2) return;
        const el = document.querySelector(id);
        if (!el) return;
        e.preventDefault();
        lenis.scrollTo(el, { offset: id === '#occasions' ? 0 : -10, duration: 1.4 });
      };
      a.addEventListener('click', handler);
      anchorHandlers.push([a, handler]);
    });

    /* reveal canvas setup (outside the gsap context so listeners can be removed) */
    const canvas = document.getElementById('rv-canvas');
    const ctx2d = canvas.getContext('2d');
    const frames = [];
    const cur = { f: 0 };
    let last = -1;
    for (let i = 1; i <= FRAME_COUNT; i++) {
      const im = new Image();
      im.decoding = 'async';
      im.src = frameSrc(i);
      frames.push(im);
    }
    function draw() {
      const idx = Math.round(cur.f);
      let im = frames[idx];
      if (!im || !im.complete || !im.naturalWidth) {
        for (let k = idx; k >= 0; k--) {
          if (frames[k].complete && frames[k].naturalWidth) { im = frames[k]; break; }
        }
      }
      if (!im || !im.naturalWidth || (idx === last && canvas.dataset.w == canvas.width)) return;
      last = idx;
      canvas.dataset.w = canvas.width;
      const cw = canvas.width, ch = canvas.height;
      const r = Math.max(cw / im.naturalWidth, ch / im.naturalHeight);
      const w = im.naturalWidth * r, h = im.naturalHeight * r;
      ctx2d.clearRect(0, 0, cw, ch);
      ctx2d.drawImage(im, (cw - w) / 2, (ch - h) / 2, w, h);
    }
    function size() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
      last = -1;
      draw();
    }
    frames[0].onload = size;
    if (frames[0].complete) size();
    window.addEventListener('resize', size);

    const ctx = gsap.context(() => {
      /* hero intro */
      gsap.set(['.hero-mark', '.hero-copy', '.site-head'], { visibility: 'visible' });
      const intro = gsap.timeline({ defaults: { ease: 'power4.out' } });
      intro
        .from('.hero-mark .l', { xPercent: -60, opacity: 0, duration: 1.2 })
        .from('.hero-mark .r', { xPercent: 60, opacity: 0, duration: 1.2 }, '<')
        .from('.hero-box .box-body', { y: -60, opacity: 0, duration: 1, ease: 'bounce.out', transformOrigin: '50% 100%' }, '<.15')
        .from('.hero-box .box-bow', { scale: 0, duration: 0.7, ease: 'back.out(3)', transformOrigin: '50% 100%' }, '-=.35')
        .fromTo('#th-hero', { '--draw': '0%' }, { '--draw': '100%', duration: 1.4, ease: 'power2.inOut' }, '-=.3')
        .from('.hero-copy .line>span', { yPercent: 110, duration: 1, stagger: 0.1 }, '-=1.1')
        .from('.hero-copy .side>*', { y: 24, opacity: 0, duration: 0.8, stagger: 0.12 }, '-=.8')
        .from('.site-head', { y: -30, opacity: 0, duration: 0.8 }, '-=.9');
      gsap.to('.hero-mark', {
        yPercent: -18, ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true },
      });

      /* ribbon segments draw on scroll */
      ['th-intro', 'th-build', 'th-corp', 'th-contact'].forEach((id) => {
        const el = document.getElementById(id);
        gsap.fromTo(el, { '--draw': '0%' }, {
          '--draw': '100%', ease: 'none',
          scrollTrigger: { trigger: el.parentNode, start: 'top 75%', end: 'bottom 70%', scrub: 0.6 },
        });
      });

      /* reveal: scrubbed frames */
      const rv = gsap.timeline({
        scrollTrigger: { trigger: '#reveal', start: 'top top', end: '+=260%', scrub: 0.5, pin: true, anticipatePin: 1 },
      });
      rv.to(cur, { f: FRAME_COUNT - 1, ease: 'none', duration: 1, onUpdate: draw }, 0)
        .fromTo('.rv-count .bar i', { '--rv': '0%' }, { '--rv': '100%', ease: 'none', duration: 1 }, 0)
        .fromTo('.reveal .entry', { scaleY: 0, transformOrigin: 'top' }, { scaleY: 1, duration: 0.12, ease: 'none' }, 0)
        .from('.rv-1 > *', { y: 40, opacity: 0, stagger: 0.02, duration: 0.08 }, 0.02)
        .to('.rv-1', { opacity: 0, y: -40, duration: 0.08 }, 0.3)
        .fromTo('.rv-2', { opacity: 0, x: 60 }, { opacity: 1, x: 0, duration: 0.1 }, 0.36)
        .to('.rv-2', { opacity: 0, x: -40, duration: 0.08 }, 0.62)
        .fromTo('.rv-3', { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.1 }, 0.7)
        .to('.reveal .entry', { opacity: 0, duration: 0.1 }, 0.2);

      /* section headings: char rise */
      document.querySelectorAll('.occ-intro .split-chars, .build .split-chars, .corp .split-chars, .contact .split-chars').forEach((h) => {
        gsap.from(h.querySelectorAll('.ch'), {
          yPercent: 120, rotate: 8, opacity: 0, duration: 0.9, ease: 'power4.out', stagger: 0.025,
          scrollTrigger: { trigger: h, start: 'top 85%', toggleActions: 'play none none reverse' },
        });
      });
      gsap.utils.toArray('.occ-intro .inner > p, .builder .field, .builder .summary, .corp-copy .ticks li, .corp-copy .btn, .contact .info > p, .place, .form').forEach((el) => {
        gsap.from(el, {
          y: 36, opacity: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none reverse' },
        });
      });
      gsap.from('.box-preview', {
        y: 80, rotate: -4, opacity: 0, duration: 1.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.build', start: 'top 70%' },
      });
      gsap.fromTo('.corp-img', { clipPath: 'inset(18% 18% 18% 18% round 28px)' }, {
        clipPath: 'inset(0% 0% 0% 0% round 28px)', ease: 'power2.out',
        scrollTrigger: { trigger: '.corp-img', start: 'top 85%', end: 'top 35%', scrub: 0.6 },
      });
      gsap.to('.corp-img img', {
        yPercent: -8, ease: 'none',
        scrollTrigger: { trigger: '.corp', start: 'top bottom', end: 'bottom top', scrub: true },
      });

      /* occasions: four different transitions */
      const tWed = document.querySelectorAll('.t-wed .ch');
      const tNew = document.querySelectorAll('.t-new .ch');
      const tGrad = document.querySelectorAll('.t-grad .ch');
      const tEid = document.querySelectorAll('.t-eid .ch');
      const labels = document.querySelectorAll('.occ-labels span');
      const setLabel = (i) => labels.forEach((l, k) => l.classList.toggle('on', k === i));

      gsap.set('#s-new', { xPercent: 100, opacity: 1 });
      gsap.set('#s-grad', { clipPath: 'polygon(0% 120%, 100% 100%, 100% 100%, 0% 100%)' });
      gsap.set('#s-eid', { clipPath: 'circle(0% at 76% 38%)' });

      const occ = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: '#occ-stage', start: 'top top', end: '+=420%', scrub: 0.7, pin: true, anticipatePin: 1,
          onUpdate: (s) => { const p = s.progress; setLabel(p < 0.3 ? 0 : p < 0.55 ? 1 : p < 0.8 ? 2 : 3); },
        },
      });
      occ.fromTo('.occ-track i', { '--occ': '0%' }, { '--occ': '100%', duration: 4 }, 0)
        /* 1 — Weddings: curtain opens from the centre, image settles */
        .fromTo('#s-wed', { clipPath: 'inset(14% 22% 14% 22% round 32px)' }, { clipPath: 'inset(0% 0% 0% 0% round 0px)', duration: 0.6, ease: 'power2.out' }, 0)
        .fromTo('#s-wed img', { scale: 1.3 }, { scale: 1, duration: 0.8, ease: 'power2.out' }, 0)
        .from(tWed, { yPercent: 110, opacity: 0, stagger: 0.03, duration: 0.3, ease: 'power3.out' }, 0.25)
        .from('#s-wed .slide-copy > :not(h3)', { y: 24, opacity: 0, stagger: 0.05, duration: 0.2 }, 0.4)
        /* 2 — Newborns: pushes in from the right on a gold edge */
        .to('#s-wed', { xPercent: -35, duration: 0.7, ease: 'power2.inOut' }, 1)
        .to('#s-wed img', { scale: 1.08, filter: 'brightness(.6)', duration: 0.7 }, 1)
        .to('#s-new', { xPercent: 0, duration: 0.7, ease: 'power2.inOut' }, 1)
        .fromTo('#s-new img', { xPercent: 12 }, { xPercent: 0, duration: 0.7, ease: 'power2.out' }, 1)
        .from(tNew, { x: 120, opacity: 0, stagger: 0.025, duration: 0.35, ease: 'power3.out' }, 1.35)
        .from('#s-new .slide-copy > :not(h3)', { x: 60, opacity: 0, stagger: 0.05, duration: 0.2 }, 1.5)
        .to('#s-new .edge', { xPercent: -100, duration: 0.2 }, 1.75)
        /* 3 — Graduation: rises up behind a diagonal gold cut */
        .to('#s-grad', { clipPath: 'polygon(0% 0%, 100% -20%, 100% 100%, 0% 100%)', duration: 0.75, ease: 'power2.inOut' }, 2)
        .fromTo('#s-grad img', { scale: 1.25, yPercent: 10 }, { scale: 1, yPercent: 0, duration: 0.8, ease: 'power2.out' }, 2)
        .to('#s-new', { yPercent: -12, duration: 0.75 }, 2)
        .fromTo('#s-grad .cut', { opacity: 1, yPercent: 0, top: '100%' }, { top: '-8%', duration: 0.75, ease: 'power2.inOut' }, 2)
        .from(tGrad, { rotateX: -95, yPercent: 30, opacity: 0, transformOrigin: '50% 100%', stagger: 0.025, duration: 0.35, ease: 'back.out(1.6)' }, 2.4)
        .from('#s-grad .slide-copy > :not(h3)', { y: 40, opacity: 0, stagger: 0.05, duration: 0.2 }, 2.55)
        /* 4 — Eid: an iris opens from the lantern's glow */
        .to('#s-eid', { clipPath: 'circle(150% at 76% 38%)', duration: 0.8, ease: 'power2.in' }, 3)
        .fromTo('#s-eid img', { scale: 1.35, filter: 'brightness(1.6)' }, { scale: 1, filter: 'brightness(1)', duration: 0.9, ease: 'power2.out' }, 3)
        .to('#s-grad img', { scale: 1.15, duration: 0.8 }, 3)
        .from(tEid, { scale: 1.8, filter: 'blur(14px)', opacity: 0, stagger: 0.06, duration: 0.35, ease: 'power3.out' }, 3.45)
        .from('#s-eid .slide-copy > :not(h3)', { y: 30, opacity: 0, stagger: 0.05, duration: 0.2 }, 3.6)
        .to({}, { duration: 0.25 });

      /* footer bow */
      gsap.from('.foot .bow .bow-l', { rotate: -30, scale: 0.4, transformOrigin: '120px 62px', duration: 1, ease: 'elastic.out(1,.5)', scrollTrigger: { trigger: '.foot', start: 'top 85%' } });
      gsap.from('.foot .bow .bow-r', { rotate: 30, scale: 0.4, transformOrigin: '120px 62px', duration: 1, ease: 'elastic.out(1,.5)', scrollTrigger: { trigger: '.foot', start: 'top 85%' } });
      gsap.from('.foot .word', { yPercent: 40, opacity: 0, duration: 1.2, ease: 'power4.out', scrollTrigger: { trigger: '.foot', start: 'top 80%' } });
    });

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener('load', refresh);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', size);
      window.removeEventListener('load', refresh);
      anchorHandlers.forEach(([a, h]) => a.removeEventListener('click', h));
      ctx.revert();
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);

  return null;
}
