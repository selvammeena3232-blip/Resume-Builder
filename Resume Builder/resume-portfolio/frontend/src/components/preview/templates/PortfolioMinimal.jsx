import React, { useState } from 'react';
import { Mail, MapPin, ExternalLink, Send, CheckCircle2 } from 'lucide-react';

export const PortfolioMinimal = ({ data }) => {
  const { personalInfo, experiences, skills, projects, customization } = data;
  const accent = customization.themeColor || '#0073e6';
  const [sent, setSent] = useState(false);
  const [msg, setMsg] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (msg.name && msg.email) {
      setSent(true);
      setTimeout(() => setSent(false), 4000);
      setMsg({ name: '', email: '', message: '' });
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '1000px', background: '#ffffff', color: '#1e293b', borderRadius: '16px', border: '1px solid #e2e8f0', overflow: 'hidden', boxShadow: '0 10px 40px rgba(0,0,0,0.08)' }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderBottom: '1px solid #e2e8f0', background: '#fff' }}>
        <div style={{ fontWeight: '900', fontSize: '1.1rem', color: accent }}>
          {personalInfo.fullName?.split(' ')[0] || 'Portfolio'}<span style={{ color: '#1e293b' }}>.</span>
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.85rem', fontWeight: '600', color: '#64748b' }}>
          {['About', 'Skills', 'Projects', 'Contact'].map(s => (
            <a key={s} href={`#min-${s.toLowerCase()}`} style={{ color: 'inherit', textDecoration: 'none' }}>{s}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <header id="min-about" style={{ padding: '4rem 2rem', display: 'flex', alignItems: 'center', gap: '3rem', borderBottom: '1px solid #e2e8f0' }}>
        {personalInfo.photoUrl && (
          <img src={personalInfo.photoUrl} alt={personalInfo.fullName} style={{ width: '110px', height: '110px', borderRadius: '50%', objectFit: 'cover', border: `3px solid ${accent}`, flexShrink: 0 }} />
        )}
        <div>
          <p style={{ fontSize: '0.85rem', fontWeight: '700', color: accent, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>Available for work</p>
          <h1 style={{ fontSize: '2.5rem', fontWeight: '900', color: '#0f172a', lineHeight: '1.15', marginBottom: '0.5rem' }}>{personalInfo.fullName || 'Your Name'}</h1>
          <p style={{ fontSize: '1.1rem', color: '#64748b', marginBottom: '1rem' }}>{personalInfo.jobTitle || 'Your Title'}</p>
          {personalInfo.bio && <p style={{ fontSize: '0.9rem', color: '#475569', lineHeight: '1.7', maxWidth: '560px' }}>{personalInfo.bio}</p>}
          <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            <a href="#min-contact" style={{ background: accent, color: '#fff', padding: '0.6rem 1.25rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
              <Send size={14} /> Contact Me
            </a>
            <a href="#min-projects" style={{ background: '#f1f5f9', color: '#1e293b', padding: '0.6rem 1.25rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '700', fontSize: '0.875rem' }}>
              View Projects
            </a>
          </div>
        </div>
      </header>

      {/* Skills */}
      {skills.length > 0 && (
        <section id="min-skills" style={{ padding: '2.5rem 2rem', borderBottom: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.25rem' }}>Skills</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
            {skills.map(sk => (
              <span key={sk.id} style={{ background: accent + '12', color: accent, border: `1px solid ${accent}30`, padding: '0.35rem 0.85rem', borderRadius: '20px', fontSize: '0.82rem', fontWeight: '700' }}>
                {sk.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section id="min-projects" style={{ padding: '2.5rem 2rem', borderBottom: '1px solid #e2e8f0', background: '#f8fafc' }}>
          <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '1.25rem' }}>Projects</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
            {projects.map(proj => (
              <div key={proj.id} style={{ background: '#fff', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '1.25rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '800', color: '#0f172a' }}>{proj.title}</h3>
                  {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" style={{ color: accent }}><ExternalLink size={16} /></a>}
                </div>
                <p style={{ fontSize: '0.83rem', color: '#64748b', lineHeight: '1.5', marginBottom: '0.75rem' }}>{proj.description}</p>
                <span style={{ fontSize: '0.75rem', color: accent, fontWeight: '700', background: accent + '12', padding: '0.25rem 0.6rem', borderRadius: '4px' }}>{proj.technologies}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="min-contact" style={{ padding: '2.5rem 2rem' }}>
        <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.4rem' }}>Get In Touch</h2>
        <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Let's work together or just say hello.</p>
        {sent ? (
          <div style={{ background: '#f0fdf4', border: '1px solid #10b981', color: '#10b981', padding: '1rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={18} /> Message sent!
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ maxWidth: '480px', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input type="text" placeholder="Your Name" required className="form-input" value={msg.name} onChange={e => setMsg({ ...msg, name: e.target.value })} />
            <input type="email" placeholder="Your Email" required className="form-input" value={msg.email} onChange={e => setMsg({ ...msg, email: e.target.value })} />
            <textarea rows={3} placeholder="Your Message" required className="form-textarea" value={msg.message} onChange={e => setMsg({ ...msg, message: e.target.value })} />
            <button type="submit" style={{ background: accent, color: '#fff', padding: '0.7rem', borderRadius: '8px', border: 'none', fontWeight: '700', cursor: 'pointer' }}>Send Message</button>
          </form>
        )}
      </section>

      <footer style={{ textAlign: 'center', padding: '1.25rem', borderTop: '1px solid #e2e8f0', fontSize: '0.78rem', color: '#94a3b8' }}>
        © {new Date().getFullYear()} {personalInfo.fullName || 'Portfolio'}. Built with Foliofy.
      </footer>
    </div>
  );
};
