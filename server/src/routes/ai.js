const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();

const router = express.Router();

const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;
const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!DEEPSEEK_API_KEY) {
  console.warn('DEEPSEEK_API_KEY not found in environment variables');
}

// Helper function to make DeepSeek API calls
const callDeepSeekAPI = async (messages, maxTokens = 1000) => {
  try {
    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-r1',
        messages,
        max_tokens: maxTokens,
        temperature: 0.7,
        stream: false,
      },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('DeepSeek API Error:', error.response?.data || error.message);
    throw new Error('Failed to get AI response');
  }
};

// Helper to call OpenAI chat completions
const callOpenAI = async (messages, maxTokens = 1000, model = 'gpt-4o-mini') => {
  if (!OPENAI_API_KEY) throw new Error('OpenAI API key not configured');
  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      { model, messages, max_tokens: maxTokens, temperature: 0.7 },
      { headers: { Authorization: `Bearer ${OPENAI_API_KEY}` } }
    );
    return response.data.choices[0]?.message?.content || '';
  } catch (error) {
    console.error('OpenAI API Error:', error.response?.data || error.message);
    throw new Error('Failed to get AI response');
  }
};

// Career coaching endpoint
router.post('/career-advice', async (req, res) => {
  try {
    const { userProfile, question, context, isPremium } = req.body;

    if (!question) {
      return res.status(400).json({ error: 'Question is required' });
    }

    const systemPrompt = `You are an expert career coach specializing in helping college students and recent graduates. 
Provide personalized, actionable career advice based on the user's profile and question. 
Be encouraging, specific, and practical in your recommendations.`;

    const userPrompt = `
User Profile: ${JSON.stringify(userProfile || {})}
Context: ${context || 'General career advice'}
Question: ${question}

Please provide detailed, actionable career advice.`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ];

    let advice;
    // Default: DeepSeek for all users
    // Premium: use OpenAI if key present, else still DeepSeek
    if (isPremium && OPENAI_API_KEY) {
      try {
        advice = await callOpenAI(messages, 1500);
      } catch (e) {
        console.warn('OpenAI failed, falling back to DeepSeek');
        advice = await callDeepSeekAPI(messages, 1500);
      }
    } else {
      advice = await callDeepSeekAPI(messages, 1500);
    }

    res.json({
      success: true,
      advice,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Career advice error:', error);
    res.status(500).json({
      error: 'Failed to generate career advice',
      message: error.message,
    });
  }
});

// Resume improvement suggestions
router.post('/resume-suggestions', async (req, res) => {
  try {
    const { resumeData, targetRole, industry } = req.body;

    if (!resumeData) {
      return res.status(400).json({ error: 'Resume data is required' });
    }

    const systemPrompt = `You are an expert resume reviewer and career counselor. 
Analyze the provided resume data and provide specific, actionable suggestions for improvement. 
Focus on content, formatting, keywords, and alignment with the target role and industry.`;

    const userPrompt = `
Resume Data: ${JSON.stringify(resumeData)}
Target Role: ${targetRole || 'Not specified'}
Target Industry: ${industry || 'Not specified'}

Please provide:
1. Overall assessment
2. Specific improvement suggestions
3. Missing elements
4. Keyword recommendations
5. Formatting suggestions`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ];

    const suggestions = await callDeepSeekAPI(messages, 2000);

    res.json({
      success: true,
      suggestions,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Resume suggestions error:', error);
    res.status(500).json({
      error: 'Failed to generate resume suggestions',
      message: error.message,
    });
  }
});

// Skill gap analysis
router.post('/skill-analysis', async (req, res) => {
  try {
    const { currentSkills, targetRole, industry, experience } = req.body;

    if (!currentSkills || !targetRole) {
      return res.status(400).json({ error: 'Current skills and target role are required' });
    }

    const systemPrompt = `You are a career development expert specializing in skill gap analysis. 
Analyze the user's current skills against their target role and provide a detailed development plan.`;

    const userPrompt = `
Current Skills: ${JSON.stringify(currentSkills)}
Target Role: ${targetRole}
Industry: ${industry || 'Not specified'}
Experience Level: ${experience || 'Entry level'}

Please provide:
1. Skill gap analysis
2. Priority skills to develop
3. Learning resources and recommendations
4. Timeline for skill development
5. Alternative career paths to consider`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ];

    const analysis = await callDeepSeekAPI(messages, 2000);

    res.json({
      success: true,
      analysis,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Skill analysis error:', error);
    res.status(500).json({
      error: 'Failed to generate skill analysis',
      message: error.message,
    });
  }
});

// Interview preparation
router.post('/interview-prep', async (req, res) => {
  try {
    const { role, company, userBackground, interviewType } = req.body;

    if (!role) {
      return res.status(400).json({ error: 'Role is required' });
    }

    const systemPrompt = `You are an interview preparation expert. 
Provide comprehensive interview preparation guidance including common questions, 
STAR method examples, and specific tips for the role and company.`;

    const userPrompt = `
Target Role: ${role}
Company: ${company || 'Not specified'}
User Background: ${JSON.stringify(userBackground || {})}
Interview Type: ${interviewType || 'General'}

Please provide:
1. Common interview questions for this role
2. STAR method examples
3. Company-specific preparation tips
4. Technical questions (if applicable)
5. Questions to ask the interviewer`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ];

    const preparation = await callDeepSeekAPI(messages, 2500);

    res.json({
      success: true,
      preparation,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Interview prep error:', error);
    res.status(500).json({
      error: 'Failed to generate interview preparation',
      message: error.message,
    });
  }
});

// Internship matching and recommendations
router.post('/internship-match', async (req, res) => {
  try {
    const { userProfile, preferences, skills, isPremium } = req.body;

    if (!userProfile) {
      return res.status(400).json({ error: 'User profile is required' });
    }

    const systemPrompt = `You are an internship matching expert. 
Analyze the user's profile and provide personalized internship recommendations 
with specific companies, roles, and application strategies.`;

    const userPrompt = `
User Profile: ${JSON.stringify(userProfile)}
Preferences: ${JSON.stringify(preferences || {})}
Skills: ${JSON.stringify(skills || [])}

Please provide:
1. Recommended internship types
2. Specific companies to target
3. Application timeline and strategy
4. Skills to highlight
5. Networking recommendations`;

    const messages = [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userPrompt },
    ];

    let recommendations;
    if (isPremium && process.env.OPENAI_API_KEY) {
      // Use OpenAI gpt-4o for premium
      const openaiResp = await axios.post('https://api.openai.com/v1/chat/completions', {
        model: 'gpt-4o',
        messages,
        max_tokens: 2000,
        temperature: 0.7
      }, {
        headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` }
      });
      recommendations = openaiResp.data.choices[0]?.message?.content || '';
    } else {
      recommendations = await callDeepSeekAPI(messages, 2000);
    }

    res.json({
      success: true,
      recommendations,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Internship match error:', error);
    res.status(500).json({
      error: 'Failed to generate internship recommendations',
      message: error.message,
    });
  }
});

// Health check for AI service
router.get('/health', (req, res) => {
  res.json({
    service: 'AI Service',
    status: 'running',
    deepseek_configured: !!DEEPSEEK_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

module.exports = router;