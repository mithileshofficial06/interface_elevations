'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* ─── Booking Modal ─── */
const SHEET_URL = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL || '';

function BookingModal({ isOpen, onClose }) {
  const overlayRef = useRef(null);
  const formRef = useRef(null);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '', service: '', location: '', message: '' });
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');

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
      setShowSuccess(false); setLoading(false); setErrors({}); setSubmitError('');
      setFormData({ name: '', phone: '', email: '', service: '', location: '', message: '' });
      onClose();
    }});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    // Field validation
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.location.trim()) newErrors.location = 'Location is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
    setLoading(true);

    try {
      await fetch(SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          email: formData.email,
          service: formData.service,
          location: formData.location,
          message: formData.message,
        }),
      });

      // Show success (no-cors always resolves as opaque, so we treat it as success)
      gsap.to(formRef.current, { opacity: 0, scale: 0.95, duration: 0.3, ease: 'power2.in', onComplete: () => {
        setLoading(false);
        setShowSuccess(true);
        gsap.fromTo(formRef.current, { opacity: 0, scale: 0.9 }, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.7)' });
      }});
    } catch (error) {
      setLoading(false);
      setSubmitError('Something went wrong. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    // Clear field error on change
    if (errors[e.target.name]) {
      setErrors(prev => ({ ...prev, [e.target.name]: '' }));
    }
  };

  if (!isOpen) return null;

  const inputStyle = { background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(244,161,3,0.2)', color: '#fff', outline: 'none', transition: 'border-color 0.3s ease, box-shadow 0.3s ease' };
  const selectStyle = { ...inputStyle, WebkitAppearance: 'none', MozAppearance: 'none', appearance: 'none',
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%23F4A103' stroke-width='2' stroke-linecap='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E")`,
    backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center' };

  return (
    <div ref={overlayRef} className="fixed inset-0 z-[200] overflow-y-auto"
      style={{ opacity: 0, backgroundColor: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)' }}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}>
      <div className="min-h-full flex items-center justify-center px-4 py-8">
        <div ref={formRef} className="relative w-full max-w-lg"
          style={{ background: 'linear-gradient(160deg, #1A1A1A, #111111)', border: '1px solid rgba(212,160,23,0.4)', boxShadow: '0 0 60px rgba(244,161,3,0.1), 0 25px 50px rgba(0,0,0,0.5)', opacity: 0 }}>

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

                <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
                  <div><label className="block font-heading text-xs tracking-[0.15em] uppercase text-text-muted mb-2">Full Name <span className="text-primary">*</span></label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" className="form-input-enhanced w-full px-4 py-3 font-body text-sm placeholder-text-muted" style={{ ...inputStyle, ...(errors.name ? { borderColor: '#ef4444' } : {}) }} />
                    {errors.name && <p className="text-[#ef4444] text-xs mt-1 font-body">{errors.name}</p>}</div>

                  <div><label className="block font-heading text-xs tracking-[0.15em] uppercase text-text-muted mb-2">Phone Number <span className="text-primary">*</span></label>
                    <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="Your phone number" className="form-input-enhanced w-full px-4 py-3 font-body text-sm placeholder-text-muted" style={{ ...inputStyle, ...(errors.phone ? { borderColor: '#ef4444' } : {}) }} />
                    {errors.phone && <p className="text-[#ef4444] text-xs mt-1 font-body">{errors.phone}</p>}</div>

                  <div><label className="block font-heading text-xs tracking-[0.15em] uppercase text-text-muted mb-2">Email Address <span className="text-primary">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Your email address" className="form-input-enhanced w-full px-4 py-3 font-body text-sm placeholder-text-muted" style={{ ...inputStyle, ...(errors.email ? { borderColor: '#ef4444' } : {}) }} />
                    {errors.email && <p className="text-[#ef4444] text-xs mt-1 font-body">{errors.email}</p>}</div>

                  <div><label className="block font-heading text-xs tracking-[0.15em] uppercase text-text-muted mb-2">Service Required <span className="text-primary">*</span></label>
                    <select name="service" value={formData.service} onChange={handleChange} className="form-input-enhanced w-full px-4 py-3 font-body text-sm cursor-pointer" style={{ ...selectStyle, ...(errors.service ? { borderColor: '#ef4444' } : {}) }}>
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
                    </select>
                    {errors.service && <p className="text-[#ef4444] text-xs mt-1 font-body">{errors.service}</p>}</div>

                  <div><label className="block font-heading text-xs tracking-[0.15em] uppercase text-text-muted mb-2">Location <span className="text-primary">*</span></label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Your city / project location" className="form-input-enhanced w-full px-4 py-3 font-body text-sm placeholder-text-muted" style={{ ...inputStyle, ...(errors.location ? { borderColor: '#ef4444' } : {}) }} />
                    {errors.location && <p className="text-[#ef4444] text-xs mt-1 font-body">{errors.location}</p>}</div>

                  <div><label className="block font-heading text-xs tracking-[0.15em] uppercase text-text-muted mb-2">Message <span className="text-text-muted text-[10px]">(optional)</span></label>
                    <textarea name="message" rows={2} value={formData.message} onChange={handleChange} placeholder="Any additional details about your project" className="form-input-enhanced w-full px-4 py-3 font-body text-sm placeholder-text-muted resize-none" style={inputStyle} /></div>

                  {/* Submit error message */}
                  {submitError && (
                    <div className="py-2 px-4 text-center text-sm font-body" style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.3)', color: '#ef4444' }}>
                      {submitError}
                    </div>
                  )}

                  {/* Confirm button with loading spinner */}
                  <button type="submit" disabled={loading}
                    className="btn-gold-primary group relative w-full py-4 font-heading font-bold text-base tracking-[0.15em] uppercase overflow-hidden cursor-pointer mt-1 disabled:opacity-70 disabled:cursor-not-allowed"
                    style={{ background: 'linear-gradient(135deg, #F4A103, #E8930C)', color: '#0B0B0B', boxShadow: '0 4px 20px rgba(244,161,3,0.25)' }}>
                    <span className="relative z-10 flex items-center justify-center gap-3">
                      {loading && (
                        <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                      )}
                      {loading ? 'SENDING...' : 'Confirm Booking'}
                    </span>
                  </button>
                </form>
              </>
            ) : (
              /* Success State */
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <div className="w-[60px] h-[60px] rounded-full border-2 flex items-center justify-center mb-6" style={{ borderColor: '#D4A017' }}>
                  <div className="text-[#D4A017] text-3xl mb-1">✓</div>
                </div>
                <h3 className="font-heading font-bold text-[24px] text-white mb-3 tracking-wide">Booking Confirmed!</h3>
                <p className="font-body text-[14px] leading-relaxed mb-8" style={{ color: '#707070' }}>
                  Our team will contact you within 24 hours.
                </p>
                <button onClick={handleClose}
                  className="btn-outline-gold group relative px-12 py-3 font-heading font-bold text-sm tracking-[0.15em] uppercase overflow-hidden cursor-pointer"
                  style={{ border: '1px solid #D4A017', color: '#D4A017', background: 'transparent' }}>
                  <span className="relative z-10">CLOSE</span>
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
  const labelRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Section heading (#3) — y:60, duration 1s
      gsap.fromTo(headingRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } }
      );

      // Section label — letter-spacing (#3)
      if (labelRef.current) {
        gsap.fromTo(labelRef.current,
          { opacity: 0, letterSpacing: '8px' },
          { opacity: 1, letterSpacing: '0.25em', duration: 0.6, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } }
        );
      }

      gsap.fromTo(lineRef.current, { scaleX: 0 },
        { scaleX: 1, duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } }
      );

      // Contact cards — left slide-in (#4) with stagger
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card, { opacity: 0, x: -60 },
          { opacity: 1, x: 0, duration: 0.9, delay: 0.15 + i * 0.12, ease: 'power4.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      });

      gsap.fromTo(ctaRef.current, { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.5, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });
      gsap.fromTo(mapRef.current, { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, delay: 0.7, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 85%', once: true } });

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
      value: '+91 9003296999',
      href: 'tel:+919003296999',
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
        {/* Section divider (#29) */}
        <div className="absolute top-0 left-0 right-0 z-10">
          <div className="section-divider" />
        </div>

        <div className="relative z-10 max-w-container mx-auto px-6">
          {/* Heading */}
          <div ref={headingRef} className="text-center mb-16 md:mb-20" style={{ opacity: 0 }}>
            <div className="flex items-center justify-center gap-4 mb-6">
              <div className="w-10 h-[2px] bg-primary" /><span ref={labelRef} className="text-primary font-heading font-bold text-sm md:text-base tracking-[0.25em] uppercase" style={{ opacity: 0 }}>Contact Us</span><div className="w-10 h-[2px] bg-primary" />
            </div>
            <h2 className="font-heading font-extrabold text-3xl md:text-4xl lg:text-5xl text-white leading-tight">
              Let&apos;s Build <span className="text-primary">Together</span>
            </h2>
            <p className="mt-5 font-heading text-sm md:text-base tracking-[0.2em] uppercase text-text-secondary" style={{ opacity: 0.9 }}>
              Serviceable <span className="text-primary font-bold">PAN INDIA</span>
            </p>
            <div ref={lineRef} className="mt-6 h-[3px] w-24 mx-auto bg-gradient-to-r from-primary to-primary-light origin-center" style={{ transform: 'scaleX(0)' }} />
          </div>

          {/* Contact cards (#21 hover, #4 left slide-in) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6">
            {contactInfo.map((info, i) => (
              <div key={info.label} ref={el => cardsRef.current[i] = el}
                className="contact-info-card group relative text-center p-8 rounded-xl"
                style={{ opacity: 0, background: 'linear-gradient(160deg, #1A1A1A, #131313)', border: '1px solid rgba(255,255,255,0.05)' }}>
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ boxShadow: '0 0 35px rgba(212,160,23,0.08)', border: '1px solid #D4A017' }} />
                <div className="contact-icon relative mx-auto w-14 h-14 rounded-xl flex items-center justify-center text-primary mb-5"
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
              className="btn-gold-primary group relative w-full py-5 font-heading font-bold text-[15px] tracking-[0.2em] uppercase overflow-hidden cursor-pointer"
              style={{ background: 'linear-gradient(135deg, #F4A103, #E8930C)', color: '#0B0B0B', boxShadow: '0 4px 25px rgba(244,161,3,0.3)', borderRadius: 0 }}
            >
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
