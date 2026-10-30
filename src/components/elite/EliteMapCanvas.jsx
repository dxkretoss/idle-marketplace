import React, { useState } from 'react';
import { MapPin, Plus, Minus, RotateCcw, ArrowRight, ShieldCheck, Heart } from 'lucide-react';

const DFW_LOCATIONS = [
  { id: 'loc-1', city: 'Frisco', name: 'Frisco Station Vertiport Corridor', lat: 33.15, lng: -96.82, count: 4, type: 'Shuttles', price: '$150/hr', img: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80' },
  { id: 'loc-2', city: 'McKinney', name: 'McKinney National Airport (TKI Hub)', lat: 33.18, lng: -96.59, count: 3, type: 'Aviation', price: '$4,200/leg', img: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=400&q=80' },
  { id: 'loc-3', city: 'Addison', name: 'Addison (ADS) Regional FBO Ramp', lat: 32.96, lng: -96.83, count: 2, type: 'Aviation', price: '$1,850/hr', img: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=400&q=80' },
  { id: 'loc-4', city: 'Highland Park', name: 'Highland Park Private Estates', lat: 32.83, lng: -96.80, count: 2, type: 'Estates', price: '$1,200/hr', img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=400&q=80' },
  { id: 'loc-5', city: 'Southlake', name: 'Westlake & Southlake Helipad Grounds', lat: 32.94, lng: -97.13, count: 3, type: 'Estates', price: '$6,500/day', img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=400&q=80' }
];

export const EliteMapCanvas = ({ onSelectLocation }) => {
  const [zoom, setZoom] = useState(1);
  const [selectedPin, setSelectedPin] = useState(DFW_LOCATIONS[0]);

  return (
    <div className="rounded-3xl border border-[#d7b467]/30 bg-[#090d11] p-4 sm:p-6 shadow-2xl relative overflow-hidden space-y-4">
      {/* Map Control Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 relative z-10">
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#d7b467] block">
            Interactive Geospatial Map
          </span>
          <h3 className="font-serif text-lg font-bold text-white">
            North Texas Private Peer Asset Radius
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center rounded-xl bg-black/60 border border-[#d7b467]/40 p-1 text-xs">
            <button
              type="button"
              onClick={() => setZoom(prev => Math.min(prev + 0.2, 1.8))}
              className="p-1.5 hover:bg-white/10 rounded-lg text-white transition-colors cursor-pointer"
              title="Zoom in"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoom(prev => Math.max(prev - 0.2, 0.8))}
              className="p-1.5 hover:bg-white/10 rounded-lg text-white transition-colors cursor-pointer"
              title="Zoom out"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => setZoom(1)}
              className="p-1.5 hover:bg-white/10 rounded-lg text-white transition-colors cursor-pointer"
              title="Reset center"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Styled Canvas Map Simulator */}
      <div className="h-80 sm:h-96 w-full rounded-2xl bg-[#0e161c] border border-white/10 relative overflow-hidden flex items-center justify-center select-none">
        {/* Subtle Map Grid lines */}
        <div className="absolute inset-0 bg-[radial-gradient(#d7b467_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

        {/* Ambient Map Glow */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60 pointer-events-none" />

        {/* Map Cluster Nodes Container with Zoom Transform */}
        <div
          className="relative w-full h-full transition-transform duration-300 ease-out"
          style={{ transform: `scale(${zoom})` }}
        >
          {DFW_LOCATIONS.map((loc, idx) => {
            const isSelected = selectedPin?.id === loc.id;
            // Map coordinates to percentages on canvas
            const topPositions = ['28%', '20%', '48%', '75%', '55%'];
            const leftPositions = ['45%', '72%', '48%', '52%', '20%'];

            return (
              <div
                key={loc.id}
                style={{ top: topPositions[idx], left: leftPositions[idx] }}
                className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
              >
                <button
                  type="button"
                  onClick={() => setSelectedPin(loc)}
                  className={`group flex items-center gap-2 px-3 py-1.5 rounded-full border shadow-xl backdrop-blur-md transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#d7b467] text-black border-white scale-110 font-black ring-4 ring-[#d7b467]/30'
                      : 'bg-black/80 text-white border-[#d7b467]/50 hover:border-[#d7b467]'
                  }`}
                >
                  <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-black' : 'text-[#d7b467]'}`} />
                  <span className="text-xs font-bold whitespace-nowrap">{loc.city}</span>
                  <span className={`text-[9px] font-black px-1.5 py-0.2 rounded-full ${
                    isSelected ? 'bg-black text-[#d7b467]' : 'bg-[#d7b467]/20 text-[#d7b467]'
                  }`}>
                    {loc.count}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Selected Pin Mini-Popup Card */}
        {selectedPin && (
          <div className="absolute bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:w-96 rounded-2xl bg-black/90 border border-[#d7b467]/60 p-3.5 shadow-2xl backdrop-blur-md flex items-center gap-3.5 z-30 animate-in fade-in slide-in-from-bottom-2 duration-150">
            <img
              src={selectedPin.img}
              alt={selectedPin.name}
              className="w-16 h-16 rounded-xl object-cover border border-[#d7b467]/40 shrink-0"
            />
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-1.5">
                <span className="text-[9px] font-bold uppercase tracking-wider text-[#d7b467] bg-[#d7b467]/20 px-2 py-0.2 rounded">
                  {selectedPin.type}
                </span>
                <span className="text-[10px] text-gray-400">{selectedPin.city} Metro</span>
              </div>
              <h5 className="font-bold text-xs text-white truncate">
                {selectedPin.name}
              </h5>
              <div className="flex items-center justify-between text-xs">
                <span className="font-extrabold text-[#d7b467]">{selectedPin.price}</span>
                <button
                  type="button"
                  onClick={() => onSelectLocation?.(selectedPin)}
                  className="px-2.5 py-1 rounded-lg bg-[#d7b467] text-black font-bold text-[10px] hover:opacity-95 flex items-center gap-1 cursor-pointer"
                >
                  <span>Inquire</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

