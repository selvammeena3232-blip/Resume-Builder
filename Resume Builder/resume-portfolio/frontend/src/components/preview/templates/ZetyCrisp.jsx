import React from 'react';

export const ZetyCrisp = ({ data }) => {
  const { personalInfo, experiences, education, skills, customization } = data;
  const themeColor = customization.themeColor || '#0f172a';

  return (
    <div className="resume-paper theme-crisp" style={{ minHeight: '1050px', padding: '2.5rem', background: '#ffffff', color: '#0f172a' }}>
      <div style={{ borderBottom: `3px solid ${themeColor}`, paddingBottom: '1rem', marginBottom: '1.5rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '2.4rem', fontWeight: '800', letterSpacing: '-0.02em', margin: 0 }}>
          {personalInfo.fullName || 'FULL NAME'}
        </h1>
        <p style={{ fontSize: '1.1rem', color: themeColor, fontWeight: '700', marginTop: '0.2rem' }}>
          {personalInfo.jobTitle || 'TARGET ROLE'}
        </p>
        <div style={{ fontSize: '0.85rem', color: '#475569', marginTop: '0.5rem' }}>
          {personalInfo.email} • {personalInfo.phone} • {personalInfo.location}
        </div>
      </div>

      {personalInfo.bio && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: themeColor, fontWeight: '800', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem', marginBottom: '0.5rem' }}>
            Professional Summary
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: '1.6' }}>{personalInfo.bio}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: themeColor, fontWeight: '800', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.25rem', marginBottom: '0.85rem' }}>
            Experience
          </h3>
          {experiences.map(exp => (
            <div key={exp.id} style={{ marginBottom: '1.1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '0.9rem' }}>
                <span>{exp.role} <span style={{ color: themeColor }}>@ {exp.company}</span></span>
                <span style={{ fontSize: '0.775rem', color: '#64748b' }}>{exp.startDate} - {exp.endDate}</span>
              </div>
              <p style={{ fontSize: '0.825rem', color: '#475569', marginTop: '0.35rem', lineHeight: '1.55' }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
