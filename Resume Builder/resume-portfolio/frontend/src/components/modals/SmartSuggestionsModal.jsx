import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { jobRolesData } from '../../data/zetySuggestions';
import { Sparkles, Plus, X, Briefcase } from 'lucide-react';

export const SmartSuggestionsModal = () => {
  const { isSuggestionsModalOpen, setIsSuggestionsModalOpen, applySuggestion } = useResume();
  const [selectedRoleIndex, setSelectedRoleIndex] = useState(0);

  if (!isSuggestionsModalOpen) return null;

  const currentRoleObj = jobRolesData[selectedRoleIndex];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', width: '100%', maxWidth: '680px', padding: '1.75rem', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', animation: 'fadeIn 0.25s ease' }}>
        
        {/* Close Button */}
        <button 
          onClick={() => setIsSuggestionsModalOpen(false)}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
          <div style={{ background: 'var(--gradient-primary)', color: '#fff', padding: '0.6rem', borderRadius: '12px' }}>
            <Sparkles size={24} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', margin: 0 }}>Smart AI Content Generator</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Choose pre-written, high-impact bullet points and summaries tailored to your target role.</p>
          </div>
        </div>

        {/* Role Selector Tabs */}
        <div style={{ display: 'flex', gap: '0.5rem', overflowX: 'auto', paddingBottom: '0.5rem', marginBottom: '1.25rem' }}>
          {jobRolesData.map((r, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedRoleIndex(idx)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '20px',
                fontSize: '0.8rem',
                fontWeight: '600',
                whiteSpace: 'nowrap',
                border: '1px solid',
                borderColor: selectedRoleIndex === idx ? 'var(--accent-primary)' : 'var(--border-color)',
                background: selectedRoleIndex === idx ? 'var(--accent-primary)' : 'var(--bg-primary)',
                color: selectedRoleIndex === idx ? '#ffffff' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'var(--transition-fast)'
              }}
            >
              {r.role}
            </button>
          ))}
        </div>

        {/* Content Options */}
        <div style={{ maxHeight: '350px', overflowY: 'auto', paddingRight: '0.4rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {/* Summaries */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
              Suggested Summaries
            </h4>
            {currentRoleObj.summaries.map((sumText, sIdx) => (
              <div 
                key={sIdx}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.85rem 1rem', marginBottom: '0.5rem', fontSize: '0.85rem', lineHeight: '1.5', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}
              >
                <span>{sumText}</span>
                <button 
                  className="btn btn-primary" 
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', flexShrink: 0 }}
                  onClick={() => applySuggestion(sumText)}
                >
                  <Plus size={13} /> Insert
                </button>
              </div>
            ))}
          </div>

          {/* Bullet Points */}
          <div>
            <h4 style={{ fontSize: '0.85rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--accent-primary)', marginBottom: '0.5rem' }}>
              Suggested Work Accomplishments
            </h4>
            {currentRoleObj.experienceBullets.map((bulletText, bIdx) => (
              <div 
                key={bIdx}
                style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.75rem 1rem', marginBottom: '0.5rem', fontSize: '0.85rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}
              >
                <span>• {bulletText}</span>
                <button 
                  className="btn btn-secondary" 
                  style={{ padding: '0.35rem 0.75rem', fontSize: '0.75rem', flexShrink: 0 }}
                  onClick={() => applySuggestion(bulletText)}
                >
                  <Plus size={13} /> Add Bullet
                </button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
