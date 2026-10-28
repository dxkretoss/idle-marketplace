import React from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { ListingCard } from '../components/listings/ListingCard';
import { 
  Search, 
  Heart, 
  Sparkles, 
  Plus, 
  SlidersHorizontal,
  XCircle
} from 'lucide-react';

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
    setRoute,
    addToast
  } = useApp();

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

      {/* Category Pills & Controls with Tight Spacing */}
      <div className="space-y-3">
        {/* Full-Width Horizontal Category Tabs Strip */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
          {CATEGORIES.map((cat) => {
            const isSelected = category === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all border cursor-pointer ${
                  isSelected
                    ? 'bg-idle-emerald text-white border-idle-emerald shadow-sm'
                    : 'bg-white hover:bg-emerald-50/60 text-[#213f37] border-idle-line'
                }`}
              >
                <div className="w-4 h-4 rounded-full overflow-hidden bg-emerald-950/20 flex-shrink-0">
                  <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
                </div>
                <span className="whitespace-nowrap">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Market Toolbar - Sitting Tightly Under Tabs (Spacer Removed) */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2.5 border-t border-idle-line/70">
          <div className="flex flex-wrap items-center gap-2">
            {/* Favorites Pill */}
            <button
              onClick={() => setOnlyFavorites(!onlyFavorites)}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all border ${
                onlyFavorites
                  ? 'bg-red-50 text-red-600 border-red-200 shadow-sm'
                  : 'bg-white hover:bg-black/5 text-[#213f37] border-idle-line'
              }`}
            >
              <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-current text-red-500' : ''}`} />
              <span>Saved Favorites ({likes.length})</span>
            </button>

            {/* Save Search Pill */}
            <button
              onClick={handleSaveSearch}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white hover:bg-black/5 text-[#213f37] border border-idle-line transition-all"
            >
              <Sparkles className="w-3.5 h-3.5 text-idle-gold" />
              <span>Save Search Alert</span>
            </button>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-dropdown" className="text-xs font-bold text-idle-muted">
              Sort by:
            </label>
            <select
              id="sort-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-idle-line rounded-xl px-3 py-1.5 text-xs font-semibold text-[#172d28] outline-none focus:border-idle-emerald"
            >
              <option value="featured">Featured First</option>
              <option value="low">Price: Low to High</option>
              <option value="high">Price: High to Low</option>
              <option value="az">Name: A to Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base sm:text-lg font-bold text-[#0e2e28]">
            {onlyFavorites
              ? 'Your Saved Favorites'
              : category === 'All'
                ? 'All Marketplace Offerings'
                : `${category} Offerings`}
          </h2>
          <p className="text-[11px] text-idle-muted">
            {filtered.length} {filtered.length === 1 ? 'listing' : 'listings'} found in North Texas
          </p>
        </div>

        <button
          onClick={() => setRoute('post')}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold border border-idle-emerald/30 text-idle-emerald hover:bg-idle-mint transition-all"
        >
          <Plus className="w-3.5 h-3.5" />
          <span>Post an Item / Request</span>
        </button>
      </div>

      {/* Listings Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filtered.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
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
