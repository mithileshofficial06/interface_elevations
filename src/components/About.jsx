'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);
  const imageWrapRef = useRef(null);
  const textItemRefs = useRef([]);
  const labelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section label — letter-spacing animation (#3)
      if (labelRef.current) {
        gsap.fromTo(labelRef.current,
          { opacity: 0, letterSpacing: '8px' },
          {
            opacity: 1, letterSpacing: '0.2em', duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
          }
        );
      }

      // Image — LEFT slide-in (#4)
      gsap.fromTo(imageRef.current,
        { opacity: 0, x: -60, scale: 0.95 },
        {
          opacity: 1, x: 0, scale: 1, duration: 1.2, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        }
      );

      // Text — RIGHT slide-in (#5)
      gsap.fromTo(textRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1, x: 0, duration: 1.2, delay: 0.15, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
        }
      );

      // Text children — stagger (#2)
      textItemRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(el,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0, duration: 0.8, delay: 0.3 + i * 0.12, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
          }
        );
      });

      /* ── PARALLAX: Image ── */
      gsap.to(imageWrapRef.current, {
        yPercent: -12, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 },
      });

      /* ── PARALLAX: Text ── */
      gsap.to(textRef.current, {
        yPercent: -6, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative py-16 md:py-20 overflow-hidden"
      style={{ backgroundColor: '#111111' }}
    >
      {/* Section divider (#29) */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="section-divider" />
      </div>

      <div className="max-w-container mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-12">
          <div className="w-10 h-[2px] bg-primary" />
          <h2
            ref={labelRef}
            className="text-primary font-heading font-bold text-xl md:text-2xl tracking-[0.2em] uppercase"
            style={{ opacity: 0 }}
          >
            About Us
          </h2>
        </div>

        {/* Content grid — image 50%, text 50% */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-center">
          {/* Founder Image — wider 6-col (#4 left slide-in) */}
          <div ref={imageRef} className="md:col-span-6 flex flex-col items-start will-change-transform" style={{ opacity: 0 }}>
            <div ref={imageWrapRef} className="relative border border-primary/40 p-2 rounded-sm w-full will-change-transform aspect-[3/4]">
              <Image
                src="/images/profile/download.jpeg"
                alt="M. P. Ganeshan - Founder"
                fill
                className="object-cover rounded-sm"
              />
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary" />
            </div>
          </div>

          {/* About Text — 6-col (#5 right slide-in) */}
          <div ref={textRef} className="md:col-span-6 will-change-transform" style={{ opacity: 0 }}>
            <h2
              ref={el => textItemRefs.current[0] = el}
              className="font-heading font-extrabold text-2xl md:text-3xl lg:text-4xl text-white tracking-wide uppercase leading-tight mb-3"
              style={{ opacity: 0 }}
            >
              Building Trust <br />
              <span className="text-primary">Since 1998</span>
            </h2>

            {/* Gold accent underline */}
            <div
              ref={el => textItemRefs.current[1] = el}
              className="mb-3"
              style={{ width: '60px', height: '3px', backgroundColor: '#D4A017', opacity: 0 }}
            />

            <p
              ref={el => textItemRefs.current[2] = el}
              className="text-text-secondary font-body text-base md:text-lg leading-relaxed mb-6"
              style={{ opacity: 0 }}
            >
              INTERFACE ELEVATION & SIGNS, led by M. P. Ganeshan, is a Chennai-based company with over 27 years of industry experience. We provide end-to-end solutions in facade elevation, structural glazing, signage, and architectural finishes.
            </p>

            <p
              ref={el => textItemRefs.current[3] = el}
              className="text-text-secondary font-body text-base md:text-lg leading-relaxed mb-8"
              style={{ opacity: 0 }}
            >
              Our commitment is to combine design excellence, structural integrity, and innovative materials to deliver outstanding results for commercial and residential projects.
            </p>

            {/* Founder styled tag */}
            <div
              ref={el => textItemRefs.current[4] = el}
              className="inline-flex items-center gap-4 px-5 py-3 rounded-sm"
              style={{
                opacity: 0,
                background: 'linear-gradient(135deg, rgba(212,160,23,0.1), rgba(212,160,23,0.03))',
                border: '1px solid rgba(212,160,23,0.3)',
              }}
            >
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'rgba(212,160,23,0.15)', border: '1px solid rgba(212,160,23,0.4)' }}>
                <span className="text-primary font-heading font-bold text-sm">MG</span>
              </div>
              <div>
                <h3 className="text-white font-heading font-bold text-sm md:text-base tracking-wide">
                  M. P. Ganeshan
                </h3>
                <p className="text-primary font-body text-xs tracking-wider uppercase">
                  Founder & Managing Director
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
