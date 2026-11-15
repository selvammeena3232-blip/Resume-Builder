import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

export const CertificationsForm = () => {
  const { resumeData, addItem, updateItem, removeItem } = useResume();
  const certifications = resumeData.certifications || [];

  const handleAdd = () => {
    const newCert = {
      id: `cert-${Date.now()}`,
      title: '',
      issuer: '',
      date: ''
    };
    addItem('certifications', newCert);
  };

  return (
    <div className="form-section">
      {certifications.map((cert, index) => (
        <div key={cert.id} className="item-card">
          <div className="item-card-header">
            <span>Certification #{index + 1} - {cert.title || 'New Certification'}</span>
            <button 
              className="btn-remove"
              onClick={() => removeItem('certifications', cert.id)}
            >
              <Trash2 size={13} /> Remove
            </button>
          </div>

          <div className="form-group">
            <label>Certification Name / License</label>
            <input 
              type="text" 
              className="form-input"
              value={cert.title}
              onChange={(e) => updateItem('certifications', cert.id, { title: e.target.value })}
              placeholder="AWS Certified Solutions Architect"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Issuing Organization</label>
              <input 
                type="text" 
                className="form-input"
                value={cert.issuer}
                onChange={(e) => updateItem('certifications', cert.id, { issuer: e.target.value })}
                placeholder="Amazon Web Services"
              />
            </div>
            <div className="form-group">
              <label>Date Obtained</label>
              <input 
                type="text" 
                className="form-input"
                value={cert.date}
                onChange={(e) => updateItem('certifications', cert.id, { date: e.target.value })}
                placeholder="Apr 2023"
              />
            </div>
          </div>
        </div>
      ))}

      <button className="btn-add" onClick={handleAdd}>
        <Plus size={16} /> Add Certification
      </button>
    </div>
  );
};
