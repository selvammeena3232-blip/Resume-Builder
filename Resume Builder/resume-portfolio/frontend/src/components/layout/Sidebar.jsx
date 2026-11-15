import React from 'react';
import { useResume } from '../../context/ResumeContext';
import {
  Home, FileText, Globe, Shield,
  LogIn, LogOut, Sparkles, Info,
  LayoutTemplate, Palette, Monitor
} from 'lucide-react';

export const Sidebar = () => {
  const {
    viewMode, setViewMode, activeTab, setActiveTab,
    openAboutPage, user, openAuthModal, handleLogout
  } = useResume();

  const handleNavClick = (mode, tab) => {
    setViewMode(mode, tab);
    if (tab) setActiveTab(tab);
  };



  const isLandingMode  = viewMode === 'landing' || viewMode === 'about';
  const isResumeMode   = viewMode === 'builder';
  const isPortfolioMode = viewMode === 'portfolio';
  const isWorkMode     = isResumeMode || isPortfolioMode;

  /* ── TOP HORIZONTAL NAVBAR for landing / about ── */
  if (isLandingMode) {
    const tickerMessages = [
      '✦ Build a Job-Winning Resume',
      '✦ ATS-Optimized Templates',
      '✦ 1-Click PDF Export',
      '✦ Live Portfolio Website',
      '✦ AI-Powered Content',
      '✦ Stand Out to Recruiters',
      '✦ Professional Resume Builder',
      '✦ Showcase Your Work',
      '✦ Get Hired Faster',
      '✦ Build a Job-Winning Resume',
      '✦ ATS-Optimized Templates',
      '✦ 1-Click PDF Export',
      '✦ Live Portfolio Website',
      '✦ AI-Powered Content',
      '✦ Stand Out to Recruiters',
      '✦ Professional Resume Builder',
      '✦ Showcase Your Work',
      '✦ Get Hired Faster',
    ];
    return (
      <>
        <nav className="landing-navbar">
        {/* Brand */}
        <div className="landing-navbar-brand" onClick={() => handleNavClick('landing')}>
          <div style={{ width: '32px', height: '32px', borderRadius: '8px', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 10px rgba(30,64,175,0.3)' }}>
            <span style={{ color: '#fff', fontWeight: '900', fontSize: '0.95rem' }}>F</span>
          </div>
          <span>Foliofy</span>
        </div>

        {/* Nav Links */}

        {/* Auth Actions */}
        <div className="landing-navbar-actions">
          {user ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)' }}>
                <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '0.8rem' }}>
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                {user.name}
              </div>
              <button onClick={handleLogout} className="logout-btn" title="Log Out">
                <LogOut size={15} />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => openAuthModal('canva_login')}
                style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem', fontWeight: '700', borderRadius: '8px', border: 'none', background: '#1e40af', color: '#ffffff', cursor: 'pointer' }}
              >
                Log In
              </button>
              <button
                onClick={() => openAuthModal('canva_start')}
                style={{ padding: '0.4rem 0.9rem', fontSize: '0.82rem', fontWeight: '700', borderRadius: '8px', border: 'none', background: 'var(--gradient-primary)', color: '#fff', cursor: 'pointer', boxShadow: '0 4px 12px rgba(30,64,175,0.25)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}
              >
                <Sparkles size={13} /> Sign Up
              </button>
            </>
          )}
          <div style={{ width: '1px', height: '20px', background: 'var(--border-color)', margin: '0 0.25rem' }} />
          <button
            className={`landing-nav-btn ${viewMode === 'landing' ? 'active' : ''}`}
            onClick={() => handleNavClick('landing')}
            style={{ color: viewMode === 'landing' ? '#ffffff' : '#1e40af' }}
          >
            <Home size={15} />
            Home
          </button>
          <button
            className={`landing-nav-btn ${viewMode === 'about' ? 'active' : ''}`}
            onClick={() => openAboutPage('about')}
            style={{ background: '#1e40af', color: '#ffffff' }}
          >
            <Info size={15} />
            About
          </button>
          {user?.isAdmin && (
            <button
              className={`landing-nav-btn ${viewMode === 'admin' ? 'active' : ''}`}
              onClick={() => handleNavClick('admin')}
            >
              <Shield size={15} />
              Admin
            </button>
          )}
        </div>
      </nav>

      {/* Ticker strip */}
      <div className="landing-ticker">
        <div className="ticker-track">
          {tickerMessages.map((msg, i) => (
            <span key={i} className="ticker-item">{msg}</span>
          ))}
        </div>
      </div>
    </>
    );
  }

  /* ── Full sidebar for builder / portfolio ── */
  return (
    <aside className="app-sidebar sidebar-md">
      {/* Brand */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '1.25rem' }}>
        <span
          style={{
            fontWeight: '900',
            fontSize: '1.1rem',
            letterSpacing: '-0.02em',
            color: '#1e40af',
            userSelect: 'none',
          }}
        >
          Foliofy
        </span>
      </div>

      <nav className="sidebar-nav">
        {/* Resume Builder Mode Navigation */}
        {!isPortfolioMode && (
          <>
            <button
              className={`sidebar-nav-btn ${activeTab === 'editor' ? 'active' : ''}`}
              onClick={() => handleNavClick('builder', 'editor')}
              title="Resume Builder"
            >
              <FileText size={20} />
              <span>Resume</span>
            </button>
            <button
              className={`sidebar-nav-btn ${activeTab === 'templates' ? 'active' : ''}`}
              onClick={() => handleNavClick('builder', 'templates')}
              title="Resume Templates"
            >
              <LayoutTemplate size={20} />
              <span>Templates</span>
            </button>
          </>
        )}

        {/* Portfolio Website Mode Navigation */}
        {isPortfolioMode && (
          <>
            <button
              className={`sidebar-nav-btn ${activeTab === 'portfolio' ? 'active' : ''}`}
              onClick={() => handleNavClick('portfolio', 'portfolio')}
              title="Portfolio"
            >
              <Globe size={20} />
              <span>Portfolio</span>
            </button>
            <button
              className={`sidebar-nav-btn ${activeTab === 'portfolio-themes' || activeTab === 'themes' ? 'active' : ''}`}
              onClick={() => handleNavClick('portfolio', 'portfolio-themes')}
              title="Website Themes"
            >
              <Palette size={20} />
              <span>Website Themes</span>
            </button>
            <button
              className={`sidebar-nav-btn ${activeTab === 'live-portfolio' ? 'active' : ''}`}
              onClick={() => handleNavClick('portfolio', 'live-portfolio')}
              title="Live Portfolio Website"
            >
              <Monitor size={20} />
              <span>Live Portfolio Website</span>
            </button>
          </>
        )}

        {user?.isAdmin && (
          <button
            className={`sidebar-nav-btn admin-btn ${viewMode === 'admin' ? 'active' : ''}`}
            onClick={() => handleNavClick('admin')}
            title="Admin Portal"
          >
            <Shield size={20} />
            <span>Admin</span>
          </button>
        )}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        {user ? (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.4rem' }}>
            <div title={user.name} style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'var(--gradient-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '800', fontSize: '0.85rem' }}>
              {user.name?.charAt(0).toUpperCase()}
            </div>
            <button onClick={handleLogout} className="logout-btn" title="Log Out" style={{ padding: '0.35rem' }}>
              <LogOut size={15} />
            </button>
          </div>
        ) : (
          <>
            <button
              className="sidebar-signin-btn"
              onClick={() => openAuthModal('canva_start')}
              title="Sign Up"
              style={{ background: '#1e40af', color: '#fff', border: 'none', boxShadow: '0 4px 15px rgba(30,64,175,0.35)' }}
            >
              <Sparkles size={17} />
            </button>
            <button
              className="sidebar-signin-btn"
              onClick={() => openAuthModal('canva_login')}
              title="Log In"
              style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', color: 'var(--text-main)' }}
            >
              <LogIn size={17} />
            </button>
          </>
        )}
      </div>
    </aside>
  );
};
