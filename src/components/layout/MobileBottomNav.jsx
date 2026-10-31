import React from 'react';
import { useApp } from '../../context/AppContext';
import { Search, Briefcase, Crown, MessageSquare, User } from 'lucide-react';

const MOBILE_NAV = [
  { id: 'explore', label: 'Explore', icon: Search },
  { id: 'bookings', label: 'Listings', icon: Briefcase },
  // Hidden per user request (kept intact for easy re-enabling)
  { id: 'elite-pm', label: 'Elite PM', icon: Crown, isElite: true, hidden: true },
  { id: 'messages', label: 'Messages', icon: MessageSquare },
  { id: 'profile', label: 'Account', icon: User },
];

export const MobileBottomNav = () => {
  const { route, setRoute, isAuthenticated, addToast } = useApp();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#070b0f]/95 backdrop-blur-xl border-t border-[#d7b467]/30 py-1.5 px-2 flex items-center justify-around shadow-[0_-4px_25px_rgba(0,0,0,0.5)]">
      {MOBILE_NAV.filter((item) => !item.hidden).map((item) => {
        const Icon = item.icon;
        const isActive = route === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              if ((item.id === 'messages' || item.id === 'profile') && !isAuthenticated) {
                addToast('Please sign in or create an account', 'info');
                setRoute('auth');
                return;
              }
              setRoute(item.id);
            }}
            className={`flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all relative cursor-pointer ${
              isActive
                ? item.isElite
                  ? 'text-[#f5e6c3] font-bold'
                  : 'text-idle-emerald font-bold'
                : item.isElite
                  ? 'text-[#d7b467] font-bold hover:text-white'
                  : 'text-gray-400 hover:text-white'
            }`}
          >
            {item.isElite ? (
              <div className="relative -mt-3 flex flex-col items-center">
                {/* Spotlight Ambient Glow */}
                <div className="absolute -top-2 w-12 h-6 bg-[#d7b467]/25 rounded-full blur-md pointer-events-none" />
                <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shadow-lg transition-transform ${
                  isActive
                    ? 'bg-gradient-to-tr from-[#d7b467] to-[#aa8334] text-[#070b0f] ring-2 ring-[#d7b467] scale-105'
                    : 'bg-[#181d22] text-[#d7b467] border border-[#d7b467]/40 hover:scale-105'
                }`}>
                  <Icon className="w-5 h-5 stroke-[2.3]" />
                </div>
                <span className="text-[9px] mt-1 font-extrabold uppercase tracking-wider text-[#d7b467]">
                  {item.label}
                </span>
              </div>
            ) : (
              <>
                <div className={`p-1 rounded-lg ${isActive ? 'text-idle-emerald' : ''}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <span className="text-[10px] mt-0.5">{item.label}</span>
              </>
            )}
          </button>
        );
      })}
    </nav>
  );
};
