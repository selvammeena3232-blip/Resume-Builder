import React from 'react';
import { Star, Quote } from 'lucide-react';

const reviews = [
  {
    name: "Sarah Jenkins",
    role: "Senior Software Engineer @ Google",
    rating: 5,
    text: "Using Foliofy's Cascade template and AI bullet suggestions helped me reframe my achievements. I landed 4 senior engineering interview calls in my first week!"
  },
  {
    name: "David Chen",
    role: "Product Manager @ Stripe",
    rating: 5,
    text: "The ATS checker was a total game-changer. It pointed out missing keywords and formatted my resume perfectly for corporate scanners."
  },
  {
    name: "Elena Rostova",
    role: "Lead UX Designer @ Canva",
    rating: 5,
    text: "I love being able to switch seamlessly between a PDF resume and a live interactive portfolio website. Super polished and easy to use!"
  }
];

export const ZetyTestimonials = () => {
  return (
    <section style={{ padding: '4rem 2rem', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.75rem' }}>
            Trusted by <span style={{ color: '#0073e6' }}>Job Seekers</span> Everywhere
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Over 20 million users have built their resumes with Foliofy to land top tech & business roles.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {reviews.map((rev, idx) => (
            <div 
              key={idx}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border-color)',
                borderRadius: '16px',
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative',
                boxShadow: '0 4px 15px rgba(0,0,0,0.04)'
              }}
            >
              <div>
                <div style={{ display: 'flex', gap: '0.2rem', marginBottom: '1rem' }}>
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={18} style={{ fill: '#ff9900', color: '#ff9900' }} />
                  ))}
                </div>
                <p style={{ fontSize: '0.925rem', color: 'var(--text-main)', lineHeight: '1.6', fontStyle: 'italic', marginBottom: '1.5rem' }}>
                  "{rev.text}"
                </p>
              </div>

              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
                <div style={{ fontWeight: '800', fontSize: '0.95rem', color: 'var(--text-main)' }}>{rev.name}</div>
                <div style={{ fontSize: '0.825rem', color: '#0073e6', fontWeight: '700', marginTop: '0.2rem' }}>{rev.role}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
