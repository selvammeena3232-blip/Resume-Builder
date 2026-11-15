import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { printToPDF } from '../../utils/exportHelpers';
import { 
  Printer, 
  ShieldCheck, 
  Palette, 
  Home, 
  Sun, 
  Moon, 
  User
} from 'lucide-react';

export const ZetyWizardHeader = () => {
  const { resumeData, atsAnalysis, setViewMode, activeTab, setActiveTab, setIsAtsModalOpen, updateCustomization } = useResume();
  const { score, badgeColor } = atsAnalysis;
  const isDarkMode = resumeData.customization.darkMode;

  const toggleDarkMode = () => {
    const nextMode = !isDarkMode;
    updateCustomization('darkMode', nextMode);
    document.documentElement.setAttribute('data-theme', nextMode ? 'dark' : 'light');
  };

  return (
    <header className="navbar" style={{ background: '#ffffff', borderBottom: '1px solid #e2e8f0', color: '#0f172a' }}>
      {/* Brand & Home button */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
        <div 
          className="brand-logo" 
          onClick={() => setViewMode('landing')}
          style={{ color: '#0f172a', fontWeight: '900', fontSize: '1.4rem' }}
        >
          <span style={{ color: '#0f172a' }}>Foliofy</span>
        </div>

        <button 
          className="btn-icon"
          onClick={() => setViewMode('landing')}
          title="Return to Foliofy Homepage"
          style={{ background: '#f1f5f9', borderColor: '#cbd5e1', color: '#0f172a' }}
        >
          <Home size={16} />
        </button>
      </div>

      {/* Mode Switcher Tabs (Resume Builder vs Portfolio Builder) */}
      <div className="mode-tabs" style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', padding: '0.2rem', borderRadius: '10px', display: 'flex', gap: '0.25rem' }}>
        <button 
          className={`tab-btn ${viewMode === 'resume_builder' || (viewMode === 'builder' && activeTab === 'editor') ? 'active' : ''}`}
          onClick={() => { setViewMode('resume_builder'); setActiveTab('editor'); }}
          style={{ 
            padding: '0.4rem 0.85rem', 
            borderRadius: '6px', 
            fontWeight: 700, 
            fontSize: '0.8rem',
            border: 'none',
            cursor: 'pointer',
            background: (viewMode === 'resume_builder' || (viewMode === 'builder' && activeTab === 'editor')) ? '#0073e6' : 'transparent',
            color: (viewMode === 'resume_builder' || (viewMode === 'builder' && activeTab === 'editor')) ? '#ffffff' : '#475569'
          }}
        >
          Resume Builder
        </button>

        <button 
          className={`tab-btn ${viewMode === 'resume_templates' || (viewMode === 'builder' && activeTab === 'templates') ? 'active' : ''}`}
          onClick={() => { setViewMode('resume_templates'); setActiveTab('resume_templates'); }}
          style={{ 
            padding: '0.4rem 0.85rem', 
            borderRadius: '6px', 
            fontWeight: 700, 
            fontSize: '0.8rem',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.3rem',
            background: (viewMode === 'resume_templates' || (viewMode === 'builder' && activeTab === 'templates')) ? '#0073e6' : 'transparent',
            color: (viewMode === 'resume_templates' || (viewMode === 'builder' && activeTab === 'templates')) ? '#ffffff' : '#475569'
          }}
        >
          <Palette size={14} /> Resume Templates
        </button>

        <button 
          className={`tab-btn ${viewMode === 'portfolio_builder' ? 'active' : ''}`}
          onClick={() => { setViewMode('portfolio_builder'); setActiveTab('portfolio_editor'); }}
          style={{ 
            padding: '0.4rem 0.85rem', 
            borderRadius: '6px', 
            fontWeight: 700, 
            fontSize: '0.8rem',
            border: 'none',
            cursor: 'pointer',
            background: viewMode === 'portfolio_builder' ? '#059669' : 'transparent',
            color: viewMode === 'portfolio_builder' ? '#ffffff' : '#059669'
          }}
        >
          Portfolio Builder
        </button>
      </div>

      {/* Live ATS Score Badge */}
      <div 
        onClick={() => setIsAtsModalOpen(true)}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          background: '#f8fafc',
          border: `1px solid ${badgeColor}60`,
          padding: '0.4rem 0.85rem',
          borderRadius: '20px',
          cursor: 'pointer',
          transition: 'var(--transition-fast)'
        }}
        title="View ATS Score Analysis"
      >
        <ShieldCheck size={16} style={{ color: badgeColor }} />
        <span style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0f172a' }}>
          ATS Audit: <span style={{ color: badgeColor }}>{score}/100</span>
        </span>
      </div>

      {/* Actions & My Account pill button matching screenshot */}
      <div className="nav-actions">
        <button 
          className="btn-icon" 
          title="Toggle Light/Dark Theme" 
          onClick={toggleDarkMode}
          style={{ background: '#f1f5f9', borderColor: '#cbd5e1', color: '#0f172a' }}
        >
          {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        <button 
          style={{
            background: '#f1f5f9',
            border: '1px solid #cbd5e1',
            color: '#0f172a',
            fontWeight: '700',
            fontSize: '0.8rem',
            padding: '0.45rem 1rem',
            borderRadius: '20px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem'
          }}
          onClick={() => alert('Account Dashboard / Profile')}
        >
          <User size={14} /> MY ACCOUNT
        </button>

        <button 
          className="btn btn-primary"
          style={{ background: '#0073e6' }}
          onClick={printToPDF}
        >
          <Printer size={16} /> Download PDF
        </button>
      </div>
    </header>
  );
};
