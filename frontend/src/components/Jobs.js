import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Tabs,
  Tab,
  Paper,
  Grid,
  Button,
  Chip,
  IconButton,
  Drawer,
  useMediaQuery,
  useTheme
} from '@mui/material';
import {
  FilterList as FilterListIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  Sort as SortIcon
} from '@mui/icons-material';
import AIJobAnalysis from './AIJobAnalysis';
import JobCard from './JobCard';
import JobFilters from './JobFilters';
import { jobListings } from '../data/jobData';

const sampleResumeData = {
  name: "John Doe",
  email: "john@example.com",
  phone: "+1-234-567-8900",
  summary: "Experienced software developer with 5+ years in web development specializing in React and Node.js. Proven track record of delivering scalable applications.",
  experience: [
    {
      title: "Senior Developer",
      company: "Tech Corp",
      duration: "2020-2023",
      description: "Led team of 5 developers, implemented microservices architecture, improved performance by 40%"
    },
    {
      title: "Frontend Developer",
      company: "WebSolutions",
      duration: "2018-2020",
      description: "Built responsive web applications using React, collaborated with UX designers"
    }
  ],
  skills: ["JavaScript", "React", "Node.js", "AWS", "TypeScript", "Python", "Django", "SQL", "Redux", "React Native", "Git", "REST APIs"],
  education: [
    {
      degree: "B.S. Computer Science",
      university: "State University",
      year: "2018"
    }
  ]
};

