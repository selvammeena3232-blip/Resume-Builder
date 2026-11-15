import express from 'express';

const router = express.Router();

router.post('/analyze', (req, res) => {
  try {
    const resumeData = req.body;
    if (!resumeData) {
      return res.status(400).json({ success: false, message: 'Resume data required.' });
    }

    const { personalInfo = {}, experiences = [], educations = [], skills = [], projects = [] } = resumeData;

    let score = 0;
    const checks = [];

    // 1. Personal Info Check (Max 25 pts)
    const hasName = Boolean(personalInfo.fullName && personalInfo.fullName.trim());
    const hasEmail = Boolean(personalInfo.email && personalInfo.email.trim());
    const hasPhone = Boolean(personalInfo.phone && personalInfo.phone.trim());
    const hasBio = Boolean(personalInfo.bio && personalInfo.bio.length > 30);

    let personalScore = 0;
    if (hasName) personalScore += 5;
    if (hasEmail) personalScore += 5;
    if (hasPhone) personalScore += 5;
    if (hasBio) personalScore += 10;
    score += personalScore;

    checks.push({
      category: 'Contact & Summary',
      score: personalScore,
      maxScore: 25,
      passed: personalScore >= 20,
      tip: hasBio ? 'Great summary section.' : 'Add a detailed summary statement.'
    });

    // 2. Work Experience Check (Max 35 pts)
    const expCount = experiences.length;
    let expScore = 0;
    if (expCount >= 1) expScore += 15;
    if (expCount >= 2) expScore += 10;

    const hasActionBullets = experiences.some(exp => 
      exp.description && (exp.description.includes('•') || exp.description.includes('-') || exp.description.length > 50)
    );
    if (hasActionBullets) expScore += 10;
    score += expScore;

    checks.push({
      category: 'Work Experience',
      score: expScore,
      maxScore: 35,
      passed: expScore >= 25,
      tip: expCount >= 2 ? 'Strong experience section.' : 'Include at least 2 work experiences.'
    });

    // 3. Skills Check (Max 20 pts)
    const skillCount = skills.length;
    let skillScore = 0;
    if (skillCount >= 3) skillScore += 10;
    if (skillCount >= 6) skillScore += 10;
    score += skillScore;

    checks.push({
      category: 'Skills & Competencies',
      score: skillScore,
      maxScore: 20,
      passed: skillScore >= 15,
      tip: skillCount >= 6 ? 'Diverse skill set listed.' : 'List at least 6 technical or soft skills.'
    });

    // 4. Education & Projects Check (Max 20 pts)
    let eduScore = educations.length >= 1 ? 10 : 0;
    let projScore = projects.length >= 1 ? 10 : 0;
    const eduProjTotal = eduScore + projScore;
    score += eduProjTotal;

    checks.push({
      category: 'Education & Projects',
      score: eduProjTotal,
      maxScore: 20,
      passed: eduProjTotal >= 10,
      tip: eduScore > 0 ? 'Education provided.' : 'Add your educational background.'
    });

    let grade = 'Needs Work';
    if (score >= 85) grade = 'Excellent (ATS Ready)';
    else if (score >= 70) grade = 'Good (ATS Friendly)';
    else if (score >= 50) grade = 'Average';

    return res.json({
      success: true,
      analysis: {
        score,
        grade,
        checks,
        analyzedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    console.error('[ATS ROUTE] Analysis error:', error);
    res.status(500).json({ success: false, message: 'Failed to run ATS analysis.' });
  }
});

export default router;
