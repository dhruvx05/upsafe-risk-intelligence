import React, { useState, useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, Legend, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';
import { Search, MapPin, Scale, ArrowRightLeft, AlertTriangle, Shield, TrendingUp, IndianRupee, Zap, Info, CheckCircle2, Activity } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { getStandardizedRisk } from '../utils/formulas';

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function Comparison({ cities }) {
  const [city1, setCity1] = useState('Delhi');
  const [city2, setCity2] = useState('Mumbai');

  const cityA = useMemo(() => cities.find(c => c.city === city1), [city1, cities]);
  const cityB = useMemo(() => cities.find(c => c.city === city2), [city2, cities]);

  const riskA = useMemo(() => cityA ? getStandardizedRisk(cityA) : null, [cityA]);
  const riskB = useMemo(() => cityB ? getStandardizedRisk(cityB) : null, [cityB]);

  const handleSwap = () => {
    const temp = city1;
    setCity1(city2);
    setCity2(temp);
  };

  const radarData = useMemo(() => {
    if (!cityA || !cityB) return [];
    return [
      { subject: 'Impact (I)', A: cityA.base_impact, B: cityB.base_impact, fullMark: 5 },
      { subject: 'Likelihood (L)', A: cityA.base_likelihood, B: cityB.base_likelihood, fullMark: 5 },
      { subject: 'Exposure %', A: Math.min(5, cityA.likelihood_pct / 20), B: Math.min(5, cityB.likelihood_pct / 20), fullMark: 5 },
      { subject: 'Avg AQI', A: Math.min(5, cityA.avg_aqi / 100), B: Math.min(5, cityB.avg_aqi / 100), fullMark: 5 },
    ];
  }, [cityA, cityB]);

  const topCities = useMemo(() => 
    [...cities].sort((a, b) => b.avg_aqi - a.avg_aqi).slice(0, 8)
  , [cities]);

  const saferCity = riskA && riskB ? (riskA.ale <= riskB.ale ? city1 : city2) : null;
  const aleDiff = riskA && riskB ? Math.abs(riskA.ale - riskB.ale) : 0;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-right-8 duration-700 pb-20">
      
      {/* Header with Comparison Insight */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 px-4">
        <div>
           <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Safety Showdown</h2>
           <p className="text-slate-500 font-bold text-sm flex items-center gap-2">
              <Scale className="w-4 h-4 text-primary-500" />
              CROSS-URBAN STANDARDIZED RISK ANALYTICS
           </p>
        </div>
        {saferCity && (
          <div className="bg-emerald-500/10 border border-emerald-500/20 px-6 py-4 rounded-[2rem] flex items-center gap-4 animate-in zoom-in duration-500">
             <div className="p-2 bg-emerald-500 rounded-xl text-white">
                <CheckCircle2 className="w-5 h-5" />
             </div>
             <div>
                <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Optimized Safety Choice</p>
                <p className="text-lg font-black text-slate-900 leading-tight">{saferCity} is safer by ₹{aleDiff.toLocaleString()} / Year</p>
             </div>
          </div>
        )}
      </div>

      {/* Comparison Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-6 items-center bg-white/40 backdrop-blur-md p-6 rounded-[2.5rem] shadow-xl border border-white/60">
        <div className="md:col-span-3">
          <div className="flex items-center gap-4 px-6 py-4 bg-slate-900 rounded-2xl shadow-2xl border border-white/5">
            <MapPin className="w-5 h-5 text-primary-400" />
            <select 
              value={city1}
              onChange={(e) => setCity1(e.target.value)}
              className="w-full bg-transparent border-none font-black text-white focus:ring-0 cursor-pointer text-xl tracking-tight"
            >
              {cities.map(c => <option key={c.city} value={c.city} className="text-slate-900">{c.city}</option>)}
            </select>
          </div>
        </div>
        <div className="flex justify-center">
          <button 
            onClick={handleSwap}
            className="bg-primary-500 p-5 rounded-full text-white shadow-lg hover:rotate-180 transition-all duration-700 group ring-4 ring-primary-500/20"
          >
            <ArrowRightLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="md:col-span-3">
          <div className="flex items-center gap-4 px-6 py-4 bg-slate-900 rounded-2xl shadow-2xl border border-white/5">
            <MapPin className="w-5 h-5 text-indigo-400" />
            <select 
              value={city2}
              onChange={(e) => setCity2(e.target.value)}
              className="w-full bg-transparent border-none font-black text-white focus:ring-0 cursor-pointer text-xl tracking-tight"
            >
              {cities.map(c => <option key={c.city} value={c.city} className="text-slate-900">{c.city}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {[
          { city: cityA, risk: riskA, color: 'primary', label: 'Urban Node A' },
          { city: cityB, risk: riskB, color: 'indigo', label: 'Urban Node B' }
        ].map((item, idx) => (
          <div key={idx} className={cn(
            "glass-card p-10 relative overflow-hidden group transition-all duration-500 hover:shadow-2xl",
            item.city?.city === saferCity ? "ring-4 ring-emerald-500/20 border-emerald-500/20" : "border-slate-100"
          )}>
            {item.city?.city === saferCity && (
              <div className="absolute top-6 right-6 flex items-center gap-2 bg-emerald-500 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest z-10">
                 <Shield className="w-3 h-3" /> Safer Choice
              </div>
            )}
            
            <div className="flex justify-between items-start mb-10">
              <div>
                <h3 className="text-4xl font-black text-slate-900 tracking-tighter">{item.city?.city}</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">{item.city?.state}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6 mb-10">
              <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                   <Zap className="w-3 h-3 text-amber-500" /> PRS Tier
                </p>
                <p className="text-3xl font-black text-slate-900">Code {item.risk?.prs}</p>
              </div>
              <div className="bg-slate-900 p-6 rounded-[2rem] shadow-xl">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 flex items-center gap-2">
                   <IndianRupee className="w-3 h-3 text-emerald-400" /> Financial ALE
                </p>
                <p className="text-2xl font-black text-white">₹{item.risk?.ale.toLocaleString()}</p>
              </div>
            </div>

            <div className="space-y-4">
               {[
                 { label: 'Impact Level', val: `Lvl ${item.city?.base_impact}`, pct: (item.city?.base_impact/5)*100, color: 'bg-primary-500' },
                 { label: 'Likelihood Scale', val: `${item.city?.base_likelihood}.0`, pct: (item.city?.base_likelihood/5)*100, color: 'bg-indigo-500' },
                 { label: 'Observed Exposure', val: `${item.city?.likelihood_pct}%`, pct: item.city?.likelihood_pct, color: 'bg-slate-900' },
               ].map((m, i) => (
                 <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase">
                       <span>{m.label}</span>
                       <span className="text-slate-900">{m.val}</span>
                    </div>
                    <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                       <div className={cn("h-full transition-all duration-1000", m.color)} style={{ width: `${m.pct}%` }} />
                    </div>
                 </div>
               ))}
            </div>
          </div>
        ))}
      </div>

      {/* Profile & Logic Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Radar Comparison Chart */}
        <div className="lg:col-span-8 glass-card p-10 bg-slate-900 text-white shadow-2xl border-white/5 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Scale className="w-32 h-32 text-white" />
          </div>
          <div className="flex items-center gap-4 mb-10 relative z-10">
            <div className="p-3 bg-white/10 rounded-2xl text-primary-400">
              <Activity className="w-6 h-6" />
            </div>
            <div>
               <h3 className="text-2xl font-black tracking-tighter">Comparative Risk Profile</h3>
               <p className="text-slate-400 text-[10px] font-black uppercase tracking-widest">Multi-dimensional hazard mapping</p>
            </div>
          </div>
          
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                <PolarGrid stroke="#ffffff10" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}} />
                <PolarRadiusAxis angle={30} domain={[0, 5]} tick={false} axisLine={false} />
                <Radar
                  name={city1}
                  dataKey="A"
                  stroke="#0ea5e9"
                  fill="#0ea5e9"
                  fillOpacity={0.4}
                />
                <Radar
                  name={city2}
                  dataKey="B"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.4}
                />
                <Legend iconType="circle" />
                <Tooltip 
                   contentStyle={{ backgroundColor: '#0f172a', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)' }}
                   itemStyle={{ fontWeight: 800 }}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Standardized Profile Info */}
        <div className="lg:col-span-4 glass-card p-8 bg-white border-slate-100 flex flex-col justify-between">
           <div>
              <div className="flex items-center gap-3 mb-6">
                 <Info className="w-6 h-6 text-primary-500" />
                 <h4 className="text-lg font-black text-slate-800 tracking-tighter uppercase">Standardized Profile</h4>
              </div>
              <p className="text-sm text-slate-500 leading-relaxed font-bold mb-6 italic">
                 "Comparisons use a standardized individual profile (V1-V6) as defined in UPSAFE Research benchmarks for cross-city validity."
              </p>
              <div className="space-y-4">
                 {[
                   { l: 'Proximity', v: 3.5 },
                   { l: 'Exposure', v: 4.0 },
                   { l: 'PPE Protection', v: 3.0 },
                   { l: 'Health Baseline', v: 2.5 },
                 ].map((p, i) => (
                   <div key={i} className="flex justify-between items-center py-2 border-b border-slate-50">
                      <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{p.l}</span>
                      <span className="text-sm font-black text-slate-800">{p.v}/5</span>
                   </div>
                 ))}
              </div>
           </div>
           <div className="mt-8 p-6 bg-slate-900 rounded-[2rem] text-white">
              <p className="text-[10px] font-black text-primary-400 uppercase tracking-widest mb-2">Verdict Logic</p>
              <p className="text-xs font-bold text-slate-400">Comparing annual financial loss expectancy (ALE) projected against a ₹5L asset value.</p>
           </div>
        </div>

      </div>

      {/* Leaderboard Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3 px-2">
           <TrendingUp className="w-5 h-5 text-slate-800" />
           <h3 className="text-2xl font-black text-slate-800 tracking-tighter uppercase">National Air Safety Index</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {topCities.map((city, i) => (
            <div key={city.city} className="glass-card p-6 hover:bg-slate-900 hover:text-white transition-all duration-500 group cursor-pointer border-slate-100">
              <div className="flex justify-between items-start mb-6">
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Rank #{i+1}</span>
                <div className={`w-3 h-3 rounded-full ${city.base_impact > 3 ? 'bg-rose-500' : 'bg-emerald-500'} animate-pulse shadow-lg shadow-current/50`} />
              </div>
              <p className="text-xl font-black tracking-tight mb-2">{city.city}</p>
              <div className="flex justify-between items-end">
                <div>
                   <p className="text-3xl font-black leading-none">{city.avg_aqi.toFixed(0)}</p>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1">Avg AQI Index</p>
                </div>
                <ChevronRight className="w-5 h-5 text-primary-500 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 transition-all" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Helper for ArrowRight icon
function ChevronRight(props) {
  return (
    <svg 
      {...props}
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  );
}

