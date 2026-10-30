import React from 'react';
import { Crown, Plus, Calendar, ShieldCheck, Clock, ArrowRight, Lock, Archive } from 'lucide-react';

export const EliteMyPortalTab = ({ onOpenListingModal, onOpenEventModal, onOpenReelModal }) => {
  const reservations = [
    {
      id: 'RES-901',
      asset: 'Cessna Citation X Super-Mid Jet',
      route: 'McKinney (TKI) → Aspen (ASE)',
      date: 'Nov 12, 2026',
      status: 'Escrow Token Active',
      stage: 'Tarmac Escort Scheduled',
      escrow: '$4,200 Held',
      qrReady: true
    },
    {
      id: 'RES-882',
      asset: 'Cadillac Escalade ESV Executive Chauffeur',
      route: 'Frisco Station ⇄ Addison FBO',
      date: 'Nov 12, 2026',
      status: 'Confirmed by Operator',
      stage: 'Driver Assigned',
      escrow: '$150 Pre-authorized',
      qrReady: true
    }
  ];

  const myListings = [
    {
      id: 'p-1',
      title: 'Highland Park Private Boardroom Pavilion',
      category: 'Sovereign Estates',
      rate: '$450/hr',
      status: 'Active in Private Collection',
      views: 142
    }
  ];

  return (
    <div className="space-y-6">
      {/* Member Status Card */}
      <div className="rounded-3xl border border-[#d7b467]/40 bg-gradient-to-r from-[#090d11] via-[#10171e] to-[#090d11] p-6 shadow-2xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#d7b467]/20 border border-[#d7b467]/40 text-[#d7b467] text-[10px] font-bold uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5" />
            <span>Verified Private Member Access</span>
          </div>
          <h2 className="font-serif text-2xl font-bold text-white">
            My Elite PM Activity & Vault
          </h2>
          <p className="text-xs text-gray-300 max-w-lg">
            Manage your off-market asset offerings, track dynamic QR custody boarding tokens, and review active concierge reservations.
          </p>
        </div>

        {/* 3 Quick Creator Actions */}
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={onOpenListingModal}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-[#d7b467] to-[#aa8334] text-black font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
            <span>Offer Private Listing</span>
          </button>
          <button
            type="button"
            onClick={onOpenEventModal}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/20 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-[#d7b467]" />
            <span>Host Experience</span>
          </button>
          <button
            type="button"
            onClick={onOpenReelModal}
            className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white font-bold text-xs border border-white/20 transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Clock className="w-3.5 h-3.5 text-[#d7b467]" />
            <span>Post 24h Reel</span>
          </button>
        </div>
      </div>

      {/* Reservation Workflow Tracker */}
      <div className="rounded-3xl border border-[#d7b467]/30 bg-[#090d11] p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-base font-bold text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#d7b467]" />
            <span>Reservation Workflow Tracking ({reservations.length})</span>
          </h3>
          <span className="text-[10px] text-gray-400">Escrow Protected</span>
        </div>

        <div className="space-y-3">
          {reservations.map(res => (
            <div
              key={res.id}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col md:flex-row items-start md:items-center justify-between gap-4"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-[#d7b467]">{res.id}</span>
                  <span className="text-xs font-bold text-white">{res.asset}</span>
                </div>
                <p className="text-xs text-gray-400">{res.route} · <span className="text-gray-200">{res.date}</span></p>
                <div className="flex items-center gap-3 text-[10px] text-gray-400 pt-1">
                  <span className="text-emerald-400 font-semibold">{res.status}</span>
                  <span>·</span>
                  <span>{res.stage}</span>
                  <span>·</span>
                  <span className="text-[#d7b467] font-bold">{res.escrow}</span>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="px-3 py-1.5 rounded-xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Single-Use QR Active</span>
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* My Private Listings */}
      <div className="rounded-3xl border border-[#d7b467]/30 bg-[#090d11] p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-serif text-base font-bold text-white">
            My Off-Market Private Listings ({myListings.length})
          </h3>
          <button
            type="button"
            onClick={onOpenListingModal}
            className="text-xs font-bold text-[#d7b467] hover:underline"
          >
            + New Private Listing
          </button>
        </div>

        <div className="space-y-2.5">
          {myListings.map(item => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between text-xs"
            >
              <div>
                <h5 className="font-bold text-white">{item.title}</h5>
                <span className="text-[10px] text-gray-400">{item.category} · {item.rate}</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

