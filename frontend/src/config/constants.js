// API Configuration
export const API_BASE = process.env.REACT_APP_API_BASE || 'http://localhost:5000';

// Application Constants
export const APP_NAME = 'Job Portal Manager';
export const APP_VERSION = '1.0.0';

// Job Status Constants
export const JOB_STATUS = {
    SAVED: 'saved',
    APPLIED: 'applied',
    INTERVIEW: 'interview',
    OFFERED: 'offered',
    REJECTED: 'rejected'
};

// Portal Status Constants
export const PORTAL_STATUS = {
    CONNECTED: 'connected',
    DISCONNECTED: 'disconnected',
    SYNCING: 'syncing',
    ERROR: 'error'
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
    USER_DATA: 'job_portal_user_data',
    JOBS_DATA: 'job_portal_jobs_data',
    PORTALS_DATA: 'job_portal_portals_data',
    THEME: 'job_portal_theme'
};

// Default Settings
export const DEFAULT_SETTINGS = {
    ITEMS_PER_PAGE: 10,
    AUTO_SYNC_INTERVAL: 300000, // 5 minutes in milliseconds
    NOTIFICATION_DURATION: 5000 // 5 seconds
};