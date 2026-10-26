import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import ColorIcon from '@/components/ColorIcon';
import { ArrowRight } from 'lucide-react';
import { DEFAULT_PRODUCTS } from '@/data/products';

// Static server component — no 'use client' needed for product list rendering
export default function ProductsPage() {
  const activeProducts = DEFAULT_PRODUCTS.filter(p => p.status !== 'DRAFT');

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #f0fdf9 0%, #ffffff 100%)', padding: '60px 0 80px' }}>
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="above-tag"><span>OUR PRODUCTS</span></div>
              <h1 className="section-title" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
                Powerful <span style={{ color: '#00B894' }}>AI Products</span><br />for Modern Businesses
              </h1>
              <p className="section-subtitle" style={{ marginBottom: 32 }}>
                From intelligent automation to advanced analytics, our AI products are built to help you work smarter, move faster, and achieve more.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/products" className="btn-primary" style={{ borderRadius: 25, padding: '12px 28px' }}>
                  Explore All Products <ArrowRight size={14} />
                </Link>
                <Link href="/contact" className="btn-outline" style={{ borderRadius: 25, padding: '12px 28px' }}>
                  Watch Demo
                </Link>
              </div>
            </div>

            {/* Hero image */}
            <div className="hero-subpage-media" style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 12px 36px rgba(0,0,0,0.12)', background: '#0A1628', position: 'relative' }}>
              <Image src="/dashboard_product.webp" alt="SaaS Dashboard Laptop" fill priority style={{ objectFit: 'cover' }} sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          </div>
        </div>
      </section>

      {/* Product Suite Grid */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="above-tag" style={{ margin: '0 auto 8px' }}><span>ALL PRODUCTS</span></div>
            <h2 className="section-title">Explore Our AI Product Suite</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Powerful, scalable, and easy to use. Our products are built for businesses of all sizes — from startups to enterprises.
            </p>
          </div>

          <div className="grid-3" style={{ gap: 24 }}>
            {activeProducts.map((p, i) => (
              <div key={p.id || p.slug || i} className="service-card">
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
                  <ColorIcon name={p.iconName || 'workflow'} size={50} />
                  {p.badge && (
                    <span style={{ fontSize: 11, fontWeight: 700, padding: '3px 10px', borderRadius: 12, background: '#E6F7F4', color: '#00B894' }}>
                      {p.badge}
                    </span>
                  )}
                </div>
                <h3 style={{ fontSize: 17, marginBottom: 6 }}>{p.title}</h3>
                <p style={{ fontSize: 13, color: '#6B7280', marginBottom: 16 }}>{p.desc}</p>
                <Link href={p.ctaLink || '/contact'} className="learn-more">
                  {p.ctaText || 'Learn More'} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dark CTA Banner */}
      <section className="container" style={{ marginBottom: 80 }}>
        <div style={{ background: '#0A1628', borderRadius: 20, padding: '40px 48px', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 24 }}>
          <div>
            <h3 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Ready to Build Your AI Product?</h3>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)' }}>Get started with our powerful AI products and transform your business today.</p>
          </div>
          <Link href="/contact" className="btn-primary" style={{ padding: '12px 28px', borderRadius: 25 }}>
            Get Started <ArrowRight size={14} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
