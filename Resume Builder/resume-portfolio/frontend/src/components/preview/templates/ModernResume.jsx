import React from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin } from 'lucide-react';

export const ModernResume = ({ data }) => {
  const { personalInfo, experiences, education, skills, projects, customization } = data;
  const themeColor = customization.themeColor || '#6366f1';
  const fontFamily = customization.fontFamily || 'Plus Jakarta Sans';

  return (
    <div 
      className="resume-paper theme-modern"
      style={{ 
        fontFamily: fontFamily,
        '--primary-theme-color': themeColor 
      }}
    >
      {/* Header Section */}
      <header style={{ borderBottom: `2px solid ${themeColor}`, paddingBottom: '1.25rem', marginBottom: '1.5rem' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.25rem' }}>
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <p style={{ fontSize: '1.1rem', fontWeight: '600', color: themeColor, marginBottom: '0.75rem' }}>
          {personalInfo.jobTitle || 'Your Title'}
        </p>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.825rem', color: '#475569' }}>
          {personalInfo.email && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Mail size={13} style={{ color: themeColor }} /> {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Phone size={13} style={{ color: themeColor }} /> {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <MapPin size={13} style={{ color: themeColor }} /> {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
              <Globe size={13} style={{ color: themeColor }} /> {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      {/* Summary Bio */}
      {personalInfo.bio && (
        <section style={{ marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: themeColor, marginBottom: '0.5rem', fontWeight: '700' }}>
            Professional Summary
          </h3>
          <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: '1.6' }}>
            {personalInfo.bio}
          </p>
        </section>
      )}

      {/* Grid Layout: Main & Sidebar */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.75rem' }}>
        {/* Main Column */}
        <div>
          {/* Work Experience */}
          {experiences.length > 0 && (
            <section style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: themeColor, marginBottom: '0.75rem', fontWeight: '700' }}>
                Work Experience
              </h3>
              {experiences.map((exp) => (
                <div key={exp.id} style={{ marginBottom: '1.1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{exp.role}</strong>
                    <span style={{ fontSize: '0.775rem', color: '#64748b', fontWeight: '500' }}>
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.825rem', color: themeColor, fontWeight: '600', marginBottom: '0.35rem' }}>
                    {exp.company} {exp.location ? `• ${exp.location}` : ''}
                  </div>
                  <p style={{ fontSize: '0.825rem', color: '#475569', lineHeight: '1.5' }}>
                    {exp.description}
                  </p>
                </div>
              ))}
            </section>
          )}

          {/* Featured Projects */}
          {projects.length > 0 && (
            <section>
              <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: themeColor, marginBottom: '0.75rem', fontWeight: '700' }}>
                Key Projects
              </h3>
              {projects.map((proj) => (
                <div key={proj.id} style={{ marginBottom: '1rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{proj.title}</strong>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" style={{ fontSize: '0.75rem', color: themeColor, textDecoration: 'none' }}>
                        View Link ↗
                      </a>
                    )}
                  </div>
                  <span style={{ fontSize: '0.75rem', color: '#64748b', fontStyle: 'italic', display: 'block', marginBottom: '0.25rem' }}>
                    {proj.technologies}
                  </span>
                  <p style={{ fontSize: '0.825rem', color: '#475569' }}>
                    {proj.description}
                  </p>
                </div>
              ))}
            </section>
          )}
        </div>

        {/* Sidebar Column */}
        <div>
          {/* Education */}
          {education.length > 0 && (
            <section style={{ marginBottom: '1.5rem' }}>
              <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: themeColor, marginBottom: '0.75rem', fontWeight: '700' }}>
                Education
              </h3>
              {education.map((edu) => (
                <div key={edu.id} style={{ marginBottom: '0.85rem' }}>
                  <strong style={{ fontSize: '0.875rem', color: '#0f172a', display: 'block' }}>{edu.degree}</strong>
                  <div style={{ fontSize: '0.8rem', color: '#334155', fontWeight: '500' }}>{edu.school}</div>
                  <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{edu.startDate} - {edu.endDate}</div>
                </div>
              ))}
            </section>
          )}

          {/* Skills */}
          {skills.length > 0 && (
            <section>
              <h3 style={{ fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: themeColor, marginBottom: '0.75rem', fontWeight: '700' }}>
                Skills & Expertise
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {skills.map((sk) => (
                  <span 
                    key={sk.id}
                    style={{
                      background: '#f1f5f9',
                      color: '#334155',
                      borderLeft: `3px solid ${themeColor}`,
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      padding: '0.3rem 0.6rem',
                      borderRadius: '3px'
                    }}
                  >
                    {sk.name}
                  </span>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};
