import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Activity, AlertTriangle, ShieldCheck } from 'lucide-react';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [complaintsCount, setComplaintsCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      // Force Login if not authenticated
      navigate('/login');
    } else {
      setUser(JSON.parse(userData));
      setComplaintsCount(parseInt(localStorage.getItem('complaintsCount') || '0', 10));
    }
  }, [navigate]);

  if (!user) return <div className="text-center mt-20 dark:text-gray-300">Retrieving user data...</div>;

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-10">
        <div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-800 dark:text-white">Welcome back, {user.name.split(' ')[0]}</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-2">Your safety dashboard overview.</p>
        </div>
        <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => { localStorage.removeItem('user'); localStorage.removeItem('token'); navigate('/'); }}
            className="px-6 py-2 border-2 border-primary text-primary hover:bg-primary hover:text-white rounded-full font-bold transition"
        >
            Sign Out
        </motion.button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.1} className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-3xl p-6 text-white shadow-lg flex items-center justify-between">
            <div>
                <p className="text-green-100 font-medium mb-1">Current Area Status</p>
                <h3 className="text-3xl font-black">SAFE</h3>
            </div>
            <ShieldCheck size={48} className="text-white/80" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.2} className="bg-gradient-to-br from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg flex items-center justify-between">
            <div>
                <p className="text-indigo-100 font-medium mb-1">Complaints Filed</p>
                <h3 className="text-3xl font-black">{complaintsCount}</h3>
            </div>
            <Activity size={48} className="text-white/80" />
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} delay={0.3} className="bg-gradient-to-br from-orange-500 to-red-500 rounded-3xl p-6 text-white shadow-lg flex items-center justify-between">
            <div>
                <p className="text-orange-100 font-medium mb-1">Active Alerts</p>
                <h3 className="text-3xl font-black">1</h3>
            </div>
            <AlertTriangle size={48} className="text-white/80" />
        </motion.div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-darksurface p-8 rounded-3xl shadow-md border border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Profile Details</h3>
            <div className="space-y-4">
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <User size={20} className="mr-3 text-primary" />
                    <span className="font-medium mr-2">Name:</span> {user.name}
                </div>
                <div className="flex items-center text-gray-700 dark:text-gray-300">
                    <span className="font-medium mr-2">Email:</span> {user.email}
                </div>
            </div>
        </div>

        <div className="bg-white dark:bg-darksurface p-8 rounded-3xl shadow-md border border-gray-100 dark:border-gray-800">
            <h3 className="text-xl font-bold mb-4 dark:text-white">Recent Real-Time Alerts</h3>
            <div className="p-4 bg-orange-50 border-l-4 border-orange-500 text-orange-800 dark:bg-orange-900/20 dark:border-orange-600 dark:text-orange-300 rounded-r-lg">
                <p className="font-bold flex items-center">
                    <AlertTriangle size={16} className="mr-2" /> Prototype Alert System Online
                </p>
                <p className="text-sm mt-1">Socket.IO real-time alert system is connected and standing by for broadcasts.</p>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
