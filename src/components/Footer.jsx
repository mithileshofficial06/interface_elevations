'use client';

import Image from 'next/image';

const QUICK_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

const SOCIAL_LINKS = [
  {
    label: 'WhatsApp',
    href: 'https://wa.me/916380409380',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://instagram.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: 'Facebook',
    href: 'https://facebook.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: '#0D0D0D' }}>
      {/* Gold top border + section divider (#29) */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />
      <div className="absolute top-0 left-0 right-0 z-10">
        <div className="section-divider" />
      </div>

      <div className="max-w-container mx-auto px-6 py-14 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Company info */}
          <div>
            <Image
              src="/images/logo/logo-main.png"
              alt="Interface Elevation & Signs"
              width={200}
              height={50}
              className="h-10 md:h-12 w-auto object-contain mb-4"
            />
            <p className="font-body text-sm text-text-secondary leading-relaxed max-w-xs mb-1">
              Elevating Structures Since 1998
            </p>
            <p className="font-heading font-bold text-sm tracking-[0.2em] uppercase text-primary mb-4">
              End-to-End Facade Solutions
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-4">
              {SOCIAL_LINKS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white/60 hover:text-primary hover:bg-primary/10 border border-white/10 hover:border-primary/40 transition-all duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <p className="font-body text-xs text-text-muted max-w-xs mt-5">
              © {new Date().getFullYear()} Interface Elevation & Signs. All Rights Reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div className="md:text-center">
            <h4 className="font-heading font-bold text-sm tracking-[0.2em] uppercase text-primary mb-5">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              {QUICK_LINKS.map(link => (
                <a
                  key={link.label}
                  href={link.href}
                  className="font-body text-sm text-white hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact info */}
          <div className="md:text-right">
            <h4 className="font-heading font-bold text-sm tracking-[0.2em] uppercase text-primary mb-5">
              Contact Info
            </h4>
            <div className="flex flex-col gap-3 font-body text-sm text-text-secondary md:items-end">
              <p>📍 201/6, North Usman Road, T. Nagar, Chennai 600017</p>
              <a href="mailto:interfaceeands@gmail.com" className="hover:text-primary transition-colors duration-300">
                📧 interfaceeands@gmail.com
              </a>
              <a href="tel:+916380409380" className="hover:text-primary transition-colors duration-300">
                📞 6380409380
              </a>
              <p className="text-xs text-text-muted mt-2">
                🇮🇳 Serving Pan-India
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-container mx-auto px-6 py-5 flex items-center justify-center">
          <p className="font-body text-xs text-text-muted tracking-wide text-center">
            Designed with precision. Built with trust.
          </p>
        </div>
      </div>
    </footer>
  );
}
