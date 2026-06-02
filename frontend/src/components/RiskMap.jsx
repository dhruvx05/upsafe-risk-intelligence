import React from 'react';
import { MapContainer, TileLayer, CircleMarker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { Shield, AlertCircle, Wind, Activity, Map as MapIcon, Layers } from 'lucide-react';

// Mock coordinates for major cities
const cityCoords = {
  'Delhi': [28.6139, 77.2090],
  'Mumbai': [19.0760, 72.8777],
  'Bangalore': [12.9716, 77.5946],
  'Hyderabad': [17.3850, 78.4867],
  'Chennai': [13.0827, 80.2707],
  'Kolkata': [22.5726, 88.3639],
  'Pune': [18.5204, 73.8567],
  'Ahmedabad': [23.0225, 72.5714],
  'Jaipur': [26.9124, 75.7873],
  'Lucknow': [26.8467, 80.9462],
  'Kanpur': [26.4499, 80.3319],
  'Nagpur': [21.1458, 79.0882],
  'Visakhapatnam': [17.6868, 83.2185],
  'Surat': [21.1702, 72.8311],
  'Bhopal': [23.2599, 77.4126],
  'Patna': [25.5941, 85.1376],
  'Ludhiana': [30.9010, 75.8573],
  'Agra': [27.1767, 78.0081],
  'Nashik': [19.9975, 73.7898],
  'Vadodara': [22.3072, 73.1812],
  'Faridabad': [28.4089, 77.3178],
  'Ghaziabad': [28.6692, 77.4538],
  'Rajkot': [22.3039, 70.8022],
  'Amritsar': [31.6340, 74.8723],
  'Allahabad': [25.4358, 81.8463],
  'Guwahati': [26.1445, 91.7362],
  'Vijayawada': [16.5062, 80.6480],
  'Jodhpur': [26.2389, 73.0243],
  'Kota': [25.2138, 75.8648],
  'Chandigarh': [30.7333, 76.7794],
  'Amaravati': [16.5731, 80.3575],
  'Anantapur': [14.6819, 77.6006],
  'Kadapa': [14.4673, 78.8242],
  'Byrnihat': [26.0601, 91.8841],
  'Naharlagun': [27.1128, 93.7042]
};

const getRiskColor = (likelihood) => {
  if (likelihood <= 1) return '#10b981'; // Green
  if (likelihood <= 2) return '#f59e0b'; // Amber
  if (likelihood <= 4) return '#f97316'; // Orange
  return '#ef4444'; // Red
};

export default function RiskMap({ cities }) {
  const mapData = cities.filter(c => cityCoords[c.city]);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 px-4">
        <div>
           <h2 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">National Safety Sentinel</h2>
           <p className="text-slate-500 font-bold text-sm flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary-500" />
              GEOSPATIAL RISK DISTRIBUTION • {cities.length} NODES
           </p>
        </div>
        <div className="flex items-center gap-4 bg-white px-6 py-3 rounded-2xl border border-slate-100 shadow-xl">
           <div className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
           <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Surveillance Feed Active</span>
        </div>
      </div>

      <div className="bg-white rounded-[3rem] p-3 shadow-2xl border border-slate-100 overflow-hidden h-[700px] relative group">
        <MapContainer 
          center={[20.5937, 78.9629]} 
          zoom={5} 
          zoomControl={false}
          style={{ height: '100%', width: '100%', borderRadius: '2.5rem', background: '#f8fafc' }}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          />
          {mapData.map((city) => {
            const riskColor = getRiskColor(city.base_likelihood);
            const isHighRisk = city.base_likelihood >= 4;
            
            return (
              <CircleMarker
                key={city.city}
                center={cityCoords[city.city]}
                radius={12 + (city.base_impact * 3)}
                fillColor={riskColor}
                color={isHighRisk ? '#fff' : riskColor}
                weight={isHighRisk ? 4 : 1}
                opacity={0.8}
                fillOpacity={0.7}
                className={isHighRisk ? 'animate-pulse' : ''}
              >
                <Tooltip direction="top" offset={[0, -10]} opacity={1} className="custom-tooltip">
                  <div className="p-3 space-y-1 bg-white text-slate-900 rounded-xl border border-slate-100 shadow-2xl">
                    <p className="font-black text-sm tracking-tight">{city.city}</p>
                    <div className="flex gap-3 text-[9px] font-black uppercase text-slate-400 tracking-widest">
                      <span>I={city.base_impact}</span>
                      <span>L={city.base_likelihood}</span>
                    </div>
                  </div>
                </Tooltip>
                <Popup className="premium-popup-light">
                  <div className="p-6 space-y-4 min-w-[280px] bg-white">
                    <div className="flex justify-between items-start">
                       <div>
                          <h3 className="font-black text-xl tracking-tighter leading-none text-slate-900">{city.city}</h3>
                          <p className="text-[10px] font-bold text-slate-400 uppercase mt-1">{city.state}</p>
                       </div>
                       <div className={`p-2 rounded-lg ${city.base_impact > 3 ? 'bg-rose-50 text-rose-500' : 'bg-emerald-50 text-emerald-500'}`}>
                          <Activity className="w-4 h-4" />
                       </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                       <div className="bg-slate-50 p-3 rounded-xl">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Exposure</p>
                          <p className="text-lg font-black text-slate-900">{city.likelihood_pct}%</p>
                       </div>
                       <div className="bg-slate-50 p-3 rounded-xl">
                          <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1">Avg AQI</p>
                          <p className="text-lg font-black text-slate-900">{city.avg_aqi}</p>
                       </div>
                    </div>

                    <div className="p-4 bg-primary-50 border border-primary-100 rounded-2xl">
                       <p className="text-[10px] font-black text-primary-600 uppercase tracking-widest">Predictive Safety Tier</p>
                       <p className="text-sm font-black text-slate-900 mt-1">Tier {city.base_impact > 4 ? 'E' : city.base_impact > 3 ? 'H' : 'M'}</p>
                    </div>
                  </div>
                </Popup>
              </CircleMarker>
            );
          })}
        </MapContainer>
        
        {/* Legend */}
        <div className="absolute bottom-10 right-10 bg-white/90 backdrop-blur-2xl p-6 rounded-[2rem] shadow-2xl z-[1000] border border-slate-100 group-hover:scale-105 transition-transform duration-500">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-600 mb-4">Risk Intensity Matrix</p>
          <div className="space-y-3">
            {[
              { label: 'Extreme (E)', color: 'bg-red-500' },
              { label: 'High (H)', color: 'bg-orange-500' },
              { label: 'Medium (M)', color: 'bg-amber-500' },
              { label: 'Low (L)', color: 'bg-emerald-500' },
            ].map(item => (
              <div key={item.label} className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${item.color} shadow-lg shadow-current/30`} />
                <span className="text-xs font-black text-slate-600 tracking-tight">{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Map UI Overlay */}
        <div className="absolute top-10 left-10 z-[1000] space-y-4">
           <div className="bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-slate-100 shadow-xl">
              <div className="flex items-center gap-3">
                 <div className="p-2 bg-slate-900 rounded-lg text-white">
                    <MapIcon className="w-4 h-4" />
                 </div>
                 <span className="text-xs font-black text-slate-900 uppercase tracking-widest">Sentinel Map View</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}


