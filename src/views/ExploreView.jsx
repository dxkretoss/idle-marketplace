import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { ListingCard } from '../components/listings/ListingCard';
import { 
  Search, 
  Heart, 
  Sparkles, 
  Plus, 
  SlidersHorizontal,
  XCircle,
  ChevronRight,
  Check,
  LayoutGrid,
  Map as MapIcon,
  ListFilter,
  Minus,
  RotateCcw,
  Star,
  MapPin,
  ExternalLink
} from 'lucide-react';

const EXPLORE_CATEGORIES = [
  {
    id: 'All',
    title: 'Everything',
    image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'Tools',
    title: 'Tools & equipment',
    image: 'https://images.unsplash.com/photo-1610477865545-37711c53144d?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'Outdoor',
    title: 'Outdoor & adventure',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'Home',
    title: 'Home & living',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'Electronics',
    title: 'Tech & media',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'Vehicles',
    title: 'Vehicles',
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'Services',
    title: 'Local workers',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'Fashion',
    title: 'Fashion & style',
    image: 'https://images.unsplash.com/photo-1746730921429-3a6489172f1b?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'Events',
    title: 'Events & experiences',
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'Enterprise',
    title: 'Business & enterprise',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=400&q=80'
  },
  {
    id: 'Fitness',
    title: 'Fitness & wellness',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=400&q=80'
  }
];


// Approximate North Texas coordinates mapped to percentage positions on schematic
const DFW_COORDS = {
  'Frisco': { x: 44, y: 26 },
  'Plano': { x: 56, y: 42 },
  'McKinney': { x: 74, y: 18 },
  'Allen': { x: 70, y: 34 },
  'Richardson': { x: 62, y: 56 },
  'Dallas': { x: 52, y: 78 },
  'Carrollton': { x: 40, y: 48 },
  'Lewisville': { x: 30, y: 38 },
  'Denton': { x: 22, y: 16 },
  'Southlake': { x: 26, y: 46 },
  'Grapevine': { x: 28, y: 54 },
  'Irving': { x: 38, y: 66 },
  'Fort Worth': { x: 16, y: 76 },
  'Arlington': { x: 32, y: 76 },
  'Grand Prairie': { x: 40, y: 80 },
  'Garland': { x: 72, y: 62 }
};

const getListingCoords = (listing, index) => {
  const base = DFW_COORDS[listing.area] || { x: 50, y: 50 };
  // Small offset for overlapping cities so pins don't stack directly
  const offsetX = ((listing.id * 17) % 9) - 4;
  const offsetY = ((listing.id * 23) % 9) - 4;
  return {
    x: Math.min(88, Math.max(12, base.x + offsetX)),
    y: Math.min(86, Math.max(14, base.y + offsetY))
  };
};

