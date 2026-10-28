import React from 'react';
import { useApp } from '../context/AppContext';
import { RESOURCE_GUIDES } from '../data/mockData';
import { ResourceDetailModal } from '../components/modals/ResourceDetailModal';
import { 
  UserCheck, 
  Wallet, 
  ShieldCheck, 
  Package, 
  MessageSquare, 
  MapPin, 
  QrCode, 
  Bot, 
  Scale, 
  Star, 
  Lock,
  ArrowRight,
  BookOpen
} from 'lucide-react';

const ICON_COMPONENTS = {
  UserCheck,
  Wallet,
  ShieldCheck,
  Package,
  MessageSquare,
  MapPin,
  QrCode,
  Bot,
  Scale,
  Star,
  Lock
};

export const ResourcesView = () => {
  const { setSelectedResource } = useApp();

  return (
    <div className="space-y-8 pb-16">
      {/* Page Heading */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
          Knowledge Base & Policies
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#082f2c] mt-0.5">
          Tools, Trust & Resources Directory.
        </h1>
        <p className="text-xs sm:text-sm text-idle-muted mt-1 max-w-xl">
          Everything you need to navigate membership rules, single-use QR custody handoffs, Stripe Connect payouts, and community safety in the DFW pilot.
        </p>
      </div>

      {/* 11 Resource Tiles Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {RESOURCE_GUIDES.map((item) => {
          const Icon = ICON_COMPONENTS[item.iconName] || BookOpen;
          return (
            <div
              key={item.id}
              onClick={() => setSelectedResource(item)}
              className="glass-card glass-card-hover p-5 rounded-3xl border border-idle-line flex flex-col justify-between cursor-pointer group space-y-3"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-2xl bg-idle-mint text-idle-emerald flex items-center justify-center group-hover:scale-105 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-[#f4f7f5] text-idle-muted group-hover:text-idle-emerald group-hover:bg-idle-mint transition-colors">
                    {item.badge}
                  </span>
                </div>

                <h3 className="font-serif text-base font-bold text-[#112d26] group-hover:text-idle-emerald transition-colors">
                  {item.title}
                </h3>
                <p className="text-xs text-idle-muted mt-1 leading-relaxed line-clamp-2">
                  {item.summary}
                </p>
              </div>

              <div className="flex items-center gap-1 text-xs font-bold text-idle-emerald pt-2 border-t border-idle-line/60">
                <span>Read detailed guide</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          );
        })}
      </div>

      {/* AI Help & Support Callout Banner */}
      <section className="glass-card p-6 md:p-8 rounded-3xl border border-idle-emerald/20 bg-gradient-to-r from-emerald-50/50 to-teal-50/40 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-idle-gold tracking-wider">
              24/7 Knowledge Engine
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-idle-mint text-idle-emerald font-bold">
              AI Support Active
            </span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#003d36]">
            Have a question regarding deposit holds or QR handoffs?
          </h3>
          <p className="text-xs sm:text-sm text-idle-muted max-w-xl">
            Our AI assistant answers policy questions, mediation rules, and equipment specs instantly.
          </p>
        </div>

        <button
          onClick={() => setSelectedResource(RESOURCE_GUIDES[7])}
          className="emerald-gradient-btn px-6 py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md flex-shrink-0 flex items-center gap-2"
        >
          <Bot className="w-4 h-4" />
          <span>Ask AI Assistant</span>
        </button>
      </section>

      {/* Resource Detail Modal */}
      <ResourceDetailModal />
    </div>
  );
};
