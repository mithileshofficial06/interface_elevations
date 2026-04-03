'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PROJECTS from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

/* ─── Single Project Card (#15 hover) ─── */
function ProjectCard({ project }) {
  const encoded = project.image.split('/').map(s => encodeURIComponent(s)).join('/');

  return (
    <div
      className="project-card group relative overflow-hidden rounded-lg cursor-pointer flex-shrink-0"
      style={{
        width: '320px',
        height: '220px',
        border: '1px solid rgba(244,161,3,0.15)',
      }}
    >
      <Image
        src={encoded}
        alt={project.title}
        fill
        className="project-image object-cover"
      />
      {/* Persistent gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      {/* Hover overlay (#15) */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500"
        style={{ background: 'rgba(0,0,0,0.7)' }}
      >
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
          <h3 className="font-heading font-bold text-base text-white mb-1 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {project.title}
          </h3>
          <p className="font-body text-xs text-white/80 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
            {project.location}
          </p>
        </div>
      </div>

      {/* Category tag (#15 pulse) */}
      <div className="absolute top-3 right-3 z-10">
        <span
          className="project-tag px-2.5 py-1 font-heading font-semibold text-[10px] tracking-[0.15em] uppercase rounded-sm"
          style={{ background: 'rgba(244,161,3,0.9)', color: '#0B0B0B' }}
        >
          {project.category}
        </span>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-0 left-0 right-0 p-3 z-10">
        <h3 className="font-heading font-bold text-sm text-white leading-tight truncate">
          {project.title}
        </h3>
        <p className="font-body text-[11px] text-text-secondary mt-0.5 truncate">
          {project.location}
        </p>
      </div>
    </div>
  );
}

/* ─── Scrolling Row ─── */
function ScrollRow({ projects, direction = 'left', speed = 40 }) {
  const trackRef = useRef(null);

  useEffect(() => {
    if (!trackRef.current) return;

    const track = trackRef.current;
    // Duplicate items for seamless loop
    const totalWidth = track.scrollWidth / 2;

    const tween = gsap.to(track, {
      x: direction === 'left' ? -totalWidth : totalWidth,
      ease: 'none',
      repeat: -1,
      duration: speed,
      modifiers: {
        x: gsap.utils.unitize(x => {
          const val = parseFloat(x);
          if (direction === 'left') {
            return val % totalWidth;
          } else {
            // For right direction, start from -totalWidth and go to 0
            return ((val % totalWidth) + totalWidth) % totalWidth - totalWidth;
          }
        }),
      },
    });

    // Slow on hover
    const handleEnter = () => gsap.to(tween, { timeScale: 0.3, duration: 0.4 });
    const handleLeave = () => gsap.to(tween, { timeScale: 1, duration: 0.4 });
    track.addEventListener('mouseenter', handleEnter);
    track.addEventListener('mouseleave', handleLeave);

    return () => {
      tween.kill();
      track.removeEventListener('mouseenter', handleEnter);
      track.removeEventListener('mouseleave', handleLeave);
    };
  }, [direction, speed]);

  // Double the projects array for seamless looping
  const doubled = [...projects, ...projects];

  return (
    <div className="overflow-hidden w-full">
      <div ref={trackRef} className="flex gap-4 w-max">
        {doubled.map((project, i) => (
          <ProjectCard key={`${project.image}-${i}`} project={project} />
        ))}
      </div>
    </div>
  );
}

/* ─── Main Section ─── */
export default function Projects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridBgRef = useRef(null);
  const labelRef = useRef(null);

  // Split projects into 3 rows
  const rowSize = Math.ceil(PROJECTS.length / 3);
  const row1 = PROJECTS.slice(0, rowSize);
  const row2 = PROJECTS.slice(rowSize, rowSize * 2);
  const row3 = PROJECTS.slice(rowSize * 2);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading (#3) — y:60, duration:1s
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } }
      );

      // Section label (#3) — letter-spacing
      if (labelRef.current) {
        gsap.fromTo(labelRef.current,
          { opacity: 0, letterSpacing: '8px' },
          { opacity: 1, letterSpacing: '0.25em', duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } }
        );
      }

      if (gridBgRef.current) {
        gsap.to(gridBgRef.current, { yPercent: -15, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="projects" className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#0B0B0B' }}>
      <div ref={gridBgRef} className="absolute inset-0 industrial-grid will-change-transform" aria-hidden="true" />
      <div className="vignette" />
      {/* Section divider (#29) */}
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="section-divider" />
      </div>

      <div className="relative z-10 max-w-container mx-auto px-6">
        {/* Heading */}
        <div ref={headingRef} className="mb-12" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-[2px] bg-primary" />
            <span ref={labelRef} className="text-primary font-heading font-bold text-sm md:text-base tracking-[0.25em] uppercase" style={{ opacity: 0 }}>Our Projects</span>
          </div>
          <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
            Crafted with <span className="text-primary">Precision</span>
          </h2>
          <div className="mt-4 h-[3px] w-24 bg-gradient-to-r from-primary to-primary-light origin-left" />
        </div>
      </div>

      {/* 3 Scrolling Rows — full-bleed */}
      <div className="relative z-10 flex flex-col gap-5">
        <ScrollRow projects={row1} direction="left" speed={45} />
        <ScrollRow projects={row2} direction="right" speed={50} />
        <ScrollRow projects={row3} direction="left" speed={42} />
      </div>
    </section>
  );
}