export const ExploreView = () => {
  const { 
    search, 
    setSearch, 
    category, 
    setCategory, 
    sortBy, 
    setSortBy, 
    onlyFavorites, 
    setOnlyFavorites, 
    listings, 
    likes, 
    addToast,
    setActiveListing
  } = useApp();

  const [viewMode, setViewMode] = useState('grid');
  const [selectedPinId, setSelectedPinId] = useState(null);
  const [mapZoom, setMapZoom] = useState(1);

  // Filter listings based on search, category, and favorites
  let filtered = listings.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    const searchString = `${item.title} ${item.owner} ${item.area} ${item.tag || ''} ${item.desc || ''}`.toLowerCase();
    const matchesSearch = searchString.includes(search.toLowerCase());
    const matchesFavorites = !onlyFavorites || likes.includes(item.id);
    return matchesCategory && matchesSearch && matchesFavorites;
  });

  // Sorting
  if (sortBy === 'low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'az') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  const handleSaveSearch = () => {
    addToast(`Saved alert for "${search || category}" listings in North Texas!`, 'success');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Explore Hero Section with Background Image, Centered Text & Search Bar */}
      <section className="relative rounded-3xl overflow-hidden min-h-[270px] sm:min-h-[300px] flex flex-col items-center justify-center text-center p-6 sm:p-10 shadow-glass border border-emerald-950/20 isolate select-none">
        {/* Background Photography - Vivid, Sharp and Clearly Visible */}
        <img 
          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=85" 
          alt="Local equipment and pros workshop"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&q=85';
          }}
          className="absolute inset-0 w-full h-full object-cover object-center -z-20 opacity-85 brightness-[0.82] contrast-[1.08]"
        />
        {/* Soft Contrast Scrim Overlay for Crystal Clear Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#001f1b]/80 via-black/35 to-[#00241e]/50 -z-10" />
        
        {/* Ambient Warm Golden Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-idle-gold/20 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Centered Content with High-Contrast Drop Shadow */}
        <div className="relative z-10 max-w-2xl mx-auto space-y-2 drop-shadow-md">
          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-idle-goldLight drop-shadow block">
            Local Marketplace Directory · DFW Pilot
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight drop-shadow-lg">
            Discover what’s around you.
          </h1>
          <p className="text-xs sm:text-sm text-white/90 max-w-xl mx-auto leading-relaxed drop-shadow font-medium">
            Shop rentals, local pros, creative equipment, and enterprise operations with approximate neighborhood locations.
          </p>
        </div>

        {/* Centered Search Bar Below Text */}
        <div className="w-full max-w-2xl mt-5 relative z-10 flex items-center bg-white/95 backdrop-blur-md border border-white/30 rounded-full p-1.5 shadow-2xl focus-within:ring-2 focus-within:ring-idle-gold transition-all">
          <div className="pl-3.5 pr-2 text-idle-emerald flex-shrink-0">
            <Search className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search gear, people, categories or keywords..."
            className="w-full bg-transparent border-0 outline-none text-xs sm:text-sm text-[#172d28] placeholder:text-[#7d978d] px-1 font-medium"
            aria-label="Search marketplace listings"
          />
          {search && (
            <button
              type="button"
              onClick={() => setSearch('')}
              className="p-1 rounded-full text-idle-muted hover:text-[#172d28] transition-colors mr-1 cursor-pointer"
              title="Clear search"
            >
              <XCircle className="w-4 h-4" />
            </button>
          )}
          <button
            type="button"
            onClick={() => addToast(`Searching for: ${search || 'all listings'}`, 'info')}
            className="gold-gradient-btn px-5 py-2.5 rounded-full text-xs font-bold shadow-md flex items-center gap-1.5 flex-shrink-0 cursor-pointer"
          >
            <span>Search</span>
          </button>
        </div>
      </section>

      {/* Horizontal Category Strip - Single Scrollable Row (Matching Client Screenshot 1) */}
      <div className="flex items-center gap-2.5 sm:gap-3 overflow-x-auto no-scrollbar py-1">
        {EXPLORE_CATEGORIES.map((cat) => {
          const isSelected = category === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setCategory(cat.id)}
              className={`group flex flex-col items-center w-28 sm:w-32 flex-shrink-0 rounded-2xl overflow-hidden border transition-all duration-200 cursor-pointer bg-white ${
                isSelected
                  ? 'border-2 border-idle-emerald shadow-sm ring-1 ring-idle-emerald/30'
                  : 'border-idle-line hover:border-idle-emerald/40 hover:shadow-xs'
              }`}
            >
              {/* Photo on Top */}
              <div className="relative w-full h-16 sm:h-20 overflow-hidden bg-emerald-950/5">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Bold Title Centered at Bottom */}
              <div className="w-full py-2 px-1 text-center">
                <span className={`text-[11px] sm:text-xs font-bold leading-tight block truncate ${
                  isSelected ? 'text-idle-emerald font-extrabold' : 'text-[#0e2e28] group-hover:text-idle-emerald'
                }`}>
                  {cat.title}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Results Header with View Mode Switcher, Favorites, Save Search & Sort */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3.5 pt-2 border-t border-idle-line/60">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2 flex-wrap">
            <h2 className="text-base sm:text-lg font-bold text-[#0e2e28]">
              {onlyFavorites
                ? 'Your Saved Favorites'
                : category === 'All'
                  ? 'All Marketplace Offerings'
                  : `${EXPLORE_CATEGORIES.find(c => c.id === category)?.title || category} Offerings`}
            </h2>
            {category !== 'All' && !onlyFavorites && (
              <button
                type="button"
                onClick={() => setCategory('All')}
                className="text-[11px] font-bold text-idle-emerald bg-idle-mint px-2 py-0.5 rounded-full hover:bg-idle-mint/80 transition-colors cursor-pointer"
              >
                Reset filter (All) &times;
              </button>
            )}
          </div>
          <span className="text-[11px] text-idle-muted">
            ({filtered.length} {filtered.length === 1 ? 'listing' : 'listings'} found)
          </span>
        </div>

        {/* Right side controls: View Mode Switcher, Favorites, Save Search & Sort */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-2.5">
          {/* Segmented View Mode Switcher: Grid, Map, List */}
          <div className="inline-flex items-center p-1 rounded-2xl bg-white border border-idle-line shadow-2xs">
            <button
              type="button"
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'grid'
                  ? 'bg-[#004f46] text-white shadow-xs'
                  : 'text-idle-muted hover:text-[#172d28] hover:bg-black/5'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setViewMode('map');
                if (!selectedPinId && filtered.length > 0) {
                  setSelectedPinId(filtered[0].id);
                }
              }}
              title="Interactive North Texas Map View"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'map'
                  ? 'bg-[#004f46] text-white shadow-xs'
                  : 'text-idle-muted hover:text-[#172d28] hover:bg-black/5'
              }`}
            >
              <MapIcon className="w-3.5 h-3.5" />
              <span>Map</span>
            </button>

            <button
              type="button"
              onClick={() => setViewMode('list')}
              title="List View"
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-[#004f46] text-white shadow-xs'
                  : 'text-idle-muted hover:text-[#172d28] hover:bg-black/5'
              }`}
            >
              <ListFilter className="w-3.5 h-3.5" />
              <span>List</span>
            </button>
          </div>

          {/* Favorites Filter */}
          <button
            onClick={() => setOnlyFavorites(!onlyFavorites)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border cursor-pointer ${
              onlyFavorites
                ? 'bg-red-50 text-red-600 border-red-200 shadow-sm'
                : 'bg-white hover:bg-black/5 text-[#213f37] border-idle-line'
            }`}
          >
            <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-current text-red-500' : ''}`} />
            <span>Saved ({likes.length})</span>
          </button>

          {/* Save Search */}
          <button
            onClick={handleSaveSearch}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-white hover:bg-black/5 text-[#213f37] border border-idle-line transition-all cursor-pointer"
          >
            <Sparkles className="w-3.5 h-3.5 text-idle-gold" />
            <span>Save Alert</span>
          </button>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-idle-line rounded-xl px-2.5 py-1.5 text-xs font-semibold text-[#172d28] outline-none focus:border-idle-emerald cursor-pointer"
              aria-label="Sort listings"
            >
              <option value="featured">Featured First</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="az">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main View Area: Grid, Map, or List */}
      {filtered.length > 0 ? (
        <>
          {/* 1. MAP VIEW */}
          {viewMode === 'map' && (
            <div className="space-y-3">
              <div className="relative w-full h-[520px] sm:h-[580px] rounded-3xl overflow-hidden bg-[#eef4f1] border border-idle-emerald/20 shadow-glass select-none isolate">
                {/* Stylized North Texas Highway Network SVG Background */}
                <svg
                  className="absolute inset-0 w-full h-full pointer-events-none transition-transform duration-300"
                  style={{ transform: `scale(${mapZoom})`, transformOrigin: 'center center' }}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern id="map-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#d5e5dd" strokeWidth="0.8" opacity="0.45" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#map-grid)" />

                  {/* Primary Highways - White Ribbons with Subtle Casing */}
                  {/* Dallas North Tollway (Vertical spine) */}
                  <line x1="48%" y1="0%" x2="52%" y2="100%" stroke="#e0ece6" strokeWidth="18" strokeLinecap="round" />
                  <line x1="48%" y1="0%" x2="52%" y2="100%" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />

                  {/* Sam Rayburn Tollway / SRT 121 (Diagonal through Frisco/Plano/McKinney) */}
                  <line x1="15%" y1="50%" x2="85%" y2="15%" stroke="#e0ece6" strokeWidth="18" strokeLinecap="round" />
                  <line x1="15%" y1="50%" x2="85%" y2="15%" stroke="#ffffff" strokeWidth="10" strokeLinecap="round" />

                  {/* President George Bush Turnpike / PGBT 161 (Mid-arch) */}
                  <path d="M 10% 70% Q 45% 45% 90% 55%" fill="none" stroke="#e0ece6" strokeWidth="16" strokeLinecap="round" />
                  <path d="M 10% 70% Q 45% 45% 90% 55%" fill="none" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />

                  {/* US-75 Central Expressway (East corridor) */}
                  <line x1="68%" y1="0%" x2="60%" y2="100%" stroke="#e0ece6" strokeWidth="16" strokeLinecap="round" />
                  <line x1="68%" y1="0%" x2="60%" y2="100%" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />

                  {/* I-35E Stem (West corridor) */}
                  <line x1="28%" y1="0%" x2="34%" y2="100%" stroke="#e0ece6" strokeWidth="16" strokeLinecap="round" />
                  <line x1="28%" y1="0%" x2="34%" y2="100%" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />

                  {/* I-635 LBJ Freeway (South corridor) */}
                  <line x1="10%" y1="80%" x2="90%" y2="82%" stroke="#e0ece6" strokeWidth="14" strokeLinecap="round" />
                  <line x1="10%" y1="80%" x2="90%" y2="82%" stroke="#ffffff" strokeWidth="7" strokeLinecap="round" />

                  {/* Water bodies (Lewisville Lake & Lavon Lake) */}
                  <circle cx="28%" cy="32%" r="28" fill="#d3e7df" opacity="0.6" />
                  <circle cx="82%" cy="28%" r="24" fill="#d3e7df" opacity="0.6" />

                  {/* City Landmarks Typography */}
                  <text x="44%" y="22%" fill="#608678" fontSize="13" fontWeight="bold" letterSpacing="1">FRISCO</text>
                  <text x="56%" y="40%" fill="#608678" fontSize="13" fontWeight="bold" letterSpacing="1">PLANO</text>
                  <text x="74%" y="14%" fill="#608678" fontSize="12" fontWeight="bold" letterSpacing="1">MCKINNEY</text>
                  <text x="72%" y="32%" fill="#608678" fontSize="11" fontWeight="bold" letterSpacing="1">ALLEN</text>
                  <text x="63%" y="53%" fill="#608678" fontSize="11" fontWeight="bold" letterSpacing="1">RICHARDSON</text>
                  <text x="50%" y="84%" fill="#52786b" fontSize="14" fontWeight="extrabold" letterSpacing="1.5">DALLAS</text>
                  <text x="12%" y="74%" fill="#608678" fontSize="12" fontWeight="bold" letterSpacing="1">FT. WORTH</text>
                  <text x="28%" y="74%" fill="#608678" fontSize="11" fontWeight="bold" letterSpacing="1">ARLINGTON</text>
                  <text x="20%" y="14%" fill="#608678" fontSize="11" fontWeight="bold" letterSpacing="1">DENTON</text>
                </svg>

                {/* Map Control Buttons: Zoom In, Zoom Out, Reset */}
                <div className="absolute top-4 right-4 z-20 flex flex-col gap-1.5 bg-white/95 backdrop-blur-md p-1 rounded-2xl shadow-md border border-idle-line">
                  <button
                    type="button"
                    onClick={() => setMapZoom(prev => Math.min(1.5, prev + 0.15))}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-idle-charcoal hover:bg-idle-mint hover:text-idle-emerald transition-colors font-bold text-sm cursor-pointer"
                    title="Zoom in"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapZoom(prev => Math.max(0.85, prev - 0.15))}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-idle-charcoal hover:bg-idle-mint hover:text-idle-emerald transition-colors font-bold text-sm cursor-pointer"
                    title="Zoom out"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setMapZoom(1)}
                    className="w-8 h-8 rounded-xl flex items-center justify-center text-idle-muted hover:bg-idle-mint hover:text-idle-emerald transition-colors cursor-pointer"
                    title="Reset view"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Interactive Dynamic Price Pins Container */}
                <div 
                  className="absolute inset-0 transition-transform duration-300"
                  style={{ transform: `scale(${mapZoom})`, transformOrigin: 'center center' }}
                >
                  {filtered.map((item, idx) => {
                    const coords = getListingCoords(item, idx);
                    const isSelected = selectedPinId === item.id;
                    return (
                      <div
                        key={item.id}
                        style={{
                          left: `${coords.x}%`,
                          top: `${coords.y}%`,
                          transform: 'translate(-50%, -50%)'
                        }}
                        className={`absolute transition-all duration-200 ${
                          isSelected ? 'z-30' : 'z-10 hover:z-20'
                        }`}
                      >
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPinId(item.id);
                            setActiveListing(item);
                          }}
                          className={`group flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-extrabold shadow-md transition-all cursor-pointer whitespace-nowrap ${
                            isSelected
                              ? 'bg-idle-gold text-[#122821] ring-4 ring-idle-gold/30 scale-115 shadow-xl'
                              : 'bg-[#004f46] text-white hover:bg-emerald-600 hover:scale-105'
                          }`}
                        >
                          <span>${item.price}</span>
                          {isSelected && <span className="text-[10px] opacity-80">/{item.unit}</span>}
                        </button>
                      </div>
                    );
                  })}
                </div>

                {/* Floating Selected Listing Preview Card (Anchored at Bottom Left of Map) */}
                {selectedPinId && (
                  (() => {
                    const activePinListing = filtered.find(l => l.id === selectedPinId) || filtered[0];
                    if (!activePinListing) return null;
                    return (
                      <div className="absolute bottom-4 left-4 z-20 max-w-sm sm:max-w-md w-full bg-white/95 backdrop-blur-md p-3 sm:p-3.5 rounded-2xl border border-idle-line shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-150">
                        <div className="flex items-center gap-3">
                          <img
                            src={activePinListing.image}
                            alt={activePinListing.title}
                            className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-idle-line shrink-0"
                          />
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="text-[10px] font-bold text-idle-muted uppercase tracking-wider flex items-center gap-1">
                                <MapPin className="w-3 h-3 text-idle-gold" />
                                <span>{activePinListing.area} · North Texas</span>
                              </span>
                              <div className="flex items-center gap-0.5 text-xs font-bold text-amber-500">
                                <Star className="w-3 h-3 fill-amber-500" />
                                <span>{activePinListing.rating}</span>
                              </div>
                            </div>

                            <h4 className="text-xs sm:text-sm font-bold text-[#172d28] truncate mt-0.5">
                              {activePinListing.title}
                            </h4>

                            <div className="flex items-center justify-between gap-2 mt-1.5">
                              <div className="text-xs font-extrabold text-[#004f46]">
                                <span>${activePinListing.price}</span>
                                <span className="text-[10px] text-idle-muted font-normal">/{activePinListing.unit}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => setActiveListing(activePinListing)}
                                className="gold-gradient-btn px-3 py-1 rounded-lg text-xs font-bold shadow-xs flex items-center gap-1 cursor-pointer"
                              >
                                <span>View Details</span>
                                <ExternalLink className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })()
                )}

                {/* Bottom Right Disclaimer Watermark (Matching Screenshot) */}
                <div className="absolute bottom-2.5 right-3.5 z-10 pointer-events-none">
                  <span className="text-[9px] sm:text-[10px] font-medium text-[#497062]/80 bg-white/70 backdrop-blur-xs px-2 py-0.5 rounded-md border border-[#cde0d7]/40 shadow-2xs">
                    Illustrative North Texas schematic · pins are not live GPS coordinates
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* 2. GRID VIEW (Default 4-Column Cards Grid) */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filtered.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}

          {/* 3. LIST VIEW (Horizontal Rows) */}
          {viewMode === 'list' && (
            <div className="space-y-3">
              {filtered.map((listing) => (
                <div
                  key={listing.id}
                  onClick={() => setActiveListing(listing)}
                  className="glass-card p-3 sm:p-4 rounded-2xl border border-idle-line hover:border-idle-emerald/40 bg-white transition-all shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 cursor-pointer hover:shadow-md group"
                >
                  <div className="flex items-center gap-3.5 min-w-0">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-20 h-20 sm:w-24 sm:h-24 rounded-xl object-cover border border-idle-line shrink-0 group-hover:scale-102 transition-transform"
                    />
                    <div className="min-w-0 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-idle-emerald bg-idle-mint px-2 py-0.5 rounded-full">
                          {listing.category}
                        </span>
                        <span className="text-xs text-idle-muted flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-idle-gold" />
                          <span>{listing.area}, TX</span>
                        </span>
                      </div>
                      <h3 className="text-sm sm:text-base font-bold text-[#172d28] truncate group-hover:text-idle-emerald transition-colors">
                        {listing.title}
                      </h3>
                      <p className="text-xs text-idle-muted truncate max-w-md font-normal">
                        {listing.desc}
                      </p>
                    </div>
                  </div>

                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-2 shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-idle-line/60">
                    <div className="text-right">
                      <span className="text-lg sm:text-xl font-extrabold text-[#004f46]">${listing.price}</span>
                      <span className="text-xs text-idle-muted font-normal">/{listing.unit}</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveListing(listing);
                      }}
                      className="gold-gradient-btn px-4 py-1.5 rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      ) : (
        <div className="glass-card p-12 text-center rounded-3xl space-y-3">
          <div className="w-12 h-12 rounded-full bg-idle-mint text-idle-emerald mx-auto flex items-center justify-center">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-lg font-bold text-[#172d28]">No matching listings found</h3>
          <p className="text-xs text-idle-muted max-w-sm mx-auto">
            Try adjusting your search keywords, clear category filters, or remove the favorites filter.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setCategory('All');
              setOnlyFavorites(false);
            }}
            className="emerald-gradient-btn px-4 py-2 rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
