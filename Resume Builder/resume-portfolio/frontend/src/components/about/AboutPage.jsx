import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { 
  Info, 
  FileText, 
  ShieldCheck, 
  Lock, 
  Accessibility, 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  CheckCircle2, 
  Sparkles, 
  ChevronRight, 
  Award, 
  Users, 
  Zap,
  HelpCircle
} from 'lucide-react';

export const AboutPage = () => {
  const { aboutTab, setAboutTab, setViewMode, setActiveTab } = useResume();

  // Contact Form Local State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    category: 'General Inquiry',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleContactSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
      setFormData({
        name: '',
        email: '',
        category: 'General Inquiry',
        subject: '',
        message: ''
      });
    }, 800);
  };

  const navTabs = [
    { id: 'about', label: 'About Foliofy', icon: Info },
    { id: 'terms', label: 'Terms & Conditions', icon: FileText },
    { id: 'privacy', label: 'Privacy Policy', icon: Lock },
    { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
    { id: 'contact', label: 'Contact Us', icon: Mail }
  ];

  return (
    <div style={{ padding: '2.5rem 2rem 5rem 2rem', maxWidth: '1100px', margin: '0 auto', color: 'var(--text-main)' }}>
      
      {/* Header Banner */}
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          background: 'rgba(0, 115, 230, 0.08)', 
          color: 'var(--accent-primary)', 
          padding: '0.4rem 1rem', 
          borderRadius: '20px', 
          fontSize: '0.85rem', 
          fontWeight: '700',
          marginBottom: '1rem' 
        }}>
          <Sparkles size={16} />
          <span>Foliofy Information Hub</span>
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '900', letterSpacing: '-0.02em', marginBottom: '0.75rem' }}>
          About & Legal Portal
        </h1>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '650px', margin: '0 auto', lineHeight: '1.6' }}>
          Everything you need to know about Foliofy's mission, platform policies, data privacy commitments, accessibility standards, and support options.
        </p>
      </div>

      {/* Navigation Pills */}
      <div 
        style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '0.75rem', 
          marginBottom: '3rem', 
          flexWrap: 'wrap',
          background: 'var(--bg-card)',
          padding: '0.75rem',
          borderRadius: '16px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.03)'
        }}
      >
        {navTabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = aboutTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setAboutTab(tab.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                padding: '0.75rem 1.4rem',
                borderRadius: '12px',
                border: 'none',
                background: isActive ? 'var(--accent-primary)' : 'transparent',
                color: isActive ? '#ffffff' : 'var(--text-muted)',
                fontWeight: isActive ? '800' : '600',
                fontSize: '0.925rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isActive ? '0 4px 15px rgba(0, 115, 230, 0.3)' : 'none'
              }}
            >
              <Icon size={18} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div 
        style={{ 
          background: 'var(--bg-card)', 
          border: '1px solid var(--border-color)', 
          borderRadius: '20px', 
          padding: '3rem 2.5rem',
          boxShadow: '0 8px 30px rgba(0,0,0,0.04)'
        }}
      >

        {/* TAB 1: ABOUT FOLIOFY */}
        {aboutTab === 'about' && (
          <div>
            <div style={{ marginBottom: '3rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.8rem', fontWeight: '900', marginBottom: '1rem', color: 'var(--text-main)' }}>
                Empowering Job Seekers Worldwide
              </h2>
              <p style={{ fontSize: '1.05rem', color: 'var(--text-muted)', lineHeight: '1.7', maxWidth: '800px', margin: '0 auto' }}>
                Foliofy was created with a single objective: to eliminate the friction in building professional, ATS-compliant resumes and interactive online portfolios. Our platform combines HR-validated resume structures with modern web tech so job seekers land more interviews with less hassle.
              </p>
            </div>

            {/* Platform Highlights Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3.5rem' }}>
              
              <div style={{ background: 'var(--bg-primary)', padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(0, 115, 230, 0.1)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <ShieldCheck size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.5rem' }}>100% ATS Compliant</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Every template is standard-font structured, scannable by HR software, and guaranteed to pass Applicant Tracking Systems without missing sections.
                </p>
              </div>

              <div style={{ background: 'var(--bg-primary)', padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Zap size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.5rem' }}>Dual Resume & Portfolio Engine</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Easily convert your resume data into an interactive single-page personal web portfolio with a live contact form with 1 click.
                </p>
              </div>

              <div style={{ background: 'var(--bg-primary)', padding: '1.75rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <Sparkles size={22} />
                </div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.5rem' }}>Smart AI Suggestions</h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.6' }}>
                  Access thousands of pre-written, HR-vetted bullet points tailored to your role to fast-track your job application process.
                </p>
              </div>

            </div>

            {/* Statistics Banner */}
            <div style={{ background: 'linear-gradient(135deg, #0073e6 0%, #004bb5 100%)', borderRadius: '18px', padding: '2.5rem', color: '#ffffff', textAlign: 'center', marginBottom: '3rem' }}>
              <h3 style={{ fontSize: '1.4rem', fontWeight: '900', marginBottom: '2rem' }}>Foliofy Impact in Numbers</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '2rem' }}>
                <div>
                  <div style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '0.25rem' }}>50,000+</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Resumes Generated</div>
                </div>
                <div>
                  <div style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '0.25rem' }}>99.4%</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>ATS Pass Rate</div>
                </div>
                <div>
                  <div style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '0.25rem' }}>12+</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Designer Templates</div>
                </div>
                <div>
                  <div style={{ fontSize: '2.2rem', fontWeight: '900', marginBottom: '0.25rem' }}>0</div>
                  <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Hidden Fees / Paywalls</div>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div style={{ textAlign: 'center' }}>
              <button 
                onClick={() => { setViewMode('builder'); setActiveTab('editor'); }}
                style={{
                  background: '#ffb800',
                  color: '#0f172a',
                  border: 'none',
                  padding: '0.9rem 2.5rem',
                  borderRadius: '30px',
                  fontWeight: '900',
                  fontSize: '1rem',
                  cursor: 'pointer',
                  boxShadow: '0 6px 20px rgba(255, 184, 0, 0.4)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem'
                }}
              >
                <span>Build My Resume Now</span>
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        )}

        {/* TAB 2: TERMS AND CONDITIONS */}
        {aboutTab === 'terms' && (
          <div style={{ lineHeight: '1.8' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '900', marginBottom: '1rem' }}>Terms & Conditions</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '2rem' }}>
              Last Updated: January 1, 2026. Please read these terms carefully before using Foliofy services.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', color: 'var(--text-main)' }}>
              
              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--accent-primary)' }}>
                  1. Acceptance of Terms
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
                  By accessing or using Foliofy, you agree to be bound by these Terms and Conditions. If you do not agree to these terms, you may not access or use the application or services provided.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--accent-primary)' }}>
                  2. User Account & Security
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
                  Users are responsible for maintaining the confidentiality of their credentials and for all activities performed under their account. Foliofy provides local browser storage as well as cloud synchronization for registered members.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--accent-primary)' }}>
                  3. Intellectual Property Rights
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
                  All template layouts, code, branding, logos, and UI designs contained within Foliofy are the sole property of Foliofy. Users retain 100% ownership of the personal data, work history, and resume content they enter into the system.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--accent-primary)' }}>
                  4. Acceptable Use Policy
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
                  You agree not to misuse the service, submit fraudulent application information, upload malicious scripts, or reverse engineer any portion of the Foliofy platform.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--accent-primary)' }}>
                  5. Service Modifications & Warranties
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
                  Foliofy is provided on an "as is" and "as available" basis. We reserve the right to update template offerings, add features, or modify services to improve user experience.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* TAB 3: PRIVACY POLICY */}
        {aboutTab === 'privacy' && (
          <div style={{ lineHeight: '1.8' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '900', marginBottom: '1rem' }}>Privacy Policy</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '2rem' }}>
              Last Updated: January 1, 2026. Your privacy is paramount at Foliofy.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem', color: 'var(--text-main)' }}>
              
              <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '1.25rem', borderRadius: '12px', border: '1px solid rgba(16, 185, 129, 0.2)', display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <Lock size={28} style={{ color: '#10b981', flexShrink: 0 }} />
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: '800', color: '#10b981', marginBottom: '0.2rem' }}>Zero Data Selling Guarantee</h4>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-muted)', margin: 0 }}>
                    We never sell, rent, or trade your personal resume data, contact info, or work experience to third-party recruiters or advertisers.
                  </p>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--accent-primary)' }}>
                  1. Information We Collect
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
                  We collect information you directly provide when filling out your resume fields (e.g., name, email, phone number, employment history, education, skills).
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--accent-primary)' }}>
                  2. Local Storage & Security
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
                  Your active resume drafts are stored securely in your browser's Local Storage for fast access. When logged into an account, data is transmitted using encrypted HTTPS connections to our secure database.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--accent-primary)' }}>
                  3. Cookies & Analytics
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
                  We use essential session cookies strictly to maintain user authentication and store template preference themes.
                </p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--accent-primary)' }}>
                  4. Your Data Deletion Rights
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem' }}>
                  You hold full control over your data. You can clear your stored resume content anytime using the "Reset Profile" button in the builder workspace.
                </p>
              </div>

            </div>
          </div>
        )}

        {/* TAB 4: ACCESSIBILITY */}
        {aboutTab === 'accessibility' && (
          <div style={{ lineHeight: '1.8' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: '900', marginBottom: '1rem' }}>Accessibility Commitment</h2>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '2rem' }}>
              Foliofy is dedicated to providing an inclusive platform accessible to all users, regardless of visual, auditory, or physical ability.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2.5rem' }}>
              
              <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--accent-primary)' }}>
                  WCAG 2.1 AA Standards
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  Our user interfaces adhere to Web Content Accessibility Guidelines (WCAG) 2.1 Level AA color contrast ratio and typography sizing.
                </p>
              </div>

              <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--accent-primary)' }}>
                  Keyboard Navigation
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  All interactive builder controls, inputs, modals, and navigation buttons support full tabbed keyboard control.
                </p>
              </div>

              <div style={{ background: 'var(--bg-primary)', padding: '1.5rem', borderRadius: '14px', border: '1px solid var(--border-color)' }}>
                <h3 style={{ fontSize: '1.05rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--accent-primary)' }}>
                  Screen Reader Support
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                  We implement semantic HTML5 markup, ARIA labels, and descriptive button titles across all editor panels.
                </p>
              </div>

            </div>

            <div style={{ background: 'rgba(0, 115, 230, 0.06)', padding: '1.5rem', borderRadius: '14px', border: '1px solid rgba(0, 115, 230, 0.15)' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: '800', marginBottom: '0.4rem', color: 'var(--accent-primary)' }}>
                Accessibility Feedback
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', margin: 0 }}>
                If you encounter any accessibility barrier or require assistance, please contact our support team via the <strong style={{ color: 'var(--text-main)', cursor: 'pointer' }} onClick={() => setAboutTab('contact')}>Contact Us</strong> tab. We welcome your feedback!
              </p>
            </div>
          </div>
        )}

        {/* TAB 5: CONTACT US */}
        {aboutTab === 'contact' && (
          <div>
            <div style={{ marginBottom: '2.5rem' }}>
              <h2 style={{ fontSize: '1.6rem', fontWeight: '900', marginBottom: '0.5rem' }}>Contact Us</h2>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Have questions, feature requests, or need help with your resume? We're here for you!
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '3rem' }}>
              
              {/* Interactive Contact Form */}
              <div>
                {submittedSuccess ? (
                  <div style={{ background: 'rgba(16, 185, 129, 0.08)', border: '1.5px solid #10b981', padding: '2.5rem', borderRadius: '16px', textAlign: 'center' }}>
                    <CheckCircle2 size={48} style={{ color: '#10b981', marginBottom: '1rem' }} />
                    <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: 'var(--text-main)', marginBottom: '0.5rem' }}>
                      Message Sent Successfully!
                    </h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.925rem', marginBottom: '1.5rem' }}>
                      Thank you for reaching out. Our support team has received your message and will respond within 24 business hours.
                    </p>
                    <button 
                      onClick={() => setSubmittedSuccess(false)}
                      style={{
                        background: 'var(--accent-primary)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.65rem 1.5rem',
                        borderRadius: '20px',
                        fontWeight: '700',
                        fontSize: '0.875rem',
                        cursor: 'pointer'
                      }}
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleContactSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Your Name *</label>
                        <input 
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="John Doe"
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-primary)',
                            color: 'var(--text-main)',
                            fontSize: '0.9rem',
                            outline: 'none'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Email Address *</label>
                        <input 
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="john@example.com"
                          style={{
                            width: '100%',
                            padding: '0.75rem 1rem',
                            borderRadius: '10px',
                            border: '1px solid var(--border-color)',
                            background: 'var(--bg-primary)',
                            color: 'var(--text-main)',
                            fontSize: '0.9rem',
                            outline: 'none'
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Category</label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: '10px',
                          border: '1px solid var(--border-color)',
                          background: 'var(--bg-primary)',
                          color: 'var(--text-main)',
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}
                      >
                        <option value="General Inquiry">General Inquiry</option>
                        <option value="Technical Support">Technical Support</option>
                        <option value="Template Feedback">Template Feedback</option>
                        <option value="Privacy & Data">Privacy & Data</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Subject</label>
                      <input 
                        type="text"
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        placeholder="How can we help?"
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: '10px',
                          border: '1px solid var(--border-color)',
                          background: 'var(--bg-primary)',
                          color: 'var(--text-main)',
                          fontSize: '0.9rem',
                          outline: 'none'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '700', marginBottom: '0.4rem' }}>Message *</label>
                      <textarea 
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Type your message here..."
                        style={{
                          width: '100%',
                          padding: '0.75rem 1rem',
                          borderRadius: '10px',
                          border: '1px solid var(--border-color)',
                          background: 'var(--bg-primary)',
                          color: 'var(--text-main)',
                          fontSize: '0.9rem',
                          outline: 'none',
                          resize: 'vertical'
                        }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      style={{
                        background: 'var(--accent-primary)',
                        color: '#ffffff',
                        border: 'none',
                        padding: '0.85rem 2rem',
                        borderRadius: '12px',
                        fontWeight: '800',
                        fontSize: '0.95rem',
                        cursor: isSubmitting ? 'wait' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem',
                        boxShadow: '0 4px 15px rgba(0, 115, 230, 0.3)',
                        marginTop: '0.5rem'
                      }}
                    >
                      <Send size={16} />
                      <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
                    </button>

                  </form>
                )}
              </div>

              {/* Support Info Sidebar Card */}
              <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', height: 'fit-content' }}>
                <h3 style={{ fontSize: '1.15rem', fontWeight: '800', marginBottom: '1.25rem' }}>Direct Support Info</h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(0, 115, 230, 0.1)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Mail size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Email Support</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>support@foliofy.com</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <Phone size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Operating Hours</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>Mon - Fri: 9 AM - 6 PM EST</div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '0.85rem', alignItems: 'center' }}>
                    <div style={{ width: '38px', height: '38px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <MapPin size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>Headquarters</div>
                      <div style={{ fontSize: '0.9rem', fontWeight: '700' }}>San Francisco, CA, USA</div>
                    </div>
                  </div>
                </div>

                <div style={{ borderTop: '1px solid var(--border-color)', marginTop: '1.5rem', paddingTop: '1.25rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <HelpCircle size={16} style={{ color: 'var(--accent-primary)' }} />
                    <span>Check our <strong style={{ color: 'var(--text-main)', cursor: 'pointer' }} onClick={() => setViewMode('landing')}>FAQ section</strong> on home for quick answers!</span>
                  </div>
                </div>

              </div>

            </div>
          </div>
        )}

      </div>
    </div>
  );
};
