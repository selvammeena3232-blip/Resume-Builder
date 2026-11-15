import React, { useRef, useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { importFromJSON } from '../../utils/exportHelpers';
import { presetSoftwareEngineer, presetProductManager, presetUXDesigner } from '../../data/sampleData';
import { ArrowRight, Mail, Phone, MapPin } from 'lucide-react';

const presetMap = {
  engineer: presetSoftwareEngineer,
  product: presetProductManager,
  ux: presetUXDesigner,
};

const ResumePreviewCard = ({ preset }) => {
  const data = presetMap[preset];
  const { personalInfo, experiences, education, skills } = data;
  const color = data.customization?.themeColor || '#1e40af';

  return (
    <div style={{
      maxWidth: '420px',
      margin: '0 auto',
      background: '#ffffff',
      borderRadius: '14px',
      boxShadow: '0 8px 40px rgba(0,0,0,0.13)',
      overflow: 'hidden',
      textAlign: 'left',
      fontSize: '0.68rem',
      color: '#1e293b',
      border: '1px solid #e2e8f0',
    }}>
      {/* Header with photo */}
      <div style={{ background: color, padding: '0.85rem 1.25rem', color: '#fff', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
        {personalInfo.photoUrl ? (
          <img
            src={personalInfo.photoUrl}
            alt={personalInfo.fullName}
            style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid rgba(255,255,255,0.6)', flexShrink: 0 }}
          />
        ) : (
          <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.8rem', fontWeight: '900', flexShrink: 0 }}>
            {personalInfo.fullName?.charAt(0)}
          </div>
        )}
        <div>
          <div style={{ fontSize: '1.35rem', fontWeight: '900', letterSpacing: '-0.02em' }}>{personalInfo.fullName}</div>
          <div style={{ fontSize: '0.85rem', opacity: 0.9, marginTop: '0.2rem', fontWeight: '600' }}>{personalInfo.jobTitle}</div>
          <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', opacity: 0.85, fontSize: '0.72rem' }}><Mail size={11} />{personalInfo.email}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', opacity: 0.85, fontSize: '0.72rem' }}><Phone size={11} />{personalInfo.phone}</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', opacity: 0.85, fontSize: '0.72rem' }}><MapPin size={11} />{personalInfo.location}</span>
          </div>
        </div>
      </div>

      <div style={{ padding: '1rem 1.25rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {/* Left column */}
        <div>
          {/* Summary */}
          <div style={{ marginBottom: '1.2rem' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: color, borderBottom: `2px solid ${color}`, paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>Summary</div>
            <p style={{ color: '#475569', lineHeight: '1.6' }}>{personalInfo.bio?.slice(0, 180)}...</p>
          </div>

          {/* Experience */}
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: color, borderBottom: `2px solid ${color}`, paddingBottom: '0.25rem', marginBottom: '0.6rem' }}>Experience</div>
            {experiences?.slice(0, 2).map(exp => (
              <div key={exp.id} style={{ marginBottom: '0.85rem' }}>
                <div style={{ fontWeight: '800', fontSize: '0.8rem' }}>{exp.role}</div>
                <div style={{ color: color, fontWeight: '700', fontSize: '0.73rem' }}>{exp.company}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.68rem', marginBottom: '0.25rem' }}>{exp.startDate} – {exp.endDate}</div>
                <div style={{ color: '#475569', lineHeight: '1.5' }}>{exp.description?.split('\n')[0]}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right column */}
        <div>
          {/* Skills */}
          <div style={{ marginBottom: '1.2rem' }}>
            <div style={{ fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: color, borderBottom: `2px solid ${color}`, paddingBottom: '0.25rem', marginBottom: '0.6rem' }}>Skills</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {skills?.slice(0, 6).map(sk => (
                <span key={sk.id} style={{ background: `${color}18`, color: color, border: `1px solid ${color}35`, borderRadius: '20px', padding: '0.2rem 0.6rem', fontWeight: '700', fontSize: '0.68rem' }}>{sk.name}</span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <div style={{ fontSize: '0.68rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.08em', color: color, borderBottom: `2px solid ${color}`, paddingBottom: '0.25rem', marginBottom: '0.6rem' }}>Education</div>
            {education?.slice(0, 1).map(edu => (
              <div key={edu.id}>
                <div style={{ fontWeight: '800', fontSize: '0.8rem' }}>{edu.degree}</div>
                <div style={{ color: color, fontWeight: '700', fontSize: '0.73rem' }}>{edu.school}</div>
                <div style={{ color: '#94a3b8', fontSize: '0.68rem' }}>{edu.startDate} – {edu.endDate}</div>
                <div style={{ color: '#475569', lineHeight: '1.5', marginTop: '0.25rem' }}>{edu.description?.slice(0, 100)}...</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const ZetyLandingHero = () => {
  const { setViewMode, handleImportData } = useResume();
  const fileInputRef = useRef(null);
  const [activeHeroPreset, setActiveHeroPreset] = useState('engineer');

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      importFromJSON(
        file,
        (data) => { handleImportData(data); setViewMode('builder'); },
        (errMessage) => alert(errMessage)
      );
    }
  };

  return (
    <section style={{ padding: '1.75rem 1.5rem 4rem 1.5rem', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden' }}>
      <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".json" onChange={handleFileUpload} />

      {/* Decorative glow */}
      <div style={{ position: 'absolute', top: '-100px', left: '50%', transform: 'translateX(-50%)', width: '700px', height: '400px', background: 'radial-gradient(circle, rgba(0,115,230,0.15) 0%, rgba(139,92,246,0.08) 50%, transparent 70%)', pointerEvents: 'none', borderRadius: '50%' }} />

      <div style={{ maxWidth: '1050px', margin: '0 auto', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        <h1 style={{ fontSize: '3.25rem', fontWeight: '900', color: 'var(--text-main)', lineHeight: '1.15', marginBottom: '1rem', letterSpacing: '-0.03em' }}>
          Create Your <span style={{ color: '#0073e6' }}>Resume</span> or <span style={{ color: '#059669' }}>Web Portfolio</span>
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--text-muted)', maxWidth: '750px', margin: '0 auto 2.5rem auto', lineHeight: '1.65' }}>
          Select your desired workspace below to get started or log in to your account.
        </p>

        {/* Get Started button */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
          <button
            onClick={() => setViewMode('choice')}
            className="btn btn-primary"
            style={{ fontSize: '1.05rem', padding: '0.9rem 2.25rem', borderRadius: '30px', fontWeight: '800' }}
          >
            Get Started <ArrowRight size={18} />
          </button>
        </div>

        {/* Preset selector */}
        <div style={{ marginBottom: '1.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'var(--text-subtle)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
            Preview Sample Profiles:
          </span>
          {[
            { key: 'engineer', label: 'Software Engineer' },
            { key: 'product',  label: 'Product Manager' },
            { key: 'ux',       label: 'UX Designer' },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setActiveHeroPreset(key)}
              style={{
                padding: '0.35rem 0.85rem',
                fontSize: '0.8rem',
                fontWeight: '700',
                borderRadius: '20px',
                border: activeHeroPreset === key ? '1.5px solid var(--zety-blue)' : '1.5px solid var(--border-color)',
                background: activeHeroPreset === key ? 'rgba(0,115,230,0.08)' : 'transparent',
                color: activeHeroPreset === key ? 'var(--zety-blue)' : 'var(--text-muted)',
                cursor: 'pointer',
              }}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Resume Preview Card */}
        <ResumePreviewCard preset={activeHeroPreset} />
      </div>
    </section>
  );
};
