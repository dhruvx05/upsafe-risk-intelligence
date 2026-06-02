import React from 'react';
import { 
  Zap, 
  TrendingUp, 
  Shield, 
  AlertTriangle, 
  Scale, 
  ArrowRight, 
  Activity,
  Calculator,
  IndianRupee,
  ChevronRight,
  Info
} from 'lucide-react';

const prsInterpretation = {
  E: { label: 'Extreme', color: 'bg-red-500', border: 'border-red-400/50', text: 'text-red-500', action: 'Immediate evacuation. Cease all activity. Mandatory industrial PPE.' },
  H: { label: 'High', color: 'bg-orange-500', border: 'border-orange-400/50', text: 'text-orange-500', action: 'Restrict movement. Don max-rated PPE. Alert emergency services.' },
  M: { label: 'Medium', color: 'bg-amber-500', border: 'border-amber-400/50', text: 'text-amber-500', action: 'Apply precautionary measures. Limit exposure duration. Increase monitoring.' },
  L: { label: 'Low', color: 'bg-emerald-500', border: 'border-emerald-400/50', text: 'text-emerald-500', action: 'Continue activities with standard precautions. Maintain routine vigilance.' },
};

// 5x5 Matrix definition from research paper (Table 4)
// X-axis: Impact (1-5), Y-axis: Likelihood (1-5)
const matrixData = {
  5: { 5: "E", 4: "E", 3: "H", 2: "M", 1: "L" }, // Almost Certain
  4: { 5: "E", 4: "E", 3: "H", 2: "M", 1: "L" }, // Likely
  3: { 5: "E", 4: "H", 3: "M", 2: "L", 1: "L" }, // Possible
  2: { 5: "M", 4: "M", 3: "L", 2: "L", 1: "L" }, // Unlikely
  1: { 5: "L", 4: "L", 3: "L", 2: "L", 1: "L" }, // Rare
};

