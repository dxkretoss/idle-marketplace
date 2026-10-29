import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { matchesReelCategory } from '../../data/mockData';
import { Plus, Sparkles, Check } from 'lucide-react';

export const StoriesStrip = ({
  onOpenUpload,
  showHeader = true,
  title = "Active 24h Stories",
  activeCategory = null,
  onSelectCategory = null
}) => {
  const { reels, reelsFilter, setReelsFilter } = useApp();

  const currentCategory = activeCategory || reelsFilter || 'All';

  // Derive unique categories from active reels so multiple reels sharing a category
  // (like two "Events" stories) never create duplicate bubbles
  const categoryGroups = useMemo(() => {
    const map = new Map();
    reels.forEach((reel) => {
      const cat = reel.category || 'General';
      if (!map.has(cat)) {
        map.set(cat, {
          category: cat,
          image: reel.image,
          count: 1,
          area: reel.area?.split(',')[0] || 'DFW'
        });
      } else {
        const existing = map.get(cat);
        existing.count += 1;
      }
    });
    return Array.from(map.values());
  }, [reels]);

  // Click on a category bubble ONLY filters the category, never opens the modal popup
  const handleCategoryBubbleClick = (catName) => {
    const nextCat = currentCategory === catName ? 'All' : catName;
    if (setReelsFilter) setReelsFilter(nextCat);
    if (onSelectCategory) onSelectCategory(nextCat);
  };

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
          {currentCategory !== 'All' && (
            <button
              type="button"
              onClick={() => {
                if (setReelsFilter) setReelsFilter('All');
                if (onSelectCategory) onSelectCategory('All');
              }}
              className="text-xs font-bold text-idle-emerald hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>Reset filter ({currentCategory})</span>
              <span>&times;</span>
            </button>
          )}
        </div>
      )}

      {/* Story Strip horizontal scroll & category filter buttons */}
      <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-4 pt-2 pl-1 no-scrollbar">
        {/* Create Reel Button */}
        {/* {onOpenUpload && (
          <button
            type="button"
            onClick={onOpenUpload}
            className="flex-shrink-0 flex flex-col items-center group text-center focus:outline-none w-[84px] sm:w-[92px] cursor-pointer"
          >
            <div className="w-[76px] h-[76px] sm:w-[82px] sm:h-[82px] aspect-square rounded-2xl border-2 border-dashed border-idle-emerald/40 hover:border-idle-emerald flex items-center justify-center bg-idle-mint/50 group-hover:bg-idle-mint group-hover:scale-105 transition-all flex-shrink-0 shadow-xs">
              <Plus className="w-6 h-6 text-idle-emerald group-hover:scale-110 transition-transform" />
            </div>
            <div className="mt-2 flex flex-col items-center w-full px-0.5">
              <span className="text-[11px] sm:text-xs font-bold text-idle-emerald truncate w-full text-center leading-tight">
                Add Reel
              </span>
              <span className="text-[10px] text-idle-muted font-medium text-center w-full leading-tight mt-0.5">
                24h demo
              </span>
            </div>
          </button>
        )} */}

        {/* All Stories Filter Bubble */}
        <button
          type="button"
          onClick={() => {
            if (setReelsFilter) setReelsFilter('All');
            if (onSelectCategory) onSelectCategory('All');
          }}
          className="flex-shrink-0 flex flex-col items-center group text-center focus:outline-none w-[84px] sm:w-[92px] cursor-pointer"
          title="Show All Reels"
        >
          <div className={`w-[76px] h-[76px] sm:w-[82px] sm:h-[82px] aspect-square rounded-2xl flex flex-col items-center justify-center transition-all flex-shrink-0 shadow-sm border ${currentCategory === 'All'
            ? 'bg-gradient-to-tr from-[#004f46] via-[#003d36] to-[#012d27] border-idle-gold text-idle-gold ring-2 ring-idle-gold ring-offset-2 scale-105 shadow-md'
            : 'bg-white hover:bg-emerald-50/50 border-idle-line text-idle-emerald'
            }`}>
            <Sparkles className={`w-6 h-6 transition-transform group-hover:scale-110 ${currentCategory === 'All' ? 'text-idle-gold' : 'text-idle-emerald'}`} />
            <span className={`text-[10px] font-extrabold uppercase tracking-wider mt-1 ${currentCategory === 'All' ? 'text-idle-gold' : 'text-[#172d28]'}`}>
              All
            </span>
          </div>
          <div className="mt-2 flex flex-col items-center w-full px-0.5">
            <span className={`text-[11px] sm:text-xs font-bold truncate w-full text-center leading-tight ${currentCategory === 'All' ? 'text-idle-emerald font-extrabold' : 'text-[#172d28]'}`}>
              All Reels
            </span>
            <span className="text-[10px] text-idle-muted font-medium text-center w-full leading-tight mt-0.5">
              {reels.length} total
            </span>
          </div>
        </button>

        {/* Unique Category Story Filter Bubbles */}
        {categoryGroups.map((group) => {
          const isCategoryActive = currentCategory !== 'All' && matchesReelCategory(group.category, currentCategory);
          return (
            <button
              type="button"
              key={group.category}
              onClick={() => handleCategoryBubbleClick(group.category)}
              className="flex-shrink-0 flex flex-col items-center group text-center focus:outline-none w-[84px] sm:w-[92px] cursor-pointer select-none"
              title={`Filter by ${group.category} (${group.count} active)`}
            >
              {/* Square Category Tile with Border Radius & Gradient Ring */}
              <div className={`relative p-[2.5px] rounded-2xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-md flex-shrink-0 w-[76px] h-[76px] sm:w-[82px] sm:h-[82px] aspect-square shadow-sm ${isCategoryActive
                ? 'bg-gradient-to-tr from-idle-gold via-amber-400 to-idle-emerald ring-2 ring-idle-gold ring-offset-2 scale-105'
                : 'bg-gradient-to-tr from-[#004f46] via-[#d6a746] to-[#20766c]'
                }`}>
                {/* White Inner Separation Rim */}
                <div className="w-full h-full rounded-[14px] overflow-hidden bg-white p-[2px] flex-shrink-0 relative group-hover:border-idle-gold/40 transition-colors">
                  <img
                    src={group.image}
                    alt={group.category}
                    className="w-full h-full rounded-[12px] object-cover transition-transform group-hover:scale-110 duration-300 pointer-events-none select-none"
                  />

                  {/* Active Filter Checkmark Badge */}
                  {isCategoryActive && (
                    <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-idle-emerald text-white flex items-center justify-center shadow-sm">
                      <Check className="w-2.5 h-2.5 stroke-[3]" />
                    </div>
                  )}
                </div>
              </div>

              {/* Text Container */}
              <div className="mt-2 flex flex-col items-center w-full px-0.5">
                <span className={`text-[11px] sm:text-xs font-bold truncate w-full text-center leading-tight ${isCategoryActive ? 'text-idle-emerald font-extrabold' : 'text-[#172d28] group-hover:text-idle-emerald'
                  }`}>
                  {group.category}
                </span>
                <span className="text-[10px] text-idle-muted font-medium text-center truncate w-full leading-tight mt-0.5">
                  {isCategoryActive ? 'Active filter' : `${group.count} ${group.count === 1 ? 'reel' : 'reels'}`}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
