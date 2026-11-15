import React from 'react';

export const ExecutiveResume = ({ data }) => {
  const { personalInfo, experiences, education, skills, projects } = data;

  return (
    <div className="resume-paper theme-executive" style={{ fontFamily: 'Georgia, serif' }}>
      <div style={{ textAlign: 'center', borderBottom: '2px solid #0f172a', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2.4rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#0f172a', margin: 0 }}>
          {personalInfo.fullName || 'FULL NAME'}
        </h1>
        <p style={{ fontSize: '1rem', fontStyle: 'italic', color: '#475569', marginTop: '0.25rem' }}>
          {personalInfo.jobTitle || 'Executive Position Title'}
        </p>
        <div style={{ fontSize: '0.85rem', color: '#334155', marginTop: '0.5rem' }}>
          {personalInfo.email} | {personalInfo.phone} | {personalInfo.location}
        </div>
      </div>

      {personalInfo.bio && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.2rem', marginBottom: '0.5rem' }}>
            Executive Overview
          </h3>
          <p style={{ fontSize: '0.875rem', lineHeight: '1.6', color: '#1e293b' }}>{personalInfo.bio}</p>
        </section>
      )}

      {experiences.length > 0 && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1rem', textTransform: 'uppercase', borderBottom: '1px solid #cbd5e1', paddingBottom: '0.2rem', marginBottom: '0.75rem' }}>
            Professional Background
          </h3>
          {experiences.map(exp => (
            <div key={exp.id} style={{ marginBottom: '1.1rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 'bold' }}>
                <span>{exp.company} — {exp.role}</span>
                <span style={{ fontSize: '0.825rem' }}>{exp.startDate} – {exp.endDate}</span>
              </div>
              <p style={{ fontSize: '0.85rem', marginTop: '0.25rem', color: '#334155' }}>{exp.description}</p>
            </div>
          ))}
        </section>
      )}
    </div>
  );
};
