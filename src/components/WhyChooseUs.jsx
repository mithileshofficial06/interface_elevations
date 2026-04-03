'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    title: '27+ Years',
    subtitle: 'Industry Experience',
    desc: 'Nearly three decades of expertise delivering solutions that stand the test of time.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M12 8v4l3 3" /><circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    title: 'Custom',
    subtitle: 'Design Solutions',
    desc: 'Tailored designs crafted to match your unique vision and architectural needs.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M12 2L2 7l10 5 10-5-10-5z" /><path d="M2 17l10 5 10-5" /><path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'Premium',
    subtitle: 'Quality Materials',
    desc: 'Only premium-grade materials ensuring durability and aesthetics.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77 5.82 21l1.18-6.86-5-4.87 6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: '200+',
    subtitle: 'Skilled Workers',
    desc: 'Trained professionals delivering meticulous craftsmanship with precision.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'On-Time',
    subtitle: 'Project Delivery',
    desc: 'Committed to deadlines with efficient project management workflows.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const lineRef = useRef(null);
  const labelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading (#3) — y:60, duration:1s
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } }
      );

      // Section label — letter-spacing (#3)
      if (labelRef.current) {
        gsap.fromTo(labelRef.current,
          { opacity: 0, letterSpacing: '8px' },
          { opacity: 1, letterSpacing: '0.25em', duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } }
        );
      }

      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } }
      );

      // Cards stagger (#18) — 0.1s delay each
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.8, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: '#111111' }}
    >
      {/* Section divider (#29) */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="section-divider" />
      </div>

      {/* Dark construction site background image overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&q=80)' }}
      />
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.85)' }} />

      {/* Decorative glows */}
      <div className="absolute pointer-events-none" style={{ right: '-10%', top: '20%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(244,161,3,0.04) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-container mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-16 md:mb-20" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-10 h-[2px] bg-primary" />
            <span ref={labelRef} className="text-primary font-heading font-bold text-sm md:text-base tracking-[0.25em] uppercase" style={{ opacity: 0 }}>
              Why Choose Us
            </span>
            <div className="w-10 h-[2px] bg-primary" />
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            Built on <span className="text-primary">Trust</span>,{' '}
            <br className="hidden sm:block" />
            Delivered with <span className="text-primary">Excellence</span>
          </h2>
          <div ref={lineRef} className="mt-6 h-[3px] w-24 mx-auto bg-gradient-to-r from-primary to-primary-light origin-center" style={{ transform: 'scaleX(0)' }} />
        </div>

        {/* 5 Icon Cards in a row (#17 hover) */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {REASONS.map((reason, i) => (
            <div
              key={reason.title}
              ref={el => cardsRef.current[i] = el}
              className="why-card group relative flex flex-col items-center text-center p-8 rounded-xl cursor-default"
              style={{
                opacity: 0,
                background: '#1A1A1A',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {/* Gold top border on hover */}
              <div
                className="absolute top-0 left-0 right-0 h-[3px] rounded-t-xl transition-all duration-500 opacity-0 group-hover:opacity-100"
                style={{ background: 'linear-gradient(90deg, transparent, #F4A103, transparent)' }}
              />

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ boxShadow: '0 0 30px rgba(244,161,3,0.08)', border: '1px solid rgba(244,161,3,0.3)' }}
              />

              {/* Icon (#17 bounce animation) */}
              <div
                className="why-icon relative w-14 h-14 rounded-xl flex items-center justify-center text-primary mb-5 transition-transform duration-500 group-hover:scale-110"
                style={{
                  background: 'linear-gradient(145deg, rgba(244,161,3,0.12), rgba(244,161,3,0.04))',
                  border: '1px solid rgba(244,161,3,0.25)',
                }}
              >
                {reason.icon}
              </div>

              {/* Title */}
              <h3 className="relative font-heading font-bold text-[16px] text-primary mb-1">
                {reason.title}
              </h3>
              <h4 className="relative font-heading font-semibold text-[16px] text-white mb-3 group-hover:text-primary transition-colors duration-300">
                {reason.subtitle}
              </h4>

              {/* Description */}
              <p className="relative font-body text-[13px] leading-[1.8] text-text-secondary">
                {reason.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
