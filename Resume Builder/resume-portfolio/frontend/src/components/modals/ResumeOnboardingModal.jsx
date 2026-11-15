import React, { useState, useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { presetFresherGraduate, presetSoftwareEngineer } from '../../data/sampleData';
import { 
  X, 
  GraduationCap, 
  Briefcase, 
  ArrowRight, 
  Check, 
  Sparkles, 
  Layers, 
  Award, 
  Layout, 
  ArrowLeft,
  UploadCloud,
  FileEdit,
  FileText
} from 'lucide-react';

const resumeTemplatesList = [
  { id: 'cascade', name: 'Foliofy Cascade', color: '#0073e6', badge: 'Popular', desc: 'Flagship 2-column layout with rating indicators & bold sidebar' },
  { id: 'primo', name: 'Foliofy Primo', color: '#7c3aed', badge: 'Modern', desc: 'Timeline layout with icon badges & header accents' },
  { id: 'cubic', name: 'Foliofy Cubic', color: '#059669', badge: 'Corporate', desc: '3-tone boxed card layout for tech & management' },
  { id: 'crisp', name: 'Foliofy Crisp', color: '#dc2626', badge: 'Classic', desc: 'Clean 1-column layout maxing ATS readability' },
  { id: 'diamond', name: 'Foliofy Diamond', color: '#0284c7', badge: 'Contemporary', desc: 'Modern two-column format with sleek header divider' },
  { id: 'modern', name: 'Modern Minimalist', color: '#0f172a', badge: 'Minimal', desc: 'Sleek dark-accent layout for engineers & creatives' }
];

const TemplateThumbnail = ({ tplId, color }) => {
  return (
    <div style={{
      width: '100%',
      height: '90px',
      background: '#f8fafc',
      borderRadius: '8px',
      border: '1px solid #e2e8f0',
      marginBottom: '0.75rem',
      overflow: 'hidden',
      position: 'relative',
      padding: '6px',
      boxSizing: 'border-box',
      display: 'flex',
      gap: '6px'
    }}>
      {tplId === 'cascade' && (
        <>
          <div style={{ width: '30%', height: '100%', background: color, borderRadius: '4px', padding: '4px', display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div style={{ width: '12px', height: '12px', borderRadius: '50%', background: 'rgba(255,255,255,0.7)', marginBottom: '2px' }} />
            <div style={{ width: '80%', height: '3px', background: 'rgba(255,255,255,0.6)', borderRadius: '2px' }} />
            <div style={{ width: '60%', height: '3px', background: 'rgba(255,255,255,0.4)', borderRadius: '2px' }} />
          </div>
          <div style={{ width: '70%', height: '100%', display: 'flex', flexDirection: 'column', gap: '4px', padding: '2px' }}>
            <div style={{ width: '70%', height: '6px', background: '#334155', borderRadius: '2px' }} />
            <div style={{ width: '40%', height: '4px', background: '#94a3b8', borderRadius: '2px', marginBottom: '4px' }} />
            <div style={{ width: '90%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }} />
            <div style={{ width: '85%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }} />
            <div style={{ width: '95%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }} />
          </div>
        </>
      )}

      {tplId === 'primo' && (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ width: '100%', height: '14px', background: color + '25', borderRadius: '4px', borderLeft: `3px solid ${color}`, display: 'flex', alignItems: 'center', padding: '0 4px' }}>
            <div style={{ width: '40%', height: '4px', background: color, borderRadius: '2px' }} />
          </div>
          <div style={{ display: 'flex', gap: '8px', flex: 1, padding: '2px' }}>
            <div style={{ width: '4px', height: '100%', background: color + '40', borderRadius: '2px' }} />
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div style={{ width: '60%', height: '4px', background: '#334155', borderRadius: '2px' }} />
              <div style={{ width: '95%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }} />
              <div style={{ width: '80%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }} />
            </div>
          </div>
        </div>
      )}

      {tplId === 'cubic' && (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ width: '100%', height: '16px', background: '#0f172a', borderRadius: '4px', padding: '3px 6px', display: 'flex', alignItems: 'center' }}>
            <div style={{ width: '50%', height: '4px', background: '#ffffff', borderRadius: '2px' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px', flex: 1 }}>
            <div style={{ background: color + '15', borderRadius: '3px', border: `1px solid ${color}30` }} />
            <div style={{ background: '#f1f5f9', borderRadius: '3px', border: '1px solid #e2e8f0' }} />
          </div>
        </div>
      )}

      {tplId === 'crisp' && (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '4px', alignItems: 'center', padding: '4px' }}>
          <div style={{ width: '50%', height: '6px', background: '#0f172a', borderRadius: '2px' }} />
          <div style={{ width: '30%', height: '3px', background: color, borderRadius: '2px' }} />
          <div style={{ width: '100%', height: '1px', background: '#e2e8f0', margin: '2px 0' }} />
          <div style={{ width: '90%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }} />
          <div style={{ width: '85%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }} />
          <div style={{ width: '95%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }} />
        </div>
      )}

      {tplId === 'diamond' && (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ width: '100%', height: '8px', background: color, borderRadius: '2px' }} />
          <div style={{ display: 'flex', gap: '6px', flex: 1 }}>
            <div style={{ width: '35%', height: '100%', background: '#f1f5f9', borderRadius: '3px' }} />
            <div style={{ width: '65%', height: '100%', display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <div style={{ width: '70%', height: '4px', background: '#334155', borderRadius: '2px' }} />
              <div style={{ width: '90%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }} />
              <div style={{ width: '80%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }} />
            </div>
          </div>
        </div>
      )}

      {tplId === 'modern' && (
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: '4px', padding: '4px' }}>
          <div style={{ width: '100%', height: '4px', background: '#0f172a', borderRadius: '2px' }} />
          <div style={{ width: '60%', height: '6px', background: '#1e293b', borderRadius: '2px', marginBottom: '2px' }} />
          <div style={{ width: '95%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }} />
          <div style={{ width: '85%', height: '3px', background: '#cbd5e1', borderRadius: '2px' }} />
        </div>
      )}
    </div>
  );
};

export const ResumeOnboardingModal = () => {
  const { 
    isResumeWizardOpen, 
    closeResumeWizardModal, 
    setViewMode, 
    setActiveTab, 
    loadPresetProfile, 
    updateCustomization,
    handleImportData,
    openAboutPage
  } = useResume();

  const [wizardStep, setWizardStep] = useState(1); // 1: Experience Level, 2: Select Template, 3: Upload vs Scratch
  const [selectedLevel, setSelectedLevel] = useState('fresher'); // 'fresher' | 'experienced'
  const [selectedTemplate, setSelectedTemplate] = useState('cascade');
  const fileInputRef = useRef(null);

  if (!isResumeWizardOpen) return null;

  const handleFinishWizard = (targetTemplateId = null) => {
    const templateToUse = targetTemplateId || selectedTemplate;

    // 1. Choose preset template data based on Fresher vs Experienced
    const basePreset = selectedLevel === 'fresher' ? presetFresherGraduate : presetSoftwareEngineer;
    const finalPreset = {
      ...basePreset,
      customization: {
        ...(basePreset?.customization || {}),
        activeTemplate: templateToUse
      }
    };

    if (typeof loadPresetProfile === 'function') {
      loadPresetProfile(finalPreset);
    }
    if (typeof updateCustomization === 'function') {
      updateCustomization({ activeTemplate: templateToUse });
    }

    // 2. Close wizard and navigate to resume_builder
    if (typeof closeResumeWizardModal === 'function') {
      closeResumeWizardModal();
    }
    setViewMode('resume_builder');
    setActiveTab('editor');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        const importedData = {
          ...parsed,
          customization: {
            ...(parsed?.customization || {}),
            activeTemplate: selectedTemplate
          }
        };
        if (typeof handleImportData === 'function') {
          handleImportData(importedData);
        } else if (typeof loadPresetProfile === 'function') {
          loadPresetProfile(importedData);
        }
        if (typeof updateCustomization === 'function') {
          updateCustomization({ activeTemplate: selectedTemplate });
        }
        if (typeof closeResumeWizardModal === 'function') {
          closeResumeWizardModal();
        }
        setViewMode('resume_builder');
        setActiveTab('editor');
      } catch (err) {
        alert('Could not parse JSON resume file. Starting with template preset instead.');
        handleFinishWizard(selectedTemplate);
      }
    };
    reader.readAsText(file);
  };

  return (
    <div 
      onClick={closeResumeWizardModal}
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1.5rem',
        cursor: 'pointer'
      }}
    >
      {/* Hidden File Upload Input */}
      <input 
        type="file" 
        ref={fileInputRef}
        onChange={handleFileUpload}
        accept=".json"
        style={{ display: 'none' }}
      />

      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          background: 'var(--bg-secondary)',
          color: 'var(--text-main)',
          width: '100%',
          maxWidth: wizardStep === 3 ? '860px' : '750px',
          borderRadius: '24px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.4)',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          cursor: 'default',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Top Modal Header */}
        <div style={{
          padding: '1.5rem 2rem 1.25rem 2rem',
          borderBottom: '1px solid var(--border-color)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-primary)'
        }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0073e6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              STEP {wizardStep} OF 3
            </span>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 900, margin: '0.2rem 0 0 0', color: 'var(--text-main)' }}>
              {wizardStep === 1 && 'Choose Your Experience Level'}
              {wizardStep === 2 && 'Select Your Resume Template'}
              {wizardStep === 3 && 'Are you uploading an existing resume?'}
            </h2>
            {wizardStep === 3 && (
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: '0.35rem 0 0 0' }}>
                Just review, edit, and update it with new information
              </p>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '2rem', maxHeight: '65vh', overflowY: 'auto' }}>
          {wizardStep === 1 && (
            <div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.75rem', lineHeight: '1.6' }}>
                How long have you been working? We will optimize your resume structure and section order for your career stage.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem' }}>
                {/* Option 1: Fresher */}
                <div 
                  onClick={() => setSelectedLevel('fresher')}
                  style={{
                    border: selectedLevel === 'fresher' ? '2px solid #0073e6' : '1px solid var(--border-color)',
                    background: selectedLevel === 'fresher' ? 'rgba(0, 115, 230, 0.06)' : 'var(--bg-primary)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#0073e6', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <GraduationCap size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Fresher / Graduate</h3>
                      <span style={{ fontSize: '0.75rem', color: '#0073e6', fontWeight: 700 }}>0 - 2 Years Experience</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                    Best for students, recent graduates, or career changers. Highlights Education, Key Projects, Skills & Internships upfront.
                  </p>
                </div>

                {/* Option 2: Experienced */}
                <div 
                  onClick={() => setSelectedLevel('experienced')}
                  style={{
                    border: selectedLevel === 'experienced' ? '2px solid #059669' : '1px solid var(--border-color)',
                    background: selectedLevel === 'experienced' ? 'rgba(5, 150, 105, 0.06)' : 'var(--bg-primary)',
                    borderRadius: '16px',
                    padding: '1.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    position: 'relative'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: '#059669', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Briefcase size={22} />
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>Experienced Professional</h3>
                      <span style={{ fontSize: '0.75rem', color: '#059669', fontWeight: 700 }}>3+ Years Experience</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                    Best for mid-level and senior roles. Focuses on Work History, Leadership achievements, key metrics & career trajectory.
                  </p>
                </div>
              </div>
            </div>
          )}

          {wizardStep === 2 && (
            <div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-muted)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                Select a template layout designed for your level ({selectedLevel === 'fresher' ? 'Fresher / Graduate' : 'Experienced Professional'}).
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                {resumeTemplatesList.map((tpl) => (
                  <div
                    key={tpl.id}
                    onClick={() => {
                      setSelectedTemplate(tpl.id);
                      setWizardStep(3);
                    }}
                    style={{
                      border: selectedTemplate === tpl.id ? `2px solid ${tpl.color}` : '1px solid var(--border-color)',
                      background: selectedTemplate === tpl.id ? `${tpl.color}08` : 'var(--bg-primary)',
                      borderRadius: '16px',
                      padding: '1rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between'
                    }}
                  >
                    <div>
                      {/* Visual Template Thumbnail */}
                      <TemplateThumbnail tplId={tpl.id} color={tpl.color} />

                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                        <h4 style={{ fontSize: '0.95rem', fontWeight: 800, margin: 0, color: 'var(--text-main)' }}>{tpl.name}</h4>
                        <span style={{ fontSize: '0.65rem', fontWeight: 800, background: tpl.color + '20', color: tpl.color, padding: '0.15rem 0.45rem', borderRadius: '4px' }}>
                          {tpl.badge}
                        </span>
                      </div>
                      <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4', margin: 0 }}>{tpl.desc}</p>
                    </div>

                    <div style={{ marginTop: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                      {selectedTemplate === tpl.id ? (
                        <span style={{ background: tpl.color, color: '#fff', padding: '3px 10px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '3px' }}>
                          <Check size={12} /> Selected
                        </span>
                      ) : (
                        <span style={{ color: 'var(--text-muted)', fontSize: '0.7rem', fontWeight: 600 }}>Click to select</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {wizardStep === 3 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.75rem', padding: '1rem 0' }}>
              {/* Option 1: Yes, upload from my resume */}
              <div
                onClick={() => fileInputRef.current?.click()}
                style={{
                  border: '2px solid #1e3a8a',
                  background: 'var(--bg-primary)',
                  borderRadius: '20px',
                  padding: '2.5rem 1.75rem 2rem 1.75rem',
                  cursor: 'pointer',
                  position: 'relative',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  boxShadow: '0 8px 25px rgba(30, 58, 138, 0.08)',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Top Badge */}
                <div style={{
                  position: 'absolute',
                  top: '-14px',
                  background: '#fecdd3',
                  color: '#e11d48',
                  fontSize: '0.68rem',
                  fontWeight: 800,
                  letterSpacing: '0.04em',
                  padding: '0.3rem 0.85rem',
                  borderRadius: '6px',
                  boxShadow: '0 2px 8px rgba(225, 29, 72, 0.15)'
                }}>
                  RECOMMENDED OPTION TO SAVE YOU TIME
                </div>

                {/* Upload Circle Icon */}
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  color: '#0073e6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <UploadCloud size={34} />
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.6rem 0', color: 'var(--text-main)' }}>
                  Yes, upload from my resume
                </h3>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0, maxWidth: '280px' }}>
                  We'll give you expert guidance to fill out your info and enhance your resume, from start to finish
                </p>
              </div>

              {/* Option 2: No, start from scratch */}
              <div
                onClick={() => handleFinishWizard(selectedTemplate)}
                style={{
                  border: '1px solid var(--border-color)',
                  background: 'var(--bg-primary)',
                  borderRadius: '20px',
                  padding: '2.5rem 1.75rem 2rem 1.75rem',
                  cursor: 'pointer',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transition: 'all 0.2s ease'
                }}
              >
                {/* Scratch Edit Circle Icon */}
                <div style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '50%',
                  background: '#f0fdf4',
                  border: '1px solid #bbf7d0',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem'
                }}>
                  <FileEdit size={32} />
                </div>

                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, margin: '0 0 0.6rem 0', color: 'var(--text-main)' }}>
                  No, start from scratch
                </h3>

                <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: 0, maxWidth: '280px' }}>
                  We'll guide you through the whole process so your skills can shine
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer Controls */}
        <div style={{
          padding: '1.25rem 2rem',
          borderTop: '1px solid var(--border-color)',
          display: 'flex',
          justify: 'space-between',
          alignItems: 'center',
          background: 'var(--bg-primary)',
          gap: '1rem'
        }}>
          {wizardStep > 1 ? (
            <button
              onClick={() => setWizardStep(prev => prev - 1)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.65rem 1.25rem',
                borderRadius: '10px',
                border: '1px solid var(--border-color)',
                background: 'var(--bg-secondary)',
                color: 'var(--text-main)',
                fontWeight: 700,
                fontSize: '0.875rem',
                cursor: 'pointer',
                flexShrink: 0
              }}
            >
              <ArrowLeft size={16} /> Back
            </button>
          ) : <div />}

          {wizardStep === 1 && (
            <button
              onClick={() => setWizardStep(2)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.75rem',
                background: '#0073e6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0, 115, 230, 0.3)',
                flexShrink: 0
              }}
            >
              <span>Next: Choose Template</span> <ArrowRight size={16} />
            </button>
          )}

          {wizardStep === 2 && (
            <button
              onClick={() => setWizardStep(3)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                padding: '0.75rem 1.75rem',
                background: '#0073e6',
                color: '#ffffff',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 800,
                fontSize: '0.9rem',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(0, 115, 230, 0.3)',
                flexShrink: 0
              }}
            >
              <span>Next: Upload or Scratch</span> <ArrowRight size={16} />
            </button>
          )}

          {wizardStep === 3 && (
            <div style={{ display: 'flex', gap: '1rem', fontSize: '0.725rem', color: 'var(--text-muted)', fontWeight: 600, flexWrap: 'wrap', justifyContent: 'flex-end' }}>
              <span onClick={() => openAboutPage('terms')} style={{ cursor: 'pointer' }}>TERMS AND CONDITIONS</span>
              <span>|</span>
              <span onClick={() => openAboutPage('privacy')} style={{ cursor: 'pointer' }}>PRIVACY POLICY</span>
              <span>|</span>
              <span onClick={() => openAboutPage('accessibility')} style={{ cursor: 'pointer' }}>ACCESSIBILITY</span>
              <span>|</span>
              <span onClick={() => openAboutPage('contact')} style={{ cursor: 'pointer' }}>CONTACT US</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
