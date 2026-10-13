import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Founders from '@/components/Founders';
import Link from 'next/link';
import ColorIcon from '@/components/ColorIcon';
import { ArrowRight } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="section-dark" style={{ padding: '60px 0 80px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 40, alignItems: 'center' }}>
            <div>
              <div className="above-tag"><span style={{ color: '#00B894' }}>OUR SERVICES</span></div>
              <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', fontWeight: 700, color: '#fff', lineHeight: 1.05, marginBottom: 20 }}>
                Custom AI Solutions<br />for Real <span style={{ color: '#00B894' }}>Business Impact</span>
              </h1>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', lineHeight: 1.75, maxWidth: 500, marginBottom: 32 }}>
                We help businesses automate operations, improve productivity, and increase revenue through advanced AI solutions. Our expert team builds, implements, and scales AI systems tailored to your unique needs.
              </p>
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn-primary" style={{ padding: '12px 28px', borderRadius: 25 }}>
                  Get Started <ArrowRight size={14} />
                </Link>
                <Link href="/contact" className="btn-outline" style={{ color: '#fff', borderColor: '#00B894', padding: '12px 28px', borderRadius: 25 }}>
                  Talk to Our Experts
                </Link>
              </div>
            </div>

            <div style={{ borderRadius: 20, overflow: 'hidden', height: 360, boxShadow: '0 10px 30px rgba(0,0,0,0.3)', background: '#0A1628' }}>
              <img src="/hero_robot.png" alt="Encelion Services Robot" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }} />
            </div>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <div className="above-tag" style={{ margin: '0 auto 8px' }}><span>WHAT WE OFFER</span></div>
            <h2 className="section-title">Our AI Services</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              End-to-end AI solutions designed to transform your business.
            </p>
          </div>

          <div className="grid-3" style={{ gap: 24 }}>
            {[
              { iconName: 'agents', slug: 'ai-agents', title: 'AI Agents', desc: 'Intelligent agents that think, plan and act.' },
              { iconName: 'chatbot', slug: 'chatbots', title: 'Chatbots', desc: 'AI chatbots for better customer engagement.' },
              { iconName: 'workflow', slug: 'workflow-automation', title: 'Workflow Automation', desc: 'Streamline your operations with AI-powered workflows.' },
              { iconName: 'vision', slug: 'computer-vision', title: 'Computer Vision', desc: 'See, analyze, and make smarter decisions.' },
              { iconName: 'custom', slug: 'custom-ai', title: 'Custom AI Development', desc: 'Tailored AI solutions for your unique needs.' },
            ].map((s, i) => (
              <div key={i} className="service-card">
                <div style={{ marginBottom: 16 }}>
                  <ColorIcon name={s.iconName} size={52} />
                </div>
                <h3 style={{ fontSize: 17, marginBottom: 8 }}>{s.title}</h3>
                <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, marginBottom: 16 }}>{s.desc}</p>
                <Link href={`/services/${s.slug}`} className="learn-more">Learn More <ArrowRight size={14} /></Link>
              </div>
            ))}

            {/* 6th Card: Your Vision + Our AI = Real Results */}
            <div style={{ background: '#00B894', borderRadius: 16, padding: 28, color: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 10, letterSpacing: '-0.02em' }}>Your Vision + Our AI = Real Results</h3>
                <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.9)', lineHeight: 1.6 }}>
                  Let's build something amazing together. Get in touch with our team today.
                </p>
              </div>
              <div style={{ marginTop: 24 }}>
                <Link href="/contact" className="btn-primary" style={{ background: '#0A1628', color: '#fff' }}>
                  Get Started <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Founders />

      <Footer />
    </div>
  );
}


