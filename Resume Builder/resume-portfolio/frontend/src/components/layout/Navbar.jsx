import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { 
  FileText, 
  Globe, 
  Palette, 
  User,
  LogIn,
  Shield
} from 'lucide-react';

export const Navbar = () => {
  const { 
    viewMode,
    setViewMode, 
    activeTab, 
    setActiveTab, 
    user,
    openAuthModal,
    handleLogout
  } = useResume();

  return (
    <header className="navbar">
      {/* Brand Logo */}
      <div className="brand-logo" onClick={() => setViewMode('landing')}>
        <span>Foliofy</span>
      </div>

      {/* Navigation tabs for Builder vs Landing vs Portfolio */}
      <div className="mode-tabs">
        <button 
          className={`tab-btn ${viewMode === 'landing' ? 'active' : ''}`}
          onClick={() => setViewMode('landing')}
        >
          Home
        </button>

        <button 
          className={`tab-btn ${viewMode === 'builder' && activeTab === 'editor' ? 'active' : ''}`}
          onClick={() => { setViewMode('builder'); setActiveTab('editor'); }}
        >
          <FileText size={15} /> Resume Builder
        </button>

        <button 
          className={`tab-btn ${viewMode === 'portfolio' ? 'active' : ''}`}
          onClick={() => { setViewMode('portfolio'); setActiveTab('portfolio'); }}
        >
          <Globe size={15} /> Live Portfolio
        </button>

        <button 
          className={`tab-btn ${viewMode === 'builder' && activeTab === 'templates' ? 'active' : ''}`}
          onClick={() => { setViewMode('builder'); setActiveTab('templates'); }}
        >
          <Palette size={15} /> Templates
        </button>

        {user?.isAdmin && (
          <button 
            className={`tab-btn ${viewMode === 'admin' ? 'active' : ''}`}
            onClick={() => setViewMode('admin')}
            style={{ color: '#a78bfa', background: viewMode === 'admin' ? 'rgba(139, 92, 246, 0.25)' : 'transparent' }}
          >
            <Shield size={15} /> Admin Portal
          </button>
        )}
      </div>

      {/* Center Right Actions */}
      <div className="nav-actions">





        {user ? (
          <button 
            className="btn btn-secondary"
            onClick={handleLogout}
            title="Click to Log Out"
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem', borderColor: user.isAdmin ? '#8b5cf6' : 'var(--border-color)' }}
          >
            <User size={15} style={{ color: user.isAdmin ? '#8b5cf6' : 'var(--zety-blue)' }} />
            <span>{user.name}</span>
          </button>
        ) : (
          <button 
            className="btn btn-secondary"
            onClick={() => openAuthModal('login')}
            style={{ fontSize: '0.8rem', padding: '0.45rem 0.85rem' }}
          >
            <LogIn size={15} style={{ color: 'var(--zety-blue)' }} />
            <span>Sign In</span>
          </button>
        )}


      </div>
    </header>
  );
};
