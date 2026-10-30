import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Plus,
  Calendar,
  PlaySquare,
  Grid,
  Building2,
  Crown,
  ChevronRight,
  Sparkles,
  ArrowRight
} from 'lucide-react';

export const TasksView = () => {
  const { setRoute, plan, listings, reels, PLAN_REGISTRY } = useApp();

  const currentPlanMeta = PLAN_REGISTRY?.[plan] || {
    services: 4,
    rentals: 4,
    reels: 1
  };

  const serviceCount = listings.filter(l => (l.type || '').toLowerCase() === 'service' || (l.category || '').toLowerCase() === 'services').length;
  const rentalCount = listings.filter(l => (l.type || '').toLowerCase() === 'rental' || (l.type || '').toLowerCase() === 'item').length;
  const reelsCount = reels?.length || 0;

  const isFree = plan === 'Free';

  const TASK_OPTIONS = [
    {
      id: 'post',
      title: 'Create a post',
      desc: 'Tell the community what you offer or need',
      icon: Plus,
      route: 'post'
    },
    {
      id: 'bookings',
      title: 'My bookings',
      desc: 'Agreements, QR handoffs and completion',
      icon: Calendar,
      route: 'bookings'
    },
    {
      id: 'reels',
      title: 'My 24h Reels',
      desc: 'Let neighbors see what you can do',
      icon: PlaySquare,
      route: 'reels'
    },
    {
      id: 'resources',
      title: 'Tools & Resources',
      desc: 'Independent services and business tools',
      icon: Grid,
      route: 'resources'
    },
    {
      id: 'enterprise',
      title: 'My business team',
      desc: 'Seats, approvals and assignments',
      icon: Building2,
      route: 'enterprise'
    },
    {
      id: 'membership',
      title: 'Membership',
      desc: 'View limits and upgrade access',
      icon: Crown,
      route: 'membership'
    }
  ];

  const formatCapacity = (count, max) => {
    if (!Number.isFinite(max) || max === 0) {
      return `${count} active · fair use`;
    }
    return `${count} of ${max}`;
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Page Heading */}
      <div className="space-y-1">
        <div className="text-[11px] font-extrabold uppercase tracking-widest text-[#9b782c]">
          YOUR WORKSPACE
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#003f35] tracking-tight">
          Make it happen.
        </h1>
        <p className="text-sm text-[#596e64]">
          Manage your posts, booking records, jobs and resources from one organized place.
        </p>
      </div>

      {/* Mini Demo Welcome Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#f1f8f2] border border-[#d4e5dc] rounded-2xl p-4 sm:p-5">
        <div className="space-y-1">
          <div className="flex items-center gap-1.5 font-bold text-sm text-[#004f46]">
            <Sparkles className="w-4 h-4 text-[#ba8b3b]" />
            <span>Need a full demo?</span>
          </div>
          <p className="text-xs text-[#596e64]">
            Switch tiers, act as customer/provider, negotiate, publish and manage bookings.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setRoute('owner')}
          className="gold-gradient-btn px-4 py-2.5 rounded-xl font-bold text-xs shadow-sm cursor-pointer whitespace-nowrap shrink-0 hover:opacity-95 transition-opacity"
        >
          Open Owner Preview
        </button>
      </div>

      {/* 6 Quick Action Hub Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {TASK_OPTIONS.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setRoute(item.route)}
              className="flex items-center gap-3.5 text-left bg-white border border-[#dbe6df] hover:border-[#004f46]/40 hover:bg-[#f9fcfb] rounded-2xl p-4 transition-all group cursor-pointer shadow-xs"
            >
              <span className="w-11 h-11 rounded-xl bg-[#e1f6f1] group-hover:bg-[#d0efe8] flex items-center justify-center shrink-0 text-[#004f46] transition-colors">
                <Icon className="w-5 h-5 stroke-[2.2]" />
              </span>

              <div className="flex-1 min-w-0">
                <strong className="block text-sm font-bold text-[#004f46] group-hover:text-[#003730] truncate">
                  {item.title}
                </strong>
                <small className="block text-xs text-[#6b7c72] truncate mt-0.5">
                  {item.desc}
                </small>
              </div>

              <ChevronRight className="w-4 h-4 text-[#a3b5ab] group-hover:text-[#004f46] group-hover:translate-x-0.5 transition-all shrink-0" />
            </button>
          );
        })}
      </div>

      {/* Current Access & Capacity Panel */}
      <section className="bg-white border border-[#e5ece6] rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
        <h3 className="font-bold text-base text-[#004f46]">
          Current access: {plan}
        </h3>
        <p className="text-xs text-[#6b7c72] leading-relaxed">
          Service/task listing capacity: <strong className="text-[#004f46] font-semibold">{formatCapacity(serviceCount, currentPlanMeta.services)}</strong> · Rental listing capacity: <strong className="text-[#004f46] font-semibold">{formatCapacity(rentalCount, currentPlanMeta.rentals)}</strong> · 24-hour promotional Reels: <strong className="text-[#004f46] font-semibold">{formatCapacity(reelsCount, currentPlanMeta.reels)}</strong>.
        </p>

        <div className="pt-2">
          {isFree ? (
            <button
              type="button"
              onClick={() => setRoute('membership')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#004f46] hover:bg-[#003831] text-white font-bold text-xs transition-colors cursor-pointer"
            >
              <span>Unlock Studio →</span>
            </button>
          ) : (
            <button
              type="button"
              onClick={() => setRoute('post')}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#004f46] text-[#004f46] hover:bg-[#e1f6f1] font-bold text-xs transition-colors cursor-pointer"
            >
              <span>Create another local demo post →</span>
            </button>
          )}
        </div>
      </section>
    </div>
  );
};

