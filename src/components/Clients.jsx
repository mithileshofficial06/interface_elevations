'use client';

import Image from 'next/image';
import { useEffect, useRef, forwardRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GoldParticles, { BlueprintGrid } from './GoldParticles';

gsap.registerPlugin(ScrollTrigger);

const BRANDS = [
  '/images/brands/download.png',
  '/images/brands/download (1).png',
  '/images/brands/download (2).png',
  '/images/brands/download (3).png',
  '/images/brands/download (4).png',
  '/images/brands/download (5).png',
  '/images/brands/download.jpeg',
  '/images/brands/download (1).jpeg',
  '/images/brands/download (2).jpeg',
  '/images/brands/download (3).jpeg',
  '/images/brands/apollo-hospitals.png',
];

const BrandCard = forwardRef(function BrandCard({ src }, ref) {
  const encoded = src.split('/').map(s => encodeURIComponent(s)).join('/');
  return (
    <div
      ref={ref}
      className="client-card relative group flex items-center justify-center"
      style={{
        width: '100%',
        height: 90,
        opacity: 0,
        border: '1px solid rgba(244,161,3,0.2)',
        borderRadius: '10px',
        background: 'linear-gradient(145deg, #1A1A1A, #141414)',
      }}
    >
      {/* hover glow */}
      <div
        className="absolute inset-0 rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none z-10"
        style={{
          boxShadow: '0 0 25px rgba(244,161,3,0.2), inset 0 0 15px rgba(244,161,3,0.05)',
          border: '1px solid #D4A017',
        }}
      />
      <div className="relative w-full h-full p-[12px] bg-[#FFFFFF] rounded-[8px] flex items-center justify-center">
        <Image
          src={encoded}
          alt="Client logo"
          fill
          className="client-logo-img object-contain p-2 grayscale group-hover:grayscale-0"
        />
      </div>
    </div>
  );
});


export default function Clients() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const labelRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading — y:60, duration 1s (#3)
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

      // Cards stagger (#2)
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 40 },
          {
            opacity: 1, y: 0,
            duration: 0.6, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const row1 = BRANDS.slice(0, 6);
  const row2 = BRANDS.slice(6);

  return (
    <section
      ref={sectionRef}
      id="clients"
      className="relative pt-12 md:pt-16 pb-16 md:pb-20 overflow-hidden"
      style={{ backgroundColor: '#111111' }}
    >
      {/* Section divider (#29) */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="section-divider" />
      </div>

      {/* ═══ ANIMATED BLUEPRINT GRID + GOLD PARTICLES ═══ */}
      <BlueprintGrid nodeCount={6} />
      <GoldParticles count={50} opacity={0.8} />

      {/* Center glow */}
      <div className="absolute pointer-events-none z-[2]" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '700px', height: '700px', background: 'radial-gradient(circle, rgba(244,161,3,0.05) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-container mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-8" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-10 h-[2px] bg-primary" />
            <span ref={labelRef} className="text-primary font-heading font-bold text-sm md:text-base tracking-[0.25em] uppercase" style={{ opacity: 0 }}>
              Our Clients
            </span>
            <div className="w-10 h-[2px] bg-primary" />
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight mb-4">
            Trusted by <span className="text-primary">Leading Brands</span>
          </h2>
          <p className="font-body text-text-secondary text-base md:text-lg max-w-2xl mx-auto">
            We have partnered with some of the most recognized brands across India, delivering excellence in every project.
          </p>
        </div>

        {/* Logo grid — row 1: 6 logos, row 2: 5 logos centered */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4 md:gap-5 mb-4 md:mb-5">
            {row1.map((src, i) => (
              <BrandCard key={i} src={src} ref={el => cardsRef.current[i] = el} />
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5 max-w-[calc(83.33%+0.5rem)] mx-auto">
            {row2.map((src, i) => (
              <BrandCard key={i + 6} src={src} ref={el => cardsRef.current[i + 6] = el} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
