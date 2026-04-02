'use client';

import Image from 'next/image';
import { useEffect, useRef, useState, useCallback, forwardRef } from 'react';
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

/* ─── small glowing circle at each branch junction ─── */
function JunctionDot({ cx, cy, r = 4, delay = 0 }) {
  const dotRef = useRef(null);
  const glowRef = useRef(null);

  useEffect(() => {
    if (!dotRef.current) return;
    gsap.fromTo(dotRef.current,
      { scale: 0, transformOrigin: 'center center' },
      { scale: 1, duration: 0.5, delay, ease: 'back.out(2)' }
    );
    // pulse glow
    if (glowRef.current) {
      gsap.to(glowRef.current, {
        attr: { r: r + 8 },
        opacity: 0,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: delay + 0.5,
      });
    }
  }, [delay, r]);

  return (
    <g>
      <circle ref={glowRef} cx={cx} cy={cy} r={r + 2} fill="none" stroke="#F4A103" strokeWidth="1" opacity="0.3" />
      <circle ref={dotRef} cx={cx} cy={cy} r={r} fill="#F4A103" opacity="0.9" />
      <circle cx={cx} cy={cy} r={r * 0.5} fill="#FFF" opacity="0.6" />
    </g>
  );
}

/* ─── animated energy pulse travelling along a path ─── */
function EnergyPulse({ pathD, delay = 0, duration = 2 }) {
  const circleRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    if (!circleRef.current || !pathRef.current) return;
    const length = pathRef.current.getTotalLength();

    const tl = gsap.timeline({ repeat: -1, delay, repeatDelay: 1.5 });
    tl.fromTo(circleRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.2 }
    );
    tl.to(circleRef.current, {
      motionPath: { path: pathRef.current, align: pathRef.current, alignOrigin: [0.5, 0.5] },
      duration,
      ease: 'power1.inOut',
    }, '<');
    tl.to(circleRef.current, { opacity: 0, duration: 0.3 }, `-=0.3`);

    return () => tl.kill();
  }, [pathD, delay, duration]);

  return (
    <g>
      <path ref={pathRef} d={pathD} fill="none" stroke="none" />
      <circle ref={circleRef} r="3" fill="#FFD06B" opacity="0" filter="url(#energyGlow)" />
    </g>
  );
}

