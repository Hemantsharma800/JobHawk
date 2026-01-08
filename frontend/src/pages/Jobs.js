import React, { useState } from 'react';
import {
    FaSearch,
    FaFilter,
    FaSort,
    FaPlus,
    FaDownload,
    FaUpload
} from 'react-icons/fa';
import JobCard from '../components/JobCard';
import Button from '../components/Button';
import './styles/Jobs.css';

const Jobs = () => {
    const [jobs, setJobs] = useState([
        {
            id: '1',
            title: 'Senior React Developer',
            company: 'TechCorp Inc.',
            location: 'Remote',
            date: '2024-01-15',
            salary: '$120,000 - $150,000',
            description: 'Looking for an experienced React developer with 5+ years of experience...',
            status: 'applied',
            tags: ['React', 'TypeScript', 'Redux', 'Node.js'],
            url: '#',
            saved: true
        },
        {
            id: '2',
            title: 'Full Stack Engineer',
            company: 'StartupXYZ',
            location: 'San Francisco, CA',
            date: '2024-01-14',
            salary: '$130,000 - $160,000',
            description: 'Join our fast-growing startup team working on innovative solutions...',
            status: 'interview',
            tags: ['Node.js', 'React', 'AWS', 'MongoDB'],
            url: '#',
            saved: false
        },
        {
            id: '3',
            title: 'Frontend Lead',
            company: 'DesignStudio',
            location: 'New York, NY',
            date: '2024-01-13',
            salary: '$140,000 - $170,000',
            description: 'Lead our frontend development team in building beautiful user interfaces...',
            status: 'saved',
            tags: ['React', 'Team Lead', 'UI/UX', 'Design Systems'],
            url: '#',
            saved: true
        },
        {
            id: '4',
            title: 'Backend Developer',
            company: 'DataSystems',
            location: 'Austin, TX',
            date: '2024-01-12',
            salary: '$110,000 - $140,000',
            description: 'Build scalable backend systems using modern technologies...',
            status: 'applied',
            tags: ['Python', 'Django', 'PostgreSQL', 'Docker'],
            url: '#',
            saved: false
        }
    ]);

    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('all');
    const [sortBy, setSortBy] = useState('date');

    const handleApply = (jobId) => {
        setJobs(jobs =>
            jobs.map(job =>
                job.id === jobId ? { ...job, status: 'applied' } : job
            )
        );
    };

    const handleSave = (jobId) => {
        setJobs(jobs =>
            jobs.map(job =>
                job.id === jobId ? { ...job, saved: !job.saved } : job
            )
        );
    };

    const handleShare = (job) => {
        navigator.clipboard.writeText(job.url || window.location.href);
        alert('Job link copied to clipboard!');
    };

    const handleViewDetails = (jobId) => {
        console.log('Viewing details for job:', jobId);
    };

    const handleAddJob = () => {
        const newJob = {
            id: Date.now().toString(),
            title: 'New Job Position',
            company: 'New Company',
            location: 'Remote',
            date: new Date().toISOString().split('T')[0],
            salary: '$100,000 - $130,000',
            description: 'New job description...',
            status: 'saved',
            tags: ['New'],
            url: '#',
            saved: false
        };
        setJobs([newJob, ...jobs]);
    };

    const filteredJobs = jobs
        .filter(job => {
            if (filter === 'all') return true;
            return job.status === filter;
        })
        .filter(job => {
            if (!search) return true;
            return (
                job.title.toLowerCase().includes(search.toLowerCase()) ||
                job.company.toLowerCase().includes(search.toLowerCase()) ||
                job.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()))
            );
        })
        .sort((a, b) => {
            if (sortBy === 'date') {
                return new Date(b.date) - new Date(a.date);
            }
            if (sortBy === 'title') {
                return a.title.localeCompare(b.title);
            }
            if (sortBy === 'company') {
                return a.company.localeCompare(b.company);
            }
            return 0;
        });

    return (
        <div className="jobs-page">
            <div className="page-header">
                <div>
                    <h1>Job Management</h1>
                    <p>Manage and track all your job applications</p>
                </div>
                <div className="header-actions">
                    <Button variant="primary" onClick={handleAddJob}>
                        <FaPlus /> Add Job
                    </Button>
                    <Button variant="outline">
                        <FaDownload /> Export
                    </Button>
                    <Button variant="outline">
                        <FaUpload /> Import
                    </Button>
                </div>
            </div>

            <div className="filters-section">
                <div className="search-box">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search jobs, companies, or tags..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                <div className="filter-controls">
                    <div className="filter-group">
                        <FaFilter />
                        <select value={filter} onChange={(e) => setFilter(e.target.value)}>
                            <option value="all">All Status</option>
                            <option value="saved">Saved</option>
                            <option value="applied">Applied</option>
                            <option value="interview">Interview</option>
                            <option value="offered">Offered</option>
                            <option value="rejected">Rejected</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <FaSort />
                        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                            <option value="date">Sort by Date</option>
                            <option value="title">Sort by Title</option>
                            <option value="company">Sort by Company</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="jobs-stats">
                <div className="stat-chip">
                    <span className="stat-label">Total Jobs</span>
                    <span className="stat-value">{jobs.length}</span>
                </div>
                <div className="stat-chip">
                    <span className="stat-label">Applied</span>
                    <span className="stat-value">{jobs.filter(j => j.status === 'applied').length}</span>
                </div>
                <div className="stat-chip">
                    <span className="stat-label">Interviews</span>
                    <span className="stat-value">{jobs.filter(j => j.status === 'interview').length}</span>
                </div>
                <div className="stat-chip">
                    <span className="stat-label">Saved</span>
                    <span className="stat-value">{jobs.filter(j => j.saved).length}</span>
                </div>
            </div>

            <div className="jobs-list">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <JobCard
                            key={job.id}
                            job={job}
                            onApply={handleApply}
                            onSave={handleSave}
                            onShare={handleShare}
                            onViewDetails={handleViewDetails}
                        />
                    ))
                ) : (
                    <div className="empty-state">
                        <h3>No jobs found</h3>
                        <p>Try adjusting your search criteria or add a new job</p>
                        <Button variant="primary" onClick={handleAddJob}>
                            <FaPlus /> Add Your First Job
                        </Button>
                    </div>
                )}
            </div>

            {filteredJobs.length > 0 && (
                <div className="pagination">
                    <Button variant="outline" disabled>Previous</Button>
                    <span className="page-info">
                        Showing {filteredJobs.length} of {jobs.length} jobs
                    </span>
                    <Button variant="outline">Next</Button>
                </div>
            )}
        </div>
    );
};

export default Jobs;