const express = require('express');
const Internship = require('../models/Internship');
const Resume = require('../models/Resume');
const { authenticateToken } = require('../middleware/auth');
const { calculateMatchScore } = require('../services/aiService');

const router = express.Router();

// Get all internships with filters
router.get('/', async (req, res) => {
  try {
    const {
      field,
      location,
      remote,
      experienceLevel,
      search,
      page = 1,
      limit = 20
    } = req.query;

    const filter = { isActive: true };

    // Apply filters
    if (field) filter.field = field;
    if (location) filter.location = new RegExp(location, 'i');
    if (remote !== undefined) filter.remote = remote === 'true';
    if (experienceLevel) filter.experienceLevel = experienceLevel;
    if (search) {
      filter.$text = { $search: search };
    }

    const skip = (Number(page) - 1) * Number(limit);
    
    const internships = await Internship.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Internship.countDocuments(filter);

    res.json({
      internships,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Get internships error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get internships with AI matching scores
router.get('/matched', authenticateToken, async (req, res) => {
  try {
    const {
      field,
      location,
      remote,
      experienceLevel,
      page = 1,
      limit = 20
    } = req.query;

    // Get user's resume for matching
    const resume = await Resume.findOne({ userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found. Please create a resume first.' });
    }

    const filter = { isActive: true };

    // Apply filters
    if (field) filter.field = field;
    if (location) filter.location = new RegExp(location, 'i');
    if (remote !== undefined) filter.remote = remote === 'true';
    if (experienceLevel) filter.experienceLevel = experienceLevel;

    const skip = (Number(page) - 1) * Number(limit);
    
    const internships = await Internship.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    // Calculate match scores for each internship
    const internshipsWithScores = await Promise.all(
      internships.map(async (internship) => {
        const matchScore = await calculateMatchScore(resume, internship);
        return {
          ...internship.toObject(),
          matchScore
        };
      })
    );

    // Sort by match score
    internshipsWithScores.sort((a, b) => b.matchScore - a.matchScore);

    const total = await Internship.countDocuments(filter);

    res.json({
      internships: internshipsWithScores,
      pagination: {
        current: Number(page),
        pages: Math.ceil(total / Number(limit)),
        total
      }
    });
  } catch (error) {
    console.error('Get matched internships error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single internship
router.get('/:id', async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);
    if (!internship) {
      return res.status(404).json({ message: 'Internship not found' });
    }
    res.json(internship);
  } catch (error) {
    console.error('Get internship error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create internship (admin only)
router.post('/', authenticateToken, async (req, res) => {
  try {
    if (req.user?.role !== 'admin' && req.user?.role !== 'super_admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const internship = new Internship(req.body);
    await internship.save();
    res.status(201).json(internship);
  } catch (error) {
    console.error('Create internship error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete internship (admin only)
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    if (req.user?.role !== 'admin' && req.user?.role !== 'super_admin') {
      return res.status(403).json({ message: 'Admin access required' });
    }
    const deleted = await Internship.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Not found' });
    res.json({ success: true });
  } catch (error) {
    console.error('Delete internship error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Get available filters
router.get('/meta/filters', async (req, res) => {
  try {
    const fields = await Internship.distinct('field');
    const locations = await Internship.distinct('location');
    const experienceLevels = await Internship.distinct('experienceLevel');
    
    res.json({
      fields,
      locations,
      experienceLevels
    });
  } catch (error) {
    console.error('Get filters error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;