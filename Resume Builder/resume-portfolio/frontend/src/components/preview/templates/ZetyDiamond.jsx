import React from 'react';

export const ZetyDiamond = ({ data }) => {
  const { personalInfo, experiences, education, skills, projects, customization } = data;
  const themeColor = customization.themeColor || '#0284c7';
  const fontFamily = customization.fontFamily || 'Inter';

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
      {/* Diamond Header */}
      <div style={{ background: '#0f172a', color: '#ffffff', padding: '2rem', borderRadius: '16px', borderLeft: `8px solid ${themeColor}`, marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2.2rem', fontWeight: '900', margin: 0, letterSpacing: '-0.02em', color: '#ffffff' }}>
            {personalInfo.fullName || 'YOUR NAME'}
          </h1>
          <div style={{ fontSize: '1.05rem', color: themeColor, fontWeight: '700', marginTop: '0.25rem' }}>
            {personalInfo.jobTitle || 'Professional Title'}
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: '0.8rem', opacity: 0.9, lineHeight: '1.6' }}>
          {personalInfo.email && <div>✉ {personalInfo.email}</div>}
          {personalInfo.phone && <div>📞 {personalInfo.phone}</div>}
          {personalInfo.location && <div>📍 {personalInfo.location}</div>}
        </div>
      </div>

      {personalInfo.bio && (
        <div style={{ marginBottom: '2rem', padding: '1rem 1.25rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '0.9rem', color: '#334155', fontStyle: 'italic' }}>
          "{personalInfo.bio}"
        </div>
      )}

      {/* Grid Body */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
        <div>
          {/* Work Experience */}
          {experiences.length > 0 && (
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', color: themeColor, borderBottom: `2px solid ${themeColor}`, paddingBottom: '0.4rem', marginBottom: '1.25rem' }}>
                Work History
              </h2>
              {experiences.map(exp => (
                <div key={exp.id} style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{exp.role}</strong>
                    <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#64748b' }}>{exp.startDate} – {exp.endDate}</span>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: themeColor, fontWeight: '700', marginBottom: '0.35rem' }}>{exp.company}</div>
                  <p style={{ fontSize: '0.85rem', color: '#475569', margin: 0, lineHeight: '1.5', whiteSpace: 'pre-line' }}>{exp.description}</p>
                </div>
              ))}
            </section>
          )}

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', color: themeColor, borderBottom: `2px solid ${themeColor}`, paddingBottom: '0.4rem', marginBottom: '1.25rem' }}>
                Key Projects
              </h2>
              {projects.map(proj => (
                <div key={proj.id} style={{ marginBottom: '1rem' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{proj.title}</strong>
                  <p style={{ fontSize: '0.825rem', color: '#475569', margin: '0.25rem 0' }}>{proj.description}</p>
                </div>
              ))}
            </section>
          )}
        </div>

        <div>
          {/* Skills Badges */}
          {skills.length > 0 && (
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', color: themeColor, borderBottom: `2px solid ${themeColor}`, paddingBottom: '0.4rem', marginBottom: '1.25rem' }}>
                Skills Matrix
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {skills.map(sk => (
                  <div key={sk.id} style={{ background: '#f1f5f9', padding: '0.5rem 0.75rem', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.825rem', fontWeight: '700', color: '#1e293b' }}>{sk.name}</span>
                    <span style={{ fontSize: '0.7rem', color: themeColor, fontWeight: '800' }}>{sk.level}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Education */}
          {education.length > 0 && (
            <section style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1rem', fontWeight: '800', textTransform: 'uppercase', color: themeColor, borderBottom: `2px solid ${themeColor}`, paddingBottom: '0.4rem', marginBottom: '1.25rem' }}>
                Education
              </h2>
              {education.map(edu => (
                <div key={edu.id} style={{ marginBottom: '1rem' }}>
                  <strong style={{ fontSize: '0.85rem', color: '#0f172a', display: 'block' }}>{edu.degree}</strong>
                  <div style={{ fontSize: '0.8rem', color: '#475569' }}>{edu.school}</div>
                  <div style={{ fontSize: '0.75rem', color: '#94a3b8' }}>{edu.gradYear}</div>
                </div>
              ))}
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
