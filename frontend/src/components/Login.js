import React, { useState } from 'react';
import {
  Container,
  Paper,
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Link,
  Divider,
  IconButton,
  InputAdornment,
  Alert,
  Card,
  CardContent
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Google as GoogleIcon,
  LinkedIn as LinkedInIcon,
  GitHub as GitHubIcon,
  AutoAwesome as AutoAwesomeIcon,
  Work as WorkIcon,
  TrendingUp as TrendingUpIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/dashboard");
    e.preventDefault();
    // For demo purposes, navigate to jobs page
    navigate('/jobs');
  };

  const handleSocialLogin = (provider) => {
    alert(`Logging in with ${provider} (demo)`);
    navigate('/jobs');
  };

  const features = [
    {
      icon: <AutoAwesomeIcon sx={{ fontSize: 30, color: 'primary.main' }} />,
      title: 'AI Resume Analysis',
      description: 'Get detailed insights on your resume'
    },
    {
      icon: <WorkIcon sx={{ fontSize: 30, color: 'primary.main' }} />,
      title: 'Smart Job Matching',
      description: 'Find jobs that match your skills'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 30, color: 'primary.main' }} />,
      title: 'Career Growth',
      description: 'Personalized career recommendations'
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={4} alignItems="center">
        {/* Left side - Features */}
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 4, textAlign: { xs: 'center', md: 'left' } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor: 'primary.main',
                  borderRadius: 2,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  mr: 2
                }}
              >
                <Typography variant="h5" fontWeight="bold" color="white">
                  G
                </Typography>
              </Box>
              <Box>
                <Typography variant="h3" fontWeight="bold" color="primary" sx={{ lineHeight: 1 }}>
                  GLIXTRON
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  AI Career Platform
                </Typography>
              </Box>
            </Box>
            
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Welcome to the Future of Career Development
            </Typography>
            <Typography variant="h6" color="text.secondary" paragraph>
              Join thousands who transformed their careers with AI-powered tools
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} key={index}>
                <Card sx={{ bgcolor: 'primary.light', color: 'primary.contrastText' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      {feature.icon}
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {feature.title}
                        </Typography>
                        <Typography variant="body2">
                          {feature.description}
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Company Info Preview */}
          <Paper sx={{ p: 3, mt: 4, bgcolor: 'background.default' }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              About Glixtron
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              Revolutionizing career development with artificial intelligence. 
              We help job seekers and employers connect through intelligent 
              matching and advanced analytics.
            </Typography>
            <Link href="/about" color="primary">
              Learn more about our mission →
            </Link>
          </Paper>
        </Grid>

        {/* Right side - Login/Signup Form */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 4, borderRadius: 3 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </Typography>
            <Typography variant="body1" color="text.secondary" gutterBottom>
              {isLogin 
                ? 'Sign in to access your AI career tools' 
                : 'Join Glixtron to transform your career journey'}
            </Typography>

            <Box sx={{ my: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GoogleIcon />}
                    onClick={() => handleSocialLogin('Google')}
                    sx={{ py: 1.5 }}
                  >
                    Continue with Google
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<LinkedInIcon />}
                    onClick={() => handleSocialLogin('LinkedIn')}
                    sx={{ py: 1.5 }}
                  >
                    LinkedIn
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    fullWidth
                    variant="outlined"
                    startIcon={<GitHubIcon />}
                    onClick={() => handleSocialLogin('GitHub')}
                    sx={{ py: 1.5 }}
                  >
                    GitHub
                  </Button>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OR CONTINUE WITH EMAIL
              </Typography>
            </Divider>

            <Box component="form" onSubmit={handleSubmit}>
              {!isLogin && (
                <TextField
                  fullWidth
                  label="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  margin="normal"
                  required={!isLogin}
                />
              )}
              
              <TextField
                fullWidth
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                margin="normal"
                required
              />
              
              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                margin="normal"
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  )
                }}
              />
              
              {isLogin && (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                  <Link href="/forgot-password" variant="body2">
                    Forgot password?
                  </Link>
                </Box>
              )}
              
              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                sx={{ mt: 3, py: 1.5 }}
              >
                {isLogin ? 'Sign In' : 'Create Account'}
              </Button>
              
              <Box sx={{ mt: 2, textAlign: 'center' }}>
                <Typography variant="body2" color="text.secondary">
                  {isLogin ? "Don't have an account? " : "Already have an account? "}
                  <Link 
                    href="#" 
                    onClick={() => setIsLogin(!isLogin)}
                    fontWeight="bold"
                  >
                    {isLogin ? 'Sign up' : 'Sign in'}
                  </Link>
                </Typography>
              </Box>
            </Box>

            <Alert severity="info" sx={{ mt: 3 }}>
              <Typography variant="body2">
                By continuing, you agree to Glixtron's{' '}
                <Link href="/terms" fontWeight="bold">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" fontWeight="bold">Privacy Policy</Link>
              </Typography>
            </Alert>

            {/* Demo Login Option */}
            <Box sx={{ mt: 3, textAlign: 'center' }}>
              <Button
                variant="text"
                onClick={() => {
                  setEmail('demo@glixtron.com');
                  setPassword('demo123');
                  navigate('/jobs');
                }}
              >
                Try Demo Account
              </Button>
            </Box>
          </Paper>
          
          {/* Continue without login */}
          <Box sx={{ textAlign: 'center', mt: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Want to explore first?{' '}
              <Link 
                href="#" 
                onClick={() => navigate('/')}
                fontWeight="bold"
              >
                Continue to Homepage
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Login;
