import React from 'react';
import { useAdmin, ADMIN_NAV_GROUPS } from '../../context/AdminContext';
import { useApp } from '../../context/AppContext';
import {
  LayoutDashboard,
  Users,
  Package,
  MessageSquare,
  ArrowLeftRight,
  CreditCard,
  Crown,
  PlaySquare,
  Users2,
  Sparkles,
  Settings,
  Grid,
  FileText,
  ArrowLeft,
  LogOut,
  ShieldAlert
} from 'lucide-react';

const ICON_MAP = {
  overview: LayoutDashboard,
  members: Users,
  listings: Package,
  support: MessageSquare,
  transactions: ArrowLeftRight,
  subscriptions: CreditCard,
  elite: Crown,
  reels: PlaySquare,
  teams: Users2,
  ai: Sparkles,
  automations: Settings,
  resources: Grid,
  audit: FileText
};

export const AdminSidebar = () => {
  const { role, activeView, setActiveView, can, adminData, logoutAdmin } = useAdmin();
  const { setRoute } = useApp();

  const openTicketsCount = adminData.tickets.filter(t => t.status === 'Open').length;

  return (
    <aside className="w-64 bg-[#0a2622] text-[#ecf6f1] flex flex-col h-screen flex-shrink-0 border-r border-[#1e443c] select-none">
      {/* Brand Header */}
      <div className="p-5 border-b border-[#1e443c]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-black tracking-wider text-white">
              IDLE
            </span>
            <span className="text-[10px] font-black uppercase tracking-widest bg-[#d9b972] text-[#0a2622] px-2 py-0.5 rounded shadow-sm">
              Admin
            </span>
          </div>
        </div>
        <p className="text-[11px] text-[#8fb8a8] mt-2 font-normal leading-relaxed">
          Owner Operations Center · North Texas Metro
        </p>
      </div>

      {/* Navigation Sections */}
      <div className="flex-1 overflow-y-auto p-3 space-y-5 no-scrollbar">
        {ADMIN_NAV_GROUPS.map(([groupLabel, entries]) => {
          // Filter entries permitted by active role
          const permittedEntries = entries.filter(([id]) => can(id));
          if (!permittedEntries.length) return null;

          return (
            <div key={groupLabel} className="space-y-1">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#729e8e] px-3 block mb-1.5">
                {groupLabel}
              </span>

              {permittedEntries.map(([id, label]) => {
                const IconComponent = ICON_MAP[id] || Grid;
                const isActive = activeView === id;

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setActiveView(id)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#d9b972] text-[#0a2622] font-bold shadow-md'
                        : 'text-[#c2ded3] hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <IconComponent className={`w-4 h-4 ${isActive ? 'text-[#0a2622]' : 'text-[#8fb8a8]'}`} />
                      <span>{label}</span>
                    </div>

                    {id === 'support' && openTicketsCount > 0 && (
                      <span className={`text-[10px] font-black px-1.5 py-0.5 rounded-full ${
                        isActive ? 'bg-[#0a2622] text-[#d9b972]' : 'bg-[#d9b972] text-[#0a2622]'
                      }`}>
                        {openTicketsCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          );
        })}
      </div>

      {/* Footer Controls */}
      <div className="p-3 border-t border-[#1e443c] space-y-1.5 bg-[#08201d]">
        <button
          type="button"
          onClick={() => setRoute('home')}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-[#8fb8a8] hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Open Marketplace</span>
        </button>

        <button
          type="button"
          onClick={logoutAdmin}
          className="w-full flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-semibold text-rose-300 hover:text-rose-200 hover:bg-rose-950/30 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Lock Console</span>
        </button>
      </div>
    </aside>
  );
};

