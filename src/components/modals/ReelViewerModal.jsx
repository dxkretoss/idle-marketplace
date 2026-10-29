import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { matchesReelCategory } from '../../data/mockData';
import { 
  X, 
  Heart, 
  Share2, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  ArrowRight,
  Sparkles,
  MapPin,
  Tag
} from 'lucide-react';

export const ReelViewerModal = () => {
  const { 
    activeReel, 
    setActiveReel, 
    reels, 
    reelsFilter,
    user,
    setActiveListing, 
    listings, 
    addToast 
  } = useApp();

  const [isLiked, setIsLiked] = useState(false);
  const [progress, setProgress] = useState(0);

  // Filter current playlist by active category so shopping reels never show equipment on Next/Prev
  const isPersonalized = reelsFilter === 'ForYou';
  const userInterests = user?.interests || [];

  const playlist = reels.filter((r) => {
    if (!reelsFilter || reelsFilter === 'All') return true;
    if (isPersonalized) {
      if (userInterests.length === 0 || userInterests.includes('All')) return true;
      return userInterests.some(interest => matchesReelCategory(r.category, interest));
    }
    return matchesReelCategory(r.category, reelsFilter);
  });

  const currentPlaylist = playlist.some(r => r.id === activeReel?.id)
    ? playlist
    : (activeReel ? [activeReel, ...playlist.filter(r => r.id !== activeReel?.id)] : playlist);

  const currentIndex = currentPlaylist.findIndex(r => r.id === activeReel?.id);

  // Simulated story progress timer
  useEffect(() => {
    if (!activeReel) return;
    setProgress(0);
    setIsLiked(false);

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          return 100;
        }
        return prev + 1.25;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [activeReel]);

  if (!activeReel) return null;

  const handleNext = () => {
    if (currentIndex >= 0 && currentIndex < currentPlaylist.length - 1) {
      setActiveReel(currentPlaylist[currentIndex + 1]);
    } else if (currentPlaylist.length > 0) {
      setActiveReel(currentPlaylist[0]);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setActiveReel(currentPlaylist[currentIndex - 1]);
    } else if (currentPlaylist.length > 0) {
      setActiveReel(currentPlaylist[currentPlaylist.length - 1]);
    }
  };

  const handleViewListing = () => {
    if (activeReel.listingId) {
      const match = listings.find(l => l.id === activeReel.listingId);
      if (match) {
        setActiveReel(null);
        setActiveListing(match);
        return;
      }
    }
    addToast('Associated listing details opened in Explore', 'info');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    addToast('Reel link copied!', 'info');
  };

  // Compute remaining hours from created
  const hoursLeft = Math.max(1, Math.ceil((86400000 - (Date.now() - (activeReel.created || Date.now()))) / 3600000));

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-0 md:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={() => setActiveReel(null)}
    >
      <div 
        className="relative w-full md:max-w-md h-full md:h-[88vh] bg-black md:rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-white/10"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Segmented Story Progress Bars */}
        <div className="absolute top-0 left-0 right-0 z-30 p-3 flex gap-1">
          {currentPlaylist.slice(0, 10).map((item, idx) => (
            <div key={item.id} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
              <div 
                className={`h-full bg-idle-gold transition-all duration-100 ease-linear rounded-full ${
                  idx < currentIndex ? 'w-full' : idx === currentIndex ? '' : 'w-0'
                }`}
                style={idx === currentIndex ? { width: `${progress}%` } : {}}
              />
            </div>
          ))}
        </div>

        {/* Top Header */}
        <div className="absolute top-5 left-0 right-0 z-30 px-4 py-2 flex items-center justify-between text-white bg-gradient-to-b from-black/70 to-transparent">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#d6a746] to-[#004f46] border-2 border-white/80 flex items-center justify-center text-xs font-bold text-white shadow-md">
              {activeReel.author?.[0] || 'I'}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <strong className="text-xs md:text-sm font-bold block leading-tight truncate max-w-[130px]">{activeReel.author}</strong>
                <span className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-idle-gold/25 text-idle-gold border border-idle-gold/40">
                  {activeReel.category}
                </span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-200 mt-0.5">
                <MapPin className="w-3 h-3 text-idle-gold" />
                <span>{activeReel.area}</span>
                <span>·</span>
                <span className="flex items-center gap-0.5 text-idle-goldLight font-semibold">
                  <Clock className="w-2.5 h-2.5" /> {hoursLeft}h left
                </span>
                {currentPlaylist.length > 1 && (
                  <>
                    <span>·</span>
                    <span className="text-[10px] text-white/80 font-medium">
                      {currentIndex + 1}/{currentPlaylist.length}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveReel(null)}
            className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 flex items-center justify-center text-white transition-all"
            aria-label="Close Reel"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Media Canvas */}
        <div className="relative flex-1 bg-[#061e1b] overflow-hidden flex items-center justify-center">
          <img 
            src={activeReel.image} 
            alt={activeReel.title}
            className="w-full h-full object-cover select-none"
          />
          {/* Subtle dark gradient overlay for bottom text contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-black/30 pointer-events-none" />

          {/* Nav arrows */}
          <button
            onClick={handlePrev}
            className="absolute left-2.5 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-sm transition-all"
            aria-label="Previous reel"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2.5 z-20 p-2 rounded-full bg-black/40 hover:bg-black/70 text-white/80 hover:text-white backdrop-blur-sm transition-all"
            aria-label="Next reel"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Vertical Action Stack on the right */}
        <div className="absolute right-3 bottom-28 z-30 flex flex-col gap-3.5 items-center">
          <button
            onClick={() => setIsLiked(!isLiked)}
            className={`w-11 h-11 rounded-full flex flex-col items-center justify-center backdrop-blur-md border border-white/20 transition-all ${
              isLiked ? 'bg-red-500/90 text-white' : 'bg-black/40 hover:bg-black/60 text-white'
            }`}
            title="Like this Reel"
          >
            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
          </button>
          <button
            onClick={handleShare}
            className="w-11 h-11 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/20 flex flex-col items-center justify-center text-white transition-all"
            title="Share"
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Bottom Drawer Overlay */}
        <div className="absolute bottom-0 left-0 right-0 z-30 p-5 text-white bg-gradient-to-t from-black via-black/90 to-transparent space-y-3">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-idle-gold/25 text-idle-gold border border-idle-gold/30">
              {activeReel.category}
            </span>
            <span className="text-[10px] text-white/70">
              {currentIndex + 1} of {reels.length}
            </span>
          </div>

          <div>
            <h3 className="font-serif text-lg font-bold text-white leading-snug">
              {activeReel.title}
            </h3>
            <p className="text-xs text-white/80 mt-1 line-clamp-2 leading-relaxed">
              {activeReel.caption}
            </p>
          </div>

          {activeReel.listingId ? (
            <button
              onClick={handleViewListing}
              className="gold-gradient-btn w-full py-2.5 px-4 rounded-xl text-xs md:text-sm font-bold flex items-center justify-center gap-2 shadow-lg"
            >
              <span>View Associated Listing</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <div className="text-[10px] text-emerald-200/70 text-center italic">
              Public 24-hour community demonstration Reel
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
