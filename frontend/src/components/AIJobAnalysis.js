import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  CircularProgress,
  Grid,
  Chip,
  LinearProgress,
  Alert,
  TextField,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import {
  AutoAwesome as AutoAwesomeIcon,
  Work as WorkIcon,
  TrendingUp as TrendingUpIcon,
  School as SchoolIcon,
  Description as DescriptionIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import AIService from '../services/AIService';

const AIJobAnalysis = ({ resumeData, jobDescription = '' }) => {
  const [analysis, setAnalysis] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [generatedResume, setGeneratedResume] = useState(null);
  const [loading, setLoading] = useState({
    analysis: false,
    recommendations: false,
    generation: false
  });
  const [userInput, setUserInput] = useState({
    location: '',
    industry: '',
    interests: ''
  });

  const handleAnalyzeResume = async () => {
    setLoading(prev => ({ ...prev, analysis: true }));
    try {
      const result = await AIService.analyzeResumeNLP(
        resumeData.text || JSON.stringify(resumeData),
        jobDescription
      );
      setAnalysis(result);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setLoading(prev => ({ ...prev, analysis: false }));
    }
  };

  const handleGetRecommendations = async () => {
    setLoading(prev => ({ ...prev, recommendations: true }));
    try {
      const result = await AIService.getJobRecommendations(
        resumeData,
        userInput.location,
        userInput.industry
      );
      setRecommendations(result);
    } catch (error) {
      console.error('Recommendations failed:', error);
    } finally {
      setLoading(prev => ({ ...prev, recommendations: false }));
    }
  };

  const handleGenerateResume = async () => {
    setLoading(prev => ({ ...prev, generation: true }));
    try {
      const result = await AIService.generateResumeFromJD(jobDescription, resumeData);
      setGeneratedResume(result);
    } catch (error) {
      console.error('Resume generation failed:', error);
    } finally {
      setLoading(prev => ({ ...prev, generation: false }));
    }
  };

  const handleCareerChangeSuggestions = async () => {
    const interests = userInput.interests.split(',').map(i => i.trim()).filter(i => i);
    const result = await AIService.suggestCareerChanges(resumeData, interests);
    if (result) {
      setRecommendations(prev => ({
        ...prev,
        career_changes: result
      }));
    }
  };

  const renderAnalysisResults = () => {
    if (!analysis) return null;

    return (
      <Card sx={{ mb: 3, mt: 2 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            <AutoAwesomeIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            AI Resume Analysis
          </Typography>
          
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Skills Match Score</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={analysis.skills_match_score} 
                    sx={{ flexGrow: 1, mr: 1 }}
                  />
                  <Typography>{analysis.skills_match_score}%</Typography>
                </Box>
              </Box>
              
              <Box sx={{ mb: 2 }}>
                <Typography variant="subtitle2">Experience Relevance</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LinearProgress 
                    variant="determinate" 
                    value={analysis.experience_relevance} 
                    sx={{ flexGrow: 1, mr: 1 }}
                  />
                  <Typography>{analysis.experience_relevance}%</Typography>
                </Box>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle2" gutterBottom>Strengths</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 2 }}>
                {analysis.strengths?.map((strength, idx) => (
                  <Chip key={idx} label={strength} color="success" size="small" />
                ))}
              </Box>
              
              <Typography variant="subtitle2" gutterBottom>Areas to Improve</Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                {analysis.skills_gap?.map((skill, idx) => (
                  <Chip key={idx} label={skill} color="warning" size="small" />
                ))}
              </Box>
            </Grid>
          </Grid>
          
          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>Detailed Recommendations</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <ul>
                {analysis.recommendations?.map((rec, idx) => (
                  <li key={idx}><Typography variant="body2">{rec}</Typography></li>
                ))}
              </ul>
            </AccordionDetails>
          </Accordion>
        </CardContent>
      </Card>
    );
  };

  const renderRecommendations = () => {
    if (!recommendations) return null;

    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            <TrendingUpIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            AI Job Recommendations
          </Typography>
          
          {recommendations.recommended_roles?.map((role, idx) => (
            <Box key={idx} sx={{ mb: 2, p: 2, border: '1px solid #ddd', borderRadius: 1 }}>
              <Typography variant="subtitle1" fontWeight="bold">
                {role.title}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Match Score: {role.match_score}% | Market Demand: {role.market_demand}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {role.reason}
              </Typography>
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption">Salary Range: {role.salary_range}</Typography>
              </Box>
              <Box sx={{ mt: 1 }}>
                <Typography variant="caption" fontWeight="bold">Skills to Improve:</Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                  {role.skills_to_improve?.map((skill, sIdx) => (
                    <Chip key={sIdx} label={skill} size="small" variant="outlined" />
                  ))}
                </Box>
              </Box>
            </Box>
          ))}
          
          {recommendations.immediate_actions && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                <SchoolIcon sx={{ mr: 1, verticalAlign: 'middle', fontSize: 16 }} />
                Immediate Actions
              </Typography>
              <ul>
                {recommendations.immediate_actions.map((action, idx) => (
                  <li key={idx}><Typography variant="body2">{action}</Typography></li>
                ))}
              </ul>
            </Box>
          )}
        </CardContent>
      </Card>
    );
  };

  const renderGeneratedResume = () => {
    if (!generatedResume) return null;

    return (
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom color="primary">
            <DescriptionIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
            AI-Generated Resume
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            This resume has been optimized for the current job description
          </Alert>
          
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography>View Generated Content</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Box sx={{ whiteSpace: 'pre-wrap', fontFamily: 'monospace', fontSize: 12 }}>
                {JSON.stringify(generatedResume, null, 2)}
              </Box>
            </AccordionDetails>
          </Accordion>
          
          <Button 
            variant="contained" 
            sx={{ mt: 2 }}
            onClick={() => {
              const dataStr = JSON.stringify(generatedResume, null, 2);
              const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
              const exportFileDefaultName = 'ai-generated-resume.json';
              const linkElement = document.createElement('a');
              linkElement.setAttribute('href', dataUri);
              linkElement.setAttribute('download', exportFileDefaultName);
              linkElement.click();
            }}
          >
            Download AI Resume
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        <WorkIcon sx={{ mr: 2, verticalAlign: 'middle' }} />
        AI-Powered Job Analysis
      </Typography>
      
      <Alert severity="info" sx={{ mb: 3 }}>
        Our AI analyzes your resume using Natural Language Processing (NLP) to provide deep insights,
        generate tailored resumes, and recommend optimal career moves.
      </Alert>
      
      {/* Input Section */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="subtitle1" gutterBottom>Customize Analysis</Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Location Preference"
                value={userInput.location}
                onChange={(e) => setUserInput(prev => ({ ...prev, location: e.target.value }))}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Industry"
                value={userInput.industry}
                onChange={(e) => setUserInput(prev => ({ ...prev, industry: e.target.value }))}
                size="small"
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Interests (comma separated)"
                value={userInput.interests}
                onChange={(e) => setUserInput(prev => ({ ...prev, interests: e.target.value }))}
                size="small"
              />
            </Grid>
          </Grid>
        </CardContent>
      </Card>
      
      {/* Action Buttons */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <Button
          variant="contained"
          onClick={handleAnalyzeResume}
          disabled={loading.analysis}
          startIcon={loading.analysis ? <CircularProgress size={20} /> : <AutoAwesomeIcon />}
        >
          {loading.analysis ? 'Analyzing...' : 'Analyze Resume (NLP)'}
        </Button>
        
        <Button
          variant="outlined"
          onClick={handleGetRecommendations}
          disabled={loading.recommendations}
          startIcon={loading.recommendations ? <CircularProgress size={20} /> : <TrendingUpIcon />}
        >
          Get Job Recommendations
        </Button>
        
        {jobDescription && (
          <Button
            variant="outlined"
            onClick={handleGenerateResume}
            disabled={loading.generation}
            startIcon={loading.generation ? <CircularProgress size={20} /> : <DescriptionIcon />}
          >
            {loading.generation ? 'Generating...' : 'Generate Tailored Resume'}
          </Button>
        )}
        
        <Button
          variant="text"
          onClick={handleCareerChangeSuggestions}
          startIcon={<SchoolIcon />}
        >
          Career Change Suggestions
        </Button>
      </Box>
      
      {/* Results */}
      {renderAnalysisResults()}
      {renderRecommendations()}
      {renderGeneratedResume()}
      
      {!analysis && !recommendations && !generatedResume && (
        <Card sx={{ textAlign: 'center', p: 4, bgcolor: 'background.default' }}>
          <AutoAwesomeIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" color="text.secondary">
            Click "Analyze Resume" to start AI-powered analysis
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Get NLP-based insights, personalized recommendations, and optimized resumes
          </Typography>
        </Card>
      )}
    </Box>
  );
};

export default AIJobAnalysis;
