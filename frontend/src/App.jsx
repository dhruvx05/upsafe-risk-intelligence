import React, { useState, useEffect } from 'react';
import { 
  ShieldCheck, 
  Map as MapIcon, 
  BarChart3, 
  Settings, 
  Info, 
  Activity, 
  User, 
  RefreshCcw,
  X,
  Zap,
  Plus
} from 'lucide-react';
import { getCities, analyzeRisk } from './utils/api';
import RiskEngine from './components/RiskEngine';
import Dashboard from './components/Dashboard';
import PersonalInputs from './components/PersonalInputs';
import RiskMap from './components/RiskMap';
import Trends from './components/Trends';
import Comparison from './components/Comparison';
import Methodology from './components/Methodology';
import './utils/leaflet-fix';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('Delhi');
  const [riskData, setRiskData] = useState(null);
  const [userInputs, setUserInputs] = useState({
    exposure: 3,
    proximity: 3,
    mask_usage: 3,
    health: 3,
    awareness: 3,
    infrastructure: 3
  });
  const [isAdvanced, setIsAdvanced] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  useEffect(() => {
    fetchCities();
  }, []);

  useEffect(() => {
    if (selectedCity) {
      handleAnalyze();
    }
  }, [selectedCity, userInputs]);

  const fetchCities = async () => {
    try {
      const res = await getCities();
      setCities(res.data);
    } catch (err) {
      console.error("Failed to fetch cities", err);
    }
  };

  const handleAnalyze = async () => {
    try {
      const res = await analyzeRisk({ city: selectedCity, ...userInputs });
      setRiskData(res.data);
    } catch (err) {
      console.error("Analysis failed", err);
    }
  };

  const tabs = [
    { id: 'home', label: 'Safety Today', icon: ShieldCheck },
    { id: 'inputs', label: 'Risk Engine', icon: Activity },
    { id: 'map', label: 'Risk Map', icon: MapIcon },
    { id: 'trends', label: 'Pollution Trends', icon: BarChart3 },
    { id: 'comparison', label: 'City Comparison', icon: RefreshCcw },
    { id: 'methodology', label: 'Scientific Logic', icon: Info },
  ];

  return (
    <div className="flex h-screen bg-slate-50">
      {/* Sidebar logic ... */}
      <aside className={cn(
        "bg-slate-900/95 backdrop-blur-2xl text-white transition-all duration-500 flex flex-col z-50 border-r border-white/5",
        isSidebarOpen ? "w-72" : "w-24"
      )}>
        <div className="p-8 flex items-center gap-4">
          <div className="bg-gradient-to-br from-primary-400 to-primary-600 p-3 rounded-2xl shadow-lg shadow-primary-500/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          {isSidebarOpen && (
            <div className="animate-in fade-in slide-in-from-left-4 duration-500">
              <span className="font-black text-2xl tracking-tighter">UPSAFE</span>
              <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest leading-none">Risk Intelligence</p>
            </div>
          )}
        </div>

        <nav className="flex-1 px-4 py-8 space-y-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "w-full flex items-center gap-4 px-5 py-4 rounded-2xl transition-all relative group overflow-hidden",
                activeTab === tab.id 
                  ? "bg-white text-slate-900 shadow-[0_8px_20px_-4px_rgba(255,255,255,0.2)]" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              )}
            >
              <tab.icon className={cn("w-6 h-6 shrink-0 transition-transform duration-300", activeTab === tab.id && "scale-110")} />
              {isSidebarOpen && <span className="font-bold tracking-tight">{tab.label}</span>}
              {activeTab === tab.id && (
                <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-primary-500 rounded-l-full" />
              )}
            </button>
          ))}
        </nav>

        <div className="p-6 space-y-6 border-t border-white/5">
          {isSidebarOpen && (
            <div className="bg-gradient-to-br from-rose-500/20 to-rose-600/10 border border-rose-500/20 p-6 rounded-[2rem] space-y-4 animate-in zoom-in duration-500">
              <div className="flex items-center gap-3 text-rose-400">
                <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping" />
                <span className="text-[10px] font-black uppercase tracking-widest">Medical Emergency</span>
              </div>
              <div className="space-y-1">
                <p className="text-sm font-black text-white">Need Urgent Help?</p>
                <p className="text-[10px] text-slate-400 font-bold leading-tight">Instant access to medical support teams.</p>
              </div>
              <a href="tel:102" className="flex items-center justify-between bg-rose-500 hover:bg-rose-600 p-3 rounded-xl text-white transition-all group shadow-lg shadow-rose-500/20">
                <span className="text-sm font-black">Call 102</span>
                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform" />
              </a>
            </div>
          )}
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative scroll-smooth">
        <header className="sticky top-0 bg-white/40 backdrop-blur-2xl border-b border-white/40 px-10 py-6 flex justify-between items-center z-40">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-black text-slate-900 tracking-tighter">
              {tabs.find(t => t.id === activeTab)?.label}
            </h1>
            <div className="h-6 w-px bg-slate-200" />
            <select 
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-white/50 backdrop-blur-md border border-white/50 rounded-xl px-4 py-2 text-sm font-bold text-slate-700 shadow-sm focus:ring-2 focus:ring-primary-500 outline-none transition-all"
            >
              {cities.map(c => (
                <option key={c.city} value={c.city}>{c.city}</option>
              ))}
            </select>
          </div>
          
          <div className="flex items-center gap-4">
             {/* Removed Advanced Mode Badge */}
          </div>
        </header>

        <div key={activeTab} className="p-10 max-w-7xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
          {activeTab === 'home' && <Dashboard data={riskData} isAdvanced={isAdvanced} />}
          {activeTab === 'inputs' && (
            <div className="space-y-12">
               <RiskEngine data={riskData} userInputs={userInputs} />
               <PersonalInputs inputs={userInputs} setInputs={setUserInputs} isAdvanced={isAdvanced} riskData={riskData} />
            </div>
          )}
          {activeTab === 'map' && <RiskMap cities={cities} />}
          {activeTab === 'trends' && <Trends city={selectedCity} />}
          {activeTab === 'comparison' && <Comparison cities={cities} />}
          {activeTab === 'methodology' && <Methodology />}
        </div>


        {/* Explanation Modal Removed */}
      </main>
    </div>
  );
}
