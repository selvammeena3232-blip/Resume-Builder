import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import adminRoutes from './routes/admin.js';
import resumeRoutes from './routes/resumes.js';
import atsRoutes from './routes/ats.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
  origin: '*',
  credentials: true
}));
app.use(express.json({ limit: '10mb' }));

// Request Logger
app.use((req, res, next) => {
  console.log(`[BACKEND SERVER] ${new Date().toISOString()} | ${req.method} ${req.url}`);
  next();
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'online',
    service: 'Foliofy Backend Server (Node/Express)',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/resumes', resumeRoutes);
app.use('/api/ats', atsRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error('[BACKEND SERVER] Unhandled Error:', err);
  res.status(500).json({ success: false, message: 'Internal Server Error', error: err.message });
});

// 404 Route Handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.method} ${req.url} not found` });
});

app.listen(PORT, () => {
  console.log(`====================================================`);
  console.log(`🎨 Frontend React App: http://localhost:5173`);
  console.log(`🚀 Backend Express Server: http://localhost:${PORT}`);
  console.log(`💾 Database Storage: database/data/db.json`);
  console.log(`====================================================`);
});
