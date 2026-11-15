import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ProjectsForm } from './ProjectsForm';
import { SkillsForm } from './SkillsForm';
import { 
  Globe, 
  User, 
  FolderGit2, 
  Wrench, 
  Palette, 
  Eye, 
  ExternalLink, 
  Sparkles, 
  Check, 
  Moon, 
  Sun,
  Layout
} from 'lucide-react';

export const PortfolioEditorPanel = () => {
  const { resumeData, updatePersonalInfo, updateCustomization, setViewMode } = useResume();
  const [activeTab, setActiveTab] = useState('web_profile');

  const customization = resumeData.customization || {};

  const handleThemeColorChange = (color) => {
    updateCustomization({ themeColor: color });
  };

  const handleFontChange = (e) => {
    updateCustomization({ fontFamily: e.target.value });
  };

  return (
    <div className="editor-panel portfolio-editor-panel">
      {/* Portfolio Editor Banner Header */}
      <div className="editor-header portfolio-editor-header" style={{
        background: 'linear-gradient(135deg, rgba(6, 95, 70, 0.08) 0%, rgba(16, 185, 129, 0.05) 100%)',
        padding: '1.25rem',
        borderRadius: '12px',
        marginBottom: '1.5rem',
        border: '1px solid rgba(16, 185, 129, 0.2)'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
              <span className="editor-tag" style={{ background: '#065f46', color: '#ffffff', padding: '0.2rem 0.6rem', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700 }}>
                PORTFOLIO BUILDER
              </span>
              <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Interactive Website Mode</span>
            </div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>
              Customize Your Live Portfolio Website
            </h2>
          </div>
          <button 
            onClick={() => setViewMode('portfolio')}
            className="btn btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#059669',
              color: '#ffffff',
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              fontWeight: 600,
              cursor: 'pointer',
              border: 'none',
              boxShadow: '0 4px 12px rgba(5, 150, 105, 0.25)'
            }}
          >
            <Eye size={16} />
            <span>Launch Fullscreen Site</span>
          </button>
        </div>
      </div>

      {/* Portfolio Quick Navigation Tabs */}
      <div className="portfolio-nav-tabs" style={{
        display: 'flex',
        gap: '0.5rem',
        marginBottom: '1.5rem',
        borderBottom: '1px solid var(--border-color)',
        paddingBottom: '0.5rem'
      }}>
        <button 
          className={`btn-tab ${activeTab === 'web_profile' ? 'active' : ''}`}
          onClick={() => setActiveTab('web_profile')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: 'none',
            background: activeTab === 'web_profile' ? 'var(--accent-color)' : 'transparent',
            color: activeTab === 'web_profile' ? '#ffffff' : 'var(--text-main)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <User size={16} />
          <span>Profile & Bio</span>
        </button>

        <button 
          className={`btn-tab ${activeTab === 'projects' ? 'active' : ''}`}
          onClick={() => setActiveTab('projects')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: 'none',
            background: activeTab === 'projects' ? 'var(--accent-color)' : 'transparent',
            color: activeTab === 'projects' ? '#ffffff' : 'var(--text-main)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <FolderGit2 size={16} />
          <span>Web Projects</span>
        </button>

        <button 
          className={`btn-tab ${activeTab === 'skills' ? 'active' : ''}`}
          onClick={() => setActiveTab('skills')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: 'none',
            background: activeTab === 'skills' ? 'var(--accent-color)' : 'transparent',
            color: activeTab === 'skills' ? '#ffffff' : 'var(--text-main)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <Wrench size={16} />
          <span>Tech Stack</span>
        </button>

        <button 
          className={`btn-tab ${activeTab === 'styling' ? 'active' : ''}`}
          onClick={() => setActiveTab('styling')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '0.5rem 1rem',
            borderRadius: '6px',
            border: 'none',
            background: activeTab === 'styling' ? 'var(--accent-color)' : 'transparent',
            color: activeTab === 'styling' ? '#ffffff' : 'var(--text-main)',
            fontWeight: 600,
            cursor: 'pointer'
          }}
        >
          <Palette size={16} />
          <span>Web Styling</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="portfolio-tab-body">
        {activeTab === 'web_profile' && (
          <div className="portfolio-section">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User size={18} color="#059669" /> Personal Info & Headshot
            </h3>
            <PersonalInfoForm />
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="portfolio-section">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <FolderGit2 size={18} color="#059669" /> Featured Portfolio Projects
            </h3>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '1rem' }}>
              Add interactive projects with demo links, repository URLs, and tech stack tags to showcase on your portfolio site.
            </p>
            <ProjectsForm />
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="portfolio-section">
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Wrench size={18} color="#059669" /> Technical Skills & Tools
            </h3>
            <SkillsForm />
          </div>
        )}

        {activeTab === 'styling' && (
          <div className="portfolio-section" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {/* Color Accent Picker */}
            <div className="form-group">
              <label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>
                Website Primary Theme Accent
              </label>
              <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                {['#065f46', '#2563eb', '#7c3aed', '#0284c7', '#dc2626', '#d97706', '#0f172a'].map((c) => (
                  <button
                    key={c}
                    onClick={() => handleThemeColorChange(c)}
                    style={{
                      width: '36px',
                      height: '36px',
                      borderRadius: '50%',
                      backgroundColor: c,
                      border: customization.themeColor === c ? '3px solid #ffffff' : 'none',
                      outline: customization.themeColor === c ? `2px solid ${c}` : 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: '#ffffff'
                    }}
                  >
                    {customization.themeColor === c && <Check size={16} />}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography */}
            <div className="form-group">
              <label style={{ fontWeight: 700, marginBottom: '0.5rem', display: 'block' }}>
                Typography & Font Family
              </label>
              <select 
                value={customization.fontFamily || 'Outfit'} 
                onChange={handleFontChange}
                className="form-control"
                style={{ width: '100%', padding: '0.6rem', borderRadius: '6px', border: '1px solid var(--border-color)' }}
              >
                <option value="Outfit">Outfit (Modern Web)</option>
                <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                <option value="Inter">Inter (Clean Tech)</option>
                <option value="Roboto">Roboto</option>
              </select>
            </div>

            {/* Dark Mode Toggle for Web Portfolio */}
            <div className="form-group" style={{ background: 'var(--bg-secondary)', padding: '1rem', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h4 style={{ margin: 0, fontWeight: 700, fontSize: '0.95rem' }}>Portfolio Dark Mode</h4>
                  <p style={{ margin: '0.2rem 0 0 0', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                    Switch website rendering theme between dark and light modes.
                  </p>
                </div>
                <button
                  onClick={() => updateCustomization({ darkMode: !customization.darkMode })}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem 1rem',
                    borderRadius: '20px',
                    border: '1px solid var(--border-color)',
                    background: customization.darkMode ? '#1e293b' : '#f1f5f9',
                    color: customization.darkMode ? '#f8fafc' : '#0f172a',
                    cursor: 'pointer',
                    fontWeight: 600
                  }}
                >
                  {customization.darkMode ? <Moon size={16} /> : <Sun size={16} />}
                  <span>{customization.darkMode ? 'Dark Theme' : 'Light Theme'}</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
