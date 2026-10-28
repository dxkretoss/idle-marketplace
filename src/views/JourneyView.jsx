import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { JOURNEY_STEPS } from '../data/mockData';
import { 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  ShieldCheck, 
  QrCode, 
  Wallet, 
  MessageSquare,
  Users,
  Compass,
  Star,
  ExternalLink
} from 'lucide-react';

export const JourneyView = () => {
  const { setRoute } = useApp();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const activeStep = JOURNEY_STEPS[activeStepIndex];

  return (
    <div className="space-y-8 pb-16">
      {/* Page Heading */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
          Customer Lifecycle Blueprint
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#082f2c] mt-0.5">
          15-Step IDLE Customer Journey.
        </h1>
        <p className="text-xs sm:text-sm text-idle-muted mt-1 max-w-2xl">
          An interactive walkthrough of how members discover, negotiate, authorize payments, and perform single-use QR custody handoffs from initial onboarding to verified reviews.
        </p>
      </div>

      {/* Visual Journey Mockup Banner */}
      <div className="glass-card p-4 rounded-3xl border border-idle-emerald/20 flex flex-col sm:flex-row items-center justify-between gap-4 bg-gradient-to-r from-emerald-50/50 via-white to-amber-50/40">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-idle-mint text-idle-emerald flex items-center justify-center flex-shrink-0">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <strong className="text-sm font-bold text-[#003d36] block">
              Aligned with Client Mockup Specifications
            </strong>
            <span className="text-xs text-idle-muted">
              Referencing `IDLE Marketplace Journey Mockup.png` and proposal roadmap
            </span>
          </div>
        </div>

        <button
          onClick={() => setRoute('explore')}
          className="emerald-gradient-btn px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 flex-shrink-0"
        >
          <span>Test in Marketplace</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Interactive Step Navigator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Step Buttons List (5 cols) */}
        <div className="lg:col-span-5 glass-card rounded-3xl p-4 border border-idle-line max-h-[600px] overflow-y-auto no-scrollbar space-y-1.5">
          <span className="text-[10px] font-bold uppercase tracking-wider text-idle-muted block px-2 mb-2">
            Journey Milestones
          </span>
          {JOURNEY_STEPS.map((s, idx) => {
            const isSelected = idx === activeStepIndex;
            return (
              <button
                key={s.step}
                onClick={() => setActiveStepIndex(idx)}
                className={`w-full p-3 rounded-2xl flex items-center gap-3 text-left transition-all ${
                  isSelected
                    ? 'bg-idle-emerald text-white shadow-md'
                    : 'hover:bg-idle-mint/40 text-[#172d28]'
                }`}
              >
                <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                  isSelected 
                    ? 'bg-white/20 text-white' 
                    : 'bg-idle-mint text-idle-emerald'
                }`}>
                  {s.step}
                </span>
                <div className="flex-1 min-w-0">
                  <strong className="block text-xs font-bold truncate">
                    {s.title}
                  </strong>
                  <span className={`text-[10px] uppercase font-semibold block ${
                    isSelected ? 'text-idle-goldLight' : 'text-idle-muted'
                  }`}>
                    {s.category}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Step Spotlight Detail (7 cols) */}
        <div className="lg:col-span-7 glass-card p-6 md:p-8 rounded-3xl border border-idle-emerald/20 shadow-glass space-y-6">
          <div className="flex items-center justify-between border-b border-idle-line pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-idle-mint text-idle-emerald">
                Stage {activeStep.step} of 15
              </span>
              <span className="text-xs text-idle-muted">
                {activeStep.category} Phase
              </span>
            </div>
            <span className="text-[10px] font-bold text-idle-gold bg-amber-50 px-2 py-0.5 rounded-full border border-idle-gold/30">
              Zero Commission
            </span>
          </div>

          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0d2e29]">
              {activeStep.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#2b4c42] mt-2 leading-relaxed">
              {activeStep.desc}
            </p>
          </div>

          {/* Cross-Platform Architecture Matrix Box */}
          <div className="p-4 rounded-2xl bg-[#f8faf9] border border-idle-line space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#172d28]">
              Cross-Platform Systems Involved
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-white border border-idle-line">
                <strong className="text-idle-emerald block text-[11px]">React Web App</strong>
                <span className="text-idle-muted text-[10px]">Desktop & responsive mobile UI</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-idle-line">
                <strong className="text-idle-emerald block text-[11px]">iOS & Android</strong>
                <span className="text-idle-muted text-[10px]">Camera QR scan & condition photos</span>
              </div>
              <div className="p-2.5 rounded-xl bg-white border border-idle-line">
                <strong className="text-idle-emerald block text-[11px]">Supabase & Stripe</strong>
                <span className="text-idle-muted text-[10px]">RLS security & deposit holds</span>
              </div>
            </div>
          </div>

          {/* Stepper Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-idle-line">
            <button
              onClick={() => setActiveStepIndex(Math.max(0, activeStepIndex - 1))}
              disabled={activeStepIndex === 0}
              className="px-4 py-2 rounded-xl text-xs font-bold border border-idle-line disabled:opacity-30 disabled:cursor-not-allowed hover:bg-black/5"
            >
              &larr; Previous Step
            </button>
            <button
              onClick={() => setActiveStepIndex(Math.min(JOURNEY_STEPS.length - 1, activeStepIndex + 1))}
              disabled={activeStepIndex === JOURNEY_STEPS.length - 1}
              className="gold-gradient-btn px-5 py-2 rounded-xl text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1.5"
            >
              <span>Next Step</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
