import React from 'react';

export const ZetyPartnerBanner = () => {
  return (
    <div style={{ background: '#dbeafe', color: '#1e3a8a', padding: '0.6rem 1rem', textAlign: 'center', fontSize: '0.875rem', fontWeight: '600', borderBottom: '1px solid #bfdbfe', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
      <span>Trusted partner of</span>
      <span style={{ fontWeight: '900', letterSpacing: '0.05em', color: '#1e40af', fontSize: '0.95rem' }}>MONSTER</span>
      <span style={{ color: '#3b82f6', fontWeight: '400' }}>&</span>
      <span style={{ fontWeight: '900', color: '#1e3a8a', display: 'inline-flex', alignItems: 'center', gap: '0.2rem' }}>
        <span style={{ background: '#1e3a8a', color: '#ffffff', padding: '0px 4px', borderRadius: '3px', fontSize: '0.75rem' }}>C</span> CareerBuilder®
      </span>
    </div>
  );
};
