import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { FileText, Globe, ArrowRight, Sparkles, Check, Home, Zap } from 'lucide-react';

export const ChoicePage = () => {
  const { setViewMode, setActiveTab } = useResume();
  const [hoveredCard, setHoveredCard] = useState(null);

  const handleSelectResume = () => {
    setViewMode('builder');
    setActiveTab('editor');
  };

  const handleSelectPortfolio = () => {
    setViewMode('portfolio');
    setActiveTab('portfolio');
  };

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      background: 'var(--bg-main)',
      color: 'var(--text-main)',
      display: 'flex',
      flexDirection: 'column',
      fontFamily: 'var(--font-sans)',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* Ambient background glow effects */}
      <div style={{
        position: 'absolute',
        top: '-150px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(0,115,230,0.15) 0%, rgba(124,58,237,0.1) 40%, transparent 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />


      {/* Main Container */}
      <main style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justify: 'center',
        padding: '3rem 1.5rem 4rem',
        position: 'relative',
        zIndex: 10,
        maxWidth: '1100px',
        margin: '0 auto',
        width: '100%',
      }}>


        {/* Main Title */}
        <h1 style={{
          fontSize: '2.6rem',
          fontWeight: 900,
          textAlign: 'center',
          margin: '0 0 0.75rem 0',
          color: 'var(--text-main)',
          letterSpacing: '-0.03em',
          lineHeight: 1.25,
        }}>
          What would you like to create?
        </h1>
        <p style={{
          fontSize: '1.05rem',
          color: 'var(--text-muted)',
          textAlign: 'center',
          maxWidth: '540px',
          margin: '0 0 3rem 0',
          lineHeight: 1.6,
          fontWeight: 500,
        }}>
          Select a workspace mode below to start crafting your professional career assets.
        </p>

        {/* Cards Container */}
        <div style={{
          display: 'grid',
          // Keep both workspace choices aligned side-by-side.
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          alignItems: 'stretch',
          gap: '2rem',
          width: '100%',
          maxWidth: '820px',
        }}>

          {/* Card 1: Resume Builder */}
          <div
            onMouseEnter={() => setHoveredCard('resume')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={handleSelectResume}
            style={{
              background: 'var(--bg-secondary)',
              border: hoveredCard === 'resume' 
                ? '2px solid #0073e6' 
                : '2px solid var(--border-color)',
              borderRadius: '24px',
              padding: '2.5rem 2rem',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: hoveredCard === 'resume' ? 'translateY(-6px)' : 'translateY(0)',
              boxShadow: hoveredCard === 'resume' 
                ? '0 20px 40px -10px rgba(0,115,230,0.25)' 
                : '0 8px 24px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              boxSizing: 'border-box',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top Glow Orb */}
            <div style={{
              position: 'absolute', top: '-30px', right: '-30px',
              width: '120px', height: '120px',
              background: 'radial-gradient(circle, rgba(0,115,230,0.2) 0%, transparent 70%)',
              borderRadius: '50%',
            }} />

            <div>
              {/* Icon Container */}
              <div style={{
                width: '60px', height: '60px',
                borderRadius: '16px',
                background: 'rgba(0,115,230,0.12)',
                border: '1px solid rgba(0,115,230,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem',
                boxShadow: '0 8px 20px rgba(0,115,230,0.15)',
              }}>
                <FileText size={30} color="#0073e6" />
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>
                Create Resume
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 1.75rem 0' }}>
                Build an ATS-optimized, high-scoring resume with proven professional templates and AI content recommendations.
              </p>

              {/* Feature Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem' }}>
                {[
                  '10+ ATS-Optimized PDF Layouts',
                  'Live Score & Bullet Generator',
                  'Instant 1-Click PDF Download',
                ].map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 600 }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(0,115,230,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={12} color="#0073e6" strokeWidth={3} />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 'auto',
              padding: '0.9rem 1.25rem',
              borderRadius: '14px',
              background: hoveredCard === 'resume' ? '#0073e6' : 'rgba(0,115,230,0.12)',
              color: hoveredCard === 'resume' ? '#ffffff' : '#0073e6',
              fontWeight: 800,
              fontSize: '0.92rem',
              transition: 'all 0.25s ease',
              boxShadow: hoveredCard === 'resume' ? '0 8px 20px rgba(0,115,230,0.35)' : 'none',
            }}>
              <span>Start Building Resume</span>
              <ArrowRight size={18} style={{ transform: hoveredCard === 'resume' ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.25s ease' }} />
            </div>
          </div>

          {/* Card 2: Portfolio Builder */}
          <div
            onMouseEnter={() => setHoveredCard('portfolio')}
            onMouseLeave={() => setHoveredCard(null)}
            onClick={handleSelectPortfolio}
            style={{
              background: 'var(--bg-secondary)',
              border: hoveredCard === 'portfolio' 
                ? '2px solid #059669' 
                : '2px solid var(--border-color)',
              borderRadius: '24px',
              padding: '2.5rem 2rem',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: hoveredCard === 'portfolio' ? 'translateY(-6px)' : 'translateY(0)',
              boxShadow: hoveredCard === 'portfolio' 
                ? '0 20px 40px -10px rgba(5,150,105,0.25)' 
                : '0 8px 24px rgba(0,0,0,0.06)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              height: '100%',
              boxSizing: 'border-box',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Top Glow Orb */}
            <div style={{
              position: 'absolute', top: '-30px', right: '-30px',
              width: '120px', height: '120px',
              background: 'radial-gradient(circle, rgba(5,150,105,0.2) 0%, transparent 70%)',
              borderRadius: '50%',
            }} />

            <div>
              {/* Icon Container */}
              <div style={{
                width: '60px', height: '60px',
                borderRadius: '16px',
                background: 'rgba(5,150,105,0.12)',
                border: '1px solid rgba(5,150,105,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '1.5rem',
                boxShadow: '0 8px 20px rgba(5,150,105,0.15)',
              }}>
                <Globe size={30} color="#059669" />
              </div>

              <h2 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>
                Create Portfolio
              </h2>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: 1.6, margin: '0 0 1.75rem 0' }}>
                Launch a live interactive web portfolio showcasing your projects, technical skills, and headshot.
              </p>

              {/* Feature Checklist */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem', marginBottom: '2rem' }}>
                {[
                  'Modern Web Portfolio Themes',
                  'Interactive Project Showcase',
                  'Live Web Link & Customizable Colors',
                ].map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', color: 'var(--text-main)', fontWeight: 600 }}>
                    <div style={{ width: '18px', height: '18px', borderRadius: '50%', background: 'rgba(5,150,105,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Check size={12} color="#059669" strokeWidth={3} />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action CTA */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 'auto',
              padding: '0.9rem 1.25rem',
              borderRadius: '14px',
              background: hoveredCard === 'portfolio' ? '#059669' : 'rgba(5,150,105,0.12)',
              color: hoveredCard === 'portfolio' ? '#ffffff' : '#059669',
              fontWeight: 800,
              fontSize: '0.92rem',
              transition: 'all 0.25s ease',
              boxShadow: hoveredCard === 'portfolio' ? '0 8px 20px rgba(5,150,105,0.35)' : 'none',
            }}>
              <span>Launch Portfolio</span>
              <ArrowRight size={18} style={{ transform: hoveredCard === 'portfolio' ? 'translateX(4px)' : 'translateX(0)', transition: 'transform 0.25s ease' }} />
            </div>
          </div>

        </div>

        {/* Footer info pill */}
        <div style={{
          marginTop: '3.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.6rem',
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-color)',
          padding: '0.65rem 1.35rem',
          borderRadius: '20px',
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(0,0,0,0.04)',
        }}>
          <Zap size={14} color="#f59e0b" />
          <span>Need both? You can easily switch between your Resume and Portfolio anytime.</span>
        </div>

      </main>
    </div>
  );
};
