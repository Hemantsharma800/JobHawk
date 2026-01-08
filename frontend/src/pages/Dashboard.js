import React, { useState, useEffect } from 'react';
import {
    FaBriefcase,
    FaCheckCircle,
    FaComments,
    FaChartBar,
    FaArrowUp,
    FaArrowDown
} from 'react-icons/fa';
import JobCard from '../components/JobCard';
import './styles/dashboard.css';

const Dashboard = () => {
    const [stats, setStats] = useState({
        totalJobs: 24,
        applied: 12,
        interviews: 6,
        offers: 2,
        successRate: 8.3
    });

    const [recentJobs, setRecentJobs] = useState([
        {
            id: '1',
            title: 'Senior React Developer',
            company: 'TechCorp Inc.',
            location: 'Remote',
            date: '2024-01-15',
            salary: '$120,000 - $150,000',
            description: 'Looking for an experienced React developer...',
            status: 'applied',
            tags: ['React', 'TypeScript', 'Redux'],
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
            description: 'Join our fast-growing startup team...',
            status: 'interview',
            tags: ['Node.js', 'React', 'AWS'],
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
            description: 'Lead our frontend development team...',
            status: 'saved',
            tags: ['React', 'Team Lead', 'UI/UX'],
            url: '#',
            saved: true
        }
    ]);

    const handleApply = (jobId) => {
        console.log('Applying to job:', jobId);
        // API call would go here
    };

    const handleSave = (jobId) => {
        setRecentJobs(jobs =>
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
        // Navigate to job details page
    };

    return (
        <div className="dashboard">
            <div className="dashboard-header">
                <h1>Dashboard</h1>
                <p className="subtitle">Welcome back! Here's your job search overview.</p>
            </div>

            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon total">
                        <FaBriefcase />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.totalJobs}</h3>
                        <p>Total Jobs</p>
                        <span className="stat-trend positive">
                            <FaArrowUp /> 12%
                        </span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon applied">
                        <FaCheckCircle />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.applied}</h3>
                        <p>Applied</p>
                        <span className="stat-trend positive">
                            <FaArrowUp /> 8%
                        </span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon interview">
                        <FaComments />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.interviews}</h3>
                        <p>Interviews</p>
                        <span className="stat-trend negative">
                            <FaArrowDown /> 5%
                        </span>
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-icon success">
                        <FaChartBar />
                    </div>
                    <div className="stat-content">
                        <h3>{stats.successRate}%</h3>
                        <p>Success Rate</p>
                        <span className="stat-trend positive">
                            <FaArrowUp /> 3%
                        </span>
                    </div>
                </div>
            </div>

            <div className="dashboard-content">
                <div className="recent-jobs-section">
                    <div className="section-header">
                        <h2>Recent Job Applications</h2>
                        <a href="/jobs" className="view-all">View All →</a>
                    </div>
                    <div className="jobs-list">
                        {recentJobs.map(job => (
                            <JobCard
                                key={job.id}
                                job={job}
                                onApply={handleApply}
                                onSave={handleSave}
                                onShare={handleShare}
                                onViewDetails={handleViewDetails}
                            />
                        ))}
                    </div>
                </div>

                <div className="right-sidebar">
                    <div className="quick-actions">
                        <h3>Quick Actions</h3>
                        <button className="action-btn primary">
                            + Add New Job
                        </button>
                        <button className="action-btn secondary">
                            Connect Portal
                        </button>
                        <button className="action-btn secondary">
                            Generate Report
                        </button>
                    </div>

                    <div className="upcoming-interviews">
                        <h3>Upcoming Interviews</h3>
                        <div className="interview-item">
                            <div className="interview-time">Today, 2:00 PM</div>
                            <div className="interview-details">
                                <strong>TechCorp - React Interview</strong>
                                <span>Video Call</span>
                            </div>
                        </div>
                        <div className="interview-item">
                            <div className="interview-time">Tomorrow, 10:00 AM</div>
                            <div className="interview-details">
                                <strong>StartupXYZ - Technical Round</strong>
                                <span>On-site</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;