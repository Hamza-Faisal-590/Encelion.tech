'use client';

import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="nav-wrapper">
      <div className="nav-inner">
        {/* Logo */}
        <Link href="/" className="nav-logo">
          <div className="nav-logo-icon">E</div>
          <span className="nav-logo-text">Encelion<span>.tech</span></span>
        </Link>

        {/* Navigation Links */}
        <ul className="nav-links">
          <li><Link href="/">Home</Link></li>
          <li><Link href="/services">Services</Link></li>
          <li><Link href="/products">Products</Link></li>
          <li><Link href="/about">About</Link></li>
          <li><Link href="/case-studies">Case Studies</Link></li>
          <li><Link href="/contact">Contact</Link></li>
        </ul>

        {/* CTA */}
        <Link href="/contact" className="btn-primary">
          Get Started →
        </Link>
      </div>
    </nav>
  );
}
