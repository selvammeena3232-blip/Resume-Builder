import React from 'react';
import { useResume } from '../../context/ResumeContext';

const colorPresets = [
  { name: 'Indigo', value: '#6366f1' },
  { name: 'Violet', value: '#8b5cf6' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Emerald', value: '#10b981' },
  { name: 'Rose', value: '#f43f5e' },
  { name: 'Amber', value: '#f59e0b' },
  { name: 'Slate', value: '#0f172a' },
];

const fontFamilies = [
  'Plus Jakarta Sans',
  'Inter',
  'Outfit',
  'Fira Code',
  'Georgia'
];

export const CustomizerForm = () => {
  const { resumeData, updateCustomization } = useResume();
  const { activeTemplate, themeColor, fontFamily } = resumeData.customization;

  return (
    <div className="form-section">
      <div className="form-group">
        <label>Active Template Preset</label>
        <select 
          className="form-select"
          value={activeTemplate}
          onChange={(e) => updateCustomization('activeTemplate', e.target.value)}
        >
          <option value="modern">Modern Minimal (2-Column Accent)</option>
          <option value="creative">Creative Glassmorphism (Vibrant Gradient)</option>
          <option value="executive">Executive Classic (Corporate Clean)</option>
          <option value="portfolio">Interactive Portfolio View</option>
        </select>
      </div>

      <div className="form-group">
        <label>Primary Theme Color</label>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
          {colorPresets.map((c) => (
            <button
              key={c.value}
              type="button"
              onClick={() => updateCustomization('themeColor', c.value)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                backgroundColor: c.value,
                border: themeColor === c.value ? '3px solid #ffffff' : '2px solid transparent',
                cursor: 'pointer',
                boxShadow: themeColor === c.value ? '0 0 10px ' + c.value : 'none',
                transition: 'transform 0.15s ease'
              }}
              title={c.name}
            />
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Typography Style</label>
        <select 
          className="form-select"
          value={fontFamily}
          onChange={(e) => updateCustomization('fontFamily', e.target.value)}
        >
          {fontFamilies.map((font) => (
            <option key={font} value={font}>{font}</option>
          ))}
        </select>
      </div>
    </div>
  );
};
