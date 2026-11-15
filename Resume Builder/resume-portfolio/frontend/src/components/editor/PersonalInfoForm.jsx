import React, { useRef } from 'react';
import { useResume } from '../../context/ResumeContext';
import { Camera, Sparkles } from 'lucide-react';

export const PersonalInfoForm = () => {
  const { resumeData, updatePersonalInfo, openSuggestions } = useResume();
  const { personalInfo } = resumeData;
  const photoInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    updatePersonalInfo(name, value);
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvt) => {
        updatePersonalInfo('photoUrl', uploadEvt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="form-section">
      {/* Profile Photo Uploader */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem', padding: '0.85rem', background: 'var(--bg-primary)', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
        <div style={{ position: 'relative' }}>
          <img 
            src={personalInfo.photoUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'} 
            alt="Profile Preview" 
            style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-primary)' }}
          />
          <button 
            type="button"
            onClick={() => photoInputRef.current?.click()}
            style={{ position: 'absolute', bottom: -2, right: -2, background: 'var(--accent-primary)', color: '#fff', border: 'none', borderRadius: '50%', padding: '4px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            title="Upload Profile Photo"
          >
            <Camera size={12} />
          </button>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '0.825rem', fontWeight: '700' }}>Profile Photo</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Upload image for photo-friendly Zety templates</div>
        </div>
        <input 
          type="file" 
          ref={photoInputRef} 
          style={{ display: 'none' }} 
          accept="image/*" 
          onChange={handlePhotoUpload} 
        />
      </div>

      <div className="form-group">
        <label>Full Name</label>
        <input 
          type="text" 
          name="fullName" 
          className="form-input" 
          value={personalInfo.fullName || ''} 
          onChange={handleChange}
          placeholder="e.g. Alex Morgan"
        />
      </div>

      <div className="form-group">
        <label>Job Title / Target Headline</label>
        <input 
          type="text" 
          name="jobTitle" 
          className="form-input" 
          value={personalInfo.jobTitle || ''} 
          onChange={handleChange}
          placeholder="e.g. Senior Full Stack Engineer"
        />
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            name="email" 
            className="form-input" 
            value={personalInfo.email || ''} 
            onChange={handleChange}
            placeholder="alex@example.com"
          />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input 
            type="text" 
            name="phone" 
            className="form-input" 
            value={personalInfo.phone || ''} 
            onChange={handleChange}
            placeholder="+1 (555) 000-0000"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>Location (City, Country)</label>
          <input 
            type="text" 
            name="location" 
            className="form-input" 
            value={personalInfo.location || ''} 
            onChange={handleChange}
            placeholder="San Francisco, CA"
          />
        </div>
        <div className="form-group">
          <label>Portfolio / Website</label>
          <input 
            type="url" 
            name="website" 
            className="form-input" 
            value={personalInfo.website || ''} 
            onChange={handleChange}
            placeholder="https://alexmorgan.dev"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label>GitHub Profile</label>
          <input 
            type="url" 
            name="github" 
            className="form-input" 
            value={personalInfo.github || ''} 
            onChange={handleChange}
            placeholder="https://github.com/username"
          />
        </div>
        <div className="form-group">
          <label>LinkedIn Profile</label>
          <input 
            type="url" 
            name="linkedin" 
            className="form-input" 
            value={personalInfo.linkedin || ''} 
            onChange={handleChange}
            placeholder="https://linkedin.com/in/username"
          />
        </div>
      </div>

      <div className="form-group">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
          <label style={{ margin: 0 }}>Professional Summary / Objective</label>
          <button 
            type="button" 
            onClick={() => openSuggestions({ section: 'bio' })}
            style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
          >
            <Sparkles size={12} /> AI Suggestions
          </button>
        </div>
        <textarea 
          name="bio" 
          rows={4} 
          className="form-textarea" 
          value={personalInfo.bio || ''} 
          onChange={handleChange}
          placeholder="Brief overview of key strengths, career background, and metrics..."
        />
      </div>
    </div>
  );
};
