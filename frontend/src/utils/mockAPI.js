// Mock API for demonstration
const mockJobsAPI = {
  getJobs: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            id: 1,
            title: 'Frontend Developer',
            company: 'TechCorp',
            location: 'Remote',
            type: 'Full-time',
            salary: 120000,
            experience: 'Mid',
            description: 'Looking for a skilled Frontend Developer with React experience to join our team. You will work on building user interfaces and implementing responsive designs.',
            skills: ['React', 'JavaScript', 'HTML/CSS', 'TypeScript'],
            posted: '2 days ago',
            saved: false,
            applied: false
          },
          {
            id: 2,
            title: 'Backend Engineer',
            company: 'DataSystems',
            location: 'New York',
            type: 'Full-time',
            salary: 140000,
            experience: 'Senior',
            description: 'Join our backend team to build scalable APIs and microservices. Experience with Node.js and databases required.',
            skills: ['Node.js', 'Python', 'AWS', 'MongoDB'],
            posted: '1 day ago',
            saved: true,
            applied: false
          },
          {
            id: 3,
            title: 'UX Designer',
            company: 'CreativeMinds',
            location: 'San Francisco',
            type: 'Contract',
            salary: 95000,
            experience: 'Mid',
            description: 'Create beautiful user experiences and interfaces for our web and mobile applications.',
            skills: ['Figma', 'UI/UX', 'Prototyping', 'User Research'],
            posted: '3 days ago',
            saved: false,
            applied: true
          },
          {
            id: 4,
            title: 'DevOps Engineer',
            company: 'CloudTech',
            location: 'Austin',
            type: 'Full-time',
            salary: 130000,
            experience: 'Senior',
            description: 'Manage our cloud infrastructure and implement CI/CD pipelines for our applications.',
            skills: ['Docker', 'Kubernetes', 'AWS', 'CI/CD'],
            posted: '5 hours ago',
            saved: false,
            applied: false
          },
          {
            id: 5,
            title: 'Data Scientist',
            company: 'AI Solutions',
            location: 'Remote',
            type: 'Full-time',
            salary: 150000,
            experience: 'Senior',
            description: 'Work with large datasets to build machine learning models and provide insights.',
            skills: ['Python', 'Machine Learning', 'SQL', 'TensorFlow'],
            posted: '1 week ago',
            saved: true,
            applied: false
          },
          {
            id: 6,
            title: 'Product Manager',
            company: 'GrowthStartup',
            location: 'Chicago',
            type: 'Full-time',
            salary: 110000,
            experience: 'Mid',
            description: 'Lead product development and work with cross-functional teams to deliver great products.',
            skills: ['Product Strategy', 'Agile', 'User Stories', 'Analytics'],
            posted: '2 days ago',
            saved: false,
            applied: false
          }
        ]);
      }, 500);
    });
  },

  saveJob: (jobId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Job ${jobId} saved`);
        resolve({ success: true });
      }, 300);
    });
  },

  applyToJob: (jobId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`Applied to job ${jobId}`);
        resolve({ success: true });
      }, 300);
    });
  }
};

const mockUserAPI = {
  getNotifications: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, type: 'application', message: 'Your application for Frontend Developer was reviewed', time: '2 hours ago', read: false },
          { id: 2, type: 'message', message: 'New message from recruiter at TechCorp', time: '5 hours ago', read: false },
          { id: 3, type: 'job', message: 'New job matching your profile: React Developer', time: '1 day ago', read: true },
          { id: 4, type: 'connection', message: 'John Doe accepted your connection request', time: '2 days ago', read: true }
        ]);
      }, 300);
    });
  },

  getMessages: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, sender: 'TechCorp HR', message: 'We would like to schedule an interview...', time: '2 hours ago', unread: true },
          { id: 2, sender: 'DataSystems Team', message: 'Thank you for your application...', time: '1 day ago', unread: false },
          { id: 3, sender: 'CreativeMinds', message: 'Your design portfolio looks great!', time: '3 days ago', unread: false }
        ]);
      }, 300);
    });
  },

  getConnections: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 1, name: 'Sarah Johnson', title: 'Senior Developer at Google', mutual: 15, connected: true },
          { id: 2, name: 'Mike Chen', title: 'Product Manager at Meta', mutual: 8, connected: true },
          { id: 3, name: 'Emma Wilson', title: 'UX Designer at Apple', mutual: 12, connected: false },
          { id: 4, name: 'David Lee', title: 'CTO at StartupXYZ', mutual: 5, connected: true }
        ]);
      }, 300);
    });
  }
};

export { mockJobsAPI, mockUserAPI };
