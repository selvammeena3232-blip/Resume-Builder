import React from 'react';
import { useResume } from './context/ResumeContext';

// Layout & Navigation
import { Sidebar } from './components/layout/Sidebar';

// Landing Page Components
import { ZetyPartnerBanner } from './components/landing/ZetyPartnerBanner';
import { ZetyLandingHero } from './components/landing/ZetyLandingHero';
import { ZetyFeaturesGrid } from './components/landing/ZetyFeaturesGrid';
import { ZetyTemplateShowcase } from './components/landing/ZetyTemplateShowcase';
import { ZetyTestimonials } from './components/landing/ZetyTestimonials';
import { ZetyFaqSection } from './components/landing/ZetyFaqSection';
import { ZetyFooter } from './components/landing/ZetyFooter';

// Builder Workspace Components
import { ZetyWizardHeader } from './components/builder/ZetyWizardHeader';
import { EditorPanel } from './components/editor/EditorPanel';
import { PortfolioEditorPanel } from './components/editor/PortfolioEditorPanel';
import { PreviewContainer } from './components/preview/PreviewContainer';
import { TemplateSelectorView } from './components/preview/TemplateSelectorView';
import { PortfolioThemesView } from './components/preview/PortfolioThemesView';
import { PortfolioWebsite } from './components/preview/templates/PortfolioWebsite';

// Overlays & Modals
import { AtsScoreModal } from './components/modals/AtsScoreModal';
import { SmartSuggestionsModal } from './components/modals/SmartSuggestionsModal';
import { ResumeOnboardingModal } from './components/modals/ResumeOnboardingModal';
import { AuthPage } from './components/auth/AuthPage';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { AboutPage } from './components/about/AboutPage';
import { ChoicePage } from './components/landing/ChoicePage';

export function App() {
  const { viewMode, activeTab, resumeData, openAuthModal } = useResume();

  if (viewMode === 'choice') {
    return (
      <div>
        <main style={{ width: '100%', minHeight: '100vh' }}>
          <ChoicePage />
        </main>
        <AuthPage />
      </div>
    );
  }

  if (viewMode === 'landing') {
    return (
      <div>
        <Sidebar />
        <main className="landing-main">
          <ZetyLandingHero />
          <ZetyFeaturesGrid />
          <ZetyTemplateShowcase />
          <ZetyTestimonials />
          <ZetyFaqSection />
          <ZetyFooter />
        </main>
        <AtsScoreModal />
        <SmartSuggestionsModal />
        <ResumeOnboardingModal />
        <AuthPage />
      </div>
    );
  }

  if (viewMode === 'about') {
    return (
      <div>
        <Sidebar />
        <main className="landing-main">
          <AboutPage />
        </main>
        <AtsScoreModal />
        <SmartSuggestionsModal />
        <AuthPage />
      </div>
    );
  }

  if (viewMode === 'admin') {
    return (
      <div className="app-layout">
        <Sidebar />
        <main className="app-main-content main-md">
          <AdminDashboard />
        </main>
        <AuthPage />
      </div>
    );
  }

  if (viewMode === 'portfolio' || activeTab === 'portfolio' || activeTab === 'portfolio-themes' || activeTab === 'themes' || activeTab === 'live-portfolio') {
    return (
      <div className="app-layout">
        <Sidebar />
        <main className="app-main-content main-md">
          {activeTab === 'portfolio-themes' || activeTab === 'themes' ? (
            <PortfolioThemesView />
          ) : activeTab === 'live-portfolio' ? (
            <div style={{ padding: '2rem', display: 'flex', justifyContent: 'center', background: 'var(--bg-main)', minHeight: '100vh', overflowY: 'auto' }}>
              <PortfolioWebsite data={resumeData} />
            </div>
          ) : (
            <div className="main-workarea">
              <EditorPanel />
              <PreviewContainer />
            </div>
          )}
        </main>
        <AtsScoreModal />
        <SmartSuggestionsModal />
        <ResumeOnboardingModal />
        <AuthPage />
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar />
      <main className="app-main-content main-md">
        {activeTab === 'templates' ? (
          <TemplateSelectorView />
        ) : (
          <div className="main-workarea">
            <EditorPanel />
            <PreviewContainer />
          </div>
        )}
      </main>
      <AtsScoreModal />
      <SmartSuggestionsModal />
      <ResumeOnboardingModal />
      <AuthPage />
    </div>
  );
}

export default App;
