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

  // Check if paid member (any tier other than Free)
  const isPaid = plan !== 'Free';

  // Check if member has personalized interests saved
  const userInterests = user?.interests || [];
  const hasSpecificInterests = userInterests.length > 0 && !userInterests.includes('All');

  // Filter reels based on active story bubble selection
  const filteredReels = useMemo(() => {
    if (!reelsFilter || reelsFilter === 'All') return reels;
    if (reelsFilter === 'ForYou') {
      if (!hasSpecificInterests) return reels;
      return reels.filter(reel => userInterests.some(interest => matchesReelCategory(reel.category, interest)));
    }
    return reels.filter(reel => matchesReelCategory(reel.category, reelsFilter));
  }, [reels, reelsFilter, userInterests, hasSpecificInterests]);

  const scrollToUpload = () => {
    setUploadModalOpen(true);
  };

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
          type="button"
          onClick={scrollToUpload}
          className="gold-gradient-btn flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md flex-shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Create a Reel</span>
        </button>
      </div>

      {/* Stories Bubble Strip acting directly as the Category Filter */}
      <StoriesStrip 
        onOpenUpload={scrollToUpload} 
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

          <div className="text-xs text-idle-muted">
            Showing <span className="font-bold text-[#082f2c]">{filteredReels.length}</span> active stories
          </div>
        </div>

        {/* Reels Grid Cards */}
        {filteredReels.length === 0 ? (
          <div className="bg-white border border-idle-line rounded-2xl p-10 text-center space-y-3">
            <div className="w-12 h-12 mx-auto rounded-full bg-idle-mint/40 text-idle-emerald flex items-center justify-center">
              <Film className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#082f2c]">No active reels in this category</h3>
            <p className="text-xs text-idle-muted max-w-md mx-auto">
              Be the first verified member in North Texas to share a 24-hour update or showcase for {reelsFilter}.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToUpload}
                className="gold-gradient-btn px-4 py-2 rounded-xl text-xs font-bold shadow-sm cursor-pointer"
              >
                Create the first Reel
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-4">
            {filteredReels.map((reel) => {
              const isVideoClip = reel.isVideo || reel.videoUrl || reel.image?.includes('.mp4');

              return (
                <div 
                  key={reel.id}
                  onClick={() => setActiveReel(reel)}
                  className="group relative aspect-[9/16] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all cursor-pointer bg-slate-900 border border-idle-line/60"
                >
                  {/* Media Content */}
                  {isVideoClip && reel.videoUrl ? (
                    <video 
                      src={reel.videoUrl} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      muted 
                      loop 
                      playsInline
                    />
                  ) : (
                    <img 
                      src={reel.image || reel.thumbnail} 
                      alt={reel.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                  )}

                  {/* Vignette Gradient Scrim */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/35 pointer-events-none" />

                  {/* Top Badge: Category & 24h Clock */}
                  <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none">
                    <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-black/50 backdrop-blur-md text-white border border-white/20">
                      {reel.category}
                    </span>
                    <span className="flex items-center gap-1 text-[9px] font-medium px-1.5 py-0.5 rounded-full bg-emerald-950/60 backdrop-blur-md text-emerald-300 border border-emerald-400/30">
                      <Clock className="w-2.5 h-2.5" />
                      <span>{reel.expiresIn || '24h'}</span>
                    </span>
                  </div>

                  {/* Center Play Indicator */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-85 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md border border-white/50 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Bottom Info Bar */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white space-y-1">
                    <div className="text-xs font-bold line-clamp-1 group-hover:text-idle-goldLight transition-colors">
                      {reel.title}
                    </div>
                    <div className="text-[10px] text-emerald-200/90 truncate flex items-center justify-between">
                      <span>{reel.author || 'Local Member'}</span>
                      <span className="text-[9px] opacity-75">{reel.area?.split(',')[0] || 'DFW'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* 24-HOUR PROMOTION Banner */}
      <div id="upload-reel" className="bg-white border border-[#dce6df] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-sm">
        <div className="space-y-1.5">
          <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#9b782c]">
            24-HOUR PROMOTION
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#004f46]">
            Show what you're working on.
          </h2>
          <p className="text-xs sm:text-sm text-[#596e64] max-w-xl">
            Share an outfit, a workout, a before-and-after job, or enterprise project. The local demo stores your reel in your browser for 24 hours.
          </p>
        </div>

        {!isPaid ? (
          <button
            type="button"
            onClick={() => setRoute('membership')}
            className="gold-gradient-btn px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md cursor-pointer whitespace-nowrap flex items-center gap-2 hover:brightness-105 transition-transform active:scale-98"
          >
            <Sparkles className="w-4 h-4" />
            <span>Unlock posting</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setUploadModalOpen(true)}
            className="gold-gradient-btn px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md cursor-pointer whitespace-nowrap flex items-center gap-2 hover:brightness-105 transition-transform active:scale-98"
          >
            <Film className="w-4 h-4" />
            <span>Create a Reel →</span>
          </button>
        )}
      </div>

      {/* Reel Upload Modal */}
      <ReelUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </div>
  );
};
