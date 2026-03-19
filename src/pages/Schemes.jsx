import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ExternalLink } from 'lucide-react';

const Schemes = () => {
  const [schemes, setSchemes] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/schemes')
      .then(res => res.json())
      .then(data => setSchemes(data))
      .catch(err => console.error("Failed to load schemes", err));
  }, []);

  const filteredSchemes = schemes.filter(s => 
    s.title.toLowerCase().includes(search.toLowerCase()) || 
    s.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10">
        <div>
            <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-2">Government Schemes</h2>
            <p className="text-gray-500 dark:text-gray-400">Explore financial, safety, and empowerment initiatives designed for you.</p>
        </div>
        <div className="mt-6 md:mt-0 relative w-full md:w-96">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input 
                type="text" 
                placeholder="Search schemes..." 
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-full bg-white dark:bg-darksurface shadow-sm border border-gray-100 dark:border-gray-800 focus:outline-none focus:ring-2 focus:ring-primary/50 text-gray-800 dark:text-white"
            />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSchemes.map((scheme, index) => (
          <motion.div 
            key={scheme.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-darksurface p-6 rounded-3xl shadow-md border border-gray-100 dark:border-gray-800 flex flex-col h-full"
          >
            <div className="mb-4">
                <span className="text-xs font-bold px-3 py-1 bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300 rounded-full">
                    {scheme.provider}
                </span>
            </div>
            <h3 className="text-xl font-bold mb-3 text-gray-800 dark:text-white">{scheme.title}</h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 flex-grow text-sm leading-relaxed">{scheme.description}</p>
            
            <a 
                href={scheme.url} 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center text-primary font-semibold hover:text-pink-600 transition"
            >
                Learn More <ExternalLink size={16} className="ml-1" />
            </a>
          </motion.div>
        ))}
      </div>
      
      {filteredSchemes.length === 0 && (
          <div className="text-center py-20 text-gray-500 dark:text-gray-400">
              No schemes found matching your criteria.
          </div>
      )}
    </div>
  );
};

export default Schemes;
