import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Search, MessageSquare, User } from 'lucide-react';

// Exactly 4 core destinations to keep mobile navigation clean and spacious
const MOBILE_NAV = [
  { id: 'home', label: 'Home', icon: Home, matchRoutes: ['home'] },
  { id: 'explore', label: 'Explore', icon: Search, matchRoutes: ['explore', 'reels', 'tasks'] },
  { id: 'messages', label: 'Messages', icon: MessageSquare, matchRoutes: ['messages'] },
  { id: 'profile', label: 'Account', icon: User, matchRoutes: ['profile', 'bookings', 'membership', 'enterprise', 'resources', 'onboarding'] }
];

export const MobileBottomNav = () => {
  const { route, setRoute, isAuthenticated, addToast } = useApp();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-[#dce6df] py-1.5 px-2 sm:px-4 flex items-center justify-around shadow-[0_-4px_25px_rgba(0,35,25,0.08)]">
      {MOBILE_NAV.map((item) => {
        const Icon = item.icon;
        const isActive = item.matchRoutes.includes(route);

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
            className={`flex flex-col items-center justify-center py-1 px-3 sm:px-4 rounded-2xl transition-all relative cursor-pointer ${
              isActive
                ? 'bg-idle-mint text-[#004f46] font-bold border border-idle-emerald/25 shadow-2xs'
                : 'text-[#637970] hover:text-[#004f46] hover:bg-black/5'
            }`}
            aria-label={item.label}
          >
            {/* Top Indicator Dot on Active Tab */}
            {isActive && (
              <span className="absolute -top-1 w-1.5 h-1.5 rounded-full bg-idle-emerald shadow-xs" />
            )}

            <div className="flex flex-col items-center justify-center">
              <Icon className={`w-5 h-5 transition-transform ${isActive ? 'text-[#004f46] stroke-[2.4] scale-105' : 'stroke-[1.8]'}`} />
              <span className={`text-[10px] mt-0.5 tracking-tight ${isActive ? 'font-extrabold text-[#004f46]' : 'font-medium text-[#637970]'}`}>
                {item.label}
              </span>
            </div>
          </button>
        );
      })}
    </nav>
  );
};
