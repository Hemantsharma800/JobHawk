import React from 'react';
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  Paper,
  Chip,
  Link,
  TextField,
  Divider,
  IconButton
} from '@mui/material';
import {
  AutoAwesome as AutoAwesomeIcon,
  Work as WorkIcon,
  TrendingUp as TrendingUpIcon,
  Speed as SpeedIcon,
  Security as SecurityIcon,
  Groups as GroupsIcon,
  Analytics as AnalyticsIcon,
  Facebook as FacebookIcon,
  Twitter as TwitterIcon,
  LinkedIn as LinkedInIcon,
  Instagram as InstagramIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon,
  LocationOn as LocationIcon,
  Phone as PhoneIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 40 }} />,
      title: 'AI-Powered Analysis',
      description: 'Advanced NLP analyzes your resume beyond keywords for deeper insights'
    },
    {
      icon: <WorkIcon sx={{ fontSize: 40 }} />,
      title: 'Smart Job Matching',
      description: 'AI matches you with jobs based on skills, experience, and career goals'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
      title: 'Career Growth',
      description: 'Personalized recommendations for skills development and career paths'
    },
    {
      icon: <SpeedIcon sx={{ fontSize: 40 }} />,
      title: 'Fast Results',
      description: 'Get instant analysis and tailored resumes in minutes'
    },
    {
      icon: <SecurityIcon sx={{ fontSize: 40 }} />,
      title: 'Secure & Private',
      description: 'Your data is protected with enterprise-grade security'
    },
    {
      icon: <GroupsIcon sx={{ fontSize: 40 }} />,
      title: 'Employer Network',
      description: 'Connect with top companies using our AI recruitment platform'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Paper
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6,
          borderRadius: 0,
          background: 'linear-gradient(135deg, #1976d2 0%, #2196f3 100%)'
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Chip 
                label="AI-Powered Platform" 
                sx={{ 
                  bgcolor: 'white', 
                  color: 'primary.main',
                  mb: 3,
                  fontWeight: 'bold'
                }}
              />
              
              <Typography variant="h2" fontWeight="bold" gutterBottom>
                Welcome to
                <Box component="span" sx={{ color: 'white', ml: 1 }}>
                  GLIXTRON
                </Box>
              </Typography>
              
              <Typography variant="h4" fontWeight="medium" gutterBottom sx={{ opacity: 0.9 }}>
                The Future of Career Development
              </Typography>
              
              <Typography variant="h6" sx={{ mb: 4, opacity: 0.8 }}>
                Revolutionizing how job seekers and employers connect through artificial intelligence.
              </Typography>
              
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': { bgcolor: '#f5f5f5' }
                  }}
                  onClick={() => navigate('/jobs')}
                >
                  Start Job Search
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: 'white',
                    color: 'white',
                    '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' }
                  }}
                  onClick={() => navigate('/ai-analysis')}
                >
                  Try AI Analysis
                </Button>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  bgcolor: 'rgba(255,255,255,0.1)',
                  borderRadius: 4,
                  p: 4,
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Why Choose Glixtron?
                </Typography>
                <ul style={{ paddingLeft: '20px' }}>
                  <li><Typography>AI resume analysis with 95% accuracy</Typography></li>
                  <li><Typography>Personalized job matching algorithm</Typography></li>
                  <li><Typography>Tailored resume generation</Typography></li>
                  <li><Typography>Career path recommendations</Typography></li>
                  <li><Typography>Real-time market insights</Typography></li>
                </ul>
                
                <Box sx={{ mt: 3, p: 2, bgcolor: 'rgba(255,255,255,0.2)', borderRadius: 2 }}>
                  <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center' }}>
                    <AnalyticsIcon sx={{ mr: 1 }} />
                    <strong>10,000+</strong> successful career transitions powered by Glixtron AI
                  </Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Typography variant="h3" textAlign="center" fontWeight="bold" gutterBottom>
          Glixtron Platform Features
        </Typography>
        <Typography variant="h6" textAlign="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
          Everything you need for your career journey in one intelligent platform
        </Typography>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', textAlign: 'center', p: 3 }}>
                <CardContent>
                  <Box sx={{ color: 'primary.main', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom fontWeight="bold">
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Company Info Section (Before Login) */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Paper sx={{ p: 6, borderRadius: 4 }}>
          <Typography variant="h3" textAlign="center" fontWeight="bold" gutterBottom color="primary">
            About Glixtron
          </Typography>
          
          <Typography variant="h6" textAlign="center" color="text.secondary" paragraph sx={{ mb: 6 }}>
            Revolutionizing career development with artificial intelligence. 
            We help job seekers and employers connect through intelligent 
            matching and advanced analytics.
          </Typography>
          
          <Grid container spacing={6}>
            {/* For Job Seekers */}
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <WorkIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  For Job Seekers
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: 'left' }}>
                <Link href="/jobs" color="text.primary" display="block" sx={{ mb: 2, p: 1, '&:hover': { bgcolor: 'primary.light', borderRadius: 1 } }}>
                  • Find Jobs
                </Link>
                <Link href="/ai-analysis" color="text.primary" display="block" sx={{ mb: 2, p: 1, '&:hover': { bgcolor: 'primary.light', borderRadius: 1 } }}>
                  • Resume Analysis
                </Link>
                <Link href="/resume-builder" color="text.primary" display="block" sx={{ mb: 2, p: 1, '&:hover': { bgcolor: 'primary.light', borderRadius: 1 } }}>
                  • Resume Builder
                </Link>
                <Link href="/career-advice" color="text.primary" display="block" sx={{ mb: 2, p: 1, '&:hover': { bgcolor: 'primary.light', borderRadius: 1 } }}>
                  • Career Advice
                </Link>
                <Link href="/salary-guide" color="text.primary" display="block" sx={{ p: 1, '&:hover': { bgcolor: 'primary.light', borderRadius: 1 } }}>
                  • Salary Guide
                </Link>
              </Box>
            </Grid>

            {/* For Employers */}
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <GroupsIcon sx={{ fontSize: 50, color: 'secondary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  For Employers
                </Typography>
              </Box>
              
              <Box sx={{ textAlign: 'left' }}>
                <Link href="/post-job" color="text.primary" display="block" sx={{ mb: 2, p: 1, '&:hover': { bgcolor: 'secondary.light', borderRadius: 1 } }}>
                  • Post a Job
                </Link>
                <Link href="/pricing" color="text.primary" display="block" sx={{ mb: 2, p: 1, '&:hover': { bgcolor: 'secondary.light', borderRadius: 1 } }}>
                  • Pricing
                </Link>
                <Link href="/recruitment" color="text.primary" display="block" sx={{ mb: 2, p: 1, '&:hover': { bgcolor: 'secondary.light', borderRadius: 1 } }}>
                  • Recruitment AI
                </Link>
                <Link href="/employer-dashboard" color="text.primary" display="block" sx={{ mb: 2, p: 1, '&:hover': { bgcolor: 'secondary.light', borderRadius: 1 } }}>
                  • Employer Dashboard
                </Link>
                <Link href="/candidate-search" color="text.primary" display="block" sx={{ p: 1, '&:hover': { bgcolor: 'secondary.light', borderRadius: 1 } }}>
                  • Candidate Search
                </Link>
              </Box>
            </Grid>

            {/* Company & Newsletter */}
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center', mb: 3 }}>
                <AutoAwesomeIcon sx={{ fontSize: 50, color: 'primary.main', mb: 2 }} />
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  Company & Updates
                </Typography>
              </Box>
              
              {/* Company Links */}
              <Box sx={{ mb: 4 }}>
                <Link href="/about" color="text.primary" display="block" sx={{ mb: 1, p: 1, '&:hover': { bgcolor: 'action.hover', borderRadius: 1 } }}>
                  • About Us
                </Link>
                <Link href="/team" color="text.primary" display="block" sx={{ mb: 1, p: 1, '&:hover': { bgcolor: 'action.hover', borderRadius: 1 } }}>
                  • Our Team
                </Link>
                <Link href="/careers" color="text.primary" display="block" sx={{ mb: 1, p: 1, '&:hover': { bgcolor: 'action.hover', borderRadius: 1 } }}>
                  • Careers at Glixtron
                </Link>
                <Link href="/blog" color="text.primary" display="block" sx={{ mb: 1, p: 1, '&:hover': { bgcolor: 'action.hover', borderRadius: 1 } }}>
                  • Blog
                </Link>
                <Link href="/press" color="text.primary" display="block" sx={{ p: 1, '&:hover': { bgcolor: 'action.hover', borderRadius: 1 } }}>
                  • Press
                </Link>
              </Box>
              
              {/* Newsletter */}
              <Box sx={{ bgcolor: 'background.default', p: 3, borderRadius: 2 }}>
                <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                  Stay Updated
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Subscribe to our newsletter for career tips and updates.
                </Typography>
                
                <TextField
                  fullWidth
                  size="small"
                  placeholder="Your email"
                  sx={{ mb: 2 }}
                />
                <Button variant="contained" fullWidth>
                  SUBSCRIBE
                </Button>
              </Box>
            </Grid>
          </Grid>
          
          {/* Contact Info */}
          <Divider sx={{ my: 4 }} />
          
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <LocationIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body2" color="text.secondary">
                  123 Tech Street, San Francisco, CA 94107
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <PhoneIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body2" color="text.secondary">
                  +1 (555) 123-4567
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <EmailIcon sx={{ mr: 1, color: 'primary.main' }} />
                <Typography variant="body2" color="text.secondary">
                  contact@glixtron.com
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          {/* Social Media */}
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 4 }}>
            <IconButton sx={{ bgcolor: 'primary.light' }}>
              <FacebookIcon />
            </IconButton>
            <IconButton sx={{ bgcolor: 'primary.light' }}>
              <TwitterIcon />
            </IconButton>
            <IconButton sx={{ bgcolor: 'primary.light' }}>
              <LinkedInIcon />
            </IconButton>
            <IconButton sx={{ bgcolor: 'primary.light' }}>
              <InstagramIcon />
            </IconButton>
            <IconButton sx={{ bgcolor: 'primary.light' }}>
              <GitHubIcon />
            </IconButton>
          </Box>
        </Paper>
      </Container>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ mb: 8 }}>
        <Paper
          sx={{
            p: 6,
            textAlign: 'center',
            bgcolor: 'secondary.light',
            color: 'secondary.contrastText',
            borderRadius: 4
          }}
        >
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Ready to Transform Your Career?
          </Typography>
          <Typography variant="h6" sx={{ mb: 4, opacity: 0.9 }}>
            Join thousands of professionals who accelerated their careers with Glixtron AI
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: 'secondary.main',
              px: 6,
              py: 1.5,
              fontSize: '1.1rem',
              '&:hover': { bgcolor: '#f5f5f5' }
            }}
            onClick={() => navigate('/jobs')}
          >
            Get Started Free
          </Button>
          
          <Typography variant="body2" sx={{ mt: 3, opacity: 0.8 }}>
            No credit card required • Free AI analysis for your first resume
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
};

export default Home;
