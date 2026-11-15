import React from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Award, Languages, BookOpen } from 'lucide-react';

export const ZetyCascade = ({ data }) => {
  const { personalInfo, experiences, education, skills, projects, certifications = [], languages = [], customization } = data;
  const themeColor = customization.themeColor || '#6366f1';
  const fontFamily = customization.fontFamily || 'Plus Jakarta Sans';

  const renderSkillBar = (level) => {
    let widthPercent = '80%';
    if (level === 'Beginner') widthPercent = '40%';
    if (level === 'Intermediate') widthPercent = '65%';
    if (level === 'Advanced') widthPercent = '85%';
    if (level === 'Expert') widthPercent = '100%';

    return (
      <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.2)', borderRadius: '3px', marginTop: '4px', overflow: 'hidden' }}>
        <div style={{ width: widthPercent, height: '100%', background: '#ffffff', borderRadius: '3px' }} />
      </div>
    );
  };

  return (
    <div 
      className="resume-paper theme-cascade"
      style={{ 
        fontFamily: fontFamily,
        display: 'grid',
        gridTemplateColumns: '260px 1fr',
        minHeight: '1050px',
        padding: 0,
        overflow: 'hidden',
        boxShadow: 'var(--glass-shadow)'
      }}
    >
      {/* Sidebar (Left Column) */}
      <aside style={{ background: themeColor, color: '#ffffff', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
        {/* Profile Avatar */}
        {personalInfo.photoUrl && customization.showPhoto !== false && (
          <div style={{ textAlign: 'center' }}>
            <img 
              src={personalInfo.photoUrl} 
              alt={personalInfo.fullName} 
              style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '4px solid rgba(255,255,255,0.3)', boxShadow: '0 8px 16px rgba(0,0,0,0.2)' }}
            />
          </div>
        )}

        {/* Contact Info */}
        <div>
          <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '0.4rem', marginBottom: '0.85rem' }}>
            Contact
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', fontSize: '0.8rem', opacity: 0.95 }}>
            {personalInfo.email && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', wordBreak: 'break-all' }}><Mail size={14} /> {personalInfo.email}</div>}
            {personalInfo.phone && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><Phone size={14} /> {personalInfo.phone}</div>}
            {personalInfo.location && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}><MapPin size={14} /> {personalInfo.location}</div>}
            {personalInfo.website && <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', wordBreak: 'break-all' }}><Globe size={14} /> {personalInfo.website}</div>}
          </div>
        </div>

        {/* Skills with Progress Bars */}
        {skills.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '0.4rem', marginBottom: '0.85rem' }}>
              Skills
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {skills.map((sk) => (
                <div key={sk.id}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: '600' }}>
                    <span>{sk.name}</span>
                    <span style={{ fontSize: '0.7rem', opacity: 0.8 }}>{sk.level}</span>
                  </div>
                  {renderSkillBar(sk.level)}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Languages */}
        {languages.length > 0 && (
          <div>
            <h3 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: '800', borderBottom: '1px solid rgba(255,255,255,0.25)', paddingBottom: '0.4rem', marginBottom: '0.85rem' }}>
              Languages
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', fontSize: '0.8rem' }}>
              {languages.map((l) => (
                <div key={l.id} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontWeight: '600' }}>{l.name}</span>
                  <span style={{ opacity: 0.85, fontSize: '0.75rem' }}>{l.level}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content Area (Right Column) */}
      <main style={{ padding: '2.5rem', background: '#ffffff', color: '#1e293b' }}>
        {/* Name & Title Header */}
        <header style={{ marginBottom: '1.75rem' }}>
          <h1 style={{ fontSize: '2.25rem', fontWeight: '900', color: '#0f172a', margin: 0, textTransform: 'uppercase', letterSpacing: '-0.02em' }}>
            {personalInfo.fullName || 'Alex Morgan'}
          </h1>
          <p style={{ fontSize: '1.15rem', color: themeColor, fontWeight: '700', margin: '0.25rem 0 0 0' }}>
            {personalInfo.jobTitle || 'Senior Full Stack Engineer'}
          </p>
        </header>

        {/* Summary */}
        {personalInfo.bio && (
          <section style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: themeColor, fontWeight: '800', borderBottom: `2px solid ${themeColor}`, paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
              Profile Summary
            </h3>
            <p style={{ fontSize: '0.875rem', color: '#334155', lineHeight: '1.65' }}>
              {personalInfo.bio}
            </p>
          </section>
        )}

        {/* Work Experience */}
        {experiences.length > 0 && (
          <section style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: themeColor, fontWeight: '800', borderBottom: `2px solid ${themeColor}`, paddingBottom: '0.35rem', marginBottom: '0.85rem' }}>
              Work Experience
            </h3>
            {experiences.map((exp) => (
              <div key={exp.id} style={{ marginBottom: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <strong style={{ fontSize: '0.95rem', color: '#0f172a' }}>{exp.role}</strong>
                  <span style={{ fontSize: '0.8rem', color: '#64748b', fontWeight: '600' }}>
                    {exp.startDate} - {exp.endDate}
                  </span>
                </div>
                <div style={{ fontSize: '0.85rem', color: themeColor, fontWeight: '700', marginBottom: '0.4rem' }}>
                  {exp.company} {exp.location ? `• ${exp.location}` : ''}
                </div>
                <p style={{ fontSize: '0.835rem', color: '#475569', lineHeight: '1.6', whiteSpace: 'pre-line' }}>
                  {exp.description}
                </p>
              </div>
            ))}
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section style={{ marginBottom: '1.75rem' }}>
            <h3 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: themeColor, fontWeight: '800', borderBottom: `2px solid ${themeColor}`, paddingBottom: '0.35rem', marginBottom: '0.85rem' }}>
              Education
            </h3>
            {education.map((edu) => (
              <div key={edu.id} style={{ marginBottom: '1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <strong style={{ fontSize: '0.9rem', color: '#0f172a' }}>{edu.degree}</strong>
                  <span style={{ fontSize: '0.8rem', color: '#64748b' }}>{edu.startDate} - {edu.endDate}</span>
                </div>
                <div style={{ fontSize: '0.825rem', color: '#334155', fontWeight: '600' }}>{edu.school}</div>
              </div>
            ))}
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '0.95rem', textTransform: 'uppercase', letterSpacing: '0.08em', color: themeColor, fontWeight: '800', borderBottom: `2px solid ${themeColor}`, paddingBottom: '0.35rem', marginBottom: '0.75rem' }}>
              Certifications & Licenses
            </h3>
            {certifications.map((c) => (
              <div key={c.id} style={{ marginBottom: '0.5rem', fontSize: '0.85rem' }}>
                <strong style={{ color: '#0f172a' }}>{c.title}</strong> — <span style={{ color: '#475569' }}>{c.issuer} ({c.date})</span>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
};
