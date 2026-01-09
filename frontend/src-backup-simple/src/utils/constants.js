// Application constants
export const APP_NAME = 'Job Portal Manager';
export const APP_VERSION = '1.0.0';

// API Configuration
export const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000/api';

// Job Status Constants
export const JOB_STATUS = {
    SAVED: 'saved',
    APPLIED: 'applied',
    INTERVIEW: 'interview',
    OFFERED: 'offered',
    REJECTED: 'rejected'
};

export const JOB_STATUS_LABELS = {
    [JOB_STATUS.SAVED]: 'Saved',
    [JOB_STATUS.APPLIED]: 'Applied',
    [JOB_STATUS.INTERVIEW]: 'Interview',
    [JOB_STATUS.OFFERED]: 'Offered',
    [JOB_STATUS.REJECTED]: 'Rejected'
};

export const JOB_STATUS_COLORS = {
    [JOB_STATUS.SAVED]: '#4361ee',
    [JOB_STATUS.APPLIED]: '#4cc9f0',
    [JOB_STATUS.INTERVIEW]: '#f8961e',
    [JOB_STATUS.OFFERED]: '#38b000',
    [JOB_STATUS.REJECTED]: '#f94144'
};

// Portal Status Constants
export const PORTAL_STATUS = {
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected',
    SYNCING: 'syncing',
    ERROR: 'error'
};

export const PORTAL_STATUS_LABELS = {
    [PORTAL_STATUS.CONNECTED]: 'Connected',
    [PORTAL_STATUS.DISCONNECTED]: 'Disconnected',
    [PORTAL_STATUS.SYNCING]: 'Syncing',
    [PORTAL_STATUS.ERROR]: 'Error'
};

export const PORTAL_STATUS_COLORS = {
    [PORTAL_STATUS.CONNECTED]: '#38b000',
    [PORTAL_STATUS.DISCONNECTED]: '#718096',
    [PORTAL_STATUS.SYNCING]: '#f8961e',
    [PORTAL_STATUS.ERROR]: '#f94144'
};

// Notification Types
export const NOTIFICATION_TYPES = {
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info'
};

// Local Storage Keys
export const STORAGE_KEYS = {
    TOKEN: 'job_portal_token',
    USER: 'job_portal_user',
    JOBS: 'job_portal_jobs',
    PORTALS: 'job_portal_portals',
    SETTINGS: 'job_portal_settings',
    THEME: 'job_portal_theme'
};

// Default Settings
export const DEFAULT_SETTINGS = {
    ITEMS_PER_PAGE: 10,
    AUTO_SYNC_INTERVAL: 3600000, // 1 hour in milliseconds
    NOTIFICATION_DURATION: 5000, // 5 seconds
    THEME: 'light',
    LANGUAGE: 'en'
};

// Job Tags
export const JOB_TAGS = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 'Python',
    'Java', 'AWS', 'Docker', 'Kubernetes', 'DevOps',
    'Frontend', 'Backend', 'Full Stack', 'Mobile', 'UI/UX',
    'Remote', 'On-site', 'Hybrid', 'Contract', 'Full-time'
];

// Portal Types
export const PORTAL_TYPES = [
    { id: 'linkedin', name: 'LinkedIn', url: 'https://linkedin.com/jobs' },
    { id: 'indeed', name: 'Indeed', url: 'https://indeed.com' },
    { id: 'glassdoor', name: 'Glassdoor', url: 'https://glassdoor.com' },
    { id: 'monster', name: 'Monster', url: 'https://monster.com' },
    { id: 'dice', name: 'Dice', url: 'https://dice.com' },
    { id: 'careerbuilder', name: 'CareerBuilder', url: 'https://careerbuilder.com' },
    { id: 'ziprecruiter', name: 'ZipRecruiter', url: 'https://ziprecruiter.com' }
];

// Routes
export const ROUTES = {
    HOME: '/',
    DASHBOARD: '/dashboard',
    JOBS: '/jobs',
    JOB_DETAILS: '/jobs/:id',
    PORTALS: '/portals',
    ANALYTICS: '/analytics',
    PROFILE: '/profile',
    SETTINGS: '/settings',
    LOGIN: '/login',
    REGISTER: '/register',
    NOT_FOUND: '/404'
};

// Validation Patterns
export const VALIDATION_PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    URL: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
    PHONE: /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
};