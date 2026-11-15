import React from 'react';

export const ZetyTrustBar = () => {
  return (
    <section style={{ padding: '2rem', background: '#0a0f1d', borderBottom: '1px solid var(--border-color)', textAlign: 'center' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontSize: '0.8rem', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--text-subtle)', marginBottom: '1.25rem' }}>
          As Featured & Mentioned In Premier Global Media
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '3rem', flexWrap: 'wrap', opacity: 0.7 }}>
          <span style={{ fontSize: '1.25rem', fontWeight: '900', letterSpacing: '-0.03em', color: '#cbd5e1' }}>FORBES</span>
          <span style={{ fontSize: '1.25rem', fontWeight: '800', fontFamily: 'serif', color: '#cbd5e1' }}>THE WALL STREET JOURNAL</span>
          <span style={{ fontSize: '1.25rem', fontWeight: '900', color: '#cbd5e1' }}>B B C</span>
          <span style={{ fontSize: '1.25rem', fontWeight: '800', fontStyle: 'italic', color: '#cbd5e1' }}>Business Insider</span>
          <span style={{ fontSize: '1.25rem', fontWeight: '900', color: '#cbd5e1' }}>FINANCIAL TIMES</span>
        </div>
      </div>
    </section>
  );
};
