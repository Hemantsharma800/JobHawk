// custom.d.ts

// Declare modules for file types
declare module '*.svg' {
    import React = require('react');
    export const ReactComponent: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    const src: string;
    export default src;
}

declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.jpg' {
    const value: string;
    export default value;
}

declare module '*.jpeg' {
    const value: string;
    export default value;
}

declare module '*.gif' {
    const value: string;
    export default value;
}

declare module '*.webp' {
    const value: string;
    export default value;
}

declare module '*.ico' {
    const value: string;
    export default value;
}

declare module '*.bmp' {
    const value: string;
    export default value;
}

// CSS Modules
declare module '*.module.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.sass' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.module.less' {
    const classes: { [key: string]: string };
    export default classes;
}

// Fonts
declare module '*.woff';
declare module '*.woff2';
declare module '*.ttf';
declare module '*.eot';
declare module '*.otf';

// Videos
declare module '*.mp4';
declare module '*.webm';
declare module '*.ogg';
declare module '*.mov';

// Audio
declare module '*.mp3';
declare module '*.wav';
declare module '*.flac';
declare module '*.aac';
declare module '*.ogg';

// Documents
declare module '*.pdf';
declare module '*.doc';
declare module '*.docx';

// Environment variables
declare namespace NodeJS {
    interface ProcessEnv {
        readonly NODE_ENV: 'development' | 'production' | 'test';
        readonly PUBLIC_URL: string;
        readonly REACT_APP_API_BASE: string;
        readonly REACT_APP_NAME: string;
        readonly REACT_APP_VERSION: string;
        readonly REACT_APP_ENVIRONMENT: string;
        readonly REACT_APP_GOOGLE_ANALYTICS_ID?: string;
        readonly REACT_APP_SENTRY_DSN?: string;
    }
}

// Global types
interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
}

// Custom types for your application
type JobStatus = 'saved' | 'applied' | 'interview' | 'offered' | 'rejected';
type PortalStatus = 'connected' | 'disconnected' | 'syncing' | 'error';

interface Job {
    id: string;
    title: string;
    company: string;
    location: string;
    description: string;
    status: JobStatus;
    date: string;
    url?: string;
    salary?: string;
    portal?: string;
    notes?: string;
    createdAt: string;
    updatedAt: string;
}

interface Portal {
    id: string;
    name: string;
    url: string;
    status: PortalStatus;
    jobCount: number;
    lastSync?: string;
    credentials?: Record<string, any>;
    createdAt: string;
    updatedAt: string;
}

interface User {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    createdAt: string;
    updatedAt: string;
}

interface Notification {
    id: string;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
    timestamp: string;
    read: boolean;
}

interface Stats {
    totalJobs: number;
    appliedJobs: number;
    interviewJobs: number;
    offeredJobs: number;
    rejectedJobs: number;
    savedJobs: number;
    portalsConnected: number;
    successRate: number;
}