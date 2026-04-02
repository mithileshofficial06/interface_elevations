'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <line x1="3" y1="9" x2="21" y2="9" />
        <line x1="9" y1="9" x2="9" y2="21" />
        <line x1="15" y1="9" x2="15" y2="21" />
      </svg>
    ),
    title: 'Facade & Elevation Works',
    description: 'We design and execute premium facade elevations that enhance the visual appeal and structural performance of commercial and residential buildings.',
    items: [
      'Facade Elevation',
      'Structural Glazing',
      'Glass Elevation',
      'Wood Engraving Elevation',
    ],
    accent: '#F4A103',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
      </svg>
    ),
    title: 'Structures & Signages',
    description: 'From illuminated signboards to large-scale structural signage, we deliver impactful branding solutions engineered for visibility and durability.',
    items: [
      'MS (Mild Steel) Structures',
      'Stainless Steel & Acrylic Signages',
      'Connecting Bridges',
      'MS & SS Grills',
    ],
    accent: '#FFB92E',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <polygon points="12 2 2 7 12 12 22 7 12 2" />
        <polyline points="2 17 12 22 22 17" />
        <polyline points="2 12 12 17 22 12" />
      </svg>
    ),
    title: 'Cladding & Elevation Materials',
    description: 'We work with a wide range of premium materials selected for weather resistance, aesthetics, and longevity.',
    items: [
      'ACP (Aluminium Composite Panel)',
      'Aluminium Cladding',
      'HPL (High Pressure Laminate)',
      'Fundermax Panels',
      'Stone Lamp & Stone Veneer',
      'GRP (Glass Reinforced Plastic)',
      'GRC (Glass Reinforced Concrete)',
      'Styrofoam Elevation',
    ],
    accent: '#E8930C',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="2" y="3" width="20" height="14" rx="2" />
        <line x1="8" y1="21" x2="16" y2="21" />
        <line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    title: 'LED Screens & Video Walls',
    description: 'High-resolution LED display solutions for advertising, branding, and information boards with energy-efficient, vibrant display technology.',
    items: [
      'Indoor LED Displays',
      'Outdoor LED Screens',
      'Video Wall Installations',
    ],
    accent: '#FFC947',
  },
];

/* ─── individual service card ─── */
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
          opacity: 1, y: 0, scale: 1,
          duration: 0.8,
          delay: index * 0.15,
          ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      );
    }, cardRef);
    return () => ctx.revert();
  }, [index, sectionRef]);

  // animate list items when expanded
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
      className="group relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-500"
      style={{
        opacity: 0,
        background: 'linear-gradient(160deg, #1A1A1A 0%, #131313 100%)',
        border: '1px solid rgba(244,161,3,0.12)',
      }}
      onClick={() => setExpanded(!expanded)}
    >
      {/* top accent bar */}
      <div
        className="absolute top-0 left-0 right-0 h-[3px] transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${service.accent}, transparent)`,
          opacity: expanded ? 1 : 0.4,
        }}
      />

      {/* hover glow */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: `0 0 40px rgba(244,161,3,0.08), inset 0 0 40px rgba(244,161,3,0.03)`,
          border: '1px solid rgba(244,161,3,0.3)',
        }}
      />

      {/* card content */}
      <div className="relative p-7 md:p-8">
        {/* header row */}
        <div className="flex items-start gap-4 mb-4">
          {/* service icon */}
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

          {/* expand / collapse chevron */}
          <div
            className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center mt-1 transition-all duration-300"
            style={{
              background: expanded ? 'rgba(244,161,3,0.15)' : 'rgba(255,255,255,0.05)',
              border: `1px solid ${expanded ? 'rgba(244,161,3,0.4)' : 'rgba(255,255,255,0.1)'}`,
            }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke={expanded ? '#F4A103' : '#707070'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 transition-transform duration-300"
              style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
            >
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>
        </div>

        {/* expandable services list */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: expanded ? `${service.items.length * 52 + 24}px` : '0px',
            opacity: expanded ? 1 : 0,
          }}
        >
          <div ref={listRef} className="pt-4 border-t border-white/5">
            {service.items.map((item, i) => (
              <div
                key={item}
                className="service-item flex items-center gap-3 py-2.5 group/item"
              >
                {/* gold bullet */}
                <div className="flex-shrink-0 relative">
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: service.accent }}
                  />
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

        {/* item count badge — shown when collapsed */}
        {!expanded && (
          <div className="mt-3 flex items-center gap-2">
            <div
              className="px-3 py-1 rounded-full text-xs font-heading font-semibold tracking-wide"
              style={{
                background: 'rgba(244,161,3,0.1)',
                color: '#F4A103',
                border: '1px solid rgba(244,161,3,0.2)',
              }}
            >
              {service.items.length} services
            </div>
            <span className="text-text-muted text-xs font-body">— click to explore</span>
          </div>
        )}
      </div>
    </div>
  );
}

/* ─── main section ─── */
export default function Services() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );
      gsap.fromTo(lineRef.current,
        { scaleX: 0 },
        {
          scaleX: 1, duration: 1, ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: '#0B0B0B' }}
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* decorative background elements */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '-5%', top: '15%',
          width: '450px', height: '450px',
          background: 'radial-gradient(circle, rgba(244,161,3,0.04) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          right: '-8%', bottom: '10%',
          width: '500px', height: '500px',
          background: 'radial-gradient(circle, rgba(244,161,3,0.03) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-container mx-auto px-6">
        {/* Section heading */}
        <div ref={headingRef} className="mb-14 md:mb-18" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[2px] bg-primary" />
            <span className="text-primary font-heading font-bold text-sm md:text-base tracking-[0.25em] uppercase">
              Our Services
            </span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            End-to-End <span className="text-primary">Solutions</span>{' '}
            <br className="hidden sm:block" />
            for Every <span className="text-primary">Project</span>
          </h2>
          <div
            ref={lineRef}
            className="mt-6 h-[3px] w-24 bg-gradient-to-r from-primary to-primary-light origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>

        {/* Service cards — 2×2 grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} sectionRef={sectionRef} />
          ))}
        </div>
      </div>
    </section>
  );
}
