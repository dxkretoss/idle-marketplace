import React, { useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Sparkles,
  Play,
  MapPin,
  Clock,
  ShieldCheck,
  Star,
  ArrowRight,
  User,
  Plus
} from 'lucide-react';

// Author avatar mappings for rich social-first profile pictures
const AUTHOR_AVATARS = {
  'Avery Style': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
  'Taylor Fitness': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
  'Atlas Home Services': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
  'Northline Rentals': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
  'Maya Creative': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
  'MoveWell Logistics': 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=300&q=80',
  'Harbor Workspaces': 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&w=300&q=80',
  'Marcus Vance': 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'
};

export const StoriesStrip = ({
  onOpenUpload,
  showHeader = true,
  title = "24h Local Reels",
  showBubbles = true,
  showExploreAndEnjoy = true,
  showViewAll
}) => {
  const {
    reels,
    setActiveReel,
    setSelectedProvider,
    user,
    setRoute,
    route
  } = useApp();

  const isAlreadyOnReelsPage = route === 'reels';
  const shouldShowViewAll = showViewAll !== undefined ? showViewAll : !isAlreadyOnReelsPage;

  const userCity = (user?.area || 'Frisco').split(',')[0].trim().toLowerCase();

  // Prioritize nearby users matching user's area, then remaining 24h reels
  const prioritizedReels = useMemo(() => {
    return [...reels].sort((a, b) => {
      const aNear = (a.area || '').toLowerCase().includes(userCity);
      const bNear = (b.area || '').toLowerCase().includes(userCity);
      if (aNear && !bNear) return -1;
      if (!aNear && bNear) return 1;
      return 0;
    });
  }, [reels, userCity]);

  // Curated trending providers for the "Explore & Enjoy" section
  const trendingProviders = useMemo(() => {
    return [
      {
        name: 'Maya Creative Studio',
        role: 'Verified Studio · 54 Handoffs',
        category: 'Cinema & 4K Media',
        area: 'Plano, TX',
        rating: 4.98,
        reviewsCount: 54,
        avatar: AUTHOR_AVATARS['Maya Creative'],
        reelId: 'story-5',
        badges: ['ID Verified', 'Monthly Top Provider']
      },
      {
        name: 'Marcus Vance',
        role: 'Master Carpenter · 42 Handoffs',
        category: 'Pro Tools & Machinery',
        area: 'Frisco, TX',
        rating: 4.96,
        reviewsCount: 42,
        avatar: AUTHOR_AVATARS['Marcus Vance'],
        reelId: 'story-3',
        badges: ['ID Verified', 'Trade Pro']
      },
      {
        name: 'Avery Style Collective',
        role: 'Wardrobe Stylist · 32 Handoffs',
        category: 'Fashion & Luxury Wardrobe',
        area: 'Plano, TX',
        rating: 4.98,
        reviewsCount: 32,
        avatar: AUTHOR_AVATARS['Avery Style'],
        reelId: 'story-1',
        badges: ['ID Verified', 'Monthly Top Provider']
      },
      {
        name: 'Northline Rentals',
        role: 'Commercial Fleet · 38 Handoffs',
        category: 'Earthmoving & Machinery',
        area: 'Frisco, TX',
        rating: 4.95,
        reviewsCount: 38,
        avatar: AUTHOR_AVATARS['Northline Rentals'],
        reelId: 'story-4',
        badges: ['ID Verified', 'Fleet Certified']
      }
    ];
  }, []);

  const handleOpenReel = (reel) => {
    setActiveReel(reel);
  };

  const handleOpenProfile = (reel) => {
    const avatar = AUTHOR_AVATARS[reel.author] || reel.image;
    setSelectedProvider({
      name: reel.author,
      area: reel.area,
      image: avatar,
      avatar: avatar,
      rating: 4.97,
      reviewsCount: 38
    });
  };

  return (
    <div className="space-y-6">
      {/* 1. Circular Profile Pictures Horizontally at the Top */}
      {showBubbles && (
        <div className="space-y-3">
          {showHeader && (
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
                  Local Discovery · Active 24h
                </span>
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#082f2c] flex items-center gap-2">
                  <span className="w-1.5 h-5 rounded-full bg-idle-emerald inline-block" />
                  <span>{title}</span>
                </h2>
              </div>
              {shouldShowViewAll && (
                <button
                  type="button"
                  onClick={() => setRoute('reels')}
                  className="text-xs font-bold text-idle-emerald hover:underline flex items-center gap-1 cursor-pointer"
                >
                  <span>View all ({reels.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          )}

          {/* Circular Profile Bubbles Strip */}
          <div className="flex items-start gap-4 sm:gap-6 overflow-x-auto no-scrollbar py-2.5 px-1 scroll-smooth">
            {/* Add Reel Bubble (if user wants to post a 24h demo) */}
            {onOpenUpload && (
              <div className="flex-shrink-0 flex flex-col items-center text-center w-[78px] sm:w-[86px]">
                <button
                  type="button"
                  onClick={onOpenUpload}
                  className="w-16 h-16 sm:w-[70px] sm:h-[70px] rounded-full border-2 border-dashed border-idle-emerald/40 hover:border-idle-emerald flex items-center justify-center bg-idle-mint/50 hover:bg-idle-mint transition-all shadow-xs group cursor-pointer"
                  title="Add 24h Reel"
                >
                  <Plus className="w-6 h-6 text-idle-emerald group-hover:scale-110 transition-transform" />
                </button>
                <span className="text-xs font-bold text-idle-emerald mt-2 truncate w-full text-center">
                  Add Reel
                </span>
                <span className="text-[10px] text-idle-muted font-medium">
                  24h video
                </span>
              </div>
            )}

            {/* Horizontally Scrollable Provider Bubbles */}
            {prioritizedReels.map((reel) => {
              const avatar = AUTHOR_AVATARS[reel.author] || reel.image;
              const isNearby = (reel.area || '').toLowerCase().includes(userCity);

              return (
                <div
                  key={reel.id}
                  className="flex-shrink-0 flex flex-col items-center text-center w-[82px] sm:w-[90px] group"
                >
                  {/* Circular Profile Picture with Vibrant 24h Colored Ring */}
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => handleOpenReel(reel)}
                      className="relative p-[3px] rounded-full transition-transform duration-200 group-hover:scale-105 cursor-pointer shadow-sm focus:outline-none"
                      style={{
                        background: 'conic-gradient(from 180deg, #004f46, #d6a746, #e136a6, #004f46)'
                      }}
                      title={`Click to watch ${reel.author}'s 24h Reel`}
                      aria-label={`Open 24h Reel for ${reel.author}`}
                    >
                      {/* Inner White Rim */}
                      <div className="w-16 h-16 sm:w-[68px] sm:h-[68px] rounded-full p-[2px] bg-white overflow-hidden">
                        <img
                          src={avatar}
                          alt={reel.author}
                          className="w-full h-full rounded-full object-cover select-none"
                          loading="lazy"
                        />
                      </div>
                    </button>

                    {/* Play badge / 24h indicator on ring */}
                    <button
                      type="button"
                      onClick={() => handleOpenReel(reel)}
                      className="absolute -bottom-0.5 -right-0.5 w-5 h-5 rounded-full bg-idle-gold text-[#082f2c] flex items-center justify-center shadow-md border-2 border-white cursor-pointer hover:scale-110 transition-transform"
                      title="Watch 24h Reel"
                    >
                      <Play className="w-2.5 h-2.5 fill-current ml-0.5" />
                    </button>

                    {/* Nearby Pill if in user's city */}
                    {isNearby && (
                      <span className="absolute -top-1 left-1/2 -translate-x-1/2 px-1.5 py-0.2 rounded-full bg-emerald-600 text-[8px] font-black text-white uppercase tracking-wider shadow-xs pointer-events-none">
                        Nearby
                      </span>
                    )}
                  </div>

                  {/* Profile Name & Category - Clicking opens Provider Profile */}
                  <div className="mt-2 flex flex-col items-center w-full px-0.5">
                    <button
                      type="button"
                      onClick={() => handleOpenProfile(reel)}
                      className="text-xs font-bold text-[#082f2c] group-hover:text-idle-emerald truncate w-full text-center leading-tight hover:underline cursor-pointer"
                      title={`View ${reel.author}'s profile & listings`}
                    >
                      {reel.author}
                    </button>
                    <span className="text-[10px] text-idle-muted font-medium truncate w-full text-center mt-0.5">
                      {reel.category}
                    </span>
                    <span className="text-[9px] text-emerald-700/80 font-semibold truncate w-full text-center">
                      {reel.area?.split(',')[0]}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}


    </div>
  );
};
