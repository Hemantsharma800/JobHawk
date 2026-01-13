import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { 
  Home, 
  User, 
  Briefcase, 
  Settings, 
  BarChart, 
  Users, 
  LogOut,
  Shield,
  AlertTriangle,
  Mail,
  Lock,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  CheckCircle,
  XCircle
} from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
axios.defaults.baseURL = API_URL;

const AuthContext = createContext();

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }
  
  if (!user) return <Navigate to="/login" />;
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) return <Navigate to="/unauthorized" />;
  
  return children;
};

const HomePage = () => (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100">
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Briefcase className="h-8 w-8 text-blue-600 mr-2" />
            <span className="text-xl font-bold text-gray-900">Glixtron</span>
          </div>
          <div className="flex space-x-4">
            <Link to="/login" className="px-4 py-2 text-blue-600 hover:text-blue-800 font-medium">
              Job Seeker Login
            </Link>
            <Link to="/admin-login" className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </nav>
    
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Find Your <span className="text-blue-600">Dream Job</span> Today
        </h1>
        <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
          Glixtron connects talented professionals with top companies. 
          Whether you're looking for opportunities or hiring talent, we've got you covered.
        </p>
        <div className="flex justify-center space-x-6">
          <Link to="/login" className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 shadow-lg">
            Start Job Hunting
          </Link>
          <Link to="/admin-login" className="px-8 py-3 bg-gray-800 text-white text-lg font-semibold rounded-lg hover:bg-gray-900 shadow-lg">
            Employer Portal
          </Link>
        </div>
      </div>
      
      <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <User className="h-12 w-12 text-blue-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">For Job Seekers</h3>
          <p className="text-gray-600">Browse jobs, upload resume, track applications.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <Briefcase className="h-12 w-12 text-green-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">For Employers</h3>
          <p className="text-gray-600">Post jobs, manage applications, find candidates.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-lg">
          <Shield className="h-12 w-12 text-red-600 mb-4" />
          <h3 className="text-xl font-bold mb-2">Admin Portal</h3>
          <p className="text-gray-600">Full system control with advanced analytics.</p>
        </div>
      </div>
    </main>
  </div>
);

