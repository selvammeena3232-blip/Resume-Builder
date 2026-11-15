import React from 'react';
import { useResume } from '../../context/ResumeContext';

const colorPresets = [
  { name: 'Zety Indigo', value: '#6366f1' },
  { name: 'Zety Violet', value: '#8b5cf6' },
  { name: 'Zety Cyan', value: '#06b6d4' },
  { name: 'Zety Emerald', value: '#10b981' },
  { name: 'Zety Rose', value: '#f43f5e' },
  { name: 'Zety Amber', value: '#f59e0b' },
  { name: 'Zety Slate', value: '#0f172a' },
];

const fontFamilies = [
  'Plus Jakarta Sans',
  'Inter',
  'Outfit',
  'Fira Code',
  'Georgia'
];

export const SpacingCustomizer = () => {
  const { resumeData, updateCustomization } = useResume();
  const { activeTemplate, themeColor, fontFamily, fontSize, lineSpacing, paperMargin, showPhoto } = resumeData.customization;

  return (
    <div className="form-section">
      <div className="form-group">
        <label>Active Template Preset</label>
        <select 
          className="form-select"
          value={activeTemplate || 'cascade'}
          onChange={(e) => updateCustomization('activeTemplate', e.target.value)}
        >
          <option value="cascade">Zety Cascade (2-Column Sidebar + Progress Bars)</option>
          <option value="primo">Zety Primo (Modern Timeline Header)</option>
          <option value="cubic">Zety Cubic (3-Tone Boxed Cards)</option>
          <option value="crisp">Zety Crisp (Executive Fine Line)</option>
          <option value="modern">Modern Minimal (Standard 2-Column)</option>
          <option value="creative">Creative Glassmorphism (Vibrant)</option>
          <option value="portfolio">Interactive Portfolio Website</option>
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
        <label>Typography Font Family</label>
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

      <div className="form-row">
        <div className="form-group">
          <label>Font Size</label>
          <select 
            className="form-select"
            value={fontSize || 'normal'}
            onChange={(e) => updateCustomization('fontSize', e.target.value)}
          >
            <option value="compact">Small / Compact</option>
            <option value="normal">Standard</option>
            <option value="spacious">Large</option>
          </select>
        </div>

        <div className="form-group">
          <label>Line Spacing</label>
          <select 
            className="form-select"
            value={lineSpacing || 'normal'}
            onChange={(e) => updateCustomization('lineSpacing', e.target.value)}
          >
            <option value="compact">Tight</option>
            <option value="normal">Normal</option>
            <option value="relaxed">Relaxed</option>
          </select>
        </div>
      </div>

      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer', textTransform: 'none', fontWeight: '600' }}>
          <input 
            type="checkbox" 
            checked={showPhoto !== false} 
            onChange={(e) => updateCustomization('showPhoto', e.target.checked)} 
          />
          Show Profile Photo in Templates
        </label>
      </div>
    </div>
  );
};
