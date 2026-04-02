'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    title: '27+ Years of Industry Experience',
    desc: 'Nearly three decades of expertise in elevation and signage, delivering solutions that stand the test of time.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 8v4l3 3" />
        <circle cx="12" cy="12" r="10" />
      </svg>
    ),
  },
  {
    title: 'Customized Design Solutions',
    desc: 'Tailored designs crafted to match your unique vision, brand identity, and architectural requirements.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 2L2 7l10 5 10-5-10-5z" />
        <path d="M2 17l10 5 10-5" />
        <path d="M2 12l10 5 10-5" />
      </svg>
    ),
  },
  {
    title: 'High-Quality Materials',
    desc: 'We source and use only premium-grade materials ensuring durability, aesthetics, and long-lasting performance.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.86L12 17.77 5.82 21l1.18-6.86-5-4.87 6.91-1.01L12 2z" />
      </svg>
    ),
  },
  {
    title: 'Skilled Workforce & Precision Execution',
    desc: 'Over 200 trained professionals delivering meticulous craftsmanship with uncompromising attention to detail.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: 'On-Time Project Delivery',
    desc: 'Committed to meeting deadlines with efficient project management and streamlined execution workflows.',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
        <polyline points="22 4 12 14.01 9 11.01" />
      </svg>
    ),
  },
];

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );

      // Accent line grow
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1, ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );

      // Cards staggered from alternating sides
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const fromLeft = i % 2 === 0;
        gsap.fromTo(card,
          { opacity: 0, x: fromLeft ? -60 : 60, rotateY: fromLeft ? 8 : -8 },
          {
            opacity: 1, x: 0, rotateY: 0, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 88%', once: true },
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
      style={{ backgroundColor: '#0F0F0F' }}
    >
      {/* top border accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* decorative background glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          right: '-10%', top: '20%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(244,161,3,0.04) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          left: '-10%', bottom: '10%',
          width: '400px', height: '400px',
          background: 'radial-gradient(circle, rgba(244,161,3,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-container mx-auto px-6">
        {/* Section heading */}
        <div ref={headingRef} className="mb-16 md:mb-20" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[2px] bg-primary" />
            <span className="text-primary font-heading font-bold text-sm md:text-base tracking-[0.25em] uppercase">
              Why Choose Us
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            Built on <span className="text-primary">Trust</span>,{' '}
            <br className="hidden sm:block" />
            Delivered with <span className="text-primary">Excellence</span>
          </h2>
          {/* animated accent line */}
          <div
            ref={lineRef}
            className="mt-6 h-[3px] w-24 bg-gradient-to-r from-primary to-primary-light origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-5">
          {REASONS.map((reason, i) => (
            <div
              key={reason.title}
              ref={el => cardsRef.current[i] = el}
              className="group relative flex items-start gap-6 md:gap-8 p-6 md:p-8 rounded-xl transition-all duration-500 cursor-default"
              style={{
                opacity: 0,
                background: 'linear-gradient(135deg, rgba(26,26,26,0.8), rgba(20,20,20,0.9))',
                border: '1px solid rgba(244,161,3,0.1)',
                backdropFilter: 'blur(10px)',
              }}
            >
              {/* hover glow overlay */}
              <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  border: '1px solid rgba(244,161,3,0.35)',
                  boxShadow: '0 0 30px rgba(244,161,3,0.08), inset 0 0 30px rgba(244,161,3,0.03)',
                }}
              />

              {/* Number index */}
              <div className="flex-shrink-0 relative">
                <div
                  className="w-14 h-14 md:w-16 md:h-16 rounded-xl flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                  style={{
                    background: 'linear-gradient(145deg, rgba(244,161,3,0.15), rgba(244,161,3,0.05))',
                    border: '1px solid rgba(244,161,3,0.25)',
                    boxShadow: '0 4px 20px rgba(244,161,3,0.1)',
                  }}
                >
                  <span className="text-primary font-heading font-extrabold text-lg md:text-xl">
                    0{i + 1}
                  </span>
                </div>
              </div>

              {/* Icon */}
              <div className="flex-shrink-0 mt-1 text-primary/70 group-hover:text-primary transition-colors duration-300">
                {reason.icon}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-bold text-lg md:text-xl text-white group-hover:text-primary transition-colors duration-300 mb-2">
                  {reason.title}
                </h3>
                <p className="font-body text-sm md:text-base text-text-secondary leading-relaxed">
                  {reason.desc}
                </p>
              </div>

              {/* Decorative arrow / chevron on hover */}
              <div className="flex-shrink-0 self-center opacity-0 group-hover:opacity-100 translate-x-[-8px] group-hover:translate-x-0 transition-all duration-400">
                <svg viewBox="0 0 24 24" fill="none" stroke="#F4A103" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
