'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';

const STATS = [
  { number: 27, prefix: '+', label: 'Years of Experience' },
  { number: 450, prefix: '+', label: 'Projects' },
  { number: 12, prefix: '+', label: 'States in India' },
  { number: 200, prefix: '+', label: 'Workers' },
];

export default function Hero() {
  const heroRef = useRef(null);
  const headingRef = useRef(null);
  const descRef = useRef(null);
  const gridRef = useRef(null);
  const statsRef = useRef(null);
  const numberRefs = useRef([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        gsap.set([headingRef.current, descRef.current, statsRef.current], { opacity: 0 });

        const tl = gsap.timeline({
          defaults: { ease: 'power3.out', duration: 1 },
        });

        tl.fromTo(gridRef.current, { opacity: 0 }, { opacity: 1, duration: 1.5 });

        tl.fromTo(headingRef.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 1 }, '-=0.8');

        tl.fromTo(descRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4');

        tl.fromTo(statsRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3');

        // Count-up animation for each stat number — all start simultaneously
        const counterStart = tl.duration();
        numberRefs.current.forEach((el, i) => {
          if (!el) return;
          const target = STATS[i].number;
          const obj = { val: 0 };
          tl.to(obj, {
            val: target,
            duration: 2,
            ease: 'power2.out',
            onUpdate: () => {
              el.textContent = STATS[i].prefix + Math.round(obj.val);
            },
          }, counterStart);
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
      className="relative min-h-screen flex items-start justify-center overflow-hidden"
      style={{ backgroundColor: '#0B0B0B' }}
    >
      {/* Industrial Grid Background */}
      <div ref={gridRef} className="absolute inset-0 opacity-0" aria-hidden="true">
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
      <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-primary/30 hidden md:block" aria-hidden="true" />
      <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-primary/30 hidden md:block" aria-hidden="true" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-primary/30 hidden md:block" aria-hidden="true" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-primary/30 hidden md:block" aria-hidden="true" />

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 pt-32 md:pt-40 max-w-container mx-auto w-full">
        <h1
          ref={headingRef}
          className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-wider uppercase leading-tight whitespace-nowrap"
        >
          <span className="text-white">INTERFACE </span>
          <span className="text-primary">ELEVATIONS</span>
          <span className="text-white"> & </span>
          <span className="text-primary">SIGNS</span>
        </h1>

        <p
          ref={descRef}
          className="mt-10 md:mt-14 text-white font-body text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-3xl"
        >
          Delivering high-quality facade, glazing, and signage solutions with precision, durability, and modern aesthetics. We specialize in customized designs tailored to your project requirements.
        </p>

        {/* Stats Boxes */}
        <div
          ref={statsRef}
          className="mt-14 md:mt-20 grid grid-cols-2 sm:grid-cols-4 gap-6 md:gap-8 w-full max-w-5xl"
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              className="border border-primary rounded-sm px-6 py-8 md:py-10 flex flex-col items-center"
            >
              {/* Label */}
              <span className="text-white font-heading font-semibold text-sm md:text-base tracking-wider uppercase">
                {stat.label}
              </span>

              {/* Divider line */}
              <div className="w-12 h-px bg-primary/60 my-4" />

              {/* Counting number */}
              <span
                ref={(el) => (numberRefs.current[i] = el)}
                className="text-primary font-heading font-extrabold text-4xl md:text-5xl lg:text-6xl"
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
