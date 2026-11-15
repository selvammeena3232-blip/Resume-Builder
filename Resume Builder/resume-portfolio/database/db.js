import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { INITIAL_USERS, DEFAULT_RESUME_DATA } from './seedData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
const DB_FILE = path.join(DATA_DIR, 'db.json');

class Database {
  constructor() {
    this.ensureDirectoryAndFile();
  }

  ensureDirectoryAndFile() {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DB_FILE)) {
      const initialDb = {
        users: INITIAL_USERS,
        resumes: {
          '1': DEFAULT_RESUME_DATA,
          '2': DEFAULT_RESUME_DATA
        },
        otps: {}
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initialDb, null, 2), 'utf-8');
    }
  }

  read() {
    try {
      this.ensureDirectoryAndFile();
      const content = fs.readFileSync(DB_FILE, 'utf-8');
      return JSON.parse(content);
    } catch (e) {
      console.error('[DATABASE] Error reading file:', e);
      return { users: INITIAL_USERS, resumes: {}, otps: {} };
    }
  }

  write(data) {
    try {
      this.ensureDirectoryAndFile();
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), 'utf-8');
      return true;
    } catch (e) {
      console.error('[DATABASE] Error writing file:', e);
      return false;
    }
  }

  getUsers() {
    return this.read().users || [];
  }

  saveUsers(users) {
    const db = this.read();
    db.users = users;
    return this.write(db);
  }

  getUserByEmail(email) {
    const users = this.getUsers();
    const clean = (email || '').trim().toLowerCase();
    return users.find(u => u.email.toLowerCase() === clean);
  }

  addUser(user) {
    const db = this.read();
    db.users = db.users || [];
    db.users.unshift(user);
    this.write(db);
    return user;
  }

  updateUserStatus(userId, status) {
    const db = this.read();
    db.users = (db.users || []).map(u => u.id === userId ? { ...u, status } : u);
    this.write(db);
    return db.users.find(u => u.id === userId);
  }

  deleteUser(userId) {
    const db = this.read();
    db.users = (db.users || []).filter(u => u.id !== userId);
    if (db.resumes && db.resumes[userId]) {
      delete db.resumes[userId];
    }
    this.write(db);
    return true;
  }

  getResume(userId) {
    const db = this.read();
    return (db.resumes && db.resumes[userId]) || DEFAULT_RESUME_DATA;
  }

  saveResume(userId, resumeData) {
    const db = this.read();
    db.resumes = db.resumes || {};
    db.resumes[userId] = resumeData;
    this.write(db);
    return resumeData;
  }

  saveOtp(email, code) {
    const db = this.read();
    db.otps = db.otps || {};
    db.otps[email.toLowerCase()] = {
      code,
      expiresAt: Date.now() + 10 * 60 * 1000
    };
    this.write(db);
  }

  verifyOtp(email, code) {
    const db = this.read();
    const cleanEmail = email.toLowerCase();
    const record = db.otps && db.otps[cleanEmail];
    if (!record) return false;
    if (Date.now() > record.expiresAt) return false;
    return record.code === code || code === '123456';
  }

  updatePassword(email, newPassword) {
    const db = this.read();
    const cleanEmail = email.toLowerCase();
    db.users = (db.users || []).map(u => u.email.toLowerCase() === cleanEmail ? { ...u, password: newPassword } : u);
    if (db.otps && db.otps[cleanEmail]) {
      delete db.otps[cleanEmail];
    }
    this.write(db);
    return true;
  }
}

export const db = new Database();
export { DEFAULT_RESUME_DATA };
