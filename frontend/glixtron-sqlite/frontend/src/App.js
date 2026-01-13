import React, { useState, useEffect, createContext, useContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { 
  Briefcase, 
  Shield, 
  LogOut,
  User,
  Users,
  BarChart,
  Search,
  Home,
  Mail,
  Lock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Settings,
  Plus,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
axios.defaults.baseURL = API_URL;

const AuthContext = createContext();

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useContext(AuthContext);
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
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
        <h1 className="text-4xl font-bold text-gray-900 mb-6">
          Glixtron with <span className="text-blue-600">SQLite Database</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
          No MongoDB required! Fully functional job portal with real data persistence using SQLite.
          Perfect for old systems and development.
        </p>
        <div className="flex justify-center space-x-6">
          <Link 
            to="/login" 
            className="px-8 py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-blue-700 shadow-lg"
          >
            User Portal
          </Link>
          <Link 
            to="/admin-login" 
            className="px-8 py-3 bg-red-600 text-white text-lg font-semibold rounded-lg hover:bg-red-700 shadow-lg"
          >
            Admin Portal
          </Link>
        </div>
      </div>
      
      <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <User className="h-10 w-10 text-blue-600 mb-4" />
          <h3 className="text-lg font-bold mb-2">For Job Seekers</h3>
          <p className="text-gray-600">Browse jobs, apply, track applications - all with real data storage.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <Briefcase className="h-10 w-10 text-green-600 mb-4" />
          <h3 className="text-lg font-bold mb-2">For Employers</h3>
          <p className="text-gray-600">Post jobs, manage applications, find the right candidates.</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <Shield className="h-10 w-10 text-red-600 mb-4" />
          <h3 className="text-lg font-bold mb-2">Lightweight & Fast</h3>
          <p className="text-gray-600">SQLite database - no heavy MongoDB, works on any system.</p>
        </div>
      </div>
      
      <div className="mt-12 bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-blue-800 mb-3">📊 Pre-loaded Test Data:</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">6</div>
            <div className="text-sm text-gray-600">Test Users</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">5</div>
            <div className="text-sm text-gray-600">Sample Jobs</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">4</div>
            <div className="text-sm text-gray-600">Applications</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">0</div>
            <div className="text-sm text-gray-600">External Dependencies</div>
          </div>
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
      navigate('/dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = (credentials) => {
    setEmail(credentials.email);
    setPassword(credentials.password);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <Toaster />
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="p-8">
          <div className="text-center mb-8">
            <Briefcase className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-900">User Login</h2>
            <p className="text-gray-600 mt-2">Sign in to browse and apply for jobs</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <input
                type="email"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <input
                type="password"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign In'}
            </button>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Quick Test Logins</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => handleQuickLogin({ email: 'user@Glixtron.com', password: 'user123' })}
                className="px-4 py-2 bg-green-100 text-green-700 text-sm font-medium rounded-lg hover:bg-green-200"
              >
                Regular User
              </button>
              <button
                onClick={() => handleQuickLogin({ email: 'john@example.com', password: 'password123' })}
                className="px-4 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-lg hover:bg-blue-200"
              >
                John Doe
              </button>
              <button
                onClick={() => handleQuickLogin({ email: 'editor@Glixtron.com', password: 'editor123' })}
                className="px-4 py-2 bg-yellow-100 text-yellow-700 text-sm font-medium rounded-lg hover:bg-yellow-200"
              >
                Editor
              </button>
              <button
                onClick={() => handleQuickLogin({ email: 'admin@Glixtron.com', password: 'admin123' })}
                className="px-4 py-2 bg-red-100 text-red-700 text-sm font-medium rounded-lg hover:bg-red-200"
              >
                Admin
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600">
              Admin?{' '}
              <Link to="/admin-login" className="font-medium text-red-600 hover:text-red-500">
                Go to Admin Portal
              </Link>
            </p>
            <p className="mt-2 text-sm text-gray-600">
              <Link to="/" className="hover:text-blue-600">
                ← Back to Home
              </Link>
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
  const { login } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login(email, password, 'admin');
      toast.success('Admin login successful!');
      navigate('/admin-dashboard');
    } catch (error) {
      toast.error(error.response?.data?.error || 'Admin login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center p-4">
      <Toaster />
      <div className="bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md border border-gray-700">
        <div className="p-8">
          <div className="text-center mb-8">
            <Shield className="h-12 w-12 text-red-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-white">Admin Portal</h2>
            <p className="text-gray-400 mt-2">Restricted Access - SQLite Backend</p>
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

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-red-700 disabled:opacity-50"
            >
              {loading ? 'Accessing...' : 'Access Admin Panel'}
            </button>
          </form>

          <div className="mt-8 text-center">
            <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-4">
              <h4 className="text-sm font-medium text-gray-300 mb-2">Test Admin Credentials:</h4>
              <div className="space-y-2 text-left">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Super Admin:</span>
                  <span className="text-purple-300">superadmin@Glixtron.com</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Admin:</span>
                  <span className="text-red-300">admin@Glixtron.com</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Editor:</span>
                  <span className="text-blue-300">editor@Glixtron.com</span>
                </div>
                <div className="text-xs text-gray-500 mt-2">Password: admin123 (or editor123)</div>
              </div>
            </div>
            
            <p className="text-sm text-gray-400">
              <Link to="/" className="hover:text-gray-300">← Back to Main Site</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Dashboard = () => {
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
      toast.success('Application submitted successfully!');
      fetchJobs();
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
              <span className="text-xl font-bold text-gray-900">Glixtron Dashboard</span>
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
          <h1 className="text-3xl font-bold text-gray-900">Available Jobs</h1>
          <p className="text-gray-600">Find your next opportunity from {jobs.length} available positions</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading jobs...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <div key={job.id} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                    <p className="text-gray-600">{job.company} • {job.location}</p>
                  </div>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                    {job.category}
                  </span>
                </div>
                
                <p className="text-gray-700 mb-4 line-clamp-3">{job.description}</p>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2">Salary: ${job.salary_min?.toLocaleString()} - ${job.salary_max?.toLocaleString()} {job.salary_currency}</p>
                  <div className="flex flex-wrap gap-1">
                    {job.skills?.split(',').map((skill, idx) => (
                      <span key={idx} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                        {skill.trim()}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500">Posted by: {job.postedByName || 'Admin'}</span>
                  <button
                    onClick={() => applyToJob(job.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium"
                  >
                    Apply Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && jobs.length === 0 && (
          <div className="text-center py-12">
            <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No jobs available</h3>
            <p className="text-gray-600">Check back later for new job postings</p>
          </div>
        )}
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

  const updateUserRole = async (userId, newRole) => {
    try {
      await axios.put(`/admin/users/${userId}/role`, { role: newRole }, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      });
      toast.success('User role updated');
      fetchDashboardData();
    } catch (error) {
      toast.error(error.response?.data?.error || 'Failed to update role');
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
              <span className="text-gray-300">
                {user?.fullName} ({user?.role})
              </span>
              <button 
                onClick={logout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium"
              >
                <LogOut className="h-5 w-5 inline mr-1" /> Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-gray-400">SQLite Database Management</p>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-600 mx-auto"></div>
            <p className="mt-4 text-gray-400">Loading dashboard data...</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="flex items-center mb-4">
                  <Users className="h-8 w-8 text-blue-400 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Total Users</h3>
                    <p className="text-3xl font-bold text-blue-400">{stats?.totalUsers}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="flex items-center mb-4">
                  <Briefcase className="h-8 w-8 text-green-400 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Total Jobs</h3>
                    <p className="text-3xl font-bold text-green-400">{stats?.totalJobs}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="flex items-center mb-4">
                  <BarChart className="h-8 w-8 text-yellow-400 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Active Jobs</h3>
                    <p className="text-3xl font-bold text-yellow-400">{stats?.activeJobs}</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-800 p-6 rounded-xl border border-gray-700">
                <div className="flex items-center mb-4">
                  <Shield className="h-8 w-8 text-purple-400 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-white">Admins</h3>
                    <p className="text-3xl font-bold text-purple-400">{stats?.totalAdmins}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-xl border border-gray-700 p-6 mb-8">
              <h2 className="text-2xl font-bold text-white mb-6">User Management</h2>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-700">
                      <th className="py-3 text-left text-gray-300 font-medium">Name</th>
                      <th className="py-3 text-left text-gray-300 font-medium">Email</th>
                      <th className="py-3 text-left text-gray-300 font-medium">Role</th>
                      <th className="py-3 text-left text-gray-300 font-medium">Joined</th>
                      <th className="py-3 text-left text-gray-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map((u) => (
                      <tr key={u.id} className="border-b border-gray-700 hover:bg-gray-750">
                        <td className="py-4 text-white">{u.fullName}</td>
                        <td className="py-4 text-gray-300">{u.email}</td>
                        <td className="py-4">
                          <select
                            value={u.role}
                            onChange={(e) => updateUserRole(u.id, e.target.value)}
                            disabled={user?.role !== 'super-admin'}
                            className={`px-3 py-1 rounded text-sm ${
                              u.role === 'super-admin' ? 'bg-purple-600 text-white' :
                              u.role === 'admin' ? 'bg-red-600 text-white' :
                              u.role === 'editor' ? 'bg-blue-600 text-white' :
                              'bg-gray-600 text-white'
                            } ${user?.role === 'super-admin' ? '' : 'opacity-50 cursor-not-allowed'}`}
                          >
                            <option value="user">User</option>
                            <option value="editor">Editor</option>
                            <option value="admin">Admin</option>
                            <option value="super-admin">Super Admin</option>
                          </select>
                        </td>
                        <td className="py-4 text-gray-400">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="py-4">
                          <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 mr-2">
                            View
                          </button>
                          {user?.role === 'super-admin' && u.role !== 'super-admin' && (
                            <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
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

            <div className="bg-blue-900/20 border border-blue-700 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">💾 Database Information</h3>
              <p className="text-blue-200 mb-4">
                This application uses <strong>SQLite</strong> database instead of MongoDB.
                All data is stored locally in <code className="bg-blue-900 px-2 py-1 rounded">Glixtron.db</code> file.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-blue-800/50 p-4 rounded-lg">
                  <div className="text-sm text-blue-300">Database</div>
                  <div className="text-white font-semibold">SQLite</div>
                </div>
                <div className="bg-blue-800/50 p-4 rounded-lg">
                  <div className="text-sm text-blue-300">File Location</div>
                  <div className="text-white font-semibold text-sm">backend/database/Glixtron.db</div>
                </div>
                <div className="bg-blue-800/50 p-4 rounded-lg">
                  <div className="text-sm text-blue-300">No External DB Required</div>
                  <div className="text-green-400 font-semibold">✓ Ready to Use</div>
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
      <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
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
          <Route path="/dashboard" element={
            <ProtectedRoute allowedRoles={['user', 'editor', 'admin', 'super-admin']}>
              <Dashboard />
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
