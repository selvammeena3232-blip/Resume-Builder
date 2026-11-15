export const INITIAL_USERS = [
  { id: '1', name: 'System Administrator', email: 'admin@foliofy.com', password: 'admin', role: 'System Administrator', status: 'Approved', isAdmin: true, joined: '2025-11-01', resumesCount: 12 },
  { id: '2', name: 'Alex Morgan', email: 'alex.morgan@devstudio.io', password: 'password123', role: 'Software Engineer', status: 'Approved', isAdmin: false, joined: '2026-01-12', resumesCount: 4 },
  { id: '3', name: 'Sarah Jenkins', email: 'sarah.jenkins@productlead.co', password: 'password123', role: 'Product Manager', status: 'Approved', isAdmin: false, joined: '2026-02-04', resumesCount: 2 },
  { id: '4', name: 'David Chen', email: 'david@chen-design.studio', password: 'password123', role: 'UX Designer', status: 'Approved', isAdmin: false, joined: '2026-03-19', resumesCount: 3 }
];

export const DEFAULT_RESUME_DATA = {
  personalInfo: {
    fullName: 'Alex Morgan',
    jobTitle: 'Senior Full Stack Engineer & Cloud Architect',
    email: 'alex.morgan@devstudio.io',
    phone: '+1 (555) 234-5678',
    location: 'San Francisco, CA',
    website: 'https://alexmorgan.dev',
    linkedin: 'https://linkedin.com/in/alexmorgan-dev',
    github: 'https://github.com/alexmorgan',
    bio: 'Passionate Full Stack Architect with 7+ years of experience engineering high-scale web platforms, distributed systems, and modern cloud applications.'
  },
  experiences: [
    {
      id: 'exp-1',
      jobTitle: 'Lead Software Engineer',
      company: 'Vanguard Systems Inc.',
      location: 'San Francisco, CA',
      startDate: '2022-03',
      endDate: '',
      current: true,
      description: '• Spearheaded architectural design of microservices handling over 10M daily active requests with 99.99% uptime.\n• Mentored cross-functional team of 8 engineers and introduced automated CI/CD pipelines reducing deployment cycle time by 45%.'
    },
    {
      id: 'exp-2',
      jobTitle: 'Full Stack Developer',
      company: 'TechFlow Solutions',
      location: 'Austin, TX',
      startDate: '2019-06',
      endDate: '2022-02',
      current: false,
      description: '• Developed responsive React and Node.js web applications, serving 500k+ enterprise users.\n• Optimized database query execution plans, boosting API response speed by 35%.'
    }
  ],
  educations: [
    {
      id: 'edu-1',
      degree: 'B.S. in Computer Science',
      institution: 'University of California, Berkeley',
      location: 'Berkeley, CA',
      startDate: '2015-08',
      endDate: '2019-05',
      grade: '3.8 GPA'
    }
  ],
  skills: [
    { id: 'sk-1', name: 'JavaScript / TypeScript', level: 'Expert', category: 'Technical' },
    { id: 'sk-2', name: 'React & Next.js', level: 'Expert', category: 'Technical' },
    { id: 'sk-3', name: 'Node.js & Express', level: 'Advanced', category: 'Technical' },
    { id: 'sk-4', name: 'PostgreSQL & MongoDB', level: 'Advanced', category: 'Technical' },
    { id: 'sk-5', name: 'Docker & Kubernetes', level: 'Intermediate', category: 'Technical' },
    { id: 'sk-6', name: 'System Design & Architecture', level: 'Expert', category: 'Soft' }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'CloudMetrics Realtime Analytics',
      description: 'High-throughput real-time telemetry dashboard using React, Node, WebSockets, and Redis.',
      link: 'https://github.com/alexmorgan/cloud-metrics',
      technologies: 'React, Node.js, Redis, Docker'
    }
  ],
  customization: {
    activeTemplate: 'modern',
    primaryColor: '#2563eb',
    fontSize: 'medium',
    fontFamily: 'Inter, sans-serif',
    darkMode: false,
    spacing: 'normal'
  }
};
