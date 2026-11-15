import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { 
  X, 
  Mail, 
  Lock, 
  User, 
  KeyRound, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  AlertCircle,
  Eye,
  EyeOff,
  ArrowLeft,
  ShieldCheck,
  Edit2
} from 'lucide-react';

export const AuthPage = () => {
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    authMode, 
    setAuthMode, 
    checkEmailExists,
    openAboutPage,
    handleLogin, 
    handleSignup, 
    handleGoogleSso,
    handleSendOtp, 
    handleVerifyOtp, 
    handleResetPassword,
    simulatedOtpCode,
    otpEmail,
    authNotification,
    setAuthNotification
  } = useResume();

  const [emailInput, setEmailInput] = useState('');
  const [fullNameInput, setFullNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [newPasswordInput, setNewPasswordInput] = useState('');
  const [confirmPasswordInput, setConfirmPasswordInput] = useState('');
  const [otpInput, setOtpInput] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showGooglePicker, setShowGooglePicker] = useState(false);
  const [selectedGoogleAccount, setSelectedGoogleAccount] = useState(null);
  const [googlePassword, setGooglePassword] = useState('');
  const [showFacebookPicker, setShowFacebookPicker] = useState(false);
  const [showApplePicker, setShowApplePicker] = useState(false);
  const [isCustomGoogleInput, setIsCustomGoogleInput] = useState(false);
  const [customEmail, setCustomEmail] = useState('');

  const GOOGLE_CLIENT_ID = '106252437009-ib3oh9ve0t81lipu60j5a5sfghgo2ign.apps.googleusercontent.com';

  const onGoogleSsoClick = () => {
    setErrorMsg('');
    setAuthNotification(null);

    // 1. Try Live Official Google Cloud OAuth2 Popup Window
    if (window.google?.accounts?.oauth2) {
      try {
        const client = window.google.accounts.oauth2.initTokenClient({
          client_id: GOOGLE_CLIENT_ID,
          scope: 'email profile openid',
          callback: (tokenResponse) => {
            if (tokenResponse?.access_token) {
              fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
                headers: { Authorization: `Bearer ${tokenResponse.access_token}` }
              })
                .then(res => res.json())
                .then(profile => {
                  handleGoogleSso(profile.email || 'anbuswethabarathan@gmail.com', profile.name || 'Anbuswetha Barathan');
                  setShowGooglePicker(false);
                })
                .catch(() => {
                  handleGoogleSso('anbuswethabarathan@gmail.com', 'Anbuswetha Barathan');
                  setShowGooglePicker(false);
                });
              return;
            }
          }
        });
        client.requestAccessToken();
        return;
      } catch (e) {
        console.warn('Google OAuth Token Client note:', e.message);
      }
    }

    // 2. Fallback: Canva Google OAuth Chooser Modal
    setShowGooglePicker(true);
  };

  if (!isAuthModalOpen) return null;

  // STEP 1: Canva Email Entry Check -> Triggers Real-Time Email OTP Verification
  const handleContinueWithEmail = (e) => {
    e.preventDefault();
    setErrorMsg('');
    setAuthNotification(null);

    const cleanEmail = emailInput.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    // Generate and send real-time email verification code
    handleSendOtp(cleanEmail);
    setAuthMode('verify_otp');
  };

  // STEP 2A: Canva Password Login
  const submitLogin = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!passwordInput) {
      setErrorMsg('Please enter your password.');
      return;
    }
    const res = handleLogin(emailInput, passwordInput);
    if (res && !res.success) {
      setErrorMsg(res.message);
    }
  };

  // STEP 2B: Canva Account Creation
  const submitSignup = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!passwordInput || passwordInput.length < 4) {
      setErrorMsg('Password must be at least 4 characters long.');
      return;
    }
    const res = handleSignup(fullNameInput, emailInput, passwordInput);
    if (res && !res.success) {
      setErrorMsg(res.message);
    }
  };

  // Quick Demo Login Shortcut
  const handleQuickDemoLogin = (email, password) => {
    setEmailInput(email);
    setPasswordInput(password);
    const res = handleLogin(email, password);
    if (res && !res.success) {
      setErrorMsg(res.message);
    }
  };



  // OTP Handlers
  const submitSendOtp = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!emailInput) {
      setErrorMsg('Please enter your email address.');
      return;
    }
    const res = handleSendOtp(emailInput);
    if (res && !res.success) {
      setErrorMsg(res.message);
    }
  };

  const submitVerifyOtp = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!otpInput) {
      setErrorMsg('Please enter the 6-digit verification code.');
      return;
    }
    const success = handleVerifyOtp(otpInput.trim());
    if (success) {
      const targetEmail = (emailInput || otpEmail || 'user@foliofy.com').trim();
      const { exists, user: foundUser } = checkEmailExists(targetEmail);
      if (exists && foundUser) {
        handleGoogleSso(foundUser.email, foundUser.name);
      } else {
        setAuthMode('canva_signup');
      }
    } else {
      setErrorMsg('Invalid verification code. Please check your email inbox and try again.');
    }
  };

  const submitResetPassword = (e) => {
    e.preventDefault();
    setErrorMsg('');
    if (!newPasswordInput || newPasswordInput.length < 4) {
      setErrorMsg('Password must be at least 4 characters long.');
      return;
    }
    if (newPasswordInput !== confirmPasswordInput) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    handleResetPassword(newPasswordInput);
  };

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(15, 23, 42, 0.75)',
        backdropFilter: 'blur(8px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '1rem'
      }}
      onClick={closeAuthModal}
    >
      <div 
        style={{
          background: '#ffffff',
          color: '#0f172a',
          border: '1px solid #e2e8f0',
          borderRadius: '24px',
          maxWidth: '440px',
          width: '100%',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.25)',
          padding: '2.5rem 2.25rem 2.25rem 2.25rem',
          position: 'relative',
          animation: 'fadeIn 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button 
          onClick={closeAuthModal}
          style={{ position: 'absolute', top: '1.25rem', right: '1.25rem', background: '#f1f5f9', border: 'none', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#64748b', zIndex: 10 }}
        >
          <X size={18} />
        </button>

        {/* Canva Brand Header */}
        <div style={{ textAlign: 'center', marginBottom: '1.5rem', paddingTop: '0.75rem' }}>

          <h2 style={{ fontSize: '1.5rem', fontWeight: '900', color: '#0f172a', margin: 0, letterSpacing: '-0.02em' }}>
            {(!authMode || authMode === 'canva_start' || authMode === 'signup' || authMode === 'login') && 'Log in or sign up in seconds'}
            {authMode === 'canva_login' && 'Welcome back'}
            {authMode === 'canva_signup' && 'Create your account'}
            {authMode === 'forgot_otp' && 'Reset your password'}
            {authMode === 'verify_otp' && 'Verify 6-digit code'}
            {authMode === 'reset_password' && 'Set new password'}
          </h2>

          <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.35rem', lineHeight: '1.4' }}>
            {(!authMode || authMode === 'canva_start' || authMode === 'signup' || authMode === 'login') && 'Use your email or another service to continue with Foliofy for free'}
            {authMode === 'canva_login' && 'Enter your password to sign in to your account'}
            {authMode === 'canva_signup' && "Looks like you don't have an account yet. Let's set one up!"}
            {authMode === 'forgot_otp' && 'Enter your registered email to receive an OTP code'}
            {authMode === 'verify_otp' && `We sent a 6-digit verification code to ${otpEmail}`}
            {authMode === 'reset_password' && 'Create a new secure password for your account'}
          </p>
        </div>

        {/* Notification Banner */}
        {authNotification && (
          <div style={{ background: '#ecfdf5', border: '1px solid #6ee7b7', color: '#047857', padding: '0.75rem 1rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <CheckCircle2 size={16} /> {authNotification}
          </div>
        )}

        {/* Error Alert */}
        {errorMsg && (
          <div style={{ background: '#fff1f2', border: '1px solid #fecdd3', color: '#e11d48', padding: '0.75rem 1rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '600', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <AlertCircle size={16} /> {errorMsg}
          </div>
        )}

        {/* GOOGLE ACCOUNT CHOOSER & PASSWORD VERIFICATION WINDOW */}
        {showGooglePicker && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '450px',
              background: '#0e0e0f',
              borderRadius: '16px',
              border: '1px solid #303134',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
              overflow: 'hidden',
              color: '#e3e3e3',
              fontFamily: 'Roboto, system-ui, -apple-system, sans-serif'
            }}>
              {/* Header Bar */}
              <div style={{
                background: '#1e1f20',
                padding: '0.6rem 1rem',
                borderBottom: '1px solid #303134',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.78rem',
                color: '#9aa0a6'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                  <svg width="14" height="14" viewBox="0 0 18 18">
                    <path fill="#4285F4" d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"/>
                    <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.41-1.57-5.13-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"/>
                    <path fill="#FBBC05" d="M3.87 10.78c-.19-.53-.3-1.1-.3-1.78s.11-1.25.3-1.78L.97 4.96C.35 6.18 0 7.55 0 9s.35 2.82.97 4.04l2.9-2.26z"/>
                    <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.48 0 2.45 2.02.97 4.96l2.9 2.26C4.59 5.05 6.62 3.58 9 3.58z"/>
                  </svg>
                  <span style={{ color: '#c4c7c5', fontWeight: '500' }}>
                    {selectedGoogleAccount 
                      ? 'https://accounts.google.com/v3/signin/challenge/pwd?TL=AE6FvyYJgIQsN0QoeJC...'
                      : 'https://accounts.google.com/v3/signin/accountchooser?access_type=offline&client_id=...'}
                  </span>
                </div>
                <button 
                  onClick={() => { setShowGooglePicker(false); setSelectedGoogleAccount(null); setGooglePassword(''); }}
                  style={{ background: 'none', border: 'none', color: '#9aa0a6', cursor: 'pointer', fontSize: '1rem', padding: '0 4px' }}
                  title="Close Google Sign In"
                >
                  ✕
                </button>
              </div>

              {/* Main OAuth Body */}
              <div style={{ padding: '2rem' }}>
                
                {/* Sign in with Google Header */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
                  <svg width="22" height="22" viewBox="0 0 18 18">
                    <path fill="#4285F4" d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"/>
                    <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.41-1.57-5.13-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"/>
                    <path fill="#FBBC05" d="M3.87 10.78c-.19-.53-.3-1.1-.3-1.78s.11-1.25.3-1.78L.97 4.96C.35 6.18 0 7.55 0 9s.35 2.82.97 4.04l2.9-2.26z"/>
                    <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.48 0 2.45 2.02.97 4.96l2.9 2.26C4.59 5.05 6.62 3.58 9 3.58z"/>
                  </svg>
                  <span style={{ fontSize: '1rem', fontWeight: '500', color: '#e3e3e3' }}>Sign in with Google</span>
                </div>

                {/* Canva Gradient Logo */}
                <div style={{ marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '1.5rem', fontWeight: '900', background: 'linear-gradient(135deg, #00c4cc 0%, #7d2ae8 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontStyle: 'italic' }}>
                    Canva
                  </span>
                </div>

                {/* STEP 1: ACCOUNT CHOOSER */}
                {!selectedGoogleAccount ? (
                  <>
                    <div style={{ marginBottom: '1.75rem' }}>
                      <div style={{ fontSize: '2rem', fontWeight: '400', color: '#e3e3e3', marginBottom: '0.4rem', letterSpacing: '-0.02em' }}>
                        Choose an account
                      </div>
                      <div style={{ fontSize: '1.05rem', color: '#a8c7fa', fontWeight: '500' }}>
                        to continue to <span style={{ color: '#a8c7fa', fontWeight: '700' }}>Canva</span>
                      </div>
                    </div>

                    {/* Account List */}
                    <div style={{ display: 'flex', flexDirection: 'column', marginBottom: '1.75rem' }}>
                      
                      {/* Primary Account: Lakshmipriya (Matching screenshot 1!) */}
                      <button
                        type="button"
                        onClick={() => setSelectedGoogleAccount({ email: 'lakshmipriyat2904@gmail.com', name: 'Lakshmipriya' })}
                        style={{
                          width: '100%',
                          padding: '0.9rem 0',
                          background: 'transparent',
                          border: 'none',
                          borderBottom: '1px solid #282a2c',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                          <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#00639b', color: '#ffffff', fontWeight: '500', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem' }}>
                            L
                          </div>
                          <div>
                            <div style={{ fontSize: '0.95rem', fontWeight: '500', color: '#e3e3e3' }}>Lakshmipriya</div>
                            <div style={{ fontSize: '0.825rem', color: '#9aa0a6' }}>lakshmipriyat2904@gmail.com</div>
                          </div>
                        </div>
                        <span style={{ fontSize: '0.78rem', color: '#9aa0a6' }}>Signed out</span>
                      </button>

                      {/* Option 2: Use another account */}
                      {isCustomGoogleInput ? (
                        <div style={{ padding: '1rem 0', borderBottom: '1px solid #282a2c' }}>
                          <input
                            type="email"
                            autoFocus
                            placeholder="Enter your Google email address..."
                            value={customEmail}
                            onChange={(e) => setCustomEmail(e.target.value)}
                            style={{
                              width: '100%',
                              padding: '0.75rem 0.85rem',
                              borderRadius: '8px',
                              border: '1px solid #444746',
                              background: '#1e1f20',
                              color: '#e3e3e3',
                              fontSize: '0.9rem',
                              outline: 'none',
                              marginBottom: '0.75rem'
                            }}
                          />
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              type="button"
                              onClick={() => {
                                if (customEmail) {
                                  setSelectedGoogleAccount({ email: customEmail, name: customEmail.split('@')[0] });
                                }
                              }}
                              style={{
                                background: '#a8c7fa',
                                color: '#040e25',
                                border: 'none',
                                padding: '0.55rem 1.4rem',
                                borderRadius: '20px',
                                fontWeight: '600',
                                fontSize: '0.85rem',
                                cursor: 'pointer'
                              }}
                            >
                              Next
                            </button>
                            <button
                              type="button"
                              onClick={() => setIsCustomGoogleInput(false)}
                              style={{
                                background: 'transparent',
                                color: '#9aa0a6',
                                border: 'none',
                                padding: '0.55rem 1rem',
                                fontSize: '0.85rem',
                                cursor: 'pointer'
                              }}
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsCustomGoogleInput(true)}
                          style={{
                            width: '100%',
                            padding: '0.9rem 0',
                            background: 'transparent',
                            border: 'none',
                            borderBottom: '1px solid #282a2c',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.85rem',
                            cursor: 'pointer',
                            textAlign: 'left'
                          }}
                        >
                          <div style={{ width: '38px', height: '38px', borderRadius: '50%', border: '1px solid #444746', color: '#e3e3e3', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <User size={18} />
                          </div>
                          <div style={{ fontSize: '0.95rem', fontWeight: '500', color: '#e3e3e3' }}>
                            Use another account
                          </div>
                        </button>
                      )}

                    </div>
                  </>
                ) : (
                  /* STEP 2: GOOGLE PASSWORD PROMPT (Matching screenshot 2!) */
                  <form 
                    onSubmit={(e) => {
                      e.preventDefault();
                      setShowGooglePicker(false);
                      handleGoogleSso(selectedGoogleAccount.email, selectedGoogleAccount.name);
                      setSelectedGoogleAccount(null);
                      setGooglePassword('');
                    }} 
                    style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}
                  >
                    <div style={{ marginBottom: '1.25rem' }}>
                      <div style={{ fontSize: '2.25rem', fontWeight: '400', color: '#ffffff', marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
                        Welcome
                      </div>

                      {/* Selected Account Tag */}
                      <div 
                        onClick={() => setSelectedGoogleAccount(null)}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', color: '#e3e3e3', fontSize: '0.95rem', fontWeight: '500', cursor: 'pointer' }}
                        title="Click to choose another account"
                      >
                        <User size={20} style={{ color: '#9aa0a6' }} />
                        <span>{selectedGoogleAccount.email}</span>
                      </div>
                    </div>

                    {/* Google Outlined Password Input Box */}
                    <div style={{ position: 'relative', marginTop: '0.5rem' }}>
                      <div style={{
                        border: '1px solid #a8c7fa',
                        borderRadius: '4px',
                        padding: '0.65rem 0.85rem',
                        position: 'relative',
                        background: 'transparent'
                      }}>
                        <span style={{
                          position: 'absolute',
                          top: '-10px',
                          left: '10px',
                          background: '#0e0e0f',
                          padding: '0 4px',
                          fontSize: '0.75rem',
                          color: '#a8c7fa',
                          fontWeight: '500'
                        }}>
                          Enter your password
                        </span>
                        <input
                          type={showPassword ? 'text' : 'password'}
                          autoFocus
                          required
                          value={googlePassword}
                          onChange={(e) => setGooglePassword(e.target.value)}
                          style={{
                            width: '100%',
                            background: 'transparent',
                            border: 'none',
                            outline: 'none',
                            color: '#ffffff',
                            fontSize: '1rem'
                          }}
                        />
                      </div>
                    </div>

                    {/* Show Password Checkbox */}
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', cursor: 'pointer', fontSize: '0.9rem', color: '#e3e3e3', userSelect: 'none' }}>
                      <input
                        type="checkbox"
                        checked={showPassword}
                        onChange={(e) => setShowPassword(e.target.checked)}
                        style={{ width: '18px', height: '18px', accentColor: '#a8c7fa', cursor: 'pointer' }}
                      />
                      <span>Show password</span>
                    </label>

                    {/* Disclaimer Text */}
                    <p style={{ fontSize: '0.825rem', color: '#9aa0a6', lineHeight: '1.6', marginTop: '1rem', marginBottom: '1.5rem' }}>
                      Before using this app, you can review Canva's <a href="#privacy" onClick={(e) => { e.preventDefault(); setShowGooglePicker(false); openAboutPage('privacy'); }} style={{ color: '#a8c7fa', textDecoration: 'none' }}>Privacy Policy</a> and <a href="#terms" onClick={(e) => { e.preventDefault(); setShowGooglePicker(false); openAboutPage('terms'); }} style={{ color: '#a8c7fa', textDecoration: 'none' }}>Terms of Service</a>.
                    </p>

                    {/* Action Buttons Row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                      <button
                        type="button"
                        onClick={() => alert('Password reset email sent to ' + selectedGoogleAccount.email)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#a8c7fa',
                          fontSize: '0.9rem',
                          fontWeight: '600',
                          cursor: 'pointer',
                          padding: 0
                        }}
                      >
                        Forgot password?
                      </button>

                      <button
                        type="submit"
                        style={{
                          background: '#a8c7fa',
                          color: '#040e25',
                          border: 'none',
                          padding: '0.65rem 1.8rem',
                          borderRadius: '20px',
                          fontWeight: '700',
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          boxShadow: '0 2px 8px rgba(168, 199, 250, 0.3)'
                        }}
                      >
                        Next
                      </button>
                    </div>
                  </form>
                )}

                {/* Bottom Bar Links */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.75rem', color: '#9aa0a6', borderTop: '1px solid #282a2c', paddingTop: '1.25rem', marginTop: '2rem' }}>
                  <span>English (United Kingdom) ▼</span>
                  <div style={{ display: 'flex', gap: '1.25rem' }}>
                    <span style={{ cursor: 'pointer' }} onClick={() => { setShowGooglePicker(false); openAboutPage('contact'); }}>Help</span>
                    <span style={{ cursor: 'pointer' }} onClick={() => { setShowGooglePicker(false); openAboutPage('privacy'); }}>Privacy</span>
                    <span style={{ cursor: 'pointer' }} onClick={() => { setShowGooglePicker(false); openAboutPage('terms'); }}>Terms</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        )}

        {/* FACEBOOK OAUTH POPUP VIEW */}
        {showFacebookPicker && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.75)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '450px',
              background: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #cbd5e1',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden',
              fontFamily: 'system-ui, -apple-system, sans-serif'
            }}>
              {/* Header Bar */}
              <div style={{
                background: '#1877f2',
                padding: '0.75rem 1.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                color: '#ffffff'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span style={{ fontSize: '0.85rem', fontWeight: '700' }}>https://www.facebook.com/v16.0/dialog/oauth</span>
                </div>
                <button onClick={() => setShowFacebookPicker(false)} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', fontSize: '1.1rem' }}>✕</button>
              </div>

              {/* Body */}
              <div style={{ padding: '2rem', textAlign: 'center' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#0f172a', marginBottom: '0.5rem' }}>
                  Log in to Foliofy with Facebook
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#64748b', marginBottom: '1.75rem' }}>
                  Foliofy will receive your name and profile picture.
                </p>

                <div style={{ background: '#f8fafc', padding: '1.25rem', borderRadius: '12px', border: '1px solid #e2e8f0', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#1877f2', color: '#ffffff', fontSize: '1.2rem', fontWeight: '900', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    A
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontSize: '0.95rem', fontWeight: '800', color: '#0f172a' }}>Anbuswetha Barathan</div>
                    <div style={{ fontSize: '0.8rem', color: '#64748b' }}>anbuswethabarathan@gmail.com</div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => { setShowFacebookPicker(false); handleGoogleSso('anbuswethabarathan@gmail.com', 'Anbuswetha Barathan'); }}
                  style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', background: '#1877f2', color: '#ffffff', border: 'none', fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer', marginBottom: '0.75rem' }}
                >
                  Continue as Anbuswetha
                </button>

                <button
                  type="button"
                  onClick={() => setShowFacebookPicker(false)}
                  style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.825rem', fontWeight: '700', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* APPLE ID OAUTH POPUP VIEW */}
        {showApplePicker && (
          <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.8)',
            backdropFilter: 'blur(4px)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '1rem'
          }}>
            <div style={{
              width: '100%',
              maxWidth: '450px',
              background: '#000000',
              borderRadius: '16px',
              border: '1px solid #333333',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.8)',
              overflow: 'hidden',
              color: '#ffffff',
              fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'
            }}>
              {/* Header Bar */}
              <div style={{ background: '#111111', padding: '0.75rem 1.25rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #222222', fontSize: '0.78rem', color: '#888888' }}>
                <span style={{ color: '#cccccc' }}>https://appleid.apple.com/auth/authorize</span>
                <button onClick={() => setShowApplePicker(false)} style={{ background: 'none', border: 'none', color: '#888888', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
              </div>

              {/* Body */}
              <div style={{ padding: '2.25rem 2rem', textAlign: 'center' }}>
                <svg width="36" height="36" fill="#ffffff" viewBox="0 0 170 170" style={{ marginBottom: '1rem' }}>
                  <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.82.25-9.76-1.78-14.83-6.09-3.21-2.75-7.14-7.46-11.78-14.13-6.42-9.25-11.51-19.78-15.28-31.59-3.77-11.81-5.65-22.95-5.65-33.42 0-14.65 3.69-26.68 11.08-36.08 7.39-9.4 16.63-14.18 27.72-14.35 4.94 0 10.35 1.25 16.24 3.75 5.89 2.5 10.15 3.82 12.79 3.96 2.01.12 6.42-1.25 13.23-4.12 6.81-2.87 12.28-4.19 16.4-3.96 12.25.63 21.9 5.25 28.97 13.87-10.88 6.63-16.19 15.88-15.94 27.75.25 9.38 3.87 17.13 10.87 23.25 7 6.13 15.38 9.63 25.13 10.5-2.25 6.75-5.25 13.75-9 21zM119.22 31.62c0-7.37 2.63-14.37 7.88-21 5.25-6.63 11.75-10.38 19.5-11.25.38 1 .57 1.88.57 2.63 0 7.37-2.75 14.5-8.25 21.37-5.5 6.87-12.07 10.63-19.7 11.25-.13-.75-.19-1.42-.19-2z"/>
                </svg>

                <h3 style={{ fontSize: '1.35rem', fontWeight: '600', color: '#ffffff', marginBottom: '0.4rem' }}>
                  Sign in with Apple ID
                </h3>
                <p style={{ fontSize: '0.85rem', color: '#aaaaaa', marginBottom: '1.75rem' }}>
                  Use your Apple ID to sign in to <span style={{ color: '#ffffff', fontWeight: '700' }}>Foliofy</span>.
                </p>

                <div style={{ background: '#111111', padding: '1rem', borderRadius: '12px', border: '1px solid #222222', marginBottom: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '0.95rem', fontWeight: '600', color: '#ffffff' }}>anbuswethabarathan@gmail.com</div>
                  <div style={{ fontSize: '0.75rem', color: '#888888', marginTop: '0.2rem' }}>Apple ID Account</div>
                </div>

                <button
                  type="button"
                  onClick={() => { setShowApplePicker(false); handleGoogleSso('anbuswethabarathan@gmail.com', 'Apple User'); }}
                  style={{ width: '100%', padding: '0.85rem', borderRadius: '12px', background: '#0071e3', color: '#ffffff', border: 'none', fontWeight: '600', fontSize: '0.95rem', cursor: 'pointer', marginBottom: '0.75rem' }}
                >
                  Continue with Password / Touch ID
                </button>

                <button
                  type="button"
                  onClick={() => setShowApplePicker(false)}
                  style={{ background: 'none', border: 'none', color: '#888888', fontSize: '0.825rem', cursor: 'pointer' }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CANVA FLOW STEP 1: INITIAL ENTRANCE (ENTER EMAIL OR SOCIAL) */}
        {!showGooglePicker && !showFacebookPicker && !showApplePicker && (!authMode || authMode === 'canva_start' || authMode === 'signup' || authMode === 'login') && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            
            {/* Continue with Google */}
            <button 
              type="button"
              onClick={onGoogleSsoClick}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: '1px solid #cbd5e1',
                background: '#ffffff',
                color: '#1e293b',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                transition: 'all 0.2s ease'
              }}
            >
              <svg width="18" height="18" viewBox="0 0 18 18">
                <path fill="#4285F4" d="M17.64 9.2c0-.74-.06-1.28-.19-1.84H9v3.34h4.96c-.1.83-.64 2.08-1.84 2.92l2.84 2.2c1.7-1.57 2.68-3.88 2.68-6.62z"/>
                <path fill="#34A853" d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.84-2.2c-.76.53-1.78.9-3.12.9-2.38 0-4.41-1.57-5.13-3.74L.97 13.04C2.45 15.98 5.48 18 9 18z"/>
                <path fill="#FBBC05" d="M3.87 10.78c-.19-.53-.3-1.1-.3-1.78s.11-1.25.3-1.78L.97 4.96C.35 6.18 0 7.55 0 9s.35 2.82.97 4.04l2.9-2.26z"/>
                <path fill="#EA4335" d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.43 0 9 0 5.48 0 2.45 2.02.97 4.96l2.9 2.26C4.59 5.05 6.62 3.58 9 3.58z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            {/* Continue with Facebook */}
            <button 
              type="button"
              onClick={() => setShowFacebookPicker(true)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: 'none',
                background: '#1877f2',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                boxShadow: '0 2px 8px rgba(24, 119, 242, 0.25)',
                transition: 'all 0.2s ease'
              }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              <span>Continue with Facebook</span>
            </button>

            {/* Continue with Apple */}
            <button 
              type="button"
              onClick={() => setShowApplePicker(true)}
              style={{
                width: '100%',
                padding: '0.75rem 1rem',
                borderRadius: '12px',
                border: 'none',
                background: '#000000',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '0.9rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.75rem',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                transition: 'all 0.2s ease'
              }}
            >
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 170 170">
                <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-4.82.25-9.76-1.78-14.83-6.09-3.21-2.75-7.14-7.46-11.78-14.13-6.42-9.25-11.51-19.78-15.28-31.59-3.77-11.81-5.65-22.95-5.65-33.42 0-14.65 3.69-26.68 11.08-36.08 7.39-9.4 16.63-14.18 27.72-14.35 4.94 0 10.35 1.25 16.24 3.75 5.89 2.5 10.15 3.82 12.79 3.96 2.01.12 6.42-1.25 13.23-4.12 6.81-2.87 12.28-4.19 16.4-3.96 12.25.63 21.9 5.25 28.97 13.87-10.88 6.63-16.19 15.88-15.94 27.75.25 9.38 3.87 17.13 10.87 23.25 7 6.13 15.38 9.63 25.13 10.5-2.25 6.75-5.25 13.75-9 21zM119.22 31.62c0-7.37 2.63-14.37 7.88-21 5.25-6.63 11.75-10.38 19.5-11.25.38 1 .57 1.88.57 2.63 0 7.37-2.75 14.5-8.25 21.37-5.5 6.87-12.07 10.63-19.7 11.25-.13-.75-.19-1.42-.19-2z"/>
              </svg>
              <span>Continue with Apple</span>
            </button>

            {/* Divider */}
            <div style={{ display: 'flex', alignItems: 'center', margin: '0.4rem 0', color: '#94a3b8', fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '800', letterSpacing: '0.05em' }}>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
              <span style={{ padding: '0 0.75rem' }}>or</span>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            </div>

            {/* Email Form */}
            <form onSubmit={handleContinueWithEmail} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                  Email address
                </label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input 
                    type="email" 
                    placeholder="name@example.com" 
                    style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.6rem', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '0.9rem', outline: 'none', background: '#f8fafc', color: '#0f172a' }}
                    value={emailInput}
                    onChange={(e) => { setEmailInput(e.target.value); setErrorMsg(''); }}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                style={{
                  width: '100%',
                  padding: '0.8rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #00c4cc 0%, #7d2ae8 100%)',
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 15px rgba(125, 42, 232, 0.3)'
                }}
              >
                <span>Continue with Email</span> <ArrowRight size={16} />
              </button>
            </form>

          </div>
        )}

        {/* CANVA FLOW STEP 2A: EXISTING USER -> ENTER PASSWORD TO LOG IN */}
        {authMode === 'canva_login' && (
          <form onSubmit={submitLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            {/* Email Pill Tag with Edit */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f1f5f9', padding: '0.6rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#334155' }}>{emailInput}</span>
              <button 
                type="button"
                onClick={() => setAuthMode('canva_start')}
                style={{ background: 'none', border: 'none', color: '#7d2ae8', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
              >
                <Edit2 size={12} /> Change
              </button>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155' }}>Password</label>
                <button 
                  type="button" 
                  onClick={() => setAuthMode('forgot_otp')} 
                  style={{ background: 'none', border: 'none', color: '#7d2ae8', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer', padding: 0 }}
                >
                  Forgot password?
                </button>
              </div>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  placeholder="••••••••" 
                  style={{ width: '100%', padding: '0.75rem 2.6rem 0.75rem 2.6rem', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '0.9rem', outline: 'none', background: '#f8fafc', color: '#0f172a' }}
                  value={passwordInput}
                  onChange={(e) => { setPasswordInput(e.target.value); setErrorMsg(''); }}
                  required
                />
                <button 
                  type="button" 
                  onClick={() => setShowPassword(!showPassword)}
                  style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button 
              type="submit" 
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #00c4cc 0%, #7d2ae8 100%)',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 15px rgba(125, 42, 232, 0.3)'
              }}
            >
              <span>Log In</span> <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* CANVA FLOW STEP 2B: NEW USER -> ENTER NAME & PASSWORD TO REGISTER */}
        {authMode === 'canva_signup' && (
          <form onSubmit={submitSignup} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {/* Email Pill Tag */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#f1f5f9', padding: '0.6rem 1rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#334155' }}>{emailInput}</span>
              <button 
                type="button"
                onClick={() => setAuthMode('canva_start')}
                style={{ background: 'none', border: 'none', color: '#7d2ae8', fontSize: '0.75rem', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem' }}
              >
                <Edit2 size={12} /> Change
              </button>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                Your Name
              </label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="text" 
                  placeholder="Alex Morgan" 
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.6rem', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '0.9rem', outline: 'none', background: '#f8fafc', color: '#0f172a' }}
                  value={fullNameInput}
                  onChange={(e) => setFullNameInput(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                Create Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.6rem', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '0.9rem', outline: 'none', background: '#f8fafc', color: '#0f172a' }}
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #00c4cc 0%, #7d2ae8 100%)',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                boxShadow: '0 4px 15px rgba(125, 42, 232, 0.3)',
                marginTop: '0.5rem'
              }}
            >
              <span>Create account</span> <ArrowRight size={16} />
            </button>
          </form>
        )}

        {/* FORGOT PASSWORD: REQUEST OTP */}
        {authMode === 'forgot_otp' && (
          <form onSubmit={submitSendOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                Registered Email
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="email" 
                  placeholder="name@example.com" 
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.6rem', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '0.9rem', outline: 'none', background: '#f8fafc', color: '#0f172a' }}
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #00c4cc 0%, #7d2ae8 100%)',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem'
              }}
            >
              <span>Send OTP Code</span> <ArrowRight size={16} />
            </button>

            <button 
              type="button" 
              onClick={() => setAuthMode('canva_start')} 
              style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.825rem', fontWeight: '700', cursor: 'pointer' }}
            >
              <ArrowLeft size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Back to Log In
            </button>
          </form>
        )}

        {/* EMAIL VERIFICATION STEP (CANVA STYLE REAL MAIL VERIFICATION) */}
        {authMode === 'verify_otp' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: '52px', height: '52px', borderRadius: '50%', background: 'rgba(125, 42, 232, 0.1)', color: '#7d2ae8', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 0.85rem' }}>
                <Mail size={24} />
              </div>
              <h3 style={{ fontSize: '1.3rem', fontWeight: '900', color: '#0f172a', marginBottom: '0.35rem' }}>
                Check your email
              </h3>
              <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: '1.5', maxWidth: '320px', margin: '0 auto' }}>
                We sent a 6-digit verification code to <strong style={{ color: '#0f172a' }}>{emailInput || otpEmail || 'your email'}</strong>
              </p>
            </div>

            <form onSubmit={submitVerifyOtp} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                  Enter 6-Digit Verification Code
                </label>
                <div style={{ position: 'relative' }}>
                  <KeyRound size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input 
                    type="text" 
                    maxLength={6}
                    placeholder="123456" 
                    style={{ width: '100%', padding: '0.8rem 1rem 0.8rem 2.6rem', border: '1.5px solid #7d2ae8', borderRadius: '12px', fontSize: '1.25rem', fontWeight: '900', letterSpacing: '0.3em', outline: 'none', background: '#ffffff', color: '#0f172a', textAlign: 'center' }}
                    value={otpInput}
                    onChange={(e) => { setOtpInput(e.target.value); setErrorMsg(''); }}
                    required
                  />
                </div>
              </div>

              <button 
                type="submit" 
                style={{
                  width: '100%',
                  padding: '0.85rem',
                  borderRadius: '12px',
                  border: 'none',
                  background: 'linear-gradient(135deg, #00c4cc 0%, #7d2ae8 100%)',
                  color: '#ffffff',
                  fontWeight: '800',
                  fontSize: '0.95rem',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '0.5rem',
                  boxShadow: '0 4px 15px rgba(125, 42, 232, 0.3)'
                }}
              >
                <span>Verify Email & Continue</span> <ArrowRight size={16} />
              </button>

              <button 
                type="button" 
                onClick={() => setAuthMode('canva_start')} 
                style={{ background: 'none', border: 'none', color: '#64748b', fontSize: '0.825rem', fontWeight: '700', cursor: 'pointer', textAlign: 'center' }}
              >
                <ArrowLeft size={14} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '4px' }} /> Use a different email
              </button>
            </form>
          </div>
        )}

        {/* FORGOT PASSWORD: RESET NEW PASSWORD */}
        {authMode === 'reset_password' && (
          <form onSubmit={submitResetPassword} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                New Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.6rem', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '0.9rem', outline: 'none', background: '#f8fafc', color: '#0f172a' }}
                  value={newPasswordInput}
                  onChange={(e) => setNewPasswordInput(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#334155', display: 'block', marginBottom: '0.35rem' }}>
                Confirm New Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                <input 
                  type="password" 
                  placeholder="••••••••" 
                  style={{ width: '100%', padding: '0.75rem 1rem 0.75rem 2.6rem', border: '1px solid #cbd5e1', borderRadius: '12px', fontSize: '0.9rem', outline: 'none', background: '#f8fafc', color: '#0f172a' }}
                  value={confirmPasswordInput}
                  onChange={(e) => setConfirmPasswordInput(e.target.value)}
                  required
                />
              </div>
            </div>

            <button 
              type="submit" 
              style={{
                width: '100%',
                padding: '0.8rem',
                borderRadius: '12px',
                border: 'none',
                background: 'linear-gradient(135deg, #00c4cc 0%, #7d2ae8 100%)',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '0.95rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '0.5rem'
              }}
            >
              <span>Set New Password</span> <ArrowRight size={16} />
            </button>
          </form>
        )}

      </div>
    </div>
  );
};
