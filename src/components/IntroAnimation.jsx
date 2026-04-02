'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

const NAV_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function IntroAnimation({ children }) {
  const wrapperRef = useRef(null);
  const introRef = useRef(null);
  const logoContainerRef = useRef(null);
  const navbarRef = useRef(null);
  const navbarLogoRef = useRef(null);
  const scrollHintRef = useRef(null);
  const navLinksRef = useRef(null);
  const highlightRef = useRef(null);
  const transitionFired = useRef(false);
  const contentRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);

  const moveHighlight = useCallback((index) => {
    if (!navLinksRef.current || !highlightRef.current) return;
    const links = navLinksRef.current.querySelectorAll('[data-nav-link]');
    if (!links[index]) return;

    const link = links[index];
    const containerRect = navLinksRef.current.getBoundingClientRect();
    const linkRect = link.getBoundingClientRect();

    gsap.to(highlightRef.current, {
      left: linkRect.left - containerRect.left,
      width: linkRect.width,
      opacity: 1,
      duration: 0.35,
      ease: 'power2.out',
    });
  }, []);

  const handleNavClick = useCallback((index) => {
    setActiveIndex(index);
    moveHighlight(index);
  }, [moveHighlight]);

  const handleNavHover = useCallback((index) => {
    moveHighlight(index);
  }, [moveHighlight]);

  const handleNavLeave = useCallback(() => {
    moveHighlight(activeIndex);
  }, [activeIndex, moveHighlight]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // PHASE 1: Logo entrance
      const entranceTl = gsap.timeline();

      gsap.set(introRef.current, { opacity: 1 });
      gsap.set(logoContainerRef.current, { opacity: 0, scale: 0.85 });
      gsap.set(scrollHintRef.current, { opacity: 0 });
      gsap.set(navbarRef.current, { yPercent: -100, opacity: 0 });

      // Hide main content initially
      if (contentRef.current) {
        gsap.set(contentRef.current, { opacity: 0 });
      }

      entranceTl.to(logoContainerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 1.4,
        ease: 'power3.out',
      });

      entranceTl.fromTo(
        logoContainerRef.current,
        { filter: 'drop-shadow(0 0 0px rgba(244, 161, 3, 0))' },
        {
          filter: 'drop-shadow(0 0 30px rgba(244, 161, 3, 0.5)) drop-shadow(0 0 60px rgba(244, 161, 3, 0.2))',
          duration: 1,
          ease: 'power2.out',
        },
        '-=0.5'
      );

      entranceTl.to(scrollHintRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: 'power2.out',
      }, '-=0.3');

      gsap.to(scrollHintRef.current, {
        y: 8,
        duration: 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: 2,
      });

      // PHASE 2: Scroll-triggered transition
      const wheelHandler = (e) => {
        if (e.deltaY > 0 && !transitionFired.current) {
          triggerTransition();
        }
      };

      let touchStartY = 0;
      const touchStartHandler = (e) => {
        touchStartY = e.touches[0].clientY;
      };
      const touchMoveHandler = (e) => {
        const deltaY = touchStartY - e.touches[0].clientY;
        if (deltaY > 30 && !transitionFired.current) {
          triggerTransition();
        }
      };

      window.addEventListener('wheel', wheelHandler, { passive: true });
      window.addEventListener('touchstart', touchStartHandler, { passive: true });
      window.addEventListener('touchmove', touchMoveHandler, { passive: true });

      function triggerTransition() {
        if (transitionFired.current) return;
        transitionFired.current = true;

        window.removeEventListener('wheel', wheelHandler);
        window.removeEventListener('touchstart', touchStartHandler);
        window.removeEventListener('touchmove', touchMoveHandler);

        const navLogoEl = navbarLogoRef.current;
        const introLogoEl = logoContainerRef.current;

        if (!navLogoEl || !introLogoEl) return;

        // Measure navbar logo position
        gsap.set(navbarRef.current, { yPercent: 0, opacity: 1, visibility: 'visible' });
        const navRect = navLogoEl.getBoundingClientRect();
        gsap.set(navbarRef.current, { yPercent: -100, opacity: 0, visibility: 'hidden' });

        const introRect = introLogoEl.getBoundingClientRect();

        const deltaX = navRect.left - introRect.left + (navRect.width - introRect.width) / 2;
        const deltaY = navRect.top - introRect.top + (navRect.height - introRect.height) / 2;
        const scaleRatio = navRect.width / introRect.width;

        // Ensure we're scrolled to the top so hero is visible
        window.scrollTo(0, 0);

        const transitionTl = gsap.timeline({
          onComplete: () => {
            if (introRef.current) {
              introRef.current.style.display = 'none';
            }
            document.body.style.overflow = '';
            requestAnimationFrame(() => moveHighlight(0));
          },
        });

        // 1. Hide scroll hint
        transitionTl.to(scrollHintRef.current, {
          opacity: 0,
          y: 20,
          duration: 0.25,
          ease: 'power2.in',
        });

        // 2. Animate logo to navbar position
        transitionTl.to(logoContainerRef.current, {
          x: deltaX,
          y: deltaY,
          scale: scaleRatio,
          filter: 'drop-shadow(0 0 0px rgba(244, 161, 3, 0))',
          duration: 1.2,
          ease: 'power2.inOut',
        }, '-=0.05');

        // 3. Simultaneously reveal the main content (hero) behind the fading overlay
        if (contentRef.current) {
          transitionTl.to(contentRef.current, {
            opacity: 1,
            duration: 0.8,
            ease: 'power2.out',
          }, '-=0.8');
        }

        // 4. Fade out intro overlay background
        transitionTl.to(introRef.current, {
          backgroundColor: 'rgba(11, 11, 11, 0)',
          duration: 0.6,
          ease: 'power2.inOut',
        }, '-=0.7');

        // 5. Show navbar
        transitionTl.fromTo(navbarRef.current,
          { yPercent: -100, opacity: 0, visibility: 'visible' },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.6,
            ease: 'power3.out',
          },
          '-=0.55'
        );

        // 6. Fade out entire intro overlay (grid, vignette, etc.)
        transitionTl.to(introRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: 'linear',
        }, '-=0.3');
      }

      document.body.style.overflow = 'hidden';

      return () => {
        window.removeEventListener('wheel', wheelHandler);
        window.removeEventListener('touchstart', touchStartHandler);
        window.removeEventListener('touchmove', touchMoveHandler);
        document.body.style.overflow = '';
      };
    }, wrapperRef);

    return () => {
      ctx.revert();
      document.body.style.overflow = '';
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Track active section on scroll and update navbar highlight
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));

    const onScroll = () => {
      if (!transitionFired.current) return;
      const scrollY = window.scrollY + 120; // offset for navbar height

      let currentIndex = 0;
      sectionIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) {
          currentIndex = i;
        }
      });

      if (currentIndex !== activeIndex) {
        setActiveIndex(currentIndex);
        moveHighlight(currentIndex);
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeIndex, moveHighlight]);

  return (
    <div ref={wrapperRef} className="relative">
      {/* FIXED NAVBAR (hidden initially) */}
      <nav
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-[100] bg-background/90 backdrop-blur-md border-b border-white/5"
        style={{ opacity: 0, visibility: 'hidden' }}
      >
        <div className="max-w-container mx-auto flex items-center justify-between px-6 py-3">
          <div ref={navbarLogoRef} className="flex items-center">
            <Image
              src="/images/logo/logo-main.png"
              alt="Interface Elevation & Signs"
              width={200}
              height={50}
              className="h-10 md:h-12 w-auto object-contain"
              priority
            />
          </div>

          <div
            ref={navLinksRef}
            className="hidden md:flex items-center gap-1 relative"
            onMouseLeave={handleNavLeave}
          >
            <div
              ref={highlightRef}
              className="nav-highlight"
              style={{ opacity: 0, left: 0, width: 0 }}
            />

            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                href={link.href}
                data-nav-link
                onClick={() => handleNavClick(i)}
                onMouseEnter={() => handleNavHover(i)}
                className={`relative z-10 px-5 py-2 text-sm font-medium tracking-wider uppercase transition-colors duration-300 rounded ${
                  activeIndex === i
                    ? 'text-primary'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            className="md:hidden text-white p-2 relative z-[300]"
            aria-label="Menu"
            onClick={() => {
              setMobileOpen(true);
              document.body.style.overflow = 'hidden';
              setTimeout(() => {
                if (mobileMenuRef.current) {
                  gsap.fromTo(mobileMenuRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: 'power2.out' });
                }
                mobileLinksRef.current.forEach((el, i) => {
                  if (!el) return;
                  gsap.fromTo(el, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.5, delay: i * 0.08, ease: 'power3.out' });
                });
              }, 10);
            }}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>

      {/* MOBILE MENU OVERLAY */}
      {mobileOpen && (
        <div
          ref={mobileMenuRef}
          className="fixed inset-0 z-[250] flex flex-col items-center justify-center"
          style={{ opacity: 0, backgroundColor: 'rgba(11,11,11,0.97)', backdropFilter: 'blur(10px)' }}
        >
          {/* Close button */}
          <button
            className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center text-white hover:text-primary transition-colors cursor-pointer"
            onClick={() => {
              gsap.to(mobileMenuRef.current, {
                opacity: 0, duration: 0.25, ease: 'power2.in',
                onComplete: () => { setMobileOpen(false); document.body.style.overflow = ''; },
              });
            }}
            aria-label="Close menu"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-7 h-7">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          {/* Nav links */}
          <nav className="flex flex-col items-center gap-8">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.label}
                ref={el => mobileLinksRef.current[i] = el}
                href={link.href}
                onClick={() => {
                  gsap.to(mobileMenuRef.current, {
                    opacity: 0, duration: 0.25, ease: 'power2.in',
                    onComplete: () => { setMobileOpen(false); document.body.style.overflow = ''; },
                  });
                  handleNavClick(i);
                }}
                className="font-heading font-bold text-3xl md:text-4xl tracking-[0.2em] uppercase text-primary hover:text-white transition-colors duration-300"
                style={{ opacity: 0 }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}

      {/* INTRO OVERLAY (centered logo) */}
      <div
        ref={introRef}
        className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
      >
        <div className="absolute inset-0" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                'linear-gradient(rgba(244, 161, 3, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(244, 161, 3, 0.03) 1px, transparent 1px)',
              backgroundSize: '60px 60px',
            }}
          />
        </div>

        <div className="absolute inset-0 pointer-events-none" style={{
          background: 'radial-gradient(ellipse at center, transparent 30%, rgba(11, 11, 11, 0.7) 100%)',
        }} />

        <div
          ref={logoContainerRef}
          className="relative z-10"
          style={{ opacity: 0 }}
        >
          <Image
            src="/images/logo/logo-main.png"
            alt="Interface Elevation & Signs"
            width={600}
            height={150}
            priority
            className="w-[280px] sm:w-[380px] md:w-[500px] lg:w-[580px] h-auto object-contain"
          />
        </div>

        <div
          ref={scrollHintRef}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
          style={{ opacity: 0 }}
        >
          <span className="text-text-muted text-[11px] tracking-[0.35em] uppercase font-medium">
            Scroll to explore
          </span>
          <div className="flex flex-col items-center gap-1">
            <div className="w-[1px] h-6 bg-gradient-to-b from-primary/60 to-transparent" />
            <svg className="w-4 h-4 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7" />
            </svg>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT — no spacer, content starts immediately */}
      <div ref={contentRef} className="relative" style={{ opacity: 0 }}>
        {children}
      </div>
    </div>
  );
}
