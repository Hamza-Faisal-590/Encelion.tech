import Link from 'next/link';
import { Mail, Phone, MapPin, Twitter, Linkedin, Github, Youtube, ArrowRight } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Column */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
              <div className="nav-logo-icon">E</div>
              <span style={{ fontSize: 18, fontWeight: 700, color: '#fff', fontFamily: 'var(--font-display)' }}>
                Encelion<span style={{ color: '#00B894' }}>.tech</span>
              </span>
            </div>
            <div style={{ fontSize: 10, fontWeight: 400, color: '#00B894', textTransform: 'uppercase', letterSpacing: '0.15em', fontFamily: 'var(--font-mono)', marginBottom: 12 }}>
              AI Solutions for a Smarter Tomorrow
            </div>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', lineHeight: 1.7, maxWidth: 280, marginBottom: 20 }}>
              We build intelligent AI solutions to help businesses automate, innovate, and grow.
            </p>
            <div className="social-links" style={{ display: 'flex', gap: 12 }}>
              <a href="#" className="social-link" title="X (Twitter)" style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all 0.2s' }}>
                <Twitter size={16} />
              </a>
              <a href="#" className="social-link" title="LinkedIn" style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all 0.2s' }}>
                <Linkedin size={16} />
              </a>
              <a href="#" className="social-link" title="GitHub" style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all 0.2s' }}>
                <Github size={16} />
              </a>
              <a href="#" className="social-link" title="YouTube" style={{ width: 34, height: 34, borderRadius: 8, background: 'rgba(255,255,255,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', transition: 'all 0.2s' }}>
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4>Quick Links</h4>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/products">Products</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/case-studies">Case Studies</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Our Services */}
          <div>
            <h4>Our Services</h4>
            <ul>
              <li><Link href="/services">AI Agents</Link></li>
              <li><Link href="/services">Chatbots</Link></li>
              <li><Link href="/services">Workflow Automation</Link></li>
              <li><Link href="/services">Computer Vision</Link></li>
              <li><Link href="/services">Custom AI Development</Link></li>
            </ul>
          </div>

          {/* Contact Us */}
          <div>
            <h4>Contact Us</h4>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Mail size={15} color="#00B894" />
                <a href="mailto:hello@encelion.tech">hello@encelion.tech</a>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Phone size={15} color="#00B894" />
                <a href="tel:+92001234567">+92 001 23 4567</a>
              </li>
              <li style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13, display: 'flex', alignItems: 'center', gap: 8 }}>
                <MapPin size={15} color="#00B894" />
                <span>Lahore, Pakistan</span>
              </li>
            </ul>
            <div style={{ marginTop: 20 }}>
              <Link href="/contact" className="btn-primary" style={{ fontSize: 12, padding: '8px 18px', borderRadius: 20 }}>
                Get Started <ArrowRight size={12} />
              </Link>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <span>© 2026 Encelion.tech. All rights reserved.</span>
          <div className="footer-bottom-links">
            <a href="http://localhost:3001" target="_blank" rel="noopener noreferrer" style={{ color: '#00B894', textDecoration: 'none', fontSize: 12, fontWeight: 700 }}>
              ⚡ Admin Console
            </a>
            <Link href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: 12 }}>Privacy Policy</Link>
            <Link href="#" style={{ color: 'rgba(255,255,255,0.4)', textDecoration: 'none', fontSize: 12 }}>Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

