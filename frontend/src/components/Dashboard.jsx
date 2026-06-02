import React from 'react';
import { 
  ShieldAlert, 
  TrendingUp, 
  Wind, 
  Activity, 
  ShieldCheck, 
  AlertTriangle, 
  Flame, 
  Stethoscope,
  Info,
  IndianRupee,
  Shield,
  Zap,
  ArrowRight,
  Heart,
  BookOpen
} from 'lucide-react';

const riskTheme = {
  Extreme: {
    bg: 'from-red-500/20 to-slate-900/40',
    border: 'border-red-500/30',
    text: 'text-red-500',
    accent: 'bg-red-500',
    glow: 'shadow-red-500/20',
    icon: ShieldAlert,
    label: 'Critical Hazard',
    narrative: 'The atmosphere is currently hostile to human biology. Your immediate health safety is compromised.'
  },
  High: {
    bg: 'from-orange-500/20 to-rose-600/10',
    border: 'border-orange-500/30',
    text: 'text-orange-500',
    accent: 'bg-orange-500',
    glow: 'shadow-orange-500/20',
    icon: Flame,
    label: 'Severe Exposure',
    narrative: 'High pollutant concentrations detected. Significant physiological strain is likely without protection.'
  },
  Medium: {
    bg: 'from-amber-400/20 to-orange-500/5',
    border: 'border-amber-500/30',
    text: 'text-amber-500',
    accent: 'bg-amber-500',
    glow: 'shadow-amber-500/20',
    icon: Activity,
    label: 'Moderate Risk',
    narrative: 'Sensitive individuals may experience discomfort. General caution is advised for outdoor activity.'
  },
  Low: {
    bg: 'from-emerald-500/20 to-teal-600/5',
    border: 'border-emerald-500/30',
    text: 'text-emerald-500',
    accent: 'bg-emerald-500',
    glow: 'shadow-emerald-500/20',
    icon: ShieldCheck,
    label: 'Safe Pulse',
    narrative: 'Air quality is within acceptable safety parameters. Normal respiratory function supported.'
  }
};

// Risk Code Definitions (static fallback, also comes from API)
const riskCodeDefinitions = [
  {
    code: 'E',
    label: 'Extreme',
    color: 'bg-red-500',
    textColor: 'text-red-500',
    borderColor: 'border-red-500/30',
    bgLight: 'bg-red-50',
    description: 'Critical atmospheric hazard. Air quality poses an immediate and severe threat to human health. Prolonged exposure can cause acute respiratory failure, cardiovascular emergencies, and neurological impairment.',
    action: 'Immediate evacuation to sealed, filtered indoor space. Industrial-grade N95/FFP3 respirators mandatory.',
    ef: '90%',
    aro: '95%'
  },
  {
    code: 'H',
    label: 'High',
    color: 'bg-orange-500',
    textColor: 'text-orange-500',
    borderColor: 'border-orange-500/30',
    bgLight: 'bg-orange-50',
    description: 'Severe pollution exposure detected. Significant physiological strain likely without adequate protection. Vulnerable populations face compounded risk.',
    action: 'Restrict outdoor movement. Deploy high-grade air filtration indoors. Monitor for respiratory distress.',
    ef: '65%',
    aro: '70%'
  },
  {
    code: 'M',
    label: 'Medium',
    color: 'bg-amber-500',
    textColor: 'text-amber-500',
    borderColor: 'border-amber-500/30',
    bgLight: 'bg-amber-50',
    description: 'Moderate pollutant concentrations present. Sensitive individuals may experience eye irritation, coughing, or mild breathlessness during prolonged outdoor activity.',
    action: 'Limit prolonged outdoor exertion. Use surgical masks in high-traffic zones. Seal indoor spaces during peak AQI.',
    ef: '35%',
    aro: '40%'
  },
  {
    code: 'L',
    label: 'Low',
    color: 'bg-emerald-500',
    textColor: 'text-emerald-500',
    borderColor: 'border-emerald-500/30',
    bgLight: 'bg-emerald-50',
    description: 'Air quality within acceptable safety parameters. Normal respiratory function fully supported. No significant health impact expected for general population.',
    action: 'Continue normal activities with standard precautions. Maintain routine health surveillance.',
    ef: '10%',
    aro: '15%'
  }
];

