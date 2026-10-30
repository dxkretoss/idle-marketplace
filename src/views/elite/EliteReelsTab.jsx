import React, { useState } from 'react';
import { PlaySquare, Heart, Bookmark, Flag, Plus, Sparkles, Clock, ShieldCheck } from 'lucide-react';

export const EliteReelsTab = ({ onOpenPostModal }) => {
  const [likedIds, setLikedIds] = useState([]);
  const [savedIds, setSavedIds] = useState([]);

  const reels = [
    {
      id: 'er-1',
      title: 'The Exotic Weekend Collection',
      author: 'Exotic Drive Collective DFW',
      category: 'Vehicles',
      caption: 'Track pre-check complete for the Ferrari 488 Spider in Frisco. Ready for enclosed trailer delivery.',
      image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=600&q=80',
      likes: 24,
      expires: '18 hours left'
    },
    {
      id: 'er-2',
      title: 'Citation X Aspen Pre-Flight',
      author: 'Apex Jet Charter · TKI Hub',
      category: 'Aviation',
      caption: 'Mach 0.935 speed run to Aspen ASE. Catering and customs pre-cleared for VIP members.',
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=600&q=80',
      likes: 42,
      expires: '12 hours left'
    },
    {
      id: 'er-3',
      title: 'Highland Park Villa Sunset Walkthrough',
      author: 'Park Cities Asset Trust',
      category: 'Estates',
      caption: 'Pool pavilion and boardroom setup for private executive dinner. Biometric gates active.',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      likes: 31,
      expires: '9 hours left'
    },
    {
      id: 'er-4',
      title: 'Blackline Maybach Arrival at TKI',
      author: 'Prestige Livery DFW',
      category: 'Ground',
      caption: 'Ramp-side valet handoff directly at Addison FBO private hangar escort.',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80',
      likes: 19,
      expires: '22 hours left'
    }
  ];

  const toggleLike = (id) => {
    setLikedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const toggleSave = (id) => {
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner with Post CTA */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-5 rounded-3xl bg-black/60 border border-[#d7b467]/30 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#d7b467] bg-[#d7b467]/20 px-2 py-0.5 rounded">
              Ephemeral 24h Showcase
            </span>
            <span className="text-xs text-gray-400">Exclusive to verified members</span>
          </div>
          <h3 className="font-serif text-lg font-bold text-white mt-1">
            Private Member Video & Photo Reels
          </h3>
        </div>

        <button
          type="button"
          onClick={onOpenPostModal}
          className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d7b467] to-[#aa8334] text-black font-bold text-xs hover:opacity-95 shadow-md flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Post a 24-Hour Reel</span>
        </button>
      </div>

      {/* Reels Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {reels.map(reel => {
          const isLiked = likedIds.includes(reel.id);
          const isSaved = savedIds.includes(reel.id);

          return (
            <div
              key={reel.id}
              className="group relative rounded-3xl overflow-hidden border border-[#d7b467]/30 bg-[#090d11] min-h-[420px] flex flex-col justify-between shadow-xl"
            >
              <img
                src={reel.image}
                alt={reel.title}
                className="absolute inset-0 w-full h-full object-cover filter brightness-85 group-hover:brightness-95 transition-transform duration-500 group-hover:scale-103"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 pointer-events-none" />

              {/* Top Row: Category & Expiry */}
              <div className="p-4 flex items-center justify-between z-10">
                <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-[#d7b467]/50 text-[10px] font-bold text-[#faedd1]">
                  {reel.category}
                </span>
                <span className="px-2 py-0.5 rounded-full bg-black/60 text-[10px] text-gray-300 flex items-center gap-1 border border-white/10">
                  <Clock className="w-3 h-3 text-[#d7b467]" />
                  <span>{reel.expires}</span>
                </span>
              </div>

              {/* Bottom Row: Caption & Actions */}
              <div className="p-4 z-10 space-y-2.5">
                <div>
                  <span className="text-[10px] text-[#d7b467] font-semibold">{reel.author}</span>
                  <h4 className="font-serif text-sm font-bold text-white line-clamp-1">{reel.title}</h4>
                  <p className="text-xs text-gray-300 line-clamp-2 mt-0.5 leading-relaxed">{reel.caption}</p>
                </div>

                <div className="pt-2 border-t border-white/15 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => toggleLike(reel.id)}
                      className={`flex items-center gap-1 text-xs font-bold transition-colors cursor-pointer ${
                        isLiked ? 'text-rose-400' : 'text-gray-300 hover:text-white'
                      }`}
                    >
                      <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                      <span>{reel.likes + (isLiked ? 1 : 0)}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => toggleSave(reel.id)}
                      className={`p-1.5 rounded-full transition-colors cursor-pointer ${
                        isSaved ? 'text-[#d7b467]' : 'text-gray-400 hover:text-white'
                      }`}
                    >
                      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                    </button>
                  </div>

                  <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                    Member Only
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

