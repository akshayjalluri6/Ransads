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
    <div className="min-h-screen flex items-center justify-center relative bg-gradient-to-br from-sky-200 via-blue-300 to-blue-900 dark:from-black dark:via-blue-950 dark:to-sky-900 overflow-hidden font-sans">
      {/* Multi-layered animated background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-400/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-900/30 rounded-full blur-2xl animate-pulse-slower" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-br from-sky-300/30 to-blue-400/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute left-0 top-1/2 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-sky-200/10 rounded-full blur-2xl animate-float" />
        <div className="absolute right-0 bottom-1/4 w-32 h-32 bg-gradient-to-br from-sky-400/20 to-blue-900/10 rounded-full blur-2xl animate-float" style={{animationDelay: '2s'}} />
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] dark:bg-[radial-gradient(circle,rgba(30,41,59,0.08)_1px,transparent_1px)]" />
      </div>
      <form onSubmit={handleLogin} className="relative z-10 glass-effect border-2 border-sky-200/40 dark:border-sky-800/60 bg-white/30 dark:bg-sky-950/70 rounded-3xl p-12 w-full max-w-lg shadow-2xl flex flex-col items-center backdrop-blur-2xl transition-all duration-300 hover:shadow-blue-400/40 group ring-4 ring-sky-300/10 dark:ring-blue-900/20">
        {/* Logo and tagline */}
        <div className="absolute -top-16 left-1/2 -translate-x-1/2 flex flex-col items-center">
          <div className="bg-gradient-to-tr from-sky-400 via-blue-500 to-blue-900 rounded-full p-6 shadow-2xl border-4 border-white/40 dark:border-sky-900/60 animate-float">
            <Shield className="w-16 h-16 text-white drop-shadow-xl" />
          </div>
          <span className="mt-2 text-xs uppercase tracking-widest text-sky-500 dark:text-sky-300 font-bold drop-shadow">RansAds Admin</span>
        </div>
        <h2 className="text-5xl font-extrabold mb-2 gradient-text text-center tracking-tight drop-shadow-xl mt-8 animate-pulse">Welcome</h2>
        <p className="text-sky-700 dark:text-sky-200 mb-10 text-center text-lg font-medium">Sign in to your creative dashboard</p>
        {/* Email input with floating label and icon */}
        <div className="w-full mb-8 relative group">
          <input
            type="email"
            placeholder=" "
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="peer w-full px-14 py-4 rounded-2xl bg-white/80 dark:bg-sky-950/80 border-2 border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-100 placeholder-transparent focus:placeholder-sky-400 dark:focus:placeholder-sky-300 focus:outline-none focus:ring-4 focus:ring-sky-400/30 focus:border-blue-500 transition-all text-lg shadow-lg ring-1 ring-sky-300/10 dark:ring-blue-900/20"
            required
          />
          <label className="absolute left-14 top-1/2 -translate-y-1/2 text-sky-400 dark:text-sky-500 pointer-events-none transition-all duration-200 peer-focus:-top-4 peer-focus:left-4 peer-focus:text-xs peer-focus:text-sky-600 dark:peer-focus:text-sky-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-14 peer-placeholder-shown:text-lg peer-placeholder-shown:text-sky-400 dark:peer-placeholder-shown:text-sky-500 font-semibold bg-transparent px-1">Email Address</label>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400 dark:text-sky-500">
            <Shield className="w-6 h-6 animate-pulse" />
          </span>
        </div>
        {/* Password input with floating label, icon, and show/hide */}
        <div className="w-full mb-8 relative group">
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder=" "
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="peer w-full px-14 py-4 rounded-2xl bg-white/80 dark:bg-sky-950/80 border-2 border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-100 placeholder-transparent focus:placeholder-sky-400 dark:focus:placeholder-sky-300 focus:outline-none focus:ring-4 focus:ring-sky-400/30 focus:border-blue-500 transition-all text-lg shadow-lg ring-1 ring-sky-300/10 dark:ring-blue-900/20 pr-16"
            required
          />
          <label className="absolute left-14 top-1/2 -translate-y-1/2 text-sky-400 dark:text-sky-500 pointer-events-none transition-all duration-200 peer-focus:-top-4 peer-focus:left-4 peer-focus:text-xs peer-focus:text-sky-600 dark:peer-focus:text-sky-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:left-14 peer-placeholder-shown:text-lg peer-placeholder-shown:text-sky-400 dark:peer-placeholder-shown:text-sky-500 font-semibold bg-transparent px-1">Password</label>
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-sky-400 hover:text-blue-600 dark:hover:text-sky-300 transition flex items-center justify-center h-8 w-8 focus:outline-none animate-float"
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff className="w-6 h-6 transition-transform duration-200 rotate-180" /> : <Eye className="w-6 h-6 transition-transform duration-200" />}
          </button>
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sky-400 dark:text-sky-500">
            <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17a5 5 0 100-10 5 5 0 000 10z" /><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
          </span>
        </div>
        {error && <div className="text-red-500 mb-4 w-full text-center font-semibold animate-pulse drop-shadow-lg">{error}</div>}
        <button
          type="submit"
          className="w-full py-4 rounded-2xl bg-gradient-to-r from-sky-400 via-blue-500 to-blue-900 text-white text-2xl font-extrabold shadow-2xl hover:scale-105 hover:shadow-blue-400/40 transition-all duration-200 mt-2 mb-2 disabled:opacity-60 animate-pulse-slow ring-2 ring-sky-300/20 dark:ring-blue-900/30 focus:ring-4 focus:ring-sky-400/40 focus:outline-none relative overflow-hidden group"
          disabled={loading}
        >
          <span className="absolute inset-0 bg-gradient-to-r from-sky-400/30 via-blue-500/20 to-blue-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
          {loading ? (
            <span className="flex items-center justify-center gap-2"><svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg> Logging in...</span>
          ) : 'Login'}
        </button>
      </form>
    </div>
  );
};

export default AdminAuth; 