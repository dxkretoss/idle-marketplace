import React from 'react';
import { Crown, Sparkles } from 'lucide-react';

const ELITE_STORIES = [
  { id: 'st-1', title: 'Exotics at TKI', host: 'Apex Charter', img: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=300&q=80', active: true },
  { id: 'st-2', title: 'Highland Park Villa', host: 'Park Cities Trust', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=300&q=80', active: true },
  { id: 'st-3', title: 'Maybach Transfer', host: 'Blackline Livery', img: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=300&q=80', active: true },
  { id: 'st-4', title: 'Citation X Empty Leg', host: 'Lone Star Jet', img: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=300&q=80', active: true },
  { id: 'st-5', title: 'Frisco Pavilion Dinner', host: 'Stonebriar VIP', img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80', active: false },
  { id: 'st-6', title: 'Westlake Helipad', host: 'Executive Retreat', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=300&q=80', active: false }
];

export const EliteStories = ({ onOpenStory }) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs px-1">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#d7b467] flex items-center gap-1.5">
          <Sparkles className="w-3 h-3 text-[#d7b467]" />
          <span>Private Member Highlights</span>
        </span>
        <span className="text-[10px] text-gray-400">24h Ephemeral Stories</span>
      </div>

      <div className="flex items-center gap-3.5 overflow-x-auto pb-2 no-scrollbar">
        {ELITE_STORIES.map(story => (
          <button
            key={story.id}
            type="button"
            onClick={() => onOpenStory?.(story)}
            className="flex flex-col items-center gap-1.5 shrink-0 group cursor-pointer"
          >
            <div className="w-16 h-16 rounded-full p-0.5 bg-gradient-to-tr from-[#d7b467] via-[#f5e6c3] to-[#aa8334] group-hover:scale-105 transition-transform shadow-md">
              <img
                src={story.img}
                alt={story.title}
                className="w-full h-full rounded-full object-cover border-2 border-black"
              />
            </div>
            <span className="text-[10px] font-bold text-gray-200 group-hover:text-[#f5e6c3] transition-colors max-w-[70px] truncate text-center">
              {story.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

