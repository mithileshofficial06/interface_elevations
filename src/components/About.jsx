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

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, x: -60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        textRef.current,
        { opacity: 0, x: 60 },
        {
          opacity: 1,
          x: 0,
          duration: 1,
          delay: 0.2,
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
      id="about"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ backgroundColor: '#111111' }}
    >
      {/* Subtle top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-container mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-16">
          <div className="w-10 h-px bg-primary" />
          <span className="text-primary font-heading font-semibold text-sm tracking-[0.3em] uppercase">
            About Us
          </span>
        </div>

        {/* Content grid — image left, text right */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Founder Image */}
          <div ref={imageRef} className="flex flex-col items-center md:items-start" style={{ opacity: 0 }}>
            <div className="relative border border-primary/40 p-2 rounded-sm">
              <Image
                src="/images/profile/download.jpeg"
                alt="M. P. Ganeshan - Founder"
                width={400}
                height={500}
                className="w-full max-w-[360px] h-auto object-cover rounded-sm"
              />

              {/* Gold corner accents on the image frame */}
              <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-primary" />
              <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-primary" />
              <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-primary" />
              <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-primary" />
            </div>

            {/* Founder name & title */}
            <div className="mt-6 text-center md:text-left">
              <h3 className="text-white font-heading font-bold text-lg md:text-xl tracking-wide">
                M. P. Ganeshan
              </h3>
              <p className="text-primary font-body text-sm tracking-wider uppercase mt-1">
                Founder & Managing Director
              </p>
            </div>
          </div>

          {/* About Text */}
          <div ref={textRef} style={{ opacity: 0 }}>
            <h2 className="font-heading font-extrabold text-2xl md:text-3xl lg:text-4xl text-white tracking-wide uppercase leading-tight mb-8">
              Building Trust <br />
              <span className="text-primary">Since 1998</span>
            </h2>

            <p className="text-text-secondary font-body text-base md:text-lg leading-relaxed mb-6">
              INTERFACE ELEVATION & SIGNS, led by M. P. Ganeshan, is a Chennai-based company with over 27 years of industry experience. We provide end-to-end solutions in facade elevation, structural glazing, signage, and architectural finishes.
            </p>

            <p className="text-text-secondary font-body text-base md:text-lg leading-relaxed">
              Our commitment is to combine design excellence, structural integrity, and innovative materials to deliver outstanding results for commercial and residential projects.
            </p>

            {/* Accent line */}
            <div className="w-20 h-[2px] bg-primary/50 mt-8" />
          </div>
        </div>
      </div>
    </section>
  );
}
