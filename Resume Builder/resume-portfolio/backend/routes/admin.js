import express from 'express';
import { db } from '../../database/db.js';

const router = express.Router();

// Get list of all registered users
router.get('/users', (req, res) => {
  try {
    const users = db.getUsers();
    res.json({ success: true, users });
  } catch (error) {
    console.error('[ADMIN ROUTE] Error fetching users:', error);
    res.status(500).json({ success: false, message: 'Failed to fetch registered users.' });
  }
});

// Approve user
router.patch('/users/:id/approve', (req, res) => {
  try {
    const { id } = req.params;
    const updated = db.updateUserStatus(id, 'Approved');
    res.json({ success: true, user: updated });
  } catch (error) {
    console.error('[ADMIN ROUTE] Error approving user:', error);
    res.status(500).json({ success: false, message: 'Failed to approve user.' });
  }
});

// Reject user
router.patch('/users/:id/reject', (req, res) => {
  try {
    const { id } = req.params;
    const updated = db.updateUserStatus(id, 'Rejected');
    res.json({ success: true, user: updated });
  } catch (error) {
    console.error('[ADMIN ROUTE] Error rejecting user:', error);
    res.status(500).json({ success: false, message: 'Failed to reject user.' });
  }
});

// Delete user
router.delete('/users/:id', (req, res) => {
  try {
    const { id } = req.params;
    db.deleteUser(id);
    res.json({ success: true, message: 'User deleted successfully.' });
  } catch (error) {
    console.error('[ADMIN ROUTE] Error deleting user:', error);
    res.status(500).json({ success: false, message: 'Failed to delete user.' });
  }
});

// Admin stats endpoint
router.get('/stats', (req, res) => {
  try {
    const users = db.getUsers();
    const pendingCount = users.filter(u => u.status === 'Pending').length;
    const approvedCount = users.filter(u => u.status === 'Approved').length;
    res.json({
      success: true,
      stats: {
        totalUsers: users.length,
        approvedUsers: approvedCount,
        pendingUsers: pendingCount,
        systemHealth: '100% Operational',
        serverUptime: process.uptime()
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to fetch admin stats.' });
  }
});

export default router;
