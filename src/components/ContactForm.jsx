'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Booking Modal ─── */
function BookingModal({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', location: '', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.35, ease: 'power2.out' });
      gsap.fromTo(formRef.current, { opacity: 0, y: 40, scale: 0.95 }, { opacity: 1, y: 0, scale: 1, duration: 0.45, delay: 0.1, ease: 'back.out(1.4)' });
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleClose = () => {
    gsap.to(formRef.current, { opacity: 0, y: 30, scale: 0.95, duration: 0.25, ease: 'power2.in' });
    gsap.to(overlayRef.current, { opacity: 0, duration: 0.3, delay: 0.1, ease: 'power2.in', onComplete: () => {
      setShowSuccess(false); setLoading(false);
      setFormData({ name: '', phone: '', email: '', service: '', location: '', message: '' });
      onClose();
    }});
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      gsap.to(formRef.current, { opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in', onComplete: () => {
        setLoading(false);
        setShowSuccess(true);
        gsap.fromTo(formRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' });
      }});
    }, 1200);
  };

  const handleChange = (e) => setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  if (!isOpen) return null;

  const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(244,161,3,0.2)', color: '#fff', outline: 'none', transition: 'border-color 0.3s' };
  const selectStyle = { ...inputStyle, WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23F4A103' stroke-width='2' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[200] overflow-y-auto"
      style={{ opacity: 0, backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}>
      <div className="min-h-full flex items-center justify-center px-4 py-8">
        <div ref={formRef} className="relative w-full max-w-lg"
          style={{ background: 'linear-gradient(160deg, #1A1A1A, #111111)', border: '1px solid rgba(244,161,3,0.2)', boxShadow: '0 0 60px rgba(244,161,3,0.1), 0 25px 50px rgba(0,0,0,0.5)', opacity: 0 }}>

          <div className="absolute top-0 left-0 right-0 h-[3px]" style={{ background: 'linear-gradient(90deg, transparent, #F4A103, transparent)' }} />

          <button onClick={handleClose} className="sticky top-0 float-right mr-4 mt-4 w-9 h-9 flex items-center justify-center text-text-muted hover:text-primary transition-colors duration-300 cursor-pointer z-20" style={{ background: 'rgba(26,26,26,0.9)' }} aria-label="Close">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="w-5 h-5"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
          </button>

          <div className="p-8 md:p-10 pt-4 md:pt-6">
            {!showSuccess ? (
              <>
                <div className="mb-7 text-center">
                  <h3 className="font-heading font-bold text-2xl md:text-3xl text-white mb-2">Book a <span className="text-primary">Consultation</span></h3>
                  <p className="font-body text-sm text-text-secondary">Fill in your details and our team will get back to you shortly.</p>
                </div>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div><label className="block font-heading text-xs tracking-[0.15em] uppercase text-text-muted mb-2">Full Name <span className="text-primary">*</span></label>
                    <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Your full name" className="w-full px-4 py-3 font-body text-sm placeholder-text-muted focus:border-primary" style={inputStyle} /></div>

                  <div><label className="block font-heading text-xs tracking-[0.15em] uppercase text-text-muted mb-2">Phone Number <span className="text-primary">*</span></label>
                    <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="Your phone number" className="w-full px-4 py-3 font-body text-sm placeholder-text-muted focus:border-primary" style={inputStyle} /></div>

                  <div><label className="block font-heading text-xs tracking-[0.15em] uppercase text-text-muted mb-2">Email Address <span className="text-primary">*</span></label>
                    <input type="email" name="email" required value={formData.email} onChange={handleChange} placeholder="Your email address" className="w-full px-4 py-3 font-body text-sm placeholder-text-muted focus:border-primary" style={inputStyle} /></div>

                  <div><label className="block font-heading text-xs tracking-[0.15em] uppercase text-text-muted mb-2">Service Required <span className="text-primary">*</span></label>
                    <select name="service" required value={formData.service} onChange={handleChange} className="w-full px-4 py-3 font-body text-sm cursor-pointer focus:border-primary" style={selectStyle}>
                      <option value="" disabled style={{ color: '#707070', background: '#1A1A1A' }}>Select a service</option>
                      <optgroup label="Facade & Elevation Works" style={{ background: '#1A1A1A', color: '#F4A103' }}>
                        <option value="Facade Elevation" style={{ background: '#1A1A1A', color: '#fff' }}>Facade Elevation</option>
                        <option value="Structural Glazing" style={{ background: '#1A1A1A', color: '#fff' }}>Structural Glazing</option>
                        <option value="Glass Elevation" style={{ background: '#1A1A1A', color: '#fff' }}>Glass Elevation</option>
                        <option value="Wood Engraving" style={{ background: '#1A1A1A', color: '#fff' }}>Wood Engraving Elevation</option>
                      </optgroup>
                      <optgroup label="Structures & Signages" style={{ background: '#1A1A1A', color: '#F4A103' }}>
                        <option value="MS Structures" style={{ background: '#1A1A1A', color: '#fff' }}>MS (Mild Steel) Structures</option>
                        <option value="SS & Acrylic Signages" style={{ background: '#1A1A1A', color: '#fff' }}>Stainless Steel & Acrylic Signages</option>
                        <option value="Connecting Bridges" style={{ background: '#1A1A1A', color: '#fff' }}>Connecting Bridges</option>
                        <option value="MS & SS Grills" style={{ background: '#1A1A1A', color: '#fff' }}>MS & SS Grills</option>
                      </optgroup>
                      <optgroup label="Cladding & Materials" style={{ background: '#1A1A1A', color: '#F4A103' }}>
                        <option value="ACP" style={{ background: '#1A1A1A', color: '#fff' }}>ACP (Aluminium Composite Panel)</option>
                        <option value="Aluminium Cladding" style={{ background: '#1A1A1A', color: '#fff' }}>Aluminium Cladding</option>
                        <option value="HPL" style={{ background: '#1A1A1A', color: '#fff' }}>HPL (High Pressure Laminate)</option>
                        <option value="Fundermax" style={{ background: '#1A1A1A', color: '#fff' }}>Fundermax Panels</option>
                        <option value="Stone Veneer" style={{ background: '#1A1A1A', color: '#fff' }}>Stone Lamp & Stone Veneer</option>
                        <option value="GRP" style={{ background: '#1A1A1A', color: '#fff' }}>GRP (Glass Reinforced Plastic)</option>
                        <option value="GRC" style={{ background: '#1A1A1A', color: '#fff' }}>GRC (Glass Reinforced Concrete)</option>
                        <option value="Styrofoam" style={{ background: '#1A1A1A', color: '#fff' }}>Styrofoam Elevation</option>
                      </optgroup>
                      <optgroup label="LED Screens & Video Walls" style={{ background: '#1A1A1A', color: '#F4A103' }}>
                        <option value="Indoor LED" style={{ background: '#1A1A1A', color: '#fff' }}>Indoor LED Displays</option>
                        <option value="Outdoor LED" style={{ background: '#1A1A1A', color: '#fff' }}>Outdoor LED Screens</option>
                        <option value="Video Wall" style={{ background: '#1A1A1A', color: '#fff' }}>Video Wall Installations</option>
                      </optgroup>
                    </select></div>

                  <div><label className="block font-heading text-xs tracking-[0.15em] uppercase text-text-muted mb-2">Location <span className="text-primary">*</span></label>
                    <input type="text" name="location" required value={formData.location} onChange={handleChange} placeholder="Your city / project location" className="w-full px-4 py-3 font-body text-sm placeholder-text-muted focus:border-primary" style={inputStyle} /></div>

                  <div><label className="block font-heading text-xs tracking-[0.15em] uppercase text-text-muted mb-2">Message <span className="text-text-muted text-[10px]">(optional)</span></label>
                    <textarea name="message" rows={2} value={formData.message} onChange={handleChange} placeholder="Any additional details about your project" className="w-full px-4 py-3 font-body text-sm placeholder-text-muted focus:border-primary resize-none" style={inputStyle} /></div>

                  {/* Confirm button with loading spinner */}
                  <button type="submit" disabled={loading}
                    className="group relative w-full py-4 font-heading font-bold text-base tracking-[0.15em] uppercase overflow-hidden transition-all duration-500 cursor-pointer mt-1 disabled:opacity-70"
                    style={{ background: 'linear-gradient(135deg, #F4A103, #E8930C)', color: '#0B0B0B', boxShadow: '0 4px 20px rgba(244,161,3,0.25)' }}>
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, #FFB92E, #F4A103)' }} />
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {loading && (
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      )}
                      {loading ? 'Submitting...' : 'Confirm Booking'}
                    </span>
                  </button>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="text-center py-8">
                <div className="mx-auto w-20 h-20 rounded-full flex items-center justify-center mb-6"
                  style={{ background: 'linear-gradient(145deg, rgba(244,161,3,0.15), rgba(244,161,3,0.05))', border: '2px solid rgba(244,161,3,0.4)' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="#F4A103" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-10 h-10">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="font-heading font-bold text-2xl md:text-3xl text-white mb-3">Thank You!</h3>
                <p className="font-body text-base text-text-secondary leading-relaxed mb-2">
                  We appreciate your interest in <span className="text-primary font-semibold">Interface Elevations & Signs</span>.
                </p>
                <p className="font-body text-base text-text-secondary leading-relaxed mb-8">
                  We&apos;ll contact you within <span className="text-primary font-semibold">24 hours</span> to discuss your project requirements.
                </p>
                <button onClick={handleClose}
                  className="group relative px-12 py-3 font-heading font-bold text-sm tracking-[0.15em] uppercase overflow-hidden transition-all duration-500 cursor-pointer"
                  style={{ border: '1px solid #F4A103', color: '#F4A103', background: 'transparent' }}>
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-400" style={{ background: 'rgba(244,161,3,0.1)' }} />
                  <span className="relative z-10">Close</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── Main Contact Section ─── */
export default function Contact() {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const cardsRef = useRef([]);
  const ctaRef = useRef(null);
  const mapRef = useRef(null);
  const lineRef = useRef(null);
  const gridBgRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 40, scale: 0.97 },
        { opacity: 1, y: 0, scale: 1, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      );
      gsap.fromTo(lineRef.current, { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true } }
      );
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card, { opacity: 0, y: 50, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.9, delay: 0.15 + i * 0.12, ease: 'power4.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } });
      });
      gsap.fromTo(ctaRef.current, { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%', once: true } });
      gsap.fromTo(mapRef.current, { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 60%', once: true } });

      if (gridBgRef.current) gsap.to(gridBgRef.current, { yPercent: -15, ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top bottom', end: 'bottom top', scrub: 0.8 } });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const contactInfo = [
    {
      label: 'Visit Us',
      value: '201/6, North Usman Road\nT. Nagar, Chennai – 600017',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" /><circle cx="12" cy="10" r="3" />
        </svg>
      ),
    },
    {
      label: 'Email Us',
      value: 'interfaceeands@gmail.com',
      href: 'mailto:interfaceeands@gmail.com',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <rect x="2" y="4" width="20" height="16" rx="2" /><polyline points="22 4 12 13 2 4" />
        </svg>
      ),
    },
    {
      label: 'Call Us',
      value: '6380409380',
      href: 'tel:+916380409380',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2A19.79 19.79 0 0 1 3.09 5.18 2 2 0 0 1 5.08 3h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.91 10.6a16 16 0 0 0 6.49 6.49l1.44-1.44a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z" />
        </svg>
      ),
    },
  ];

  return (
    <>
      <section ref={sectionRef} id="contact" className="relative py-20 md:py-28 overflow-hidden" style={{ backgroundColor: '#0B0B0B' }}>
        <div ref={gridBgRef} className="absolute inset-0 industrial-grid will-change-transform" aria-hidden="true" />
        <div className="vignette" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />

        <div className="relative z-10 max-w-container mx-auto px-6">
          {/* Heading */}
          <div ref={headingRef} className="text-center mb-16 md:mb-20" style={{ opacity: 0 }}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-10 h-[2px] bg-primary" /><span className="text-primary font-heading font-bold text-sm md:text-base tracking-[0.25em] uppercase">Contact Us</span><div className="w-10 h-[2px] bg-primary" />
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              Let&apos;s Build <span className="text-primary">Together</span>
            </h2>
            <div ref={lineRef} className="mt-6 h-[3px] w-24 mx-auto bg-gradient-to-r from-primary to-primary-light origin-center" style={{ transform: 'scaleX(0)' }} />
          </div>

          {/* Contact cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-10">
            {contactInfo.map((info, i) => (
              <div key={info.label} ref={el => cardsRef.current[i] = el}
                className="group relative text-center p-8 rounded-xl transition-all duration-500"
                style={{ opacity: 0, background: 'linear-gradient(160deg, #1A1A1A, #131313)', border: '1px solid rgba(244,161,3,0.12)' }}>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ boxShadow: '0 0 35px rgba(244,161,3,0.1)', border: '1px solid rgba(244,161,3,0.3)' }} />
                <div className="relative mx-auto w-14 h-14 rounded-xl flex items-center justify-center text-primary mb-5 transition-transform duration-500 group-hover:scale-110"
                  style={{ background: 'linear-gradient(145deg, rgba(244,161,3,0.12), rgba(244,161,3,0.04))', border: '1px solid rgba(244,161,3,0.2)', boxShadow: '0 4px 15px rgba(244,161,3,0.08)' }}>
                  {info.icon}
                </div>
                <h3 className="relative font-heading font-bold text-sm tracking-[0.15em] uppercase text-primary mb-3">{info.label}</h3>
                {info.href ? (
                  <a href={info.href} className="relative font-body text-white text-base md:text-lg hover:text-primary transition-colors duration-300 whitespace-pre-line leading-relaxed">{info.value}</a>
                ) : (
                  <p className="relative font-body text-white text-base md:text-lg whitespace-pre-line leading-relaxed">{info.value}</p>
                )}
              </div>
            ))}
          </div>

          {/* Full-width BOOK CTA banner */}
          <div ref={ctaRef} className="mb-10" style={{ opacity: 0 }}>
            <button
              onClick={() => setModalOpen(true)}
              className="group relative w-full py-5 font-heading font-bold text-lg md:text-xl tracking-[0.2em] uppercase overflow-hidden transition-all duration-500 cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #F4A103, #E8930C)', color: '#0B0B0B', boxShadow: '0 4px 25px rgba(244,161,3,0.3)', borderRadius: 0 }}
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'linear-gradient(135deg, #FFB92E, #F4A103)' }} />
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: '0 0 40px rgba(244,161,3,0.4), 0 0 80px rgba(244,161,3,0.15)' }} />
              <span className="relative z-10 flex items-center justify-center gap-3">
                Book a Free Consultation
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                </svg>
              </span>
            </button>
          </div>

          {/* Google Maps embed */}
          <div ref={mapRef} className="rounded-xl overflow-hidden" style={{ opacity: 0, border: '1px solid rgba(244,161,3,0.15)' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3886.8!2d80.2302!3d13.04!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2s201%2F6%2C+North+Usman+Road%2C+T.+Nagar%2C+Chennai+600017!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="300"
              style={{ border: 0, filter: 'invert(0.9) hue-rotate(180deg) saturate(0.3) brightness(0.6)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Interface Elevation & Signs Location"
            />
          </div>
        </div>
      </section>

      <BookingModal isOpen={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
