import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { PersonalInfoForm } from './PersonalInfoForm';
import { ExperienceForm } from './ExperienceForm';
import { EducationForm } from './EducationForm';
import { SkillsForm } from './SkillsForm';
import { ProjectsForm } from './ProjectsForm';
import { CertificationsForm } from './CertificationsForm';
import { LanguagesForm } from './LanguagesForm';
import { SpacingCustomizer } from './SpacingCustomizer';
import { presetSoftwareEngineer, presetProductManager, presetUXDesigner } from '../../data/sampleData';
import {
  User, Briefcase, GraduationCap, Wrench,
  FolderGit2, Award, Globe, Palette,
  Sparkles, RotateCcw, ChevronRight
} from 'lucide-react';

const tabs = [
  { id: 'personal',       label: 'Personal',      icon: User,          color: '#0073e6' },
  { id: 'experience',     label: 'Experience',     icon: Briefcase,     color: '#8b5cf6' },
  { id: 'education',      label: 'Education',      icon: GraduationCap, color: '#10b981' },
  { id: 'skills',         label: 'Skills',         icon: Wrench,        color: '#f59e0b' },
  { id: 'projects',       label: 'Projects',       icon: FolderGit2,    color: '#ef4444' },
  { id: 'certifications', label: 'Certs',          icon: Award,         color: '#06b6d4' },
  { id: 'languages',      label: 'Languages',      icon: Globe,         color: '#84cc16' },
  { id: 'theme',          label: 'Theme',          icon: Palette,       color: '#ec4899' },
];

const sectionComponents = {
  personal:       <PersonalInfoForm />,
  experience:     <ExperienceForm />,
  education:      <EducationForm />,
  skills:         <SkillsForm />,
  projects:       <ProjectsForm />,
  certifications: <CertificationsForm />,
  languages:      <LanguagesForm />,
  theme:          <SpacingCustomizer />,
};

