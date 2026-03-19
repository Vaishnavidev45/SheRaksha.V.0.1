import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Simulate API call to our mock backend
    const endpoint = isLogin ? '/api/auth/login' : '/api/auth/register';
    
    try {
        const res = await fetch(`http://localhost:5000${endpoint}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
        });
        const data = await res.json();
        
        if (res.ok) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            navigate('/dashboard');
        } else {
            alert(data.error || "Authentication failed. For testing, please use: test@example.com / password123");
        }
    } catch (err) {
        console.warn("Backend not detected. Booting into Offline UI Preview Mode.", err);
        // Provide offline fallback credentials so the UI can be previewed seamlessly
        localStorage.setItem('token', 'offline-preview-token');
        localStorage.setItem('user', JSON.stringify({ id: 99, name: formData.name || 'Demo User', email: formData.email || 'offline@demo.com' }));
        navigate('/dashboard');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh]">
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md bg-white/80 dark:bg-darksurface/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/20 dark:border-gray-800"
      >
        <div className="flex justify-center mb-8">
            <div className="bg-gray-200 dark:bg-gray-800 p-1 rounded-full flex space-x-1">
                <button 
                  onClick={() => setIsLogin(true)}
                  className={`px-6 py-2 rounded-full font-medium transition ${isLogin ? 'bg-primary text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800'}`}
                >Login</button>
                <button 
                  onClick={() => setIsLogin(false)}
                  className={`px-6 py-2 rounded-full font-medium transition ${!isLogin ? 'bg-primary text-white shadow-md' : 'text-gray-600 dark:text-gray-400 hover:text-gray-800'}`}
                >Register</button>
            </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Full Name</label>
                <input 
                    type="text" 
                    required 
                    onChange={e => setFormData({...formData, name: e.target.value})}
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-800 dark:text-white"
                />
            </div>
          )}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email ID</label>
            <input 
                type="email" 
                required 
                onChange={e => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-800 dark:text-white"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Password</label>
            <input 
                type="password" 
                required 
                onChange={e => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-800 dark:text-white"
            />
          </div>

          <motion.button 
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit" 
            className="w-full py-4 mt-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-pink-600 transition"
          >
            {isLogin ? 'Login to Dashboard' : 'Create Account'}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Login;
