import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Layers, Sparkles, Award, Building, Layout, Globe, Check, Diamond, Flame, Briefcase, ArrowRight } from 'lucide-react';

const sampleFeaturedTemplates = [
  {
    id: 'cascade',
    name: 'Foliofy Cascade',
    category: 'Popular',
    desc: 'Flagship 2-column layout with rating indicators, bold sidebar header, and clean section flow.',
    badge: '#1 Rated',
    icon: <Layers size={22} />,
    color: '#0073e6'
  },
  {
    id: 'primo',
    name: 'Foliofy Primo',
    category: 'Modern',
    desc: 'Modern timeline connector layout with icon badges and colored header divide.',
    badge: 'Trending',
    icon: <Sparkles size={22} />,
    color: '#8b5cf6'
  },
  {
    id: 'cubic',
    name: 'Foliofy Cubic',
    category: 'Corporate',
    desc: 'Sleek 3-tone boxed card layout designed for technology, finance, and engineering roles.',
    badge: 'Corporate',
    icon: <Award size={22} />,
    color: '#10b981'
  }
];

export const ZetyTemplateShowcase = () => {
  const { startBuildingWithTemplate, resumeData, setViewMode, setActiveTab } = useResume();
  const currentTemplate = resumeData.customization.activeTemplate;

  const navigateToTemplatesPage = () => {
    setViewMode('builder');
    setActiveTab('templates');
  };

  return (
    <section id="templates-section" style={{ padding: '4.5rem 2rem', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}>
      <div style={{ maxWidth: '1150px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2.4rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
            Recruiter-Approved <span style={{ color: 'var(--zety-blue)' }}>Resume & Portfolio Templates</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto' }}>
            Designed by career experts and optimized for 100% ATS parser accuracy.
          </p>
        </div>

        {/* Templates Grid (3 Featured Sample Cards) */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
          {sampleFeaturedTemplates.map((tpl) => {
            const isSelected = currentTemplate === tpl.id;
            return (
              <div 
                key={tpl.id}
                onClick={() => startBuildingWithTemplate(tpl.id)}
                style={{
                  background: 'var(--bg-secondary)',
                  border: isSelected ? `2px solid ${tpl.color}` : '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '1.75rem',
                  cursor: 'pointer',
                  transition: 'var(--transition-smooth)',
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  boxShadow: isSelected ? `0 10px 30px -10px ${tpl.color}40` : 'var(--glass-shadow)'
                }}
              >
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: tpl.color + '20', color: tpl.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      {tpl.icon}
                    </div>
                    <span style={{ fontSize: '0.75rem', fontWeight: '800', background: tpl.color + '20', color: tpl.color, padding: '0.25rem 0.65rem', borderRadius: '12px' }}>
                      {tpl.badge}
                    </span>
                  </div>

                  <h3 style={{ fontSize: '1.25rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--text-main)' }}>
                    {tpl.name}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '1.5rem' }}>
                    {tpl.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* View All Templates CTA Button */}

      </div>
    </section>
  );
};
