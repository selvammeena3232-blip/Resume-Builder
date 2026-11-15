import React, { useState } from 'react';
import { Mail, Phone, MapPin, Globe, Github, Linkedin, ExternalLink, Send, Award, CheckCircle2 } from 'lucide-react';

export const PortfolioWebsite = ({ data }) => {
  const { personalInfo, experiences, education, skills, projects, customization } = data;
  const themeColor = customization.themeColor || '#6366f1';
  const [formSent, setFormSent] = useState(false);
  const [contactMsg, setContactMsg] = useState({ name: '', email: '', message: '' });

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (contactMsg.name && contactMsg.email) {
      setFormSent(true);
      setTimeout(() => setFormSent(false), 4000);
      setContactMsg({ name: '', email: '', message: '' });
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: '1000px', background: '#0f172a', color: '#f8fafc', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.7)' }}>
      {/* Portfolio Navbar */}
      <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 2rem', background: 'rgba(15, 23, 42, 0.9)', backdropFilter: 'blur(10px)', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <div style={{ fontWeight: '800', fontSize: '1.2rem', color: themeColor }}>
          {personalInfo.fullName ? personalInfo.fullName.split(' ')[0] + '.' : 'Portfolio.'}
        </div>
        <div style={{ display: 'flex', gap: '1.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#94a3b8' }}>
          <a href="#about" style={{ color: 'inherit', textDecoration: 'none' }}>About</a>
          <a href="#skills" style={{ color: 'inherit', textDecoration: 'none' }}>Skills</a>
          <a href="#projects" style={{ color: 'inherit', textDecoration: 'none' }}>Projects</a>
          <a href="#experience" style={{ color: 'inherit', textDecoration: 'none' }}>Experience</a>
          <a href="#contact" style={{ color: themeColor, textDecoration: 'none', fontWeight: '600' }}>Contact</a>
        </div>
      </nav>

      {/* Hero Section */}
      <header id="about" style={{ padding: '4rem 2rem', textAlign: 'center', background: `radial-gradient(circle at 50% 30%, ${themeColor}22 0%, transparent 70%)` }}>
        <span style={{ background: themeColor + '20', color: themeColor, border: `1px solid ${themeColor}40`, padding: '0.4rem 1rem', borderRadius: '20px', fontSize: '0.8rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          Available For Opportunities
        </span>
        <h1 style={{ fontSize: '2.75rem', fontWeight: '800', margin: '1.25rem 0 0.5rem 0', lineHeight: '1.2' }}>
          Hello, I'm <span style={{ color: themeColor }}>{personalInfo.fullName || 'Alex Morgan'}</span>
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#94a3b8', maxWidth: '600px', margin: '0 auto 1.75rem auto' }}>
          {personalInfo.jobTitle || 'Full Stack Engineer & Creative UI Architect'}
        </p>

        {personalInfo.bio && (
          <p style={{ fontSize: '0.95rem', color: '#cbd5e1', maxWidth: '720px', margin: '0 auto 2rem auto', lineHeight: '1.7' }}>
            {personalInfo.bio}
          </p>
        )}

        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
          <a href="#contact" style={{ background: themeColor, color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
            <Send size={16} /> Get In Touch
          </a>
          <a href="#projects" style={{ background: 'rgba(255,255,255,0.05)', color: '#fff', border: '1px solid rgba(255,255,255,0.15)', padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
            View Featured Projects
          </a>
        </div>
      </header>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section id="skills" style={{ padding: '3rem 2rem', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center' }}>
            Technical Expertise
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem' }}>
            {skills.map((sk) => (
              <div key={sk.id} style={{ background: 'rgba(30, 41, 59, 0.7)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '10px', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontWeight: '600', fontSize: '0.9rem' }}>{sk.name}</span>
                <span style={{ fontSize: '0.75rem', background: themeColor + '20', color: themeColor, padding: '0.2rem 0.5rem', borderRadius: '4px' }}>
                  {sk.level}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Showcase */}
      {projects.length > 0 && (
        <section id="projects" style={{ padding: '3rem 2rem', background: 'rgba(15, 23, 42, 0.5)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem', textAlign: 'center' }}>
            Featured Work & Projects
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {projects.map((proj) => (
              <div key={proj.id} style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{proj.title}</h3>
                    {proj.link && (
                      <a href={proj.link} target="_blank" rel="noreferrer" style={{ color: themeColor }}>
                        <ExternalLink size={18} />
                      </a>
                    )}
                  </div>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '1rem', lineHeight: '1.5' }}>
                    {proj.description}
                  </p>
                </div>
                <div style={{ fontSize: '0.75rem', color: themeColor, fontWeight: '600', background: themeColor + '15', padding: '0.4rem 0.75rem', borderRadius: '6px', width: 'fit-content' }}>
                  {proj.technologies}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Interactive Contact Form */}
      <section id="contact" style={{ padding: '3rem 2rem', borderTop: '1px solid rgba(255,255,255,0.08)', background: `linear-gradient(180deg, transparent 0%, ${themeColor}15 100%)` }}>
        <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '0.5rem', textAlign: 'center' }}>Let's Connect</h2>
        <p style={{ color: '#94a3b8', textAlign: 'center', marginBottom: '2rem', fontSize: '0.9rem' }}>
          Interested in working together or discussing opportunities? Send me a message!
        </p>

        {formSent ? (
          <div style={{ background: 'rgba(16, 185, 129, 0.15)', border: '1px solid #10b981', color: '#10b981', padding: '1.25rem', borderRadius: '10px', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={20} /> Thank you! Your message has been sent successfully.
          </div>
        ) : (
          <form onSubmit={handleContactSubmit} style={{ maxWidth: '500px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <input 
              type="text" 
              placeholder="Your Name" 
              required
              className="form-input"
              value={contactMsg.name}
              onChange={(e) => setContactMsg({ ...contactMsg, name: e.target.value })}
            />
            <input 
              type="email" 
              placeholder="Your Email Address" 
              required
              className="form-input"
              value={contactMsg.email}
              onChange={(e) => setContactMsg({ ...contactMsg, email: e.target.value })}
            />
            <textarea 
              rows={4} 
              placeholder="Your Message..." 
              required
              className="form-textarea"
              value={contactMsg.message}
              onChange={(e) => setContactMsg({ ...contactMsg, message: e.target.value })}
            />
            <button type="submit" className="btn btn-primary" style={{ background: themeColor, width: '100%', padding: '0.75rem' }}>
              Send Message
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: '0.8rem', color: '#64748b' }}>
        © {new Date().getFullYear()} {personalInfo.fullName || 'Alex Morgan'}. Created with Foliofy Builder.
      </footer>
    </div>
  );
};
