import React from 'react';
import { ShieldCheck, Sparkles, Eye, Sliders, ArrowRight, Download, Globe, CheckCircle2 } from 'lucide-react';
import { useResume } from '../../context/ResumeContext';

const features = [
  {
    icon: <ShieldCheck size={26} style={{ color: '#10b981' }} />,
    title: '100% ATS-Compliant Templates',
    description: 'Guaranteed to pass Applicant Tracking Systems (ATS). Our templates use single-column layouts and clean fonts so resume parsers read your content flawlessly.'
  },
  {
    icon: <Sparkles size={26} style={{ color: '#0073e6' }} />,
    title: 'AI Action Verb & Summary Helper',
    description: 'Overcome writer’s block with pre-written, HR-approved bullet points for engineers, product leaders, designers, and marketers.'
  },
  {
    icon: <Globe size={26} style={{ color: '#8b5cf6' }} />,
    title: 'Interactive Portfolio Website',
    description: 'Transform your resume into a live personal portfolio website with 1-click. Share a public digital link or export responsive web HTML.'
  },
  {
    icon: <Sliders size={26} style={{ color: '#f59e0b' }} />,
    title: 'Fine-Tuned Spacing & Typography',
    description: 'Custom font choices (Inter, Outfit, Fira Code, Playfair), color wheels, line spacing, margins, and custom section re-ordering.'
  }
];

export const ZetyFeaturesGrid = () => {
  const { setViewMode } = useResume();

  return (
    <section style={{ padding: '4.5rem 2rem', background: 'var(--bg-primary)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '3.5rem' }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            Built for Modern Job Seekers & Professionals
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto', lineHeight: '1.6' }}>
            Everything you need to showcase your skills, land 3x more interview callbacks, and impress hiring teams.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.75rem' }}>
          {features.map((f, idx) => (
            <div 
              key={idx}
              style={{
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-color)',
                borderRadius: 'var(--radius-lg)',
                padding: '2rem 1.75rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                boxShadow: 'var(--glass-shadow)',
                transition: 'var(--transition-smooth)'
              }}
            >
              <div style={{ background: 'rgba(0, 115, 230, 0.08)', width: '52px', height: '52px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {f.icon}
              </div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: '800', color: 'var(--text-main)' }}>
                {f.title}
              </h3>
              <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                {f.description}
              </p>
            </div>
          ))}
        </div>


      </div>
    </section>
  );
};