export default function Dashboard({ data }) {
  if (!data) return (
    <div className="flex items-center justify-center h-64">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
    </div>
  );

  const { risk_level, prs_code, cvs, impact, likelihood, sle, ale, base_metrics, advice, current_code_info } = data;
  const theme = riskTheme[risk_level] || riskTheme.Low;
  const Icon = theme.icon;
  const breatheSpeed = risk_level === 'Extreme' ? '1.5s' : risk_level === 'High' ? '2.5s' : risk_level === 'Medium' ? '4s' : '6s';

  return (
    <div className="space-y-12 animate-in fade-in duration-1000 pb-20">
      
      {/* Soulful Hero Section */}
      <div className={`relative overflow-hidden rounded-[3.5rem] p-12 border-2 ${theme.border} bg-gradient-to-br ${theme.bg} backdrop-blur-xl group transition-all duration-1000 hover:shadow-2xl`}>
        {/* Breathing Background Animation */}
        <div 
          className={`absolute -top-32 -right-32 w-[35rem] h-[35rem] rounded-full blur-[120px] opacity-20 ${theme.accent} animate-breathe pointer-events-none`}
          style={{ '--breathe-speed': breatheSpeed }}
        />
        <div 
          className={`absolute -bottom-32 -left-32 w-[30rem] h-[30rem] rounded-full blur-[100px] opacity-10 ${theme.accent} animate-breathe pointer-events-none`}
          style={{ '--breathe-speed': breatheSpeed, animationDelay: '1s' }}
        />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <div className="flex flex-wrap items-center gap-4">
              <div className={`p-4 rounded-[2rem] text-white shadow-2xl ${theme.accent} ${theme.glow}`}>
                <Icon className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 flex items-center gap-2">
                    <Heart className="w-3 h-3 fill-current" /> Personal Safety Sentinel
                 </p>
                 <h2 className={`text-6xl font-black tracking-tighter ${theme.text} uppercase leading-none`}>{risk_level} Risk</h2>
              </div>
            </div>

            <p className="text-2xl font-bold text-slate-800 leading-tight max-w-2xl opacity-90">
               {theme.narrative}
            </p>

            {/* Current Code Explanation */}
            <div className={`p-6 rounded-[2rem] border-2 ${theme.border} bg-white/30 backdrop-blur-sm`}>
              <div className="flex items-center gap-3 mb-3">
                <BookOpen className="w-4 h-4 text-slate-600" />
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">What is Code {prs_code}?</p>
              </div>
              <p className="text-sm font-bold text-slate-700 leading-relaxed">
                {current_code_info?.description || riskCodeDefinitions.find(r => r.code === prs_code)?.description}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 pt-2">
               <div className="bg-slate-900 text-white px-8 py-5 rounded-[2.5rem] flex items-center gap-4 shadow-xl border border-white/5 transition-transform hover:scale-[1.02]">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40">Composite PRS</p>
                  <p className="text-3xl font-black tracking-tighter">Code {prs_code}</p>
               </div>
               <div className="bg-white/60 backdrop-blur-md px-8 py-5 rounded-[2.5rem] flex items-center gap-4 border border-white/60 shadow-sm transition-transform hover:scale-[1.02]">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Health CVS</p>
                  <p className="text-3xl font-black text-slate-900 tracking-tighter">{cvs}</p>
               </div>
            </div>
          </div>

          <div className="lg:col-span-5 flex justify-center lg:justify-end">
             <div className="relative group/shield">
                {/* Visual Risk Shield */}
                <div className={`w-72 h-72 rounded-full border-8 ${theme.border} flex items-center justify-center p-10 relative animate-spin-slow`}>
                   <div className={`absolute inset-0 rounded-full border-4 border-dashed ${theme.border} opacity-20`} />
                </div>
                <div className="absolute inset-0 flex items-center justify-center flex-col text-center">
                   <div className="bg-white/90 backdrop-blur-xl rounded-[2rem] px-8 py-6 shadow-lg border border-slate-200/50">
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Impact Level</p>
                     <p className={`text-7xl font-black ${theme.text} tracking-tighter`}>{impact}.0</p>
                   </div>
                </div>
                <div className="absolute -top-4 -right-4 bg-white p-4 rounded-3xl shadow-xl border border-slate-100 scale-0 group-hover/shield:scale-100 transition-all duration-500">
                   <Zap className="w-6 h-6 text-amber-500" />
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════════════ */}
      {/* RISK CODE DEFINITIONS LEGEND — What E, H, M, L mean */}
      {/* ═══════════════════════════════════════════════════ */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 px-4">
          <div className="p-3 bg-slate-900 rounded-2xl text-primary-400 shadow-xl border border-white/5">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">Risk Code Definitions</h3>
            <p className="text-slate-500 font-bold text-sm">Understanding PRS Tier Codes — UPSAFE Research Framework (Table 5)</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {riskCodeDefinitions.map((def) => {
            const isActive = def.code === prs_code;
            return (
              <div 
                key={def.code}
                className={`relative rounded-[2.5rem] p-8 border-2 transition-all duration-500 overflow-hidden group
                  ${isActive 
                    ? `${def.borderColor} bg-white shadow-2xl ring-4 ring-offset-2 ${def.borderColor.replace('border', 'ring')} scale-[1.02]` 
                    : 'border-slate-100 bg-white/60 backdrop-blur-sm hover:bg-white hover:shadow-lg'
                  }`}
              >
                {isActive && (
                  <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-slate-900 text-white px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Active
                  </div>
                )}

                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-2xl ${def.color} text-white flex items-center justify-center shadow-lg`}>
                    <span className="text-2xl font-black">{def.code}</span>
                  </div>
                  <div>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">PRS Tier</p>
                    <h4 className={`text-xl font-black ${def.textColor} tracking-tight`}>{def.label}</h4>
                  </div>
                </div>

                <p className="text-xs font-bold text-slate-500 leading-relaxed mb-6">
                  {def.description}
                </p>

                <div className={`p-4 rounded-2xl ${def.bgLight} border ${def.borderColor} mb-4`}>
                  <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Required Action</p>
                  <p className="text-[11px] font-bold text-slate-700 leading-snug">{def.action}</p>
                </div>

                <div className="flex gap-3">
                  <div className="flex-1 bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">EF</p>
                    <p className="text-sm font-black text-slate-800">{def.ef}</p>
                  </div>
                  <div className="flex-1 bg-slate-50 p-3 rounded-xl text-center border border-slate-100">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">ARO</p>
                    <p className="text-sm font-black text-slate-800">{def.aro}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Primary Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* Atmospheric Pulse Card */}
        <div className="glass-card p-10 bg-slate-900 text-white border-white/5 shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
             <Wind className="w-32 h-32" />
          </div>
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-400">Atmospheric Pulse</h3>
            <Activity className="w-6 h-6 text-slate-500" />
          </div>
          <div className="space-y-6">
            <div className="flex justify-between items-end border-b border-white/5 pb-6">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Max AQI Index</span>
              <span className="text-5xl font-black tracking-tighter">{base_metrics.max_aqi}</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Exposure Probability</span>
              <span className="px-4 py-1.5 bg-primary-500/20 text-primary-400 rounded-xl text-[10px] font-black tracking-widest uppercase">
                 {(base_metrics.p_harmful * 100).toFixed(1)}% Frequency
              </span>
            </div>
          </div>
        </div>

        {/* Economic Risk Grid */}
        <div className="glass-card p-10 bg-white border-slate-100 shadow-sm flex flex-col justify-between group hover:shadow-xl transition-all">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Financial Exposure</h3>
              <IndianRupee className="w-6 h-6 text-emerald-500" />
           </div>
           <div className="space-y-8">
              <div>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-2">Annual Loss (ALE)</p>
                 <p className="text-5xl font-black text-slate-900 tracking-tighter">₹{ale.toLocaleString()}</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-[2rem] border border-slate-100 group-hover:bg-primary-50 transition-colors">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Impact Basis</p>
                 <p className="text-xs font-bold text-slate-600 leading-relaxed italic">"Standardized health-expenditure projected cost per individual incident (SLE): ₹{sle.toLocaleString()}"</p>
              </div>
           </div>
        </div>

        {/* Scientific Context */}
        <div className="glass-card p-10 bg-primary-600 text-white border-none shadow-2xl relative overflow-hidden group">
           <div className="absolute -bottom-8 -right-8 opacity-10 group-hover:scale-110 transition-transform duration-700">
              <Shield className="w-32 h-32" />
           </div>
           <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary-200 mb-8 flex items-center gap-3">
              <Zap className="w-5 h-5 text-white animate-pulse" /> Safety Protocol
           </h3>
           <p className="text-md font-bold text-white/90 leading-relaxed mb-10">
              Your PRS Code <strong>{prs_code}</strong> ({riskCodeDefinitions.find(r => r.code === prs_code)?.label}) triggers the formal safety protocol under the UPSAFE research framework.
           </p>
           <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 p-5 rounded-[2rem] text-xs font-black uppercase tracking-widest flex items-center justify-between group/btn transition-all">
              Explore Mitigation Steps
              <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
           </button>
        </div>

      </div>

      {/* Emergency & Advisory Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Medical Advisory */}
        <div className="lg:col-span-8 glass-card p-10 bg-white border-slate-100 flex flex-col justify-between shadow-sm">
           <div className="flex items-center gap-4 mb-10">
              <div className="p-4 bg-indigo-100 rounded-2xl text-indigo-600 shadow-inner">
                 <Stethoscope className="w-8 h-8" />
              </div>
              <div>
                 <h3 className="text-3xl font-black tracking-tighter uppercase text-slate-800 leading-none">Medical Protocol</h3>
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">Research-Aligned Clinical Response for Code {prs_code}</p>
              </div>
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                  <ShieldAlert className="w-5 h-5 text-rose-500" /> Required Actions
                </p>
                <ul className="space-y-4">
                  {(advice || []).map((item, j) => (
                    <li key={j} className="flex gap-4 text-md font-bold text-slate-600 leading-tight group/li">
                       <div className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/li:bg-primary-500 transition-colors shrink-0" />
                       {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-6">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 flex items-center gap-3">
                  <Activity className="w-5 h-5 text-primary-500" /> Clinical Monitoring
                </p>
                <ul className="space-y-4">
                  {[
                    'Peak flow monitoring advised',
                    'Symptomatic review (Dyspnea, chest tightness)',
                    `Consult safety officer if Code ${prs_code === 'E' ? 'E persists' : 'escalates to E'}`
                  ].map((item, j) => (
                    <li key={j} className="flex gap-4 text-md font-bold text-slate-600 leading-tight group/li">
                       <div className="mt-2 w-1.5 h-1.5 rounded-full bg-slate-300 group-hover/li:bg-primary-500 transition-colors shrink-0" />
                       {item}
                    </li>
                  ))}
                </ul>
              </div>
           </div>
        </div>

        {/* Global Insight Card */}
        <div className="lg:col-span-4 glass-card p-10 bg-slate-900 text-white border-white/5 relative overflow-hidden group shadow-2xl flex flex-col justify-between">
           <div className="absolute top-0 right-0 p-8 opacity-5">
              <Info className="w-32 h-32" />
           </div>
           <div>
              <h3 className="text-lg font-black text-indigo-400 mb-6 uppercase tracking-tighter">Research Summary</h3>
              <p className="text-md font-bold text-slate-400 leading-relaxed italic opacity-80">
                 "UPSAFE provides a dynamic risk interpretative layer for public health safety using non-linear impact-likelihood matrices."
              </p>
           </div>
           <div className="pt-8 flex justify-between items-end border-t border-white/5">
              <div>
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Framework</p>
                 <p className="text-sm font-black text-white">ISO 31000 Compliance</p>
              </div>
              <div className="text-right">
                 <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Node Status</p>
                 <p className="text-sm font-black text-emerald-400">v2.4 Stable</p>
              </div>
           </div>
        </div>

      </div>

    </div>
  );
}
