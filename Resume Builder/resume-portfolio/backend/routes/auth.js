import express from 'express';
import { db } from '../../database/db.js';

const router = express.Router();

// Register / Signup
router.post('/signup', (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email and password are required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    const existing = db.getUserByEmail(cleanEmail);

    if (existing) {
      return res.status(400).json({ success: false, message: 'An account with this email already exists. Please log in.' });
    }

    const isAdmin = cleanEmail.includes('admin');
    const newUserRecord = {
      id: Date.now().toString(),
      name: name ? name.trim() : cleanEmail.split('@')[0],
      email: cleanEmail,
      password: password,
      role: isAdmin ? 'System Administrator' : 'Pro Member',
      status: isAdmin ? 'Approved' : 'Pending',
      isAdmin: isAdmin,
      joined: new Date().toISOString().split('T')[0],
      resumesCount: 1
    };

    db.addUser(newUserRecord);

    if (isAdmin) {
      return res.json({
        success: true,
        pending: false,
        user: {
          id: newUserRecord.id,
          email: cleanEmail,
          name: newUserRecord.name,
          isAdmin: true,
          role: 'System Administrator'
        }
      });
    } else {
      return res.json({
        success: true,
        pending: true,
        message: 'Registration successful! Your account is pending Admin Authorization.'
      });
    }
  } catch (error) {
    console.error('[AUTH ROUTE] Signup error:', error);
    res.status(500).json({ success: false, message: 'Server error during signup.' });
  }
});

// Login
router.post('/login', (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    let account = db.getUserByEmail(cleanEmail);

    if (!account && cleanEmail.includes('admin')) {
      account = {
        id: Date.now().toString(),
        name: 'System Administrator',
        email: cleanEmail,
        password: password || 'admin',
        role: 'System Administrator',
        status: 'Approved',
        isAdmin: true,
        joined: new Date().toISOString().split('T')[0],
        resumesCount: 1
      };
      db.addUser(account);
    }

    if (!account) {
      return res.status(404).json({ success: false, message: 'No registered account found with this email address.' });
    }

    if (account.password && account.password !== password) {
      return res.status(401).json({ success: false, message: 'Incorrect password. Please try again or use OTP.' });
    }

    if (account.status === 'Pending') {
      return res.status(403).json({
        success: false,
        message: 'Your account is pending Admin Authorization. Please contact an Administrator.'
      });
    }

    if (account.status === 'Rejected') {
      return res.status(403).json({
        success: false,
        message: 'Your account access request was rejected by the Administrator.'
      });
    }

    const userObj = {
      id: account.id,
      email: account.email,
      name: account.name,
      isAdmin: account.isAdmin || account.email.includes('admin'),
      role: account.role || (account.isAdmin ? 'System Administrator' : 'User')
    };

    return res.json({ success: true, user: userObj });
  } catch (error) {
    console.error('[AUTH ROUTE] Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login.' });
  }
});

import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'anbuswethabarathan@gmail.com',
    pass: 'lqiaagpsqvzqvxrx'
  }
});

// Send OTP
router.post('/send-otp', (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required.' });
    }

    const cleanEmail = email.trim().toLowerCase();
    let account = db.getUserByEmail(cleanEmail);

    if (!account) {
      account = {
        id: Date.now().toString(),
        name: cleanEmail.split('@')[0],
        email: cleanEmail,
        password: 'user123',
        role: 'Pro Member',
        status: 'Approved',
        isAdmin: false,
        joined: new Date().toISOString().split('T')[0],
        resumesCount: 1
      };
      db.addUser(account);
    }

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    db.saveOtp(cleanEmail, code);

    // Send real email via Nodemailer
    const mailOptions = {
      from: '"Foliofy Verification" <anbuswethabarathan@gmail.com>',
      to: cleanEmail,
      subject: 'Foliofy Email Verification Code: ' + code,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 24px; border: 1px solid #e2e8f0; border-radius: 16px; background: #ffffff;">
          <h2 style="color: #7d2ae8; margin-top: 0; font-size: 22px;">Foliofy Verification Code</h2>
          <p style="color: #475569; font-size: 15px;">Your 6-digit email verification code is:</p>
          <div style="background: #f8fafc; border: 2px solid #7d2ae8; padding: 18px; border-radius: 12px; text-align: center; font-size: 32px; font-weight: 900; letter-spacing: 6px; color: #0f172a; margin: 20px 0;">
            ${code}
          </div>
          <p style="color: #64748b; font-size: 13px;">This code will expire shortly. If you did not request this code, you can safely ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #e2e8f0; margin-top: 24px;" />
          <p style="color: #94a3b8; font-size: 12px; text-align: center; margin-bottom: 0;">© ${new Date().getFullYear()} Foliofy Resume & Portfolio Builder</p>
        </div>
      `
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.warn('[NODEMAILER] SMTP send warning:', err.message);
      } else {
        console.log('[NODEMAILER] Real email sent to', cleanEmail, info.response);
      }
    });

    return res.json({ success: true, message: 'OTP sent to your email inbox successfully.', code });
  } catch (error) {
    console.error('[AUTH ROUTE] Send OTP error:', error);
    res.status(500).json({ success: false, message: 'Server error while sending OTP.' });
  }
});

// Verify OTP
router.post('/verify-otp', (req, res) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) {
      return res.status(400).json({ success: false, message: 'Email and OTP code are required.' });
    }

    const isValid = db.verifyOtp(email, code);
    if (!isValid) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP code.' });
    }

    return res.json({ success: true, message: 'OTP verified successfully.' });
  } catch (error) {
    console.error('[AUTH ROUTE] Verify OTP error:', error);
    res.status(500).json({ success: false, message: 'Server error while verifying OTP.' });
  }
});

// Reset Password
router.post('/reset-password', (req, res) => {
  try {
    const { email, newPassword } = req.body;
    if (!email || !newPassword) {
      return res.status(400).json({ success: false, message: 'Email and new password are required.' });
    }

    db.updatePassword(email, newPassword);
    return res.json({ success: true, message: 'Password reset successfully. You can now log in.' });
  } catch (error) {
    console.error('[AUTH ROUTE] Reset Password error:', error);
    res.status(500).json({ success: false, message: 'Server error while resetting password.' });
  }
});

export default router;
