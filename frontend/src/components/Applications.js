import React from 'react';
import { Container, Typography, Paper, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Applications = () => {
  const navigate = useNavigate();
  
  return (
    <Container maxWidth="lg">
      <Paper sx={{ p: 4, mt: 3 }}>
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Applications
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          This section is under development. Coming soon with more features!
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button variant="contained" onClick={() => navigate('/dashboard')}>
            Back to Dashboard
          </Button>
          <Button variant="outlined" onClick={() => navigate('/dashboard/jobs')}>
            Browse Jobs
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default Applications;
