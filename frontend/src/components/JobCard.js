import React from 'react';
import PropTypes from 'prop-types';
import {
    FaBuilding,
    FaMapMarkerAlt,
    FaCalendarAlt,
    FaMoneyBillAlt,
    FaExternalLinkAlt,
    FaBookmark,
    FaShareAlt
} from 'react-icons/fa';
import './JobCard.css';

const JobCard = ({
    job,
    onApply,
    onSave,
    onShare,
    onViewDetails
}) => {
    const getStatusColor = (status) => {
        const colors = {
            saved: '#4361ee',
            applied: '#4cc9f0',
            interview: '#f8961e',
            offered: '#38b000',
            rejected: '#f94144'
        };
        return colors[status] || '#6c757d';
    };

    return (
        <div className="job-card">
            <div className="job-card-header">
                <div className="job-title-section">
                    <h3 className="job-title">{job.title}</h3>
                    <div className="job-company">
                        <FaBuilding />
                        <span>{job.company}</span>
                    </div>
                </div>

                <div className="job-actions">
                    <button
                        className="icon-btn"
                        onClick={() => onSave(job.id)}
                        aria-label="Save job"
                        title="Save"
                    >
                        <FaBookmark className={job.saved ? 'saved' : ''} />
                    </button>
                    <button
                        className="icon-btn"
                        onClick={() => onShare(job)}
                        aria-label="Share job"
                        title="Share"
                    >
                        <FaShareAlt />
                    </button>
                    <button
                        className="icon-btn"
                        onClick={() => window.open(job.url, '_blank')}
                        aria-label="View job posting"
                        title="View"
                    >
                        <FaExternalLinkAlt />
                    </button>
                </div>
            </div>

            <div className="job-card-body">
                <div className="job-meta">
                    {job.location && (
                        <div className="meta-item">
                            <FaMapMarkerAlt />
                            <span>{job.location}</span>
                        </div>
                    )}

                    {job.date && (
                        <div className="meta-item">
                            <FaCalendarAlt />
                            <span>{new Date(job.date).toLocaleDateString()}</span>
                        </div>
                    )}

                    {job.salary && (
                        <div className="meta-item">
                            <FaMoneyBillAlt />
                            <span>{job.salary}</span>
                        </div>
                    )}
                </div>

                {job.description && (
                    <p className="job-description">{job.description}</p>
                )}

                {job.tags && job.tags.length > 0 && (
                    <div className="job-tags">
                        {job.tags.map(tag => (
                            <span key={tag} className="tag">{tag}</span>
                        ))}
                    </div>
                )}
            </div>

            <div className="job-card-footer">
                <div className="job-status">
                    <span
                        className="status-badge"
                        style={{ backgroundColor: getStatusColor(job.status) }}
                    >
                        {job.status}
                    </span>
                </div>

                <div className="job-footer-actions">
                    <button
                        className="btn btn-outline"
                        onClick={() => onViewDetails(job.id)}
                    >
                        View Details
                    </button>

                    <button
                        className="btn btn-primary"
                        onClick={() => onApply(job.id)}
                        disabled={job.status === 'applied'}
                    >
                        {job.status === 'applied' ? 'Applied' : 'Apply Now'}
                    </button>
                </div>
            </div>
        </div>
    );
};

JobCard.propTypes = {
    job: PropTypes.shape({
        id: PropTypes.string.isRequired,
        title: PropTypes.string.isRequired,
        company: PropTypes.string.isRequired,
        location: PropTypes.string,
        date: PropTypes.string,
        salary: PropTypes.string,
        description: PropTypes.string,
        status: PropTypes.string,
        tags: PropTypes.array,
        url: PropTypes.string,
        saved: PropTypes.bool
    }).isRequired,
    onApply: PropTypes.func.isRequired,
    onSave: PropTypes.func.isRequired,
    onShare: PropTypes.func.isRequired,
    onViewDetails: PropTypes.func.isRequired
};

export default JobCard;