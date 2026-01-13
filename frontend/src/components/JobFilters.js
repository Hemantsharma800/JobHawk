import React from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Slider,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Grid
} from '@mui/material';
import {
  Search as SearchIcon,
  FilterList as FilterListIcon,
  Clear as ClearIcon,
  ExpandMore as ExpandMoreIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  AttachMoney as MoneyIcon
} from '@mui/icons-material';

const JobFilters = ({ 
  filters, 
  onFilterChange, 
  onSearchChange, 
  onClearFilters,
  totalJobs 
}) => {
  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
        <Typography variant="h6">
          <FilterListIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Job Filters
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {totalJobs} jobs found
        </Typography>
      </Box>
      
      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search jobs by title, company, or skills..."
        value={filters.search}
        onChange={(e) => onSearchChange(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
        }}
      />
      
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <LocationIcon sx={{ mr: 1 }} />
            <Typography>Location & Type</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Location</InputLabel>
                <Select
                  value={filters.location}
                  label="Location"
                  onChange={(e) => onFilterChange('location', e.target.value)}
                >
                  <MenuItem value="all">All Locations</MenuItem>
                  <MenuItem value="remote">Remote</MenuItem>
                  <MenuItem value="san-francisco">San Francisco</MenuItem>
                  <MenuItem value="new-york">New York</MenuItem>
                  <MenuItem value="austin">Austin</MenuItem>
                  <MenuItem value="seattle">Seattle</MenuItem>
                  <MenuItem value="boston">Boston</MenuItem>
                  <MenuItem value="los-angeles">Los Angeles</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <FormControl fullWidth size="small" sx={{ mb: 2 }}>
                <InputLabel>Job Type</InputLabel>
                <Select
                  value={filters.type}
                  label="Job Type"
                  onChange={(e) => onFilterChange('type', e.target.value)}
                >
                  <MenuItem value="all">All Types</MenuItem>
                  <MenuItem value="full-time">Full-time</MenuItem>
                  <MenuItem value="part-time">Part-time</MenuItem>
                  <MenuItem value="contract">Contract</MenuItem>
                  <MenuItem value="internship">Internship</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </AccordionDetails>
      </Accordion>
      
      <Accordion defaultExpanded>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <WorkIcon sx={{ mr: 1 }} />
            <Typography>Experience & Salary</Typography>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          <Box sx={{ mb: 3 }}>
            <Typography gutterBottom>Experience Level</Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {['All', 'Entry', 'Mid', 'Senior', 'Executive'].map((level) => (
                <Chip
                  key={level}
                  label={level}
                  onClick={() => onFilterChange('experience', level.toLowerCase())}
                  color={filters.experience === level.toLowerCase() ? 'primary' : 'default'}
                  variant={filters.experience === level.toLowerCase() ? 'filled' : 'outlined'}
                  size="small"
                />
              ))}
            </Box>
          </Box>
          
          <Box>
            <Typography gutterBottom sx={{ display: 'flex', alignItems: 'center' }}>
              <MoneyIcon sx={{ mr: 1, fontSize: 16 }} />
              Minimum Salary: ${filters.minSalary}k+
            </Typography>
            <Slider
              value={filters.minSalary}
              onChange={(e, value) => onFilterChange('minSalary', value)}
              min={50}
              max={200}
              step={10}
              marks={[
                { value: 50, label: '$50k' },
                { value: 100, label: '$100k' },
                { value: 150, label: '$150k' },
                { value: 200, label: '$200k' }
              ]}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `$${value}k`}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography>Skills & Match Score</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <TextField
            fullWidth
            size="small"
            label="Filter by Skills"
            placeholder="React, Python, AWS..."
            value={filters.skills}
            onChange={(e) => onFilterChange('skills', e.target.value)}
            sx={{ mb: 2 }}
          />
          
          <Box>
            <Typography gutterBottom>
              Minimum AI Match Score: {filters.minMatchScore}%
            </Typography>
            <Slider
              value={filters.minMatchScore}
              onChange={(e, value) => onFilterChange('minMatchScore', value)}
              min={0}
              max={100}
              step={10}
              marks={[
                { value: 0, label: '0%' },
                { value: 50, label: '50%' },
                { value: 80, label: '80%' },
                { value: 100, label: '100%' }
              ]}
              valueLabelDisplay="auto"
              valueLabelFormat={(value) => `${value}%`}
            />
          </Box>
        </AccordionDetails>
      </Accordion>
      
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
        <Button
          variant="outlined"
          startIcon={<ClearIcon />}
          onClick={onClearFilters}
        >
          Clear Filters
        </Button>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="outlined"
            onClick={() => onFilterChange('sortBy', 'date')}
            color={filters.sortBy === 'date' ? 'primary' : 'default'}
          >
            Newest
          </Button>
          <Button
            variant="outlined"
            onClick={() => onFilterChange('sortBy', 'match')}
            color={filters.sortBy === 'match' ? 'primary' : 'default'}
          >
            Best Match
          </Button>
          <Button
            variant="outlined"
            onClick={() => onFilterChange('sortBy', 'salary')}
            color={filters.sortBy === 'salary' ? 'primary' : 'default'}
          >
            Highest Salary
          </Button>
        </Box>
      </Box>
      
      {Object.values(filters).some(filter => 
        filter !== 'all' && filter !== '' && 
        !(typeof filter === 'number' && (filter === 0 || filter === 50))
      ) && (
        <Box sx={{ mt: 2, p: 1, bgcolor: 'primary.light', borderRadius: 1 }}>
          <Typography variant="caption" color="primary.contrastText">
            Active filters applied. {totalJobs} jobs match your criteria.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export default JobFilters;
