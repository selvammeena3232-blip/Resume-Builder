import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2, Sparkles } from 'lucide-react';

export const ExperienceForm = () => {
  const { resumeData, addItem, updateItem, removeItem, openSuggestions } = useResume();
  const { experiences } = resumeData;

  const handleAdd = () => {
    const newExp = {
      id: `exp-${Date.now()}`,
      company: '',
      role: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    addItem('experiences', newExp);
  };

  return (
    <div className="form-section">
      {experiences.map((exp, index) => (
        <div key={exp.id} className="item-card">
          <div className="item-card-header">
            <span>Experience #{index + 1} - {exp.company || 'New Company'}</span>
            <button 
              className="btn-remove"
              onClick={() => removeItem('experiences', exp.id)}
            >
              <Trash2 size={13} /> Remove
            </button>
          </div>

          <div className="form-group">
            <label>Company / Organization</label>
            <input 
              type="text" 
              className="form-input"
              value={exp.company}
              onChange={(e) => updateItem('experiences', exp.id, { company: e.target.value })}
              placeholder="Apex Tech Innovations"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Role / Position</label>
              <input 
                type="text" 
                className="form-input"
                value={exp.role}
                onChange={(e) => updateItem('experiences', exp.id, { role: e.target.value })}
                placeholder="Senior Full Stack Engineer"
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input 
                type="text" 
                className="form-input"
                value={exp.location}
                onChange={(e) => updateItem('experiences', exp.id, { location: e.target.value })}
                placeholder="San Francisco, CA"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input 
                type="text" 
                className="form-input"
                value={exp.startDate}
                onChange={(e) => updateItem('experiences', exp.id, { startDate: e.target.value })}
                placeholder="Jan 2023"
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input 
                type="text" 
                className="form-input"
                value={exp.endDate}
                onChange={(e) => updateItem('experiences', exp.id, { endDate: e.target.value })}
                placeholder="Present / Dec 2024"
              />
            </div>
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
              <label style={{ margin: 0 }}>Key Responsibilities & Accomplishments</label>
              <button 
                type="button" 
                onClick={() => openSuggestions({ section: 'experience', id: exp.id })}
                style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', fontSize: '0.75rem', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
              >
                <Sparkles size={12} /> Add AI Bullets
              </button>
            </div>
            <textarea 
              rows={3}
              className="form-textarea"
              value={exp.description}
              onChange={(e) => updateItem('experiences', exp.id, { description: e.target.value })}
              placeholder="Described key achievements, measurable metrics, technologies used..."
            />
          </div>
        </div>
      ))}

      <button className="btn-add" onClick={handleAdd}>
        <Plus size={16} /> Add Work Experience
      </button>
    </div>
  );
};
