import React from 'react';
import { useApp } from '../context/AppContext';
import {
  Home,
  Search,
  HelpCircle,
  PlaySquare,
  Building2,
  Crown,
  Grid,
  ArrowRight
} from 'lucide-react';

export const NotFoundView = () => {
  const { setRoute } = useApp();

  const QUICK_LINKS = [
    {
      label: 'Explore Marketplace',
      desc: 'Discover equipment, camera gear, and verified local skills',
      icon: Search,
      action: () => setRoute('explore'),
      tag: 'Catalog'
    },
    {
      label: 'Watch Video Reels',
      desc: 'Browse 24-hr live gear demos and peer showcases',
      icon: PlaySquare,
      action: () => setRoute('reels'),
      tag: 'Stories'
    },
    {
      label: 'Membership Plans',
      desc: 'Compare Free, Studio, Business & Enterprise tiers',
      icon: Crown,
      action: () => setRoute('membership'),
      tag: 'Plans'
    },
    {
      label: 'Enterprise Operations',
      desc: 'Multi-seat teams, logistics, and fleet dispatch',
      icon: Building2,
      action: () => setRoute('enterprise'),
      tag: 'Commercial'
    },
    {
      label: 'Trust & Safety Directory',
      desc: 'Handoff guides, QR custody verification & Stripe payouts',
      icon: Grid,
      action: () => setRoute('resources'),
      tag: 'Knowledge'
    },
    {
      label: 'Member Support Desk',
      desc: 'Get in touch with the local DFW concierge team',
      icon: HelpCircle,
      action: () => setRoute('contact'),
      tag: 'Assistance'
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-8 sm:py-14 px-4 sm:px-6">
      {/* Central 404 Hero Card */}
      <div className="glass-card rounded-3xl border border-idle-line p-8 sm:p-14 text-center relative overflow-hidden shadow-glass">
        {/* Ambient background glows */}
        <div className="absolute -top-24 -left-24 w-80 h-80 bg-idle-mint/40 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-idle-gold/15 rounded-full blur-3xl pointer-events-none" />

        {/* Strictly centered vertical flex column layout */}
        <div className="relative z-10 max-w-xl mx-auto flex flex-col items-center justify-center text-center space-y-4 sm:space-y-5">
          {/* Badge */}
          <div className="flex justify-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-idle-gold/10 border border-idle-gold/30 text-[#9c6f1a] text-[11px] sm:text-xs font-semibold tracking-wider uppercase shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-idle-gold animate-pulse" />
              404 ERROR · PAGE NOT FOUND
            </div>
          </div>

          {/* Big Stylized 404 Display */}
          <div className="flex justify-center select-none py-1">
            <span className="font-serif text-8xl sm:text-9xl md:text-[130px] font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-idle-emerald via-[#136c61] to-idle-gold leading-none drop-shadow-sm">
              404
            </span>
          </div>

          {/* Headline and Description */}
          <div className="space-y-2 max-w-md mx-auto">
            <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#082f2c] tracking-tight">
              Page Not Found
            </h1>
            <p className="text-sm sm:text-base text-idle-muted leading-relaxed">
              The page you are looking for does not exist, has been removed, or was moved to another location.
            </p>
          </div>

          {/* Primary Action Buttons */}
          <div className="pt-3 flex flex-wrap items-center justify-center gap-3.5">
            <button
              onClick={() => setRoute('home')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-idle-emerald hover:bg-[#003d36] text-white font-medium text-sm shadow-md transition-all active:scale-95 group cursor-pointer"
            >
              <Home className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
              Return to Marketplace Home
            </button>
            <button
              onClick={() => setRoute('explore')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-white hover:bg-[#faf9f5] text-idle-emerald font-medium text-sm border border-idle-line shadow-sm transition-all active:scale-95 group cursor-pointer"
            >
              <Search className="w-4 h-4 transition-transform group-hover:scale-110" />
              Explore All Listings
            </button>
          </div>
        </div>
      </div>

      {/* Recommended Directories Section */}
      <div className="mt-10 space-y-4">
        <div className="text-center sm:text-left">
          <span className="text-[11px] font-bold uppercase tracking-wider text-idle-gold block">
            Popular Destinations
          </span>
          <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#082f2c] mt-0.5">
            Continue exploring IDLE Marketplace
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {QUICK_LINKS.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                onClick={item.action}
                className="glass-card glass-card-hover p-4 rounded-2xl border border-idle-line cursor-pointer group flex flex-col justify-between transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-2.5">
                    <div className="w-8 h-8 rounded-lg bg-idle-mint text-idle-emerald flex items-center justify-center transition-colors group-hover:bg-idle-emerald group-hover:text-white">
                      <Icon className="w-4 h-4" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-idle-muted bg-white/70 px-2 py-0.5 rounded-full border border-idle-line">
                      {item.tag}
                    </span>
                  </div>
                  <h3 className="font-serif text-sm font-bold text-[#082f2c] group-hover:text-idle-emerald transition-colors">
                    {item.label}
                  </h3>
                  <p className="text-xs text-idle-muted mt-1 leading-snug">
                    {item.desc}
                  </p>
                </div>
                <div className="pt-3 flex items-center text-xs font-semibold text-idle-emerald gap-1 group-hover:gap-1.5 transition-all">
                  <span>Visit section</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
