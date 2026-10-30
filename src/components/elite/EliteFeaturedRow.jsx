import React from 'react';
import { Crown, ArrowRight, ShieldCheck, Star } from 'lucide-react';

export const EliteFeaturedRow = ({ onSelectOffering }) => {
  const featured = [
    {
      id: 'feat-1',
      title: 'Cessna Citation X Super-Mid Jet',
      category: 'Private Aviation',
      rate: '$4,200',
      unit: 'leg',
      location: 'McKinney National (TKI) → Aspen (ASE)',
      badge: 'FAA Part 135 Verified',
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'feat-2',
      title: 'Highland Park Modern Architectural Villa',
      category: 'Sovereign Estates',
      rate: '$1,200',
      unit: 'hour',
      location: 'Highland Park Private Estate · Pool & Lawns',
      badge: 'Private Host Verified',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 'feat-3',
      title: 'Mercedes-Maybach S580 Executive Livery',
      category: 'Vertiport Shuttles',
      rate: '$225',
      unit: 'hour',
      location: 'Legacy West Plano ⇄ Addison FBO Ramp',
      badge: 'Executive Chauffeur Licensed',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80'
    }
  ];

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between text-xs px-1">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#d7b467] flex items-center gap-1.5">
          <Crown className="w-3.5 h-3.5 text-[#d7b467]" />
          <span>Curated for Exceptional Days</span>
        </span>
        <span className="text-[10px] text-gray-400">Exclusive Peer Assets</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {featured.map(item => (
          <div
            key={item.id}
            onClick={() => onSelectOffering?.(item)}
            className="group relative rounded-2xl overflow-hidden border border-[#d7b467]/30 hover:border-[#d7b467] transition-all duration-300 shadow-lg cursor-pointer bg-[#090d11] min-h-[200px] flex flex-col justify-end p-4 hover:-translate-y-1"
          >
            <img
              src={item.image}
              alt={item.title}
              className="absolute inset-0 w-full h-full object-cover filter brightness-75 group-hover:brightness-90 transition-all duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none" />

            <div className="relative z-10 space-y-1.5">
              <span className="text-[9px] font-bold uppercase tracking-wider text-[#d7b467] bg-black/60 px-2 py-0.5 rounded-full border border-[#d7b467]/40 inline-block">
                {item.category}
              </span>
              <h4 className="font-serif text-sm font-bold text-white group-hover:text-[#faedd1] transition-colors line-clamp-1">
                {item.title}
              </h4>
              <div className="flex items-center justify-between pt-1 border-t border-white/10 text-xs">
                <span className="font-bold text-[#d7b467] text-sm">
                  {item.rate} <small className="text-[10px] text-gray-400 font-normal">/{item.unit}</small>
                </span>
                <span className="text-[10px] font-bold text-white flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  Inquire <ArrowRight className="w-3 h-3 text-[#d7b467]" />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

