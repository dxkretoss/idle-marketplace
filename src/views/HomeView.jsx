import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { ListingCard } from '../components/listings/ListingCard';
import { StoriesStrip } from '../components/reels/StoriesStrip';
import { ReelUploadModal } from '../components/modals/ReelUploadModal';
import { 
  ShieldCheck, 
  Users, 
  Building2, 
  Play, 
  ArrowRight, 
  Sparkles,
  Crown,
  ChevronRight
} from 'lucide-react';

export const HomeView = () => {
  const { setRoute, setCategory, listings } = useApp();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const handleCategoryClick = (catId) => {
    setCategory(catId);
    setRoute('explore');
  };

  const featuredListings = listings.slice(0, 8);

  return (
    <div className="space-y-10 pb-16">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-[#073d36] min-h-[400px] flex items-center shadow-glass border border-emerald-950/20 isolate">
        {/* Background Photography with Emerald Gradient Overlay */}
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1800&q=85"
          alt="Local collaboration"
          className="absolute inset-0 w-full h-full object-cover object-center -z-20 opacity-40 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#01231e]/95 via-[#022420]/85 to-[#00201b]/40 -z-10" />

        {/* Hero Content */}
        <div className="p-6 md:p-12 max-w-xl text-white space-y-4">
          <span className="text-[11px] uppercase tracking-widest font-extrabold text-idle-gold block">
            The Opportunity Around You
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
            Get more <br/>from what <br/>
            <span className="text-idle-goldLight italic font-normal">you own.</span>
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-emerald-100/90 leading-relaxed max-w-md">
            Rent. Lend. Get help. Earn. A social-first local marketplace for equipment, skills, and business teams with zero transaction commissions.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setRoute('explore')}
              className="gold-gradient-btn px-6 py-3 rounded-xl text-xs md:text-sm font-bold shadow-lg flex items-center gap-2"
            >
              <span>Explore Marketplace</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setRoute('reels')}
              className="px-5 py-3 rounded-xl text-xs md:text-sm font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all flex items-center gap-2"
            >
              <Play className="w-4 h-4 text-idle-gold fill-idle-gold" />
              <span>Watch Reels</span>
            </button>
          </div>
        </div>

        {/* Modern Live Trust & Handoff Showcase Card (Desktop) */}
        <div className="hidden lg:flex flex-col gap-3 absolute right-8 xl:right-12 top-1/2 -translate-y-1/2 w-80 xl:w-[340px] glass-dark p-5 rounded-3xl border border-white/20 shadow-2xl backdrop-blur-xl">
          {/* Header pill with live pulse */}
          <div className="flex items-center justify-between pb-2.5 border-b border-white/10">
            <span className="flex items-center gap-1.5 text-[10px] font-extrabold uppercase tracking-wider text-idle-gold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>DFW Pilot Handoff</span>
            </span>
            <span className="text-[10px] text-emerald-200/80 font-bold px-2 py-0.5 rounded-full bg-white/10">
              0% Commission
            </span>
          </div>

          {/* Interactive Live Custody Demo Card */}
          <div className="p-3 rounded-2xl bg-white/10 border border-white/15 space-y-2.5">
            <div className="flex items-center gap-3">
              <img 
                src="https://images.unsplash.com/photo-1579273166152-d725a4e2b755?auto=format&fit=crop&w=300&q=80" 
                alt="Excavator" 
                className="w-12 h-12 rounded-xl object-cover border border-white/20 flex-shrink-0"
              />
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-white truncate block">Compact Excavator</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-idle-gold flex-shrink-0" />
                </div>
                <span className="text-[11px] text-emerald-200/80 block">Northline Rentals · Frisco, TX</span>
                <span className="text-xs font-extrabold text-idle-gold mt-0.5 block">$250 / day</span>
              </div>
            </div>

            {/* QR Custody Transfer Token */}
            <div className="p-2.5 rounded-xl bg-[#002621]/90 border border-white/15 flex items-center justify-between gap-2.5">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-idle-gold/20 text-idle-gold">
                  <QrCode className="w-4 h-4" />
                </div>
                <div>
                  <strong className="block text-[11px] font-bold text-white leading-tight">Single-Use QR Handoff</strong>
                  <span className="text-[9px] text-emerald-300/80">Transfer #8901 · Verified</span>
                </div>
              </div>
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                Active
              </span>
            </div>
          </div>

          {/* 2 Key Value Badges */}
          <div className="grid grid-cols-2 gap-2 text-[11px]">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <Zap className="w-4 h-4 text-idle-gold flex-shrink-0" />
              <div>
                <strong className="block text-white text-[11px] leading-tight">0% Cut</strong>
                <span className="text-[9px] text-emerald-200/70">Keep 100%</span>
              </div>
            </div>

            <div className="p-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2">
              <Users className="w-4 h-4 text-idle-gold flex-shrink-0" />
              <div>
                <strong className="block text-white text-[11px] leading-tight">24h Reels</strong>
                <span className="text-[9px] text-emerald-200/70">Local verified</span>
              </div>
            </div>
          </div>

          {/* CTA Link to Bookings & QR Custody */}
          <button
            onClick={() => setRoute('transactions')}
            className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-idle-gold to-[#c49233] text-[#122821] text-xs font-bold shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>See Live Custody Walkthrough</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Disclaimer note */}
        <div className="absolute right-4 bottom-3 text-[10px] text-emerald-200/50 hidden sm:block">
          DFW Pilot Launch Prototype · North Texas
        </div>
      </section>

      {/* 24-Hour Reels Stories Strip */}
      <section>
        <StoriesStrip onOpenUpload={() => setUploadModalOpen(true)} />
      </section>

      {/* Shop by Category Tiles */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
              Make More Possible
            </span>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#082f2c] flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-idle-emerald inline-block" />
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => {
              setCategory('All');
              setRoute('explore');
            }}
            className="text-xs font-bold text-idle-emerald hover:text-idle-teal transition-colors flex items-center gap-1"
          >
            <span>All categories</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {CATEGORIES.filter(c => c.id !== 'All').map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.id)}
              className="glass-card glass-card-hover p-2.5 rounded-2xl flex flex-col text-left group overflow-hidden"
            >
              <div className="h-28 rounded-xl overflow-hidden bg-emerald-950/10 mb-2">
                <img
                  src={cat.image}
                  alt={cat.label}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
              </div>
              <strong className="text-xs font-bold text-[#112d26] group-hover:text-idle-emerald line-clamp-1">
                {cat.label}
              </strong>
              <p className="text-[10px] text-idle-muted line-clamp-1 mt-0.5">
                {cat.description}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* Featured Listings Grid */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
              Curated for Discovery
            </span>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#082f2c] flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-idle-emerald inline-block" />
              Featured Near You
            </h2>
          </div>
          <button
            onClick={() => setRoute('explore')}
            className="text-xs font-bold text-idle-emerald hover:text-idle-teal transition-colors flex items-center gap-1"
          >
            <span>View all listings</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* Promotional Triple Panels */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          onClick={() => setRoute('enterprise')}
          className="glass-card glass-card-hover p-5 rounded-2xl cursor-pointer relative overflow-hidden group flex flex-col justify-between min-h-[160px]"
        >
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-idle-gold tracking-wider">Enterprise Teams</span>
            <h3 className="font-serif text-lg font-bold text-[#0d2e29]">Fleet, Staffing & Workspaces</h3>
            <p className="text-xs text-idle-muted">Coordinate field workers, approvals, and inventory handoffs.</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-idle-emerald pt-3">
            <span>Explore enterprise hub</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div 
          onClick={() => {
            setCategory('Services');
            setRoute('explore');
          }}
          className="glass-card glass-card-hover p-5 rounded-2xl cursor-pointer relative overflow-hidden group flex flex-col justify-between min-h-[160px]"
        >
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-idle-gold tracking-wider">Trusted Skills</span>
            <h3 className="font-serif text-lg font-bold text-[#0d2e29]">Meet Local Pros & Crews</h3>
            <p className="text-xs text-idle-muted">Handymen, personal trainers, moving crews & stylists near you.</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-idle-emerald pt-3">
            <span>Find local experts</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div 
          onClick={() => {
            setCategory('Events');
            setRoute('explore');
          }}
          className="glass-card glass-card-hover p-5 rounded-2xl cursor-pointer relative overflow-hidden group flex flex-col justify-between min-h-[160px]"
        >
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-idle-gold tracking-wider">Events & Pop-ups</span>
            <h3 className="font-serif text-lg font-bold text-[#0d2e29]">Occasions & Experiences</h3>
            <p className="text-xs text-idle-muted">Tents, cinema gear, audio systems & catering pop-up trailers.</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-idle-emerald pt-3">
            <span>Browse event rentals</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </section>

      {/* Membership Banner */}
      <section className="rounded-3xl p-6 md:p-8 bg-gradient-to-r from-[#003d36] via-[#004f46] to-[#0c6559] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-idle-gold block">
            Zero Commission Marketplace
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold">
            Browse free. Earn with Trade.
          </h2>
          <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed">
            Free members can search and submit requests. Unlock unlimited listings, 24h promotional Reels, and direct paid member chat starting at $15/month with zero cut taken from your earnings.
          </p>
        </div>
        <button
          onClick={() => setRoute('membership')}
          className="gold-gradient-btn px-6 py-3 rounded-xl text-xs md:text-sm font-bold shadow-lg flex-shrink-0 flex items-center gap-2"
        >
          <Crown className="w-4 h-4 stroke-[2.2]" />
          <span>Compare Memberships</span>
        </button>
      </section>

      {/* Reel Upload Modal */}
      <ReelUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </div>
  );
};
