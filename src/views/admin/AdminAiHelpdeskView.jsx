import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Sparkles, Search, Copy, Check, ShieldCheck, ArrowRight } from 'lucide-react';

const CANNED_KNOWLEDGE = {
  'deposit': {
    title: 'Security Deposit & Custody Hold Policy',
    answer: 'Under the IDLE Custody Protocol, security deposits (e.g. $1,500 for equipment or vehicles) are authorized as temporary Stripe holds. When both lender and borrower complete the dynamic single-use QR return handoff with matching condition photos, the authorization drops automatically within 48 hours without settlement fees.'
  },
  'aviation': {
    title: 'Elite PM Part 135 Aviation Referral Disclaimers',
    answer: 'IDLE is a peer coordination technology platform, not a direct air carrier or FAA Part 135 operator. All aircraft charter legs and fractional leases shown in Elite PM are conducted by verified independent Part 135/121 air operators. Concierge handles identity escrow and FBO arrival logistics only.'
  },
  'plans': {
    title: 'Free vs. Studio Membership Capabilities',
    answer: 'Free members can explore listings, preview sample agreements, and browse reels. To publish up to 5 inventory items, accept binding financial offers, utilize Stripe Connect payouts, and access single-use QR custody handoffs, the user must activate the Studio plan ($29/mo).'
  },
  'protection': {
    title: 'Automated Tint.ai Third-Party Underwriting',
    answer: 'Transactions over $100 trigger automated Tint.ai third-party underwriting at checkout ($12.50/day). Renter risk is evaluated in milliseconds via Stripe identity signals, providing up to $25,000 in equipment damage and theft coverage during the custody period.'
  }
};

export const AdminAiHelpdeskView = () => {
  const { showFeedback } = useAdmin();
  const [selectedKey, setSelectedKey] = useState('deposit');
  const [query, setQuery] = useState('');
  const [copied, setCopied] = useState(false);

  const activeDoc = CANNED_KNOWLEDGE[selectedKey] || CANNED_KNOWLEDGE['deposit'];

  const handleCopy = () => {
    navigator.clipboard?.writeText?.(activeDoc.answer);
    setCopied(true);
    showFeedback('Copied AI policy explanation to clipboard');
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-[#e2e8e5] p-6 shadow-sm space-y-5">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#d9b972]/20 border border-[#d9b972]/40 flex items-center justify-center text-[#d9b972]">
            <Sparkles className="w-4 h-4 text-[#795a1a]" />
          </div>
          <div>
            <h3 className="font-bold text-base text-[#0c302c]">AI-Assisted Operations Help Desk</h3>
            <p className="text-xs text-gray-500">
              Query platform bylaws, custody rules, Stripe payout splits, and regulatory compliance guidelines.
            </p>
          </div>
        </div>

        {/* Prompt Suggestions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          {[
            ['deposit', 'Deposit & QR Release'],
            ['aviation', 'Part 135 Aviation Rules'],
            ['plans', 'Free vs. Studio Tiers'],
            ['protection', 'Tint.ai Underwriting']
          ].map(([key, label]) => (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedKey(key)}
              className={`p-3 rounded-2xl border text-left text-xs font-semibold transition-all cursor-pointer ${
                selectedKey === key
                  ? 'bg-[#0c302c] text-white border-[#0c302c] shadow-sm'
                  : 'bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100'
              }`}
            >
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* Answer Display */}
        <div className="p-5 rounded-2xl bg-gray-50 border border-gray-200 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="font-bold text-sm text-[#0c302c] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>{activeDoc.title}</span>
            </h4>
            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-gray-200 text-xs font-bold text-gray-700 hover:bg-gray-50 shadow-xs cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy Text'}</span>
            </button>
          </div>

          <p className="text-xs text-gray-700 leading-relaxed font-normal">
            {activeDoc.answer}
          </p>

          <div className="pt-2 border-t border-gray-200 text-[10px] text-gray-400 flex items-center gap-2">
            <span>Verified Source: IDLE Marketplace Developer Specifications & Part 135 Compliance Manual</span>
          </div>
        </div>
      </div>
    </div>
  );
};

