import React, { useEffect, useState, useMemo } from 'react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { getTrends } from '../utils/api';
import { Calendar, AlertCircle, Info, Zap, TrendingUp, TrendingDown, Activity, Wind } from 'lucide-react';

export default function Trends({ city }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (city) {
      fetchTrends();
    }
  }, [city]);

  const fetchTrends = async () => {
    setLoading(true);
    try {
      const res = await getTrends(city);
      const chartData = res.data.map(item => ({
        date: new Date(item.Date).toLocaleDateString('en-IN', { month: 'short', year: '2-digit' }),
        fullDate: new Date(item.Date),
        aqi: item.AQI
      }));
      setData(chartData);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const stats = useMemo(() => {
    if (!data.length) return null;
    const vals = data.map(d => d.aqi);
    const avg = vals.reduce((a, b) => a + b, 0) / vals.length;
    const max = Math.max(...vals);
    const min = Math.min(...vals);
    // Volatility (Standard Deviation)
    const std = Math.sqrt(vals.map(x => Math.pow(x - avg, 2)).reduce((a, b) => a + b, 0) / vals.length);
    
    // Find worst/best months
    const monthStats = {};
    data.forEach(d => {
      const m = d.fullDate.toLocaleString('en-IN', { month: 'long' });
      if (!monthStats[m]) monthStats[m] = { sum: 0, count: 0 };
      monthStats[m].sum += d.aqi;
      monthStats[m].count++;
    });
    
    const monthlyAvgs = Object.entries(monthStats).map(([month, s]) => ({ month, avg: s.sum / s.count }));
    const worst = monthlyAvgs.sort((a, b) => b.avg - a.avg)[0];
    const best = monthlyAvgs.sort((a, b) => a.avg - b.avg)[0];

    return { avg, max, min, std, worst, best };
  }, [data]);

  if (loading) return <div className="h-64 flex items-center justify-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div></div>;

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700">
      
      {/* Statistical Pulse Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Average AQI', val: stats?.avg.toFixed(1), icon: Activity, color: 'text-primary-500', desc: 'Sustained exposure' },
           { label: 'Peak Severity', val: stats?.max.toFixed(0), icon: Zap, color: 'text-rose-500', desc: 'Maximum recorded' },
           { label: 'Cleanest Pulse', val: stats?.min.toFixed(0), icon: Wind, color: 'text-emerald-500', desc: 'Optimal conditions' },
           { label: 'Volatility Index', val: stats?.std.toFixed(1), icon: TrendingUp, color: 'text-indigo-500', desc: 'Statistical variance' },
         ].map((s, i) => (
           <div key={i} className="glass-card p-6 bg-white/40 backdrop-blur-md border-white/60 hover:bg-white transition-all duration-500">
              <div className="flex justify-between items-start mb-4">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
                 <s.icon className={`w-5 h-5 ${s.color}`} />
              </div>
              <p className="text-4xl font-black text-slate-900 mb-1">{s.val}</p>
              <p className="text-[10px] font-bold text-slate-400 uppercase">{s.desc}</p>
           </div>
         ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card p-10 bg-slate-900 text-white border-white/5 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
             <Calendar className="w-32 h-32 text-white" />
          </div>
          
          <div className="flex justify-between items-center mb-10 relative z-10">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/10 rounded-2xl text-primary-400">
                <Activity className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-2xl font-black tracking-tighter">Atmospheric Trajectory</h3>
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">Historical AQI Pulse - {city}</p>
              </div>
            </div>
          </div>
          
          <div className="h-[450px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorAqi" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis 
                  dataKey="date" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}}
                  interval={Math.floor(data.length / 8)}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#64748b', fontSize: 10, fontWeight: 700}}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#0f172a', 
                    borderRadius: '1.5rem', 
                    border: '1px solid rgba(255,255,255,0.1)',
                    boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.3)',
                    padding: '1.5rem'
                  }}
                  itemStyle={{ fontWeight: 900, fontSize: '1.25rem' }}
                  labelStyle={{ color: '#94a3b8', fontWeight: 700, marginBottom: '0.5rem' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="aqi" 
                  stroke="#0ea5e9" 
                  strokeWidth={4}
                  fillOpacity={1} 
                  fill="url(#colorAqi)" 
                  animationDuration={2000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Insight Cards */}
        <div className="space-y-6">
           <div className="glass-card p-8 bg-gradient-to-br from-rose-500 to-rose-700 text-white border-none shadow-2xl relative overflow-hidden group">
              <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
                 <AlertCircle className="w-32 h-32" />
              </div>
              <div className="flex items-center gap-3 mb-6">
                 <Zap className="w-8 h-8 text-white animate-pulse" />
                 <h4 className="text-xl font-black tracking-tighter uppercase">Risk Seasonality</h4>
              </div>
              <p className="text-md text-white/80 leading-relaxed font-bold mb-6">
                 {city} is most vulnerable during <span className="text-white underline decoration-rose-300 decoration-2 underline-offset-4">{stats?.worst.month}</span>, where average AQI reaches <span className="text-white text-lg">{stats?.worst.avg.toFixed(0)}</span>.
              </p>
              <div className="p-4 bg-black/20 rounded-2xl border border-white/10">
                 <p className="text-[10px] font-black uppercase tracking-widest text-rose-200">Mitigation Strategy</p>
                 <p className="text-xs font-bold mt-2">Plan for maximum PPE stocks during these peak hazard cycles.</p>
              </div>
           </div>

           <div className="glass-card p-8 hover:bg-white transition-all duration-500">
              <div className="flex items-center gap-3 mb-8">
                 <Info className="w-6 h-6 text-primary-500" />
                 <h4 className="text-lg font-black text-slate-800 uppercase tracking-tighter">Safety Milestones</h4>
              </div>
              <div className="space-y-6">
                 <div className="flex justify-between items-center group">
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Optimal Breath</p>
                       <p className="text-md font-black text-slate-800">{stats?.best.month}</p>
                    </div>
                    <div className="px-3 py-1 bg-emerald-100 text-emerald-600 rounded-lg text-[10px] font-black">
                       LVL {stats?.best.avg.toFixed(0)}
                    </div>
                 </div>
                 <div className="flex justify-between items-center group">
                    <div>
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Worst Breath</p>
                       <p className="text-md font-black text-slate-800">{stats?.worst.month}</p>
                    </div>
                    <div className="px-3 py-1 bg-rose-100 text-rose-600 rounded-lg text-[10px] font-black">
                       LVL {stats?.worst.avg.toFixed(0)}
                    </div>
                 </div>
                 <div className="pt-4 border-t border-slate-100">
                    <div className="flex items-center gap-2 text-primary-600 font-black text-xs uppercase tracking-widest">
                       <TrendingDown className="w-4 h-4" />
                       Analysis Complete
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}

