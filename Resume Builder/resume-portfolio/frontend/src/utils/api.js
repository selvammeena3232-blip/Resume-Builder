const API_BASE = '/api';

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.message || `API request failed with status ${response.status}`);
  }
  return data;
}

export const api = {
  // Health
  async getHealth() {
    try {
      const res = await fetch(`${API_BASE}/health`);
      return await handleResponse(res);
    } catch (e) {
      console.warn('Backend server offline:', e.message);
      return null;
    }
  },

  // Auth
  async signup(fullName, email, password) {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: fullName, email, password })
    });
    return await handleResponse(res);
  },

  async login(email, password) {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return await handleResponse(res);
  },

  async sendOtp(email) {
    const res = await fetch(`${API_BASE}/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });
    return await handleResponse(res);
  },

  async verifyOtp(email, code) {
    const res = await fetch(`${API_BASE}/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, code })
    });
    return await handleResponse(res);
  },

  async resetPassword(email, newPassword) {
    const res = await fetch(`${API_BASE}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, newPassword })
    });
    return await handleResponse(res);
  },

  // Admin
  async getAdminUsers() {
    const res = await fetch(`${API_BASE}/admin/users`);
    return await handleResponse(res);
  },

  async approveUser(userId) {
    const res = await fetch(`${API_BASE}/admin/users/${userId}/approve`, {
      method: 'PATCH'
    });
    return await handleResponse(res);
  },

  async rejectUser(userId) {
    const res = await fetch(`${API_BASE}/admin/users/${userId}/reject`, {
      method: 'PATCH'
    });
    return await handleResponse(res);
  },

  async deleteUser(userId) {
    const res = await fetch(`${API_BASE}/admin/users/${userId}`, {
      method: 'DELETE'
    });
    return await handleResponse(res);
  },

  async getAdminStats() {
    const res = await fetch(`${API_BASE}/admin/stats`);
    return await handleResponse(res);
  },

  // Resumes
  async getResume(userId = '1') {
    const res = await fetch(`${API_BASE}/resumes/${userId}`);
    return await handleResponse(res);
  },

  async saveResume(userId = '1', resumeData) {
    const res = await fetch(`${API_BASE}/resumes/${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resumeData)
    });
    return await handleResponse(res);
  },

  async resetResume(userId = '1') {
    const res = await fetch(`${API_BASE}/resumes/${userId}/reset`, {
      method: 'POST'
    });
    return await handleResponse(res);
  },

  // ATS
  async analyzeAts(resumeData) {
    const res = await fetch(`${API_BASE}/ats/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(resumeData)
    });
    return await handleResponse(res);
  }
};
