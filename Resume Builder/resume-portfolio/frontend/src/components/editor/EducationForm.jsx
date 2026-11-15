import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

export const EducationForm = () => {
  const { resumeData, addItem, updateItem, removeItem } = useResume();
  const { education } = resumeData;

  const handleAdd = () => {
    const newEdu = {
      id: `edu-${Date.now()}`,
      school: '',
      degree: '',
      location: '',
      startDate: '',
      endDate: '',
      description: ''
    };
    addItem('education', newEdu);
  };

  return (
    <div className="form-section">
      {education.map((edu, index) => (
        <div key={edu.id} className="item-card">
          <div className="item-card-header">
            <span>Education #{index + 1} - {edu.school || 'New School'}</span>
            <button 
              className="btn-remove"
              onClick={() => removeItem('education', edu.id)}
            >
              <Trash2 size={13} /> Remove
            </button>
          </div>

          <div className="form-group">
            <label>School / Institution</label>
            <input 
              type="text" 
              className="form-input"
              value={edu.school}
              onChange={(e) => updateItem('education', edu.id, { school: e.target.value })}
              placeholder="UC Berkeley"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Degree / Major</label>
              <input 
                type="text" 
                className="form-input"
                value={edu.degree}
                onChange={(e) => updateItem('education', edu.id, { degree: e.target.value })}
                placeholder="B.S. in Computer Science"
              />
            </div>
            <div className="form-group">
              <label>Location</label>
              <input 
                type="text" 
                className="form-input"
                value={edu.location}
                onChange={(e) => updateItem('education', edu.id, { location: e.target.value })}
                placeholder="Berkeley, CA"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Start Date</label>
              <input 
                type="text" 
                className="form-input"
                value={edu.startDate}
                onChange={(e) => updateItem('education', edu.id, { startDate: e.target.value })}
                placeholder="Aug 2016"
              />
            </div>
            <div className="form-group">
              <label>End Date</label>
              <input 
                type="text" 
                className="form-input"
                value={edu.endDate}
                onChange={(e) => updateItem('education', edu.id, { endDate: e.target.value })}
                placeholder="May 2020"
              />
            </div>
          </div>
        </div>
      ))}

      <button className="btn-add" onClick={handleAdd}>
        <Plus size={16} /> Add Education Record
      </button>
    </div>
  );
};