/* ─── main component ─── */
export default function Clients() {
  const sectionRef = useRef(null);
  const treeRef = useRef(null);
  const svgRef = useRef(null);
  const cardsRef = useRef([]);
  const rootRef = useRef(null);
  const row1Ref = useRef(null);
  const row2Ref = useRef(null);
  const [paths, setPaths] = useState(null);

  // Layout: 5 brands per row, 2 rows
  const row1 = BRANDS.slice(0, 5);
  const row2 = BRANDS.slice(5, 10);

  /* ─── compute SVG branch paths from actual DOM positions ─── */
  const computePaths = useCallback(() => {
    const tree = treeRef.current;
    const root = rootRef.current;
    if (!tree || !root) return;

    const treeRect = tree.getBoundingClientRect();
    const rootRect = root.getBoundingClientRect();

    const rootCX = rootRect.left + rootRect.width / 2 - treeRect.left;
    const rootBottomY = rootRect.bottom - treeRect.top;

    // get card center positions
    const getCardCenters = (refs, startIdx, count) => {
      const centres = [];
      for (let i = startIdx; i < startIdx + count; i++) {
        const el = cardsRef.current[i];
        if (!el) continue;
        const r = el.getBoundingClientRect();
        centres.push({
          x: r.left + r.width / 2 - treeRect.left,
          y: r.top - treeRect.top,
        });
      }
      return centres;
    };

    const row1Cards = getCardCenters(cardsRef, 0, 5);
    const row2Cards = getCardCenters(cardsRef, 5, 5);

    if (row1Cards.length < 5 || row2Cards.length < 5) return;

    // junction Y positions (between root and card rows)
    const junc1Y = rootBottomY + (row1Cards[0].y - rootBottomY) * 0.55;
    const junc2Y = row1Cards[0].y + 70 + (row2Cards[0].y - row1Cards[0].y - 70) * 0.55;

    // all branch paths & junction dots
    const branchPaths = [];
    const junctions = [];
    const energyPaths = [];

    // ── trunk: root → junction1 ──
    const trunkPath = `M ${rootCX} ${rootBottomY} C ${rootCX} ${rootBottomY + 20}, ${rootCX} ${junc1Y - 20}, ${rootCX} ${junc1Y}`;
    branchPaths.push({ d: trunkPath, width: 2.5 });
    junctions.push({ cx: rootCX, cy: junc1Y, r: 5 });
    energyPaths.push({ d: trunkPath, delay: 0 });

    // ── branches from junction1 → each row1 card ──
    row1Cards.forEach((card, i) => {
      const curveDir = card.x < rootCX ? -1 : card.x > rootCX ? 1 : 0;
      const midX = (rootCX + card.x) / 2 + curveDir * 15;
      const cp1Y = junc1Y + 15;
      const cp2Y = card.y - 20;
      const d = `M ${rootCX} ${junc1Y} C ${midX} ${cp1Y}, ${card.x + curveDir * 8} ${cp2Y}, ${card.x} ${card.y}`;
      const dist = Math.abs(card.x - rootCX);
      branchPaths.push({ d, width: 1.5 + (1 - dist / 600) * 0.5 });
      junctions.push({ cx: card.x, cy: card.y, r: 3.5 });
      energyPaths.push({ d, delay: 0.4 + i * 0.3 });
    });

    // ── trunk extension: junction1 → junction2 ──
    const trunk2 = `M ${rootCX} ${junc1Y} C ${rootCX} ${junc1Y + 30}, ${rootCX} ${junc2Y - 30}, ${rootCX} ${junc2Y}`;
    branchPaths.push({ d: trunk2, width: 2 });
    junctions.push({ cx: rootCX, cy: junc2Y, r: 5 });
    energyPaths.push({ d: trunk2, delay: 1.2 });

    // ── branches from junction2 → each row2 card ──
    row2Cards.forEach((card, i) => {
      const curveDir = card.x < rootCX ? -1 : card.x > rootCX ? 1 : 0;
      const midX = (rootCX + card.x) / 2 + curveDir * 15;
      const cp1Y = junc2Y + 15;
      const cp2Y = card.y - 20;
      const d = `M ${rootCX} ${junc2Y} C ${midX} ${cp1Y}, ${card.x + curveDir * 8} ${cp2Y}, ${card.x} ${card.y}`;
      const dist = Math.abs(card.x - rootCX);
      branchPaths.push({ d, width: 1.5 + (1 - dist / 600) * 0.5 });
      junctions.push({ cx: card.x, cy: card.y, r: 3.5 });
      energyPaths.push({ d, delay: 1.8 + i * 0.3 });
    });

    setPaths({ branchPaths, junctions, energyPaths, svgH: treeRect.height });
  }, []);

  /* ─── GSAP animations ─── */
  useEffect(() => {
    // Wait for layout to settle then compute paths
    const raf = requestAnimationFrame(() => {
      computePaths();
    });

    const handleResize = () => computePaths();
    window.addEventListener('resize', handleResize);

    const ctx = gsap.context(() => {
      // Animate root logo
      gsap.fromTo(rootRef.current,
        { opacity: 0, scale: 0.6 },
        {
          opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      );
      // Animate SVG tree
      gsap.fromTo(svgRef.current,
        { opacity: 0 },
        {
          opacity: 1, duration: 1.2, delay: 0.4,
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      );
      // Animate brand cards staggered
      gsap.fromTo(cardsRef.current,
        { opacity: 0, y: 30, scale: 0.9 },
        {
          opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, delay: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
        }
      );
    }, sectionRef);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', handleResize);
      ctx.revert();
    };
  }, [computePaths]);

  /* ─── draw SVG path with stroke-dashoffset animation ─── */
  const AnimatedPath = ({ d, width, delay = 0 }) => {
    const ref = useRef(null);
    useEffect(() => {
      if (!ref.current) return;
      const length = ref.current.getTotalLength();
      gsap.set(ref.current, { strokeDasharray: length, strokeDashoffset: length });
      gsap.to(ref.current, {
        strokeDashoffset: 0,
        duration: 1.2,
        delay: 0.6 + delay * 0.05,
        ease: 'power2.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true },
      });
    }, [d, delay]);

    return (
      <path
        ref={ref}
        d={d}
        fill="none"
        stroke="url(#branchGrad)"
        strokeWidth={width}
        strokeLinecap="round"
        opacity="0.8"
      />
    );
  };

  return (
    <section
      ref={sectionRef}
      id="clients"
      className="relative py-16 md:py-24 overflow-hidden"
      style={{ backgroundColor: '#0B0B0B' }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

      {/* faint radial glow behind tree */}
      <div
        className="absolute pointer-events-none"
        style={{
          left: '50%', top: '50%', transform: 'translate(-50%,-50%)',
          width: '700px', height: '700px',
          background: 'radial-gradient(circle, rgba(244,161,3,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="max-w-container mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-4 mb-14">
          <div className="w-10 h-[2px] bg-primary" />
          <h2 className="text-primary font-heading font-bold text-xl md:text-2xl tracking-[0.2em] uppercase">
            Our Clients
          </h2>
        </div>

        {/* Tree container */}
        <div ref={treeRef} className="relative w-full">

          {/* Root — company logo */}
          <div className="flex justify-center mb-0">
            <div
              ref={rootRef}
              className="relative z-10 rounded-lg bg-[#1A1A1A] p-4 flex items-center justify-center"
              style={{
                width: 150, height: 85, opacity: 0,
                border: '2px solid #F4A103',
                boxShadow: '0 0 25px rgba(244,161,3,0.25), 0 0 60px rgba(244,161,3,0.08)',
              }}
            >
              <Image
                src="/images/logo/logo-main.png"
                alt="Interface Elevations & Signs"
                fill
                className="object-contain p-3"
              />
            </div>
          </div>

          {/* SVG tree overlay */}
          <svg
            ref={svgRef}
            className="absolute left-0 top-0 w-full h-full pointer-events-none"
            style={{ opacity: 0 }}
          >
            <defs>
              {/* gradient for branch strokes */}
              <linearGradient id="branchGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F4A103" stopOpacity="0.9" />
                <stop offset="50%" stopColor="#FFD06B" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#F4A103" stopOpacity="0.5" />
              </linearGradient>
              {/* glow filter for energy pulses */}
              <filter id="energyGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              {/* subtle glow for branch lines */}
              <filter id="branchGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {paths && (
              <g filter="url(#branchGlow)">
                {/* branch curves */}
                {paths.branchPaths.map((bp, i) => (
                  <AnimatedPath key={`bp-${i}`} d={bp.d} width={bp.width} delay={i} />
                ))}
                {/* junction dots */}
                {paths.junctions.map((j, i) => (
                  <JunctionDot key={`jd-${i}`} cx={j.cx} cy={j.cy} r={j.r} delay={0.8 + i * 0.06} />
                ))}
              </g>
            )}
          </svg>

          {/* Row 1 brand cards */}
          <div ref={row1Ref} className="flex justify-between mt-20 mb-0 relative z-10">
            {row1.map((src, i) => (
              <BrandCard
                key={i}
                src={src}
                ref={el => cardsRef.current[i] = el}
              />
            ))}
          </div>

          {/* Row 2 brand cards */}
          <div ref={row2Ref} className="flex justify-between mt-20 relative z-10">
            {row2.map((src, i) => (
              <BrandCard
                key={i + 5}
                src={src}
                ref={el => cardsRef.current[i + 5] = el}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}

const BrandCard = forwardRef(function BrandCard({ src }, ref) {
  const encoded = src.split('/').map(s => encodeURIComponent(s)).join('/');
  return (
    <div
      ref={ref}
      className="relative group flex items-center justify-center transition-all duration-300"
      style={{
        width: 120, height: 70, opacity: 0, flexShrink: 0,
        border: '1px solid rgba(244,161,3,0.25)',
        borderRadius: '8px',
        background: 'linear-gradient(145deg, #1A1A1A, #141414)',
      }}
    >
      {/* hover glow ring */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          boxShadow: '0 0 18px rgba(244,161,3,0.25), inset 0 0 12px rgba(244,161,3,0.06)',
          border: '1px solid rgba(244,161,3,0.5)',
          borderRadius: '8px',
        }}
      />
      <div className="relative w-full h-full p-2">
        <Image
          src={encoded}
          alt="Client logo"
          fill
          className="object-contain p-2 transition-transform duration-300 group-hover:scale-110"
        />
      </div>
    </div>
  );
});
