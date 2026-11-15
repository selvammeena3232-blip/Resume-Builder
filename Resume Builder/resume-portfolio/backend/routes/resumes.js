import express from 'express';
import { db, DEFAULT_RESUME_DATA } from '../../database/db.js';

const router = express.Router();

// Get resume data for user
router.get('/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const resumeData = db.getResume(userId);
    res.json({ success: true, resumeData });
  } catch (error) {
    console.error('[RESUMES ROUTE] Error getting resume data:', error);
    res.status(500).json({ success: false, message: 'Failed to retrieve resume data.' });
  }
});

// Save resume data for user
router.post('/:userId', (req, res) => {
  try {
    const { userId } = req.params;
    const resumeData = req.body;

    if (!resumeData || typeof resumeData !== 'object') {
      return res.status(400).json({ success: false, message: 'Invalid resume data provided.' });
    }

    const saved = db.saveResume(userId, resumeData);
    res.json({ success: true, message: 'Resume saved successfully.', resumeData: saved });
  } catch (error) {
    console.error('[RESUMES ROUTE] Error saving resume data:', error);
    res.status(500).json({ success: false, message: 'Failed to save resume data.' });
  }
});

// Reset resume data to initial default template
router.post('/:userId/reset', (req, res) => {
  try {
    const { userId } = req.params;
    const resetData = db.saveResume(userId, DEFAULT_RESUME_DATA);
    res.json({ success: true, message: 'Resume reset to default.', resumeData: resetData });
  } catch (error) {
    console.error('[RESUMES ROUTE] Error resetting resume:', error);
    res.status(500).json({ success: false, message: 'Failed to reset resume.' });
  }
});

export default router;
