'use client';

import { useEffect, useRef, useCallback } from 'react';

/* ─── GOLD PARTICLE CANVAS (Welding Sparks) ─── */
export default function GoldParticles({ count = 50, opacity = 0.8 }) {
  const canvasRef = useRef(null);
  const particles = useRef([]);
  const animRef = useRef(null);

  const createParticle = useCallback((w, h) => ({
    x: Math.random() * w,
    y: h + Math.random() * 20,
    vx: (Math.random() - 0.5) * 0.4,
    vy: -(0.3 + Math.random() * 0.8),
    size: 1 + Math.random() * 2.5,
    opacity: 0.3 + Math.random() * 0.6,
    life: 0,
    maxLife: 120 + Math.random() * 180,
    glow: Math.random() > 0.7,
    drift: (Math.random() - 0.5) * 0.01,
  }), []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    resize();
    window.addEventListener('resize', resize);

    // Seed initial particles
    const seedCount = Math.min(count, 40);
    for (let i = 0; i < seedCount; i++) {
      const p = createParticle(canvas.width, canvas.height);
      p.y = Math.random() * canvas.height;
      p.life = Math.random() * p.maxLife;
      particles.current.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Spawn new particles
      if (particles.current.length < count && Math.random() > 0.85) {
        particles.current.push(createParticle(canvas.width, canvas.height));
      }

      for (let i = particles.current.length - 1; i >= 0; i--) {
        const p = particles.current[i];
        p.life++;
        p.x += p.vx;
        p.vx += p.drift;
        p.y += p.vy;

        // Fade in/out based on lifecycle
        const lifeRatio = p.life / p.maxLife;
        let alpha;
        if (lifeRatio < 0.1) {
          alpha = p.opacity * (lifeRatio / 0.1);
        } else if (lifeRatio > 0.7) {
          alpha = p.opacity * (1 - (lifeRatio - 0.7) / 0.3);
        } else {
          alpha = p.opacity;
        }

        if (p.life >= p.maxLife || p.y < -10) {
          particles.current.splice(i, 1);
          continue;
        }

        // Draw glow for special particles
        if (p.glow) {
          ctx.beginPath();
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 4);
          gradient.addColorStop(0, `rgba(244, 161, 3, ${alpha * 0.3})`);
          gradient.addColorStop(1, 'rgba(244, 161, 3, 0)');
          ctx.fillStyle = gradient;
          ctx.arc(p.x, p.y, p.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }

        // Draw particle core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(244, 161, 3, ${alpha})`;
        ctx.fill();

        // Inner bright core
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 220, 100, ${alpha * 0.8})`;
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(animate);
    };

    animRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [createParticle, count]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-[1] pointer-events-none"
      style={{ opacity }}
    />
  );
}

/* ─── BLUEPRINT GRID OVERLAY ─── */
export function BlueprintGrid({ nodeCount = 6 }) {
  const defaultNodes = [
    { x: '15%', y: '20%', delay: '0s' },
    { x: '50%', y: '35%', delay: '1.5s' },
    { x: '80%', y: '65%', delay: '0.8s' },
    { x: '30%', y: '75%', delay: '2.2s' },
    { x: '65%', y: '15%', delay: '3s' },
    { x: '90%', y: '45%', delay: '1s' },
  ];

  const nodes = defaultNodes.slice(0, nodeCount);

  return (
    <div className="absolute inset-0 z-[0] pointer-events-none overflow-hidden">
      {/* Primary fine grid — slow drift upward */}
      <div
        className="absolute clients-blueprint-fine"
        style={{
          top: '-100%',
          left: '-10%',
          width: '120%',
          height: '300%',
        }}
      />
      {/* Secondary thick grid — slow drift at different speed */}
      <div
        className="absolute clients-blueprint-thick"
        style={{
          top: '-100%',
          left: '-10%',
          width: '120%',
          height: '300%',
        }}
      />
      {/* Pulsing crosshair nodes at grid intersections */}
      <div className="absolute inset-0">
        {nodes.map((node, i) => (
          <div
            key={i}
            className="absolute clients-grid-node"
            style={{
              left: node.x,
              top: node.y,
              animationDelay: node.delay,
            }}
          >
            {/* Horizontal measurement line */}
            <div
              className="absolute top-1/2 left-1/2 -translate-y-1/2 clients-measure-h"
              style={{
                height: '1px',
                background: 'linear-gradient(90deg, transparent, rgba(244,161,3,0.3), transparent)',
                animationDelay: node.delay,
              }}
            />
            {/* Vertical measurement line */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 clients-measure-v"
              style={{
                width: '1px',
                background: 'linear-gradient(180deg, transparent, rgba(244,161,3,0.3), transparent)',
                animationDelay: node.delay,
              }}
            />
            {/* Center dot */}
            <div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[3px] h-[3px] rounded-full bg-primary/40 clients-node-pulse"
              style={{ animationDelay: node.delay }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
