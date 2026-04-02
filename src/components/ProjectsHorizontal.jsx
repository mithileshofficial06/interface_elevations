'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PROJECTS, { CATEGORIES } from '@/data/projects';

gsap.registerPlugin(ScrollTrigger);

function ProjectCard({ project, index, featured }) {
  const encoded = project.image.split('/').map(s => encodeURIComponent(s)).join('/');

  return (
    <div
      className={`group relative overflow-hidden rounded-xl cursor-pointer ${featured ? 'md:col-span-2 md:row-span-2' : ''}`}
      style={{ border: '1px solid rgba(244,161,3,0.15)' }}
    >
      <div className={`relative w-full ${featured ? 'h-64 md:h-full min-h-[320px]' : 'h-56 md:h-64'}`}>
        <Image
          src={encoded}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

        {/* Hover overlay */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ background: 'rgba(11,11,11,0.7)' }}>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
            <h3 className="font-heading font-bold text-lg md:text-xl text-white mb-2 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
              {project.title}
            </h3>
            <p className="font-body text-sm text-text-secondary translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
              {project.location}
            </p>
          </div>
        </div>

        {/* Category tag */}
        <div className="absolute top-3 right-3 z-10">
          <span
            className="px-3 py-1 font-heading font-semibold text-[10px] tracking-[0.15em] uppercase rounded-sm"
            style={{ background: 'rgba(244,161,3,0.9)', color: '#0B0B0B' }}
          >
            {project.category}
          </span>
        </div>

        {/* Bottom info (always visible) */}
        <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
          <h3 className="font-heading font-bold text-sm md:text-base text-white leading-tight">
            {project.title}
          </h3>
          <p className="font-body text-xs text-text-secondary mt-1">
            {project.location}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Projects() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridBgRef = useRef(null);
  const gridRef = useRef(null);
  const [activeFilter, setActiveFilter] = useState('ALL');

  const filtered = activeFilter === 'ALL'
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      );

      if (gridBgRef.current) {
        gsap.to(gridBgRef.current, { yPercent: -15, ease: 'none',
          scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
      }
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  // Animate cards on filter change
  useEffect(() => {
    if (!gridRef.current) return;
    const cards = gridRef.current.querySelectorAll('.project-card-wrap');
    gsap.fromTo(cards,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.06, ease: 'power3.out' }
    );
  }, [activeFilter]);

  return (
    <section ref={sectionRef} id="projects" className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#0B0B0B' }}>
      <div ref={gridBgRef} className="absolute inset-0 industrial-grid will-change-transform" aria-hidden="true" />
      <div className="vignette" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="relative z-10 max-w-container mx-auto px-6">
        {/* Heading + Filters */}
        <div ref={headingRef} className="mb-10" style={{ opacity: 0 }}>
          <div className="flex items-center gap-4 mb-6">
            <div className="w-10 h-[2px] bg-primary" />
            <h2 className="text-primary font-heading font-bold text-xl md:text-2xl tracking-[0.2em] uppercase">
              Our Projects
            </h2>
          </div>

          {/* Filter buttons */}
          <div className="flex flex-wrap gap-3 mt-6">
            {CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className="px-5 py-2 font-heading font-semibold text-xs tracking-[0.15em] uppercase rounded-sm transition-all duration-300 cursor-pointer"
                style={{
                  background: activeFilter === cat ? 'linear-gradient(135deg, #F4A103, #E8930C)' : 'rgba(26,26,26,0.8)',
                  color: activeFilter === cat ? '#0B0B0B' : '#999',
                  border: `1px solid ${activeFilter === cat ? '#F4A103' : 'rgba(255,255,255,0.1)'}`,
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Grid */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((project, i) => (
            <div key={project.image} className="project-card-wrap">
              <ProjectCard
                project={project}
                index={i}
                featured={i === 0}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
