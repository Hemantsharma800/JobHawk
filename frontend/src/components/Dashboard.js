import React from 'react';
import {
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  LinearProgress,
  Chip,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Avatar,
  Divider
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  Work as WorkIcon,
  AutoAwesome as AutoAwesomeIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  Star as StarIcon,
  Email as EmailIcon,
  Notifications as NotificationsIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const stats = [
    { label: 'Jobs Applied', value: '12', color: 'primary.main', icon: <WorkIcon /> },
    { label: 'Interviews', value: '3', color: 'secondary.main', icon: <AutoAwesomeIcon /> },
    { label: 'Profile Views', value: '245', color: 'success.main', icon: <TrendingUpIcon /> },
    { label: 'AI Match Score', value: '85%', color: 'warning.main', icon: <StarIcon /> },
  ];

  const recentJobs = [
    { title: 'Senior Frontend Developer', company: 'TechCorp', status: 'Applied', date: '2 days ago' },
    { title: 'Full Stack Engineer', company: 'StartupXYZ', status: 'Interview', date: '1 day ago' },
    { title: 'UI/UX Designer', company: 'DesignStudio', status: 'Viewed', date: '3 days ago' },
    { title: 'Product Manager', company: 'ProductLabs', status: 'Saved', date: '4 days ago' },
  ];

  const notifications = [
    { text: 'Your resume was viewed by Google', time: '2 hours ago', read: false },
    { text: 'Interview scheduled with Amazon', time: '1 day ago', read: true },
    { text: 'New jobs matching your profile', time: '2 days ago', read: true },
    { text: 'AI analysis completed for your resume', time: '3 days ago', read: true },
  ];

  return (
    <Box>
      {/* Welcome Section */}
      <Paper sx={{ p: 3, mb: 3, bgcolor: 'primary.light', color: 'primary.contrastText' }}>
        <Grid container alignItems="center" spacing={2}>
          <Grid item>
            <Avatar sx={{ width: 60, height: 60, bgcolor: 'white', color: 'primary.main' }}>
              JD
            </Avatar>
          </Grid>
          <Grid item xs>
            <Typography variant="h4" fontWeight="bold">
              Welcome back, John!
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.9 }}>
              Your career journey is looking great. Here's your update.
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              sx={{ bgcolor: 'white', color: 'primary.main' }}
              onClick={() => navigate('/ai-analysis')}
            >
              Analyze Resume with AI
            </Button>
          </Grid>
        </Grid>
      </Paper>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ color: stat.color, mr: 2 }}>
                    {stat.icon}
                  </Box>
                  <Typography variant="h4" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Applications */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Recent Applications
              </Typography>
              <Button onClick={() => navigate('/applications')}>View All</Button>
            </Box>
            <List>
              {recentJobs.map((job, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <WorkIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={job.title}
                      secondary={`${job.company} • ${job.date}`}
                    />
                    <Chip
                      label={job.status}
                      color={
                        job.status === 'Interview' ? 'success' :
                        job.status === 'Applied' ? 'primary' :
                        job.status === 'Viewed' ? 'warning' : 'default'
                      }
                      size="small"
                    />
                  </ListItem>
                  {index < recentJobs.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Notifications */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">
                Notifications
              </Typography>
              <Button onClick={() => navigate('/notifications')}>View All</Button>
            </Box>
            <List>
              {notifications.map((notification, index) => (
                <React.Fragment key={index}>
                  <ListItem sx={{ bgcolor: notification.read ? 'transparent' : 'action.hover' }}>
                    <ListItemIcon>
                      {notification.read ? <EmailIcon /> : <NotificationsIcon color="primary" />}
                    </ListItemIcon>
                    <ListItemText
                      primary={notification.text}
                      secondary={notification.time}
                    />
                  </ListItem>
                  {index < notifications.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* AI Recommendations */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mt: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              AI Career Recommendations
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <AutoAwesomeIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">Skills to Improve</Typography>
                    </Box>
                    <List>
                      <ListItem><CheckCircleIcon color="success" sx={{ mr: 1, fontSize: 16 }} />TypeScript</ListItem>
                      <ListItem><CheckCircleIcon color="success" sx={{ mr: 1, fontSize: 16 }} />AWS Certification</ListItem>
                      <ListItem><ScheduleIcon color="warning" sx={{ mr: 1, fontSize: 16 }} />Machine Learning Basics</ListItem>
                    </List>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <TrendingUpIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">Career Progress</Typography>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" gutterBottom>Profile Completeness</Typography>
                      <LinearProgress variant="determinate" value={75} sx={{ mb: 1 }} />
                      <Typography variant="body2" gutterBottom>Job Match Score</Typography>
                      <LinearProgress variant="determinate" value={85} color="success" />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <WorkIcon color="primary" sx={{ mr: 1 }} />
                      <Typography variant="h6">Quick Actions</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Button variant="contained" onClick={() => navigate('/jobs')}>
                        Browse New Jobs
                      </Button>
                      <Button variant="outlined" onClick={() => navigate('/resume-builder')}>
                        Update Resume
                      </Button>
                      <Button variant="outlined" onClick={() => navigate('/network')}>
                        Expand Network
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
