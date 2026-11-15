import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

export const ProjectsForm = () => {
  const { resumeData, addItem, updateItem, removeItem } = useResume();
  const { projects } = resumeData;

  const handleAdd = () => {
    const newProj = {
      id: `proj-${Date.now()}`,
      title: '',
      technologies: '',
      link: '',
      description: ''
    };
    addItem('projects', newProj);
  };

  return (
    <div className="form-section">
      {projects.map((proj, index) => (
        <div key={proj.id} className="item-card">
          <div className="item-card-header">
            <span>Project #{index + 1} - {proj.title || 'New Project'}</span>
            <button 
              className="btn-remove"
              onClick={() => removeItem('projects', proj.id)}
            >
              <Trash2 size={13} /> Remove
            </button>
          </div>

          <div className="form-group">
            <label>Project Title</label>
            <input 
              type="text" 
              className="form-input"
              value={proj.title}
              onChange={(e) => updateItem('projects', proj.id, { title: e.target.value })}
              placeholder="CloudFlow Visualizer"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Technologies Used</label>
              <input 
                type="text" 
                className="form-input"
                value={proj.technologies}
                onChange={(e) => updateItem('projects', proj.id, { technologies: e.target.value })}
                placeholder="React, D3.js, Node.js"
              />
            </div>
            <div className="form-group">
              <label>Project Link / Demo URL</label>
              <input 
                type="url" 
                className="form-input"
                value={proj.link}
                onChange={(e) => updateItem('projects', proj.id, { link: e.target.value })}
                placeholder="https://projectdemo.com"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Project Summary & Key Features</label>
            <textarea 
              rows={3}
              className="form-textarea"
              value={proj.description}
              onChange={(e) => updateItem('projects', proj.id, { description: e.target.value })}
              placeholder="Explain problem solved, feature highlights, user stats..."
            />
          </div>
        </div>
      ))}

      <button className="btn-add" onClick={handleAdd}>
        <Plus size={16} /> Add Featured Project
      </button>
    </div>
  );
};
