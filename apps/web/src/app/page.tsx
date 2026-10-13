import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Founders from '@/components/Founders';
import Link from 'next/link';
import ColorIcon from '@/components/ColorIcon';
import { ArrowRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      <Navbar />

      {/* ══════════════════════════════════════════
          HERO SECTION
      ══════════════════════════════════════════ */}
      <section style={{
        background: 'linear-gradient(135deg, #e6f9f3 0%, #ffffff 40%, #f4fbf8 100%)',
        padding: '50px 0 30px',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background texture */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(#00B894 0.5px, transparent 0.5px)`,
          backgroundSize: '24px 24px',
          opacity: 0.12,
        }} />

        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '36px', alignItems: 'center' }}>
            {/* Left Content */}
            <div>
              <div className="above-tag" style={{ marginBottom: 14 }}>
                <span>AI-Powered Solutions for a Smarter Tomorrow</span>
              </div>

              <h1 style={{
                fontSize: 'clamp(36px, 4.5vw, 60px)',
                fontWeight: 700,
                color: '#0A1628',
                lineHeight: 1.05,
                marginBottom: 18,
                letterSpacing: '-0.03em',
              }}>
                We Build <span style={{ color: '#00B894' }}>Intelligent<br />AI Solutions</span> for<br />
                Modern Businesses
              </h1>

              <p style={{ fontSize: 15, color: '#4B5563', lineHeight: 1.75, maxWidth: 460, marginBottom: 28 }}>
                Encelion.tech is a premium AI agency and SaaS company helping businesses automate operations, improve productivity, and increase revenue through advanced AI solutions.
              </p>

              <div style={{ display: 'flex', gap: 12, alignItems: 'center', marginBottom: 32, flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn-primary" style={{ fontSize: 14, padding: '12px 28px', borderRadius: 25 }}>
                  Get Started <ArrowRight size={16} />
                </Link>
                <Link href="/services" className="btn-outline" style={{ fontSize: 14, padding: '12px 28px', borderRadius: 25 }}>
                  Explore Services
                </Link>
              </div>

              {/* Trust Badge */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ display: 'flex' }}>
                  {['SA', 'JO', 'EV'].map((initials, i) => (
                    <div key={i} style={{
                      width: 34,
                      height: 34,
                      borderRadius: '50%',
                      background: ['#00B894', '#0A1628', '#00997A'][i],
                      border: '2px solid #fff',
                      marginLeft: i === 0 ? 0 : -8,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#fff',
                      fontSize: 11,
                      fontWeight: 700,
                    }}>{initials}</div>
                  ))}
                </div>
                <span style={{ fontSize: 13, color: '#4B5563', fontWeight: 500 }}>
                  Trusted by <strong>100+ Businesses</strong> worldwide
                </span>
              </div>
            </div>

            {/* Right Column: Robot Image with Floating Pills */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{
                position: 'relative',
                width: '100%',
                maxHeight: 480,
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 20px 40px rgba(0,184,148,0.15)',
                background: '#e0f7f1',
              }}>
                <img
                  src="/hero_robot.png"
                  alt="Encelion Futuristic AI Robot"
                  style={{
                    width: '100%',
                    height: '460px',
                    objectFit: 'cover',
                    objectPosition: 'center top',
                  }}
                />

                {/* Powered by Innovation Overlay Badge */}
                <div style={{
                  position: 'absolute',
                  bottom: 20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'rgba(10, 22, 40, 0.85)',
                  backdropFilter: 'blur(12px)',
                  padding: '8px 18px',
                  borderRadius: '20px',
                  border: '1px solid rgba(0,184,148,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  zIndex: 10,
                }}>
                  <ColorIcon name="sparkles" size={20} />
                  <span style={{ color: '#fff', fontSize: 12, fontWeight: 600 }}>AI Powered by Innovation</span>
                </div>
              </div>

              {/* Floating Feature Pills with Color Image Icons */}
              <div style={{
                position: 'absolute',
                top: '10%',
                right: '-10px',
                background: '#fff',
                padding: '8px 14px',
                borderRadius: '14px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 12,
                fontWeight: 600,
                color: '#0A1628',
                zIndex: 10,
              }}>
                <ColorIcon name="workflow" size={32} />
                <span>Automate Operations →</span>
              </div>

              <div style={{
                position: 'absolute',
                top: '42%',
                right: '-20px',
                background: '#fff',
                padding: '8px 14px',
                borderRadius: '14px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 12,
                fontWeight: 600,
                color: '#0A1628',
                zIndex: 10,
              }}>
                <ColorIcon name="zap" size={32} />
                <span>Boost Productivity →</span>
              </div>

              <div style={{
                position: 'absolute',
                bottom: '16%',
                right: '-10px',
                background: '#fff',
                padding: '8px 14px',
                borderRadius: '14px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                fontSize: 12,
                fontWeight: 600,
                color: '#0A1628',
                zIndex: 10,
              }}>
                <ColorIcon name="trending" size={32} />
                <span>Increase Revenue →</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          SERVICES SECTION
      ══════════════════════════════════════════ */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', alignItems: 'start' }}>
            {/* Left Intro */}
            <div>
              <div className="above-tag"><span>OUR SERVICES</span></div>
              <h2 className="section-title">
                End-to-End AI Solutions<br />for Your Business
              </h2>
              <p className="section-subtitle" style={{ marginBottom: 24 }}>
                From intelligent automation to custom AI development, we deliver solutions that drive real business impact.
              </p>
              <Link href="/services" className="learn-more" style={{ fontSize: 14 }}>
                View All Services <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right Cards Grid with 3D Color Image Icons */}
            <div className="grid-3" style={{ gap: 16 }}>
              {[
                { iconName: 'agents', slug: 'ai-agents', title: 'AI Agents', desc: 'Autonomous agents that think, plan and act.' },
                { iconName: 'chatbot', slug: 'chatbots', title: 'Chatbots', desc: 'Intelligent chatbots for better customer engagement.' },
                { iconName: 'workflow', slug: 'workflow-automation', title: 'Workflow Automation', desc: 'Streamline your operations with AI-powered workflows.' },
                { iconName: 'vision', slug: 'computer-vision', title: 'Computer Vision', desc: 'See, analyze, and make smarter decisions.' },
                { iconName: 'custom', slug: 'custom-ai', title: 'Custom AI Development', desc: 'Tailored AI solutions for your unique needs.' },
              ].map((s, i) => (
                <div key={i} className="service-card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 14 }}>
                    <ColorIcon name={s.iconName} size={48} />
                    <span style={{ color: '#00B894', fontSize: 14, fontWeight: 700 }}>↗</span>
                  </div>
                  <h3 style={{ fontSize: 16, marginBottom: 6 }}>{s.title}</h3>
                  <p style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.6 }}>{s.desc}</p>
                  <Link href={`/services/${s.slug}`} className="learn-more" style={{ fontSize: 12 }}>Learn More <ArrowRight size={12} /></Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DARK SECTION — WHY CHOOSE ENCELION.TECH
      ══════════════════════════════════════════ */}
      <section className="section-dark">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
            {/* Left Content */}
            <div>
              <div className="above-tag"><span style={{ color: '#00B894' }}>WHY CHOOSE ENCELION.TECH</span></div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
                More Than Technology<br />
                We Build Your <span style={{ color: '#00B894' }}>Future</span>
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 24, maxWidth: 440 }}>
                We combine deep AI expertise with modern technology to deliver scalable, secure, and high-performance solutions that grow with your business.
              </p>
              <Link href="/about" className="btn-outline" style={{ color: '#fff', borderColor: '#00B894' }}>
                Our Approach <ArrowRight size={14} />
              </Link>
            </div>

            {/* Right: Neural Brain graphic */}
            <div>
              <div style={{ textAlign: 'center', marginBottom: 20 }}>
                <img src="/ai_brain.png" alt="Neural Brain" style={{ maxHeight: 240, margin: '0 auto', objectFit: 'contain' }} />
              </div>

              <div className="grid-4" style={{ gap: 12 }}>
                {[
                  { iconName: 'security', title: 'Enterprise Security', desc: 'Your data, our priority.' },
                  { iconName: 'architecture', title: 'Scalable Architecture', desc: 'Built for growth.' },
                  { iconName: 'team', title: 'Expert Team', desc: 'AI specialists & engineers.' },
                  { iconName: 'results', title: 'Proven Results', desc: 'Real business impact.' },
                ].map((item, i) => (
                  <div key={i} style={{ textAlign: 'center', background: 'rgba(255,255,255,0.03)', padding: 14, borderRadius: 14, border: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 8 }}>
                      <ColorIcon name={item.iconName} size={38} />
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{item.title}</div>
                    <div style={{ fontSize: 10, color: 'rgba(255,255,255,0.5)' }}>{item.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          STATS BAR
      ══════════════════════════════════════════ */}
      <div className="stats-bar">
        <div className="container">
          <div className="grid-4" style={{ gap: 16 }}>
            {[
              { num: '100+', label: 'Happy Clients', iconName: 'clients' },
              { num: '200+', label: 'AI Projects Delivered', iconName: 'projects' },
              { num: '99%', label: 'Client Satisfaction', iconName: 'satisfaction' },
              { num: '24/7', label: 'Support & Maintenance', iconName: 'support' },
            ].map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 14, background: '#fff', padding: '14px 18px', borderRadius: 14, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                <ColorIcon name={s.iconName} size={46} />
                <div>
                  <div style={{ fontSize: 24, fontWeight: 700, color: '#0A1628', lineHeight: 1.1 }}>{s.num}</div>
                  <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>{s.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════
          OUR PRODUCTS SECTION
      ══════════════════════════════════════════ */}
      <section className="section" style={{ background: '#F9FAFB' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', alignItems: 'start' }}>
            {/* Left */}
            <div>
              <div className="above-tag"><span>OUR PRODUCTS</span></div>
              <h2 className="section-title">
                Powerful SaaS Products<br />for Long-Term Growth
              </h2>
              <p className="section-subtitle" style={{ marginBottom: 24 }}>
                Turn your AI success into lasting results with our enterprise-grade SaaS products.
              </p>
              <Link href="/products" className="btn-primary" style={{ borderRadius: 20 }}>
                Explore Products <ArrowRight size={14} />
              </Link>
            </div>

            {/* Products Grid */}
            <div className="grid-3" style={{ gap: 16 }}>
              {[
                { title: 'AI Automation Suite', desc: 'Automate workflows & save time.', tag: 'AUTOMATION', img: '/prod_automation.png' },
                { title: 'AI Chat Platform', desc: 'Build intelligent conversations.', tag: 'CHAT AI', img: '/prod_chat.png' },
                { title: 'Computer Vision Pro', desc: 'Turn visual data into insights.', tag: 'VISION AI', img: '/prod_vision.png' },
              ].map((p, i) => (
                <div key={i} className="product-card">
                  <div style={{ height: 150, background: '#0A1628', overflow: 'hidden' }}>
                    <img src={p.img} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div className="product-card-body" style={{ padding: 16 }}>
                    <div className="product-tag">{p.tag}</div>
                    <h3 style={{ fontSize: 15, marginBottom: 4 }}>{p.title}</h3>
                    <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 12 }}>{p.desc}</p>
                    <Link href="/products" className="learn-more" style={{ fontSize: 12 }}>Learn More <ArrowRight size={12} /></Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          OUR PROCESS SECTION
      ══════════════════════════════════════════ */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '40px', alignItems: 'start' }}>
            {/* Left */}
            <div>
              <div className="above-tag"><span>OUR PROCESS</span></div>
              <h2 className="section-title">
                From Idea to Impact<br />in 4 Simple Steps
              </h2>
              <p className="section-subtitle" style={{ marginBottom: 24 }}>
                We make AI adoption simple, transparent, and results-driven.
              </p>
              <Link href="/contact" className="btn-primary" style={{ borderRadius: 20 }}>
                Start Your Project <ArrowRight size={14} />
              </Link>
            </div>

            {/* Steps Cards */}
            <div className="grid-4" style={{ gap: 14 }}>
              {[
                { num: '01', iconName: 'discover', title: 'Discover', desc: 'Understand your goals & challenges.' },
                { num: '02', iconName: 'plan', title: 'Plan', desc: 'Design the best AI solution.' },
                { num: '03', iconName: 'build', title: 'Build', desc: 'Develop & integrate with your systems.' },
                { num: '04', iconName: 'grow', title: 'Grow', desc: 'Scale, optimize & maximize results.' },
              ].map((step, i) => (
                <div key={i} style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 14, padding: 18, textAlign: 'center' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 12 }}>
                    <ColorIcon name={step.iconName} size={44} />
                  </div>
                  <h3 style={{ fontSize: 15, fontWeight: 600, color: '#0A1628', marginBottom: 4 }}>{step.title}</h3>
                  <p style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.6 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          CASE STUDIES SECTION
      ══════════════════════════════════════════ */}
      <section className="section-dark">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '40px', alignItems: 'start' }}>
            {/* Left */}
            <div>
              <div className="above-tag"><span style={{ color: '#00B894' }}>CASE STUDIES</span></div>
              <h2 style={{ fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 700, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
                Real Businesses.<br />
                <span style={{ color: '#00B894' }}>Real Results.</span>
              </h2>
              <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.65)', lineHeight: 1.75, marginBottom: 24 }}>
                See how we've helped companies across industries transform with AI.
              </p>
              <Link href="/case-studies" className="btn-outline" style={{ color: '#fff', borderColor: '#00B894' }}>
                View All Case Studies <ArrowRight size={14} />
              </Link>
            </div>

            {/* Case Study Grid */}
            <div className="grid-3" style={{ gap: 16 }}>
              {[
                { category: 'E-commerce', title: 'AI Chatbot + Automation', stat: '+300%', statLabel: 'Customer Engagement', img: '/case_ecommerce.png' },
                { category: 'Healthcare', title: 'Computer Vision System', stat: '+250%', statLabel: 'Processing Speed', img: '/case_healthcare.png' },
                { category: 'Manufacturing', title: 'AI Quality Inspection', stat: '+95%', statLabel: 'Accuracy Rate', img: '/case_manufacturing.png' },
              ].map((c, i) => (
                <div key={i} style={{ background: '#0F2040', border: '1px solid rgba(255,255,255,0.08)', borderRadius: 14, overflow: 'hidden' }}>
                  <div style={{ height: 130, background: '#1a2e50', overflow: 'hidden' }}>
                    <img src={c.img} alt={c.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ padding: 14 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: '#00B894', textTransform: 'uppercase', marginBottom: 4 }}>{c.category}</div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{c.title}</div>
                    <div style={{ fontSize: 24, fontWeight: 700, color: '#00B894' }}>{c.stat}</div>
                    <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)' }}>{c.statLabel}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          TESTIMONIALS SECTION
      ══════════════════════════════════════════ */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: 36 }}>
            <div className="above-tag" style={{ margin: '0 auto 8px' }}><span>TESTIMONIALS</span></div>
            <h2 className="section-title">What Our Clients Say</h2>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              Trusted by forward-thinking businesses around the world.
            </p>
          </div>

          <div className="grid-3" style={{ gap: 20 }}>
            {[
              {
                quote: 'Encelion.tech transformed our operations with AI automation. The results exceeded our expectations!',
                name: 'Sarah Ahmed',
                role: 'CEO, Tech Ventures',
                initials: 'SA',
              },
              {
                quote: 'Their team is professional, skilled, and truly understands business needs. Highly recommended!',
                name: 'James Carter',
                role: 'Founder, SmartScale',
                initials: 'JC',
              },
              {
                quote: 'The AI solutions provided by Encelion.tech helped us increase productivity and revenue significantly!',
                name: 'Priya Sharma',
                role: 'CTO, NovaTech',
                initials: 'PS',
              },
            ].map((t, i) => (
              <div key={i} className="testimonial-card">
                <p style={{ fontSize: 14, color: '#374151', lineHeight: 1.75, marginBottom: 16, fontStyle: 'italic' }}>"{t.quote}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.initials}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-role">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: 28 }}>
            <Link href="/case-studies" className="learn-more">View More <ArrowRight size={14} /></Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          FOUNDERS SECTION
      ══════════════════════════════════════════ */}
      <Founders />

      {/* ══════════════════════════════════════════
          CTA SECTION
      ══════════════════════════════════════════ */}
      <section className="cta-section">
        <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 700, color: '#fff', marginBottom: 12 }}>
            Ready to Build Your<br />
            <span style={{ color: '#00B894' }}>AI Future?</span>
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', marginBottom: 24, maxWidth: 500, margin: '0 auto 24px' }}>
            Let's create something extraordinary together.<br />Get in touch with our team today.
          </p>

          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', alignItems: 'center', marginBottom: 20 }}>
            <Link href="/contact" className="btn-primary" style={{ padding: '12px 32px', borderRadius: 25 }}>
              Get Started <ArrowRight size={16} />
            </Link>
          </div>

          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', fontSize: 13, color: 'rgba(255,255,255,0.6)', alignItems: 'center' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><ColorIcon name="email" size={20} /> hello@encelion.tech</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}><ColorIcon name="phone" size={20} /> +92 001 23 4567</span>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


