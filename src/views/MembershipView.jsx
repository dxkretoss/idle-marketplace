import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { PLANS } from '../data/mockData';
import { 
  Check, 
  Crown, 
  Sparkles, 
  ShieldCheck, 
  ArrowRight,
  Zap,
  Building2,
  Compass,
  Star,
  CheckCircle2,
  HelpCircle
} from 'lucide-react';

export const MembershipView = () => {
  const { plan, setPlan, addToast } = useApp();

  const handleSelectPlan = (planId) => {
    setPlan(planId);
    addToast(`Switched plan to ${planId} Tier!`, 'success');
  };

  const getTierIcon = (tierId) => {
    switch (tierId) {
      case 'Free':
        return <Compass className="w-5 h-5 text-emerald-700" />;
      case 'Trade':
        return <Sparkles className="w-5 h-5 text-amber-700" />;
      case 'Business':
        return <Building2 className="w-5 h-5 text-emerald-800" />;
      case 'Enterprise':
        return <Crown className="w-5 h-5 text-amber-600" />;
      default:
        return <CheckCircle2 className="w-5 h-5 text-idle-emerald" />;
    }
  };

  return (
    <div className="space-y-10 pb-20">
      {/* Page Heading & Value Hook */}
      <div className="text-center max-w-3xl mx-auto space-y-3 pt-2">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-idle-mint text-idle-emerald border border-idle-emerald/20 text-xs font-bold tracking-wide">
          <Zap className="w-3.5 h-3.5 text-idle-gold" />
          <span>TRANSPARENT SUBSCRIPTION ARCHITECTURE</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#082f2c] tracking-tight">
          Browse free. Keep 100% of what you earn.
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-idle-muted leading-relaxed max-w-2xl mx-auto">
          IDLE charges <strong>zero percent transaction commission</strong>. Members pay a flat, predictable monthly fee for unlimited listings, single-use QR custody handoffs, and direct communications.
        </p>

        {/* Value Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2 text-[11px] font-semibold text-[#1e3b33]">
          <span className="px-3 py-1 rounded-full bg-white border border-[#dce5df] shadow-2xs">✓ 0% Platform Commission</span>
          <span className="px-3 py-1 rounded-full bg-white border border-[#dce5df] shadow-2xs">✓ Instant Stripe Connect Payouts</span>
          <span className="px-3 py-1 rounded-full bg-white border border-[#dce5df] shadow-2xs">✓ Cancel Anytime With 1 Click</span>
        </div>
      </div>

      {/* 4 Modern Plans Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch pt-4">
        {PLANS.map((tier) => {
          const isCurrent = plan === tier.id;
          const isTrade = tier.id === 'Trade';
          return (
            <div
              key={tier.id}
              className={`rounded-3xl p-6 sm:p-7 flex flex-col justify-between transition-all duration-300 relative ${
                isTrade
                  ? 'border-2 border-idle-gold ring-4 ring-idle-gold/20 shadow-2xl md:-translate-y-3 lg:-translate-y-4 bg-gradient-to-b from-[#fffcfa] via-[#faf7ee] to-[#f4ede0] z-10'
                  : 'border border-[#dce5df] bg-white hover:border-idle-emerald/40 hover:shadow-xl shadow-sm'
              }`}
            >
              {/* Prominent High-Impact 'MOST POPULAR' Badge */}
              {isTrade && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20 whitespace-nowrap bg-gradient-to-r from-[#e5ba5e] via-[#d6a746] to-[#b8852c] text-[#0f241d] text-[11px] sm:text-xs font-black tracking-wider uppercase px-4 py-1.5 rounded-full shadow-lg shadow-[#d6a746]/35 flex items-center gap-1.5 border border-amber-200/80">
                  <Sparkles className="w-3.5 h-3.5 fill-[#0f241d] text-[#0f241d]" />
                  <span>MOST POPULAR · RECOMMENDED</span>
                </div>
              )}

              <div className="space-y-5">
                {/* Header: Icon + Title + Active status */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className={`p-2.5 rounded-2xl border ${
                      isTrade 
                        ? 'bg-amber-100/70 border-amber-300/80 shadow-xs' 
                        : 'bg-[#edf3f0] border-[#d2e0d8]'
                    }`}>
                      {getTierIcon(tier.id)}
                    </div>
                    {isCurrent && (
                      <span className="text-[10px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-full bg-idle-mint text-idle-emerald border border-idle-emerald/25 shadow-xs">
                        Active Plan
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-[#0d2e29]">
                    {tier.name}
                  </h3>
                  <p className="text-xs text-idle-muted mt-1 leading-relaxed min-h-[36px]">
                    {tier.description}
                  </p>
                </div>

                {/* Price Display */}
                <div className="pt-3 pb-4 border-y border-[#e3ebe6] space-y-1">
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-4xl font-serif font-extrabold text-[#003d36] tracking-tight">
                      ${tier.price}
                    </span>
                    <span className="text-xs font-bold text-idle-muted">
                      / {tier.period}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-idle-emerald flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3 text-idle-emerald" />
                    <span>0% transaction cut on bookings</span>
                  </div>
                </div>

                {/* Features Checklist */}
                <div className="space-y-3 pt-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-idle-muted block">
                    What's Included:
                  </span>
                  <div className="space-y-2.5">
                    {tier.features.map((feat, i) => (
                      <div key={i} className="flex items-start gap-2.5 text-xs text-[#1e3b33] font-medium leading-tight">
                        <div className="w-4 h-4 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                        </div>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="pt-8">
                {isCurrent ? (
                  <div className="w-full py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-bold bg-idle-mint text-idle-emerald border border-idle-emerald/30 flex items-center justify-center gap-2 shadow-xs cursor-default">
                    <Check className="w-4 h-4" />
                    <span>Current Active Plan</span>
                  </div>
                ) : isTrade ? (
                  <button
                    onClick={() => handleSelectPlan('Trade')}
                    className="gold-gradient-btn w-full py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-black shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Upgrade to Trade</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={() => handleSelectPlan(tier.id)}
                    className="w-full py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-bold bg-[#004f46] hover:bg-[#003d36] text-white shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Switch to {tier.name}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modern Value Proposition Callout Grid */}
      <section className="glass-card p-6 md:p-8 rounded-3xl border border-idle-line grid grid-cols-1 md:grid-cols-3 gap-6 shadow-sm">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-idle-emerald font-bold text-sm">
            <div className="p-2 rounded-xl bg-idle-mint text-idle-emerald">
              <Zap className="w-4 h-4" />
            </div>
            <span>0% Transaction Fees</span>
          </div>
          <p className="text-xs text-idle-muted leading-relaxed">
            Other marketplaces take 15% to 30% of every dollar you make. IDLE never touches your transactions; standard Stripe processing fees apply directly.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-idle-emerald font-bold text-sm">
            <div className="p-2 rounded-xl bg-idle-mint text-idle-emerald">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <span>Deposit Pre-Authorizations</span>
          </div>
          <p className="text-xs text-idle-muted leading-relaxed">
            Hold refundable damage deposits securely on customer cards without tying up your working capital or manual refund requests.
          </p>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-idle-emerald font-bold text-sm">
            <div className="p-2 rounded-xl bg-idle-mint text-idle-emerald">
              <Crown className="w-4 h-4" />
            </div>
            <span>Single-Use QR Handoffs</span>
          </div>
          <p className="text-xs text-idle-muted leading-relaxed">
            Predictable membership dues fund the local trust network, single-use dynamic QR codes, and customer resolution infrastructure.
          </p>
        </div>
      </section>
    </div>
  );
};
