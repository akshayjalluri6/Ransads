import React, { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db, auth } from '@/lib/firebase';
import { BarChart3, Truck, Users, Search, Download, UserPlus, UserMinus, RefreshCw } from 'lucide-react';
import { getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, deleteUser, fetchSignInMethodsForEmail } from 'firebase/auth';

const TABS = [
  { key: 'campaign', label: 'Campaign Submissions', icon: BarChart3 },
  { key: 'fleet', label: 'Fleet Submissions', icon: Truck },
  { key: 'users', label: 'User Management', icon: Users },
];

const AdminDashboard = ({ onSignOut }) => {
  const [activeTab, setActiveTab] = useState('campaign');
  const [campaigns, setCampaigns] = useState([]);
  const [fleets, setFleets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [campaignType, setCampaignType] = useState('');
  const [dateRange, setDateRange] = useState('');
  const [filteredCampaigns, setFilteredCampaigns] = useState([]);
  const [filteredFleets, setFilteredFleets] = useState([]);
  const [exporting, setExporting] = useState(false);
  const [userList, setUserList] = useState([]);
  const [newUserEmail, setNewUserEmail] = useState('');
  const [newUserPassword, setNewUserPassword] = useState('');
  const [userError, setUserError] = useState('');
  const [userSuccess, setUserSuccess] = useState('');
  const [userLoading, setUserLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const unsubCampaigns = onSnapshot(
      query(collection(db, 'campaign_submissions'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setCampaigns(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      }
    );
    const unsubFleets = onSnapshot(
      query(collection(db, 'fleet_submissions'), orderBy('timestamp', 'desc')),
      (snapshot) => {
        setFleets(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
        setLoading(false);
      }
    );
    fetchAdminUsers();
    return () => {
      unsubCampaigns();
      unsubFleets();
    };
  }, []);

  useEffect(() => {
    // Filtering logic for campaigns
    let filtered = campaigns.filter(c =>
      (!search || c.name?.toLowerCase().includes(search.toLowerCase()) || c.email?.toLowerCase().includes(search.toLowerCase()) || c.company?.toLowerCase().includes(search.toLowerCase())) &&
      (!campaignType || c.campaignType === campaignType)
    );
    if (dateRange) {
      const now = new Date();
      filtered = filtered.filter(c => {
        if (!c.timestamp?.toDate) return false;
        const date = c.timestamp.toDate();
        if (dateRange === '7d') return (now - date) / (1000 * 60 * 60 * 24) <= 7;
        if (dateRange === '30d') return (now - date) / (1000 * 60 * 60 * 24) <= 30;
        return true;
      });
    }
    setFilteredCampaigns(filtered);
  }, [campaigns, search, campaignType, dateRange]);

  useEffect(() => {
    // Filtering logic for fleets
    let filtered = fleets.filter(f =>
      (!search || f.ownerName?.toLowerCase().includes(search.toLowerCase()) || f.email?.toLowerCase().includes(search.toLowerCase()) || f.company?.toLowerCase().includes(search.toLowerCase()))
    );
    setFilteredFleets(filtered);
  }, [fleets, search]);

  async function fetchAdminUsers() {
    // This is a placeholder. In a real app, you would fetch admin users from a Firestore collection or use Firebase Admin SDK.
    // For demo, show the currently logged-in user only.
    setUserList([{ email: auth.currentUser?.email }]);
  }

  function exportToCSV(data, type) {
    setExporting(true);
    const headers = type === 'campaign'
      ? ['Name', 'Email', 'Company', 'Phone', 'Type', 'Budget', 'Message', 'Date']
      : ['Owner', 'Email', 'Phone', 'Company', 'Trucks', 'Type', 'Routes', 'Experience', 'Availability', 'Date'];
    const rows = data.map(row =>
      type === 'campaign'
        ? [row.name, row.email, row.company, row.phone, row.campaignType, row.budget, row.message, row.timestamp?.toDate ? row.timestamp.toDate().toLocaleString() : '']
        : [row.ownerName, row.email, row.phone, row.company, row.truckCount, row.truckType, row.routes, row.experience, row.availability, row.timestamp?.toDate ? row.timestamp.toDate().toLocaleString() : '']
    );
    const csvContent = [headers, ...rows].map(e => e.map(x => '"' + (x || '') + '"').join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${type}_submissions.csv`;
    a.click();
    setTimeout(() => {
      setExporting(false);
      URL.revokeObjectURL(url);
    }, 1000);
  }

  async function handleAddUser(e) {
    e.preventDefault();
    setUserLoading(true);
    setUserError('');
    setUserSuccess('');
    try {
      await createUserWithEmailAndPassword(auth, newUserEmail, newUserPassword);
      setUserSuccess('User added successfully!');
      setNewUserEmail('');
      setNewUserPassword('');
      fetchAdminUsers();
    } catch (err) {
      setUserError('Failed to add user: ' + err.message);
    } finally {
      setUserLoading(false);
    }
  }

  async function handleResetPassword(email) {
    setUserLoading(true);
    setUserError('');
    setUserSuccess('');
    try {
      await sendPasswordResetEmail(auth, email);
      setUserSuccess('Password reset email sent!');
    } catch (err) {
      setUserError('Failed to send reset email: ' + err.message);
    } finally {
      setUserLoading(false);
    }
  }

  // User removal is not implemented for safety (requires Admin SDK)

  return (
    <div style={{height: '100vh'}} className="min-h-screen w-full bg-gradient-to-br from-sky-950 via-blue-950 to-black dark:from-black dark:via-blue-950 dark:to-sky-900 p-0 font-sans relative overflow-hidden flex flex-col">
      {/* Subtle animated background blobs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-sky-400/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-900/30 rounded-full blur-2xl animate-pulse-slower" />
      </div>
      {/* Sign Out Button (fixed, higher z-index) */}
      <div className="fixed top-6 right-6 z-50">
        <button onClick={onSignOut} className="flex items-center gap-2 px-5 py-3 rounded-full bg-gradient-to-r from-red-500 to-red-700 text-white font-bold shadow-lg hover:scale-105 hover:shadow-red-400/40 transition-all duration-200 text-base">
          Sign Out
        </button>
      </div>
      <div className="relative z-10 flex-1 flex flex-col w-full h-full p-0">
        <div className="glass-effect rounded-none shadow-none w-full h-full border-0 backdrop-blur-xl flex flex-col p-0">
          <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4 w-full px-8 pt-12">
            <div className="flex items-center gap-4">
              <Users className="w-12 h-12 text-sky-400 drop-shadow-lg" />
              <h1 className="text-4xl font-extrabold drop-shadow-lg tracking-tight text-white">Admin Dashboard</h1>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              {TABS.map(tab => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-6 py-2 rounded-full font-semibold text-lg shadow transition-all border-2 border-transparent hover:border-sky-400 focus-visible:ring-2 focus-visible:ring-sky-400 focus:outline-none ${activeTab === tab.key ? 'bg-gradient-to-r from-sky-400 to-blue-500 text-white shadow-lg scale-105' : 'bg-sky-100 dark:bg-sky-900 text-blue-900 dark:text-sky-200'}`}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
          {/* Main tab content with scroll and top margin to avoid sign out button */}
          <div className="flex-1 w-full overflow-y-auto px-8 pb-12 mt-8" style={{maxHeight: 'calc(100vh - 8rem)'}}>
            <div>
              {activeTab === 'users' ? (
                <UserManagementTab
                  userList={userList}
                  newUserEmail={newUserEmail}
                  setNewUserEmail={setNewUserEmail}
                  newUserPassword={newUserPassword}
                  setNewUserPassword={setNewUserPassword}
                  handleAddUser={handleAddUser}
                  userError={userError}
                  userSuccess={userSuccess}
                  userLoading={userLoading}
                  handleResetPassword={handleResetPassword}
                />
              ) : loading ? (
                <div className="flex flex-col items-center justify-center py-24 animate-pulse">
                  <svg className="w-16 h-16 text-sky-400 mb-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path></svg>
                  <span className="text-xl text-sky-400 font-bold">Loading data...</span>
                </div>
              ) : activeTab === 'campaign' ? (
                <div className="overflow-y-auto" style={{maxHeight: 'calc(100vh - 16rem)'}}>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                    <div className="relative w-full md:w-1/3">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-400" />
                      <input
                        type="text"
                        placeholder="Search by name, email, or company..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/80 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-100 placeholder:text-sky-400 dark:placeholder:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-blue-500 transition-all text-base shadow-sm"
                      />
                    </div>
                    <select
                      value={campaignType}
                      onChange={e => setCampaignType(e.target.value)}
                      className="w-full md:w-40 px-4 py-2 rounded-xl bg-white/80 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-blue-500 transition-all text-base shadow-sm"
                    >
                      <option value="">All Types</option>
                      <option value="local">Local</option>
                      <option value="regional">Regional</option>
                      <option value="national">National</option>
                      <option value="custom">Custom</option>
                    </select>
                    <select
                      value={dateRange}
                      onChange={e => setDateRange(e.target.value)}
                      className="w-full md:w-40 px-4 py-2 rounded-xl bg-white/80 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-100 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-blue-500 transition-all text-base shadow-sm"
                    >
                      <option value="">All Dates</option>
                      <option value="7d">Last 7 days</option>
                      <option value="30d">Last 30 days</option>
                    </select>
                    <button
                      onClick={() => exportToCSV(filteredCampaigns, 'campaign')}
                      className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-blue-400/40 transition-all duration-200 disabled:opacity-60"
                      disabled={exporting}
                    >
                      <Download className="w-5 h-5" /> Export CSV
                    </button>
                  </div>
                  <SubmissionsTable data={filteredCampaigns} type="campaign" />
                </div>
              ) : (
                <div className="overflow-y-auto" style={{maxHeight: 'calc(100vh - 16rem)'}}>
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
                    <div className="relative w-full md:w-1/3">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-sky-400" />
                      <input
                        type="text"
                        placeholder="Search by owner, email, or company..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 rounded-xl bg-white/80 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-100 placeholder:text-sky-400 dark:placeholder:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-blue-500 transition-all text-base shadow-sm"
                      />
                    </div>
                    <button
                      onClick={() => exportToCSV(filteredFleets, 'fleet')}
                      className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-blue-400/40 transition-all duration-200 disabled:opacity-60"
                      disabled={exporting}
                    >
                      <Download className="w-5 h-5" /> Export CSV
                    </button>
                  </div>
                  <SubmissionsTable data={filteredFleets} type="fleet" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function SubmissionsTable({ data, type }) {
  if (!data.length) {
    return (
      <div className="flex flex-col items-center justify-center py-24">
        <svg className="w-16 h-16 text-sky-400 mb-4 animate-bounce" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path fill="currentColor" d="M8 12h8M12 8v8" /></svg>
        <span className="text-xl text-sky-400 font-bold">No submissions found.</span>
      </div>
    );
  }
  if (type === 'campaign') {
    return (
      <div className="overflow-x-auto rounded-2xl shadow-xl bg-white/80 dark:bg-sky-950/80">
        <table className="min-w-full text-left rounded-xl overflow-hidden">
          <thead>
            <tr className="bg-gradient-to-r from-sky-200 to-blue-200 dark:from-sky-900 dark:to-blue-950 text-blue-900 dark:text-sky-200 text-lg">
              <th className="p-4 font-bold">Name</th>
              <th className="p-4 font-bold">Email</th>
              <th className="p-4 font-bold">Company</th>
              <th className="p-4 font-bold">Phone</th>
              <th className="p-4 font-bold">Type</th>
              <th className="p-4 font-bold">Budget</th>
              <th className="p-4 font-bold">Message</th>
              <th className="p-4 font-bold">Date</th>
            </tr>
          </thead>
          <tbody>
            {data.map((lead) => (
              <tr key={lead.id} className="border-b border-sky-100 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-900/60 transition-all group">
                <td className="p-4 font-semibold group-hover:text-blue-700 dark:group-hover:text-sky-300">{lead.name}</td>
                <td className="p-4">{lead.email}</td>
                <td className="p-4">{lead.company}</td>
                <td className="p-4">{lead.phone}</td>
                <td className="p-4">{lead.campaignType}</td>
                <td className="p-4">{lead.budget}</td>
                <td className="p-4 max-w-xs truncate" title={lead.message}>{lead.message}</td>
                <td className="p-4 text-xs text-sky-500 dark:text-sky-300">{lead.timestamp?.toDate ? lead.timestamp.toDate().toLocaleString() : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  // Fleet submissions
  return (
    <div className="overflow-x-auto rounded-2xl shadow-xl bg-white/80 dark:bg-sky-950/80">
      <table className="min-w-full text-left rounded-xl overflow-hidden">
        <thead>
          <tr className="bg-gradient-to-r from-sky-200 to-blue-200 dark:from-sky-900 dark:to-blue-950 text-blue-900 dark:text-sky-200 text-lg">
            <th className="p-4 font-bold">Owner</th>
            <th className="p-4 font-bold">Email</th>
            <th className="p-4 font-bold">Phone</th>
            <th className="p-4 font-bold">Company</th>
            <th className="p-4 font-bold">Trucks</th>
            <th className="p-4 font-bold">Type</th>
            <th className="p-4 font-bold">Routes</th>
            <th className="p-4 font-bold">Experience</th>
            <th className="p-4 font-bold">Availability</th>
            <th className="p-4 font-bold">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.map((fleet) => (
            <tr key={fleet.id} className="border-b border-sky-100 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-900/60 transition-all group">
              <td className="p-4 font-semibold group-hover:text-blue-700 dark:group-hover:text-sky-300">{fleet.ownerName}</td>
              <td className="p-4">{fleet.email}</td>
              <td className="p-4">{fleet.phone}</td>
              <td className="p-4">{fleet.company}</td>
              <td className="p-4">{fleet.truckCount}</td>
              <td className="p-4">{fleet.truckType}</td>
              <td className="p-4 max-w-xs truncate" title={fleet.routes}>{fleet.routes}</td>
              <td className="p-4">{fleet.experience}</td>
              <td className="p-4">{fleet.availability}</td>
              <td className="p-4 text-xs text-sky-500 dark:text-sky-300">{fleet.timestamp?.toDate ? fleet.timestamp.toDate().toLocaleString() : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function UserManagementTab({ userList, newUserEmail, setNewUserEmail, newUserPassword, setNewUserPassword, handleAddUser, userError, userSuccess, userLoading, handleResetPassword }) {
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 gradient-text text-center">Admin Users</h2>
      <form onSubmit={handleAddUser} className="flex flex-col md:flex-row gap-4 mb-8 items-end">
        <input
          type="email"
          placeholder="New admin email"
          value={newUserEmail}
          onChange={e => setNewUserEmail(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded-xl bg-white/80 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-100 placeholder:text-sky-400 dark:placeholder:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-blue-500 transition-all text-base shadow-sm"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={newUserPassword}
          onChange={e => setNewUserPassword(e.target.value)}
          className="w-full md:w-1/2 px-4 py-2 rounded-xl bg-white/80 dark:bg-sky-950/80 border border-sky-200 dark:border-sky-800 text-sky-900 dark:text-sky-100 placeholder:text-sky-400 dark:placeholder:text-sky-300 focus:outline-none focus:ring-2 focus:ring-sky-400 focus:border-blue-500 transition-all text-base shadow-sm"
          required
        />
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-blue-500 text-white font-bold shadow-lg hover:scale-105 hover:shadow-blue-400/40 transition-all duration-200 disabled:opacity-60"
          disabled={userLoading}
        >
          <UserPlus className="w-5 h-5" /> Add User
        </button>
      </form>
      {userError && <div className="text-red-500 mb-2 text-center font-semibold animate-pulse">{userError}</div>}
      {userSuccess && <div className="text-green-500 mb-2 text-center font-semibold animate-pulse">{userSuccess}</div>}
      <div className="bg-white/80 dark:bg-sky-950/80 rounded-2xl shadow-xl p-6">
        <table className="min-w-full text-left">
          <thead>
            <tr className="bg-gradient-to-r from-sky-200 to-blue-200 dark:from-sky-900 dark:to-blue-950 text-blue-900 dark:text-sky-200 text-lg">
              <th className="p-4 font-bold">Email</th>
              <th className="p-4 font-bold">Actions</th>
            </tr>
          </thead>
          <tbody>
            {userList.map((user, idx) => (
              <tr key={user.email || idx} className="border-b border-sky-100 dark:border-sky-800 hover:bg-sky-50 dark:hover:bg-sky-900/60 transition-all group">
                <td className="p-4 font-semibold group-hover:text-blue-700 dark:group-hover:text-sky-300">{user.email}</td>
                <td className="p-4">
                  <button
                    onClick={() => handleResetPassword(user.email)}
                    className="flex items-center gap-1 px-4 py-1 rounded-lg bg-gradient-to-r from-sky-400 to-blue-500 text-white font-bold shadow hover:scale-105 hover:shadow-blue-400/40 transition-all duration-200 text-sm"
                  >
                    <RefreshCw className="w-4 h-4" /> Reset Password
                  </button>
                  {/* <button
                    onClick={() => handleRemoveUser(user.email)}
                    className="flex items-center gap-1 px-4 py-1 rounded-lg bg-gradient-to-r from-red-400 to-red-600 text-white font-bold shadow hover:scale-105 hover:shadow-red-400/40 transition-all duration-200 text-sm ml-2"
                  >
                    <UserMinus className="w-4 h-4" /> Remove
                  </button> */}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminDashboard; 