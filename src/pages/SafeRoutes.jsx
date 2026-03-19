import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import 'leaflet.heat';
import { motion } from 'framer-motion';
import { MapPin, Navigation } from 'lucide-react';

// Required for leaflet.heat in some modern bundlers
window.L = L;

const center = [28.6139, 77.2090]; // [lat, lng]

const HeatmapLayer = ({ points }) => {
  const map = useMap();
  useEffect(() => {
    if (!map || points.length === 0) return;
    
    // Clear existing heat layers
    map.eachLayer((layer) => {
      if (layer instanceof window.L.HeatLayer || layer._heat) {
        map.removeLayer(layer);
      }
    });

    const heatLayer = window.L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 17,
      gradient: { 0.4: 'yellow', 0.65: 'orange', 1: 'red' }
    }).addTo(map);

    return () => { map.removeLayer(heatLayer); };
  }, [map, points]);
  return null;
};

const SafeRoutes = () => {
  const [routeData, setRouteData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isDetecting, setIsDetecting] = useState(false);
  const [showRouteDetails, setShowRouteDetails] = useState(false);

  useEffect(() => {
    fetch('http://localhost:5000/api/routes/safe')
      .then(res => res.json())
      .then(data => {
        setRouteData(data);
        setLoading(false);
      })
      .catch(err => {
        console.warn("Backend offline. Loading offline routing metrics.", err);
        setRouteData({
            route_status: 'safe',
            message: 'The selected route is well lit and heavily populated currently.',
            safety_score: 85,
            heatmap_data: [
                { lat: 28.6139, lng: 77.2090, weight: 0.8 },
                { lat: 28.6145, lng: 77.2085, weight: 0.5 },
                { lat: 28.6150, lng: 77.2100, weight: 0.9 },
                { lat: 28.6130, lng: 77.2080, weight: 0.7 }
            ],
            safest_route: [
                [28.6304, 77.2177],
                [28.6149, 77.2090],
                [28.5823, 77.2114],
                [28.5494, 77.2001]
            ],
            fastest_route: [
                [28.6304, 77.2177],
                [28.6010, 77.2210],
                [28.5600, 77.1950],
                [28.5494, 77.2001]
            ]
        });
        setLoading(false);
      });
  }, []);

  const handleDetectRoute = () => {
    if (!routeData) return;
    setIsDetecting(true);
    setShowRouteDetails(false);
    
    // Simulate complex background calculation for effect
    setTimeout(() => {
        setIsDetecting(false);
        setShowRouteDetails(true);
    }, 1500);
  };

  const heatmapPoints = routeData?.heatmap_data?.map(pt => [pt.lat, pt.lng, pt.weight]) || [];

  return (
    <div className="max-w-7xl mx-auto py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Controls */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:w-1/3 bg-white dark:bg-darksurface p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800"
        >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Find Safe Route</h2>
            
            <div className="space-y-4 mb-8">
                <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 text-green-500" size={20} />
                    <input type="text" placeholder="Current Location" defaultValue="Connaught Place, Delhi" className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none" />
                </div>
                <div className="relative">
                    <MapPin className="absolute left-4 top-3.5 text-red-500" size={20} />
                    <input type="text" placeholder="Destination" defaultValue="Hauz Khas, Delhi" className="w-full pl-12 pr-4 py-3 rounded-xl bg-gray-50 dark:bg-[#121212] border border-gray-200 dark:border-gray-700 text-gray-800 dark:text-white focus:outline-none" />
                </div>
            </div>

            <button 
                onClick={handleDetectRoute}
                disabled={isDetecting || !routeData}
                className="w-full py-4 bg-primary text-white font-bold rounded-xl shadow-lg hover:bg-pink-600 transition flex items-center justify-center mb-8 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isDetecting ? (
                    <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3" />
                ) : (
                    <Navigation className="mr-2" size={20} />
                )}
                {isDetecting ? 'Analyzing Route Data...' : 'Detect Safest Route'}
            </button>

            {showRouteDetails && routeData && (
                <motion.div 
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    className="p-5 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800/50 rounded-2xl"
                >
                    <h3 className="text-lg font-bold text-green-800 dark:text-green-400 mb-2">Route Status: {routeData.route_status.toUpperCase()}</h3>
                    <p className="text-green-700 dark:text-green-500 text-sm mb-3">{routeData.message}</p>
                    <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-green-800 dark:text-green-400 cursor-help" title="Based on crime rates, crowd density & lighting">Safety Score</span>
                        <span className="text-2xl font-black text-green-600 dark:text-green-400">{routeData.safety_score}/100</span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-green-200 dark:border-green-800/50 flex flex-col space-y-2 pointer-events-none">
                        <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                            <div className="w-4 h-1.5 bg-[#10B981] rounded-full mr-2"></div> Safest Route
                        </div>
                        <div className="flex items-center text-sm font-medium text-gray-700 dark:text-gray-300">
                            <div className="w-4 h-0 border-t-2 border-dashed border-[#6B7280] mr-2"></div> Fastest Route (Alternative)
                        </div>
                    </div>
                </motion.div>
            )}
        </motion.div>

        {/* Map Container */}
        <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:w-2/3 shadow-2xl rounded-3xl overflow-hidden border-4 border-white dark:border-darksurface relative z-0"
            style={{ minHeight: '600px' }}
        >
            <MapContainer 
                center={center} 
                zoom={13} 
                style={{ width: '100%', height: '100%' }}
                zoomControl={false}
            >
                <TileLayer
                    attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {heatmapPoints.length > 0 && <HeatmapLayer points={heatmapPoints} />}
                
                {showRouteDetails && routeData?.safest_route && (
                    <Polyline positions={routeData.safest_route} color="#10B981" weight={6} opacity={0.8} />
                )}
                {showRouteDetails && routeData?.fastest_route && (
                    <Polyline positions={routeData.fastest_route} color="#6B7280" weight={5} opacity={0.6} dashArray="10, 10" />
                )}
            </MapContainer>
        </motion.div>

      </div>
    </div>
  );
};

export default SafeRoutes;
