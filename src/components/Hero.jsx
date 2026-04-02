'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { number: 27, prefix: '+', label: 'Years of Experience' },
  { number: 450, prefix: '+', label: 'Projects' },
  { number: 12, prefix: '+', label: 'States in India' },
  { number: 200, prefix: '+', label: 'Workers' },
];

export default function Hero() {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const subRef = useRef(null);
  const descRef = useRef(null);
  const gridRef = useRef(null);
  const statsRef = useRef(null);
  const bgRef = useRef(null);
  const numberRefs = useRef([]);
  const cornerRefs = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.set([headingRef.current, subRef.current, descRef.current, statsRef.current], { opacity: 0 });

        const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 1 } });

        tl.fromTo(gridRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });
        tl.fromTo(headingRef.current, { opacity: 0, y: 60, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 1.2 }, '-=0.8');
        tl.fromTo(subRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5');
        tl.fromTo(descRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');
        tl.fromTo(statsRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.9 }, '-=0.3');

        // Count-up
        const counterStart = tl.duration();
        numberRefs.current.forEach((el, i) => {
          if (!el) return;
          const target = STATS[i].number;
          const obj = { val: 0 };
          tl.to(obj, {
            val: target, duration: 2, ease: 'power2.out',
            onUpdate: () => { el.textContent = STATS[i].prefix + Math.round(obj.val); },
          }, counterStart);
        });

        /* ── PARALLAX: Background image moves slower ── */
        gsap.to(bgRef.current, {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
        });

        /* ── PARALLAX: Grid lines ── */
        gsap.to(gridRef.current, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 0.8 },
        });

        /* ── PARALLAX: Heading depth ── */
        gsap.to(headingRef.current, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 0.5 },
        });

        /* ── Corner accents fade ── */
        cornerRefs.current.forEach((el) => {
          if (!el) return;
          gsap.to(el, {
            opacity: 0, scale: 1.3, ease: 'none',
            scrollTrigger: { trigger: heroRef.current, start: 'top top', end: '60% top', scrub: 0.4 },
          });
        });
      }, heroRef);
      return () => ctx.revert();
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0B0B0B' }}
    >
      {/* Background image with dark overlay */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform" style={{ top: '-10%', bottom: '-10%' }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.65)' }} />
      </div>

      {/* Industrial Grid lines */}
      <div ref={gridRef} className="absolute inset-0 opacity-0 will-change-transform" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(244, 161, 3, 0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(244, 161, 3, 0.04) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'linear-gradient(rgba(244, 161, 3, 0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(244, 161, 3, 0.07) 1px, transparent 1px)',
            backgroundSize: '300px 300px',
          }}
        />
      </div>

      <div className="vignette" />

      {/* Corner accents */}
      <div ref={el => cornerRefs.current[0] = el} className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-primary/30 hidden md:block will-change-transform" />
      <div ref={el => cornerRefs.current[1] = el} className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-primary/30 hidden md:block will-change-transform" />
      <div ref={el => cornerRefs.current[2] = el} className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-primary/30 hidden md:block will-change-transform" />
      <div ref={el => cornerRefs.current[3] = el} className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-primary/30 hidden md:block will-change-transform" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-32 md:pt-40 pb-16 md:pb-20 max-w-container mx-auto w-full">
        <h1
          ref={headingRef}
          className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-wider uppercase leading-tight whitespace-nowrap will-change-transform"
        >
          <span className="text-white">INTERFACE </span>
          <span className="text-primary">ELEVATIONS</span>
          <span className="text-white"> & </span>
          <span className="text-primary">SIGNS</span>
        </h1>

        {/* Subheadline */}
        <p
          ref={subRef}
          className="mt-4 md:mt-5 font-heading font-medium text-sm sm:text-base md:text-lg tracking-[0.15em] uppercase"
          style={{ color: '#D4A017' }}
        >
          Chennai&apos;s Premier Facade &amp; Signage Experts Since 1998
        </p>

        <p
          ref={descRef}
          className="mt-6 md:mt-8 text-white/80 font-body text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl"
        >
          Delivering high-quality facade, glazing, and signage solutions with precision, durability, and modern aesthetics. We specialize in customized designs tailored to your project requirements.
        </p>

        {/* Stats Boxes — reduced gap */}
        <div
          ref={statsRef}
          className="mt-8 md:mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 w-full max-w-5xl"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="border border-primary/60 rounded-sm px-4 py-6 md:py-8 flex flex-col items-center backdrop-blur-sm"
              style={{ background: 'rgba(11,11,11,0.5)' }}
            >
              <span className="text-white font-heading font-semibold text-xs md:text-sm tracking-wider uppercase">
                {stat.label}
              </span>
              <div className="w-10 h-px bg-primary/60 my-3" />
              <span
                ref={(el) => (numberRefs.current[i] = el)}
                className="text-primary font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl"
              >
                {stat.prefix}0
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
