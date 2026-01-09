import { API_BASE, APP_NAME, APP_VERSION } from '../utils/constants';

const config = {
    app: {
        name: APP_NAME,
        version: APP_VERSION,
        environment: process.env.NODE_ENV || 'development',
    },

    api: {
        baseURL: API_BASE,
        timeout: 10000,
        retryAttempts: 3,
    },

    features: {
        enableAnalytics: true,
        enableNotifications: true,
        enableOfflineMode: true,
        enableSync: true,
    },

    ui: {
        theme: 'light',
        language: 'en',
        sidebarWidth: 250,
        collapsedSidebarWidth: 70,
    },

    storage: {
        prefix: 'job_portal_',
        encryption: true,
    },

    pagination: {
        defaultPageSize: 10,
        pageSizes: [5, 10, 25, 50],
    },

    notifications: {
        position: 'top-right',
        duration: 5000,
        maxVisible: 5,
    },
};

export default config;