function Jobs() {
  const [tabValue, setTabValue] = useState(0);
  const [jobDescription, setJobDescription] = useState('');
  const [jobs] = useState(jobListings);
  const [filteredJobs, setFilteredJobs] = useState(jobListings);
  const [expandedJob, setExpandedJob] = useState(null);
  const [savedJobs, setSavedJobs] = useState([1, 4, 8]);
  const [viewMode, setViewMode] = useState('list');
  const [filters, setFilters] = useState({
    search: '',
    location: 'all',
    type: 'all',
    experience: 'all',
    minSalary: 50,
    skills: '',
    minMatchScore: 0,
    sortBy: 'match'
  });
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);
  
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  useEffect(() => {
    let result = [...jobs];
    
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchLower) ||
        job.company.toLowerCase().includes(searchLower) ||
        job.description.toLowerCase().includes(searchLower) ||
        job.requirements.some(req => req.toLowerCase().includes(searchLower))
      );
    }
    
    if (filters.location !== 'all') {
      if (filters.location === 'remote') {
        result = result.filter(job => job.location.toLowerCase().includes('remote'));
      } else {
        result = result.filter(job => 
          job.location.toLowerCase().includes(filters.location.toLowerCase())
        );
      }
    }
    
    if (filters.type !== 'all') {
      result = result.filter(job => 
        job.type.toLowerCase() === filters.type.toLowerCase()
      );
    }
    
    result = result.filter(job => {
      const minSalary = parseInt(job.salary.replace(/[^0-9]/g, '').substring(0, 3));
      return minSalary >= filters.minSalary;
    });
    
    result = result.filter(job => job.matchScore >= filters.minMatchScore);
    
    if (filters.skills) {
      const skills = filters.skills.split(',').map(s => s.trim().toLowerCase());
      result = result.filter(job => 
        skills.every(skill => 
          job.requirements.some(req => req.toLowerCase().includes(skill)) ||
          job.title.toLowerCase().includes(skill)
        )
      );
    }
    
    if (filters.sortBy === 'date') {
      result.sort((a, b) => {
        const getDays = (posted) => parseInt(posted.replace(/[^0-9]/g, ''));
        return getDays(a.posted) - getDays(b.posted);
      });
    } else if (filters.sortBy === 'salary') {
      result.sort((a, b) => {
        const getSalary = (salary) => parseInt(salary.replace(/[^0-9]/g, '').substring(0, 3));
        return getSalary(b.salary) - getSalary(a.salary);
      });
    } else {
      result.sort((a, b) => b.matchScore - a.matchScore);
    }
    
    setFilteredJobs(result);
  }, [filters, jobs]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleExpandJob = (jobId) => {
    setExpandedJob(expandedJob === jobId ? null : jobId);
  };

  const handleSaveJob = (jobId) => {
    if (savedJobs.includes(jobId)) {
      setSavedJobs(savedJobs.filter(id => id !== jobId));
    } else {
      setSavedJobs([...savedJobs, jobId]);
    }
  };

  const handleApplyJob = (jobId) => {
    const job = jobs.find(j => j.id === jobId);
    alert(`Applying to: ${job.title} at ${job.company}\n\nWe'll redirect you to the application page.`);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      search: '',
      location: 'all',
      type: 'all',
      experience: 'all',
      minSalary: 50,
      skills: '',
      minMatchScore: 0,
      sortBy: 'match'
    });
  };

  const handleQuickApplyAll = () => {
    const highMatchJobs = filteredJobs.filter(job => job.matchScore >= 80);
    if (highMatchJobs.length > 0) {
      alert(`Quick applying to ${highMatchJobs.length} high-match jobs!\n\nJobs:\n${highMatchJobs.map(j => `• ${j.title} at ${j.company}`).join('\n')}`);
    } else {
      alert("No high-match jobs found. Try adjusting your filters or improve your skills match.");
    }
  };

  return (
    <Box sx={{ py: 2 }}>
      <Typography variant="h4" gutterBottom fontWeight="bold" color="primary">
        Job Search
      </Typography>
      
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          variant="scrollable"
          scrollButtons="auto"
        >
          <Tab label="Job Search" />
          <Tab label="AI Resume Analysis" />
          <Tab label="Saved Jobs" />
          <Tab label="Application Tracker" />
          <Tab label="Career Insights" />
        </Tabs>
      </Paper>

      {tabValue === 0 ? (
        <Grid container spacing={3}>
          <Grid item xs={12} md={3}>
            {!isMobile && (
              <JobFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                onSearchChange={(value) => handleFilterChange('search', value)}
                onClearFilters={handleClearFilters}
                totalJobs={filteredJobs.length}
              />
            )}
            
            {isMobile && (
              <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <Button
                  variant="outlined"
                  startIcon={<FilterListIcon />}
                  onClick={() => setFilterDrawerOpen(true)}
                  fullWidth
                >
                  Filters
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                >
                  {viewMode === 'list' ? <ViewModuleIcon /> : <ViewListIcon />}
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<SortIcon />}
                  onClick={() => handleFilterChange('sortBy', filters.sortBy === 'match' ? 'salary' : 'match')}
                >
                  Sort
                </Button>
              </Box>
            )}
            
            <Paper sx={{ p: 2, mb: 2 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Your Job Match Stats
              </Typography>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  High Match Jobs (80%+)
                </Typography>
                <Typography variant="h5" color="success.main">
                  {filteredJobs.filter(j => j.matchScore >= 80).length}
                </Typography>
              </Box>
              <Box sx={{ mb: 1 }}>
                <Typography variant="body2" color="text.secondary">
                  Good Match Jobs (60-79%)
                </Typography>
                <Typography variant="h5" color="warning.main">
                  {filteredJobs.filter(j => j.matchScore >= 60 && j.matchScore < 80).length}
                </Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Saved Jobs
                </Typography>
                <Typography variant="h5" color="info.main">
                  {savedJobs.length}
                </Typography>
              </Box>
            </Paper>
            
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom fontWeight="bold">
                Quick Actions
              </Typography>
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ mb: 1 }}
                onClick={handleQuickApplyAll}
              >
                Quick Apply to High-Match Jobs
              </Button>
              <Button 
                variant="outlined" 
                fullWidth 
                sx={{ mb: 1 }}
                onClick={() => setTabValue(1)}
              >
                Analyze Resume with AI
              </Button>
              <Button 
                variant="outlined" 
                fullWidth
                onClick={() => {
                  setJobDescription('');
                  setTabValue(1);
                }}
              >
                Generate New Resume
              </Button>
            </Paper>
          </Grid>

          <Grid item xs={12} md={9}>
            <Paper sx={{ p: 2, mb: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6">
                  {filteredJobs.length} Jobs Found
                  {filters.search && (
                    <Chip 
                      label={`Search: "${filters.search}"`} 
                      size="small" 
                      sx={{ ml: 2 }}
                      onDelete={() => handleFilterChange('search', '')}
                    />
                  )}
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                  <Typography variant="body2" color="text.secondary">
                    View:
                  </Typography>
                  <IconButton 
                    size="small" 
                    onClick={() => setViewMode('list')}
                    color={viewMode === 'list' ? 'primary' : 'default'}
                  >
                    <ViewListIcon />
                  </IconButton>
                  <IconButton 
                    size="small" 
                    onClick={() => setViewMode('grid')}
                    color={viewMode === 'grid' ? 'primary' : 'default'}
                  >
                    <ViewModuleIcon />
                  </IconButton>
                </Box>
              </Box>
            </Paper>
            
            {filteredJobs.length === 0 ? (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  No jobs found matching your criteria
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  Try adjusting your filters or search terms
                </Typography>
                <Button 
                  variant="outlined" 
                  onClick={handleClearFilters}
                >
                  Clear All Filters
                </Button>
              </Paper>
            ) : (
              <Box>
                {filteredJobs.map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    expanded={expandedJob === job.id}
                    onExpand={handleExpandJob}
                    onSave={handleSaveJob}
                    onApply={handleApplyJob}
                    isSaved={savedJobs.includes(job.id)}
                  />
                ))}
              </Box>
            )}
            
            {filteredJobs.length > 0 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Button variant="outlined" sx={{ mr: 1 }}>Previous</Button>
                <Button variant="outlined" sx={{ mx: 0.5 }}>1</Button>
                <Button variant="outlined" sx={{ mx: 0.5 }}>2</Button>
                <Button variant="outlined" sx={{ mx: 0.5 }}>3</Button>
                <Button variant="outlined" sx={{ ml: 1 }}>Next</Button>
              </Box>
            )}
          </Grid>
        </Grid>
      ) : tabValue === 1 ? (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            AI-Powered Resume Analysis & Generator
          </Typography>
          
          <Box sx={{ mb: 3 }}>
            <Typography variant="body1" paragraph>
              Paste a job description to analyze match or generate a tailored resume
            </Typography>
            <textarea
              style={{
                width: '100%',
                height: '150px',
                padding: '12px',
                border: '1px solid #ddd',
                borderRadius: '4px',
                fontFamily: 'inherit',
                fontSize: '14px',
                marginBottom: '16px'
              }}
              placeholder="Paste job description here to analyze match with your resume or generate a tailored resume..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
            />
          </Box>
          
          <AIJobAnalysis 
            resumeData={sampleResumeData}
            jobDescription={jobDescription}
          />
        </Box>
      ) : tabValue === 2 ? (
        <Box>
          <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
            Saved Jobs ({savedJobs.length})
          </Typography>
          
          {savedJobs.length === 0 ? (
            <Paper sx={{ p: 4, textAlign: 'center' }}>
              <Typography variant="h6" color="text.secondary">
                No saved jobs yet
              </Typography>
              <Typography variant="body2" color="text.secondary" paragraph>
                Click the star icon on any job to save it here
              </Typography>
              <Button 
                variant="contained" 
                onClick={() => setTabValue(0)}
              >
                Browse Jobs
              </Button>
            </Paper>
          ) : (
            <Box>
              {jobs
                .filter(job => savedJobs.includes(job.id))
                .map(job => (
                  <JobCard
                    key={job.id}
                    job={job}
                    expanded={expandedJob === job.id}
                    onExpand={handleExpandJob}
                    onSave={handleSaveJob}
                    onApply={handleApplyJob}
                    isSaved={true}
                  />
                ))}
            </Box>
          )}
        </Box>
      ) : tabValue === 3 ? (
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Application Tracker
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            Track your job applications, interviews, and outcomes (Coming Soon)
          </Typography>
          <Button variant="outlined" disabled>
            Feature Coming Soon
          </Button>
        </Paper>
      ) : (
        <Paper sx={{ p: 4 }}>
          <Typography variant="h5" gutterBottom>
            Career Insights & Analytics
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            View your career progress, skill growth, and market trends (Coming Soon)
          </Typography>
          <Button variant="outlined" disabled>
            Feature Coming Soon
          </Button>
        </Paper>
      )}

      <Drawer
        anchor="left"
        open={filterDrawerOpen}
        onClose={() => setFilterDrawerOpen(false)}
      >
        <Box sx={{ width: 300, p: 2 }}>
          <JobFilters
            filters={filters}
            onFilterChange={handleFilterChange}
            onSearchChange={(value) => handleFilterChange('search', value)}
            onClearFilters={handleClearFilters}
            totalJobs={filteredJobs.length}
          />
          <Button 
            variant="contained" 
            fullWidth 
            onClick={() => setFilterDrawerOpen(false)}
            sx={{ mt: 2 }}
          >
            Apply Filters
          </Button>
        </Box>
      </Drawer>
    </Box>
  );
}

export default Jobs;
