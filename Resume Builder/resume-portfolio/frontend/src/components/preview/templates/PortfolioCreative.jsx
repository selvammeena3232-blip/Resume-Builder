import React, { useState } from 'react';
import { ExternalLink, Send, CheckCircle2, Zap } from 'lucide-react';

export const PortfolioCreative = ({ data }) => {
  const { personalInfo, skills, projects, experiences, customization } = data;
  const accent = customization.themeColor || '#8b5cf6';
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
    <div style={{ width: '100%', maxWidth: '1000px', background: '#0a0a0f', color: '#f1f5f9', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 25px 60px rgba(0,0,0,0.6)' }}>
      {/* Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ fontWeight: '900', fontSize: '1.1rem', background: `linear-gradient(135deg, ${accent}, #00c4cc)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
          {personalInfo.fullName?.split(' ')[0] || 'Creative'}.dev
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.82rem', fontWeight: '600', color: '#94a3b8' }}>
          {['About', 'Skills', 'Work', 'Contact'].map(s => (
            <a key={s} href={`#cr-${s.toLowerCase()}`} style={{ color: 'inherit', textDecoration: 'none' }}>{s}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <header id="cr-about" style={{ padding: '5rem 2rem 4rem', textAlign: 'center', background: `radial-gradient(ellipse at 50% 0%, ${accent}30 0%, transparent 65%)`, borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: accent + '20', border: `1px solid ${accent}40`, color: accent, padding: '0.35rem 1rem', borderRadius: '20px', fontSize: '0.78rem', fontWeight: '700', marginBottom: '1.5rem', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          <Zap size={12} /> Open to Opportunities
        </div>
        <h1 style={{ fontSize: '3rem', fontWeight: '900', lineHeight: '1.1', marginBottom: '0.75rem' }}>
          Hi, I'm <span style={{ background: `linear-gradient(135deg, ${accent}, #00c4cc)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>{personalInfo.fullName || 'Your Name'}</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: '#94a3b8', marginBottom: '1.25rem' }}>{personalInfo.jobTitle || 'Creative Developer'}</p>
        {personalInfo.bio && (
          <p style={{ fontSize: '0.9rem', color: '#cbd5e1', maxWidth: '640px', margin: '0 auto 2rem', lineHeight: '1.75' }}>{personalInfo.bio}</p>
        )}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#cr-contact" style={{ background: `linear-gradient(135deg, ${accent}, #00c4cc)`, color: '#fff', padding: '0.7rem 1.5rem', borderRadius: '30px', textDecoration: 'none', fontWeight: '700', fontSize: '0.875rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem', boxShadow: `0 8px 20px ${accent}40` }}>
            <Send size={14} /> Let's Talk
          </a>
          <a href="#cr-work" style={{ background: 'rgba(255,255,255,0.06)', color: '#f1f5f9', border: '1px solid rgba(255,255,255,0.12)', padding: '0.7rem 1.5rem', borderRadius: '30px', textDecoration: 'none', fontWeight: '700', fontSize: '0.875rem' }}>
            See My Work
          </a>
        </div>
      </header>

      {/* Skills */}
      {skills.length > 0 && (
        <section id="cr-skills" style={{ padding: '3rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1.5rem', textAlign: 'center' }}>
            What I <span style={{ color: accent }}>Do</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
            {skills.map(sk => (
              <div key={sk.id} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${accent}25`, borderRadius: '10px', padding: '0.85rem 1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.85rem', fontWeight: '600' }}>{sk.name}</span>
                <span style={{ fontSize: '0.7rem', color: accent, fontWeight: '700', background: accent + '20', padding: '0.15rem 0.4rem', borderRadius: '4px' }}>{sk.level}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {projects.length > 0 && (
        <section id="cr-work" style={{ padding: '3rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(255,255,255,0.02)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1.5rem', textAlign: 'center' }}>
            Featured <span style={{ color: accent }}>Projects</span>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
            {projects.map((proj, i) => (
              <div key={proj.id} style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${i === 0 ? accent + '60' : 'rgba(255,255,255,0.08)'}`, borderRadius: '14px', padding: '1.5rem', position: 'relative', overflow: 'hidden' }}>
                {i === 0 && <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '3px', background: `linear-gradient(90deg, ${accent}, #00c4cc)` }} />}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.6rem' }}>
                  <h3 style={{ fontSize: '1rem', fontWeight: '800' }}>{proj.title}</h3>
                  {proj.link && <a href={proj.link} target="_blank" rel="noreferrer" style={{ color: accent }}><ExternalLink size={16} /></a>}
                </div>
                <p style={{ fontSize: '0.83rem', color: '#94a3b8', lineHeight: '1.55', marginBottom: '1rem' }}>{proj.description}</p>
                <span style={{ fontSize: '0.73rem', color: accent, fontWeight: '700', background: accent + '18', padding: '0.25rem 0.65rem', borderRadius: '6px' }}>{proj.technologies}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section style={{ padding: '3rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '1.5rem', textAlign: 'center' }}>
            <span style={{ color: accent }}>Experience</span>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '680px', margin: '0 auto' }}>
            {experiences.map(exp => (
              <div key={exp.id} style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: accent, marginTop: '5px', flexShrink: 0 }} />
                <div>
                  <div style={{ fontWeight: '800', fontSize: '0.95rem' }}>{exp.role}</div>
                  <div style={{ fontSize: '0.8rem', color: accent, fontWeight: '600' }}>{exp.company} · {exp.startDate} – {exp.endDate}</div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      <section id="cr-contact" style={{ padding: '3rem 2rem', background: `linear-gradient(180deg, transparent, ${accent}12)` }}>
        <h2 style={{ fontSize: '1.3rem', fontWeight: '800', marginBottom: '0.4rem', textAlign: 'center' }}>Let's <span style={{ color: accent }}>Connect</span></h2>
        <p style={{ color: '#94a3b8', textAlign: 'center', fontSize: '0.875rem', marginBottom: '1.75rem' }}>Have a project in mind? Let's build something great.</p>
        {sent ? (
          <div style={{ background: 'rgba(16,185,129,0.12)', border: '1px solid #10b981', color: '#10b981', padding: '1rem', borderRadius: '10px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={18} /> Message sent!
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ maxWidth: '480px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <input type="text" placeholder="Your Name" required className="form-input" value={msg.name} onChange={e => setMsg({ ...msg, name: e.target.value })} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9' }} />
            <input type="email" placeholder="Your Email" required className="form-input" value={msg.email} onChange={e => setMsg({ ...msg, email: e.target.value })} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9' }} />
            <textarea rows={3} placeholder="Your Message" required className="form-textarea" value={msg.message} onChange={e => setMsg({ ...msg, message: e.target.value })} style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#f1f5f9' }} />
            <button type="submit" style={{ background: `linear-gradient(135deg, ${accent}, #00c4cc)`, color: '#fff', padding: '0.75rem', borderRadius: '10px', border: 'none', fontWeight: '700', cursor: 'pointer', boxShadow: `0 6px 18px ${accent}40` }}>
              Send Message
            </button>
          </form>
        )}
      </section>

      <footer style={{ textAlign: 'center', padding: '1.25rem', borderTop: '1px solid rgba(255,255,255,0.06)', fontSize: '0.78rem', color: '#475569' }}>
        © {new Date().getFullYear()} {personalInfo.fullName || 'Portfolio'}. Built with Foliofy.
      </footer>
    </div>
  );
};
