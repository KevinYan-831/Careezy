const express = require('express');
const Resume = require('../models/Resume');
const { authenticateToken, AuthRequest } = require('../middleware/auth');
const { generateLatexResume, generateCustomLatexResume } = require('../services/latexService');
const { parseCommonAppData } = require('../services/aiService');

const router = express.Router();

// Get user's resume
router.get('/', authenticateToken, async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }
    res.json(resume);
  } catch (error) {
    console.error('Get resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Create or update resume
router.post('/', authenticateToken, async (req, res) => {
  try {
    const resumeData = req.body;
    resumeData.userId = req.user._id;

    // Generate LaTeX code
    const template = req.query.template === 'custom' ? 'custom' : 'default';
    const latexCode = template === 'custom' ? generateCustomLatexResume(resumeData) : generateLatexResume(resumeData);
    resumeData.latexCode = latexCode;

    const existingResume = await Resume.findOne({ userId: req.user._id });
    
    let resume;
    if (existingResume) {
      resume = await Resume.findOneAndUpdate(
        { userId: req.user._id },
        resumeData,
        { new: true, runValidators: true }
      );
    } else {
      resume = new Resume(resumeData);
      await resume.save();
    }

    res.json(resume);
  } catch (error) {
    console.error('Save resume error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Parse Common App data (for freshmen)
router.post('/parse-common-app', authenticateToken, async (req, res) => {
  try {
    const { commonAppData } = req.body;
    
    // Use AI service to parse Common App data
    const parsedData = await parseCommonAppData(commonAppData);
    
    // Create resume with parsed data
    const resumeData = {
      userId: req.user._id,
      ...parsedData
    };

    // Generate LaTeX code
    const template = req.query.template === 'custom' ? 'custom' : 'default';
    const latexCode = template === 'custom' ? generateCustomLatexResume(resumeData) : generateLatexResume(resumeData);
    resumeData.latexCode = latexCode;

    const resume = new Resume(resumeData);
    await resume.save();

    res.json(resume);
  } catch (error) {
    console.error('Parse Common App error:', error);
    res.status(500).json({ message: 'Error parsing Common App data' });
  }
});

// Generate PDF
router.get('/pdf', authenticateToken, async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Here you would integrate with a LaTeX to PDF service
    // For now, return the LaTeX code
    res.json({ latexCode: resume.latexCode });
  } catch (error) {
    console.error('Generate PDF error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// Update specific section
router.patch('/section/:sectionName', authenticateToken, async (req, res) => {
  try {
    const { sectionName } = req.params;
    const sectionData = req.body;

    const resume = await Resume.findOne({ userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found' });
    }

    // Update specific section; allow activities alias
    const targetSection = sectionName === 'extracurriculars' ? 'activities' : sectionName;
    resume[targetSection] = sectionData;
    
    // Regenerate LaTeX code
    resume.latexCode = generateLatexResume(resume);
    
    await resume.save();
    res.json(resume);
  } catch (error) {
    console.error('Update section error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;