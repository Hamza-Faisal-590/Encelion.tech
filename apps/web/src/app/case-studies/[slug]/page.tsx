import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowRight, CheckCircle, Clock, MapPin, Building, ChevronRight, Award, Layers } from 'lucide-react';
import { notFound } from 'next/navigation';
import { caseStudiesData } from '@/data/caseStudies';

export function generateStaticParams() {
  return Object.keys(caseStudiesData).map((slug) => ({ slug }));
}

interface Props {
  params: { slug: string };
}

export default function CaseStudyDetailPage({ params }: Props) {
  const caseStudy = caseStudiesData[params.slug];

  if (!caseStudy) {
    notFound();
  }

  // Related case studies (excluding current one)
  const relatedStudies = Object.values(caseStudiesData)
    .filter((cs) => cs.slug !== params.slug)
    .slice(0, 3);

  return (
    <div>
      <Navbar />

      {/* ── HERO SECTION ── */}
      <section className="section-dark" style={{ padding: '60px 0 80px', position: 'relative' }}>
        <div className="container">
          {/* Breadcrumb */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, color: 'rgba(255,255,255,0.6)', marginBottom: 24 }}>
            <Link href="/" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Home</Link>
            <ChevronRight size={14} />
            <Link href="/case-studies" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>Case Studies</Link>
            <ChevronRight size={14} />
            <span style={{ color: '#00B894', fontWeight: 600 }}>{caseStudy.title}</span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: 40, alignItems: 'center' }}>
            <div>
              <div style={{
                display: 'inline-block',
                background: 'rgba(0,184,148,0.15)',
                border: '1px solid rgba(0,184,148,0.3)',
                borderRadius: 20,
                padding: '4px 14px',
                fontSize: 11,
                fontWeight: 700,
                color: '#00B894',
                letterSpacing: '0.06em',
                marginBottom: 16,
              }}>
                {caseStudy.category}
              </div>

              <h1 style={{ fontSize: 'clamp(30px, 4vw, 44px)', fontWeight: 800, color: '#fff', lineHeight: 1.1, marginBottom: 16 }}>
                {caseStudy.title}
              </h1>

              <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)', lineHeight: 1.7, marginBottom: 28, maxWidth: 540 }}>
                {caseStudy.tagline}
              </p>

              {/* Client Info Grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 16,
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 16,
                padding: '16px 20px',
                marginBottom: 32,
              }}>
                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Building size={12} /> CLIENT
                  </div>
                  <div style={{ fontSize: 14, color: '#fff', fontWeight: 700, marginTop: 3 }}>{caseStudy.client}</div>
                </div>

                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <MapPin size={12} /> LOCATION
                  </div>
                  <div style={{ fontSize: 14, color: '#fff', fontWeight: 700, marginTop: 3 }}>{caseStudy.location}</div>
                </div>

                <div>
                  <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 4 }}>
                    <Clock size={12} /> DURATION
                  </div>
                  <div style={{ fontSize: 14, color: '#00B894', fontWeight: 700, marginTop: 3 }}>{caseStudy.duration}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
                <Link href="/contact" className="btn-primary" style={{ padding: '12px 28px', borderRadius: 25 }}>
                  Get a Similar Solution <ArrowRight size={14} />
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div style={{
              borderRadius: 20,
              overflow: 'hidden',
              height: 380,
              boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
              border: '1px solid rgba(255,255,255,0.1)',
              position: 'relative',
              background: '#0A1628',
            }}>
              <img
                src={caseStudy.heroImage}
                alt={caseStudy.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(10,22,40,0.7) 0%, transparent 60%)',
              }} />
              <div style={{
                position: 'absolute',
                bottom: 20,
                left: 20,
                right: 20,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                background: 'rgba(10,22,40,0.85)',
                backdropFilter: 'blur(12px)',
                borderRadius: 12,
                padding: '12px 18px',
                border: '1px solid rgba(255,255,255,0.15)',
              }}>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)' }}>Industry Standard</div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#00B894', display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Award size={16} /> Certified Implementation
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── KEY RESULTS METRICS BAR ── */}
      <section style={{ background: '#0F2040', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '40px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 24 }}>
            {caseStudy.results.map((res, i) => (
              <div key={i} style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: 16,
                padding: '20px 24px',
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 36, fontWeight: 800, color: '#00B894', fontFamily: 'Outfit, sans-serif', letterSpacing: '-0.02em', marginBottom: 4 }}>
                  {res.metric}
                </div>
                <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 6 }}>{res.label}</div>
                <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{res.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── OVERVIEW & CHALLENGE ── */}
      <section className="section" style={{ background: '#fff' }}>
        <div className="container" style={{ maxWidth: 900 }}>
          {/* Executive Summary */}
          <div style={{ marginBottom: 48 }}>
            <div className="above-tag" style={{ marginBottom: 8 }}><span>EXECUTIVE SUMMARY</span></div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0A1628', marginBottom: 16 }}>Project Overview</h2>
            <p style={{ fontSize: 16, color: '#4B5563', lineHeight: 1.8 }}>
              {caseStudy.summary}
            </p>
          </div>

          {/* The Challenge */}
          <div style={{
            background: '#FFF5F5',
            border: '1px solid #FECDD3',
            borderLeft: '4px solid #F43F5E',
            borderRadius: 16,
            padding: '28px 32px',
            marginBottom: 48,
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#E11D48', letterSpacing: '0.06em', marginBottom: 8 }}>THE CHALLENGE</div>
            <h3 style={{ fontSize: 20, fontWeight: 700, color: '#9F1239', marginBottom: 12 }}>What the Client Faced</h3>
            <p style={{ fontSize: 15, color: '#4C0519', lineHeight: 1.85, margin: 0 }}>
              {caseStudy.challenge}
            </p>
          </div>

          {/* The Solution */}
          <div style={{ marginBottom: 48 }}>
            <div className="above-tag" style={{ marginBottom: 8 }}><span>THE ENCELION SOLUTION</span></div>
            <h2 style={{ fontSize: 28, fontWeight: 700, color: '#0A1628', marginBottom: 16 }}>How We Solved It</h2>
            <p style={{ fontSize: 16, color: '#4B5563', lineHeight: 1.8, marginBottom: 32 }}>
              {caseStudy.solution}
            </p>

            {/* Implementation Steps Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20 }}>
              {caseStudy.solutionSteps.map((step, i) => (
                <div key={i} style={{
                  background: '#F9FAFB',
                  border: '1px solid #E5E7EB',
                  borderRadius: 16,
                  padding: 24,
                  position: 'relative',
                }}>
                  <div style={{
                    fontSize: 12,
                    fontWeight: 800,
                    color: '#00B894',
                    background: 'rgba(0,184,148,0.1)',
                    borderRadius: 20,
                    padding: '3px 10px',
                    display: 'inline-block',
                    marginBottom: 10,
                  }}>
                    PHASE {step.step}
                  </div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>{step.title}</h4>
                  <p style={{ fontSize: 13, color: '#6B7280', lineHeight: 1.6, margin: 0 }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Testimonial Box */}
          <div style={{
            background: 'linear-gradient(135deg, #0A1628 0%, #0F2040 100%)',
            borderRadius: 24,
            padding: '40px 40px',
            color: '#fff',
            marginBottom: 48,
            boxShadow: '0 12px 36px rgba(10,22,40,0.15)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: -20, right: -20, fontSize: 140, color: 'rgba(0,184,148,0.06)', fontFamily: 'serif', lineHeight: 1, pointerEvents: 'none',
            }}>“</div>

            <div style={{ fontSize: 12, fontWeight: 700, color: '#00B894', letterSpacing: '0.08em', marginBottom: 16 }}>
              CLIENT TESTIMONIAL
            </div>

            <p style={{ fontSize: 18, fontStyle: 'italic', color: 'rgba(255,255,255,0.92)', lineHeight: 1.7, marginBottom: 24, position: 'relative', zIndex: 1 }}>
              "{caseStudy.testimonial.quote}"
            </p>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%', background: '#00B894', color: '#fff',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 16,
              }}>
                {caseStudy.testimonial.author.charAt(0)}
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 700, color: '#fff' }}>{caseStudy.testimonial.author}</div>
                <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{caseStudy.testimonial.role}, <span style={{ color: '#00B894' }}>{caseStudy.testimonial.company}</span></div>
              </div>
            </div>
          </div>

          {/* Tech Stack */}
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: '#6B7280', letterSpacing: '0.08em', marginBottom: 14 }}>
              TECHNOLOGY & TOOLS USED
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              {caseStudy.techStack.map((tech, i) => (
                <span key={i} className="tech-pill" style={{
                  background: '#F3F4F6',
                  border: '1px solid #E5E7EB',
                  borderRadius: 20,
                  padding: '6px 16px',
                  fontSize: 13,
                  fontWeight: 600,
                  color: '#374151',
                }}>
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED CASE STUDIES ── */}
      <section className="section" style={{ background: '#F9FAFB', borderTop: '1px solid #E5E7EB' }}>
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 36 }}>
            <div>
              <div className="above-tag" style={{ marginBottom: 6 }}><span>MORE SUCCESS STORIES</span></div>
              <h2 style={{ fontSize: 24, fontWeight: 700, color: '#0A1628', margin: 0 }}>Explore Other Case Studies</h2>
            </div>
            <Link href="/case-studies" style={{ fontSize: 14, fontWeight: 600, color: '#00B894', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
              View All Case Studies <ArrowRight size={14} />
            </Link>
          </div>

          <div className="grid-3" style={{ gap: 24 }}>
            {relatedStudies.map((cs, i) => (
              <div key={i} className="project-card" style={{
                background: '#fff', border: '1px solid #E5E7EB', borderRadius: 20, overflow: 'hidden', display: 'flex', flexDirection: 'column',
              }}>
                <div style={{ height: 160, overflow: 'hidden', position: 'relative' }}>
                  <img src={cs.heroImage} alt={cs.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', top: 12, left: 12, fontSize: 10, fontWeight: 700, color: '#fff',
                    background: 'rgba(10,22,40,0.75)', backdropFilter: 'blur(4px)', borderRadius: 12, padding: '3px 10px',
                  }}>
                    {cs.category}
                  </div>
                </div>

                <div style={{ padding: 20, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>{cs.title}</h3>
                    <p style={{ fontSize: 12, color: '#6B7280', lineHeight: 1.5, marginBottom: 16 }}>{cs.tagline}</p>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 14, borderTop: '1px solid #F3F4F6' }}>
                    <Link href={`/case-studies/${cs.slug}`} className="learn-more" style={{ fontSize: 12, marginTop: 0 }}>
                      View Case Study <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="cta-section">
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 40px)', fontWeight: 700, color: '#fff', marginBottom: 14 }}>
            Ready to Achieve Similar Results for Your Business?
          </h2>
          <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.7)', marginBottom: 28, maxWidth: 520, margin: '0 auto 28px' }}>
            Schedule a free 30-minute AI strategy consultation with our senior engineers.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/contact" className="btn-primary" style={{ padding: '13px 32px', borderRadius: 25 }}>
              Book Strategy Session <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
