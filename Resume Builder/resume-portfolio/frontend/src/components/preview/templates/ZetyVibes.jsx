import React from 'react';

export const ZetyVibes = ({ data }) => {
  const { personalInfo, experiences, education, skills, projects, customization } = data;
  const themeColor = customization.themeColor || '#e11d48';
  const fontFamily = customization.fontFamily || 'Poppins';

  return (
    <div 
      className="resume-paper"
      style={{ 
        fontFamily: fontFamily,
        background: '#ffffff',
        color: '#0f172a',
        padding: '2.5rem'
      }}
    >
      {/* Creative Header */}
      <div style={{ background: `linear-gradient(135deg, ${themeColor} 0%, #7d2ae8 100%)`, color: '#ffffff', padding: '2.25rem', borderRadius: '20px', marginBottom: '2rem', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: '900', margin: 0, letterSpacing: '-0.02em', color: '#ffffff' }}>
          {personalInfo.fullName || 'YOUR NAME'}
        </h1>
        <div style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.9)', fontWeight: '600', marginTop: '0.25rem' }}>
          ✨ {personalInfo.jobTitle || 'Creative Specialist'}
        </div>
        <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap', fontSize: '0.825rem', marginTop: '1.25rem', background: 'rgba(0,0,0,0.15)', padding: '0.6rem 1rem', borderRadius: '12px' }}>
          {personalInfo.email && <span>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
        </div>
      </div>

      {personalInfo.bio && (
        <div style={{ marginBottom: '2rem', paddingLeft: '1.25rem', borderLeft: `4px solid ${themeColor}`, fontSize: '0.9rem', color: '#334155', fontStyle: 'italic', lineHeight: '1.6' }}>
          {personalInfo.bio}
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '800', textTransform: 'uppercase', color: themeColor, marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>💼</span> Work Experience
          </h2>
          {experiences.map(exp => (
            <div key={exp.id} style={{ marginBottom: '1.5rem', background: '#f8fafc', padding: '1.25rem', borderRadius: '14px', border: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <strong style={{ fontSize: '1rem', color: '#0f172a' }}>{exp.role}</strong>
                <span style={{ fontSize: '0.75rem', fontWeight: '800', background: themeColor + '15', color: themeColor, padding: '0.2rem 0.6rem', borderRadius: '20px' }}>
                  {exp.startDate} – {exp.endDate}
                </span>
              </div>
              <div style={{ fontSize: '0.85rem', color: themeColor, fontWeight: '700', marginBottom: '0.5rem' }}>{exp.company}</div>
              <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0, lineHeight: '1.5', whiteSpace: 'pre-line' }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills Matrix Pill Cloud */}
      {skills.length > 0 && (
        <section style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '800', textTransform: 'uppercase', color: themeColor, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>⚡</span> Core Competencies
          </h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {skills.map(sk => (
              <span key={sk.id} style={{ background: `linear-gradient(135deg, ${themeColor}15 0%, #7d2ae815 100%)`, border: `1px solid ${themeColor}30`, color: themeColor, padding: '0.45rem 0.9rem', borderRadius: '20px', fontSize: '0.825rem', fontWeight: '700' }}>
                {sk.name} • <small style={{ opacity: 0.8 }}>{sk.level}</small>
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h2 style={{ fontSize: '1.1rem', fontWeight: '800', textTransform: 'uppercase', color: themeColor, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>🎓</span> Education & Academic Background
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
            {education.map(edu => (
              <div key={edu.id} style={{ background: '#f8fafc', padding: '1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <strong style={{ fontSize: '0.9rem', color: '#0f172a', display: 'block' }}>{edu.degree}</strong>
                <div style={{ fontSize: '0.825rem', color: themeColor, fontWeight: '600' }}>{edu.school}</div>
                <div style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '0.2rem' }}>{edu.gradYear}</div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
