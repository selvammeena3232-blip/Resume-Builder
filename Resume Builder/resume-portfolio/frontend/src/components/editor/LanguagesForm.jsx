import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { Plus, Trash2 } from 'lucide-react';

export const LanguagesForm = () => {
  const { resumeData, addItem, updateItem, removeItem } = useResume();
  const languages = resumeData.languages || [];

  const handleAdd = () => {
    const newLang = {
      id: `lang-${Date.now()}`,
      name: '',
      level: 'Conversational'
    };
    addItem('languages', newLang);
  };

  return (
    <div className="form-section">
      {languages.map((lang) => (
        <div key={lang.id} className="form-row" style={{ alignItems: 'center', marginBottom: '0.6rem' }}>
          <input 
            type="text" 
            className="form-input"
            value={lang.name}
            onChange={(e) => updateItem('languages', lang.id, { name: e.target.value })}
            placeholder="e.g. Spanish"
          />
          <select 
            className="form-select"
            value={lang.level}
            onChange={(e) => updateItem('languages', lang.id, { level: e.target.value })}
          >
            <option value="Native / Fluent">Native / Fluent</option>
            <option value="Advanced">Advanced</option>
            <option value="Conversational">Conversational</option>
            <option value="Basic">Basic</option>
          </select>
          <button 
            className="btn-remove"
            style={{ padding: '0.6rem' }}
            onClick={() => removeItem('languages', lang.id)}
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}

      <button className="btn-add" onClick={handleAdd} style={{ marginTop: '0.75rem' }}>
        <Plus size={16} /> Add Language
      </button>
    </div>
  );
};
