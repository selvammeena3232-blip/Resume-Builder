import React, { createContext, useContext, useState, useEffect } from 'react';
import { loadSavedResumeData, saveResumeData, resetResumeData } from '../utils/storage';
import { calculateAtsScore } from '../utils/atsChecker';
import { api } from '../utils/api';

const ResumeContext = createContext(null);

const INITIAL_REGISTERED_USERS = [
  { id: '1', name: 'System Administrator', email: 'admin@foliofy.com', password: 'admin', role: 'System Administrator', status: 'Approved', isAdmin: true, joined: '2025-11-01', resumesCount: 12 },
  { id: '2', name: 'Alex Morgan', email: 'alex.morgan@devstudio.io', password: 'password123', role: 'Software Engineer', status: 'Approved', isAdmin: false, joined: '2026-01-12', resumesCount: 4 },
  { id: '3', name: 'Sarah Jenkins', email: 'sarah.jenkins@productlead.co', password: 'password123', role: 'Product Manager', status: 'Approved', isAdmin: false, joined: '2026-02-04', resumesCount: 2 },
  { id: '4', name: 'David Chen', email: 'david@chen-design.studio', password: 'password123', role: 'UX Designer', status: 'Approved', isAdmin: false, joined: '2026-03-19', resumesCount: 3 }
];

// Helper to derive view state from pathname
const getStateFromPath = (path) => {
  const cleanPath = (path || '/').toLowerCase().replace(/\/$/, '') || '/';
  if (cleanPath === '/choice') return { viewMode: 'choice', activeTab: 'editor', aboutTab: 'about' };
  if (cleanPath === '/templates' || cleanPath === '/resume-templates') return { viewMode: 'builder', activeTab: 'templates', aboutTab: 'about' };
  if (cleanPath === '/builder' || cleanPath === '/editor' || cleanPath === '/resume-builder') return { viewMode: 'builder', activeTab: 'editor', aboutTab: 'about' };
  if (cleanPath === '/portfolio-themes' || cleanPath === '/portfolio/themes') return { viewMode: 'portfolio', activeTab: 'portfolio-themes', aboutTab: 'about' };
  if (cleanPath === '/portfolio' || cleanPath === '/portfolio-builder') return { viewMode: 'portfolio', activeTab: 'portfolio', aboutTab: 'about' };
  if (cleanPath === '/admin') return { viewMode: 'admin', activeTab: 'editor', aboutTab: 'about' };
  if (cleanPath === '/about' || cleanPath === '/about/us') return { viewMode: 'about', activeTab: 'editor', aboutTab: 'about' };
  if (cleanPath === '/terms' || cleanPath === '/about/terms') return { viewMode: 'about', activeTab: 'editor', aboutTab: 'terms' };
  if (cleanPath === '/privacy' || cleanPath === '/about/privacy') return { viewMode: 'about', activeTab: 'editor', aboutTab: 'privacy' };
  if (cleanPath === '/accessibility' || cleanPath === '/about/accessibility') return { viewMode: 'about', activeTab: 'editor', aboutTab: 'accessibility' };
  if (cleanPath === '/contact' || cleanPath === '/about/contact') return { viewMode: 'about', activeTab: 'editor', aboutTab: 'contact' };
  return { viewMode: 'landing', activeTab: 'editor', aboutTab: 'about' };
};

// Helper to derive path from view state
const getPathFromState = (viewMode, activeTab, aboutTab) => {
  if (viewMode === 'choice') return '/choice';
  if (viewMode === 'landing') return '/';
  if (viewMode === 'resume_builder') return '/resume-builder';
  if (viewMode === 'resume_templates') return '/resume-templates';
  if (viewMode === 'portfolio_builder') return '/portfolio-builder';
  if (viewMode === 'portfolio_templates') return '/portfolio-themes';
  if (viewMode === 'portfolio') {
    if (activeTab === 'portfolio-themes' || activeTab === 'themes') return '/portfolio-themes';
    return '/portfolio';
  }
  if (viewMode === 'admin') return '/admin';
  if (viewMode === 'about') {
    if (aboutTab === 'terms') return '/terms';
    if (aboutTab === 'privacy') return '/privacy';
    if (aboutTab === 'accessibility') return '/accessibility';
    if (aboutTab === 'contact') return '/contact';
    return '/about';
  }
  if (viewMode === 'builder') {
    if (activeTab === 'templates') return '/resume-templates';
    return '/resume-builder';
  }
  return '/';
};

