import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Home,
  Search,
  PlaySquare,
  PlusCircle,
  MessageSquare,
  Briefcase,
  Building2,
  Grid,
  Crown,
  User
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'explore', label: 'Explore', icon: Search },
  // Hidden per user request (kept intact for easy re-enabling)
  { id: 'elite-pm', label: 'Elite PM', icon: Crown, isElite: true, hidden: true },
  { id: 'reels', label: 'Reels', icon: PlaySquare },
  { id: 'post', label: 'Post', icon: PlusCircle, isPost: true },
  { id: 'messages', label: 'Inbox', icon: MessageSquare },
  { id: 'bookings', label: 'Bookings', icon: Briefcase },
  { id: 'enterprise', label: 'Enterprise', icon: Building2 },
  { id: 'resources', label: 'Resources', icon: Grid },
  { id: 'membership', label: 'Membership', icon: Crown },
  { id: 'profile', label: 'Profile', icon: User }
];

export const SidebarNav = () => {
  const { route, setRoute, isAuthenticated, openAuth, addToast } = useApp();

  return (
    <aside className="hidden md:flex flex-col sticky top-0 h-screen w-[92px] flex-shrink-0 glass-sidebar text-white px-2 py-3 z-40 select-none border-r border-emerald-950/40">
      {/* Brand Side Mark from HTML Prototype */}
      <div
        onClick={() => setRoute('home')}
        className="h-[47px] flex items-center justify-center cursor-pointer mb-1.5 group"
        title="IDLE Marketplace"
      >
        <span className="font-serif text-[28px] text-[#d7b467] font-bold leading-none select-none transition-transform group-hover:scale-110">
          ∞
        </span>
      </div>

      {/* Divider line after logo */}
      <div className="h-px bg-white/15 mb-2 mx-1" />

      {/* Nav Scroll Container */}
      <div className="flex-1 flex flex-col gap-1 overflow-y-auto no-scrollbar py-1">
        {NAV_ITEMS.filter((item) => !item.hidden).map((item) => {
          const Icon = item.icon;
          const isActive = route === item.id || (item.id === 'bookings' && route === 'transactions');
          const isElite = item.id === 'elite-pm' || item.isElite;

          return (
            <button
              type="button"
              key={item.id}
              onClick={() => {
                if (item.id === 'post' && !isAuthenticated) {
                  addToast('Please sign in or create an account to post a listing', 'info');
                  if (openAuth) {
                    openAuth('signin');
                  } else {
                    setRoute('auth');
                  }
                  return;
                }
                setRoute(item.id);
              }}
              className={`w-full py-2 px-1.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all group cursor-pointer ${
                isElite
                  ? isActive
                    ? 'bg-gradient-to-b from-[#faedd1] via-[#d7b467] to-[#aa8334] text-[#05070a] shadow-md font-black'
                    : 'text-idle-gold hover:text-white hover:bg-white/10'
                  : isActive
                    ? 'bg-gradient-to-br from-[#20766c] to-[#0a5c53] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)] font-bold'
                    : item.isPost
                      ? 'text-idle-gold hover:text-white hover:bg-idle-gold/20 font-bold'
                      : 'text-emerald-100/80 hover:text-white hover:bg-white/10'
              }`}
              title={item.label}
              aria-label={item.label}
            >
              <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                isElite
                  ? isActive
                    ? 'text-[#05070a] stroke-[2.4]'
                    : 'text-idle-gold stroke-[2.2]'
                  : item.isPost && !isActive
                    ? 'text-idle-gold'
                    : ''
              }`} />
              <span className={`text-[10px] text-center leading-tight whitespace-nowrap ${
                isElite
                  ? isActive
                    ? 'font-black text-[#05070a]'
                    : 'font-semibold text-idle-gold group-hover:text-white'
                  : 'font-semibold'
              }`}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </aside>
  );
};