export default function RiskEngine({ data, userInputs }) {
  if (!data) return null;

  const { prs_code, risk_level, cvs, impact, likelihood, base_likelihood, sle, ale, base_metrics } = data;
  const interpretation = prsInterpretation[prs_code] || prsInterpretation.L;

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-top-12 duration-1000 mb-12">
      {/* Header Section */}
      <div className="flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-slate-900 rounded-2xl text-primary-400 shadow-xl border border-white/5">
            <Calculator className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tighter">Risk Engine & Assessment Matrix</h2>
            <p className="text-slate-500 font-bold text-sm flex items-center gap-2">
              <Shield className="w-4 h-4 text-primary-500" />
              NIST SP 800-30 & ISO 31000 ALIGNED MATHEMATICAL PIPELINE
            </p>
          </div>
        </div>
        <div className="bg-slate-900 px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-1">Engine Status</p>
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-black text-white uppercase tracking-widest">Active & Reactive</span>
          </div>
        </div>
      </div>

      {/* Main Analytical Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
        
        {/* Left Column: Pipeline & CVS */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Visual Risk Pipeline */}
          <div className="bg-slate-900 rounded-[2.5rem] p-10 border border-white/10 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap className="w-32 h-32 text-white" />
            </div>
            
            <h3 className="text-xl font-black text-white mb-10 flex items-center gap-3 uppercase tracking-tighter">
              <Activity className="w-5 h-5 text-primary-400" />
              UPSAFE Mathematical Pipeline
            </h3>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 relative">
              {[
                { label: 'Input', val: base_metrics.max_aqi, desc: 'Peak AQI', color: 'text-slate-400' },
                { label: 'Vulnerability', val: cvs, desc: 'CVS Score', color: 'text-amber-400' },
                { label: 'Likelihood', val: `${likelihood}.0`, desc: 'L_adjusted', color: 'text-indigo-400' },
                { label: 'Impact', val: `${impact}.0`, desc: 'I_level', color: 'text-rose-400' },
                { label: 'Risk', val: prs_code, desc: 'PRS Tier', color: 'text-primary-400' },
                { label: 'Loss', val: `₹${(ale/1000).toFixed(1)}k`, desc: 'ALE Projection', color: 'text-emerald-400' },
              ].map((step, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center group/step">
                  <div className="bg-slate-800/80 backdrop-blur-xl border border-white/10 p-4 rounded-[2rem] w-full h-40 flex flex-col items-center justify-center shadow-xl group-hover/step:border-primary-500/50 transition-all duration-500">
                    <p className={`text-2xl font-black ${step.color} tracking-tighter mb-1`}>{step.val}</p>
                    <p className="text-[9px] font-black text-white/40 uppercase tracking-[0.2em] text-center leading-tight whitespace-nowrap">{step.label}</p>
                  </div>
                  <p className="absolute -bottom-10 text-[9px] font-black text-white/20 uppercase tracking-[0.2em] whitespace-nowrap">{step.desc}</p>
                </div>
              ))}
            </div>
            
            <div className="mt-20 p-6 bg-white/5 rounded-2xl border border-white/5">
              <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-2 italic">Mathematical Proof (Equation 6)</p>
              <p className="text-sm font-bold text-slate-400 italic">
                PRS = R(L_adjusted, Impact) where L_adj = L_base + 1 if CVS &gt; 3.0
              </p>
            </div>
          </div>

          {/* CVS Breakdown Panel */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 h-full flex flex-col">
              <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                <Scale className="w-5 h-5 text-primary-600" />
                CVS Factor Analysis
              </h3>
              
              <div className="space-y-4 flex-1">
                {[
                  { label: 'Proximity (V1)', val: userInputs.proximity },
                  { label: 'Exposure (V2)', val: userInputs.exposure },
                  { label: 'PPE (V3)', val: userInputs.mask_usage },
                  { label: 'Health (V4)', val: userInputs.health },
                  { label: 'Awareness (V5)', val: userInputs.awareness },
                  { label: 'Infra (V6)', val: userInputs.infrastructure },
                ].map((v, i) => (
                  <div key={i} className="space-y-1">
                    <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <span>{v.label}</span>
                      <span>{v.val}/5</span>
                    </div>
                    <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary-500 transition-all duration-1000" 
                        style={{ width: `${(v.val/5)*100}%` }} 
                      />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t border-slate-100 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Final CVS Score</p>
                  <p className="text-4xl font-black text-slate-900">{cvs}</p>
                </div>
                <div className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${cvs > 3.0 ? 'bg-red-50 text-red-600 border-red-200' : 'bg-emerald-50 text-emerald-600 border-emerald-200'}`}>
                  {cvs > 3.0 ? 'High Vulnerability' : 'Stable Resilience'}
                </div>
              </div>
            </div>

            {/* Financial Impact Panel */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl border border-white/5 flex flex-col justify-between group">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-white flex items-center gap-3 uppercase tracking-tighter">
                  <IndianRupee className="w-5 h-5 text-emerald-400" />
                  Financial Risk
                </h3>
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                  <TrendingUp className="w-4 h-4" />
                </div>
              </div>
              
              <div className="space-y-8">
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Single Loss Expectancy (SLE)</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-5xl font-black text-white tracking-tighter">₹{sle.toLocaleString()}</p>
                    <p className="text-xs font-bold text-slate-500 uppercase">Per Incident</p>
                  </div>
                </div>
                
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Annualized Projection (ALE)</p>
                  <div className="flex items-baseline gap-2">
                    <p className="text-5xl font-black text-emerald-400 tracking-tighter">₹{ale.toLocaleString()}</p>
                    <p className="text-xs font-bold text-slate-500 uppercase">Per Annum</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 p-4 bg-white/5 rounded-2xl border border-white/5">
                <p className="text-[11px] font-bold text-slate-400 leading-relaxed italic">
                  "Expected annual loss due to chronic exposure risk based on AV = ₹5,00,000."
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: 5x5 Matrix & Interpretation */}
        <div className="lg:col-span-4 space-y-8 h-full">
          
          {/* Interactive Matrix Visual */}
          <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-slate-100 flex flex-col">
            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3 uppercase tracking-tighter">
              <Zap className="w-5 h-5 text-amber-500" />
              5×5 Risk Matrix
            </h3>
            
            <div className="flex-1 flex flex-col items-center">
              {/* Matrix Header */}
              <div className="w-full flex mb-2 pl-8">
                {[1,2,3,4,5].map(i => (
                  <div key={i} className="flex-1 text-center text-[10px] font-black text-slate-400">I={i}</div>
                ))}
              </div>
              
              <div className="flex w-full">
                {/* Y-Axis Label */}
                <div className="flex flex-col justify-between pr-4 py-2">
                  {[5,4,3,2,1].map(l => (
                    <div key={l} className="text-[10px] font-black text-slate-400">L={l}</div>
                  ))}
                </div>
                
                {/* Grid */}
                <div className="flex-1 grid grid-cols-5 grid-rows-5 gap-1.5 w-full aspect-square">
                  {[5,4,3,2,1].map(l => (
                    [1,2,3,4,5].map(i => {
                      const code = matrixData[l][i];
                      const isCurrent = l === likelihood && i === impact;
                      return (
                        <div 
                          key={`${l}-${i}`}
                          className={`
                            rounded-lg flex items-center justify-center text-[10px] font-black transition-all duration-500
                            ${code === 'E' ? 'bg-red-500 text-white' : 
                              code === 'H' ? 'bg-orange-500 text-white' : 
                              code === 'M' ? 'bg-amber-400 text-slate-900' : 
                              'bg-emerald-400 text-slate-900'}
                            ${isCurrent ? 'ring-4 ring-slate-900 ring-offset-2 scale-110 z-10 shadow-2xl' : 'opacity-30'}
                          `}
                        >
                          {code}
                        </div>
                      )
                    })
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex gap-4 text-[9px] font-black uppercase tracking-widest text-slate-400">
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-red-500" /> Extreme</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-orange-500" /> High</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-amber-400" /> Medium</span>
                <span className="flex items-center gap-1"><div className="w-2 h-2 rounded bg-emerald-400" /> Low</span>
              </div>
            </div>
          </div>

          {/* Interpretation Panel */}
          <div className={`rounded-[2.5rem] p-8 border-2 ${interpretation.border} bg-white shadow-xl h-fit`}>
            <div className="flex items-center gap-4 mb-6">
              <div className={`p-4 rounded-2xl text-white shadow-lg ${interpretation.color}`}>
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">PRS Interpretation</p>
                <h4 className={`text-2xl font-black ${interpretation.text}`}>Tier {prs_code}: {risk_level}</h4>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Meaning (Table 5)</p>
                <p className="text-sm font-bold text-slate-700 leading-relaxed">
                  {interpretation.action.split('.')[0]}.
                </p>
              </div>
              
              <div className={`p-6 rounded-2xl border-l-4 ${interpretation.border} bg-slate-50`}>
                <p className="text-[10px] font-black text-slate-400 uppercase mb-3">Required Countermeasures</p>
                <p className="text-md font-black text-slate-900 leading-tight">
                  {interpretation.action.split('.').slice(1).join('.')}
                </p>
              </div>
            </div>
          </div>

          {/* Likelihood Explainer */}
          <div className="bg-slate-900 rounded-[2.5rem] p-8 shadow-2xl border border-white/5">
             <h3 className="text-lg font-black text-white mb-6 flex items-center gap-3 uppercase tracking-tighter">
                <Info className="w-5 h-5 text-indigo-400" />
                Likelihood Analytics
             </h3>
             <div className="space-y-6">
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                   <p className="text-[10px] font-black text-slate-400 uppercase">Dataset Sample (N)</p>
                   <p className="text-lg font-black text-white">{base_metrics.total_days} Records</p>
                </div>
                <div className="flex justify-between items-center p-4 bg-white/5 rounded-2xl">
                   <p className="text-[10px] font-black text-slate-400 uppercase">Harmful Incidence (P_h)</p>
                   <p className="text-lg font-black text-white">{base_metrics.p_harmful}</p>
                </div>
                <div className="flex justify-between items-center p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl">
                   <p className="text-[10px] font-black text-indigo-400 uppercase">Likelihood Shift</p>
                    <p className="text-lg font-black text-indigo-400">
                      {cvs > 3.0 ? (likelihood >= 5 ? '+1 (At Max 5)' : '+1 (Shift Applied)') : '0 (Neutral)'}
                    </p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}
