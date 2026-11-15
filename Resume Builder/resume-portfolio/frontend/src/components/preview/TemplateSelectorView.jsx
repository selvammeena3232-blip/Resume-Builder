import React, { useState, useMemo } from 'react';
import { useResume } from '../../context/ResumeContext';
import { ZetyCascade } from './templates/ZetyCascade';
import { ZetyPrimo } from './templates/ZetyPrimo';
import { ZetyCubic } from './templates/ZetyCubic';
import { ZetyCrisp } from './templates/ZetyCrisp';
import { ZetyDiamond } from './templates/ZetyDiamond';
import { ZetyVibes } from './templates/ZetyVibes';
import { ExecutiveResume } from './templates/ExecutiveResume';
import { ModernResume } from './templates/ModernResume';
import { CreativeResume } from './templates/CreativeResume';
import { Check, Filter, X, RefreshCw } from 'lucide-react';

const componentMap = {
  cascade: ZetyCascade,
  primo: ZetyPrimo,
  cubic: ZetyCubic,
  crisp: ZetyCrisp,
  diamond: ZetyDiamond,
  vibes: ZetyVibes,
  executive: ExecutiveResume,
  modern: ModernResume,
  creative: CreativeResume
};

const palettePresets = [
  ['#0073e6', '#2563eb', '#7c3aed', '#059669', '#d97706', '#dc2626'],
  ['#65a30d', '#2563eb', '#059669', '#0284c7', '#7c3aed', '#d97706'],
  ['#991b1b', '#1e3a8a', '#065f46', '#312e81', '#0f172a', '#b45309'],
  ['#0f172a', '#1e293b', '#2563eb', '#059669', '#7c3aed', '#b45309'],
  ['#0284c7', '#2563eb', '#7c3aed', '#059669', '#dc2626', '#0f172a'],
  ['#dc2626', '#7c3aed', '#2563eb', '#059669', '#0284c7', '#d97706']
];

const rawTemplates = [
  { id: 'cascade', name: 'Foliofy Cascade', compKey: 'cascade', hasPhoto: true, columns: 2, style: 'Contemporary', occupation: 'Technology & Engineering', isRecommended: true },
  { id: 'primo', name: 'Foliofy Primo', compKey: 'primo', hasPhoto: true, columns: 2, style: 'Creative', occupation: 'Technology & Engineering', isRecommended: true },
  { id: 'cubic', name: 'Foliofy Cubic', compKey: 'cubic', hasPhoto: true, columns: 2, style: 'Contemporary', occupation: 'Management & Executive', isRecommended: true },
  { id: 'crisp', name: 'Foliofy Crisp', compKey: 'crisp', hasPhoto: false, columns: 1, style: 'Traditional', occupation: 'Management & Executive', isRecommended: false },
  { id: 'diamond', name: 'Foliofy Diamond', compKey: 'diamond', hasPhoto: false, columns: 2, style: 'Contemporary', occupation: 'Technology & Engineering', isRecommended: false },
  { id: 'vibes', name: 'Foliofy Vibes', compKey: 'vibes', hasPhoto: false, columns: 1, style: 'Creative', occupation: 'Office & Administrative', isRecommended: false },
  { id: 'executive', name: 'Executive Classic', compKey: 'executive', hasPhoto: false, columns: 1, style: 'Traditional', occupation: 'Management & Executive', isRecommended: false },
  { id: 'modern', name: 'Modern Minimal', compKey: 'modern', hasPhoto: false, columns: 2, style: 'Contemporary', occupation: 'Office & Administrative', isRecommended: false },
  { id: 'creative', name: 'Creative Portfolio', compKey: 'creative', hasPhoto: true, columns: 2, style: 'Creative', occupation: 'Office & Administrative', isRecommended: false },
  { id: 'apex', name: 'Foliofy Apex Tech', compKey: 'cascade', hasPhoto: true, columns: 2, style: 'Contemporary', occupation: 'Technology & Engineering', isRecommended: false },
  { id: 'zenith', name: 'Foliofy Zenith', compKey: 'primo', hasPhoto: true, columns: 2, style: 'Creative', occupation: 'Technology & Engineering', isRecommended: false },
  { id: 'horizon', name: 'Foliofy Horizon', compKey: 'cubic', hasPhoto: true, columns: 2, style: 'Contemporary', occupation: 'Management & Executive', isRecommended: false }
];

