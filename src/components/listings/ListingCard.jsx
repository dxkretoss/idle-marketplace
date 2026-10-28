import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Heart, ShieldCheck, Star } from 'lucide-react';

export const ListingCard = ({ listing }) => {
  const { setActiveListing, likes, toggleLike } = useApp();

  const isLiked = likes.includes(listing.id);

  return (
    <article className="glass-card glass-card-hover rounded-2xl overflow-hidden flex flex-col group relative">
      {/* Photo Container */}
      <div 
        onClick={() => setActiveListing(listing)}
        className="relative h-44 sm:h-48 overflow-hidden cursor-pointer bg-emerald-950/5"
      >
        <img 
          src={listing.image} 
          alt={listing.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        
        {/* Category / Type Tag */}
        <span className="absolute top-2.5 left-2.5 text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-md text-[#004f46] shadow-sm">
          {listing.tag || listing.category}
        </span>

        {/* Rating chip */}
        {listing.rating && (
          <span className="absolute bottom-2.5 left-2.5 text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#002f2a]/80 backdrop-blur-md text-white flex items-center gap-1 shadow-sm">
            <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
            <span>{listing.rating}</span>
          </span>
        )}
      </div>

      {/* Favorite Toggle Button */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          toggleLike(listing.id);
        }}
        className={`absolute top-2.5 right-2.5 w-8 h-8 rounded-full flex items-center justify-center transition-all backdrop-blur-md ${
          isLiked 
            ? 'bg-red-500/90 text-white shadow-md scale-105' 
            : 'bg-white/80 text-idle-muted hover:text-red-500 hover:bg-white shadow-sm'
        }`}
        title={isLiked ? 'Remove favorite' : 'Save favorite'}
        aria-label={isLiked ? 'Remove favorite' : 'Save favorite'}
      >
        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
      </button>

      {/* Body Details */}
      <div 
        onClick={() => setActiveListing(listing)}
        className="p-3.5 flex-1 flex flex-col justify-between cursor-pointer"
      >
        <div>
          <h3 className="text-sm font-bold text-[#112d26] group-hover:text-idle-emerald transition-colors line-clamp-1 leading-snug">
            {listing.title}
          </h3>

          <div className="flex items-baseline gap-1 mt-1 text-[#004f46]">
            <span className="text-base font-extrabold">${listing.price}</span>
            <span className="text-[11px] font-medium text-idle-muted">/ {listing.unit}</span>
          </div>

          <div className="flex items-center gap-1 text-[11px] text-idle-muted mt-1.5">
            <MapPin className="w-3 h-3 text-idle-emerald flex-shrink-0" />
            <span className="truncate">{listing.area} · North Texas</span>
          </div>
        </div>

        {/* Owner & Demo tag */}
        <div className="flex items-center justify-between pt-2.5 mt-2 border-t border-idle-line/60 text-[11px]">
          <span className="text-idle-muted truncate max-w-[120px]">
            {listing.owner}
          </span>
          <span className="text-[9px] font-bold text-amber-800 bg-amber-100/70 px-1.5 py-0.5 rounded">
            DEMO
          </span>
        </div>
      </div>
    </article>
  );
};
