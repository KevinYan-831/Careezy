import express from 'express';
import Resume from '../models/Resume';
import { authenticateToken, AuthRequest } from '../middleware/auth';
import { generateCareerAdvice, enhanceResume, recommendSkills } from '../services/aiService';

const router = express.Router();

// Get career advice (Premium feature)
router.post('/advice', authenticateToken, async (req: AuthRequest, res) => {
  try {
    // Check if user has premium access (simplified for demo)
    // In production, you'd check user subscription status
    const { goals } = req.body;
    
    const resume = await Resume.findOne({ userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found. Please create a resume first.' });
    }

    const advice = await generateCareerAdvice(resume, goals);
    
    res.json({ advice });
  } catch (error) {
    console.error('Career advice error:', error);
    res.status(500).json({ message: 'Error generating career advice' });
  }
});

// Get resume enhancement suggestions (Premium feature)
router.get('/resume-enhancement', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found. Please create a resume first.' });
    }

    const enhancement = await enhanceResume(resume);
    
    res.json(enhancement);
  } catch (error) {
    console.error('Resume enhancement error:', error);
    res.status(500).json({ message: 'Error analyzing resume' });
  }
});

// Get skill recommendations (Premium feature)
router.post('/skill-recommendations', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { targetField } = req.body;
    
    const resume = await Resume.findOne({ userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found. Please create a resume first.' });
    }

    const skills = await recommendSkills(resume, targetField);
    
    res.json({ recommendedSkills: skills });
  } catch (error) {
    console.error('Skill recommendations error:', error);
    res.status(500).json({ message: 'Error generating skill recommendations' });
  }
});

// Career roadmap generation (Premium feature)
router.post('/roadmap', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { targetRole, timeframe } = req.body;
    
    const resume = await Resume.findOne({ userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found. Please create a resume first.' });
    }

    // Generate a structured career roadmap
    const roadmap = {
      currentLevel: 'Entry Level',
      targetRole: targetRole || 'Software Engineer',
      timeframe: timeframe || '12 months',
      milestones: [
        {
          month: 1,
          title: 'Foundation Building',
          tasks: [
            'Complete resume optimization',
            'Build portfolio website',
            'Start networking on LinkedIn'
          ]
        },
        {
          month: 3,
          title: 'Skill Development',
          tasks: [
            'Complete relevant online courses',
            'Build 2-3 projects',
            'Contribute to open source'
          ]
        },
        {
          month: 6,
          title: 'Experience Gaining',
          tasks: [
            'Apply for internships',
            'Attend industry events',
            'Seek mentorship opportunities'
          ]
        },
        {
          month: 9,
          title: 'Job Search Preparation',
          tasks: [
            'Practice technical interviews',
            'Refine portfolio',
            'Expand professional network'
          ]
        },
        {
          month: 12,
          title: 'Active Job Search',
          tasks: [
            'Apply to target companies',
            'Leverage network for referrals',
            'Negotiate job offers'
          ]
        }
      ],
      skillGaps: [
        'Advanced programming concepts',
        'System design knowledge',
        'Industry-specific tools'
      ],
      resources: [
        'Online courses (Coursera, Udemy)',
        'Technical books and documentation',
        'Professional communities and forums'
      ]
    };
    
    res.json({ roadmap });
  } catch (error) {
    console.error('Career roadmap error:', error);
    res.status(500).json({ message: 'Error generating career roadmap' });
  }
});

// Gap analysis (Premium feature)
router.get('/gap-analysis', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { targetRole } = req.query;
    
    const resume = await Resume.findOne({ userId: req.user._id });
    if (!resume) {
      return res.status(404).json({ message: 'Resume not found. Please create a resume first.' });
    }

    // Simplified gap analysis
    const analysis = {
      targetRole: targetRole || 'Software Engineer',
      currentStrengths: [
        'Educational background',
        'Project experience',
        'Technical skills'
      ],
      skillGaps: [
        'Professional work experience',
        'Advanced technical skills',
        'Industry knowledge'
      ],
      experienceGaps: [
        'Internship experience',
        'Team collaboration',
        'Real-world project delivery'
      ],
      recommendations: [
        'Seek internship opportunities',
        'Build more complex projects',
        'Contribute to open source projects',
        'Attend industry meetups and conferences'
      ],
      timeline: {
        immediate: 'Update resume and LinkedIn profile',
        shortTerm: 'Complete relevant certifications',
        mediumTerm: 'Gain practical experience through internships',
        longTerm: 'Build professional network and expertise'
      }
    };
    
    res.json({ analysis });
  } catch (error) {
    console.error('Gap analysis error:', error);
    res.status(500).json({ message: 'Error performing gap analysis' });
  }
});

// Industry insights (Premium feature)
router.get('/industry-insights/:field', authenticateToken, async (req: AuthRequest, res) => {
  try {
    const { field } = req.params;
    
    // Mock industry insights - in production, this would come from real data
    const insights = {
      field,
      marketTrends: [
        'Growing demand for AI/ML skills',
        'Remote work opportunities increasing',
        'Focus on full-stack development'
      ],
      topSkills: [
        'Programming languages (Python, JavaScript)',
        'Cloud platforms (AWS, Azure)',
        'Data analysis and visualization'
      ],
      salaryRange: {
        entry: '$60,000 - $80,000',
        mid: '$80,000 - $120,000',
        senior: '$120,000 - $180,000'
      },
      topCompanies: [
        'Google',
        'Microsoft',
        'Amazon',
        'Meta',
        'Apple'
      ],
      growthProjection: '+15% over next 5 years',
      recommendations: [
        'Focus on cloud technologies',
        'Develop strong problem-solving skills',
        'Build a portfolio of diverse projects'
      ]
    };
    
    res.json({ insights });
  } catch (error) {
    console.error('Industry insights error:', error);
    res.status(500).json({ message: 'Error fetching industry insights' });
  }
});

export default router;