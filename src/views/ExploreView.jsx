import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { ListingCard } from '../components/listings/ListingCard';
import { 
  Search, 
  Heart, 
  Sparkles, 
  Plus, 
  XCircle, 
  LayoutGrid, 
  Map as MapIcon, 
  ListFilter, 
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

const DEMO_CITY_CENTERS = {
  Frisco: [33.1507, -96.8236],
  Plano: [33.0198, -96.6989],
  Allen: [33.1032, -96.6706],
  McKinney: [33.1972, -96.6398],
  Dallas: [32.7767, -96.7970],
  Richardson: [32.9483, -96.7299]
};

const approxDistance = (a, b) => {
  if (!a || !b) return 0;
  const rad = Math.PI / 180;
  const dlat = (a[0] - b[0]) * rad, dlon = (a[1] - b[1]) * rad;
  const z = Math.sin(dlat / 2) ** 2 + Math.cos(a[0] * rad) * Math.cos(b[0] * rad) * Math.sin(dlon / 2) ** 2;
  return 3958.8 * 2 * Math.asin(Math.min(1, Math.sqrt(z)));
};

const MAP_CITIES = {
  Frisco: [31, 30],
  Plano: [58, 56],
  Allen: [72, 42],
  McKinney: [73, 15],
  Dallas: [37, 85],
  Richardson: [49, 72]
};

const normalizeCity = (areaStr) => {
  const clean = String(areaStr || '').toLowerCase();
  if (clean.includes('frisco')) return 'Frisco';
  if (clean.includes('plano')) return 'Plano';
  if (clean.includes('allen')) return 'Allen';
  if (clean.includes('mckinney')) return 'McKinney';
  if (clean.includes('dallas')) return 'Dallas';
  if (clean.includes('richardson')) return 'Richardson';
  return 'Frisco';
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
    setActiveListing,
    setRoute
  } = useApp();

  const [viewMode, setViewMode] = useState('grid');
  const [mapCity, setMapCity] = useState('Frisco');
  const [mapRadius, setMapRadius] = useState(40);
  const [mapPan, setMapPan] = useState({ x: 0, y: 0 });
  const [mapZoom, setMapZoom] = useState(1);
  const [selectedMapId, setSelectedMapId] = useState(null);
  const [savedSearches, setSavedSearches] = useState([]);
  const [showScrollHint, setShowScrollHint] = useState(false);
  const hintTimeoutRef = useRef(null);

  // Drag interaction refs for smooth map panning
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, panX: 0, panY: 0 });

  // Filter listings based on search, category, favorites, and geographic radius
  let filtered = listings.filter((item) => {
    const matchesCategory = category === 'All' || item.category === category;
    const searchString = `${item.title} ${item.owner} ${item.area} ${item.tag || ''} ${item.desc || ''}`.toLowerCase();
    const matchesSearch = searchString.includes(search.toLowerCase());
    const matchesFavorites = !onlyFavorites || likes.includes(item.id);
    return matchesCategory && matchesSearch && matchesFavorites;
  });

  // Geographic distance filter using Haversine formula based on selected Area & Radius
  filtered = filtered.filter((item) => {
    const centerCoords = DEMO_CITY_CENTERS[mapCity] || DEMO_CITY_CENTERS.Frisco;
    const itemCity = normalizeCity(item.area);
    const itemCoords = DEMO_CITY_CENTERS[itemCity] || DEMO_CITY_CENTERS.Frisco;
    return approxDistance(centerCoords, itemCoords) <= mapRadius;
  });

  // Sorting
  if (sortBy === 'low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'high') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'az') {
    filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  // Active selected map item (fallback to first item in filtered list if not found)
  const selectedListing = filtered.find(x => x.id === selectedMapId) || filtered[0] || null;

  const handleSaveSearch = () => {
    const alertName = search ? `"${search}"` : `${category} in ${mapCity} (${mapRadius} mi)`;
    setSavedSearches(prev => [
      { name: alertName, search, category, mapCity, mapRadius },
      ...prev.filter(p => p.name !== alertName).slice(0, 4)
    ]);
    addToast(`Saved alert for ${alertName}!`, 'success');
  };

  const handlePointerDown = (e) => {
    if (e.target.closest('.map-pin-btn') || e.target.closest('.map-zoom-controls')) return;
    isDraggingRef.current = true;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      panX: mapPan.x,
      panY: mapPan.y
    };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const dx = e.clientX - dragStartRef.current.x;
    const dy = e.clientY - dragStartRef.current.y;
    setMapPan({
      x: Math.round(dragStartRef.current.panX + dx),
      y: Math.round(dragStartRef.current.panY + dy)
    });
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const handleWheel = (e) => {
    // Only zoom when Ctrl or Cmd is held to prevent scroll-jacking (Google Maps UX pattern)
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY < 0 ? 0.12 : -0.12;
      setMapZoom((prev) => Math.min(1.8, Math.max(0.8, Number((prev + delta).toFixed(2)))));
      setShowScrollHint(false);
    } else {
      // Allow normal page scroll and briefly display the Ctrl+scroll hint
      setShowScrollHint(true);
      if (hintTimeoutRef.current) clearTimeout(hintTimeoutRef.current);
      hintTimeoutRef.current = setTimeout(() => {
        setShowScrollHint(false);
      }, 1500);
    }
  };

  const handleDoubleClick = (e) => {
    if (e.target.closest('.map-pin-btn') || e.target.closest('.map-zoom-controls')) return;
    adjustZoom(0.2);
  };

  const adjustZoom = (delta) => {
    setMapZoom((prev) => Math.min(1.8, Math.max(0.8, Number((prev + delta).toFixed(2)))));
  };

  const resetMap = () => {
    setMapPan({ x: 0, y: 0 });
    setMapZoom(1);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Explore Hero Section with Background Photography, Centered Text & Search Bar */}
      <section className="relative rounded-3xl overflow-hidden min-h-[270px] sm:min-h-[300px] flex flex-col items-center justify-center text-center p-6 sm:p-10 shadow-glass border border-emerald-950/20 isolate select-none">
        <img 
          src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1920&q=85" 
          alt="Local equipment and pros workshop"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1920&q=85';
          }}
          className="absolute inset-0 w-full h-full object-cover object-center -z-20 opacity-85 brightness-[0.82] contrast-[1.08]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001f1b]/80 via-black/35 to-[#00241e]/50 -z-10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-idle-gold/20 rounded-full blur-3xl pointer-events-none -z-10" />

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

      {/* Horizontal Category Strip - Single Scrollable Row */}
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
              <div className="relative w-full h-16 sm:h-20 overflow-hidden bg-emerald-950/5">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>

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

      {/* Streamlined Compact Discovery Controls & Filters - Minimal Scroll & 100% Responsive */}
      <div className="bg-white border border-[#dee8e1] rounded-2xl p-3 sm:p-3.5 shadow-2xs space-y-3">
        {/* Row 1: Mode Switch + Quick Pills on Left; Area, Radius, Sort on Right */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 flex-wrap">
          {/* Left: View Switcher & Quick Action Pills */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap">
            <div className="mode-switch !p-1 !rounded-xl" aria-label="Change discovery view">
              <button
                type="button"
                onClick={() => setViewMode('grid')}
                className={`!min-h-[36px] !py-1.5 !px-3 !text-xs ${viewMode === 'grid' ? 'active' : ''}`}
                aria-pressed={viewMode === 'grid'}
              >
                <LayoutGrid className="w-3.5 h-3.5" />
                <span>Grid</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setViewMode('map');
                  if (!selectedMapId && filtered.length > 0) {
                    setSelectedMapId(filtered[0].id);
                  }
                }}
                className={`!min-h-[36px] !py-1.5 !px-3 !text-xs ${viewMode === 'map' ? 'active' : ''}`}
                aria-pressed={viewMode === 'map'}
              >
                <MapIcon className="w-3.5 h-3.5" />
                <span>Map</span>
              </button>
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className={`!min-h-[36px] !py-1.5 !px-3 !text-xs ${viewMode === 'list' ? 'active' : ''}`}
                aria-pressed={viewMode === 'list'}
              >
                <ListFilter className="w-3.5 h-3.5" />
                <span>List</span>
              </button>
            </div>

            <button
              type="button"
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`filter-pill !py-1.5 !px-3 !text-xs !min-h-[36px] ${onlyFavorites ? 'selected' : ''}`}
            >
              <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-current' : ''}`} />
              <span>Saved ({likes.length})</span>
            </button>

            <button
              type="button"
              onClick={handleSaveSearch}
              className="filter-pill !py-1.5 !px-3 !text-xs !min-h-[36px]"
            >
              <Sparkles className="w-3.5 h-3.5 text-idle-gold" />
              <span>Save search</span>
            </button>
          </div>

          {/* Right: Area, Radius, Sort in one balanced cluster */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <label className="flex items-center gap-1.5 text-xs font-bold text-[#476357]">
              <span>Area</span>
              <select
                value={mapCity}
                onChange={(e) => setMapCity(e.target.value)}
                className="py-1.5 px-2.5 border border-[#cadbd2] rounded-xl bg-white text-[#004f46] text-xs font-bold min-h-[36px] outline-none cursor-pointer focus:border-idle-emerald"
                aria-label="Filter area"
              >
                <option value="Frisco">Frisco</option>
                <option value="Plano">Plano</option>
                <option value="Allen">Allen</option>
                <option value="McKinney">McKinney</option>
                <option value="Dallas">Dallas</option>
              </select>
            </label>

            <label className="flex items-center gap-1.5 text-xs font-bold text-[#476357]">
              <span>Radius</span>
              <select
                value={mapRadius}
                onChange={(e) => setMapRadius(Number(e.target.value))}
                className="py-1.5 px-2.5 border border-[#cadbd2] rounded-xl bg-white text-[#004f46] text-xs font-bold min-h-[36px] outline-none cursor-pointer focus:border-idle-emerald"
                aria-label="Filter radius"
              >
                <option value={10}>10 mi</option>
                <option value={20}>20 mi</option>
                <option value={40}>40 mi</option>
                <option value={80}>80 mi</option>
              </select>
            </label>

            <label className="flex items-center gap-1.5 text-xs font-bold text-[#476357]">
              <span>Sort</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="py-1.5 px-2.5 border border-[#cadbd2] rounded-xl bg-white text-[#004f46] text-xs font-bold min-h-[36px] outline-none cursor-pointer focus:border-idle-emerald"
                aria-label="Sort listings"
              >
                <option value="featured">Featured</option>
                <option value="low">Price: Low to High</option>
                <option value="high">Price: High to Low</option>
                <option value="az">Name: A to Z</option>
              </select>
            </label>
          </div>
        </div>

        {/* Optional Saved Search tags row if any were saved */}
        {savedSearches.length > 0 && (
          <div className="flex gap-2 flex-wrap pt-1 border-t border-[#edf3f0]">
            {savedSearches.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  if (s.search) setSearch(s.search);
                  if (s.category) setCategory(s.category);
                  if (s.mapCity) setMapCity(s.mapCity);
                  if (s.mapRadius) setMapRadius(s.mapRadius);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-emerald-50 text-idle-emerald border border-idle-emerald/20 hover:bg-emerald-100 transition-colors cursor-pointer"
              >
                <Search className="w-3 h-3" />
                <span>{s.name}</span>
              </button>
            ))}
          </div>
        )}

        {/* Row 2: Heading + Listings Count on Left, + Create Post on Right */}
        <div className="flex justify-between items-center gap-3 pt-2 border-t border-[#edf3f0] flex-wrap">
          <div className="flex items-baseline gap-2 flex-wrap">
            <h2 className="text-lg sm:text-xl font-serif font-bold text-[#0e2e28]">
              {onlyFavorites
                ? 'Your saved items'
                : category === 'All'
                  ? 'Nearby marketplace'
                  : `${EXPLORE_CATEGORIES.find(c => c.id === category)?.title || category} offerings`}
            </h2>
            <span className="text-xs text-[#6b7c72]">
              · {filtered.length} illustrative listings ({mapCity}, {mapRadius} mi radius)
            </span>
          </div>

          <button
            type="button"
            onClick={() => {
              if (setRoute) setRoute('post');
              else window.location.href = '/post';
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl border border-[#004f46] text-[#004f46] hover:bg-[#004f46] hover:text-white font-bold text-xs transition-colors cursor-pointer shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create post</span>
          </button>
        </div>
      </div>

      {/* Main Content Area based on viewMode */}
      {filtered.length > 0 ? (
        <>
          {/* 1. MAP VIEW */}
          {viewMode === 'map' && (
            <div className="space-y-6">
              {/* Interactive Prototype Map Canvas */}
              <div className="interactive-map shadow-sm">
                <div
                  className="map-illustration"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onWheel={handleWheel}
                  onDoubleClick={handleDoubleClick}
                >
                  {/* Subtle helper pill overlay when user scrolls wheel without Ctrl */}
                  {showScrollHint && (
                    <div className="absolute inset-0 z-30 pointer-events-none flex items-center justify-center bg-black/15 backdrop-blur-[1px] transition-all animate-in fade-in duration-150">
                      <div className="px-4 py-2 rounded-xl bg-[#004f46]/95 text-white text-xs font-bold shadow-xl border border-white/20 flex items-center gap-2">
                        <span>Use Ctrl + scroll to zoom the map</span>
                      </div>
                    </div>
                  )}

                  <div
                    className="map-world"
                    style={{
                      transform: `translate(${mapPan.x}px, ${mapPan.y}px) scale(${mapZoom})`,
                      transformOrigin: 'center center'
                    }}
                  >
                    <div className="map-water" />
                    <div className="road road-a" />
                    <div className="road road-b" />
                    <div className="road road-c" />
                    <div className="road road-d" />

                    {/* Schematic City Landmark Labels */}
                    {Object.entries(MAP_CITIES).map(([name, [cx, cy]]) => (
                      <span
                        key={name}
                        className="map-city-label"
                        style={{ left: `${cx}%`, top: `${cy}%` }}
                      >
                        {name}
                      </span>
                    ))}

                    {/* Interactive Price Pins */}
                    <div className="map-pins">
                      {filtered.slice(0, 16).map((item, i) => {
                        const cityName = normalizeCity(item.area);
                        const c = MAP_CITIES[cityName] || [46, 55];
                        const offset = (i % 3 - 1) * 8;
                        const left = Math.min(90, Math.max(8, c[0] + offset));
                        const top = Math.min(91, Math.max(8, c[1] + (i % 2 ? 6 : -5)));
                        const isSelected = selectedListing?.id === item.id;

                        return (
                          <button
                            key={item.id}
                            type="button"
                            className={`map-pin-btn ${isSelected ? 'selected' : ''}`}
                            style={{ left: `${left}%`, top: `${top}%` }}
                            onClick={() => {
                              setSelectedMapId(item.id);
                              setActiveListing(item);
                            }}
                            title={item.title}
                          >
                            ${item.price}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Zoom Controls (Top/Right matching prototype) */}
                  <div className="map-zoom-controls">
                    <button
                      type="button"
                      onClick={() => adjustZoom(0.15)}
                      aria-label="Zoom in"
                      title="Zoom in"
                    >
                      +
                    </button>
                    <button
                      type="button"
                      onClick={() => adjustZoom(-0.15)}
                      aria-label="Zoom out"
                      title="Zoom out"
                    >
                      −
                    </button>
                    <button
                      type="button"
                      onClick={resetMap}
                      aria-label="Reset map"
                      title="Reset map view"
                    >
                      ⌖
                    </button>
                  </div>

                  {/* Bottom Caption Notice */}
                  <span className="map-caption">
                    Illustrative North Texas schematic · pins are not live GPS coordinates
                  </span>
                </div>

                {/* Selected Listing Card Preview (Directly attached to bottom of canvas) */}
                {selectedListing && (
                  <div className="map-selected">
                    <img
                      src={selectedListing.image}
                      alt={selectedListing.title}
                      className="listing-photo"
                    />
                    <div>
                      <small>{selectedListing.area} · example area</small>
                      <strong>{selectedListing.title}</strong>
                      <b>${selectedListing.price} / {selectedListing.unit}</b>
                      <button
                        type="button"
                        onClick={() => setActiveListing(selectedListing)}
                      >
                        Open listing →
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Section Head for Listings in View */}
              <div className="pt-2">
                <h3 className="text-xl font-serif font-bold text-[#0e2e28]">Listings in view</h3>
              </div>

              {/* 6-Card Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
                {filtered.slice(0, 6).map((item) => (
                  <ListingCard key={item.id} listing={item} />
                ))}
              </div>

              {/* Bottom Notice Disclaimer */}
              <div className="p-4 rounded-2xl bg-white border border-idle-line/80 text-center space-y-1">
                <p className="text-xs font-semibold text-[#3a584c]">
                  Schematic demonstration notice
                </p>
                <p className="text-[11px] text-[#6b7c72] max-w-2xl mx-auto leading-relaxed">
                  Locations are generalized to North Texas municipal centers for community safety. Exact pickup addresses and delivery details are provided securely only upon booking confirmation.
                </p>
              </div>
            </div>
          )}

          {/* 2. GRID VIEW */}
          {viewMode === 'grid' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {filtered.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))}
            </div>
          )}

          {/* 3. LIST VIEW */}
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
                      <span className="text-lg sm:text-xl font-extrabold text-[#004f46]">$${listing.price}</span>
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
            Try expanding your area radius, clearing keyword filters, or resetting the favorites filter.
          </p>
          <button
            onClick={() => {
              setSearch('');
              setCategory('All');
              setOnlyFavorites(false);
              setMapRadius(80);
            }}
            className="emerald-gradient-btn px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
};
