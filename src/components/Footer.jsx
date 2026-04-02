'use client';

import Image from 'next/image';

const QUICK_LINKS = [
  { label: 'Home', href: '#hero' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden" style={{ backgroundColor: '#0D0D0D' }}>
      {/* Gold top border */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent" />

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
            <p className="font-body text-sm text-text-secondary leading-relaxed max-w-xs">
              Chennai&apos;s premier facade, glazing, and signage company with over 27 years of industry experience.
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
                  className="font-body text-sm text-text-secondary hover:text-primary transition-colors duration-300"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* Contact info */}
          <div className="md:text-right">
            <h4 className="font-heading font-bold text-sm tracking-[0.2em] uppercase text-primary mb-5">
              Get in Touch
            </h4>
            <div className="flex flex-col gap-3 font-body text-sm text-text-secondary">
              <p>201/6, North Usman Road</p>
              <p>T. Nagar, Chennai – 600017</p>
              <a href="tel:+916380409380" className="hover:text-primary transition-colors duration-300">
                +91 6380409380
              </a>
              <a href="mailto:interfaceeands@gmail.com" className="hover:text-primary transition-colors duration-300">
                interfaceeands@gmail.com
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5">
        <div className="max-w-container mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-text-muted tracking-wide">
            © 2025 Interface Elevation & Signs. All Rights Reserved.
          </p>
          <p className="font-body text-xs text-text-muted tracking-wide">
            Crafted with precision in Chennai
          </p>
        </div>
      </div>
    </footer>
  );
}
