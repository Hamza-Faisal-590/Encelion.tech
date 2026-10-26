'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Clock, Award } from 'lucide-react';
import { caseStudiesData, CaseStudy } from '@/data/caseStudies';

const categories = ['ALL', 'AI AUTOMATION', 'COMPUTER VISION', 'MANUFACTURING', 'DATA ANALYTICS', 'AI AGENTS', 'WORKFLOW AUTOMATION'];

export default function CaseStudiesList() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const allStudies = Object.values(caseStudiesData);

  const filteredStudies = activeCategory === 'ALL'
    ? allStudies
    : allStudies.filter((cs) => cs.category === activeCategory);

  return (
    <div>
      {/* Category Filter Pills */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 10,
        justifyContent: 'center',
        marginBottom: 44,
      }}>
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                background: isActive ? '#00B894' : '#F3F4F6',
                color: isActive ? '#fff' : '#374151',
                border: isActive ? '1px solid #00B894' : '1px solid #E5E7EB',
                borderRadius: 25,
                padding: '8px 20px',
                fontSize: 12,
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                letterSpacing: '0.04em',
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Case Studies Grid */}
      <div className="grid-3" style={{ gap: 28 }}>
        {filteredStudies.map((cs, i) => (
          <div
            key={i}
            className="project-card"
            style={{
              background: '#fff',
              border: '1px solid #E5E7EB',
              borderRadius: 20,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '0 4px 16px rgba(0,0,0,0.04)',
            }}
          >
            {/* Image container */}
            <div style={{ height: 180, overflow: 'hidden', position: 'relative', background: '#0A1628' }}>
              <Image
                src={cs.heroImage.replace(/\.(png|jpg|jpeg)$/, '.webp')}
                alt={cs.title}
                fill
                loading="lazy"
                style={{ objectFit: 'cover' }}
                sizes="(max-width: 768px) 100vw, 380px"
              />
              <div style={{
                position: 'absolute',
                top: 12,
                left: 12,
                fontSize: 10,
                fontWeight: 700,
                color: '#fff',
                background: 'rgba(10,22,40,0.8)',
                backdropFilter: 'blur(6px)',
                borderRadius: 14,
                padding: '4px 12px',
                letterSpacing: '0.05em',
              }}>
                {cs.category}
              </div>

              <div style={{
                position: 'absolute',
                bottom: 12,
                right: 12,
                fontSize: 11,
                fontWeight: 600,
                color: '#fff',
                background: 'rgba(0,184,148,0.9)',
                borderRadius: 12,
                padding: '3px 10px',
                display: 'flex',
                alignItems: 'center',
                gap: 4,
              }}>
                <Award size={12} /> {cs.results[0]?.metric} {cs.results[0]?.label}
              </div>
            </div>

            {/* Body */}
            <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: 12, color: '#6B7280', fontWeight: 600, marginBottom: 6 }}>
                  Client: <span style={{ color: '#0A1628' }}>{cs.client}</span>
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#0A1628', marginBottom: 10, lineHeight: 1.35 }}>
                  {cs.title}
                </h3>
                <p style={{ fontSize: 13, color: '#4B5563', lineHeight: 1.6, marginBottom: 18 }}>
                  {cs.tagline}
                </p>

                {/* Tech pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                  {cs.techStack.slice(0, 3).map((tech, j) => (
                    <span key={j} style={{
                      fontSize: 11, background: '#F3F4F6', color: '#374151', borderRadius: 12, padding: '2px 8px', fontWeight: 500,
                    }}>
                      {tech}
                    </span>
                  ))}
                  {cs.techStack.length > 3 && (
                    <span style={{ fontSize: 11, color: '#9CA3AF', padding: '2px 4px' }}>+{cs.techStack.length - 3} more</span>
                  )}
                </div>
              </div>

              {/* Card Footer Actions */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                paddingTop: 16,
                borderTop: '1px solid #F3F4F6',
              }}>
                <Link
                  href={`/case-studies/${cs.slug}`}
                  className="btn-primary"
                  style={{
                    padding: '8px 20px',
                    fontSize: 12,
                    borderRadius: 20,
                    textDecoration: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  View Case Study <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
