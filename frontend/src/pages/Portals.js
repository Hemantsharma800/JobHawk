import React, { useState } from 'react';
import {
    FaServer,
    FaLink,
    FaUnlink,
    FaSync,
    FaCheckCircle,
    FaTimesCircle,
    FaExclamationTriangle,
    FaPlus
} from 'react-icons/fa';
import Button from '../components/Button';
import './styles/Portals.css';

const Portals = () => {
    const [portals, setPortals] = useState([
        {
            id: '1',
            name: 'LinkedIn',
            url: 'https://linkedin.com/jobs',
            status: 'connected',
            jobCount: 45,
            lastSync: '2024-01-15T10:30:00',
            credentials: { username: 'user@example.com' }
        },
        {
            id: '2',
            name: 'Indeed',
            url: 'https://indeed.com',
            status: 'disconnected',
            jobCount: 0,
            lastSync: null
        },
        {
            id: '3',
            name: 'Glassdoor',
            url: 'https://glassdoor.com',
            status: 'syncing',
            jobCount: 28,
            lastSync: '2024-01-15T09:15:00'
        },
        {
            id: '4',
            name: 'Monster',
            url: 'https://monster.com',
            status: 'error',
            jobCount: 12,
            lastSync: '2024-01-14T15:45:00',
            error: 'Authentication failed'
        }
    ]);

    const handleConnect = (portalId) => {
        setPortals(portals =>
            portals.map(portal =>
                portal.id === portalId
                    ? { ...portal, status: 'connected', lastSync: new Date().toISOString() }
                    : portal
            )
        );
    };

    const handleDisconnect = (portalId) => {
        setPortals(portals =>
            portals.map(portal =>
                portal.id === portalId
                    ? { ...portal, status: 'disconnected', jobCount: 0 }
                    : portal
            )
        );
    };

    const handleSync = (portalId) => {
        setPortals(portals =>
            portals.map(portal =>
                portal.id === portalId
                    ? { ...portal, status: 'syncing' }
                    : portal
            )
        );

        // Simulate API call
        setTimeout(() => {
            setPortals(portals =>
                portals.map(portal =>
                    portal.id === portalId
                        ? {
                            ...portal,
                            status: 'connected',
                            jobCount: portal.jobCount + 5,
                            lastSync: new Date().toISOString()
                        }
                        : portal
                )
            );
        }, 2000);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case 'connected':
                return <FaCheckCircle className="status-connected" />;
            case 'disconnected':
                return <FaTimesCircle className="status-disconnected" />;
            case 'syncing':
                return <FaSync className="status-syncing" />;
            case 'error':
                return <FaExclamationTriangle className="status-error" />;
            default:
                return null;
        }
    };

    const getStatusText = (status) => {
        switch (status) {
            case 'connected': return 'Connected';
            case 'disconnected': return 'Disconnected';
            case 'syncing': return 'Syncing...';
            case 'error': return 'Error';
            default: return status;
        }
    };

    return (
        <div className="portals-page">
            <div className="page-header">
                <div>
                    <h1>Portal Connections</h1>
                    <p>Connect to job portals to automatically import job listings</p>
                </div>
                <Button variant="primary">
                    <FaPlus /> Connect New Portal
                </Button>
            </div>

            <div className="portals-grid">
                {portals.map(portal => (
                    <div key={portal.id} className="portal-card">
                        <div className="portal-header">
                            <div className="portal-icon">
                                <FaServer />
                            </div>
                            <div className="portal-info">
                                <h3>{portal.name}</h3>
                                <p className="portal-url">{portal.url}</p>
                            </div>
                            <div className="portal-status">
                                {getStatusIcon(portal.status)}
                                <span className={`status-text status-${portal.status}`}>
                                    {getStatusText(portal.status)}
                                </span>
                            </div>
                        </div>

                        <div className="portal-stats">
                            <div className="stat">
                                <span className="stat-label">Jobs Imported</span>
                                <span className="stat-value">{portal.jobCount}</span>
                            </div>
                            <div className="stat">
                                <span className="stat-label">Last Sync</span>
                                <span className="stat-value">
                                    {portal.lastSync
                                        ? new Date(portal.lastSync).toLocaleDateString()
                                        : 'Never'
                                    }
                                </span>
                            </div>
                        </div>

                        {portal.error && (
                            <div className="portal-error">
                                <FaExclamationTriangle />
                                <span>{portal.error}</span>
                            </div>
                        )}

                        <div className="portal-actions">
                            {portal.status === 'connected' ? (
                                <>
                                    <Button
                                        variant="outline"
                                        onClick={() => handleSync(portal.id)}
                                        disabled={portal.status === 'syncing'}
                                    >
                                        <FaSync />
                                        {portal.status === 'syncing' ? 'Syncing...' : 'Sync Now'}
                                    </Button>
                                    <Button
                                        variant="danger"
                                        onClick={() => handleDisconnect(portal.id)}
                                    >
                                        <FaUnlink /> Disconnect
                                    </Button>
                                </>
                            ) : (
                                <Button
                                    variant="primary"
                                    onClick={() => handleConnect(portal.id)}
                                    fullWidth
                                >
                                    <FaLink /> Connect Portal
                                </Button>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="portals-info">
                <h3>About Portal Connections</h3>
                <div className="info-grid">
                    <div className="info-item">
                        <h4>Automatic Job Import</h4>
                        <p>Connected portals automatically import new job listings based on your search criteria.</p>
                    </div>
                    <div className="info-item">
                        <h4>Secure Credentials</h4>
                        <p>Your login credentials are encrypted and stored securely. We never store passwords in plain text.</p>
                    </div>
                    <div className="info-item">
                        <h4>Sync Frequency</h4>
                        <p>Portals sync automatically every 6 hours, or manually whenever you click "Sync Now".</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Portals;