import React, { useState } from 'react';
import AdminDashboard from './AdminDashboard';
import { auth } from '@/lib/firebase';
import { signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { Eye, EyeOff, Shield } from 'lucide-react';

const AdminAuth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(auth.currentUser);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      setUser(userCredential.user);
    } catch (err) {
      setError('Invalid credentials or user does not exist.');
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
    setEmail('');
    setPassword('');
  };

  if (user) {
    return <AdminDashboard onSignOut={handleLogout} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-950 via-blue-950 to-black dark:from-black dark:via-blue-950 dark:to-sky-900 font-sans">
      <form onSubmit={handleLogin} className="relative glass-effect border-2 border-transparent bg-white/10 dark:bg-black/30 rounded-3xl p-10 w-full max-w-md shadow-2xl flex flex-col items-center backdrop-blur-xl transition-all duration-300 hover:shadow-blue-400/30 group">
        <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-gradient-to-tr from-sky-400 via-blue-500 to-blue-900 rounded-full p-4 shadow-xl">
          <Shield className="w-12 h-12 text-white" />
        </div>
        <h2 className="text-3xl font-extrabold mb-2 gradient-text text-center tracking-tight">Admin Login</h2>
        <p className="text-sky-700 dark:text-sky-200 mb-8 text-center text-lg font-medium">Welcome to the RansAds Admin Portal</p>
        <div className="w-full mb-6">
          <label className="block text-sm font-semibold text-sky-900 dark:text-sky-200 mb-2">Email Address</label>
          <input
            type="email"
            placeholder="admin@email.com"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-100 placeholder:text-sky-400 dark:placeholder:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-blue-500 transition-all text-base shadow-sm"
            required
          />
        </div>
        <div className="w-full mb-6 relative">
          <label className="block text-sm font-semibold text-sky-900 dark:text-sky-200 mb-2">Password</label>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-white/80 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-100 placeholder:text-sky-400 dark:placeholder:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-blue-500 transition-all text-base shadow-sm pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-sky-400 hover:text-blue-600 transition flex items-center justify-center h-6 w-6"
              tabIndex={-1}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>
        {error && <div className="text-red-500 mb-4 w-full text-center font-semibold animate-pulse">{error}</div>}
        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-sky-400 via-blue-500 to-blue-900 text-white text-lg font-bold shadow-lg hover:scale-105 hover:shadow-blue-400/40 transition-all duration-200 mt-2 mb-2 disabled:opacity-60"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminAuth; 