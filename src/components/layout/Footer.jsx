import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ArrowRight,
  MapPin
} from 'lucide-react';

export const Footer = () => {
  const { setRoute, setCategory, addToast } = useApp();

  return (
    <footer className="mt-12 md:mt-16 -mx-4 sm:-mx-6 md:-mx-8 border-t border-emerald-950/20 bg-gradient-to-b from-[#002621] via-[#001f1a] to-[#001411] text-white rounded-t-[32px] md:rounded-t-[36px] rounded-b-none overflow-hidden shadow-2xl relative isolate pb-4 md:pb-4">
      {/* Ambient background glow */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-idle-gold/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Top Value Banner */}
      <div className="border-b border-white/10 px-6 sm:px-10 lg:px-12 py-8 bg-white/[0.02]">
        <div className="max-w-idle mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setRoute('home')}
                className="flex items-center flex-shrink-0 cursor-pointer group"
                title="IDLE Marketplace"
              >
                <img
                  src="/IDLE_logo.png"
                  alt="IDLE"
                  className="h-7 sm:h-8 w-auto object-contain brightness-0 invert transition-transform group-hover:scale-105"
                />
              </button>
              <span className="text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-full bg-idle-gold/20 text-idle-gold border border-idle-gold/40 flex-shrink-0">
                DFW Pilot Launch
              </span>
            </div>
            <p className="text-xs text-emerald-200/70 mt-1">
              The social-first local exchange for equipment, pro skills, and business teams with zero transaction commissions.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <button
              onClick={() => setRoute('explore')}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-xs font-bold text-white transition-all cursor-pointer"
            >
              Explore Marketplace
            </button>
            <button
              onClick={() => setRoute('membership')}
              className="gold-gradient-btn px-5 py-2.5 rounded-xl text-xs font-bold shadow-md hover:brightness-105 transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>View Membership Plans</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links Grid */}
      <div className="px-6 sm:px-10 lg:px-12 pt-8 pb-3 max-w-idle mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Marketplace */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-idle-gold">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <button
                  onClick={() => { setCategory('Tools'); setRoute('explore'); }}
                  className="hover:text-idle-gold transition-colors text-left"
                >
                  Tools & Heavy Machinery
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCategory('Electronics'); setRoute('explore'); }}
                  className="hover:text-idle-gold transition-colors text-left"
                >
                  Cinema & Camera Kits
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCategory('Vehicles'); setRoute('explore'); }}
                  className="hover:text-idle-gold transition-colors text-left"
                >
                  Trucks, Vans & Trailers
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setCategory('Services'); setRoute('explore'); }}
                  className="hover:text-idle-gold transition-colors text-left"
                >
                  Local Pros & Handymen
                </button>
              </li>
              <li>
                <button
                  onClick={() => setRoute('reels')}
                  className="hover:text-idle-gold transition-colors text-left flex items-center gap-1.5"
                >
                  <span>24-Hour Video Reels</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Custody & Trust - Locked with # link and Phase 2 notice */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-idle-gold">
              Custody & Trust
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    addToast('Single-Use QR Protocol documentation will be available in Phase 2!', 'info');
                  }}
                  className="hover:text-idle-gold transition-colors text-left block cursor-pointer"
                >
                  Single-Use QR Protocol
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    addToast('$25,000 Protection Guarantee coverage will be available in Phase 2!', 'info');
                  }}
                  className="hover:text-idle-gold transition-colors text-left block cursor-pointer"
                >
                  $25,000 Protection Guarantee
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    addToast('Condition Photo Stamping will be available in Phase 2!', 'info');
                  }}
                  className="hover:text-idle-gold transition-colors text-left block cursor-pointer"
                >
                  Condition Photo Stamping
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    addToast('0% Commission Policy details will be available in Phase 2!', 'info');
                  }}
                  className="hover:text-idle-gold transition-colors text-left block cursor-pointer"
                >
                  0% Commission Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    addToast('Community Trust Guidelines will be available in Phase 2!', 'info');
                  }}
                  className="hover:text-idle-gold transition-colors text-left block cursor-pointer"
                >
                  Community Trust Guidelines
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Membership Tiers */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-idle-gold">
              Memberships
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li>
                <button
                  onClick={() => setRoute('membership')}
                  className="hover:text-idle-gold transition-colors text-left cursor-pointer"
                >
                  Free Member (0% fees)
                </button>
              </li>
              <li>
                <button
                  onClick={() => setRoute('membership')}
                  className="hover:text-idle-gold transition-colors text-left flex items-center gap-1.5 text-idle-gold font-bold cursor-pointer"
                >
                  <span>Trade Member ($15/mo)</span>
                  <span className="text-[9px] bg-idle-gold/20 px-1.5 py-0.2 rounded border border-idle-gold/40">Popular</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => setRoute('membership')}
                  className="hover:text-idle-gold transition-colors text-left cursor-pointer"
                >
                  Business Fleet ($29/mo)
                </button>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    addToast('Enterprise Workspaces will be available in Phase 2!', 'info');
                  }}
                  className="hover:text-idle-gold transition-colors text-left block cursor-pointer"
                >
                  Enterprise Workspaces
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    addToast('Interactive Customer Journey will be available in Phase 2!', 'info');
                  }}
                  className="hover:text-idle-gold transition-colors text-left block cursor-pointer"
                >
                  Interactive Customer Journey
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4: DFW Pilot Cities */}
          <div className="space-y-3">
            <h4 className="text-xs font-extrabold uppercase tracking-wider text-idle-gold">
              Service Area
            </h4>
            <ul className="space-y-2 text-xs text-emerald-100/80">
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-idle-gold flex-shrink-0" />
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCategory('All');
                    setRoute('explore');
                  }}
                  className="hover:text-idle-gold transition-colors cursor-pointer"
                >
                  Frisco & Plano, TX
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-idle-gold flex-shrink-0" />
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCategory('All');
                    setRoute('explore');
                  }}
                  className="hover:text-idle-gold transition-colors cursor-pointer"
                >
                  Dallas Metro & Uptown
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-idle-gold flex-shrink-0" />
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCategory('All');
                    setRoute('explore');
                  }}
                  className="hover:text-idle-gold transition-colors cursor-pointer"
                >
                  Fort Worth & Arlington
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-idle-gold flex-shrink-0" />
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCategory('All');
                    setRoute('explore');
                  }}
                  className="hover:text-idle-gold transition-colors cursor-pointer"
                >
                  McKinney & Allen
                </a>
              </li>
              <li className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-idle-gold flex-shrink-0" />
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setCategory('All');
                    setRoute('explore');
                  }}
                  className="hover:text-idle-gold transition-colors cursor-pointer"
                >
                  Denton & Grapevine
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-200/60">
          <div className="flex flex-wrap items-center gap-4">
            <span>&copy; {new Date().getFullYear()} IDLE Marketplace Inc.</span>
            <span>·</span>
            <span>Zero Transaction Commissions</span>
            <span>·</span>
            <span>DFW Prototype Pilot</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button
              onClick={() => setRoute('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => setRoute('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms of Service
            </button>
            <button
              onClick={() => setRoute('contact')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
