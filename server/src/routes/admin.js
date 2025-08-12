const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Admin guard middleware
const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin' && req.user?.role !== 'super_admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Example: list users (basic fields only)
router.get('/users', authenticateToken, requireAdmin, async (_req, res) => {
  const users = await User.find({}, 'firstName lastName email profileType role createdAt').sort({ createdAt: -1 });
  res.json({ users });
});

// Update user (admin)
router.put('/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const allowed = (({ firstName, lastName, email, profileType, role }) => ({ firstName, lastName, email, profileType, role }))(req.body || {});
    const updated = await User.findByIdAndUpdate(req.params.id, allowed, { new: true, runValidators: true, select: 'firstName lastName email profileType role createdAt' });
    if (!updated) return res.status(404).json({ message: 'User not found' });
    res.json({ user: updated });
  } catch (e) {
    res.status(400).json({ message: e.message || 'Failed to update user' });
  }
});

// Admin stats
router.get('/stats', authenticateToken, requireAdmin, async (_req, res) => {
  const totalUsers = await User.countDocuments();
  const Internship = require('../models/Internship');
  const totalInternships = await Internship.countDocuments();
  res.json({ totalUsers, totalInternships, activeApplications: 0, successRate: 0 });
});

// Delete user
router.delete('/users/:id', authenticateToken, requireAdmin, async (req, res) => {
  try {
    const deleted = await User.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'User not found' });
    res.json({ success: true });
  } catch (e) {
    res.status(400).json({ message: e.message || 'Failed to delete user' });
  }
});

// Recent activity feed
router.get('/activity', authenticateToken, requireAdmin, async (_req, res) => {
  try {
    const Internship = require('../models/Internship');
    const recentUsers = await User.find({}, 'email createdAt').sort({ createdAt: -1 }).limit(5).lean();
    const recentInternships = await Internship.find({}, 'title company createdAt').sort({ createdAt: -1 }).limit(5).lean();

    const activity = [
      ...recentUsers.map((u) => ({ id: String(u._id), type: 'signup', message: `New user: ${u.email}`, timestamp: u.createdAt })),
      ...recentInternships.map((i) => ({ id: String(i._id), type: 'internship', message: `Internship posted: ${i.title} at ${i.company}` , timestamp: i.createdAt })),
    ].sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)).slice(0, 10);

    res.json({ activity });
  } catch (e) {
    console.error('Admin activity error:', e);
    res.json({ activity: [] });
  }
});

module.exports = router;


