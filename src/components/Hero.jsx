'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STATS = [
  { number: 27, prefix: '+', label: 'Years of Experience' },
  { number: 450, prefix: '+', label: 'Projects' },
  { number: 12, prefix: '+', label: 'States in India' },
  { number: 200, prefix: '+', label: 'Workers' },
];

/* Hero slideshow images — "first.jpeg" is index 0 */
const HERO_IMAGES = [
  '/images/hero/first.jpeg',
  '/images/hero/1`2`12`12.jpeg',
  '/images/hero/21.jpeg',
  '/images/hero/222.jpeg',
  '/images/hero/WhatsApp Image 2026-04-02 at 22.56.jpeg',
  '/images/hero/WhatsApp Image 2026-04-02 at 22.56.48.jpeg',
  '/images/hero/WhatsApp Image 2026-04-02 at 22.56.49.jpeg',
  '/images/hero/WhatsApp Image 2026-04-02 at 22.56.50.jpeg',
  '/images/hero/WhatsApp Image 2026-04-02 at 22.56.51.jpeg',
  '/images/hero/WhatsApp Image 2026-04-02 at 22.56.53.jpeg',
  '/images/hero/WhatsApp Image 2026-04-02 at 22.56.54.jpeg',
  '/images/hero/WhatsApp Image 2026-04-02 at 22.56.55.jpeg',
  '/images/hero/WhatsApp Image 2026-04-02 at 22.56.59.jpeg',
  '/images/hero/WhatsApp Image 2026-04-02 at 22.57.00.jpeg',
  '/images/hero/WhatsApp Image 2026-04-02 at 22.57.01.jpeg',
  '/images/hero/WhatsApp Image 2026-04-02 at 22.57.02.jpeg',
  '/images/hero/WhatsApp Image 2026-04-02 at 22.57.03.jpeg',
  '/images/hero/d123.jpeg',
  '/images/hero/dsd.jpeg',
  '/images/hero/dsdsdfs.jpeg',
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
  const slideshowRef = useRef(null);
  const ctaRef = useRef(null);
  const labelRef = useRef(null);
  const statCardRefs = useRef([]);

  const [currentSlide, setCurrentSlide] = useState(0);
  const [prevSlide, setPrevSlide] = useState(-1);
  const [slideDirection, setSlideDirection] = useState('next'); // 'next' = right-to-left, 'prev' = left-to-right
  const autoPlayRef = useRef(null);

  const goToSlide = useCallback((index, dir = 'next') => {
    let next = index;
    if (next >= HERO_IMAGES.length) next = 0;
    if (next < 0) next = HERO_IMAGES.length - 1;
    setSlideDirection(dir);
    setPrevSlide(currentSlide);
    setCurrentSlide(next);
  }, [currentSlide]);

  const goNext = useCallback(() => goToSlide(currentSlide + 1, 'next'), [currentSlide, goToSlide]);
  const goPrev = useCallback(() => goToSlide(currentSlide - 1, 'prev'), [currentSlide, goToSlide]);

  // Auto-play every 4 seconds (always slides right-to-left)
  useEffect(() => {
    autoPlayRef.current = setInterval(() => {
      setSlideDirection('next');
      setCurrentSlide(prev => {
        setPrevSlide(prev);
        return (prev + 1) % HERO_IMAGES.length;
      });
    }, 4000);
    return () => clearInterval(autoPlayRef.current);
  }, []);

  // Reset auto-play timer on manual navigation
  const handleManualNav = useCallback((direction) => {
    clearInterval(autoPlayRef.current);
    if (direction === 'next') goNext();
    else goPrev();
    autoPlayRef.current = setInterval(() => {
      setSlideDirection('next');
      setCurrentSlide(prev => {
        setPrevSlide(prev);
        return (prev + 1) % HERO_IMAGES.length;
      });
    }, 4000);
  }, [goNext, goPrev]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const ctx = gsap.context(() => {
        // Hide all elements initially
        gsap.set([headingRef.current, subRef.current, descRef.current, statsRef.current], { opacity: 0 });
        if (labelRef.current) gsap.set(labelRef.current, { opacity: 0 });
        if (ctaRef.current) gsap.set(ctaRef.current, { opacity: 0 });

        // ── HERO LOAD SEQUENCE (#6) ──
        const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

        // 1. Background scale from 1.05 to 1.0 (Ken Burns entry)
        tl.fromTo(bgRef.current,
          { scale: 1.05, opacity: 0 },
          { scale: 1.0, opacity: 1, duration: 1.5, ease: 'power2.out' }
        );

        // 2. Grid lines fade in
        tl.fromTo(gridRef.current, { opacity: 0 }, { opacity: 1, duration: 1.0 }, '-=1.0');

        // 3. Section label — fade in with letter-spacing expanding
        if (labelRef.current) {
          tl.fromTo(labelRef.current,
            { opacity: 0, letterSpacing: '8px' },
            { opacity: 1, letterSpacing: '0.15em', duration: 0.6, ease: 'power3.out' },
            0.3
          );
        }

        // 4. Main headline — each WORD slides up individually
        if (headingRef.current) {
          const words = headingRef.current.querySelectorAll('.hero-word');
          if (words.length > 0) {
            gsap.set(headingRef.current, { opacity: 1 });
            tl.fromTo(words,
              { opacity: 0, y: 80 },
              { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power4.out' },
              0.4
            );
          } else {
            tl.fromTo(headingRef.current,
              { opacity: 0, y: 60, scale: 0.96 },
              { opacity: 1, y: 0, scale: 1, duration: 1.2 },
              0.4
            );
          }
        }

        // 5. Subheadline
        tl.fromTo(subRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.8
        );

        // 6. Description text
        tl.fromTo(descRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 },
          1.0
        );

        // 7. CTA buttons slide up
        if (ctaRef.current) {
          tl.fromTo(ctaRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            1.2
          );
        }

        // 8. Stats cards — stagger in
        if (statCardRefs.current.length > 0) {
          gsap.set(statsRef.current, { opacity: 1 });
          tl.fromTo(
            statCardRefs.current.filter(Boolean),
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'power3.out' },
            1.4
          );
        } else {
          tl.fromTo(statsRef.current,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.9 },
            1.4
          );
        }

        // 9. Slideshow entrance
        if (slideshowRef.current) {
          tl.fromTo(slideshowRef.current,
            { opacity: 0, x: 80, scale: 0.95 },
            { opacity: 1, x: 0, scale: 1, duration: 1.2, ease: 'power4.out' },
            '-=1'
          );
        }

        /* ── PARALLAX (#30) ── */
        gsap.to(bgRef.current, {
          yPercent: 25, ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 0.6 },
        });
        gsap.to(gridRef.current, {
          yPercent: -20, ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 0.8 },
        });
        gsap.to(headingRef.current, {
          yPercent: -15, ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: 0.5 },
        });

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

    /* ── STATS COUNTER (#27) — ScrollTrigger based ── */
    const runCounter = (el) => {
      const targetVal = parseFloat(el.getAttribute('data-target'));
      const prefix = el.getAttribute('data-prefix') || '';
      let startTime = null;
      const duration = 2000;
      const easeOut = t => 1 - Math.pow(1 - t, 3);

      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const currentVal = Math.round(easeOut(progress) * targetVal);
        el.textContent = currentVal;
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          el.textContent = prefix + targetVal;
        }
      };
      window.requestAnimationFrame(step);
    };

    // Use ScrollTrigger to fire counters when stats scroll into view
    const counterTriggers = [];
    numberRefs.current.forEach(el => {
      if (!el) return;
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: 'top 90%',
        once: true,
        onEnter: () => runCounter(el),
      });
      counterTriggers.push(trigger);
    });

    return () => {
      clearTimeout(timer);
      counterTriggers.forEach(t => t.kill());
    };
  }, []);

  /* ── Helper: wrap text in word spans ── */
  const wrapWords = (text) => {
    return text.split(' ').map((word, i) => (
      <span key={i} className="hero-word inline-block" style={{ opacity: 0 }}>
        {word}{' '}
      </span>
    ));
  };

  return (
    <section
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#0B0B0B' }}
    >
      {/* Background image with dark overlay + Ken Burns (#7) */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform" style={{ top: '-10%', bottom: '-10%' }}>
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat ken-burns-bg"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80)',
          }}
        />
        <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.82)' }} />
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

      {/* ═══ TWO-COLUMN HERO LAYOUT ═══ */}
      <div className="relative z-10 w-full max-w-container mx-auto px-6 pl-[8%] pt-28 md:pt-36 pb-16 md:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">

          {/* LEFT — Text Content */}
          <div className="flex flex-col items-start text-left">
            {/* Section label with letter-spacing animation */}
            <div ref={labelRef} style={{ opacity: 0 }}>
              <span className="text-primary font-heading font-bold text-xs tracking-[0.25em] uppercase mb-2 inline-block">
                Cover to Ever
              </span>
            </div>

            <h1
              ref={headingRef}
              className="font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl tracking-wider uppercase leading-tight will-change-transform"
              style={{ opacity: 0 }}
            >
              <span className="hero-word inline-block text-white" style={{ opacity: 0 }}>INTERFACE </span>
              <span className="hero-word inline-block text-primary" style={{ opacity: 0 }}>ELEVATIONS</span>
              <br className="hidden md:block"/>
              <span className="hero-word inline-block text-white" style={{ opacity: 0 }}>& </span>
              <span className="hero-word inline-block text-primary" style={{ opacity: 0 }}>SIGNS</span>
            </h1>

            <p
              ref={subRef}
              className="mt-4 md:mt-5 font-heading font-medium text-sm sm:text-base md:text-lg tracking-[0.15em] uppercase"
              style={{ color: '#D4A017', opacity: 0 }}
            >
              Pan-India Facade &amp; Signage Experts Since 1998
            </p>

            <p
              ref={descRef}
              className="mt-6 text-white/80 font-body text-base sm:text-lg md:text-xl font-light leading-relaxed max-w-xl"
              style={{ opacity: 0 }}
            >
              Delivering high-quality facade, glazing, and signage solutions with precision, durability, and modern aesthetics. We specialize in customized designs tailored to your project requirements.
            </p>

            {/* CTA Buttons (#11, #12) */}
            <div ref={ctaRef} className="mt-8 flex flex-col sm:flex-row items-start sm:items-center gap-4" style={{ opacity: 0 }}>
              <a
                href="#projects"
                className="btn-gold-primary px-8 py-3.5 font-heading font-bold text-sm tracking-[0.15em] uppercase text-black"
                style={{ backgroundColor: '#D4A017' }}
              >
                View Our Projects
              </a>
              <a
                href="#contact"
                className="btn-outline-gold px-8 py-3.5 font-heading font-bold text-sm tracking-[0.15em] uppercase"
                style={{ color: '#D4A017', border: '1px solid #D4A017' }}
              >
                Get a Free Quote
              </a>
            </div>
          </div>

          {/* RIGHT — Image Slideshow */}
          <div
            ref={slideshowRef}
            className="relative w-full hidden md:block"
            style={{ opacity: 0 }}
          >
            {/* Image container with gold border accent */}
            <div
              className="relative w-full overflow-hidden rounded-sm"
              style={{
                aspectRatio: '4/3',
                border: '2px solid rgba(212,160,23,0.3)',
                boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(212,160,23,0.08)',
              }}
            >
              {/* All images stacked — horizontal slide transition */}
              {HERO_IMAGES.map((src, i) => {
                const encoded = src.split('/').map(s => encodeURIComponent(s)).join('/');

                // Determine position: current slide in view, previous exiting, rest hidden
                let translateX = '100%'; // default: off-screen right
                let visibility = 'hidden';

                if (i === currentSlide) {
                  translateX = '0%';
                  opacity = 1;
                  zIndex = 2;
                  visibility = 'visible';
                } else if (i === prevSlide) {
                  // Previous slide exits opposite direction
                  translateX = slideDirection === 'next' ? '-100%' : '100%';
                  opacity = 1;
                  zIndex = 1;
                  visibility = 'visible';
                } else {
                  // Hidden slides positioned off-screen in entry direction
                  translateX = slideDirection === 'next' ? '100%' : '-100%';
                  opacity = 0;
                  zIndex = 0;
                  visibility = 'hidden';
                }

                // Optimization: only render Next Image if it's visible or adjacent (to avoid 20 unoptimized images loading instantly)
                const isAdjacent = i === (currentSlide + 1) % HERO_IMAGES.length || i === (currentSlide - 1 + HERO_IMAGES.length) % HERO_IMAGES.length;
                const shouldRenderImage = visibility === 'visible' || isAdjacent || i === 0;

                return (
                  <div
                    key={src}
                    className="absolute inset-0"
                    style={{
                      transform: `translate3d(${translateX}, 0, 0)`,
                      opacity,
                      zIndex,
                      visibility,
                      willChange: i === currentSlide || i === prevSlide ? 'transform, opacity' : 'auto',
                      transition: i === currentSlide || i === prevSlide
                        ? 'transform 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94), opacity 0.7s ease'
                        : 'none',
                    }}
                  >
                    {shouldRenderImage && (
                      <Image
                        src={encoded}
                        alt={`Project showcase ${i + 1}`}
                        fill
                        className="object-cover"
                        priority={i === 0}
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    )}
                  </div>
                );
              })}

              {/* Dark gradient at bottom for contrast */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />

              {/* Gold corner accents on the slideshow */}
              <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-[#D4A017]" />
              <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-[#D4A017]" />
              <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-[#D4A017]" />
              <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-[#D4A017]" />

              {/* Navigation Arrows */}
              <button
                onClick={() => handleManualNav('prev')}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer hover:scale-110 z-20"
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(212,160,23,0.4)',
                  backdropFilter: 'blur(4px)',
                }}
                aria-label="Previous image"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                onClick={() => handleManualNav('next')}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-full transition-all duration-300 cursor-pointer hover:scale-110 z-20"
                style={{
                  background: 'rgba(0,0,0,0.5)',
                  border: '1px solid rgba(212,160,23,0.4)',
                  backdropFilter: 'blur(4px)',
                }}
                aria-label="Next image"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              {/* Slide indicator dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 z-20">
                {HERO_IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      clearInterval(autoPlayRef.current);
                      const dir = i > currentSlide ? 'next' : 'prev';
                      goToSlide(i, dir);
                      autoPlayRef.current = setInterval(() => {
                        setSlideDirection('next');
                        setCurrentSlide(p => {
                          setPrevSlide(p);
                          return (p + 1) % HERO_IMAGES.length;
                        });
                      }, 4000);
                    }}
                    className="transition-all duration-300 rounded-full cursor-pointer"
                    style={{
                      width: i === currentSlide ? '20px' : '6px',
                      height: '6px',
                      background: i === currentSlide ? '#D4A017' : 'rgba(255,255,255,0.4)',
                    }}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Slide counter */}
            <div className="mt-3 flex items-center justify-between px-1">
              <span className="font-heading text-xs tracking-[0.15em] uppercase text-text-muted">
                Our Work
              </span>
              <span className="font-heading font-bold text-sm text-primary">
                {String(currentSlide + 1).padStart(2, '0')}
                <span className="text-text-muted font-normal"> / {String(HERO_IMAGES.length).padStart(2, '0')}</span>
              </span>
            </div>
          </div>

        </div>

        {/* Stats Boxes — full width below both columns */}
        <div
          ref={statsRef}
          className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-6 w-full"
          style={{ opacity: 0 }}
        >
          {STATS.map((stat, i) => (
            <div
              key={stat.label}
              ref={el => statCardRefs.current[i] = el}
              className="border border-primary/60 rounded-sm px-4 py-6 md:py-8 flex flex-col items-center backdrop-blur-sm will-change-transform"
              style={{ background: 'rgba(11,11,11,0.5)', opacity: 0 }}
            >
              <span className="text-white font-heading font-semibold text-xs md:text-sm tracking-wider uppercase">
                {stat.label}
              </span>
              <div className="w-10 h-px bg-primary/60 my-3" />
              <span
                ref={(el) => (numberRefs.current[i] = el)}
                data-target={stat.number}
                data-prefix={stat.prefix}
                className="text-primary font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl border-transparent"
              >
                0
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Section divider at bottom (#29) */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <div className="section-divider" />
      </div>
    </section>
  );
}
