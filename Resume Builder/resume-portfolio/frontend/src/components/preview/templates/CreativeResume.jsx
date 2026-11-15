import React from 'react';

export const CreativeResume = ({ data }) => {
  const { personalInfo, experiences, education, skills, projects, customization } = data;
  const themeColor = customization.themeColor || '#8b5cf6';
  const fontFamily = customization.fontFamily || 'Outfit';

  return (
    <div 
      className="resume-paper theme-creative"
      style={{ 
        fontFamily: fontFamily,
        '--primary-theme-color': themeColor
      }}
    >
      <div style={{ background: `linear-gradient(135deg, ${themeColor} 0%, #06b6d4 100%)`, padding: '2rem', borderRadius: '8px', color: '#ffffff', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', margin: 0 }}>{personalInfo.fullName || 'Your Name'}</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.9, fontWeight: '500', marginTop: '0.25rem' }}>{personalInfo.jobTitle || 'Creative Professional'}</p>
        <div style={{ display: 'flex', gap: '1.25rem', fontSize: '0.825rem', marginTop: '1rem', opacity: 0.95 }}>
          {personalInfo.email && <span>✉ {personalInfo.email}</span>}
          {personalInfo.phone && <span>📞 {personalInfo.phone}</span>}
          {personalInfo.location && <span>📍 {personalInfo.location}</span>}
        </div>
      </div>

      {personalInfo.bio && (
        <div style={{ marginBottom: '1.75rem', paddingLeft: '1rem', borderLeft: `4px solid ${themeColor}` }}>
          <p style={{ fontStyle: 'italic', color: '#334155', fontSize: '0.9rem' }}>{personalInfo.bio}</p>
        </div>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section style={{ marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: themeColor, marginBottom: '1rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem' }}>
            Work History
          </h2>
          {experiences.map(exp => (
            <div key={exp.id} style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <strong style={{ fontSize: '1rem', color: '#0f172a' }}>{exp.role}</strong>
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{exp.startDate} - {exp.endDate}</span>
              </div>
              <div style={{ fontSize: '0.85rem', color: themeColor, fontWeight: '600' }}>{exp.company}</div>
              <p style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.35rem' }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}

      {/* Skills Pill Cloud */}
      {skills.length > 0 && (
        <section style={{ marginBottom: '1.75rem' }}>
          <h2 style={{ fontSize: '1.1rem', color: themeColor, marginBottom: '0.75rem' }}>Skills & Strengths</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {skills.map(sk => (
              <span key={sk.id} style={{ background: themeColor + '15', color: themeColor, padding: '0.4rem 0.8rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600' }}>
                {sk.name} ({sk.level})
              </span>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
