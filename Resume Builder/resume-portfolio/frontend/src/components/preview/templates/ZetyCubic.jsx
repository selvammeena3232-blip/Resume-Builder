import React from 'react';

export const ZetyCubic = ({ data }) => {
  const { personalInfo, experiences, education, skills, projects, customization } = data;
  const themeColor = customization.themeColor || '#06b6d4';

  return (
    <div className="resume-paper theme-cubic" style={{ minHeight: '1050px', padding: '2.5rem', background: '#ffffff', color: '#0f172a' }}>
      {/* Boxed Header */}
      <div style={{ background: themeColor, color: '#ffffff', padding: '2rem', borderRadius: '12px', marginBottom: '2rem', textAlign: 'center' }}>
        {personalInfo.photoUrl && customization.showPhoto !== false && (
          <img 
            src={personalInfo.photoUrl} 
            alt={personalInfo.fullName} 
            style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '3px solid #ffffff', marginBottom: '0.75rem' }}
          />
        )}
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', margin: 0, textTransform: 'uppercase' }}>{personalInfo.fullName || 'FULL NAME'}</h1>
        <p style={{ fontSize: '1.1rem', opacity: 0.95, margin: '0.25rem 0 0.75rem 0', fontWeight: '600' }}>{personalInfo.jobTitle || 'TARGET ROLE'}</p>
        <div style={{ fontSize: '0.85rem', opacity: 0.9, display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
      </div>

      {personalInfo.bio && (
        <section style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1.25rem', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: themeColor, fontWeight: '800', marginBottom: '0.4rem' }}>Executive Summary</h3>
          <p style={{ fontSize: '0.85rem', color: '#334155', lineHeight: '1.6' }}>{personalInfo.bio}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: themeColor, fontWeight: '800', borderBottom: `2px solid ${themeColor}`, paddingBottom: '0.3rem', marginBottom: '0.85rem' }}>
            Work History
          </h3>
          {experiences.map(exp => (
            <div key={exp.id} style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '1rem', marginBottom: '0.85rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold', fontSize: '0.9rem' }}>
                <span>{exp.role} — <span style={{ color: themeColor }}>{exp.company}</span></span>
                <span style={{ fontSize: '0.775rem', color: '#64748b' }}>{exp.startDate} - {exp.endDate}</span>
              </div>
              <p style={{ fontSize: '0.825rem', color: '#475569', marginTop: '0.4rem', lineHeight: '1.5' }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
