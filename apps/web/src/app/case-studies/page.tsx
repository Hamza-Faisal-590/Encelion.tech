import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import CaseStudiesList from '@/components/CaseStudiesList';

export default function CaseStudiesPage() {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="section-dark" style={{ padding: '60px 0 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 40, alignItems: 'center' }}>
            <div>
              <div className="above-tag"><span style={{ color: '#00B894' }}>OUR CASE STUDIES</span></div>
              <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 800, color: '#fff', lineHeight: 1.05, marginBottom: 20 }}>
                Real Solutions. <span style={{ color: '#00B894' }}>Proven Results.</span>
              </h1>
              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.75)', lineHeight: 1.75, maxWidth: 500, marginBottom: 32 }}>
                Explore how Encelion.tech has transformed business operations, slashed support costs, and optimized manufacturing for leaders across industries. Read our detailed case studies and real project breakdowns.
              </p>

              {/* Hero Stats */}
              <div style={{ display: 'flex', gap: 32, borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: 20 }}>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#00B894', fontFamily: 'Outfit, sans-serif' }}>100+</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>AI Projects Deployed</div>
                </div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#00B894', fontFamily: 'Outfit, sans-serif' }}>$10M+</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Client ROI Delivered</div>
                </div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 800, color: '#00B894', fontFamily: 'Outfit, sans-serif' }}>99.2%</div>
                  <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)' }}>Model Accuracy SLA</div>
                </div>
              </div>
            </div>

            {/* Code Monitors Image HD */}
            <div style={{ borderRadius: 20, overflow: 'hidden', height: 350, boxShadow: '0 10px 30px rgba(0,0,0,0.4)', background: '#0F2040', border: '1px solid rgba(255,255,255,0.1)' }}>
              <img src="/dashboard_product.png" alt="Encelion Case Study Analytics Dashboard" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Case Studies Gallery Section */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div className="above-tag" style={{ margin: '0 auto 8px' }}><span>PROVEN SUCCESS STORIES</span></div>
            <h2 className="section-title">Explore Our Case Studies</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Click any project to read the complete breakdown and business impact.
            </p>
          </div>

          <CaseStudiesList />
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container" style={{ marginBottom: 80 }}>
        <div style={{
          background: 'linear-gradient(135deg, #0A1628 0%, #0F2040 100%)',
          borderRadius: 24,
          padding: '44px 52px',
          color: '#fff',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 24,
          boxShadow: '0 12px 32px rgba(10,22,40,0.15)',
        }}>
          <div>
            <h3 style={{ fontSize: 26, fontWeight: 700, color: '#fff', marginBottom: 8 }}>Have a Custom AI Challenge?</h3>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', margin: 0 }}>
              Let's design a custom solution tailored specifically to your operational requirements.
            </p>
          </div>
          <Link href="/contact" className="btn-primary" style={{ padding: '13px 32px', borderRadius: 25 }}>
            Start a Project <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
