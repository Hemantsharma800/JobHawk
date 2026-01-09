// API service for Portals integration
const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://api.jobhawk.com/v1';

class PortalsApi {
  // Get all connected portals
  static async getPortals() {
    try {
      const response = await fetch(`${API_BASE_URL}/portals`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch portals');
      return await response.json();
    } catch (error) {
      console.error('Error fetching portals:', error);
      throw error;
    }
  }

  // Connect a new portal
  static async connectPortal(portalId, apiKey) {
    try {
      const response = await fetch(`${API_BASE_URL}/portals/${portalId}/connect`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ apiKey })
      });
      
      if (!response.ok) throw new Error('Failed to connect portal');
      return await response.json();
    } catch (error) {
      console.error('Error connecting portal:', error);
      throw error;
    }
  }

  // Sync portal jobs
  static async syncPortal(portalId) {
    try {
      const response = await fetch(`${API_BASE_URL}/portals/${portalId}/sync`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to sync portal');
      return await response.json();
    } catch (error) {
      console.error('Error syncing portal:', error);
      throw error;
    }
  }

  // Disconnect portal
  static async disconnectPortal(portalId) {
    try {
      const response = await fetch(`${API_BASE_URL}/portals/${portalId}/disconnect`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to disconnect portal');
      return await response.json();
    } catch (error) {
      console.error('Error disconnecting portal:', error);
      throw error;
    }
  }

  // Get portal statistics
  static async getPortalStats(portalId) {
    try {
      const response = await fetch(`${API_BASE_URL}/portals/${portalId}/stats`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch portal stats');
      return await response.json();
    } catch (error) {
      console.error('Error fetching portal stats:', error);
      throw error;
    }
  }
}

export default PortalsApi;
