import React, { useState } from 'react';
import { EliteStories } from '../../components/elite/EliteStories';
import { EliteFeaturedRow } from '../../components/elite/EliteFeaturedRow';
import { EliteMapCanvas } from '../../components/elite/EliteMapCanvas';
import {
  Compass,
  MapPin,
  Grid,
  List,
  Search,
  Filter,
  ArrowRight,
  ShieldCheck,
  Plane,
  Car,
  Building2,
  Calendar,
  Sparkles,
  Heart
} from 'lucide-react';

export const ELITE_TYPES = [
  { id: 'All', label: 'All', subtitle: 'The private collection', icon: Sparkles },
  { id: 'Aviation', label: 'Private Aviation', subtitle: 'FAA Part 135 empty legs', icon: Plane },
  { id: 'Ground', label: 'Vertiport Shuttles', subtitle: 'Executive black-car transit', icon: Car },
  { id: 'Estates', label: 'Sovereign Estates', subtitle: 'Private boardrooms & villas', icon: Building2 },
  { id: 'Vehicles', label: 'Exotic Vehicles', subtitle: 'Supercars & collectible drives', icon: Car },
  { id: 'Parking', label: 'Private Parking', subtitle: 'Gated vertiport arrival bays', icon: MapPin },
  { id: 'Events', label: 'Private Events', subtitle: 'Black-tie social circle', icon: Calendar },
  { id: 'Concierge', label: 'Concierge', subtitle: 'Private chef & bespoke errands', icon: Crown }
];

import { Crown } from 'lucide-react';

