'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';

gsap.registerPlugin(ScrollToPlugin);

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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const mobileMenuRef = useRef(null);
  const mobileLinksRef = useRef([]);

  /* ── Cursor trailer refs ── */
  const cursorDotRef = useRef(null);
  const cursorRingRef = useRef(null);
  const mousePos = useRef({ x: -100, y: -100 });
  const dotPos = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });

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

  /* ── GSAP smooth anchor scrolling ── */
  const scrollToTarget = useCallback((href) => {
    const target = document.querySelector(href);
    if (target) {
      gsap.to(window, {
        duration: 1,
        scrollTo: { y: target, offsetY: 80 },
        ease: 'power3.inOut',
      });
    }
  }, []);

  /* ── WhatsApp button delayed entrance ── */
  useEffect(() => {
    const timer = setTimeout(() => setShowWhatsApp(true), 2000);
    return () => clearTimeout(timer);
  }, []);

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

  /* ── Navbar scroll behavior (#8) + active section tracking + scroll progress + back-to-top ── */
  useEffect(() => {
    const sectionIds = NAV_LINKS.map((l) => l.href.replace('#', ''));
    let lastScrollTime = 0;

    const onScroll = () => {
      const now = Date.now();
      if (now - lastScrollTime < 16) return; // 16ms throttle
      lastScrollTime = now;

      if (!transitionFired.current) return;
      const scrollY = window.scrollY;

      // Navbar background transition
      if (navbarRef.current) {
        if (scrollY > 80) {
          navbarRef.current.style.background = 'rgba(10,10,10,0.95)';
          navbarRef.current.style.backdropFilter = 'blur(12px)';
          navbarRef.current.style.WebkitBackdropFilter = 'blur(12px)';
          navbarRef.current.style.boxShadow = '0 2px 20px rgba(0,0,0,0.4)';
        } else {
          navbarRef.current.style.background = 'transparent';
          navbarRef.current.style.backdropFilter = 'blur(0px)';
          navbarRef.current.style.WebkitBackdropFilter = 'blur(0px)';
          navbarRef.current.style.boxShadow = 'none';
        }
      }

      // Active section tracking
      const offsetY = scrollY + 120;
      let currentIndex = 0;
      sectionIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= offsetY) {
          currentIndex = i;
        }
      });

      if (currentIndex !== activeIndex) {
        setActiveIndex(currentIndex);
        moveHighlight(currentIndex);
      }

      // Scroll progress percentage
      const totalHeight = document.body.scrollHeight - window.innerHeight;
      const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
      setScrollProgress(progress);

      // Back to top visibility
      setShowBackToTop(scrollY > 400);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [activeIndex, moveHighlight]);

  /* ── Cursor trailer (#25) ── */
  useEffect(() => {
    // Skip on touch devices
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouchDevice) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    const onMouseMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseDown = () => {
      ring.classList.add('clicked');
      ring.classList.remove('expanded');
    };

    const onMouseUp = () => {
      ring.classList.remove('clicked');
    };

    const onMouseEnterInteractive = () => {
      ring.classList.add('expanded');
    };

    const onMouseLeaveInteractive = () => {
      ring.classList.remove('expanded');
    };

    // Track interactive elements for ring expansion
    const addInteractiveListeners = () => {
      const interactiveEls = document.querySelectorAll('button, a, .group, [role="button"]');
      interactiveEls.forEach((el) => {
        el.addEventListener('mouseenter', onMouseEnterInteractive);
        el.addEventListener('mouseleave', onMouseLeaveInteractive);
      });
      return interactiveEls;
    };

    let interactiveEls = addInteractiveListeners();

    // Re-register on DOM changes (debounced)
    let mutationTimeout;
    const observer = new MutationObserver(() => {
      clearTimeout(mutationTimeout);
      mutationTimeout = setTimeout(() => {
        interactiveEls.forEach((el) => {
          el.removeEventListener('mouseenter', onMouseEnterInteractive);
          el.removeEventListener('mouseleave', onMouseLeaveInteractive);
        });
        interactiveEls = addInteractiveListeners();
      }, 300);
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);

    // Animation loop
    let animId;
    const animate = () => {
      // Dot follows closely
      dotPos.current.x += (mousePos.current.x - dotPos.current.x) * 0.15;
      dotPos.current.y += (mousePos.current.y - dotPos.current.y) * 0.15;
      // Ring follows with more lag
      ringPos.current.x += (mousePos.current.x - ringPos.current.x) * 0.08;
      ringPos.current.y += (mousePos.current.y - ringPos.current.y) * 0.08;

      // Use translate3d for hardware acceleration instead of left/top
      dot.style.transform = `translate3d(calc(${dotPos.current.x}px - 50%), calc(${dotPos.current.y}px - 50%), 0)`;
      ring.style.transform = `translate3d(calc(${ringPos.current.x}px - 50%), calc(${ringPos.current.y}px - 50%), 0)`;

      animId = requestAnimationFrame(animate);
    };
    animId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      observer.disconnect();
      clearTimeout(mutationTimeout);
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', onMouseEnterInteractive);
        el.removeEventListener('mouseleave', onMouseLeaveInteractive);
      });
    };
  }, []);

  const handleBackToTop = () => {
    gsap.to(window, {
      duration: 1,
      scrollTo: { y: 0 },
      ease: 'power3.inOut',
    });
  };

  return (
    <div ref={wrapperRef} className="relative">
      {/* CURSOR TRAILER */}
      <div ref={cursorDotRef} className="cursor-dot" />
      <div ref={cursorRingRef} className="cursor-ring" />

      {/* SCROLL PROGRESS BAR */}
      <div 
        className="fixed top-0 left-0 h-[3px] bg-primary z-[9999]"
        style={{ width: `${scrollProgress}%`, transition: 'width 0.05s linear' }}
      />

      {/* FIXED NAVBAR (hidden initially) */}
      <nav
        ref={navbarRef}
        className="fixed top-0 left-0 right-0 z-[100] border-b border-white/5"
        style={{ opacity: 0, visibility: 'hidden', transition: 'background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease' }}
      >
        <div className="max-w-container mx-auto flex items-center justify-between px-6 py-3">
          <div ref={navbarLogoRef} className="flex items-center nav-logo-hover">
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
                onClick={(e) => {
                  e.preventDefault();
                  scrollToTarget(link.href);
                  handleNavClick(i);
                }}
                onMouseEnter={() => handleNavHover(i)}
                className={`nav-link-animated relative z-10 px-5 py-2 text-sm font-medium tracking-wider uppercase transition-colors duration-300 rounded ${
                  activeIndex === i
                    ? 'text-primary nav-active'
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
                onClick={(e) => {
                  e.preventDefault();
                  gsap.to(mobileMenuRef.current, {
                    opacity: 0, duration: 0.25, ease: 'power2.in',
                    onComplete: () => {
                      setMobileOpen(false);
                      document.body.style.overflow = '';
                      scrollToTarget(link.href);
                    },
                  });
                  handleNavClick(i);
                }}
                className="font-heading font-bold text-[32px] uppercase text-primary hover:text-white transition-colors duration-300"
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

      {/* BACK TO TOP BUTTON */}
      <button
        className={`back-to-top ${showBackToTop ? 'visible' : ''}`}
        onClick={handleBackToTop}
        aria-label="Back to top"
        style={{ bottom: '5.5rem' }}
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
          <line x1="12" y1="19" x2="12" y2="5" />
          <polyline points="5 12 12 5 19 12" />
        </svg>
      </button>

      {/* FLOATING WHATSAPP BUTTON (Desktop) */}
      <a
        href="https://wa.me/919003296999"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-[90] hidden md:flex items-center justify-center w-14 h-14 rounded-full shadow-lg group transition-all duration-500"
        style={{
          backgroundColor: '#25D366',
          opacity: showWhatsApp ? 1 : 0,
          transform: showWhatsApp ? 'translateX(0)' : 'translateX(80px)',
          boxShadow: '0 4px 15px rgba(37,211,102,0.4)',
        }}
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="white" className="w-7 h-7">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
        {/* Tooltip */}
        <span className="absolute right-full mr-3 px-3 py-1.5 bg-gray-900 text-white text-xs rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
          Chat on WhatsApp
        </span>
      </a>

      {/* MOBILE STICKY BOTTOM BAR */}
      <div
        className="fixed bottom-0 left-0 right-0 z-[90] md:hidden flex transition-all duration-500"
        style={{
          opacity: showWhatsApp ? 1 : 0,
          transform: showWhatsApp ? 'translateY(0)' : 'translateY(100%)',
        }}
      >
        <a
          href="tel:+919003296999"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 text-white font-heading font-bold text-sm tracking-wide"
          style={{ backgroundColor: '#1A1A1A', borderTop: '1px solid rgba(244,161,3,0.3)' }}
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
          </svg>
          Call Now
        </a>
        <a
          href="https://wa.me/919003296999"
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-3.5 text-white font-heading font-bold text-sm tracking-wide"
          style={{ backgroundColor: '#25D366' }}
        >
          <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
          </svg>
          WhatsApp
        </a>
      </div>
    </div>
  );
}
