'use client';

import Link from 'next/link';
import { Linkedin, Twitter, Globe } from 'lucide-react';
import { useFounders } from '@/hooks/useFounders';

export default function Founders() {
  const { founders } = useFounders();

  return (
    <section style={{
      background: 'linear-gradient(135deg, #0A1628 0%, #0d1f3c 50%, #0A1628 100%)',
      padding: '80px 0',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Background pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(0,184,148,0.08) 0%, transparent 50%),
                          radial-gradient(circle at 80% 50%, rgba(0,184,148,0.06) 0%, transparent 50%)`,
      }} />
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `radial-gradient(#00B894 0.5px, transparent 0.5px)`,
        backgroundSize: '28px 28px',
        opacity: 0.04,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <div className="above-tag" style={{ margin: '0 auto 12px', display: 'inline-block' }}>
            <span style={{ color: '#00B894' }}>MEET THE TEAM</span>
          </div>
          <h2 style={{
            fontSize: 'clamp(28px, 4vw, 42px)',
            fontWeight: 700,
            color: '#fff',
            marginBottom: 14,
            letterSpacing: '-0.02em',
          }}>
            The Minds Behind{' '}
            <span style={{ color: '#00B894' }}>Encelion.tech</span>
          </h2>
          <p style={{
            fontSize: 15,
            color: 'rgba(255,255,255,0.6)',
            maxWidth: 520,
            margin: '0 auto',
            lineHeight: 1.75,
          }}>
            Two visionaries united by a shared belief — that AI should empower every business, not just the biggest ones.
          </p>
        </div>

        {/* Founder Cards */}
        <div className="founders-grid">
          {founders.map((founder, i) => (
            <div
              key={founder.id || i}
              className="founder-card"
              style={{
                background: 'rgba(255,255,255,0.05)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: 24,
                overflow: 'hidden',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-6px)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = '0 24px 60px rgba(0,184,148,0.2)';
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              {/* Top accent bar */}
              <div style={{
                height: 4,
                background: `linear-gradient(90deg, ${founder.color}, #00997A)`,
              }} />

              <div className="founder-card-content">
                {/* Photo + Basic Info */}
                <div className="founder-header">
                  {/* Photo */}
                  <div style={{
                    width: 96,
                    height: 96,
                    borderRadius: 20,
                    overflow: 'hidden',
                    flexShrink: 0,
                    border: `3px solid ${founder.color}33`,
                    background: founder.color,
                    boxShadow: `0 8px 24px ${founder.color}40`,
                  }}>
                    {founder.image ? (
                      <img
                        src={founder.image}
                        alt={founder.name}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                      />
                    ) : (
                      <div style={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 28,
                        fontWeight: 800,
                        color: '#fff',
                        fontFamily: 'Outfit, sans-serif',
                        letterSpacing: '-0.02em',
                      }}>
                        {founder.initials}
                      </div>
                    )}
                  </div>

                  {/* Name & Role */}
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'inline-block',
                      background: `${founder.color}22`,
                      border: `1px solid ${founder.color}44`,
                      borderRadius: 20,
                      padding: '3px 12px',
                      fontSize: 11,
                      fontWeight: 600,
                      color: founder.color,
                      letterSpacing: '0.05em',
                      marginBottom: 8,
                    }}>
                      {founder.tag}
                    </div>
                    <h3 style={{
                      fontSize: 22,
                      fontWeight: 700,
                      color: '#fff',
                      marginBottom: 4,
                      letterSpacing: '-0.01em',
                    }}>
                      {founder.name}
                    </h3>
                    <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', fontWeight: 500 }}>
                      {founder.role}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <p style={{
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.65)',
                  lineHeight: 1.8,
                  marginBottom: 24,
                }}>
                  {founder.bio}
                </p>

                {/* Expertise Tags */}
                <div style={{ marginBottom: 24 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.08em', marginBottom: 10 }}>
                    EXPERTISE
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                    {founder.expertise.map((skill, j) => (
                      <span key={j} style={{
                        background: 'rgba(255,255,255,0.08)',
                        border: '1px solid rgba(255,255,255,0.12)',
                        borderRadius: 20,
                        padding: '4px 14px',
                        fontSize: 12,
                        color: 'rgba(255,255,255,0.75)',
                        fontWeight: 500,
                      }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Divider */}
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)' }}>Connect with {founder.name.split(' ')[0]}</span>
                    <div style={{ display: 'flex', gap: 10 }}>
                      <Link
                        href={founder.linkedin}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = founder.color)}
                        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.08)')}
                      >
                        <Linkedin size={16} />
                      </Link>
                      <Link
                        href={founder.twitter}
                        style={{
                          width: 36,
                          height: 36,
                          borderRadius: 10,
                          background: 'rgba(255,255,255,0.08)',
                          border: '1px solid rgba(255,255,255,0.12)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: '#fff',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.background = founder.color)}
                        onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.08)')}
                      >
                        <Twitter size={16} />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
            Want to collaborate or invest? We'd love to connect.
          </p>
          <Link href="/contact" className="btn-primary" style={{ padding: '12px 32px', borderRadius: 25 }}>
            Get in Touch
          </Link>
        </div>
      </div>
    </section>
  );
}
