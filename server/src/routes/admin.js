const express = require('express');
const { authenticateToken } = require('../middleware/auth');
const User = require('../models/User');

const router = express.Router();

// Admin guard middleware
const requireAdmin = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required' });
  }
  next();
};

// Example: list users (basic fields only)
router.get('/users', authenticateToken, requireAdmin, async (_req, res) => {
  const users = await User.find({}, 'firstName lastName email profileType role createdAt').sort({ createdAt: -1 });
  res.json({ users });
});

// Example: simple activity feed (stub for now)
router.get('/activity', authenticateToken, requireAdmin, async (_req, res) => {
  // In a real app, this would query an Activity collection. Return basic stub for now.
  res.json({
    activity: [
      { id: '1', type: 'signup', message: 'New user registered', timestamp: new Date().toISOString() },
    ],
  });
});

module.exports = router;


