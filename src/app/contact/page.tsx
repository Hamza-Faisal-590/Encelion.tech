'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useState } from 'react';
import ColorIcon from '@/components/ColorIcon';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useContactInfo } from '@/hooks/useContactInfo';

export default function ContactPage() {
  const { contactInfo } = useContactInfo();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div>
      <Navbar />

      {/* Hero Section */}
      <section className="section" style={{
        background: 'linear-gradient(135deg, #e6f9f3 0%, #ffffff 100%)',
        padding: '60px 0 40px',
      }}>
        <div className="container">
          <div style={{ textAlign: 'center', maxWidth: 700, margin: '0 auto 40px' }}>
            <div className="above-tag" style={{ margin: '0 auto 8px' }}><span>GET IN TOUCH</span></div>
            <h1 className="section-title" style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>
              Let's Build Something<br /><span style={{ color: '#00B894' }}>Great Together</span>
            </h1>
            <p className="section-subtitle" style={{ margin: '0 auto' }}>
              {contactInfo.contactSubtitle || "Have a project in mind, a question, or just want to say hello? We'd love to hear from you."}
            </p>
          </div>

          {/* 3 Contact Info Pills at top */}
          <div className="grid-3" style={{ gap: 20, marginBottom: 40 }}>
            {[
              { iconName: 'email', label: 'Email Us', val: contactInfo.email, link: `mailto:${contactInfo.email}` },
              { iconName: 'phone', label: 'Call Us', val: contactInfo.phone, link: `tel:${contactInfo.phone.replace(/\s+/g, '')}` },
              { iconName: 'location', label: 'Visit Us', val: contactInfo.address, link: '#' },
            ].map((c, i) => (
              <div key={i} style={{ background: '#fff', padding: 22, borderRadius: 18, border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', gap: 16, boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
                <ColorIcon name={c.iconName} size={48} />
                <div>
                  <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 500 }}>{c.label}</div>
                  <a href={c.link} style={{ fontSize: 14, fontWeight: 700, color: '#0A1628', textDecoration: 'none' }}>{c.val}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form & Why Work With Us Section */}
      <section className="section" style={{ background: '#fff', paddingTop: 0 }}>
        <div className="container">
          <div className="split-section-grid">
            {/* Form */}
            <div className="contact-card" style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: 20 }}>
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 16 }}>
                    <ColorIcon name="satisfaction" size={56} />
                  </div>
                  <h3 style={{ fontSize: 22, fontWeight: 700, color: '#0A1628', marginBottom: 8 }}>Message Sent Successfully!</h3>
                  <p style={{ color: '#6B7280', fontSize: 13, marginBottom: 20 }}>
                    We'll review your request and get back to you as soon as possible.
                  </p>
                  <button onClick={() => setSubmitted(false)} className="btn-outline">
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <h3 style={{ fontSize: 20, fontWeight: 700, color: '#0A1628', marginBottom: 4 }}>Send Us a Message</h3>
                  <p style={{ fontSize: 12, color: '#6B7280', marginBottom: 8 }}>Fill out the form below and we'll get back to you as soon as possible.</p>

                  <div className="grid-2" style={{ gap: 16 }}>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Full Name *</label>
                      <input
                        type="text"
                        required
                        placeholder="Your name"
                        value={formData.name}
                        onChange={e => setFormData({ ...formData, name: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 13, outline: 'none' }}
                      />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Email Address *</label>
                      <input
                        type="email"
                        required
                        placeholder="you@company.com"
                        value={formData.email}
                        onChange={e => setFormData({ ...formData, email: e.target.value })}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 13, outline: 'none' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Subject *</label>
                    <input
                      type="text"
                      required
                      placeholder="Select a subject..."
                      value={formData.subject}
                      onChange={e => setFormData({ ...formData, subject: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 13, outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#374151', marginBottom: 4 }}>Message *</label>
                    <textarea
                      required
                      rows={4}
                      placeholder="Tell us about your project..."
                      value={formData.message}
                      onChange={e => setFormData({ ...formData, message: e.target.value })}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 8, border: '1px solid #D1D5DB', fontSize: 13, outline: 'none', resize: 'vertical' }}
                    />
                  </div>

                  <button type="submit" className="btn-primary" style={{ padding: '12px 24px', justifyContent: 'center', fontSize: 14, borderRadius: 8 }}>
                    Send Message <ArrowRight size={16} />
                  </button>
                </form>
              )}
            </div>

            {/* Why Work With Us */}
            <div className="contact-card contact-why-card" style={{ background: '#0A1628', borderRadius: 20, color: '#fff' }}>
              <h3 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 20 }}>Why Work With Us?</h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {[
                  { iconName: 'team', title: 'Expert AI Team', desc: 'Skilled professionals with real-world experience.' },
                  { iconName: 'studio', title: 'Custom Solutions', desc: 'Tailored to your business needs.' },
                  { iconName: 'support', title: 'On-Time Delivery', desc: 'We value your time and goals.' },
                  { iconName: 'security', title: 'Long-Term Support', desc: "We're here even after launch." },
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
                    <ColorIcon name={item.iconName} size={42} />
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 2 }}>{item.title}</div>
                      <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}


