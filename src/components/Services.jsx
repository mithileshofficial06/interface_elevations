'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* Building/facade icon */
const IconFacade = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="4" y="2" width="16" height="20" rx="1" />
    <line x1="4" y1="7" x2="20" y2="7" />
    <line x1="4" y1="12" x2="20" y2="12" />
    <line x1="4" y1="17" x2="20" y2="17" />
    <line x1="9" y1="2" x2="9" y2="22" />
    <line x1="15" y1="2" x2="15" y2="22" />
  </svg>
);

/* Sign/banner icon */
const IconSign = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="2" y="4" width="20" height="12" rx="1" />
    <line x1="12" y1="16" x2="12" y2="22" />
    <line x1="8" y1="22" x2="16" y2="22" />
    <line x1="6" y1="8" x2="18" y2="8" />
    <line x1="6" y1="12" x2="14" y2="12" />
  </svg>
);

/* Layers/cladding icon */
const IconLayers = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

/* Monitor/LED display icon */
const IconDisplay = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <circle cx="12" cy="10" r="1" fill="currentColor" />
  </svg>
);

const SERVICES = [
  {
    icon: <IconFacade />,
    title: 'Facade & Elevation Works',
    description: 'We design and execute premium facade elevations that enhance the visual appeal and structural performance of commercial and residential buildings.',
    items: ['Facade Elevation', 'Structural Glazing', 'Glass Elevation', 'Wood Engraving Elevation'],
    accent: '#F4A103',
  },
  {
    icon: <IconSign />,
    title: 'Structures & Signages',
    description: 'From illuminated signboards to large-scale structural signage, we deliver impactful branding solutions engineered for visibility and durability.',
    items: ['MS (Mild Steel) Structures', 'Stainless Steel & Acrylic Signages', 'Connecting Bridges', 'MS & SS Grills'],
    accent: '#FFB92E',
  },
  {
    icon: <IconLayers />,
    title: 'Cladding & Elevation Materials',
    description: 'We work with a wide range of premium materials selected for weather resistance, aesthetics, and longevity.',
    items: ['ACP (Aluminium Composite Panel)', 'Aluminium Cladding', 'HPL (High Pressure Laminate)', 'Fundermax Panels', 'Stone Lamp & Stone Veneer', 'GRP (Glass Reinforced Plastic)', 'GRC (Glass Reinforced Concrete)', 'Styrofoam Elevation'],
    accent: '#E8930C',
  },
  {
    icon: <IconDisplay />,
    title: 'LED Screens & Video Walls',
    description: 'High-resolution LED display solutions for advertising, branding, and information boards with energy-efficient, vibrant display technology.',
    items: ['Indoor LED Displays', 'Outdoor LED Screens', 'Video Wall Installations'],
    accent: '#FFC947',
  },
];

