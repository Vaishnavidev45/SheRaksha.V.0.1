import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Map, PhoneCall, HeartHandshake } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-6xl mt-10 md:mt-20 flex flex-col items-center text-center px-4"
      >
        <h1 className="text-5xl md:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-pink-500 mb-6 drop-shadow-sm">
          Empowering Your Safety.
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 italic mb-10 max-w-3xl">
          "Together we guard, together we grow. Her strength is the world's glow."
        </p>
        
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/login')}
          className="px-8 py-4 bg-primary text-white text-lg font-semibold rounded-full shadow-[0_0_20px_rgba(214,51,90,0.5)] hover:shadow-[0_0_30px_rgba(214,51,90,0.7)] transition-shadow"
        >
          Get Started &gt;
        </motion.button>
      </motion.section>

      {/* Features Showcase */}
      <section className="w-full max-w-6xl mt-24 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 pb-20">
        {[
          { title: "Safe Routes", icon: <Map size={40}/>, desc: "AI-driven safest route finder utilizing live heatmap and crowd data." },
          { title: "Anonymous Complaints", icon: <ShieldCheck size={40}/>, desc: "Securely report harassment to authorities without exposing your identity." },
          { title: "SOS Alerts", icon: <PhoneCall size={40}/>, desc: "Instantly trigger SMS alerts with your live location to emergency contacts." },
          { title: "Govt Schemes", icon: <HeartHandshake size={40}/>, desc: "Access verified Government and NGO schemes specifically designed for women." }
        ].map((feat, index) => (
          <motion.div 
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="bg-white dark:bg-darksurface p-8 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-800 hover:-translate-y-2 transition-transform duration-300"
          >
            <div className="text-primary mb-4">{feat.icon}</div>
            <h3 className="text-xl font-bold mb-3 dark:text-white">{feat.title}</h3>
            <p className="text-gray-500 dark:text-gray-400">{feat.desc}</p>
          </motion.div>
        ))}
      </section>
    </div>
  );
};

export default Home;
