import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Globe, Sparkles, Check, ArrowRight } from 'lucide-react';

const portfolioThemes = [
  {
    id: 'dark_dev',
    name: 'Dark Cyberpunk Dev Hub',
    color: '#6366f1',
    gradient: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
    desc: 'Modern dark theme with glassmorphism telemetry & project cards',
    role: 'Full Stack & Software Engineers',
    emoji: '💻',
    tags: ['Dark Mode', 'Glassmorphism', 'Tech'],
  },
  {
    id: 'minimal_emerald',
    name: 'Emerald Executive Portfolio',
    color: '#065f46',
    gradient: 'linear-gradient(135deg, #022c22 0%, #065f46 50%, #022c22 100%)',
    desc: 'Clean high-contrast layout optimized for PMs & Business Leaders',
    role: 'Product Managers & Executives',
    emoji: '📊',
    tags: ['Minimal', 'Executive', 'Clean'],
  },
  {
    id: 'creative_purple',
    name: 'Creative Designer Studio',
    color: '#7c3aed',
    gradient: 'linear-gradient(135deg, #2e1065 0%, #7c3aed 50%, #2e1065 100%)',
    desc: 'Vibrant grid layout tailored for UI/UX designers and artists',
    role: 'UI/UX & Visual Designers',
    emoji: '🎨',
    tags: ['Creative', 'Vibrant', 'Grid'],
  },
  {
    id: 'tech_blue',
    name: 'Apex Cloud Architect',
    color: '#0284c7',
    gradient: 'linear-gradient(135deg, #082f49 0%, #0284c7 50%, #082f49 100%)',
    desc: 'Sleek tech theme with interactive skill badges & live demo tags',
    role: 'Cloud & DevOps Engineers',
    emoji: '☁️',
    tags: ['Cloud', 'DevOps', 'Interactive'],
  },
];

export const PortfolioThemesView = () => {
  const { resumeData, updateCustomization, setViewMode, setActiveTab } = useResume();
  const [hoveredId, setHoveredId] = useState(null);
  const activeThemeColor = resumeData.customization?.themeColor;

  const handleUseTheme = (theme) => {
    updateCustomization({ themeColor: theme.color });
    setViewMode('portfolio');
    setActiveTab('portfolio');
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-main)',
      padding: '0 0 6rem 0',
      fontFamily: 'var(--font-sans)',
      overflowY: 'auto',
    }}>

      {/* Header */}
      <div style={{
        padding: '2rem 2rem 1.5rem',
        borderBottom: '1px solid var(--border-color)',
        background: 'var(--bg-main)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #059669, #0284c7)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 4px 12px rgba(5,150,105,0.3)'
          }}>
            <Globe size={18} color="#fff" />
          </div>
          <div>
            <h1 style={{ fontSize: '1.35rem', fontWeight: 900, margin: 0, color: 'var(--text-main)', letterSpacing: '-0.02em' }}>
              Portfolio Website Themes
            </h1>
            <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', fontWeight: 500 }}>
              Pick a theme to launch your live web portfolio
            </p>
          </div>
        </div>
      </div>

      {/* Themes Grid */}
      <div style={{ padding: '1.75rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {portfolioThemes.map((theme) => {
          const isActive = activeThemeColor === theme.color;
          const isHovered = hoveredId === theme.id;

          return (
            <div
              key={theme.id}
              onMouseEnter={() => setHoveredId(theme.id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{
                borderRadius: '16px',
                overflow: 'hidden',
                border: isActive
                  ? `2px solid ${theme.color}`
                  : isHovered
                    ? `2px solid ${theme.color}80`
                    : '2px solid var(--border-color)',
                boxShadow: isActive
                  ? `0 8px 30px ${theme.color}30`
                  : isHovered
                    ? `0 6px 20px ${theme.color}20`
                    : '0 2px 8px rgba(0,0,0,0.06)',
                transition: 'all 0.25s ease',
                cursor: 'pointer',
                position: 'relative',
              }}
              onClick={() => handleUseTheme(theme)}
            >
              {/* Gradient banner */}
              <div style={{
                background: theme.gradient,
                padding: '1.25rem 1.25rem 1rem',
                position: 'relative',
                overflow: 'hidden',
              }}>
                {/* Glow orb */}
                <div style={{
                  position: 'absolute', top: '-20px', right: '-20px',
                  width: '100px', height: '100px',
                  background: `radial-gradient(circle, ${theme.color}60 0%, transparent 70%)`,
                  borderRadius: '50%',
                }} />

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <div>
                    <span style={{
                      fontSize: '0.7rem', fontWeight: 800,
                      color: `${theme.color}`,
                      background: `${theme.color}25`,
                      padding: '0.2rem 0.55rem',
                      borderRadius: '20px',
                      textTransform: 'uppercase',
                      letterSpacing: '0.06em',
                      display: 'inline-block',
                      marginBottom: '0.5rem',
                    }}>
                      {theme.role}
                    </span>
                    <h3 style={{
                      fontSize: '1.05rem', fontWeight: 900, margin: 0,
                      color: '#ffffff', letterSpacing: '-0.01em',
                    }}>
                      {theme.emoji} {theme.name}
                    </h3>
                  </div>

                  {isActive && (
                    <div style={{
                      width: '26px', height: '26px', borderRadius: '50%',
                      background: theme.color, display: 'flex',
                      alignItems: 'center', justifyContent: 'center',
                      boxShadow: `0 4px 10px ${theme.color}50`,
                      flexShrink: 0,
                    }}>
                      <Check size={14} color="#fff" strokeWidth={3} />
                    </div>
                  )}
                </div>
              </div>

              {/* Card body */}
              <div style={{
                background: 'var(--bg-secondary)',
                padding: '0.9rem 1.25rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem',
              }}>
                <div>
                  <p style={{
                    margin: '0 0 0.5rem 0', fontSize: '0.82rem',
                    color: 'var(--text-muted)', lineHeight: 1.5,
                  }}>
                    {theme.desc}
                  </p>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {theme.tags.map(tag => (
                      <span key={tag} style={{
                        fontSize: '0.68rem', fontWeight: 700,
                        color: theme.color,
                        background: `${theme.color}15`,
                        padding: '0.15rem 0.5rem',
                        borderRadius: '10px',
                      }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={(e) => { e.stopPropagation(); handleUseTheme(theme); }}
                  style={{
                    flexShrink: 0,
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    padding: '0.55rem 1rem',
                    background: isActive ? theme.color : `${theme.color}15`,
                    color: isActive ? '#fff' : theme.color,
                    border: `1px solid ${theme.color}40`,
                    borderRadius: '8px',
                    fontWeight: 700,
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {isActive ? (
                    <><Check size={13} /> Active</>
                  ) : (
                    <>Use Theme <ArrowRight size={13} /></>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Info tip */}
      <div style={{
        margin: '0 1.5rem',
        padding: '0.9rem 1.1rem',
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-color)',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.6rem',
      }}>
        <Sparkles size={16} color="#059669" style={{ marginTop: '1px', flexShrink: 0 }} />
        <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
          Selecting a theme applies your chosen accent color to the live portfolio website. You can customize colors further in the <strong>Portfolio</strong> editor.
        </p>
      </div>
    </div>
  );
};
