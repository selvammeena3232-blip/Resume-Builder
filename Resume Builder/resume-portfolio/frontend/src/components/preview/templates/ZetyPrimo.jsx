import React from 'react';
import { Mail, Phone, MapPin, Globe } from 'lucide-react';

export const ZetyPrimo = ({ data }) => {
  const { personalInfo, experiences, education, skills, projects, certifications = [], customization } = data;
  const themeColor = customization.themeColor || '#6366f1';
  const fontFamily = customization.fontFamily || 'Outfit';

  return (
    <div 
      className="resume-paper theme-primo"
      style={{ 
        fontFamily: fontFamily,
        minHeight: '1050px',
        padding: '2.5rem',
        background: '#ffffff',
        color: '#1e293b',
        boxShadow: 'var(--glass-shadow)'
      }}
    >
      {/* Top Banner Header */}
      <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', background: '#f8fafc', padding: '1.5rem', borderRadius: '12px', borderLeft: `6px solid ${themeColor}`, marginBottom: '2rem' }}>
        {personalInfo.photoUrl && customization.showPhoto !== false && (
          <img 
            src={personalInfo.photoUrl} 
            alt={personalInfo.fullName} 
            style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${themeColor}` }}
          />
        )}
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: '#0f172a', margin: 0 }}>
            {personalInfo.fullName || 'Your Full Name'}
          </h1>
          <p style={{ fontSize: '1.1rem', fontWeight: '600', color: themeColor, margin: '0.2rem 0 0.6rem 0' }}>
            {personalInfo.jobTitle || 'Target Professional Role'}
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.8rem', color: '#64748b' }}>
            {personalInfo.email && <span>✉ {personalInfo.email}</span>}
            {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
            {personalInfo.location && <span>📍 {personalInfo.location}</span>}
          </div>
        </div>
      </div>

      {/* Summary */}
      {personalInfo.bio && (
        <section style={{ marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: themeColor, fontWeight: '800', marginBottom: '0.5rem' }}>
            Professional Overview
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: '1.65' }}>{personalInfo.bio}</p>
        </section>
      )}

      {/* Experience Timeline */}
      {experiences.length > 0 && (
        <section style={{ marginBottom: '1.75rem' }}>
          <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: themeColor, fontWeight: '800', marginBottom: '1rem' }}>
            Work History Timeline
          </h3>
          <div style={{ borderLeft: `2px solid ${themeColor}30`, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {experiences.map((exp) => (
              <div key={exp.id} style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '-1.65rem', top: '4px', width: '10px', height: '10px', borderRadius: '50%', background: themeColor }} />
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{exp.role}</strong>
                  <span style={{ fontSize: '0.775rem', color: '#64748b', fontWeight: '600' }}>{exp.startDate} - {exp.endDate}</span>
                </div>
                <div style={{ fontSize: '0.825rem', color: themeColor, fontWeight: '600', marginBottom: '0.35rem' }}>{exp.company}</div>
                <p style={{ fontSize: '0.825rem', color: '#475569', lineHeight: '1.55' }}>{exp.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills Grid */}
      {skills.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: themeColor, fontWeight: '800', marginBottom: '0.75rem' }}>
            Skills & Competencies
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {skills.map((sk) => (
              <span key={sk.id} style={{ background: '#f1f5f9', color: '#1e293b', border: `1px solid ${themeColor}30`, padding: '0.35rem 0.75rem', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600' }}>
                {sk.name}
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
