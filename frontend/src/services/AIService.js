import axios from 'axios';
import { GoogleGenerativeAI } from '@google/generative-ai';

class AIService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_API_KEY);
    this.openAIKey = process.env.OPENAI_API_KEY;
  }

  // NLP-based Resume Analysis
  async analyzeResumeNLP(resumeText, jobDescription = '') {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      Analyze this resume comprehensively:
      
      RESUME:
      ${resumeText.substring(0, 3000)}
      
      ${jobDescription ? `JOB DESCRIPTION:\n${jobDescription.substring(0, 2000)}` : ''}
      
      Provide analysis in this JSON format:
      {
        "skills_match_score": 0-100,
        "experience_relevance": 0-100,
        "skills_gap": ["skill1", "skill2"],
        "strengths": ["strength1", "strength2"],
        "weaknesses": ["weakness1", "weakness2"],
        "key_achievements": ["achievement1", "achievement2"],
        "sentiment_analysis": {
          "confidence_level": "high/medium/low",
          "professional_tone": true/false,
          "action_oriented": true/false
        },
        "recommendations": ["rec1", "rec2"]
      }
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error('AI Analysis Error:', error);
      return this.getFallbackAnalysis();
    }
  }

  // Generate Resume based on Job Description
  async generateResumeFromJD(jobDescription, userProfile) {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      Based on this Job Description and User Profile, generate an optimized resume:
      
      JOB DESCRIPTION:
      ${jobDescription.substring(0, 2500)}
      
      USER PROFILE:
      ${JSON.stringify(userProfile, null, 2)}
      
      Generate a complete resume with:
      1. Professional Summary tailored to the JD
      2. Skills section highlighting relevant skills
      3. Work experience rewritten to match JD requirements
      4. Achievements quantified and aligned with JD
      5. Education and certifications emphasized if relevant
      
      Format the response as a structured JSON object.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error('Resume Generation Error:', error);
      return null;
    }
  }

  // Get Job Recommendations
  async getJobRecommendations(resumeData, location = '', industry = '') {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      Based on this resume data, suggest job roles and career moves:
      
      RESUME DATA:
      ${JSON.stringify(resumeData, null, 2)}
      
      ${location ? `Preferred Location: ${location}` : ''}
      ${industry ? `Industry: ${industry}` : ''}
      
      Provide recommendations in JSON format:
      {
        "recommended_roles": [
          {
            "title": "Job Title",
            "match_score": 85,
            "reason": "Reason for recommendation",
            "skills_to_improve": ["skill1", "skill2"],
            "market_demand": "high/medium/low",
            "salary_range": "$XX,XXX - $XX,XXX"
          }
        ],
        "career_paths": [
          {
            "path": "Career Path Name",
            "timeline": "1-2 years",
            "steps": ["step1", "step2"],
            "potential_roles": ["role1", "role2"]
          }
        ],
        "immediate_actions": ["action1", "action2"],
        "learning_recommendations": ["course1", "course2"]
      }
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error('Job Recommendations Error:', error);
      return this.getFallbackRecommendations();
    }
  }

  // Career Change Suggestions
  async suggestCareerChanges(resumeData, userInterests = []) {
    const model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      Analyze this resume and suggest potential career changes:
      
      RESUME DATA:
      ${JSON.stringify(resumeData, null, 2)}
      
      ${userInterests.length > 0 ? `User Interests: ${userInterests.join(', ')}` : ''}
      
      Consider:
      1. Transferable skills
      2. Emerging industries
      3. Future job market trends
      4. User's experience background
      
      Provide suggestions in JSON format.
    `;

    try {
      const result = await model.generateContent(prompt);
      const response = await result.response;
      return JSON.parse(response.text());
    } catch (error) {
      console.error('Career Change Error:', error);
      return null;
    }
  }

  getFallbackAnalysis() {
    return {
      skills_match_score: 75,
      experience_relevance: 70,
      skills_gap: ["Cloud Computing", "Data Analytics"],
      strengths: ["Strong communication", "Project management"],
      weaknesses: ["Limited technical depth", "No certification"],
      key_achievements: ["Increased sales by 20%", "Led team of 5"],
      sentiment_analysis: {
        confidence_level: "medium",
        professional_tone: true,
        action_oriented: true
      },
      recommendations: ["Add quantifiable achievements", "Get AWS certification"]
    };
  }

  getFallbackRecommendations() {
    return {
      recommended_roles: [
        {
          title: "Product Manager",
          match_score: 85,
          reason: "Your experience aligns with product management",
          skills_to_improve: ["Agile methodologies", "Data analysis"],
          market_demand: "high",
          salary_range: "$90,000 - $140,000"
        }
      ],
      career_paths: [
        {
          path: "Tech Leadership",
          timeline: "2-3 years",
          steps: ["Get PMP certification", "Lead larger projects"],
          potential_roles: ["Senior PM", "Director of Product"]
        }
      ],
      immediate_actions: ["Update LinkedIn", "Network in industry"],
      learning_recommendations: ["Coursera PM course", "Agile certification"]
    };
  }
}

export default new AIService();
