import { initialResumeData } from '../data/sampleData';

const STORAGE_KEY = 'craft_resume_builder_data';

export const loadSavedResumeData = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.error('Failed to load resume data from localStorage:', error);
  }
  return initialResumeData;
};

export const saveResumeData = (data) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Failed to save resume data to localStorage:', error);
  }
};

export const resetResumeData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to reset resume data:', error);
  }
  return initialResumeData;
};
