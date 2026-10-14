import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Founders from '@/components/Founders';
import Link from 'next/link';
import ColorIcon from '@/components/ColorIcon';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="section" style={{ background: 'linear-gradient(135deg, #e6f9f3 0%, #ffffff 100%)', padding: '60px 0 80px' }}>
        <div className="container">
          <div className="hero-grid">
            <div>
              <div className="above-tag"><span>ABOUT ENCELION.TECH</span></div>
              <h1 className="section-title" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
                Building the Future with<br /><span style={{ color: '#00B894' }}>Artificial Intelligence</span>
              </h1>
              <p className="section-subtitle" style={{ marginBottom: 32 }}>
                We are a premium AI agency and SaaS company, helping businesses automate operations, improve productivity, and increase revenue through advanced AI solutions.
              </p>
              <Link href="/contact" className="btn-primary" style={{ borderRadius: 25, padding: '12px 28px' }}>
                Watch Our Story <ArrowRight size={14} />
              </Link>
            </div>

            {/* Robot Image from HD Asset */}
            <div className="hero-subpage-media" style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 12px 36px rgba(0,0,0,0.1)', background: '#e0f7f1' }}>
              <img src="/hero_robot.png" alt="Encelion Robot" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Our Journey Section */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div className="split-half-grid" style={{ marginBottom: 60 }}>
            <div>
              <h2 style={{ fontSize: 32, fontWeight: 700, color: '#0A1628', marginBottom: 16 }}>Our Journey</h2>
              <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.8, marginBottom: 28 }}>
                Encelion.tech was founded with a simple vision: to make advanced AI accessible to every business. What started as a small team of innovators has grown into a global AI solutions provider, helping companies across industries unlock the true potential of AI.
              </p>

              {/* Stats Bar */}
              <div style={{ display: 'flex', gap: 32, borderTop: '1px solid #E5E7EB', paddingTop: 20, flexWrap: 'wrap' }}>
                <div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: '#0A1628' }}>100+</div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>Happy Clients</div>
                </div>
                <div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: '#0A1628' }}>200+</div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>Projects Delivered</div>
                </div>
                <div>
                  <div style={{ fontSize: 32, fontWeight: 700, color: '#0A1628' }}>5+</div>
                  <div style={{ fontSize: 12, color: '#6B7280' }}>Years of Experience</div>
                </div>
              </div>
            </div>

            {/* Team Meeting Photo HD */}
            <div className="hero-subpage-media" style={{ borderRadius: 20, overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.15)' }}>
              <img src="/case_ecommerce.png" alt="Encelion Team" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="section" style={{ background: '#F9FAFB' }}>
        <div className="container">
          <div className="split-section-grid">
            <div>
              <h2 style={{ fontSize: 32, fontWeight: 700, color: '#0A1628', marginBottom: 12 }}>Our Values</h2>
              <p style={{ fontSize: 14, color: '#6B7280', marginBottom: 32 }}>
                Our values drive everything we do. They shape our culture, guide our decisions, and help us deliver exceptional results for our clients.
              </p>

              <div className="grid-2" style={{ gap: 20 }}>
                {[
                  { iconName: 'innovation', title: 'Innovation', desc: "We build what's next." },
                  { iconName: 'excellence', title: 'Excellence', desc: 'We deliver quality.' },
                  { iconName: 'collaboration', title: 'Collaboration', desc: 'We grow together.' },
                  { iconName: 'customer', title: 'Customer Focus', desc: 'Your success is our success.' },
                ].map((v, i) => (
                  <div key={i} style={{ background: '#fff', padding: 22, borderRadius: 16, border: '1px solid #E5E7EB', display: 'flex', alignItems: 'flex-start', gap: 14 }}>
                    <ColorIcon name={v.iconName} size={48} />
                    <div>
                      <div style={{ fontSize: 16, fontWeight: 700, color: '#0A1628', marginBottom: 4 }}>{v.title}</div>
                      <div style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.5 }}>{v.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Dark CTA Card */}
            <div style={{ background: '#0A1628', borderRadius: 20, padding: 36, color: '#fff', position: 'relative', overflow: 'hidden' }}>
              <div className="label-text" style={{ marginBottom: 10 }}>BUILD TOGETHER</div>
              <h3 style={{ fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 12 }}>Let's Build Something Great</h3>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)', lineHeight: 1.6, marginBottom: 28 }}>
                Partner with us for your next enterprise AI project and experience the power of custom autonomous intelligence.
              </p>
              <Link href="/contact" className="btn-primary" style={{ padding: '12px 28px', borderRadius: 25 }}>
                Get Started <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Founders />

      <Footer />
    </div>
  );
}


