import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, X } from 'lucide-react';

const LiveAlerts = () => {
    const [alerts, setAlerts] = useState([]);

    useEffect(() => {
        const socket = io('http://localhost:5000');

        socket.on('unsafe_zone_alert', (data) => {
            const newAlert = { id: Date.now(), ...data };
            setAlerts(prev => [newAlert, ...prev].slice(0, 3)); // Keep only latest 3
            
            // Auto dismiss after 8 seconds
            setTimeout(() => {
                removeAlert(newAlert.id);
            }, 8000);
        });

        return () => {
            socket.disconnect();
        };
    }, []);

    const removeAlert = (id) => {
        setAlerts(prev => prev.filter(alert => alert.id !== id));
    };

    return (
        <div className="fixed top-24 right-4 z-[60] flex flex-col items-end space-y-3 pointer-events-none">
            <AnimatePresence>
                {alerts.map(alert => (
                    <motion.div
                        key={alert.id}
                        initial={{ opacity: 0, x: 50, scale: 0.9 }}
                        animate={{ opacity: 1, x: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8, x: 20 }}
                        className="pointer-events-auto bg-white/95 dark:bg-gray-800/95 backdrop-blur-md shadow-2xl border-l-4 border-orange-500 rounded-lg p-4 w-80 md:w-96 flex relative text-gray-800 dark:text-gray-100"
                    >
                        <div className="text-orange-500 mr-3 mt-0.5">
                            <AlertCircle size={24} />
                        </div>
                        <div className="flex-1 pr-6">
                            <h4 className="font-bold text-sm text-orange-600 dark:text-orange-400 mb-1">LIVE ALERT</h4>
                            <p className="text-sm">{alert.message}</p>
                            <span className="text-[10px] text-gray-400 mt-2 block">
                                {new Date(alert.timestamp).toLocaleTimeString()}
                            </span>
                        </div>
                        <button 
                            onClick={() => removeAlert(alert.id)}
                            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                        >
                            <X size={16} />
                        </button>
                    </motion.div>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default LiveAlerts;
