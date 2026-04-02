'use client';

import Image from 'next/image';
import { useEffect, useRef, forwardRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

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
];

const BrandCard = forwardRef(function BrandCard({ src }, ref) {
  const encoded = src.split('/').map(s => encodeURIComponent(s)).join('/');
  return (
    <div
      ref={ref}
      className="relative group flex items-center justify-center transition-all duration-400 hover:-translate-y-1"
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
        className="absolute inset-0 rounded-[10px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: '0 0 25px rgba(244,161,3,0.2), inset 0 0 15px rgba(244,161,3,0.05)',
          border: '1px solid rgba(244,161,3,0.5)',
        }}
      />
      <div className="relative w-full h-full p-3">
        <Image
          src={encoded}
          alt="Client logo"
          fill
          className="object-contain p-2 transition-transform duration-300 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
      </div>
    </div>
  );
});

export default function Clients() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      );

      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 30, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.6, delay: i * 0.08, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const row1 = BRANDS.slice(0, 5);
  const row2 = BRANDS.slice(5, 10);

  return (
    <section
      ref={sectionRef}
      id="clients"
      className="relative py-20 md:py-28 overflow-hidden"
      style={{ backgroundColor: '#111111' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* Glow */}
      <div className="absolute pointer-events-none" style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: '600px', height: '600px', background: 'radial-gradient(circle, rgba(244,161,3,0.04) 0%, transparent 70%)' }} />

      <div className="relative z-10 max-w-container mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="text-center mb-14" style={{ opacity: 0 }}>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-10 h-[2px] bg-primary" />
            <span className="text-primary font-heading font-bold text-sm md:text-base tracking-[0.25em] uppercase">
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

        {/* Logo grid — 2 rows × 5 cols */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5 mb-4 md:mb-5">
            {row1.map((src, i) => (
              <BrandCard key={i} src={src} ref={el => cardsRef.current[i] = el} />
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 md:gap-5">
            {row2.map((src, i) => (
              <BrandCard key={i + 5} src={src} ref={el => cardsRef.current[i + 5] = el} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
