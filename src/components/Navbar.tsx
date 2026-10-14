'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Home', href: '/' },
    { label: 'Services', href: '/services' },
    { label: 'Products', href: '/products' },
    { label: 'About', href: '/about' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Contact', href: '/contact' },
  ];

  return (
    <nav className="nav-wrapper">
      <div className="nav-inner">
        {/* Logo */}
        <Link href="/" className="nav-logo" onClick={() => setMobileMenuOpen(false)}>
          <div className="nav-logo-icon">E</div>
          <span className="nav-logo-text">Encelion<span>.tech</span></span>
        </Link>

        {/* Navigation Links - Desktop & Large Screens */}
        <ul className="nav-links desktop-nav">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={isActive ? 'active-nav-link' : ''}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA Button - Desktop */}
        <div className="nav-cta-wrapper desktop-nav">
          <Link href="/contact" className="btn-primary">
            Get Started →
          </Link>
        </div>

        {/* Mobile & Tablet Hamburger Toggle */}
        <button
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile & Tablet Dropdown Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-nav-drawer">
          <ul className="mobile-nav-links">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{link.label}</span>
                    <ArrowRight size={16} className="mobile-arrow" />
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="mobile-nav-footer">
            <Link
              href="/contact"
              className="btn-primary mobile-cta-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Started →
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