export const EditorPanel = () => {
  const { setIsSuggestionsModalOpen, loadPresetProfile, handleResetData, resumeData } = useResume();
  const [activeTab, setActiveTab] = useState('personal');

  const currentTab = tabs.find(t => t.id === activeTab);
  const Icon = currentTab?.icon;

  // Simple completion check per section
  const getCompletion = (id) => {
    const d = resumeData;
    switch (id) {
      case 'personal':       return d.personalInfo?.fullName ? 100 : 0;
      case 'experience':     return d.experiences?.length > 0 ? 100 : 0;
      case 'education':      return d.education?.length > 0 ? 100 : 0;
      case 'skills':         return d.skills?.length > 0 ? 100 : 0;
      case 'projects':       return d.projects?.length > 0 ? 100 : 0;
      case 'certifications': return d.certifications?.length > 0 ? 100 : 0;
      case 'languages':      return d.languages?.length > 0 ? 100 : 0;
      case 'theme':          return 100;
      default:               return 0;
    }
  };

  return (
    <aside className="editor-panel" style={{ padding: 0, gap: 0, display: 'flex', flexDirection: 'column', height: '100%' }}>

      {/* ── Top Header ── */}
      <div style={{ padding: '0.85rem 1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)', flexShrink: 0 }}>
        {/* AI Banner */}
        <div
          onClick={() => setIsSuggestionsModalOpen(true)}
          style={{ background: 'var(--gradient-primary)', borderRadius: '10px', padding: '0.65rem 1rem', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', marginBottom: '0.75rem' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: '700', fontSize: '0.82rem' }}>
            <Sparkles size={15} />
            <span>AI Smart Suggestions</span>
          </div>
          <span style={{ fontSize: '0.7rem', background: 'rgba(255,255,255,0.25)', padding: '0.15rem 0.5rem', borderRadius: '10px', fontWeight: '800' }}>1-Click</span>
        </div>

        {/* Preset Profiles */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
          <span style={{ fontSize: '0.7rem', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--text-subtle)' }}>Quick Presets</span>
          <button
            onClick={() => { if (confirm('Reset all data?')) handleResetData(); }}
            style={{ background: 'none', border: 'none', color: 'var(--text-subtle)', fontSize: '0.7rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
          >
            <RotateCcw size={11} /> Reset
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '0.35rem' }}>
          {[
            { label: '💻 Engineer', preset: presetSoftwareEngineer },
            { label: '📊 Product',  preset: presetProductManager },
            { label: '🎨 UX/UI',    preset: presetUXDesigner },
          ].map(({ label, preset }) => (
            <button
              key={label}
              onClick={() => loadPresetProfile(preset)}
              style={{ padding: '0.3rem 0.25rem', fontSize: '0.7rem', fontWeight: '700', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-main)', cursor: 'pointer', textAlign: 'center', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Tab Navigation ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)', flexShrink: 0 }}>
        {tabs.map(tab => {
          const TabIcon = tab.icon;
          const isActive = activeTab === tab.id;
          const done = getCompletion(tab.id) === 100;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              title={tab.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.2rem',
                padding: '0.6rem 0.25rem',
                border: 'none',
                borderBottom: isActive ? `2px solid ${tab.color}` : '2px solid transparent',
                background: isActive ? tab.color + '10' : 'transparent',
                cursor: 'pointer',
                transition: 'all 0.15s ease',
                position: 'relative',
              }}
            >
              <TabIcon size={16} color={isActive ? tab.color : 'var(--text-subtle)'} />
              <span style={{ fontSize: '0.6rem', fontWeight: '700', color: isActive ? tab.color : 'var(--text-subtle)', lineHeight: 1 }}>
                {tab.label}
              </span>
              {done && (
                <span style={{ position: 'absolute', top: '4px', right: '6px', width: '6px', height: '6px', borderRadius: '50%', background: '#10b981' }} />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Section Header ── */}
      <div style={{ padding: '0.75rem 1rem', borderBottom: '1px solid var(--border-color)', background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', gap: '0.6rem', flexShrink: 0 }}>
        <div style={{ width: '30px', height: '30px', borderRadius: '8px', background: currentTab?.color + '18', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
          {Icon && <Icon size={16} color={currentTab?.color} />}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.82rem', fontWeight: '800', color: 'var(--text-main)' }}>
            {tabs.find(t => t.id === activeTab)?.label}
          </div>
          <div style={{ fontSize: '0.68rem', color: 'var(--text-subtle)' }}>
            Fill in your {tabs.find(t => t.id === activeTab)?.label.toLowerCase()} details
          </div>
        </div>
        {/* Prev / Next */}
        <div style={{ display: 'flex', gap: '0.3rem' }}>
          <button
            onClick={() => {
              const idx = tabs.findIndex(t => t.id === activeTab);
              if (idx > 0) setActiveTab(tabs[idx - 1].id);
            }}
            disabled={tabs.findIndex(t => t.id === activeTab) === 0}
            style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.25rem 0.4rem', cursor: 'pointer', fontSize: '0.7rem', color: 'var(--text-muted)', transform: 'rotate(180deg)' }}
          >
            <ChevronRight size={13} />
          </button>
          <button
            onClick={() => {
              const idx = tabs.findIndex(t => t.id === activeTab);
              if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1].id);
            }}
            disabled={tabs.findIndex(t => t.id === activeTab) === tabs.length - 1}
            style={{ background: 'var(--bg-primary)', border: '1px solid var(--border-color)', borderRadius: '6px', padding: '0.25rem 0.4rem', cursor: 'pointer', fontSize: '0.7rem', color: 'var(--text-muted)' }}
          >
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* ── Section Content ── */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem' }} className="animate-fade-in">
        {sectionComponents[activeTab]}

        {/* Save & Next / Back buttons */}
        <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end', marginTop: '1rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-color)' }}>
          {tabs.findIndex(t => t.id === activeTab) > 0 && (
            <button
              onClick={() => {
                const idx = tabs.findIndex(t => t.id === activeTab);
                setActiveTab(tabs[idx - 1].id);
              }}
              style={{ padding: '0.35rem 0.85rem', fontSize: '0.75rem', fontWeight: '700', borderRadius: '6px', border: '1px solid var(--border-color)', background: 'var(--bg-primary)', color: 'var(--text-muted)', cursor: 'pointer' }}
            >
              ← Back
            </button>
          )}
          <button
            onClick={() => {
              const idx = tabs.findIndex(t => t.id === activeTab);
              if (idx < tabs.length - 1) setActiveTab(tabs[idx + 1].id);
            }}
            style={{ padding: '0.35rem 0.85rem', fontSize: '0.75rem', fontWeight: '700', borderRadius: '6px', border: 'none', background: currentTab?.color || 'var(--zety-blue)', color: '#fff', cursor: 'pointer', opacity: tabs.findIndex(t => t.id === activeTab) === tabs.length - 1 ? 0.4 : 1 }}
            disabled={tabs.findIndex(t => t.id === activeTab) === tabs.length - 1}
          >
            Save & Next →
          </button>
        </div>
      </div>

      {/* ── Progress Footer ── */}
      <div style={{ padding: '0.6rem 1rem', borderTop: '1px solid var(--border-color)', background: 'var(--bg-secondary)', flexShrink: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.3rem' }}>
          <span style={{ fontSize: '0.68rem', fontWeight: '700', color: 'var(--text-subtle)' }}>Profile Completion</span>
          <span style={{ fontSize: '0.68rem', fontWeight: '800', color: 'var(--zety-blue)' }}>
            {tabs.filter(t => getCompletion(t.id) === 100).length}/{tabs.length} sections
          </span>
        </div>
        <div style={{ height: '4px', background: 'var(--border-color)', borderRadius: '4px', overflow: 'hidden' }}>
          <div style={{
            height: '100%',
            width: `${(tabs.filter(t => getCompletion(t.id) === 100).length / tabs.length) * 100}%`,
            background: 'var(--gradient-primary)',
            borderRadius: '4px',
            transition: 'width 0.4s ease'
          }} />
        </div>
      </div>

    </aside>
  );
};
