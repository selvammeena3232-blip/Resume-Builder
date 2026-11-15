import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

export const SkillsForm = () => {
  const { resumeData, addItem, updateItem, removeItem } = useResume();
  const { skills } = resumeData;

  const handleAdd = () => {
    const newSkill = {
      id: `sk-${Date.now()}`,
      name: '',
      level: 'Advanced'
    };
    addItem('skills', newSkill);
  };

  return (
    <div className="form-section">
      {skills.map((sk) => (
        <div key={sk.id} className="form-row" style={{ alignItems: 'center', marginBottom: '0.6rem' }}>
          <input 
            type="text" 
            className="form-input"
            value={sk.name}
            onChange={(e) => updateItem('skills', sk.id, { name: e.target.value })}
            placeholder="e.g. React & TypeScript"
          />
          <select 
            className="form-select"
            value={sk.level}
            onChange={(e) => updateItem('skills', sk.id, { level: e.target.value })}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>
          <button 
            className="btn-remove"
            style={{ padding: '0.6rem' }}
            onClick={() => removeItem('skills', sk.id)}
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}

      <button className="btn-add" onClick={handleAdd} style={{ marginTop: '0.75rem' }}>
        <Plus size={16} /> Add Skill Item
      </button>
    </div>
  );
};
