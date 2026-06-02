import React from 'react';
import { 
  BookOpen, 
  Layers, 
  Calculator, 
  Shield, 
  Zap, 
  Activity, 
  IndianRupee, 
  Binary,
  ArrowRight,
  AlertTriangle,
  ShieldCheck,
  Flame,
  ShieldAlert
} from 'lucide-react';

export default function Methodology() {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-20">
      
      {/* Narrative Header */}
      <div className="flex flex-col md:flex-row justify-between items-end gap-6 px-4">
        <div>
           <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase">Scientific Methodology</h2>
           <p className="text-slate-500 font-bold text-sm flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-primary-500" />
              UPSAFE RESEARCH FRAMEWORK • ACADEMIC DOCUMENTATION
           </p>
        </div>
        <div className="bg-slate-900 px-6 py-3 rounded-2xl border border-white/10 shadow-2xl">
           <span className="text-[10px] font-black text-primary-400 uppercase tracking-widest">Version 2.4 Stable</span>
        </div>
      </div>

      {/* Core Logic Flow */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Equation Panel 1: CVS */}
        <div className="lg:col-span-6 glass-card p-10 bg-white border-slate-100 shadow-sm relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:rotate-12 transition-transform duration-700">
              <Calculator className="w-32 h-32 text-primary-600" />
           </div>
           <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tighter flex items-center gap-3">
              <Binary className="w-5 h-5 text-primary-600" /> 01. Vulnerability (CVS) — Eq. 1
           </h3>
           <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 mb-8 font-mono text-lg text-slate-700 text-center">
              CVS = (V₁ + V₂ + V₃ + V₄ + V₅ + V₆) / 6
           </div>
           <div className="space-y-4">
              <p className="text-sm font-bold text-slate-500 leading-relaxed italic">
                 "The Composite Vulnerability Score (CVS) is the arithmetic mean of six primary lifestyle and physiological factors, ensuring a balanced risk attribution across physical and social layers."
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                 {[
                   'V1: Proximity to Hazard (1=far, 5=direct)', 
                   'V2: Exposure Duration (1≤1hr, 5≥8hr)', 
                   'V3: PPE (1=full PPE, 5=none)', 
                   'V4: Health (1=robust, 5=severe)', 
                   'V5: Awareness (1=high, 5=none)', 
                   'V6: Infrastructure (1=full, 5=none)'
                 ].map((v, i) => (
                   <div key={i} className="flex items-start gap-2 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-1 shrink-0" /> {v}
                   </div>
                 ))}
              </div>
           </div>
        </div>

        {/* Equation Panel 2: Likelihood Shift */}
        <div className="lg:col-span-6 glass-card p-10 bg-slate-900 text-white border-white/5 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:-rotate-12 transition-transform duration-700">
              <Zap className="w-32 h-32 text-indigo-400" />
           </div>
           <h3 className="text-xl font-black text-white mb-6 uppercase tracking-tighter flex items-center gap-3">
              <Activity className="w-5 h-5 text-indigo-400" /> 02. Risk Escalation — Eq. 2
           </h3>
           <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 mb-8 font-mono text-lg text-indigo-300 text-center">
              IF CVS &gt; 3.0 THEN L_adj = L_base + 1
           </div>
           <div className="space-y-4">
              <p className="text-sm font-bold text-slate-400 leading-relaxed italic">
                 "Equation (2) defines the mandatory likelihood escalation. If the user's vulnerability exceeds the critical threshold (3.0), the probability of harm is automatically escalated by one tier."
              </p>
              <div className="p-4 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-[10px] font-black text-indigo-400 uppercase tracking-widest text-center">
                 Safety Policy: L_adj ≤ 5 (Saturation Cap)
              </div>
           </div>
        </div>

      </div>

      {/* Impact & Likelihood Thresholds from Research Paper */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Impact Levels — Eq. 3 */}
        <div className="glass-card p-10 bg-white border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tighter flex items-center gap-3">
            <Zap className="w-5 h-5 text-amber-500" /> Impact Level — Eq. 3
          </h3>
          <p className="text-sm font-bold text-slate-500 italic mb-6">
            "Severity mapped from highest recorded AQI in the analysis period for conservative worst-case assessment."
          </p>
          <div className="space-y-3">
            {[
              { level: 5, label: 'Doomsday', range: 'AQI > 400', color: 'bg-red-500' },
              { level: 4, label: 'Catastrophic', range: '200 < AQI ≤ 400', color: 'bg-orange-500' },
              { level: 3, label: 'Moderate', range: '100 < AQI ≤ 200', color: 'bg-amber-500' },
              { level: 2, label: 'Minor', range: '50 < AQI ≤ 100', color: 'bg-emerald-400' },
              { level: 1, label: 'Insignificant', range: 'AQI ≤ 50', color: 'bg-emerald-500' },
            ].map((item) => (
              <div key={item.level} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className={`w-10 h-10 rounded-xl ${item.color} text-white flex items-center justify-center font-black text-sm`}>
                  {item.level}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-slate-800">{item.label}</p>
                  <p className="text-[10px] font-bold text-slate-400">{item.range}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Likelihood Levels — Eq. 4 & 5 */}
        <div className="glass-card p-10 bg-white border-slate-100 shadow-sm">
          <h3 className="text-xl font-black text-slate-900 mb-6 uppercase tracking-tighter flex items-center gap-3">
            <Activity className="w-5 h-5 text-indigo-500" /> Likelihood Level — Eq. 4 & 5
          </h3>
          <p className="text-sm font-bold text-slate-500 italic mb-4">
            "P_harmful = proportion of observations where AQI &gt; 200 (harmful threshold)."
          </p>
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 font-mono text-sm text-slate-600 text-center">
            P_harmful = (1/N) × Σ I(AQIᵢ &gt; 200)
          </div>
          <div className="space-y-3">
            {[
              { level: 5, label: 'Almost Certain', range: 'P_harmful ≥ 0.75 (75%+)', color: 'bg-red-500' },
              { level: 4, label: 'Likely', range: '0.50 ≤ P_harmful < 0.75', color: 'bg-orange-500' },
              { level: 3, label: 'Possible', range: '0.25 ≤ P_harmful < 0.50', color: 'bg-amber-500' },
              { level: 2, label: 'Unlikely', range: '0.10 ≤ P_harmful < 0.25', color: 'bg-emerald-400' },
              { level: 1, label: 'Rare', range: 'P_harmful < 0.10 (under 10%)', color: 'bg-emerald-500' },
            ].map((item) => (
              <div key={item.level} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <div className={`w-10 h-10 rounded-xl ${item.color} text-white flex items-center justify-center font-black text-sm`}>
                  {item.level}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-black text-slate-800">{item.label}</p>
                  <p className="text-[10px] font-bold text-slate-400">{item.range}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* PRS Matrix & Risk Code Definitions */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* PRS 5x5 Matrix Logic */}
        <div className="lg:col-span-7 glass-card p-10 bg-white border-slate-100 shadow-sm flex flex-col justify-between">
           <div>
              <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tighter flex items-center gap-3">
                 <Layers className="w-5 h-5 text-amber-500" /> 03. Assessment Matrix — Eq. 6 (Table 4)
              </h3>
              <p className="text-sm font-bold text-slate-500 leading-relaxed mb-8">
                 The Personal Risk Score (PRS) is determined using a non-linear 5×5 Impact-Likelihood matrix, aligning with <strong>ISO 31000</strong> risk management standards. PRS = R(L_adjusted, Impact) ∈ &#123;E, H, M, L&#125;
              </p>

              {/* Actual 5x5 Matrix Visual */}
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-center text-xs font-black">
                  <thead>
                    <tr>
                      <th className="p-2 text-slate-400 text-[10px] uppercase tracking-widest">L \ I →</th>
                      <th className="p-2 text-slate-600">5 (Doom)</th>
                      <th className="p-2 text-slate-600">4 (Cat.)</th>
                      <th className="p-2 text-slate-600">3 (Mod.)</th>
                      <th className="p-2 text-slate-600">2 (Min.)</th>
                      <th className="p-2 text-slate-600">1 (Ins.)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { l: 5, label: 'Almost Certain', cells: ['E','E','H','M','L'] },
                      { l: 4, label: 'Likely', cells: ['E','E','H','M','L'] },
                      { l: 3, label: 'Possible', cells: ['E','H','M','L','L'] },
                      { l: 2, label: 'Unlikely', cells: ['M','M','L','L','L'] },
                      { l: 1, label: 'Rare', cells: ['L','L','L','L','L'] },
                    ].map((row) => (
                      <tr key={row.l}>
                        <td className="p-2 text-[10px] text-slate-400 uppercase tracking-widest text-left">{row.l} ({row.label})</td>
                        {row.cells.map((cell, i) => (
                          <td key={i} className={`p-2 rounded-lg m-0.5 text-white font-black ${
                            cell === 'E' ? 'bg-red-500' : 
                            cell === 'H' ? 'bg-orange-500' : 
                            cell === 'M' ? 'bg-amber-500 text-slate-900' : 
                            'bg-emerald-500'
                          }`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </div>
        </div>

        {/* Risk Code Definitions — Table 5 */}
        <div className="lg:col-span-5 glass-card p-10 bg-slate-900 text-white border-white/5 shadow-2xl relative group">
           <h3 className="text-xl font-black text-white mb-8 uppercase tracking-tighter flex items-center gap-3">
              <Shield className="w-5 h-5 text-primary-400" /> PRS Tier Definitions — Table 5
           </h3>
           <div className="space-y-5">
              {[
                { code: 'E', label: 'Extreme', color: 'bg-red-500', icon: ShieldAlert,
                  meaning: 'Immediate life-threatening danger',
                  action: 'Emergency evacuation. Cease all activity. Activate emergency medical response. Report to command immediately.' },
                { code: 'H', label: 'High', color: 'bg-orange-500', icon: Flame,
                  meaning: 'Severe risk to health or life',
                  action: 'Restrict movement to safe zones. Don maximum-rated PPE. Alert emergency services. Implement shelter-in-place.' },
                { code: 'M', label: 'Medium', color: 'bg-amber-500', icon: AlertTriangle,
                  meaning: 'Moderate risk requiring active control',
                  action: 'Apply precautionary measures. Increase monitoring frequency. Limit daily exposure duration. Schedule medical review.' },
                { code: 'L', label: 'Low', color: 'bg-emerald-500', icon: ShieldCheck,
                  meaning: 'Acceptable risk with routine vigilance',
                  action: 'Continue activities with standard precautions. Monitor at next scheduled interval. No immediate action required.' },
              ].map((tier) => (
                <div key={tier.code} className="p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3 mb-3">
                    <div className={`w-10 h-10 rounded-xl ${tier.color} text-white flex items-center justify-center shadow-lg`}>
                      <span className="text-lg font-black">{tier.code}</span>
                    </div>
                    <div>
                      <p className="text-sm font-black text-white">{tier.label} Risk</p>
                      <p className="text-[10px] font-bold text-slate-400 italic">{tier.meaning}</p>
                    </div>
                  </div>
                  <p className="text-[11px] font-bold text-slate-400 leading-relaxed pl-13">
                    {tier.action}
                  </p>
                </div>
              ))}
           </div>
        </div>

      </div>

      {/* Financial Formulas */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* SLE — Eq. 7 & 8 */}
        <div className="lg:col-span-6 glass-card p-10 bg-white border-slate-100 shadow-sm">
           <h3 className="text-xl font-black text-slate-900 mb-8 uppercase tracking-tighter flex items-center gap-3">
              <IndianRupee className="w-5 h-5 text-emerald-500" /> 04. Single Loss Expectancy — Eq. 7 & 8
           </h3>
           <div className="bg-slate-50 p-6 rounded-[2rem] border border-slate-100 mb-8 font-mono text-lg text-slate-700 text-center">
              SLE = AV × EF(PRS)
           </div>
           <div className="space-y-4 mb-8">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Exposure Factor (EF) by PRS Tier — Eq. 8</p>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { prs: 'E', ef: '0.90', color: 'bg-red-50 border-red-200 text-red-700' },
                  { prs: 'H', ef: '0.65', color: 'bg-orange-50 border-orange-200 text-orange-700' },
                  { prs: 'M', ef: '0.35', color: 'bg-amber-50 border-amber-200 text-amber-700' },
                  { prs: 'L', ef: '0.10', color: 'bg-emerald-50 border-emerald-200 text-emerald-700' },
                ].map((item) => (
                  <div key={item.prs} className={`p-4 rounded-2xl border text-center ${item.color}`}>
                    <p className="text-lg font-black">{item.ef}</p>
                    <p className="text-[9px] font-black uppercase tracking-widest mt-1">PRS = {item.prs}</p>
                  </div>
                ))}
              </div>
           </div>
           <p className="text-[10px] font-bold text-slate-400 italic">
              AV = ₹5,00,000/year — per-capita annual health expenditure attributable to chronic pollution exposure in Indian urban settings (Pandey et al., 2021).
           </p>
        </div>

        {/* ALE — Eq. 9 & 10 */}
        <div className="lg:col-span-6 glass-card p-10 bg-slate-900 text-white border-white/5 shadow-2xl">
           <h3 className="text-xl font-black text-white mb-8 uppercase tracking-tighter flex items-center gap-3">
              <IndianRupee className="w-5 h-5 text-emerald-400" /> 05. Annual Loss Expectancy — Eq. 9 & 10
           </h3>
           <div className="bg-white/5 p-6 rounded-[2rem] border border-white/10 mb-8 font-mono text-lg text-emerald-400 text-center">
              ALE = SLE × ARO(PRS)
           </div>
           <div className="space-y-4 mb-8">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Annual Rate of Occurrence (ARO) — Eq. 10</p>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { prs: 'E', aro: '0.95', color: 'bg-red-500/10 border-red-500/30 text-red-400' },
                  { prs: 'H', aro: '0.70', color: 'bg-orange-500/10 border-orange-500/30 text-orange-400' },
                  { prs: 'M', aro: '0.40', color: 'bg-amber-500/10 border-amber-500/30 text-amber-400' },
                  { prs: 'L', aro: '0.15', color: 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' },
                ].map((item) => (
                  <div key={item.prs} className={`p-4 rounded-2xl border text-center ${item.color}`}>
                    <p className="text-lg font-black">{item.aro}</p>
                    <p className="text-[9px] font-black uppercase tracking-widest mt-1">PRS = {item.prs}</p>
                  </div>
                ))}
              </div>
           </div>
           <div className="p-6 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
              <p className="text-xs font-bold text-slate-400 leading-relaxed italic">
                 "Financial metrics quantify health impact as a probability-adjusted economic loss, providing a concrete basis for policy intervention and cost-benefit analysis of mitigation measures."
              </p>
           </div>
        </div>

      </div>

      {/* Global Safety Context */}
      <div className="bg-white rounded-[3rem] p-12 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center gap-12 group">
         <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center shadow-2xl shadow-primary-500/30 shrink-0">
            <Shield className="w-10 h-10 text-white" />
         </div>
         <div className="space-y-4">
            <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase">Standardized Safety Interface</h3>
            <p className="text-md text-slate-500 font-bold leading-relaxed">
               The UPSAFE portal translates these rigorous mathematical models into empathetic, dynamic safety pulses. This ensures that while the core remains scientifically robust, the user interface remains intuitive and emotionally resonant for non-technical stakeholders.
            </p>
            <div className="flex gap-4 pt-4">
               {['NIST SP 800-30', 'ISO 31000', 'CPCB AQI Standards'].map(s => (
                 <span key={s} className="px-4 py-2 bg-slate-100 rounded-xl text-[9px] font-black text-slate-400 uppercase tracking-widest">{s}</span>
               ))}
            </div>
         </div>
      </div>

    </div>
  );
}
