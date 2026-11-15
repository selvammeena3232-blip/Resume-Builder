export const calculateAtsScore = (resumeData) => {
  let score = 0;
  const checks = [];

  const { personalInfo, experiences, education, skills, projects, certifications = [], languages = [] } = resumeData;

  // 1. Personal Info Checks (25 Points)
  let infoScore = 0;
  if (personalInfo.fullName && personalInfo.fullName.trim().length > 2) {
    infoScore += 5;
  }
  if (personalInfo.email && personalInfo.email.includes('@')) {
    infoScore += 5;
  }
  if (personalInfo.phone && personalInfo.phone.trim().length > 6) {
    infoScore += 5;
  }
  if (personalInfo.location && personalInfo.location.trim().length > 2) {
    infoScore += 5;
  }
  if (personalInfo.linkedin || personalInfo.website || personalInfo.github) {
    infoScore += 5;
  }
  score += infoScore;

  checks.push({
    title: "Complete Contact & Online Profile Info",
    passed: infoScore >= 20,
    scoreAwarded: infoScore,
    maxScore: 25,
    tip: infoScore < 20 ? "Add your email, phone, location, and LinkedIn/Portfolio link." : "Contact details are complete and ATS accessible."
  });

  // 2. Summary Check (15 Points)
  const bioWords = personalInfo.bio ? personalInfo.bio.trim().split(/\s+/).length : 0;
  let summaryScore = 0;
  if (bioWords >= 30) {
    summaryScore = 15;
  } else if (bioWords > 10) {
    summaryScore = 8;
  }

  score += summaryScore;
  checks.push({
    title: "Professional Summary Length & Keywords",
    passed: summaryScore === 15,
    scoreAwarded: summaryScore,
    maxScore: 15,
    tip: bioWords < 30 ? "Write a summary of at least 30-50 words highlighting key technical strengths." : "Professional summary is rich with keywords."
  });

  // 3. Work Experience Check (25 Points)
  let expScore = 0;
  if (experiences.length >= 2) {
    expScore += 10;
  } else if (experiences.length === 1) {
    expScore += 5;
  }

  const detailedExp = experiences.filter(e => e.description && e.description.trim().length > 30);
  if (detailedExp.length >= 2) {
    expScore += 15;
  } else if (detailedExp.length === 1) {
    expScore += 8;
  }

  score += expScore;
  checks.push({
    title: "Detailed Work Experience & Action Bullets",
    passed: expScore >= 20,
    scoreAwarded: expScore,
    maxScore: 25,
    tip: expScore < 20 ? "Add at least 2 work experience entries with bullet points describing key accomplishments." : "Work experience details are well structured."
  });

  // 4. Skills Check (15 Points)
  let skillScore = 0;
  if (skills.length >= 6) {
    skillScore = 15;
  } else if (skills.length >= 3) {
    skillScore = 8;
  }

  score += skillScore;
  checks.push({
    title: "Core Skills & Technical Competencies",
    passed: skillScore === 15,
    scoreAwarded: skillScore,
    maxScore: 15,
    tip: skills.length < 6 ? "Include at least 6 relevant technical or professional skills." : "Skills section has great keyword density."
  });

  // 5. Education Check (10 Points)
  let eduScore = 0;
  if (education.length >= 1 && education[0].degree && education[0].school) {
    eduScore = 10;
  }

  score += eduScore;
  checks.push({
    title: "Education & Degree Accreditation",
    passed: eduScore === 10,
    scoreAwarded: eduScore,
    maxScore: 10,
    tip: eduScore < 10 ? "Include your degree, field of study, and school name." : "Education section is verified."
  });

  // 6. Additional Sections Check (10 Points)
  let extraScore = 0;
  if (projects.length > 0 || certifications.length > 0 || languages.length > 0) {
    extraScore = 10;
  }

  score += extraScore;
  checks.push({
    title: "Certifications, Languages, or Projects",
    passed: extraScore === 10,
    scoreAwarded: extraScore,
    maxScore: 10,
    tip: extraScore < 10 ? "Add featured projects, certifications, or languages to boost ATS rank." : "Bonus sections add valuable keywords."
  });

  // Badge Determination
  let badge = "Needs Work";
  let badgeColor = "#f43f5e";
  if (score >= 90) {
    badge = "Excellent (ATS Ready)";
    badgeColor = "#10b981";
  } else if (score >= 75) {
    badge = "Great Resume";
    badgeColor = "#6366f1";
  } else if (score >= 50) {
    badge = "Good Progress";
    badgeColor = "#f59e0b";
  }

  return {
    score,
    badge,
    badgeColor,
    checks
  };
};
