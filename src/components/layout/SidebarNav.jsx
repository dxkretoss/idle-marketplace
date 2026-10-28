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
  User, 
  Sparkles
} from 'lucide-react';

const NAV_ITEMS = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'explore', label: 'Explore', icon: Search },
  { id: 'reels', label: 'Reels', icon: PlaySquare },
  { id: 'post', label: 'Post', icon: PlusCircle, isPost: true },
  { id: 'messages', label: 'Inbox', icon: MessageSquare },
  { id: 'transactions', label: 'Bookings', icon: Briefcase },
  { id: 'enterprise', label: 'Enterprise', icon: Building2 },
  { id: 'resources', label: 'Resources', icon: Grid },
  { id: 'membership', label: 'Membership', icon: Crown },
  { id: 'profile', label: 'Profile', icon: User },
];

export const SidebarNav = () => {
  const { route, setRoute, isAuthenticated, addToast } = useApp();

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
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive = route === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'post' && !isAuthenticated) {
                  addToast('Please sign in or create an account to post a listing', 'info');
                  setRoute('auth');
                  return;
                }
                setRoute(item.id);
              }}
              className={`w-full py-2 px-1.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all group ${
                isActive 
                  ? 'bg-gradient-to-br from-[#20766c] to-[#0a5c53] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.2)]' 
                  : item.isPost 
                    ? 'text-idle-gold hover:bg-white/10' 
                    : 'text-emerald-100/80 hover:text-white hover:bg-white/10'
              }`}
              title={item.label}
              aria-label={item.label}
            >
              <Icon className={`w-5 h-5 transition-transform group-hover:scale-110 ${
                item.isPost && !isActive ? 'text-idle-gold' : ''
              }`} />
              <span className="text-[10px] font-semibold tracking-tight text-center leading-tight whitespace-nowrap">
                {item.label}
              </span>
            </button>
          );
        })}

        <div className="h-px bg-white/15 my-1 mx-2" />

        {/* Journey Special Button */}
        <button
          onClick={() => setRoute('journey')}
          className={`w-full py-2 px-1.5 rounded-xl flex flex-col items-center justify-center gap-1 transition-all group ${
            route === 'journey'
              ? 'bg-gradient-to-br from-[#d6a746] to-[#b0802e] text-[#122821] font-bold shadow-md'
              : 'text-idle-goldLight hover:bg-white/10'
          }`}
          title="Customer Journey Walkthrough"
          aria-label="Customer Journey Walkthrough"
        >
          <Sparkles className="w-5 h-5 text-idle-gold group-hover:rotate-12 transition-transform" />
          <span className="text-[10px] font-semibold text-center leading-tight whitespace-nowrap">Journey</span>
        </button>
      </div>
    </aside>
  );
};
