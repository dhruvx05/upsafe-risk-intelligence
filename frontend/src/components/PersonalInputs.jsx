import React from 'react';
import { Clock, Navigation, Shield, Heart, Lightbulb, Building2, HelpCircle, Zap, TrendingDown, TrendingUp, Info, Activity } from 'lucide-react';

const factors = [
  { id: 'proximity', label: 'Proximity to pollution', v_id: 'V1', icon: Navigation, desc: 'Distance from industrial zones or heavy traffic' },
  { id: 'exposure', label: 'Exposure Duration', v_id: 'V2', icon: Clock, desc: 'Average daily time spent in ambient air' },
  { id: 'mask_usage', label: 'Mask usage frequency', v_id: 'V3', icon: Shield, desc: 'Inverted: High value = Low protection (PPE)' },
  { id: 'health', label: 'Health Baseline', v_id: 'V4', icon: Heart, desc: 'Inverted: High value = Severe comorbidity' },
  { id: 'awareness', label: 'Safety Awareness', v_id: 'V5', icon: Lightbulb, desc: 'Inverted: High value = Low awareness' },
  { id: 'infrastructure', label: 'Access to Infrastructure', v_id: 'V6', icon: Building2, desc: 'Inverted: High value = Low access' },
];

export default function PersonalInputs({ inputs, setInputs, isAdvanced, riskData }) {
  const handleChange = (id, value) => {
    setInputs(prev => ({ ...prev, [id]: parseInt(value) }));
  };

  return (
    <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      
      {/* Narrative Header */}
      <div className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl relative overflow-hidden group">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-500 rounded-lg text-white">
                   <Activity className="w-5 h-5" />
                </div>
                <h2 className="text-3xl font-black tracking-tighter uppercase">Vulnerability Simulation</h2>
             </div>
             <p className="text-slate-400 font-bold max-w-xl leading-relaxed">
                Adjust these research-aligned vulnerability factors ($V_1 - V_6$) to observe how lifestyle choices and physiological baselines shift your Personal Risk Score.
             </p>
          </div>
          <div className="bg-white/5 border border-white/10 px-6 py-3 rounded-2xl flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Simulator Reactive</span>
          </div>
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/10 rounded-full -mr-20 -mt-20 blur-[100px]" />
      </div>

      {/* Factors Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {factors.map((factor) => (
          <div key={factor.id} className="glass-card p-8 bg-white border-slate-100 shadow-sm hover:shadow-2xl transition-all duration-500 group">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-slate-50 rounded-2xl text-slate-400 group-hover:text-primary-500 transition-colors">
                  <factor.icon className="w-5 h-5" />
                </div>
                <div>
                   <p className="text-[9px] font-black text-primary-500 uppercase tracking-widest">{factor.v_id}</p>
                   <h3 className="font-black text-slate-800 tracking-tight">{factor.label}</h3>
                </div>
              </div>
              <div className="text-2xl font-black text-slate-900">{inputs[factor.id]}</div>
            </div>

            <p className="text-xs text-slate-400 mb-8 font-bold leading-relaxed opacity-60">
              {factor.desc}
            </p>

            <div className="relative pt-1">
              <input
                type="range"
                min="1"
                max="5"
                step="1"
                value={inputs[factor.id]}
                onChange={(e) => handleChange(factor.id, e.target.value)}
                className="input-slider"
              />
              <div className="flex justify-between mt-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                <span>Minimal</span>
                <span>Maximal</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Advanced Technical Feedback */}
      {isAdvanced && riskData && (
        <div className="bg-slate-900 rounded-[2.5rem] p-10 shadow-2xl border border-white/5 relative overflow-hidden animate-in zoom-in duration-500">
          <div className="flex items-center gap-4 mb-10">
            <div className="p-3 bg-primary-500/20 rounded-xl text-primary-400">
               <Zap className="w-6 h-6" />
            </div>
            <div>
               <h3 className="text-2xl font-black text-white tracking-tighter uppercase">Vulnerability Diagnostics</h3>
               <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Dynamic engine computations</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-all">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Composite Score (CVS)</p>
              <div className="flex items-baseline gap-2">
                <p className="text-5xl font-black text-white tracking-tighter">{riskData.cvs}</p>
                <p className="text-xs font-bold text-slate-500 mb-1.5">/ 5.0</p>
              </div>
            </div>

            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-all">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Likelihood Shift</p>
              <div className="flex items-center gap-4">
                {riskData.cvs >= 3.0 ? (
                  <>
                    <TrendingUp className="w-6 h-6 text-rose-500 animate-bounce" />
                    <p className="text-xl font-black text-rose-500">{riskData.base_metrics.base_likelihood === 5 ? '+1 (At Max)' : '+1 Critical Level'}</p>
                  </>
                ) : (
                  <>
                    <Shield className="w-6 h-6 text-emerald-500" />
                    <p className="text-xl font-black text-emerald-500">Zero-Adjustment</p>
                  </>
                )}
              </div>
            </div>

            <div className="bg-white/5 p-8 rounded-[2rem] border border-white/5 hover:bg-white/10 transition-all">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">PRS Category</p>
              <div className="flex items-center gap-4">
                 <div className={`w-3 h-3 rounded-full animate-pulse ${riskData.cvs > 3.0 ? 'bg-rose-500 shadow-[0_0_15px_rgba(244,63,94,0.5)]' : 'bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]'}`} />
                 <p className="text-3xl font-black text-white">Tier {riskData.prs_code}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-10 p-6 bg-white/5 rounded-2xl border border-white/5 flex items-center gap-4">
             <Info className="w-5 h-5 text-primary-400" />
             <p className="text-xs font-bold text-slate-400 leading-relaxed italic">
                CVS &gt; 3.0 triggers a mandatory +1 shift in Likelihood as per Eq(2) of the UPSAFE Research Framework.
             </p>
          </div>
        </div>
      )}

      {/* Simulator Guidance */}
      <div className="flex flex-col md:flex-row items-center gap-10 p-4">
         <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">How to Use the Simulator</h3>
            <p className="text-slate-500 font-bold leading-relaxed">
               Lower your risk by reducing <span className="text-slate-900">V2 (Exposure)</span> and optimizing <span className="text-slate-900">V3 (PPE)</span>. Notice how the CVS score reacts instantly, potentially de-escalating your overall PRS code.
            </p>
         </div>
         <div className="flex items-center gap-2 px-8 py-4 bg-primary-600 rounded-3xl text-white font-black uppercase text-[10px] tracking-widest shadow-xl shadow-primary-500/20">
            Simulator Optimization Active
         </div>
      </div>
    </div>
  );
}
