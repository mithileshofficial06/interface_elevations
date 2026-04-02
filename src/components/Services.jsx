'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: 'Facade & Elevation',
    description:
      'We design and execute premium facade elevations using ACP, HPL, glass, and stone cladding systems. Our solutions enhance the visual appeal and structural performance of commercial and residential buildings.',
  },
  {
    title: 'Structures & Signages',
    description:
      'From illuminated signboards to large-scale structural signage, we deliver impactful branding solutions. Our signs are engineered for visibility, durability, and compliance with architectural standards.',
  },
  {
    title: 'Cladding Materials',
    description:
      'We supply and install a wide range of cladding materials including ACP sheets, HPL panels, louvers, and metal cladding. Each material is selected for weather resistance, aesthetics, and longevity.',
  },
  {
    title: 'LED Displays',
    description:
      'We provide high-resolution LED display solutions for advertising, branding, and information boards. Our installations cover indoor and outdoor applications with energy-efficient, vibrant display technology.',
  },
];

export default function Services() {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current?.querySelectorAll('.service-card');
      if (!cards) return;

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="services"
      className="relative py-16 md:py-20 overflow-hidden"
      style={{ backgroundColor: '#0B0B0B' }}
    >
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-container mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-14">
          <div className="w-10 h-[2px] bg-primary" />
          <h2 className="text-primary font-heading font-bold text-xl md:text-2xl tracking-[0.2em] uppercase">
            Our Services
          </h2>
        </div>

        {/* Cards grid */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES.map((service) => (
            <div
              key={service.title}
              className="service-card group"
              style={{ perspective: '1000px', opacity: 0 }}
            >
              <div
                className="relative w-full h-64 md:h-72 group-hover:[transform:rotateY(180deg)] transition-transform duration-700 ease-in-out"
                style={{ transformStyle: 'preserve-3d', WebkitTransformStyle: 'preserve-3d' }}
              >
                {/* FRONT — service name */}
                <div
                  className="absolute inset-0 flex items-center justify-center p-6 rounded-sm border border-primary/40"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    backgroundColor: '#1A1A1A',
                  }}
                >
                  <h3 className="text-white font-heading font-bold text-lg md:text-xl text-center tracking-wider uppercase leading-snug">
                    {service.title}
                  </h3>
                </div>

                {/* BACK — description */}
                <div
                  className="absolute inset-0 flex items-center justify-center p-6 rounded-sm border border-primary"
                  style={{
                    backfaceVisibility: 'hidden',
                    WebkitBackfaceVisibility: 'hidden',
                    transform: 'rotateY(180deg)',
                    backgroundColor: '#F4A103',
                  }}
                >
                  <p className="text-[#111111] font-body text-sm md:text-[15px] leading-relaxed text-center font-semibold">
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
