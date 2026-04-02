'use client';

import Image from 'next/image';
import { projectRows } from '@/data/projects';

function ProjectCard({ project }) {
  const encodedSrc = project.image.split('/').map(s => encodeURIComponent(s)).join('/');
  return (
    <div className="flex-shrink-0 w-64 md:w-72 border border-primary/40 rounded-sm overflow-hidden mx-3 bg-[#1A1A1A]">
      <div className="relative w-full h-44 md:h-52">
        <Image
          src={encodedSrc}
          alt={project.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-center py-3 px-4">
        <div className="w-10 h-[2px] bg-primary mb-2" />
        <p className="text-white font-heading text-sm tracking-widest uppercase">{project.name}</p>
      </div>
    </div>
  );
}

function ScrollRow({ projects, direction }) {
  // duplicate enough times so the loop is seamless
  const items = [...projects, ...projects, ...projects, ...projects];
  const animClass = direction === 'rtl' ? 'animate-scroll-rtl' : 'animate-scroll-ltr';

  return (
    <div className="border border-primary/30 rounded-sm overflow-hidden py-3">
      <div className={`flex w-max ${animClass}`}>
        {items.map((project, i) => (
          <ProjectCard key={`${project.id}-${i}`} project={project} />
        ))}
      </div>
    </div>
  );
}

export default function ProjectsHorizontal() {
  return (
    <section
      id="projects"
      className="relative py-16 md:py-20 overflow-hidden"
      style={{ backgroundColor: '#111111' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      <div className="max-w-container mx-auto px-6 mb-12">
        <div className="flex items-center gap-4">
          <div className="w-10 h-[2px] bg-primary" />
          <h2 className="text-primary font-heading font-bold text-xl md:text-2xl tracking-[0.2em] uppercase">
            Our Projects
          </h2>
        </div>
      </div>

      <div className="flex flex-col gap-6 px-6">
        {projectRows.map((row, i) => (
          <ScrollRow
            key={i}
            projects={row}
            direction={i % 2 === 1 ? 'rtl' : 'ltr'}
          />
        ))}
      </div>
    </section>
  );
}