const UserLogin = () => {
  const [email, setEmail] = useState('user@Glixtron.com');
  const [password, setPassword] = useState('user123');
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password, 'user');
      toast.success('Login successful!');
      navigate('/user-dashboard');
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (userType) => {
    const credentials = {
      'user': { email: 'user@Glixtron.com', password: 'user123' },
      'editor': { email: 'editor@Glixtron.com', password: 'editor123' },
      'admin': { email: 'admin@Glixtron.com', password: 'admin123' },
      'super-admin': { email: 'superadmin@Glixtron.com', password: 'admin123' }
    };
    setEmail(credentials[userType].email);
    setPassword(credentials[userType].password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Toaster />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <Briefcase className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
            <p className="text-gray-600 mt-2">Sign in to your Glixtron account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in to Glixtron'}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-gray-300"></div></div>
              <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-gray-500">Quick Test Logins</span></div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              {['user', 'editor', 'admin', 'super-admin'].map((role) => (
                <button
                  key={role}
                  onClick={() => handleQuickLogin(role)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg ${
                    role === 'super-admin' ? 'bg-purple-100 text-purple-700 hover:bg-purple-200' :
                    role === 'admin' ? 'bg-red-100 text-red-700 hover:bg-red-200' :
                    role === 'editor' ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' :
                    'bg-green-100 text-green-700 hover:bg-green-200'
                  }`}
                >
                  {role.charAt(0).toUpperCase() + role.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-blue-600 hover:text-blue-500">Sign up</Link>
            </p>
            <p className="mt-2 text-sm text-gray-600">
              Admin?{' '}
              <Link to="/admin-login" className="font-medium text-red-600 hover:text-red-500">Go to Admin Portal</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const AdminLogin = () => {
  const [email, setEmail] = useState('admin@Glixtron.com');
  const [password, setPassword] = useState('admin123');
  const [testMode, setTestMode] = useState(false);
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (testMode) {
        localStorage.setItem('testMode', 'true');
        toast.success('Entering Test Mode...');
      }
      await login(email, password, 'admin');
      toast.success('Admin login successful!');
      navigate('/admin-dashboard');
    } catch (error) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickAccess = (role) => {
    const credentials = {
      'super-admin': { email: 'superadmin@Glixtron.com', password: 'admin123' },
      'admin': { email: 'admin@Glixtron.com', password: 'admin123' },
      'editor': { email: 'editor@Glixtron.com', password: 'editor123' }
    };
    setEmail(credentials[role].email);
    setPassword(credentials[role].password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <Toaster />
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <div className="p-8">
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white">Admin Control Panel</h2>
            <p className="text-gray-400 mt-2">Restricted Access - Authorized Personnel Only</p>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 mb-3">Quick Access:</h3>
            <div className="grid grid-cols-3 gap-2">
              <button onClick={() => handleQuickAccess('super-admin')} className="px-3 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm rounded">Super Admin</button>
              <button onClick={() => handleQuickAccess('admin')} className="px-3 py-2 bg-red-600 hover:bg-red-700 text-white text-sm rounded">Admin</button>
              <button onClick={() => handleQuickAccess('editor')} className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded">Editor</button>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Admin Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@Glixtron.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-red-500"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                checked={testMode}
                onChange={(e) => setTestMode(e.target.checked)}
                className="h-4 w-4 text-red-600 bg-gray-700 border-gray-600 rounded"
              />
              <label className="ml-2 block text-sm text-gray-300">Test Mode (Limited Access)</label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Accessing...' : (testMode ? 'Enter Test Mode' : 'Access Admin Panel')}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-400">
              <Link to="/" className="hover:text-gray-300">← Back to Main Site</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/jobs');
      setJobs(response.data.jobs);
    } catch (error) {
      toast.error('Failed to load jobs');
    } finally {
      setLoading(false);
    }
  };

  const applyToJob = async (jobId) => {
    try {
      await axios.post(`/jobs/${jobId}/apply`, {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('Application submitted!');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to apply');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Briefcase className="h-8 w-8 text-blue-600 mr-2" />
              <span className="text-xl font-bold text-gray-900">Glixtron</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Welcome, {user?.fullName}</span>
              <button onClick={logout} className="px-4 py-2 text-red-600 hover:text-red-800 font-medium">
                <LogOut className="h-5 w-5 inline mr-1" /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Job Dashboard</h1>
          <p className="text-gray-600">Find and apply to your dream jobs</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">Profile</h3>
            <p className="text-gray-600">Email: {user?.email}</p>
            <p className="text-gray-600">Role: {user?.role}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">Applications</h3>
            <p className="text-2xl font-bold text-blue-600">0</p>
            <p className="text-gray-600">Jobs applied</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">Quick Actions</h3>
            <button className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Update Profile
            </button>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Available Jobs</h2>
          {loading ? (
            <div className="text-center py-8">Loading jobs...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job) => (
                <div key={job._id} className="bg-white rounded-xl shadow p-6">
                  <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-2">{job.company} • {job.location}</p>
                  <p className="text-gray-500 text-sm mb-4">{job.description.substring(0, 100)}...</p>
                  <button
                    onClick={() => applyToJob(job._id)}
                    className="w-full px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

const AdminDashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const [statsRes, usersRes] = await Promise.all([
        axios.get('/admin/dashboard/stats', {
          headers: { Authorization: `Bearer ${token}` }
        }),
        axios.get('/admin/users', {
          headers: { Authorization: `Bearer ${token}` }
        })
      ]);
      setStats(statsRes.data.stats);
      setUsers(usersRes.data);
    } catch (error) {
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <nav className="bg-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Shield className="h-8 w-8 text-red-600 mr-2" />
              <span className="text-xl font-bold text-white">Glixtron Admin</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-300">Welcome, {user?.fullName} ({user?.role})</span>
              <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
                <LogOut className="h-5 w-5 inline mr-1" /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400">Full system control and analytics</p>
        </div>

        {loading ? (
          <div className="text-center py-8 text-white">Loading dashboard...</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Total Users</h3>
                <p className="text-3xl font-bold text-blue-400">{stats?.totalUsers}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Total Jobs</h3>
                <p className="text-3xl font-bold text-green-400">{stats?.totalJobs}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Active Jobs</h3>
                <p className="text-3xl font-bold text-yellow-400">{stats?.activeJobs}</p>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-lg font-semibold text-white mb-2">Admins</h3>
                <p className="text-3xl font-bold text-purple-400">{stats?.totalAdmins}</p>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-4">User Management</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-white">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-3 text-left">Name</th>
                      <th className="py-3 text-left">Email</th>
                      <th className="py-3 text-left">Role</th>
                      <th className="py-3 text-left">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u._id} className="border-b border-gray-700 hover:bg-gray-700">
                        <td className="py-3">{u.fullName}</td>
                        <td className="py-3">{u.email}</td>
                        <td className="py-3">
                          <span className={`px-2 py-1 rounded text-xs ${
                            u.role === 'super-admin' ? 'bg-purple-600' :
                            u.role === 'admin' ? 'bg-red-600' :
                            u.role === 'editor' ? 'bg-blue-600' : 'bg-gray-600'
                          }`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="py-3">
                          <button className="px-3 py-1 bg-blue-600 rounded text-sm hover:bg-blue-700 mr-2">
                            Edit
                          </button>
                          {user?.role === 'super-admin' && (
                            <button className="px-3 py-1 bg-red-600 rounded text-sm hover:bg-red-700">
                              Delete
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
                    <Plus className="h-5 w-5 mr-2" /> Add New Job
                  </button>
                  <button className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center">
                    <Users className="h-5 w-5 mr-2" /> Manage Users
                  </button>
                  <button className="w-full px-4 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 flex items-center">
                    <BarChart className="h-5 w-5 mr-2" /> View Analytics
                  </button>
                </div>
              </div>
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <h3 className="text-xl font-bold text-white mb-4">System Status</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Backend API</span>
                    <span className="text-green-400 font-semibold">● Online</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Database</span>
                    <span className="text-green-400 font-semibold">● Connected</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">User Sessions</span>
                    <span className="text-blue-400 font-semibold">{stats?.totalUsers || 0} Active</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
};

const Unauthorized = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50">
    <div className="text-center">
      <AlertTriangle className="h-16 w-16 text-red-600 mx-auto mb-4" />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Access Denied</h1>
      <p className="text-gray-600 mb-6">You don't have permission to access this page.</p>
      <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
        Go to Home
      </Link>
    </div>
  </div>
);

const App = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setUser(response.data.user);
    } catch (error) {
      localStorage.removeItem('token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password, type = 'user') => {
    const endpoint = type === 'admin' ? '/auth/admin/login' : '/auth/login';
    const response = await axios.post(endpoint, { email, password });
    
    localStorage.setItem('token', response.data.token);
    setUser(response.data.user);
    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('testMode');
    setUser(null);
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      <Router>
        <Toaster position="top-right" />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/user-dashboard" element={
            <ProtectedRoute allowedRoles={['user', 'editor', 'admin', 'super-admin']}>
              <UserDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin-dashboard" element={
            <ProtectedRoute allowedRoles={['editor', 'admin', 'super-admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthContext.Provider>
  );
};

export default App;
