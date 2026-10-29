import React, { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { StoriesStrip } from '../components/reels/StoriesStrip';
import { ReelUploadModal } from '../components/modals/ReelUploadModal';
import { matchesReelCategory } from '../data/mockData';
import { 
  Play, 
  Plus, 
  Clock, 
  Film, 
  Sparkles, 
  ArrowRight, 
  RotateCcw
} from 'lucide-react';

export const ReelsView = () => {
  const { 
    reels, 
    setActiveReel, 
    plan, 
    setRoute, 
    reelsFilter, 
    setReelsFilter,
    user 
  } = useApp();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Check if member has personalized interests saved
  const userInterests = user?.interests || [];
  const hasSpecificInterests = userInterests.length > 0 && !userInterests.includes('All');

  // Filter reels based on active story bubble selection (Shopping/Fashion will never mix with Equipment)
  const filteredReels = useMemo(() => {
    if (!reelsFilter || reelsFilter === 'All') return reels;
    if (reelsFilter === 'ForYou') {
      if (!hasSpecificInterests) return reels;
      return reels.filter(reel => userInterests.some(interest => matchesReelCategory(reel.category, interest)));
    }
    return reels.filter(reel => matchesReelCategory(reel.category, reelsFilter));
  }, [reels, reelsFilter, userInterests, hasSpecificInterests]);

  return (
    <div className="space-y-8 pb-16">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
            Short-Form Marketplace Discovery
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#082f2c] mt-0.5">
            Nearby Reels.
          </h1>
          <p className="text-xs sm:text-sm text-idle-muted mt-1 max-w-xl">
            Watch local stylists, equipment operators, fitness coaches, and enterprise teams in action. All member Reels expire after 24 hours.
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="gold-gradient-btn flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md flex-shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Post a 24-Hour Reel</span>
        </button>
      </div>

      {/* Stories Bubble Strip acting directly as the Category Filter */}
      <StoriesStrip 
        onOpenUpload={() => setUploadModalOpen(true)} 
        title="Active 24h Stories" 
        activeCategory={reelsFilter}
        onSelectCategory={(cat) => setReelsFilter(cat)}
      />

      {/* Main Reels Grid Feed */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-idle-line pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl font-bold text-[#082f2c]">
                {reelsFilter === 'All' && 'Watch the Local Edit'}
                {reelsFilter !== 'All' && `${reelsFilter} Reels`}
              </h2>
              {reelsFilter !== 'All' && (
                <button
                  type="button"
                  onClick={() => setReelsFilter('All')}
                  className="text-xs font-semibold text-idle-emerald hover:underline flex items-center gap-1 cursor-pointer ml-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Show All</span>
                </button>
              )}
            </div>
            <p className="text-xs text-idle-muted mt-0.5">
              {reelsFilter === 'All' && 'Tap any story bubble above to filter categories, or tap any card below to play full clip.'}
              {reelsFilter === 'Fashion' && 'Only shopping, fashion outfits, and styling reveals in North Texas.'}
              {reelsFilter === 'Equipment' && 'Heavy machinery, power equipment, and contractor walkarounds.'}
              {reelsFilter !== 'All' && reelsFilter !== 'Fashion' && reelsFilter !== 'Equipment' && `Filtered to ${reelsFilter} stories. Next/Prev playback stays within this category.`}
            </p>
          </div>
          <span className="text-xs font-bold px-3 py-1 rounded-full bg-idle-mint text-idle-emerald border border-idle-emerald/20 self-start sm:self-auto">
            {filteredReels.length} {filteredReels.length === 1 ? 'Reel' : 'Reels'} Found
          </span>
        </div>

        {/* Empty State when category has no active reels */}
        {filteredReels.length === 0 ? (
          <div className="glass-card p-10 rounded-3xl border border-idle-line text-center space-y-4 max-w-md mx-auto my-8">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-idle-mint text-idle-emerald flex items-center justify-center">
              <Film className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-[#172d28]">
                No 24-hour reels in this category right now
              </h3>
              <p className="text-xs text-idle-muted mt-1 leading-relaxed">
                Be the first verified member in North Texas to share a 24-hour video story in {reelsFilter}!
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <button
                onClick={() => setUploadModalOpen(true)}
                className="gold-gradient-btn px-4 py-2 rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                Post a Reel
              </button>
              <button
                onClick={() => setReelsFilter('All')}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#edf3f0] hover:bg-white border border-idle-line text-[#172d28] cursor-pointer"
              >
                View All Categories
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredReels.map((reel) => {
              const isUser = reel.source === 'user';
              const hoursLeft = Math.max(1, Math.ceil((86400000 - (Date.now() - (reel.created || Date.now()))) / 3600000));

              return (
                <div
                  key={reel.id}
                  onClick={() => setActiveReel(reel)}
                  className="group relative h-72 sm:h-84 rounded-2xl overflow-hidden cursor-pointer shadow-glass hover:shadow-glass-hover transition-all bg-[#001f1c]"
                >
                  {/* Media Image */}
                  <img
                    src={reel.image}
                    alt={reel.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 group-hover:from-black/90 transition-all" />

                  {/* Top Badge (Time Left) */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-md shadow-sm ${
                      isUser 
                        ? 'bg-idle-gold text-[#122821] font-extrabold' 
                        : 'bg-[#002f2a]/80 text-emerald-100 border border-white/20'
                    }`}>
                      <Clock className="w-2.5 h-2.5" />
                      <span>{isUser ? `${hoursLeft}h left (Yours)` : 'SAMPLE'}</span>
                    </span>

                    <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-idle-emerald group-hover:border-idle-emerald transition-colors">
                      <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                    </div>
                  </div>

                  {/* Bottom Info */}
                  <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setReelsFilter(reel.category);
                      }}
                      className="text-[10px] font-bold uppercase tracking-wider text-idle-gold hover:underline cursor-pointer text-left block"
                      title={`Filter to ${reel.category}`}
                    >
                      {reel.category}
                    </button>
                    <h3 className="font-serif text-sm sm:text-base font-bold leading-snug line-clamp-2">
                      {reel.title}
                    </h3>
                    <div className="flex items-center justify-between text-[11px] text-white/70 pt-1">
                      <span className="truncate">{reel.author}</span>
                      <span className="text-[10px]">{reel.area}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Promotional Upload Section Card */}
      <section className="glass-card p-6 md:p-8 rounded-3xl border border-idle-emerald/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-idle-gold tracking-wider">
              24-Hour Promotion
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-idle-mint text-idle-emerald font-bold">
              North Texas Radius
            </span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#003d36]">
            Show what you're working on.
          </h3>
          <p className="text-xs md:text-sm text-idle-muted leading-relaxed">
            Share an outfit reveal, a training mobility breakdown, an equipment walkaround, or a finished client installation. Short clips keep your listings top-of-mind.
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="gold-gradient-btn px-6 py-3 rounded-xl text-xs md:text-sm font-bold shadow-md flex-shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <Film className="w-4 h-4" />
          <span>Publish a 24-Hour Reel</span>
        </button>
      </section>

      {/* Reel Upload Modal */}
      <ReelUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </div>
  );
};
