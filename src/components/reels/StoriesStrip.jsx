import React from 'react';
import { useApp } from '../../context/AppContext';
import { Play, Plus } from 'lucide-react';

export const StoriesStrip = ({ onOpenUpload, showHeader = true, title = "Nearby Reels" }) => {
  const { reels, setActiveReel, setRoute } = useApp();

  return (
    <div className="space-y-3">
      {showHeader && (
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
              Local Discovery
            </span>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#082f2c] flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-idle-emerald inline-block" />
              {title}
            </h2>
          </div>
          <button
            onClick={() => setRoute('reels')}
            className="text-xs font-bold text-idle-emerald hover:text-idle-teal transition-colors flex items-center gap-1 cursor-pointer"
          >
            <span>View all Reels</span>
            <span>&rarr;</span>
          </button>
        </div>
      )}

      {/* Story Strip horizontal scroll */}
      <div className="flex items-center gap-4 sm:gap-5 overflow-x-auto pb-4 pt-1.5 no-scrollbar">
        {/* Create Reel Button */}
        {onOpenUpload && (
          <button
            onClick={onOpenUpload}
            className="flex-shrink-0 flex flex-col items-center group text-center focus:outline-none w-[82px] sm:w-[90px] cursor-pointer"
          >
            <div className="w-[74px] h-[74px] sm:w-[82px] sm:h-[82px] rounded-full border-2 border-dashed border-idle-emerald/40 hover:border-idle-emerald flex items-center justify-center bg-idle-mint/50 group-hover:bg-idle-mint group-hover:scale-105 transition-all flex-shrink-0 shadow-xs">
              <Plus className="w-6 h-6 text-idle-emerald group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-2.5 flex flex-col items-center w-full px-0.5">
              <span className="text-[11px] sm:text-xs font-bold text-idle-emerald truncate w-full text-center leading-tight">
                Add Reel
              </span>
              <span className="text-[10px] text-idle-muted font-medium text-center w-full leading-tight mt-1">
                24h demo
              </span>
            </div>
          </button>
        )}

        {/* Stories list */}
        {reels.map((story) => {
          const isUser = story.source === 'user';
          return (
            <button
              key={story.id}
              onClick={() => setActiveReel(story)}
              className="flex-shrink-0 flex flex-col items-center group text-center focus:outline-none w-[82px] sm:w-[90px] cursor-pointer"
              title={story.title}
            >
              {/* Story Bubble with Gradient Ring */}
              <div className={`relative p-[2.5px] rounded-full transition-all duration-300 group-hover:scale-105 flex-shrink-0 w-[74px] h-[74px] sm:w-[82px] sm:h-[82px] shadow-sm ${
                isUser 
                  ? 'bg-gradient-to-tr from-[#d6a746] to-[#004f46] ring-2 ring-idle-gold/40' 
                  : 'bg-gradient-to-tr from-[#004f46] via-[#d6a746] to-[#20766c]'
              }`}>
                {/* 2px White Inner Separation Rim */}
                <div className="w-full h-full rounded-full overflow-hidden bg-white p-[2px] flex-shrink-0">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-full rounded-full object-cover transition-transform group-hover:scale-110 duration-300 pointer-events-none select-none"
                  />
                </div>

                {/* Sleek Play Badge - Positioned safely on bottom-right corner */}
                <div className="absolute bottom-0 right-0 w-[22px] h-[22px] rounded-full bg-[#003d36] text-idle-gold flex items-center justify-center border-2 border-white shadow-md z-10">
                  <Play className="w-2.5 h-2.5 fill-idle-gold ml-0.5 text-idle-gold" />
                </div>
              </div>

              {/* Text Container with Generous Top Margin (No Collisions!) */}
              <div className="mt-2.5 flex flex-col items-center w-full px-0.5">
                <span className="text-[11px] sm:text-xs font-bold text-[#172d28] group-hover:text-idle-emerald truncate w-full text-center leading-tight">
                  {story.category}
                </span>
                <span className="text-[10px] text-idle-muted font-medium text-center truncate w-full leading-tight mt-1">
                  {isUser ? 'Yours' : story.area?.split(',')[0] || 'Dallas'}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