const templatesDatabase = rawTemplates.map((t, idx) => ({
  ...t,
  defaultColor: palettePresets[idx % palettePresets.length][0],
  swatches: palettePresets[idx % palettePresets.length]
}));

const stylesList = ['Traditional', 'Creative', 'Contemporary'];
const occupationsList = ['Management & Executive', 'Technology & Engineering', 'Office & Administrative'];

export const TemplateSelectorView = () => {
  const { viewMode, setViewMode, setActiveTab, resumeData, updateCustomization, openAboutPage } = useResume();
  const activeTemplateId = resumeData.customization?.activeTemplate || 'cascade';

  const [activeCategory, setActiveCategory] = useState(
    viewMode === 'portfolio_templates' ? 'portfolio' : 'resume'
  );
  const [selectedTemplateId, setSelectedTemplateId] = useState(activeTemplateId);
  const [templateColors, setTemplateColors] = useState({});

  // Filter state
  const [filters, setFilters] = useState({
    headshot: [],
    columns: [],
    style: [],
    occupation: []
  });

  const handleToggleFilter = (category, value) => {
    setFilters(prev => {
      const current = prev[category];
      return {
        ...prev,
        [category]: current.includes(value)
          ? current.filter(v => v !== value)
          : [...current, value]
      };
    });
  };

  const clearAllFilters = () => {
    setFilters({ headshot: [], columns: [], style: [], occupation: [] });
  };

  const activeFilterCount = useMemo(() => {
    return filters.headshot.length + filters.columns.length + filters.style.length + filters.occupation.length;
  }, [filters]);

  const filteredTemplates = useMemo(() => {
    return templatesDatabase.filter(tpl => {
      if (filters.headshot.length > 0) {
        if (filters.headshot.includes('with') && !tpl.hasPhoto) return false;
        if (filters.headshot.includes('without') && tpl.hasPhoto) return false;
        if (filters.headshot.includes('with') && filters.headshot.includes('without')) {
          // both selected — show all
        }
      }
      if (filters.columns.length > 0 && !filters.columns.includes(tpl.columns)) return false;
      if (filters.style.length > 0 && !filters.style.includes(tpl.style)) return false;
      if (filters.occupation.length > 0 && !filters.occupation.includes(tpl.occupation)) return false;
      return true;
    });
  }, [filters]);

  const handleSelectTemplate = (id) => {
    setSelectedTemplateId(id);
  };

  const handleSetColor = (templateId, color, e) => {
    e.stopPropagation();
    setTemplateColors(prev => ({ ...prev, [templateId]: color }));
  };

  const handleConfirmChoice = () => {
    if (!selectedTemplateId) return;
    const chosenColor = templateColors[selectedTemplateId] || (templatesDatabase.find(t => t.id === selectedTemplateId)?.defaultColor);
    updateCustomization({ activeTemplate: selectedTemplateId, themeColor: chosenColor });
    setViewMode('resume_builder');
    setActiveTab('editor');
  };

  const handleChooseLater = () => {
    setViewMode('resume_builder');
    setActiveTab('editor');
  };

  return (
    <div style={{ minHeight: '100vh', background: '#ffffff', color: '#0f172a', paddingBottom: '120px', fontFamily: 'var(--font-sans)' }}>
      
      {/* Top Header */}
      <div style={{ textAlign: 'center', padding: '2rem 1rem 1.25rem', background: '#ffffff', borderBottom: '1px solid #e2e8f0' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
          Explore Professional Resume Templates
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.9rem', margin: '0.4rem 0 0 0' }}>
          Select an ATS-optimized layout to customize your resume
        </p>
      </div>

      {/* Main Layout: Left Sidebar Filters + Templates Grid */}
      <div style={{ maxWidth: '1350px', margin: '0 auto', padding: '2rem 1.5rem', display: 'grid', gridTemplateColumns: '240px 1fr', gap: '2rem' }}>
        
        {/* Left Sidebar Filters */}
        <aside 
          style={{ 
            background: '#ffffff', 
            padding: '1.35rem', 
            borderRadius: '16px', 
            border: '1px solid #cbd5e1', 
            height: 'fit-content', 
            maxHeight: 'calc(100vh - 120px)', 
            overflowY: 'auto', 
            boxShadow: '0 4px 15px rgba(0,0,0,0.04)', 
            position: 'sticky', 
            top: '20px' 
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: '800', margin: 0, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Filter size={18} /> Filters {activeFilterCount > 0 && <span style={{ background: '#0073e6', color: '#ffffff', fontSize: '0.7rem', fontWeight: '900', padding: '0.15rem 0.5rem', borderRadius: '10px' }}>{activeFilterCount}</span>}
            </h3>
            {activeFilterCount > 0 && (
              <button 
                onClick={clearAllFilters}
                style={{ background: 'none', border: 'none', color: '#0073e6', fontSize: '0.8rem', fontWeight: '700', cursor: 'pointer', padding: 0 }}
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Filter 1: Headshot */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: '800', color: '#334155', marginBottom: '0.6rem' }}>Headshot</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.55rem', cursor: 'pointer', userSelect: 'none' }}>
                <input 
                  type="checkbox" 
                  checked={filters.headshot.includes('with')}
                  onChange={() => handleToggleFilter('headshot', 'with')}
                  style={{ width: '16px', height: '16px', accentColor: '#0073e6', cursor: 'pointer' }}
                />
                With photo
              </label>
              <label style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.55rem', cursor: 'pointer', userSelect: 'none' }}>
                <input 
                  type="checkbox" 
                  checked={filters.headshot.includes('without')}
                  onChange={() => handleToggleFilter('headshot', 'without')}
                  style={{ width: '16px', height: '16px', accentColor: '#0073e6', cursor: 'pointer' }}
                />
                Without photo
              </label>
            </div>
          </div>

          {/* Filter 2: Columns */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: '800', color: '#334155', marginBottom: '0.6rem' }}>Columns</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <label style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.55rem', cursor: 'pointer', userSelect: 'none' }}>
                <input 
                  type="checkbox" 
                  checked={filters.columns.includes(1)}
                  onChange={() => handleToggleFilter('columns', 1)}
                  style={{ width: '16px', height: '16px', accentColor: '#0073e6', cursor: 'pointer' }}
                />
                1 Column
              </label>
              <label style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.55rem', cursor: 'pointer', userSelect: 'none' }}>
                <input 
                  type="checkbox" 
                  checked={filters.columns.includes(2)}
                  onChange={() => handleToggleFilter('columns', 2)}
                  style={{ width: '16px', height: '16px', accentColor: '#0073e6', cursor: 'pointer' }}
                />
                2 Columns
              </label>
            </div>
          </div>

          {/* Filter 3: Style */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h4 style={{ fontSize: '0.875rem', fontWeight: '800', color: '#334155', marginBottom: '0.6rem' }}>Style</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {stylesList.map(st => (
                <label key={st} style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.55rem', cursor: 'pointer', userSelect: 'none' }}>
                  <input 
                    type="checkbox" 
                    checked={filters.style.includes(st)}
                    onChange={() => handleToggleFilter('style', st)}
                    style={{ width: '16px', height: '16px', accentColor: '#0073e6', cursor: 'pointer' }}
                  />
                  {st}
                </label>
              ))}
            </div>
          </div>

          {/* Filter 4: Occupation */}
          <div>
            <h4 style={{ fontSize: '0.875rem', fontWeight: '800', color: '#334155', marginBottom: '0.6rem' }}>Occupation</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {occupationsList.map(occ => (
                <label key={occ} style={{ fontSize: '0.85rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '0.55rem', cursor: 'pointer', userSelect: 'none' }}>
                  <input 
                    type="checkbox" 
                    checked={filters.occupation.includes(occ)}
                    onChange={() => handleToggleFilter('occupation', occ)}
                    style={{ width: '16px', height: '16px', accentColor: '#0073e6', cursor: 'pointer' }}
                  />
                  {occ}
                </label>
              ))}
            </div>
          </div>

        </aside>

        {/* Right Templates Grid Area */}
        <main>
          {/* Active Filter Chips & Status Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', flexWrap: 'wrap', gap: '0.75rem' }}>
            <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#64748b' }}>
              Showing <span style={{ color: '#0f172a', fontWeight: '900' }}>{filteredTemplates.length}</span> of {templatesDatabase.length} templates
            </div>

            {activeFilterCount > 0 && (
              <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', alignItems: 'center' }}>
                {filters.headshot.map(val => (
                  <span key={val} style={{ background: '#e0f2fe', color: '#0369a1', fontSize: '0.75rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    {val === 'with' ? 'With photo' : 'Without photo'}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => handleToggleFilter('headshot', val)} />
                  </span>
                ))}
                {filters.columns.map(val => (
                  <span key={val} style={{ background: '#f3e8ff', color: '#7e22ce', fontSize: '0.75rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    {val} Column{val > 1 ? 's' : ''}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => handleToggleFilter('columns', val)} />
                  </span>
                ))}
                {filters.style.map(val => (
                  <span key={val} style={{ background: '#dcfce7', color: '#15803d', fontSize: '0.75rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    {val}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => handleToggleFilter('style', val)} />
                  </span>
                ))}
                {filters.occupation.map(val => (
                  <span key={val} style={{ background: '#fef3c7', color: '#b45309', fontSize: '0.75rem', fontWeight: '700', padding: '0.2rem 0.6rem', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                    {val}
                    <X size={12} style={{ cursor: 'pointer' }} onClick={() => handleToggleFilter('occupation', val)} />
                  </span>
                ))}
                <button 
                  onClick={clearAllFilters}
                  style={{ background: 'none', border: 'none', color: '#dc2626', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', padding: '0.2rem 0.4rem' }}
                >
                  Reset
                </button>
              </div>
            )}
          </div>

          {filteredTemplates.length === 0 ? (
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #cbd5e1', padding: '3.5rem 2rem', textAlign: 'center', color: '#64748b' }}>
              <RefreshCw size={36} style={{ color: '#0073e6', marginBottom: '1rem' }} />
              <h3 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>No templates match your selected filters</h3>
              <p style={{ fontSize: '0.9rem', marginBottom: '1.25rem' }}>Try unchecking some filters or click reset below to see all designs.</p>
              <button 
                onClick={clearAllFilters}
                style={{
                  background: '#0073e6',
                  color: '#ffffff',
                  border: 'none',
                  padding: '0.65rem 1.5rem',
                  borderRadius: '20px',
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '2.5rem 2rem' }}>
              {filteredTemplates.map(tpl => {
                const isSelected = selectedTemplateId === tpl.id;
                const activeColor = templateColors[tpl.id] || tpl.defaultColor;
                const TemplateComp = componentMap[tpl.compKey] || ZetyCascade;

                const customData = {
                  ...resumeData,
                  customization: {
                    ...resumeData.customization,
                    themeColor: activeColor
                  }
                };

                return (
                  <div 
                    key={tpl.id}
                    onClick={() => handleSelectTemplate(tpl.id)}
                    style={{
                      background: '#ffffff',
                      border: isSelected ? '3px solid #0073e6' : '1px solid #cbd5e1',
                      borderRadius: '16px',
                      padding: '1.25rem',
                      cursor: 'pointer',
                      position: 'relative',
                      boxShadow: isSelected ? '0 12px 35px rgba(0, 115, 230, 0.25)' : '0 4px 15px rgba(0,0,0,0.05)',
                      transition: 'all 0.25s ease',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center'
                    }}
                  >
                    {/* RECOMMENDED Ribbon Banner */}
                    {tpl.isRecommended && (
                      <div 
                        style={{
                          position: 'absolute',
                          bottom: '65px',
                          right: '20px',
                          background: '#fecdd3',
                          color: '#e11d48',
                          fontSize: '0.65rem',
                          fontWeight: '900',
                          padding: '0.25rem 0.6rem',
                          borderRadius: '4px',
                          letterSpacing: '0.08em',
                          textTransform: 'uppercase',
                          boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                          zIndex: 10
                        }}
                      >
                        RECOMMENDED
                      </div>
                    )}

                    {/* Active Selected Checkmark */}
                    {isSelected && (
                      <div 
                        style={{
                          position: 'absolute',
                          top: '16px',
                          right: '16px',
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: '#0073e6',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          boxShadow: '0 4px 10px rgba(0,115,230,0.4)',
                          zIndex: 10
                        }}
                      >
                        <Check size={18} strokeWidth={3} />
                      </div>
                    )}

                    {/* Visual Document Mini Preview */}
                    <div 
                      style={{
                        width: '265px',
                        height: '375px',
                        background: '#ffffff',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        position: 'relative',
                        border: '1px solid #cbd5e1',
                        marginBottom: '0.85rem',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.06)'
                      }}
                    >
                      <div 
                        style={{
                          width: '794px',
                          transform: 'scale(0.333)',
                          transformOrigin: 'top left',
                          pointerEvents: 'none',
                          background: '#ffffff'
                        }}
                      >
                        <TemplateComp data={customData} />
                      </div>
                    </div>

                    {/* Color Swatch Circles Below Resume */}
                    <div style={{ display: 'flex', gap: '0.4rem', alignItems: 'center', margin: '0.25rem 0' }}>
                      {tpl.swatches.map((col) => (
                        <button
                          key={col}
                          type="button"
                          onClick={(e) => handleSetColor(tpl.id, col, e)}
                          style={{
                            width: '18px',
                            height: '18px',
                            borderRadius: '50%',
                            background: col,
                            border: activeColor === col ? '2px solid #0f172a' : 'none',
                            cursor: 'pointer',
                            padding: 0,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
                            transition: 'transform 0.15s ease',
                            transform: activeColor === col ? 'scale(1.25)' : 'scale(1)'
                          }}
                          title={`Select color ${col}`}
                        />
                      ))}
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </main>

      </div>

      {/* Bottom Footer Links */}
      <div style={{ textTransform: 'uppercase', fontSize: '0.75rem', fontWeight: '800', letterSpacing: '0.08em', color: '#334155', textAlign: 'center', padding: '3rem 1rem 3.5rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        <button onClick={() => openAboutPage('terms')} style={{ background: 'none', border: 'none', color: '#0f172a', fontWeight: '800', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.08em' }}>TERMS AND CONDITIONS</button>
        <span style={{ color: '#cbd5e1' }}>|</span>
        <button onClick={() => openAboutPage('privacy')} style={{ background: 'none', border: 'none', color: '#0f172a', fontWeight: '800', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.08em' }}>PRIVACY POLICY</button>
        <span style={{ color: '#cbd5e1' }}>|</span>
        <button onClick={() => openAboutPage('accessibility')} style={{ background: 'none', border: 'none', color: '#0f172a', fontWeight: '800', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.08em' }}>ACCESSIBILITY</button>
        <span style={{ color: '#cbd5e1' }}>|</span>
        <button onClick={() => openAboutPage('contact')} style={{ background: 'none', border: 'none', color: '#0f172a', fontWeight: '800', cursor: 'pointer', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '0.08em' }}>CONTACT US</button>
      </div>

      {/* Bottom Sticky Action Dock Bar */}
      <div 
        style={{
          position: 'fixed',
          bottom: 0,
          left: '240px',
          right: 0,
          height: '75px',
          background: '#ffffff',
          borderTop: '1px solid #e2e8f0',
          boxShadow: '0 -10px 30px rgba(0,0,0,0.08)',
          zIndex: 900,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          padding: '0 3rem',
          gap: '2rem'
        }}
      >
        <button 
          onClick={handleChooseLater}
          style={{
            background: 'none',
            border: 'none',
            color: '#0073e6',
            fontWeight: '800',
            fontSize: '1rem',
            cursor: 'pointer',
            textDecoration: 'underline'
          }}
        >
          Choose Later
        </button>

        <button 
          onClick={handleConfirmChoice}
          style={{
            background: selectedTemplateId ? '#ffb800' : '#e2e8f0',
            color: selectedTemplateId ? '#0f172a' : '#94a3b8',
            border: 'none',
            padding: '0.85rem 2.5rem',
            borderRadius: '30px',
            fontWeight: '900',
            fontSize: '1rem',
            cursor: 'pointer',
            boxShadow: selectedTemplateId ? '0 6px 20px rgba(255, 184, 0, 0.4)' : 'none',
            transition: 'all 0.2s ease'
          }}
        >
          Use this template
        </button>
      </div>

    </div>
  );
};
