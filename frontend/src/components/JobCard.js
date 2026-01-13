import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Chip,
  Button,
  Grid,
  LinearProgress,
  IconButton,
  Collapse
} from '@mui/material';
import {
  LocationOn as LocationIcon,
  Business as BusinessIcon,
  AttachMoney as MoneyIcon,
  Schedule as ScheduleIcon,
  ExpandMore as ExpandMoreIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Share as ShareIcon
} from '@mui/icons-material';

const JobCard = ({ job, expanded, onExpand, onSave, onApply, isSaved }) => {
  const getScoreColor = (score) => {
    if (score >= 80) return '#4caf50'; // Green
    if (score >= 60) return '#ff9800'; // Orange
    return '#f44336'; // Red
  };

  return (
    <Card sx={{ mb: 2, borderLeft: `4px solid ${getScoreColor(job.matchScore)}` }}>
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h6" fontWeight="bold">
              {job.title}
            </Typography>
            
            <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 1, mt: 1, mb: 1 }}>
              <Chip 
                icon={<BusinessIcon />} 
                label={job.company} 
                size="small" 
                variant="outlined" 
              />
              <Chip 
                icon={<LocationIcon />} 
                label={job.location} 
                size="small" 
                variant="outlined" 
              />
              <Chip 
                label={job.type} 
                size="small" 
                color="primary" 
                variant="outlined" 
              />
              <Chip 
                icon={<MoneyIcon />} 
                label={job.salary} 
                size="small" 
                variant="outlined" 
              />
              <Chip 
                icon={<ScheduleIcon />} 
                label={job.posted} 
                size="small" 
                variant="outlined" 
              />
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
              <Typography variant="body2" sx={{ mr: 2 }}>
                AI Match Score:
              </Typography>
              <Box sx={{ flexGrow: 1, mr: 2 }}>
                <LinearProgress 
                  variant="determinate" 
                  value={job.matchScore} 
                  sx={{ 
                    height: 8, 
                    borderRadius: 4,
                    backgroundColor: '#e0e0e0',
                    '& .MuiLinearProgress-bar': {
                      backgroundColor: getScoreColor(job.matchScore)
                    }
                  }}
                />
              </Box>
              <Typography variant="h6" fontWeight="bold" color={getScoreColor(job.matchScore)}>
                {job.matchScore}%
              </Typography>
            </Box>
          </Grid>
          
          <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
            <Box sx={{ display: 'flex', justifyContent: { xs: 'flex-start', md: 'flex-end' }, gap: 1, mb: 1 }}>
              <IconButton onClick={() => onSave(job.id)} size="small">
                {isSaved ? <StarIcon color="warning" /> : <StarBorderIcon />}
              </IconButton>
              <IconButton size="small">
                <ShareIcon />
              </IconButton>
              <IconButton onClick={() => onExpand(job.id)} size="small">
                <ExpandMoreIcon sx={{ transform: expanded ? 'rotate(180deg)' : 'none' }} />
              </IconButton>
            </Box>
            
            <Button 
              variant="contained" 
              color="primary" 
              fullWidth
              onClick={() => onApply(job.id)}
              sx={{ mb: 1 }}
            >
              Quick Apply
            </Button>
            
            <Button 
              variant="outlined" 
              fullWidth
              onClick={() => onExpand(job.id)}
            >
              View Details
            </Button>
          </Grid>
        </Grid>
        
        <Collapse in={expanded}>
          <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid #e0e0e0' }}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Job Description
                </Typography>
                <Typography variant="body2" paragraph>
                  {job.description}
                </Typography>
                
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom sx={{ mt: 2 }}>
                  Requirements
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                  {job.requirements.map((req, idx) => (
                    <Chip key={idx} label={req} size="small" color="primary" />
                  ))}
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  AI Analysis
                </Typography>
                
                <Box sx={{ 
                  p: 2, 
                  bgcolor: job.aiAnalysis.fit === 'Excellent' ? '#e8f5e9' : 
                          job.aiAnalysis.fit === 'Good' ? '#fff3e0' : 
                          job.aiAnalysis.fit === 'Low' ? '#ffebee' : '#e3f2fd',
                  borderRadius: 1,
                  mb: 2
                }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Fit: <strong>{job.aiAnalysis.fit}</strong>
                  </Typography>
                  
                  {job.aiAnalysis.skillsMatch.length > 0 && (
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="caption" display="block">Your Matching Skills:</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                        {job.aiAnalysis.skillsMatch.map((skill, idx) => (
                          <Chip key={idx} label={skill} size="small" color="success" />
                        ))}
                      </Box>
                    </Box>
                  )}
                  
                  {job.aiAnalysis.missingSkills.length > 0 && (
                    <Box sx={{ mb: 1 }}>
                      <Typography variant="caption" display="block">Missing Skills:</Typography>
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 0.5 }}>
                        {job.aiAnalysis.missingSkills.map((skill, idx) => (
                          <Chip key={idx} label={skill} size="small" color="warning" />
                        ))}
                      </Box>
                    </Box>
                  )}
                  
                  <Box>
                    <Typography variant="caption" display="block">AI Recommendations:</Typography>
                    <ul style={{ margin: '4px 0 0 0', paddingLeft: '20px' }}>
                      {job.aiAnalysis.recommendations.map((rec, idx) => (
                        <li key={idx}><Typography variant="caption">{rec}</Typography></li>
                      ))}
                    </ul>
                  </Box>
                </Box>
                
                <Button 
                  variant="contained" 
                  color="secondary" 
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={() => console.log('Generate tailored resume for:', job.title)}
                >
                  Generate Tailored Resume for This Job
                </Button>
                
                <Button 
                  variant="outlined" 
                  fullWidth
                  sx={{ mt: 1 }}
                  onClick={() => console.log('Prepare for interview:', job.title)}
                >
                  Prepare Interview Questions
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default JobCard;
