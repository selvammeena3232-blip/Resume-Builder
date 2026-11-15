import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Search, X, HelpCircle } from 'lucide-react';

const faqs = [
  {
    id: 1,
    q: "Is Foliofy's resume builder ATS-compliant?",
    a: "Yes! All Foliofy templates use standard fonts, clear ATS section headers, and semantic structures designed to pass Applicant Tracking Systems (ATS) used by Fortune 500 employers."
  },
  {
    id: 2,
    q: "Can I download my resume as a PDF?",
    a: "Absolutely. You can click 'Print / Export PDF' in the builder toolbar anytime to save or print a pixel-perfect vector PDF document."
  },
  {
    id: 3,
    q: "How does the AI Content Suggestions feature work?",
    a: "Our AI assistant provides thousands of pre-written, HR-vetted bullet points and professional summaries across top industries. Just click 'AI Suggestions' to insert them in 1 click."
  },
  {
    id: 4,
    q: "Can I create an interactive portfolio website too?",
    a: "Yes! Foliofy includes a dual-mode engine allowing you to convert your resume data into an interactive single-page personal portfolio website with a live contact form."
  },
  {
    id: 5,
    q: "Is Foliofy free to build and customize resumes?",
    a: "Yes! Foliofy provides full access to resume templates, live customization, ATS score checking, and PDF exports without hidden paywalls."
  },
  {
    id: 6,
    q: "How do I customize template colors and font styles?",
    a: "In the Resume Builder workspace, use the Customization toolbar to select theme colors, Google Font pairings (Inter, Plus Jakarta Sans, Outfit, Fira Code), line spacing, and margins."
  },
  {
    id: 7,
    q: "Can I import or backup my resume data as JSON?",
    a: "Yes! You can backup your entire profile data by exporting a JSON file, or restore it anytime using the 'Import JSON' feature in the builder."
  },
  {
    id: 8,
    q: "Is my personal information stored securely?",
    a: "Your data is stored locally in your browser session. We do not sell your personal information or share your resume contents with third parties."
  }
];

export const ZetyFaqSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [openIdx, setOpenIdx] = useState(null);

  const toggleFaq = (idx) => {
    setOpenIdx(prev => prev === idx ? null : idx);
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section style={{ padding: '4.5rem 2rem', background: 'var(--bg-primary)', borderTop: '1px solid var(--border-color)' }}>
      <div style={{ maxWidth: '850px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2.2rem', fontWeight: '900', color: 'var(--text-main)', marginBottom: '0.5rem', letterSpacing: '-0.02em' }}>
            Frequently Asked Questions
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.75rem' }}>
            Everything you need to know about building your resume with Foliofy.
          </p>

          {/* Interactive Search Bar */}
          <div 
            style={{
              position: 'relative',
              maxWidth: '560px',
              margin: '0 auto'
            }}
          >
            <Search 
              size={18} 
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--accent-primary)',
                pointerEvents: 'none'
              }} 
            />

            <input 
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search questions (e.g., ATS, PDF, AI, Portfolio...)"
              style={{
                width: '100%',
                padding: '0.85rem 2.8rem 0.85rem 2.75rem',
                borderRadius: '30px',
                border: '1.5px solid var(--border-color)',
                background: 'var(--bg-card)',
                color: 'var(--text-main)',
                fontSize: '0.925rem',
                outline: 'none',
                boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.2s ease'
              }}
            />

            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{
                  position: 'absolute',
                  right: '16px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                title="Clear search"
              >
                <X size={16} />
              </button>
            )}
          </div>
        </div>

        {/* FAQ Accordion Items */}
        {filteredFaqs.length === 0 ? (
          <div 
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--border-color)',
              borderRadius: '16px',
              padding: '3rem 2rem',
              textAlign: 'center',
              color: 'var(--text-muted)'
            }}
          >
            <HelpCircle size={40} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.4rem' }}>
              No matching questions found
            </h3>
            <p style={{ fontSize: '0.875rem', marginBottom: '1.25rem' }}>
              We couldn't find any questions matching "{searchQuery}". Try searching for popular topics like "ATS", "PDF", or "Portfolio".
            </p>
            <button 
              onClick={() => setSearchQuery('')}
              style={{
                background: 'var(--accent-primary)',
                color: '#ffffff',
                border: 'none',
                padding: '0.55rem 1.25rem',
                borderRadius: '20px',
                fontWeight: '700',
                fontSize: '0.85rem',
                cursor: 'pointer'
              }}
            >
              Clear Search Query
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {filteredFaqs.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div 
                  key={faq.id}
                  style={{
                    background: 'var(--bg-card)',
                    border: isOpen ? '1px solid var(--accent-primary)' : '1px solid var(--border-color)',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    boxShadow: isOpen ? '0 6px 20px rgba(0, 115, 230, 0.12)' : '0 4px 15px rgba(0, 0, 0, 0.03)',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div 
                    onClick={() => toggleFaq(idx)}
                    style={{
                      padding: '1.25rem 1.5rem',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      fontWeight: '800',
                      fontSize: '1rem',
                      color: 'var(--text-main)'
                    }}
                  >
                    <span>{faq.q}</span>
                    {isOpen ? <ChevronUp size={20} style={{ color: 'var(--accent-primary)' }} /> : <ChevronDown size={20} style={{ color: 'var(--text-muted)' }} />}
                  </div>

                  {isOpen && (
                    <div style={{ padding: '0 1.5rem 1.25rem 1.5rem', color: 'var(--text-muted)', fontSize: '0.925rem', lineHeight: '1.6', borderTop: '1px solid var(--border-color)', paddingTop: '0.85rem', marginTop: '0.25rem' }}>
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
};