/* ─── Service Card ─── */
function ServiceCard({ service, index, sectionRef }) {
  const cardRef = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const listRef = useRef(null);

  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current,
        { opacity: 0, y: 60, scale: 0.95 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.8, delay: index * 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      );
    }, cardRef);
    return () => ctx.revert();
  }, [index, sectionRef]);

  useEffect(() => {
    if (!expanded || !listRef.current) return;
    const items = listRef.current.querySelectorAll('.service-item');
    gsap.fromTo(items,
      { opacity: 0, x: -20 },
      { opacity: 1, x: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
    );
  }, [expanded]);

  return (
    <div
      ref={cardRef}
      className="group relative rounded-2xl overflow-hidden transition-all duration-500"
      style={{
        opacity: 0,
        background: 'linear-gradient(160deg, #1A1A1A 0%, #131313 100%)',
        border: '1px solid rgba(244,161,3,0.12)',
      }}
    >
      {/* top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`,
          opacity: expanded ? 1 : 0.4,
        }}
      />

      {/* hover glow border */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: '0 0 40px rgba(244,161,3,0.08), inset 0 0 40px rgba(244,161,3,0.03)',
          border: '1px solid rgba(244,161,3,0.4)',
        }}
      />

      <div className="relative p-7 md:p-8">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div
            className="flex-shrink-0 w-14 h-14 rounded-xl flex items-center justify-center text-primary transition-transform duration-500 group-hover:scale-110"
            style={{
              background: 'linear-gradient(145deg, rgba(244,161,3,0.12), rgba(244,161,3,0.04))',
              border: '1px solid rgba(244,161,3,0.2)',
              boxShadow: '0 4px 15px rgba(244,161,3,0.08)',
            }}
          >
            {service.icon}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-heading font-bold text-lg md:text-xl text-white group-hover:text-primary transition-colors duration-300 leading-tight">
              {service.title}
            </h3>
            <p className="mt-2 font-body text-sm text-text-secondary leading-relaxed">
              {service.description}
            </p>
          </div>
        </div>

        {/* Expandable list */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: expanded ? `${service.items.length * 52 + 24}px` : '0px',
            opacity: expanded ? 1 : 0,
          }}
        >
          <div ref={listRef} className="pt-4 border-t border-white/5">
            {service.items.map((item, i) => (
              <div key={item} className="service-item flex items-center gap-3 py-2.5 group/item">
                <div className="flex-shrink-0 relative">
                  <div className="w-2 h-2 rounded-full" style={{ backgroundColor: service.accent }} />
                  <div
                    className="absolute inset-0 w-2 h-2 rounded-full animate-ping"
                    style={{ backgroundColor: service.accent, opacity: 0.3, animationDuration: '3s', animationDelay: `${i * 0.5}s` }}
                  />
                </div>
                <span className="font-body text-sm md:text-[15px] text-text-secondary group-hover/item:text-white transition-colors duration-200">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Explore button — gold arrow */}
        <button
          onClick={() => setExpanded(!expanded)}
          className="mt-4 flex items-center gap-2 px-4 py-2 rounded-sm font-heading font-semibold text-xs tracking-[0.1em] uppercase transition-all duration-300 cursor-pointer group/btn"
          style={{
            background: expanded ? 'rgba(244,161,3,0.15)' : 'rgba(244,161,3,0.08)',
            color: '#F4A103',
            border: '1px solid rgba(244,161,3,0.25)',
          }}
        >
          <span>{expanded ? 'Collapse' : 'Explore Services'}</span>
          <svg
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            className="w-4 h-4 transition-transform duration-300"
            style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
          >
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </button>
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export default function Services() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const lineRef = useRef(null);
  const gridBgRef = useRef(null);
  const glow1Ref = useRef(null);
  const glow2Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      );
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      );

      /* Parallax */
      gsap.to(gridBgRef.current, { yPercent: -15, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
      if (glow1Ref.current) gsap.to(glow1Ref.current, { yPercent: -40, xPercent: 10, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1.2 } });
      if (glow2Ref.current) gsap.to(glow2Ref.current, { yPercent: -25, xPercent: -8, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 1 } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#0B0B0B' }}>
      <div ref={gridBgRef} className="absolute inset-0 industrial-grid will-change-transform" aria-hidden="true" />
      <div className="vignette" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
      <div ref={glow1Ref} className="absolute pointer-events-none will-change-transform" style={{ left: '-5%', top: '15%', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(244,161,3,0.04) 0%, transparent 70%)' }} />
      <div ref={glow2Ref} className="absolute pointer-events-none will-change-transform" style={{ right: '-8%', bottom: '10%', width: '500px', height: '500px', background: 'radial-gradient(circle, rgba(244,161,3,0.03) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-container mx-auto px-6">
        <div ref={headingRef} className="mb-14 md:mb-18" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[2px] bg-primary" />
            <span className="text-primary font-heading font-bold text-sm md:text-base tracking-[0.25em] uppercase">Our Services</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            End-to-End <span className="text-primary">Solutions</span>{' '}
            <br className="hidden sm:block" />
            for Every <span className="text-primary">Project</span>
          </h2>
          <div ref={lineRef} className="mt-6 h-[3px] w-24 bg-gradient-to-r from-primary to-primary-light origin-left" style={{ transform: 'scaleX(0)' }} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} sectionRef={sectionRef} />
          ))}
        </div>
      </div>
    </section>
  );
}