export const EliteDiscoverTab = ({ onOpenOffering }) => {
  const [layout, setLayout] = useState('Grid'); // 'Grid' | 'Map' | 'List'
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [savedOnly, setSavedOnly] = useState(false);
  const [savedIds, setSavedIds] = useState([]);

  const toggleSave = (id, e) => {
    e.stopPropagation();
    setSavedIds(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const offerings = [
    {
      id: 'av-1',
      category: 'Aviation',
      name: 'Cessna Citation X Super-Mid Jet',
      operator: 'Apex Jet Charter · TKI Hub',
      route: 'McKinney (TKI) → Aspen (ASE) Empty Leg',
      rate: '$4,200',
      unit: 'leg',
      seats: '8 Passengers · Mach 0.935',
      badge: 'FAA Part 135 Verified',
      image: 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=600&q=80',
      handoff: 'Private FBO Escort & Single-Use QR Boarding Pass'
    },
    {
      id: 'av-2',
      category: 'Aviation',
      name: 'Pilatus PC-12 NG Turboprop',
      operator: 'Lone Star Flight Group',
      route: 'Addison (ADS) Regional Fractional Lease',
      rate: '$1,850',
      unit: 'hour',
      seats: '6 Executive Club · 280 Knots',
      badge: 'FAA Part 135 Verified',
      image: 'https://images.unsplash.com/photo-1569154941061-e231b4725ef1?auto=format&fit=crop&w=600&q=80',
      handoff: 'Ramp-side valet handoff'
    },
    {
      id: 'av-3',
      category: 'Aviation',
      name: 'Gulfstream G550 Ultra Long Range',
      operator: 'Vanguard Global Aviation',
      route: 'McKinney National Dedicated Charter',
      rate: '$8,500',
      unit: 'hour',
      seats: '14 Passengers / Berthable',
      badge: 'FAA Part 135 Verified',
      image: 'https://images.unsplash.com/photo-1520437358207-323b43b50729?auto=format&fit=crop&w=600&q=80',
      handoff: 'Dedicated flight attendant & customs clearance'
    },
    {
      id: 'sh-1',
      category: 'Ground',
      name: 'Cadillac Escalade ESV Executive Suite',
      operator: 'Blackline Elite Chauffeurs',
      route: 'Frisco Station ⇄ DFW Airport / Addison FBO',
      rate: '$150',
      unit: 'hour',
      seats: '6 Passengers · Chauffeur',
      badge: 'Executive Chauffeur Licensed',
      image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
      handoff: 'Luggage portering & single-use QR transit token'
    },
    {
      id: 'sh-2',
      category: 'Ground',
      name: 'Mercedes-Maybach S580 First-Class',
      operator: 'Prestige Livery DFW',
      route: 'Plano Legacy West ⇄ McKinney National FBO',
      rate: '$225',
      unit: 'hour',
      seats: '3 VIP Reclining Seats',
      badge: 'Executive Protection Driver',
      image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?auto=format&fit=crop&w=600&q=80',
      handoff: 'Private security protocol'
    },
    {
      id: 'es-1',
      category: 'Estates',
      name: 'The Sovereign Glass Boardroom & Pavilion',
      operator: 'Stonebriar Executive Heritage',
      route: 'Frisco Executive Park · 3,400 sq ft',
      rate: '$450',
      unit: 'hour',
      seats: '24 Executive Board Seats',
      badge: 'Private Host Verified',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=600&q=80',
      handoff: 'On-site butler & biometric access QR code'
    },
    {
      id: 'es-2',
      category: 'Estates',
      name: 'Highland Park Modern Architectural Villa',
      operator: 'Park Cities Peer Asset Trust',
      route: 'Highland Park Private Estate · Pool & Lawns',
      rate: '$1,200',
      unit: 'hour',
      seats: 'Up to 60 Private Guests',
      badge: 'Private Host Verified',
      image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80',
      handoff: 'Private gate security clearance & digital lease'
    },
    {
      id: 'vh-1',
      category: 'Vehicles',
      name: 'Ferrari 488 Spider · Rosso Corsa',
      operator: 'Exotic Drive Collective DFW',
      route: 'Frisco Hub · Inspected Supercar',
      rate: '$1,450',
      unit: 'day',
      seats: '661 HP · V8 Twin-Turbo',
      badge: 'Insured Exotic Host Verified',
      image: 'https://images.unsplash.com/photo-1583416750470-965b2707b355?auto=format&fit=crop&w=600&q=80',
      handoff: 'Enclosed trailer drop-off & escrow custody'
    }
  ];

  const filtered = offerings.filter(item => {
    const matchCat = category === 'All' || item.category === category;
    const matchSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                        item.route.toLowerCase().includes(search.toLowerCase());
    const matchSaved = !savedOnly || savedIds.includes(item.id);
    return matchCat && matchSearch && matchSaved;
  });

  return (
    <div className="space-y-8">
      {/* 24-hr Highlights Row */}
      <EliteStories onOpenStory={(story) => onOpenOffering?.(story)} />

      {/* Featured Row */}
      <EliteFeaturedRow onSelectOffering={(item) => onOpenOffering?.(item)} />

      {/* Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        {ELITE_TYPES.map(cat => {
          const Icon = cat.icon;
          const isSelected = category === cat.id;

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 cursor-pointer shrink-0 border ${
                isSelected
                  ? 'bg-gradient-to-r from-[#d7b467] to-[#aa8334] text-black border-[#d7b467] shadow-lg scale-102'
                  : 'bg-black/60 text-gray-300 border-white/10 hover:border-[#d7b467]/50 hover:text-white'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Filter and Layout Mode Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-white/10">
        <div>
          <h3 className="font-serif text-lg font-bold text-white">
            {category === 'All' ? 'The Private Collection' : category}
          </h3>
          <p className="text-xs text-gray-400">
            {filtered.length} curated assets available in DFW radius
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Saved Only Filter */}
          <button
            type="button"
            onClick={() => setSavedOnly(prev => !prev)}
            className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
              savedOnly ? 'bg-rose-950 text-rose-300 border-rose-500/50' : 'bg-black/40 text-gray-400 border-white/10 hover:text-white'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${savedOnly ? 'fill-current text-rose-400' : ''}`} />
            <span>Saved ({savedIds.length})</span>
          </button>

          {/* Layout Mode Toggles */}
          <div className="flex items-center rounded-xl bg-black/60 border border-white/15 p-1 text-xs">
            <button
              type="button"
              onClick={() => setLayout('Grid')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                layout === 'Grid' ? 'bg-[#d7b467] text-black shadow-xs' : 'text-gray-400 hover:text-white'
              }`}
            >
              <Grid className="w-3 h-3" />
              <span>Grid</span>
            </button>
            <button
              type="button"
              onClick={() => setLayout('Map')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                layout === 'Map' ? 'bg-[#d7b467] text-black shadow-xs' : 'text-gray-400 hover:text-white'
              }`}
            >
              <MapPin className="w-3 h-3" />
              <span>Map</span>
            </button>
            <button
              type="button"
              onClick={() => setLayout('List')}
              className={`px-3 py-1 rounded-lg font-bold transition-colors cursor-pointer flex items-center gap-1.5 ${
                layout === 'List' ? 'bg-[#d7b467] text-black shadow-xs' : 'text-gray-400 hover:text-white'
              }`}
            >
              <List className="w-3 h-3" />
              <span>List</span>
            </button>
          </div>
        </div>
      </div>

      {/* Layout Content Rendering */}
      {layout === 'Map' ? (
        <EliteMapCanvas onSelectLocation={(loc) => onOpenOffering?.(loc)} />
      ) : layout === 'List' ? (
        <div className="rounded-2xl border border-white/10 bg-[#090d11] overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs text-white">
            <thead>
              <tr className="border-b border-white/10 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <th className="py-3 px-4">Offering</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Hub / Route</th>
                <th className="py-3 px-4">Capacity / Specs</th>
                <th className="py-3 px-4">Rate</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {filtered.map(item => (
                <tr
                  key={item.id}
                  onClick={() => onOpenOffering?.(item)}
                  className="hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <td className="py-3.5 px-4 font-bold flex items-center gap-2.5">
                    <img src={item.image} alt={item.name} className="w-10 h-10 rounded-lg object-cover" />
                    <span>{item.name}</span>
                  </td>
                  <td className="py-3.5 px-4 text-[#d7b467]">{item.category}</td>
                  <td className="py-3.5 px-4 text-gray-400">{item.route}</td>
                  <td className="py-3.5 px-4 text-gray-300">{item.seats}</td>
                  <td className="py-3.5 px-4 font-bold text-[#d7b467]">{item.rate}/{item.unit}</td>
                  <td className="py-3.5 px-4 text-right">
                    <span className="text-[11px] font-bold text-white hover:text-[#d7b467]">Inquire →</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        /* Grid Layout */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map(item => {
            const isSaved = savedIds.includes(item.id);

            return (
              <div
                key={item.id}
                onClick={() => onOpenOffering?.(item)}
                className="group relative rounded-3xl overflow-hidden border border-[#d7b467]/30 hover:border-[#d7b467] transition-all duration-300 shadow-xl hover:shadow-[0_16px_45px_rgba(215,180,103,0.25)] cursor-pointer flex flex-col justify-between min-h-[380px] hover:-translate-y-1.5 bg-[#090d11]"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="absolute inset-0 w-full h-full object-cover filter brightness-85 group-hover:brightness-100 transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040608] via-[#040608]/60 to-transparent pointer-events-none" />

                {/* Top Row: Pill Tag & Favorite button */}
                <div className="p-4 flex items-center justify-between z-10">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-[#d7b467]/50 text-[10px] font-bold text-[#faedd1]">
                    {item.category}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => toggleSave(item.id, e)}
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-white/80 hover:text-rose-400 hover:border-rose-400/60 transition-colors cursor-pointer"
                  >
                    <Heart className={`w-4 h-4 ${isSaved ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>
                </div>

                {/* Bottom Card Content */}
                <div className="p-5 z-10 space-y-2">
                  <div className="flex items-center gap-1.5 text-[10px] text-[#d7b467] font-semibold">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{item.badge}</span>
                  </div>
                  <h4 className="font-serif text-lg font-bold text-white group-hover:text-[#faedd1] transition-colors leading-snug">
                    {item.name}
                  </h4>
                  <p className="text-xs text-gray-300 line-clamp-1">{item.route}</p>
                  <p className="text-[11px] text-[#cbd6d0]">{item.seats}</p>

                  <div className="pt-2 flex items-center justify-between border-t border-white/10 text-xs">
                    <div>
                      <span className="font-extrabold text-base text-[#d7b467]">{item.rate}</span>
                      <span className="text-[10px] text-gray-400">/{item.unit}</span>
                    </div>
                    <div className="flex items-center gap-1 font-bold text-white text-xs group-hover:text-[#d7b467] transition-colors">
                      <span>Inquire</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

