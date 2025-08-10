// AI Service for DeepSeek integration
// This service handles all AI-powered features including resume parsing, matching, and career advice

const axios = require('axios');

// DeepSeek API configuration
const DEEPSEEK_API_URL = 'https://api.deepseek.com/v1/chat/completions';
const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY;

// Helper function to call DeepSeek API
async function callDeepSeekAPI(prompt, systemPrompt) {
  try {
    if (!DEEPSEEK_API_KEY) {
      console.warn('DeepSeek API key not configured, returning mock response');
      return 'Mock AI response - DeepSeek API not configured';
    }

    const response = await axios.post(
      DEEPSEEK_API_URL,
      {
        model: 'deepseek-chat',
        messages: [
          ...(systemPrompt ? [{ role: 'system', content: systemPrompt }] : []),
          { role: 'user', content: prompt }
        ],
        temperature: 0.7,
        max_tokens: 2000
      },
      {
        headers: {
          'Authorization': `Bearer ${DEEPSEEK_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    return response.data.choices[0]?.message?.content || 'No response from AI';
  } catch (error) {
    console.error('DeepSeek API error:', error);
    throw new Error('AI service temporarily unavailable');
  }
}

// Parse Common App data into resume format
async function parseCommonAppData(commonAppData) {
  const systemPrompt = `You are an expert resume parser. Parse the provided Common App data and extract relevant information into a structured resume format. Return only valid JSON with the following structure:
  {
    "personalInfo": {
      "firstName": "string",
      "lastName": "string",
      "email": "string",
      "phone": "string",
      "address": "string"
    },
    "education": [{
      "institution": "string",
      "degree": "string",
      "field": "string",
      "startDate": "string",
      "endDate": "string",
      "gpa": "string",
      "coursework": ["string"]
    }],
    "experience": [{
      "title": "string",
      "company": "string",
      "location": "string",
      "startDate": "string",
      "endDate": "string",
      "description": ["string"]
    }],
    "projects": [{
      "name": "string",
      "description": "string",
      "technologies": ["string"],
      "startDate": "string",
      "endDate": "string"
    }],
    "skills": {
      "technical": ["string"],
      "languages": ["string"],
      "other": ["string"]
    },
    "extracurriculars": [{
      "activity": "string",
      "role": "string",
      "description": "string",
      "startDate": "string",
      "endDate": "string"
    }]
  }`;

  const prompt = `Parse this Common App data into a resume format:\n\n${JSON.stringify(commonAppData, null, 2)}`;
  
  try {
    const response = await callDeepSeekAPI(prompt, systemPrompt);
    let parsed;
    try {
      parsed = JSON.parse(response);
    } catch (e) {
      // If model returned fenced code or extra text, try to extract JSON
      const match = response.match(/\{[\s\S]*\}/);
      parsed = match ? JSON.parse(match[0]) : null;
    }

    if (!parsed || typeof parsed !== 'object') {
      throw new Error('Invalid AI response format');
    }

    // Normalize shapes to match our schema/frontend
    if (Array.isArray(parsed.education)) {
      parsed.education = parsed.education.map((edu) => ({
        ...edu,
        coursework: Array.isArray(edu?.coursework) ? edu.coursework.join(', ') : (edu?.coursework || ''),
        gpa: typeof edu?.gpa === 'number' ? String(edu.gpa) : (edu?.gpa || ''),
      }));
    }

    if (Array.isArray(parsed.experience)) {
      parsed.experience = parsed.experience.map((exp) => ({
        title: exp?.title || exp?.position || '',
        company: exp?.company || '',
        location: exp?.location || '',
        startDate: exp?.startDate || '',
        endDate: exp?.endDate || '',
        current: !!exp?.current,
        description: Array.isArray(exp?.description) ? exp.description.join('\n• ') : (exp?.description || ''),
        achievements: Array.isArray(exp?.achievements) ? exp.achievements.join('\n• ') : (exp?.achievements || ''),
        skills: Array.isArray(exp?.skills) ? exp.skills.join(', ') : (exp?.skills || ''),
        type: exp?.type || '',
      }));
    }

    if (Array.isArray(parsed.projects)) {
      parsed.projects = parsed.projects.map((project) => ({
        ...project,
        technologies: Array.isArray(project?.technologies) ? project.technologies.join(', ') : (project?.technologies || ''),
        highlights: Array.isArray(project?.highlights) ? project.highlights.join('\n• ') : (project?.highlights || ''),
        challenges: Array.isArray(project?.challenges) ? project.challenges.join('\n• ') : (project?.challenges || ''),
      }));
    }

    if (parsed.skills) {
      const skills = parsed.skills;
      parsed.skills = {
        technical: Array.isArray(skills?.technical) ? skills.technical.join(', ') : (skills?.technical || ''),
        soft: Array.isArray(skills?.other) ? skills.other.join(', ') : (skills?.soft || skills?.other || ''),
        languages: Array.isArray(skills?.languages)
          ? skills.languages.map((lang) =>
              typeof lang === 'string' ? { language: lang, proficiency: 'intermediate' } : lang
            )
          : Array.isArray(skills?.languages)
            ? skills.languages
            : [],
        certifications: Array.isArray(skills?.certifications) ? skills.certifications.join(', ') : (skills?.certifications || ''),
      };
    }

    // Map extracurriculars -> activities
    if (Array.isArray(parsed.extracurriculars)) {
      parsed.activities = parsed.extracurriculars.map((act) => ({
        name: act?.activity || act?.name || '',
        position: act?.role || act?.position || '',
        organization: act?.organization || '',
        location: act?.location || '',
        description: Array.isArray(act?.description) ? act.description.join('\n• ') : (act?.description || ''),
        achievements: Array.isArray(act?.achievements) ? act.achievements.join('\n• ') : (act?.achievements || ''),
        skillsDeveloped: Array.isArray(act?.skillsDeveloped) ? act.skillsDeveloped.join(', ') : (act?.skillsDeveloped || ''),
        startDate: act?.startDate || '',
        endDate: act?.endDate || '',
        current: !!act?.current,
      }));
      delete parsed.extracurriculars;
    }

    return parsed;
  } catch (error) {
    console.error('Error parsing Common App data:', error);
    // Return a basic structure if AI fails
    return {
      personalInfo: {
        firstName: commonAppData.firstName || '',
        lastName: commonAppData.lastName || '',
        email: commonAppData.email || '',
        phone: '',
        address: ''
      },
      education: [],
      experience: [],
      projects: [],
      skills: { technical: [], languages: [], other: [] },
      extracurriculars: []
    };
  }
}

// Calculate match score between resume and internship
async function calculateMatchScore(resume, internship) {
  const systemPrompt = `You are an expert career counselor. Analyze the provided resume and internship posting to calculate a match score from 0-100. Consider:
  - Relevant skills and experience
  - Educational background
  - Project experience
  - Field alignment
  - Experience level requirements
  
  Return only a number between 0 and 100.`;

  const prompt = `Calculate match score for this resume and internship:\n\nRESUME:\n${JSON.stringify(resume, null, 2)}\n\nINTERNSHIP:\n${JSON.stringify(internship, null, 2)}`;
  
  try {
    const response = await callDeepSeekAPI(prompt, systemPrompt);
    const score = parseInt(response.trim());
    return isNaN(score) ? 50 : Math.max(0, Math.min(100, score)); // Ensure score is between 0-100
  } catch (error) {
    console.error('Error calculating match score:', error);
    return 50; // Default score if AI fails
  }
}

// Generate career advice
async function generateCareerAdvice(resume, goals) {
  const systemPrompt = `You are an expert career coach. Provide personalized career advice based on the user's resume and goals. Include:
  - Strengths and areas for improvement
  - Skill development recommendations
  - Career path suggestions
  - Next steps and timeline
  
  Keep the advice practical, actionable, and encouraging.`;

  const prompt = `Provide career advice for this resume:\n\nRESUME:\n${JSON.stringify(resume, null, 2)}\n\nGOALS:\n${goals || 'General career development'}`;
  
  try {
    return await callDeepSeekAPI(prompt, systemPrompt);
  } catch (error) {
    console.error('Error generating career advice:', error);
    return 'Career advice temporarily unavailable. Please try again later.';
  }
}

// Enhance resume suggestions
async function enhanceResume(resume) {
  const systemPrompt = `You are an expert resume writer. Analyze the provided resume and suggest improvements. Return a JSON object with:
  {
    "suggestions": [
      {
        "section": "string",
        "type": "improvement|addition|rewrite",
        "current": "string",
        "suggested": "string",
        "reason": "string"
      }
    ],
    "overallScore": number,
    "strengths": ["string"],
    "weaknesses": ["string"]
  }`;

  const prompt = `Analyze and suggest improvements for this resume:\n\n${JSON.stringify(resume, null, 2)}`;
  
  try {
    const response = await callDeepSeekAPI(prompt, systemPrompt);
    return JSON.parse(response);
  } catch (error) {
    console.error('Error enhancing resume:', error);
    return {
      suggestions: [],
      overallScore: 75,
      strengths: ['Well-structured format'],
      weaknesses: ['Could use more specific achievements']
    };
  }
}

// Generate skill recommendations
async function recommendSkills(resume, targetField) {
  const systemPrompt = `You are a career development expert. Based on the resume and target field, recommend 5-10 specific skills that would be most valuable to learn. Return only a JSON array of skill names.`;

  const prompt = `Recommend skills for this resume targeting ${targetField || 'general career development'}:\n\n${JSON.stringify(resume, null, 2)}`;
  
  try {
    const response = await callDeepSeekAPI(prompt, systemPrompt);
    return JSON.parse(response);
  } catch (error) {
    console.error('Error recommending skills:', error);
    return ['Communication', 'Problem Solving', 'Teamwork', 'Leadership', 'Technical Writing'];
  }
}

module.exports = {
  parseCommonAppData,
  calculateMatchScore,
  generateCareerAdvice,
  enhanceResume,
  recommendSkills
};