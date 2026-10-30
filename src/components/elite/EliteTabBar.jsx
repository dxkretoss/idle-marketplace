import React from 'react';
import { Compass, PlaySquare, Calendar, MessageSquare, User, Crown } from 'lucide-react';

export const ELITE_TABS = [
  { id: 'discover', label: 'Discover', icon: Compass },
  { id: 'reels', label: 'Reels', icon: PlaySquare },
  { id: 'events', label: 'Events', icon: Calendar },
  { id: 'inbox', label: 'Inbox', icon: MessageSquare },
  { id: 'my-elite', label: 'My Elite', icon: User }
];

export const EliteTabBar = ({ activeTab, onSelectTab }) => {
  return (
    <nav className="flex items-center justify-center p-1.5 rounded-full bg-black/60 border border-[#d7b467]/30 backdrop-blur-md shadow-xl max-w-xl mx-auto" aria-label="Elite PM sections">
      <div className="flex items-center gap-1 w-full justify-between">
        {ELITE_TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onSelectTab(tab.id)}
              className={`flex-1 py-2 px-3 rounded-full text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer select-none ${
                isActive
                  ? 'bg-gradient-to-r from-[#d7b467] to-[#aa8334] text-black shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

