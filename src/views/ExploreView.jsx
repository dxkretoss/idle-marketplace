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
      {/* Page Heading */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
          Local Marketplace Directory
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#082f2c] mt-0.5">
          Discover what’s around you.
        </h1>
        <p className="text-xs sm:text-sm text-idle-muted mt-1 max-w-xl">
          Shop rentals, local pros, creative equipment, and enterprise operations with approximate neighborhood locations.
        </p>
      </div>

      {/* Main Search Input */}
      <div className="flex items-center gap-2 max-w-2xl bg-[#edf3f0] hover:bg-[#e7efea] border border-[#d2e0d8] focus-within:bg-white focus-within:border-idle-emerald rounded-2xl p-2.5 shadow-inner transition-all">
        <div className="pl-2 text-idle-muted">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search gear, people, categories or keywords..."
          className="w-full bg-transparent border-0 outline-none text-xs sm:text-sm text-[#172d28] px-2 placeholder:text-[#8ba096]"
        />
        {search && (
          <button
            onClick={() => setSearch('')}
            className="p-1 rounded-full text-idle-muted hover:text-[#172d28]"
          >
            <XCircle className="w-4 h-4" />
          </button>
        )}
        <button
          onClick={() => addToast(`Searching North Texas for: ${search || 'all listings'}`, 'info')}
          className="emerald-gradient-btn px-4 py-2 rounded-xl text-xs font-bold"
        >
          Search
        </button>
      </div>

      {/* Category Pills Strip */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {CATEGORIES.map((cat) => {
          const isSelected = category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold transition-all border ${
                isSelected
                  ? 'bg-idle-emerald text-white border-idle-emerald shadow-sm'
                  : 'bg-white hover:bg-emerald-50/60 text-[#213f37] border-idle-line'
              }`}
            >
              <div className="w-5 h-5 rounded-full overflow-hidden bg-emerald-950/20 flex-shrink-0">
                <img src={cat.image} alt={cat.label} className="w-full h-full object-cover" />
              </div>
              <span>{cat.label}</span>
            </button>
          );
        })}
      </div>

      {/* Market Toolbar (Filter, Favorites, Sort) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-idle-line">
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
