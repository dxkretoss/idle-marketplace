import React from 'react';
import { useApp } from '../context/AppContext';
import { PLANS } from '../data/mockData';
import {
  Check,
  Crown,
  Sparkles,
  ShieldCheck,
  Shield,
  ArrowRight,
  Zap,
  Building2,
  Compass,
  CheckCircle2
} from 'lucide-react';

export const MembershipView = () => {
  const { plan, setPlan, addToast, setRoute } = useApp();

  const handleSelectPlan = (planId) => {
    setPlan(planId);
    addToast(`Switched demo permissions to ${planId} Tier!`, 'success');
  };

  const isElite = plan === 'Elite PM';

  return (
    <div className="space-y-8 pb-20 mx-auto">
      {/* Elite PM Owner Preview Notice if currently active */}
      {isElite && (
        <div className="owner-elite-access">
          <div className="flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-400" />
            <strong>♛ Elite PM · Private Members owner preview active</strong>
          </div>
          <p>
            Includes the normal IDLE subscription features, earning listings, public Reels, regular messaging and Enterprise-style workspaces in this demo. Elite pricing, verification and acceptance have not been approved.
          </p>
          <button
            type="button"
            onClick={() => {
              if (setRoute) setRoute('elitepm');
              else window.location.href = '/elitepm';
            }}
            className="gold-gradient-btn px-4 py-2 rounded-xl text-xs font-bold w-fit cursor-pointer shadow-xs mt-1"
          >
            Return to Elite PM ↗
          </button>
        </div>
      )}

      {/* Page Heading matching Prototype */}
      <div className="text-center max-w-3xl mx-auto space-y-2 pt-2">
        <span className="text-[11px] font-extrabold uppercase tracking-widest text-[#004f46] block">
          ONE MEMBERSHIP. MORE POSSIBILITY.
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#082f2c] tracking-tight">
          Membership that grows with you.
        </h1>
        <p className="text-xs sm:text-sm md:text-base text-[#60756a] leading-relaxed max-w-2xl mx-auto">
          Free discovery for everyone. Paid plans unlock marketing, work, rental and business-management tools, with no separate personal plan for every trade.
        </p>
      </div>

      {/* Transparent Boundaries Banner (.pricing-banner matching prototype) */}
      <div className="pricing-banner">
        <span>
          <Shield className="w-4 h-4 text-[#004f46]" />
          Transparent boundaries
        </span>
        <strong>No IDLE commission on peer transaction value.</strong>
        <p>
          External verification, insurance, mediation, accounting and other services are separate user-paid products where the vendor offers direct billing. Vendor pricing and eligibility must be reviewed before purchase.
        </p>
      </div>

      {/* 5 Plans Comparison Grid (.plan-grid-five matching prototype) */}
      <div className="plan-grid-five">
        {PLANS.map((tier) => {
          const isCurrent = plan === tier.id;
          const isRecommended = tier.id === 'Studio Pro';
          return (
            <article
              key={tier.id}
              className={`plan-card ${isCurrent ? 'featured' : ''} ${isRecommended ? 'recommended' : ''}`}
            >
              <div className="plan-name">
                <div className="flex items-center justify-between">
                  <span>{tier.name}</span>
                  {isCurrent && (
                    <span className="text-[9px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-[#004f46] text-white shadow-2xs">
                      Active
                    </span>
                  )}
                </div>
                {isRecommended && (
                  <span className="plan-pick">For growing independents</span>
                )}
              </div>

              <div className="plan-price">
                ${tier.price}
                <small>/month</small>
              </div>

              <p>{tier.caption || tier.description}</p>

              <ul>
                {tier.features.map((feat, idx) => (
                  <li key={idx}>
                    <Check className="w-3.5 h-3.5 text-idle-emerald shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>

              <div className="pt-3 mt-auto">
                <button
                  type="button"
                  onClick={() => handleSelectPlan(tier.id)}
                  className={`w-full py-2.5 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer ${isCurrent
                      ? 'border-2 border-[#004f46] text-[#004f46] bg-emerald-50/80 hover:bg-emerald-100 font-extrabold shadow-2xs'
                      : isRecommended
                        ? 'gold-gradient-btn shadow-md text-[#0f241d]'
                        : 'bg-[#004f46] hover:bg-[#003d36] text-white shadow-xs'
                    }`}
                >
                  {isCurrent ? 'Current demo access' : `Preview ${tier.name}`}
                </button>
              </div>
            </article>
          );
        })}
      </div>

      {/* Actual Demo Limits Capability Comparison Table (.plan-compare matching prototype) */}
      <section className="section">
        <div className="plan-compare shadow-sm">
          <h2>Your actual demo limits</h2>
          <p className="text-xs text-[#718278] mt-1">
            These founder-proposed prices, quantities, Reel allowances and seat counts are not publicly approved billing terms. Changing a tier previews access only and does not create a paid account.
          </p>

          <div className="table-wrap">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Capability</th>
                  {PLANS.map((p) => (
                    <th key={p.id}>{p.name}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Named users</strong></td>
                  {PLANS.map((p) => (
                    <td key={p.id}>{p.seats}</td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Service/task earning listings</strong></td>
                  {PLANS.map((p) => (
                    <td key={p.id}>{Number.isFinite(p.services) ? p.services : 'Fair use'}</td>
                  ))}
                </tr>
                <tr>
                  <td><strong>Rental listings</strong></td>
                  {PLANS.map((p) => (
                    <td key={p.id}>{Number.isFinite(p.rentals) ? p.rentals : 'Fair use'}</td>
                  ))}
                </tr>
                <tr>
                  <td><strong>New Reels per 24h</strong></td>
                  {PLANS.map((p) => (
                    <td key={p.id}>{p.reels}</td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Caution Disclaimer Note matching prototype */}
      <div className="p-4 rounded-2xl bg-[#fffdf7] border border-[#e8dfc7] text-[#6b624a] text-xs leading-relaxed">
        <p>
          <strong>One owner-controlled billing account per subscriber.</strong> Billing, tax, app-store rules, pricing approval, plan-version disclosure, cancellation and production role/seat verification are not connected in this prototype. Existing agreement and safety records remain accessible after a downgrade.
        </p>
      </div>

      {/* Modern Value Proposition Callout Grid */}
      <section className="glass-card p-6 md:p-8 rounded-3xl border border-idle-line grid grid-cols-1 md:grid-cols-3 gap-6 shadow-xs">
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
              <Building2 className="w-4 h-4" />
            </div>
            <span>Cross-Trade Freedom</span>
          </div>
          <p className="text-xs text-idle-muted leading-relaxed">
            Offer equipment rentals, skilled contracting, fitness coaching, and vehicle leases under one single consolidated membership subscription.
          </p>
        </div>
      </section>
    </div>
  );
};
