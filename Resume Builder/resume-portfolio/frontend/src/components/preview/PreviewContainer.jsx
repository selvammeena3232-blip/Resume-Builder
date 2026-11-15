import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { ModernResume } from './templates/ModernResume';
import { CreativeResume } from './templates/CreativeResume';
import { ExecutiveResume } from './templates/ExecutiveResume';
import { ZetyCascade } from './templates/ZetyCascade';
import { ZetyPrimo } from './templates/ZetyPrimo';
import { ZetyCubic } from './templates/ZetyCubic';
import { ZetyCrisp } from './templates/ZetyCrisp';
import { ZetyDiamond } from './templates/ZetyDiamond';
import { ZetyVibes } from './templates/ZetyVibes';
import { PortfolioWebsite } from './templates/PortfolioWebsite';
import { PortfolioMinimal } from './templates/PortfolioMinimal';
import { PortfolioCreative } from './templates/PortfolioCreative';
import { ZoomIn, ZoomOut, Sparkles } from 'lucide-react';

export const PreviewContainer = () => {
  const { resumeData, activeTab, portfolioTemplate } = useResume();
  const [zoomLevel, setZoomLevel] = useState(100);

  const { activeTemplate } = resumeData.customization;

  const handleZoomIn = () => setZoomLevel(prev => Math.min(prev + 10, 140));
  const handleZoomOut = () => setZoomLevel(prev => Math.max(prev - 10, 60));

  const renderTemplate = () => {
    if (activeTab === 'portfolio') {
      if (portfolioTemplate === 'minimal') return <PortfolioMinimal data={resumeData} />;
      if (portfolioTemplate === 'creative') return <PortfolioCreative data={resumeData} />;
      return <PortfolioWebsite data={resumeData} />;
    }

    switch (activeTemplate) {
      case 'cascade':
        return <ZetyCascade data={resumeData} />;
      case 'primo':
        return <ZetyPrimo data={resumeData} />;
      case 'cubic':
        return <ZetyCubic data={resumeData} />;
      case 'crisp':
        return <ZetyCrisp data={resumeData} />;
      case 'diamond':
        return <ZetyDiamond data={resumeData} />;
      case 'vibes':
        return <ZetyVibes data={resumeData} />;
      case 'creative':
        return <CreativeResume data={resumeData} />;
      case 'executive':
        return <ExecutiveResume data={resumeData} />;
      case 'portfolio':
        return <PortfolioWebsite data={resumeData} />;
      case 'modern':
      default:
        return <ModernResume data={resumeData} />;
    }
  };

  return (
    <main className="preview-panel">
      {/* Top Toolbar */}
      <div className="preview-toolbar">
        <div className="preview-title">
          <Sparkles size={16} style={{ color: 'var(--accent-primary)' }} />
          <span>
            {activeTab === 'portfolio' ? 'Live Interactive Portfolio Website' : `Live Preview (${(activeTemplate || 'cascade').toUpperCase()})`}
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Zoom Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', background: 'var(--bg-secondary)', padding: '2px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-color)' }}>
            <button className="btn-icon" style={{ border: 'none' }} onClick={handleZoomOut} title="Zoom Out">
              <ZoomOut size={14} />
            </button>
            <span style={{ fontSize: '0.75rem', padding: '0 0.4rem', fontWeight: '600', minWidth: '40px', textAlign: 'center' }}>
              {zoomLevel}%
            </span>
            <button className="btn-icon" style={{ border: 'none' }} onClick={handleZoomIn} title="Zoom In">
              <ZoomIn size={14} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Document / Website Canvas */}
      <div className="preview-body">
        <div 
          style={{
            transform: `scale(${zoomLevel / 100})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease',
            maxWidth: '100%',
            width: 'auto'
          }}
        >
          {renderTemplate()}
        </div>
      </div>
    </main>
  );
};