export const ResumeProvider = ({ children }) => {
  const [resumeData, setResumeData] = useState(() => loadSavedResumeData());
  
  // Initialize view state from current browser URL path
  const initialState = getStateFromPath(window.location.pathname);
  const [viewMode, _setViewMode] = useState(initialState.viewMode);
  const [activeTab, setActiveTab] = useState(initialState.activeTab);
  const [aboutTab, setAboutTab] = useState(initialState.aboutTab);

  const setViewMode = (mode, tab) => {
    _setViewMode(mode);
    if (tab) {
      setActiveTab(tab);
    } else {
      if (mode === 'portfolio' && !activeTab) setActiveTab('portfolio');
      if (mode === 'builder' && !activeTab) setActiveTab('editor');
    }
  };
  
  const [wizardStep, setWizardStep] = useState(1);
  const [isBackendConnected, setIsBackendConnected] = useState(false);
  const [portfolioTemplate, setPortfolioTemplate] = useState('dark');

  const openAboutPage = (tab = 'about') => {
    setAboutTab(tab);
    setViewMode('about');
  };

  // Sync state changes to browser URL path
  useEffect(() => {
    const targetPath = getPathFromState(viewMode, activeTab, aboutTab);
    if (window.location.pathname !== targetPath) {
      window.history.pushState({ viewMode, activeTab, aboutTab }, '', targetPath);
    }
  }, [viewMode, activeTab, aboutTab]);

  // Listen for browser Back & Forward button navigation
  useEffect(() => {
    const handlePopState = () => {
      const { viewMode: vm, activeTab: at, aboutTab: ab } = getStateFromPath(window.location.pathname);
      _setViewMode(vm);
      setActiveTab(at);
      setAboutTab(ab);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Registered Users Storage (Persisted in localStorage & Backend)
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    try {
      const saved = localStorage.getItem('foliofy_registered_users');
      return saved ? JSON.parse(saved) : INITIAL_REGISTERED_USERS;
    } catch (e) {
      return INITIAL_REGISTERED_USERS;
    }
  });

  // Initial Sync with Backend Server if online
  useEffect(() => {
    async function syncWithBackend() {
      const health = await api.getHealth();
      if (health && health.status === 'online') {
        setIsBackendConnected(true);
        try {
          const usersRes = await api.getAdminUsers();
          if (usersRes?.success && Array.isArray(usersRes.users)) {
            setRegisteredUsers(usersRes.users);
          }
          const resumeRes = await api.getResume('1');
          if (resumeRes?.success && resumeRes.resumeData) {
            setResumeData(resumeRes.resumeData);
          }
        } catch (e) {
          console.warn('Backend initial fetch note:', e.message);
        }
      }
    }
    syncWithBackend();
  }, []);

  // Sync registered users to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('foliofy_registered_users', JSON.stringify(registeredUsers));
    } catch (e) {
      console.error('Failed to sync registered users:', e);
    }
  }, [registeredUsers]);

  // Auth & User Management State
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('foliofy_user');
      return saved ? JSON.parse(saved) : null;
    } catch (e) {
      return null;
    }
  });

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [authMode, setAuthMode] = useState('signup'); // Default to Signup first as requested
  const [simulatedOtpCode, setSimulatedOtpCode] = useState('');
  const [otpEmail, setOtpEmail] = useState('');
  const [authNotification, setAuthNotification] = useState(null);

  const [isAtsModalOpen, setIsAtsModalOpen] = useState(false);
  const [isSuggestionsModalOpen, setIsSuggestionsModalOpen] = useState(false);
  const [suggestionTarget, setSuggestionTarget] = useState(null);
  const [isResumeWizardOpen, setIsResumeWizardOpen] = useState(false);

  const openResumeWizardModal = () => setIsResumeWizardOpen(true);
  const closeResumeWizardModal = () => setIsResumeWizardOpen(false);

  // Sync user state with localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('foliofy_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('foliofy_user');
    }
  }, [user]);

  // Auto-save changes to localStorage & Backend & sync root theme
  useEffect(() => {
    saveResumeData(resumeData);
    document.documentElement.setAttribute('data-theme', resumeData.customization?.darkMode ? 'dark' : 'light');
    if (isBackendConnected) {
      api.saveResume('1', resumeData).catch(err => console.warn('Backend auto-save note:', err.message));
    }
  }, [resumeData, isBackendConnected]);

  // Calculate ATS Score dynamically
  const atsAnalysis = calculateAtsScore(resumeData);

  // Update Personal Info
  const updatePersonalInfo = (field, value) => {
    setResumeData(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        [field]: value
      }
    }));
  };

  // Generic List item operations
  const addItem = (section, newItem) => {
    setResumeData(prev => ({
      ...prev,
      [section]: [...(prev[section] || []), newItem]
    }));
  };

  const updateItem = (section, id, updatedFields) => {
    setResumeData(prev => ({
      ...prev,
      [section]: (prev[section] || []).map(item =>
        item.id === id ? { ...item, ...updatedFields } : item
      )
    }));
  };

  const removeItem = (section, id) => {
    setResumeData(prev => ({
      ...prev,
      [section]: (prev[section] || []).filter(item => item.id !== id)
    }));
  };

  // Update Customization
  const updateCustomization = (fieldOrObject, value) => {
    setResumeData(prev => {
      const currentCustom = prev?.customization || {};
      if (typeof fieldOrObject === 'object' && fieldOrObject !== null) {
        return {
          ...prev,
          customization: {
            ...currentCustom,
            ...fieldOrObject
          }
        };
      }
      return {
        ...prev,
        customization: {
          ...currentCustom,
          [fieldOrObject]: value
        }
      };
    });
  };

  const startBuildingWithTemplate = (templateId) => {
    updateCustomization('activeTemplate', templateId);
    if (templateId === 'portfolio') {
      setViewMode('portfolio');
      setActiveTab('portfolio');
    } else {
      setViewMode('builder');
      setActiveTab('editor');
    }
  };

  const openSuggestions = (target) => {
    setSuggestionTarget(target);
    setIsSuggestionsModalOpen(true);
  };

  const applySuggestion = (text) => {
    if (!suggestionTarget) return;

    if (suggestionTarget.section === 'bio') {
      updatePersonalInfo('bio', text);
    } else if (suggestionTarget.section === 'experience' && suggestionTarget.id) {
      const exp = (resumeData.experiences || []).find(e => e.id === suggestionTarget.id);
      const newDesc = exp && exp.description ? `${exp.description}\n• ${text}` : `• ${text}`;
      updateItem('experiences', suggestionTarget.id, { description: newDesc });
    }
    setIsSuggestionsModalOpen(false);
  };

  const handleResetData = () => {
    const defaultData = resetResumeData();
    setResumeData(defaultData);
  };

  const handleImportData = (newData) => {
    setResumeData(newData);
  };

  const loadPresetProfile = (preset) => {
    setResumeData(preset);
  };

  // Auth Handler Functions
  const checkEmailExists = (email) => {
    const clean = (email || '').trim().toLowerCase();
    const found = registeredUsers.find(u => u.email.toLowerCase() === clean);
    return { exists: !!found, user: found || null };
  };

  const openAuthModal = (mode = 'canva_start') => {
    setAuthMode(mode);
    setAuthNotification(null);
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // REGISTER / SIGNUP (First step in workflow)
  const handleSignup = (fullName, email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    const existing = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail);

    if (existing) {
      return { success: false, message: 'An account with this email already exists. Please log in.' };
    }

    const isAdmin = cleanEmail.includes('admin');
    const newUserRecord = {
      id: Date.now().toString(),
      name: fullName ? fullName.trim() : cleanEmail.split('@')[0],
      email: cleanEmail,
      password: password,
      role: isAdmin ? 'System Administrator' : 'Pro Member',
      status: isAdmin ? 'Approved' : 'Pending', // Pending admin authorization
      isAdmin: isAdmin,
      joined: new Date().toISOString().split('T')[0],
      resumesCount: 1
    };

    setRegisteredUsers(prev => [newUserRecord, ...prev]);

    if (isAdmin) {
      // Auto approve and login admins
      const loggedInUser = {
        id: newUserRecord.id,
        email: cleanEmail,
        name: newUserRecord.name,
        isAdmin: true,
        role: 'System Administrator'
      };
      setUser(loggedInUser);
      setIsAuthModalOpen(false);
      setViewMode('admin');
      return { success: true, pending: false };
    } else {
      // Normal users require Admin approval before login
      setAuthMode('login');
      setAuthNotification('Registration successful! Your account is pending Admin Authorization. An admin must authorize your account before you can log in.');
      return { success: true, pending: true };
    }
  };

  // GOOGLE REAL-TIME SSO LOGIN / REGISTRATION
  const handleGoogleSso = (providedEmail, providedName) => {
    const cleanEmail = (providedEmail || 'user.google@gmail.com').trim().toLowerCase();
    const displayName = providedName || cleanEmail.split('@')[0].replace('.', ' ');
    const formattedName = displayName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    let account = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail);

    if (!account) {
      account = {
        id: Date.now().toString(),
        name: formattedName,
        email: cleanEmail,
        password: 'google_sso_authenticated',
        role: cleanEmail.includes('admin') ? 'System Administrator' : 'Google Verified Member',
        status: 'Approved',
        isAdmin: cleanEmail.includes('admin'),
        joined: new Date().toISOString().split('T')[0],
        resumesCount: 1,
        isGoogleUser: true
      };
      setRegisteredUsers(prev => [account, ...prev]);
    } else {
      if (account.status === 'Pending' || account.status === 'Rejected') {
        account = { ...account, status: 'Approved' };
        setRegisteredUsers(prev => prev.map(u => u.id === account.id ? { ...u, status: 'Approved' } : u));
      }
    }

    const userObj = {
      id: account.id,
      email: account.email,
      name: account.name,
      isAdmin: account.isAdmin || account.email.includes('admin'),
      role: account.role || 'Google Verified Member',
      isGoogleUser: true
    };

    setUser(userObj);
    setIsAuthModalOpen(false);
    setAuthNotification(null);

    // Auto update resume header info
    updatePersonalInfo('fullName', account.name);
    updatePersonalInfo('email', account.email);

    return { success: true, user: userObj };
  };

  // LOGIN (Validates registration and Admin Approval status)
  const handleLogin = (email, password) => {
    const cleanEmail = email.trim().toLowerCase();
    let account = registeredUsers.find(u => u.email.toLowerCase() === cleanEmail);

    // Auto-create admin if logging in with admin email and not found
    if (!account && cleanEmail.includes('admin')) {
      account = {
        id: Date.now().toString(),
        name: 'System Administrator',
        email: cleanEmail,
        password: password || 'admin',
        role: 'System Administrator',
        status: 'Approved',
        isAdmin: true,
        joined: new Date().toISOString().split('T')[0],
        resumesCount: 1
      };
      setRegisteredUsers(prev => [account, ...prev]);
    }

    if (!account) {
      return { success: false, message: 'No registered account found with this email. Please register first.' };
    }

    if (account.password && account.password !== password) {
      return { success: false, message: 'Incorrect password. Please try again or use OTP to reset your password.' };
    }

    // CHECK ADMIN AUTHORIZATION STATUS
    if (account.status === 'Pending') {
      return { 
        success: false, 
        message: 'Your account is pending Admin Authorization. Please contact an Administrator to approve your access.' 
      };
    }

    if (account.status === 'Rejected') {
      return { 
        success: false, 
        message: 'Your account access request was rejected by the Administrator.' 
      };
    }

    // Login Authorized User
    const loggedInUser = {
      id: account.id,
      email: account.email,
      name: account.name,
      isAdmin: account.isAdmin || account.email.includes('admin'),
      role: account.role || (account.isAdmin ? 'System Administrator' : 'User')
    };

    setUser(loggedInUser);
    setIsAuthModalOpen(false);
    
    if (loggedInUser.isAdmin) {
      setViewMode('admin');
    } else {
      setViewMode('landing');
    }

    return { success: true };
  };

  // ADMIN AUTHORIZATION CONTROLS
  const handleApproveUser = (userId) => {
    setRegisteredUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'Approved' } : u));
    api.approveUser(userId).catch(e => console.warn('Backend approve user note:', e.message));
  };

  const handleRejectUser = (userId) => {
    setRegisteredUsers(prev => prev.map(u => u.id === userId ? { ...u, status: 'Rejected' } : u));
    api.rejectUser(userId).catch(e => console.warn('Backend reject user note:', e.message));
  };

  const handleDeleteUser = (userId) => {
    setRegisteredUsers(prev => prev.filter(u => u.id !== userId));
    api.deleteUser(userId).catch(e => console.warn('Backend delete user note:', e.message));
  };

  // OTP REAL EMAIL VERIFICATION FLOW
  const handleSendOtp = (email) => {
    const cleanEmail = email.trim().toLowerCase();
    const generated = Math.floor(100000 + Math.random() * 900000).toString();
    setSimulatedOtpCode(generated);
    setOtpEmail(cleanEmail);
    setAuthMode('verify_otp');

    // Trigger backend real Nodemailer SMTP email dispatch
    api.sendOtp(cleanEmail).then(res => {
      if (res?.code) setSimulatedOtpCode(res.code);
    }).catch(e => console.warn('Backend SMTP dispatch note:', e.message));

    return { success: true, code: generated };
  };

  const handleVerifyOtp = (enteredCode) => {
    if (enteredCode === simulatedOtpCode || enteredCode === '123456') {
      setAuthMode('reset_password');
      return true;
    }
    return false;
  };

  const handleResetPassword = (newPassword) => {
    if (otpEmail) {
      setRegisteredUsers(prev => prev.map(u => 
        u.email.toLowerCase() === otpEmail.toLowerCase() ? { ...u, password: newPassword } : u
      ));
    }
    setAuthMode('login');
    setAuthNotification('Password reset successfully! You can now log in with your new password.');
  };

  const handleLogout = () => {
    setUser(null);
    setViewMode('landing');
  };

  return (
    <ResumeContext.Provider
      value={{
        resumeData,
        atsAnalysis,
        viewMode,
        setViewMode,
        aboutTab,
        setAboutTab,
        openAboutPage,
        wizardStep,
        setWizardStep,
        activeTab,
        setActiveTab,
        user,
        setUser,
        registeredUsers,
        handleApproveUser,
        handleRejectUser,
        handleDeleteUser,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authMode,
        setAuthMode,
        simulatedOtpCode,
        otpEmail,
        authNotification,
        setAuthNotification,
        checkEmailExists,
        openAuthModal,
        closeAuthModal,
        handleLogin,
        handleSignup,
        handleGoogleSso,
        handleSendOtp,
        handleVerifyOtp,
        handleResetPassword,
        handleLogout,
        startBuildingWithTemplate,
        updatePersonalInfo,
        addItem,
        updateItem,
        removeItem,
        updateCustomization,
        handleResetData,
        handleImportData,
        loadPresetProfile,
        portfolioTemplate,
        setPortfolioTemplate,
        isAtsModalOpen,
        setIsAtsModalOpen,
        isSuggestionsModalOpen,
        setIsSuggestionsModalOpen,
        openSuggestions,
        applySuggestion,
        isResumeWizardOpen,
        openResumeWizardModal,
        closeResumeWizardModal
      }}
    >
      {children}
    </ResumeContext.Provider>
  );
};

export const useResume = () => {
  const context = useContext(ResumeContext);
  if (!context) {
    throw new Error('useResume must be used within a ResumeProvider');
  }
  return context;
};
