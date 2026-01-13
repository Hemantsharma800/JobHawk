import { Job } from '../types';

const JobManager = {
  saveJob: (job: Job) => {
    try {
      const savedJobs = JobManager.getSavedJobs();
      const jobWithMeta = {
        ...job,
        id: job.id || `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        savedDate: new Date().toISOString(),
        portal: job.portal || 'direct' as const
      };
      
      if (!savedJobs.find((j: Job) => j.id === jobWithMeta.id)) {
        savedJobs.push(jobWithMeta);
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
        JobManager.updateNavigationCount();
        return { success: true, message: 'Job saved successfully!' };
      }
      return { success: false, message: 'Job already saved!' };
    } catch (error) {
      console.error('Error saving job:', error);
      return { success: false, message: 'Failed to save job' };
    }
  },

  getSavedJobs: () => {
    try {
      return JSON.parse(localStorage.getItem('savedJobs') || '[]');
    } catch (error) {
      console.error('Error getting saved jobs:', error);
      return [];
    }
  },

  removeJob: (jobId: string) => {
    try {
      const savedJobs = JobManager.getSavedJobs();
      const filteredJobs = savedJobs.filter(job => job.id !== jobId);
      localStorage.setItem('savedJobs', JSON.stringify(filteredJobs));
      JobManager.updateNavigationCount();
      return { success: true, message: 'Job removed!' };
    } catch (error) {
      console.error('Error removing job:', error);
      return { success: false, message: 'Failed to remove job' };
    }
  },

  updateNavigationCount: () => {
    const savedJobs = JobManager.getSavedJobs();
    const countElements = document.querySelectorAll('.save-count');
    countElements.forEach(element => {
      element.textContent = savedJobs.length.toString();
    });
  },

  init: () => {
    JobManager.updateNavigationCount();
  },

  exportJobs: () => {
    const savedJobs = JobManager.getSavedJobs();
    const dataStr = JSON.stringify(savedJobs, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `saved-jobs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }
};

if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    setTimeout(JobManager.init, 100);
  });
}

default JobManager;
