const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdf = require('pdf-parse');
const fs = require('fs');
require('dotenv').config();

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// AI Analysis Endpoint
app.post('/api/analyze-resume', async (req, res) => {
  try {
    const { resumeText, jobDescription } = req.body;
    
    // In production, integrate with OpenAI or Gemini API
    const analysis = {
      skills_match: 85,
      recommendations: [
        "Add more quantifiable achievements",
        "Highlight leadership experience",
        "Include relevant certifications"
      ],
      skills_gap: ["Cloud Computing", "Data Analysis"],
      generated_summary: "Experienced professional with strong background in..."
    };
    
    res.json(analysis);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Resume Generation Endpoint
app.post('/api/generate-resume', async (req, res) => {
  try {
    const { jobDescription, resumeData } = req.body;
    
    // AI-generated resume logic here
    const generatedResume = {
      summary: `Results-driven ${resumeData.title} with expertise in...`,
      skills: resumeData.skills.map(skill => ({
        name: skill,
        relevance: "high"
      })),
      experience: resumeData.experience.map(exp => ({
        ...exp,
        description: `Optimized: ${exp.description}`
      }))
    };
    
    res.json(generatedResume);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`AI Resume Analyzer backend running on port ${PORT}`);
});
