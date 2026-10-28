import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Search, PlaySquare, PlusCircle, User } from 'lucide-react';

const MOBILE_NAV = [
  { id: 'home', label: 'Home', icon: Home },
  { id: 'explore', label: 'Explore', icon: Search },
  { id: 'reels', label: 'Reels', icon: PlaySquare },
  { id: 'post', label: 'Post', icon: PlusCircle, isPost: true },
  { id: 'profile', label: 'Account', icon: User },
];

export const MobileBottomNav = () => {
  const { route, setRoute, isAuthenticated, addToast } = useApp();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-lg border-t border-idle-line py-1.5 px-3 flex items-center justify-around shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
      {MOBILE_NAV.map((item) => {
        const Icon = item.icon;
        const isActive = route === item.id;
        return (
          <button
            key={item.id}
            onClick={() => {
              if ((item.id === 'post' || item.id === 'profile') && !isAuthenticated) {
                addToast('Please sign in or create an account', 'info');
                setRoute('auth');
                return;
              }
              setRoute(item.id);
            }}
            className={`flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all ${
              isActive
                ? 'text-idle-emerald font-bold'
                : item.isPost
                  ? 'text-idle-gold font-bold'
                  : 'text-idle-muted hover:text-idle-emerald'
            }`}
          >
            <div className={`p-1 rounded-lg ${isActive ? 'bg-idle-mint' : ''}`}>
              <Icon className="w-5 h-5" />
            </div>
            <span className="text-[10px] mt-0.5">{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
