import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Crown,
  User,
  Briefcase,
  PlaySquare,
  Package,
  Calendar,
  Grid
} from 'lucide-react';

export const OwnerSandboxView = () => {
  const {
    setRoute,
    plan,
    setPlan,
    ownerRole,
    setOwnerRole,
    seedOwnerDemo,
    user,
    listings,
    bookings,
    inbox,
    reels,
    PLAN_REGISTRY
  } = useApp();

  const currentPlanMeta = PLAN_REGISTRY?.[plan] || {
    price: 0,
    seats: 1,
    services: 0,
    rentals: 0,
    reels: 0
  };

  const serviceCount = listings.filter(
    l => (l.type || '').toLowerCase() === 'service' || (l.category || '').toLowerCase() === 'services'
  ).length;

  const rentalCount = listings.filter(
    l => (l.type || '').toLowerCase() === 'rental' || (l.type || '').toLowerCase() === 'item'
  ).length;

  const isElite = plan === 'Elite PM';

  const steps = [
    {
      num: '01',
      title: 'Set up your Studio',
      desc: 'Create example inventory, customer inquiries and offers',
      action: seedOwnerDemo
    },
    {
      num: '02',
      title: 'Publish and manage listings',
      desc: 'Post, upload a photo, edit and archive rentals or work',
      action: () => setRoute('post')
    },
    {
      num: '03',
      title: 'Negotiate both sides',
      desc: 'Switch between customer and provider; make and accept offers',
      action: () => setRoute('messages')
    },
    {
      num: '04',
      title: 'Process a booking',
      desc: 'Preview dates, agreements, payments, handoffs and reviews',
      action: () => setRoute('bookings')
    },
    {
      num: '05',
      title: 'Run your local business',
      desc: 'Add team members, assign jobs and browse optional resources',
      action: () => setRoute('enterprise')
    }
  ];

  const activityTiles = [
    {
      id: 'profile',
      title: 'Profile and membership',
      desc: `${user?.name || 'Your Account'} · ${isElite ? 'Elite PM all-access' : plan}`,
      route: 'profile'
    },
    {
      id: 'post',
      title: 'Your posts',
      desc: `${listings.length} saved / 0 archived`,
      route: 'post'
    },
    {
      id: 'messages',
      title: 'Inbox & negotiations',
      desc: `${inbox.length} threads · ${ownerRole || 'customer'} role`,
      route: 'messages'
    },
    {
      id: 'bookings',
      title: 'Booking pipeline',
      desc: `${bookings.length} records`,
      route: 'bookings'
    },
    {
      id: 'reels',
      title: '24-hour Reels',
      desc: `${reels.length} local media posts`,
      route: 'reels'
    },
    {
      id: 'resources',
      title: 'Self-service resources',
      desc: '11 categories · external tools',
      route: 'resources'
    }
  ];

  return (
    <div className="space-y-6 pb-16 max-w-5xl mx-auto">
      {/* Optional Elite PM Notice Banner */}
      {isElite && (
        <div className="p-4 sm:p-5 bg-[#102c23] text-[#f4e1ae] border border-[#c0a166] rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md">
          <div className="space-y-1">
            <strong className="block text-sm font-bold text-[#f5e6c3]">
              ♛ Elite PM · Private Members owner preview is active
            </strong>
            <p className="text-xs text-[#e2e8dd] leading-relaxed max-w-2xl">
              Public IDLE features, earning tools, Reels, messaging and organizational workspaces are included in this demonstration.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setRoute('elite-pm')}
            className="gold-gradient-btn px-4 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer whitespace-nowrap shrink-0"
          >
            Open Elite PM ↗
          </button>
        </div>
      )}

      {/* Emerald Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-[#003a34] via-[#004f46] to-[#0b6257] p-6 sm:p-10 text-white shadow-xl relative overflow-hidden space-y-4">
        <div className="space-y-2 relative z-10">
          <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#efd39c]">
            IDLE / OWNER INTERACTIVE EXPERIENCE
          </div>

          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight leading-tight">
            Run IDLE before it launches.
          </h1>

          <p className="text-xs sm:text-sm text-[#d9eee5] max-w-2xl leading-relaxed">
            Use this private browser sandbox like a real account. Every control below changes demo activity only. Nothing is charged, published, verified or sent to another user.
          </p>
        </div>

        {/* Hero Actions */}
        <div className="flex flex-wrap items-center gap-3 pt-3 relative z-10">
          <button
            type="button"
            onClick={seedOwnerDemo}
            className="px-5 py-3 rounded-xl bg-gradient-to-r from-[#d9b972] to-[#b89547] hover:from-[#e3c582] hover:to-[#c4a151] text-[#0a2622] font-bold text-xs shadow-lg flex items-center gap-2 cursor-pointer transition-transform active:scale-98"
          >
            <Sparkles className="w-4 h-4" />
            <span>✦ Load my example Studio business</span>
          </button>

          <button
            type="button"
            onClick={() => setRoute('explore')}
            className="px-5 py-3 rounded-xl bg-transparent hover:bg-white/10 text-white font-bold text-xs border border-[#e0efea] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <span>Explore as a customer →</span>
          </button>
        </div>
      </div>

      {/* Owner Access Control Console */}
      <div className="bg-white border border-[#d5e2db] rounded-[19px] p-5 sm:p-7 shadow-xs space-y-6">
        {/* Head */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#004f46]">
              Owner access control
            </h2>
            <p className="text-xs text-[#596e64] mt-0.5">
              Switch tiers instantly; actual plan capacities remain enforced so you can test upgrades.
            </p>
          </div>

          <span className="text-[10px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full bg-[#f4f7f5] text-[#ba8b3b] border border-[#d5e2db] shrink-0">
            SANDBOX · NO PAYMENTS
          </span>
        </div>

        {/* 5 Plan Option Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {Object.entries(PLAN_REGISTRY || {}).map(([name, p]) => {
            const isSelected = name === plan;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setPlan(name)}
                className={`flex flex-col items-start gap-2 p-3.5 rounded-2xl text-left transition-all cursor-pointer min-h-[115px] ${
                  isSelected
                    ? 'bg-[#e1f6f1] border-2 border-[#004f46] shadow-[0_0_0_2px_rgba(0,79,70,0.1)] text-[#004f46]'
                    : 'bg-white border border-[#dbe6df] hover:border-[#004f46]/40 hover:bg-[#fbfcfa] text-[#004f46]'
                }`}
              >
                <strong className="text-xs font-bold leading-none">{name}</strong>
                <b className="text-2xl font-black text-[#004f46] tracking-tight leading-none my-1">
                  ${p.price}
                  <small className="text-[11px] font-semibold text-[#6e7d73]">/mo</small>
                </b>
                <span className="text-[11px] text-[#6e7d73] mt-auto">
                  {p.seats} {p.seats === 1 ? 'user' : 'seats'}
                </span>
              </button>
            );
          })}
        </div>

        {/* Two-Sided Role Switcher Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-4 border-t border-[#e0eae2]">
          <div>
            <strong className="block text-sm font-bold text-[#004f46]">
              Try either side of a transaction
            </strong>
            <p className="text-xs text-[#596e64] mt-0.5">
              Customer inquiries and provider replies are simulated locally.
            </p>
          </div>

          <div className="inline-flex bg-[#f1f5f2] p-1 rounded-xl gap-1 shrink-0">
            <button
              type="button"
              onClick={() => setOwnerRole('customer')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                (ownerRole || 'customer') === 'customer'
                  ? 'bg-[#004f46] text-white shadow-xs'
                  : 'text-[#004f46] hover:bg-white/60'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Customer</span>
            </button>

            <button
              type="button"
              onClick={() => setOwnerRole('provider')}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                (ownerRole || 'customer') === 'provider'
                  ? 'bg-[#004f46] text-white shadow-xs'
                  : 'text-[#004f46] hover:bg-white/60'
              }`}
            >
              <Briefcase className="w-3.5 h-3.5" />
              <span>Provider</span>
            </button>
          </div>
        </div>

        {/* Owner Live Stats Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="bg-[#f4f8f5] rounded-xl p-3.5 flex flex-col gap-1">
            <b className="text-2xl font-bold text-[#004f46] tracking-tight">
              {serviceCount}
              <span className="text-xs text-[#7a8d82] font-normal ml-1">
                / {Number.isFinite(currentPlanMeta.services) && currentPlanMeta.services > 0 ? currentPlanMeta.services : 'fair use'}
              </span>
            </b>
            <small className="text-xs text-[#51685d]">Active service/task posts</small>
          </div>

          <div className="bg-[#f4f8f5] rounded-xl p-3.5 flex flex-col gap-1">
            <b className="text-2xl font-bold text-[#004f46] tracking-tight">
              {rentalCount}
              <span className="text-xs text-[#7a8d82] font-normal ml-1">
                / {Number.isFinite(currentPlanMeta.rentals) && currentPlanMeta.rentals > 0 ? currentPlanMeta.rentals : 'fair use'}
              </span>
            </b>
            <small className="text-xs text-[#51685d]">Active rental posts</small>
          </div>

          <div className="bg-[#f4f8f5] rounded-xl p-3.5 flex flex-col gap-1">
            <b className="text-2xl font-bold text-[#004f46] tracking-tight">
              {inbox.length}
            </b>
            <small className="text-xs text-[#51685d]">Conversation threads</small>
          </div>

          <div className="bg-[#f4f8f5] rounded-xl p-3.5 flex flex-col gap-1">
            <b className="text-2xl font-bold text-[#004f46] tracking-tight">
              {bookings.length}
            </b>
            <small className="text-xs text-[#51685d]">Booking records</small>
          </div>
        </div>
      </div>

      {/* Owner Lower Grid (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Left: Interactive Owner Walkthrough */}
        <div className="bg-white border border-[#dce6df] rounded-2xl p-5 sm:p-6 space-y-4">
          <div>
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#9b782c]">
              INTERACTIVE OWNER WALKTHROUGH
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#004f46] mt-0.5">
              Your marketplace, end to end.
            </h2>
          </div>

          <div className="space-y-2.5">
            {steps.map((step) => (
              <button
                key={step.num}
                type="button"
                onClick={step.action}
                className="w-full grid grid-cols-[36px_1fr_auto] items-center gap-3 p-3 rounded-xl border border-[#e0e9e2] bg-[#fbfcfa] hover:bg-[#e1f6f1] transition-colors text-left cursor-pointer group"
              >
                <span className="text-xs font-black text-[#ba8b3b] font-mono">
                  {step.num}
                </span>

                <span className="min-w-0">
                  <strong className="block text-xs font-bold text-[#004f46] group-hover:text-[#00342e]">
                    {step.title}
                  </strong>
                  <small className="block text-[11px] text-[#617569] mt-0.5 leading-snug">
                    {step.desc}
                  </small>
                </span>

                <span className="text-sm font-bold text-[#ba8b3b] group-hover:translate-x-0.5 transition-transform">
                  ↗
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Your Demo Activity */}
        <div className="bg-white border border-[#dce6df] rounded-2xl p-5 sm:p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div>
              <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#9b782c]">
                YOUR DEMO ACTIVITY
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#004f46] mt-0.5">
                What's happening now.
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {activityTiles.map((tile) => (
                <button
                  key={tile.id}
                  type="button"
                  onClick={() => setRoute(tile.route)}
                  className="p-3.5 rounded-xl border border-[#dfe9e2] bg-[#fbfcfa] hover:bg-[#e1f6f1] transition-colors flex flex-col justify-between min-h-[92px] text-left cursor-pointer group"
                >
                  <div>
                    <strong className="block text-xs font-bold text-[#004f46] group-hover:text-[#00342e]">
                      {tile.title}
                    </strong>
                    <small className="block text-[11px] text-[#617569] mt-1 leading-snug">
                      {tile.desc}
                    </small>
                  </div>
                  <span className="self-end text-xs font-bold text-[#ba8b3b] group-hover:translate-x-0.5 transition-transform">
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Disclaimer Note */}
          <div className="border-t border-[#dbe7df] pt-4 text-xs text-[#5d7065] leading-relaxed">
            <strong className="block text-[#004f46] font-bold mb-1">
              What Owner Preview does not do
            </strong>
            <p>
              There are no real customers, money transfers, ID checks, notifications, arbitration handoffs, or shared cloud accounts. A live launch requires the secure backend described in the developer guide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
