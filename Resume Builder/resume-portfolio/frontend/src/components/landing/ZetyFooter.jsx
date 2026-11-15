import React from 'react';
import { useResume } from '../../context/ResumeContext';

export const ZetyFooter = () => {
  const { setViewMode, openAboutPage } = useResume();

  return (
    <footer style={{ background: '#070b14', borderTop: '1px solid var(--border-color)', padding: '3.5rem 2rem 2rem 2rem', color: '#64748b', fontSize: '0.85rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '2.5rem', marginBottom: '3rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.25rem', fontWeight: '900', color: '#ffffff', marginBottom: '0.85rem' }}>
              <span>Foliofy</span>
            </div>
            <p style={{ color: '#94a3b8', lineHeight: '1.6', maxWidth: '320px' }}>
              The #1 online professional resume & portfolio builder. Create ATS-compliant resumes and interactive portfolio websites in minutes.
            </p>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontWeight: '800', marginBottom: '1rem' }}>Resume Tools</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><button onClick={() => setViewMode('builder')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}>Resume Builder</button></li>
              <li><a href="#templates-section" style={{ color: 'inherit', textDecoration: 'none' }}>Zety Templates</a></li>
              <li><button onClick={() => setViewMode('builder')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}>ATS Checker</button></li>
              <li><button onClick={() => setViewMode('portfolio')} style={{ background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: 0 }}>Portfolio Builder</button></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontWeight: '800', marginBottom: '1rem' }}>Templates</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><a href="#templates-section" style={{ color: 'inherit', textDecoration: 'none' }}>Zety Cascade</a></li>
              <li><a href="#templates-section" style={{ color: 'inherit', textDecoration: 'none' }}>Zety Primo</a></li>
              <li><a href="#templates-section" style={{ color: 'inherit', textDecoration: 'none' }}>Zety Cubic</a></li>
              <li><a href="#templates-section" style={{ color: 'inherit', textDecoration: 'none' }}>Zety Crisp</a></li>
            </ul>
          </div>

          <div>
            <h4 style={{ color: '#ffffff', fontWeight: '800', marginBottom: '1rem' }}>Support & About</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <li><button onClick={() => openAboutPage('about')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>About Foliofy</button></li>
              <li><button onClick={() => openAboutPage('contact')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>Contact Support</button></li>
              <li><button onClick={() => openAboutPage('privacy')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>Privacy Policy</button></li>
              <li><button onClick={() => openAboutPage('terms')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>Terms & Conditions</button></li>
              <li><button onClick={() => openAboutPage('accessibility')} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>Accessibility</button></li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '1.5rem', textAlign: 'center', color: '#64748b' }}>
          © {new Date().getFullYear()} Foliofy. All rights reserved. Professional Resume & Portfolio Builder.
        </div>
      </div>
    </footer>
  );
};
