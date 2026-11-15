import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { ShieldCheck, CheckCircle2, AlertCircle, X } from 'lucide-react';

export const AtsScoreModal = () => {
  const { atsAnalysis, isAtsModalOpen, setIsAtsModalOpen } = useResume();

  if (!isAtsModalOpen) return null;

  const { score, badge, badgeColor, checks } = atsAnalysis;

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem' }}>
      <div style={{ background: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '16px', width: '100%', maxWidth: '580px', padding: '1.75rem', position: 'relative', boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)', animation: 'fadeIn 0.25s ease' }}>
        
        {/* Close Button */}
        <button 
          onClick={() => setIsAtsModalOpen(false)}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: 'transparent', border: 'none', color: 'var(--text-muted)', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
          <div style={{ background: 'rgba(99, 102, 241, 0.15)', color: 'var(--accent-primary)', padding: '0.6rem', borderRadius: '12px' }}>
            <ShieldCheck size={26} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.35rem', fontWeight: '800', margin: 0 }}>ATS Resume Health Audit</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: 0 }}>Real-time ATS parser compatibility & keyword optimization score.</p>
          </div>
        </div>

        {/* Score Card */}
        <div style={{ background: 'var(--bg-primary)', border: `1px solid ${badgeColor}40`, borderRadius: '12px', padding: '1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600' }}>Overall Score</div>
            <div style={{ fontSize: '2.5rem', fontWeight: '900', color: badgeColor, lineHeight: '1.1' }}>
              {score}<span style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>/100</span>
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <span style={{ background: badgeColor + '20', color: badgeColor, border: `1px solid ${badgeColor}40`, padding: '0.4rem 0.9rem', borderRadius: '20px', fontSize: '0.85rem', fontWeight: '700' }}>
              {badge}
            </span>
          </div>
        </div>

        {/* Breakdown Checklist */}
        <h4 style={{ fontSize: '0.9rem', fontWeight: '700', textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem' }}>
          Optimization Checklist
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', maxHeight: '280px', overflowY: 'auto', paddingRight: '0.4rem' }}>
          {checks.map((chk, index) => (
            <div key={index} style={{ background: 'var(--bg-card)', border: '1px solid var(--border-color)', borderRadius: '10px', padding: '0.85rem 1rem', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
              {chk.passed ? (
                <CheckCircle2 size={18} style={{ color: '#10b981', flexShrink: 0, marginTop: '2px' }} />
              ) : (
                <AlertCircle size={18} style={{ color: '#f59e0b', flexShrink: 0, marginTop: '2px' }} />
              )}
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '600', fontSize: '0.875rem' }}>
                  <span>{chk.title}</span>
                  <span style={{ color: chk.passed ? '#10b981' : '#f59e0b' }}>
                    +{chk.scoreAwarded}/{chk.maxScore}
                  </span>
                </div>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: '0.25rem 0 0 0' }}>
                  {chk.tip}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '1.5rem', textAlign: 'right' }}>
          <button className="btn btn-primary" onClick={() => setIsAtsModalOpen(false)}>
            Got It, Return to Editor
          </button>
        </div>
      </div>
    </div>
  );
};
