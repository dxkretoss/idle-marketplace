import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Search, 
  MapPin, 
  Grid, 
  Plus, 
  User, 
  Sparkles,
  ShieldCheck,
  ChevronDown,
  LogIn,
  LogOut
} from 'lucide-react';

export const Topbar = () => {
  const { 
    route, 
    setRoute, 
    search, 
    setSearch, 
    user, 
    plan, 
    isAuthenticated,
    logout,
    addToast
  } = useApp();

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (route !== 'explore') {
      setRoute('explore');
    }
  };

  const handlePostClick = () => {
    if (!isAuthenticated) {
      addToast('Please sign in or create an account to post a listing', 'info');
      setRoute('auth');
    } else {
      setRoute('post');
    }
  };

  return (
    <header className="glass-header sticky top-0 z-30 h-16 md:h-18 px-4 md:px-7 flex items-center justify-between gap-3 md:gap-5 border-b border-idle-line">
      {/* Brand Official Logo */}
      <button 
        onClick={() => setRoute('home')}
        className="flex items-center gap-2 group flex-shrink-0 text-left"
        aria-label="Go to home"
      >
        <img 
          src="/IDLE_logo.png" 
          alt="IDLE Marketplace" 
          className="h-8 sm:h-9 md:h-10 w-auto object-contain transition-transform group-hover:scale-102"
        />
        <span className="hidden lg:inline-block text-[10px] uppercase font-bold tracking-widest px-1.5 py-0.5 rounded bg-idle-mint text-idle-emerald border border-idle-emerald/20">
          Local
        </span>
      </button>

      {/* Global Search Bar */}
      <form 
        onSubmit={handleSearchSubmit}
        className="flex-1 max-w-xl flex items-center gap-2 bg-[#f4f7f5] hover:bg-[#edf3f0] focus-within:bg-white border border-[#d6e3dc] focus-within:border-idle-emerald rounded-full px-3.5 py-2 transition-all shadow-inner"
      >
        <Search className="w-4 h-4 text-idle-muted flex-shrink-0" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search tools, fashion, skills, trucks or people..."
          className="bg-transparent border-0 outline-none w-full text-xs md:text-sm text-[#172d28] placeholder:text-idle-muted/70"
          aria-label="Global marketplace search"
        />
        {search && (
          <button 
            type="button" 
            onClick={() => setSearch('')}
            className="text-[11px] font-semibold text-idle-muted hover:text-[#172d28] px-1"
          >
            Clear
          </button>
        )}
      </form>

      {/* Location Badge (Desktop) */}
      <div className="hidden lg:flex items-center gap-1.5 bg-white border border-idle-line rounded-full px-3 py-1.5 text-xs text-[#28473f] shadow-sm">
        <MapPin className="w-3.5 h-3.5 text-idle-emerald" />
        <span className="font-medium">North Texas</span>
        <span className="text-[11px] text-idle-muted">· DFW Pilot</span>
      </div>

      {/* Right Header Controls */}
      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">
        {/* Tools & Resources Button */}
        <button
          onClick={() => setRoute('resources')}
          className="w-9 h-9 rounded-xl flex items-center justify-center text-idle-emerald hover:bg-idle-mint transition-colors border border-transparent hover:border-idle-emerald/15"
          title="Tools & Resources Directory"
          aria-label="Tools and resources"
        >
          <Grid className="w-5 h-5" />
        </button>

        {/* User Profile or Sign In Chip */}
        {isAuthenticated ? (
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => setRoute('profile')}
              className="flex items-center gap-2 p-1 md:pr-2.5 rounded-full hover:bg-idle-mint/60 border border-transparent hover:border-idle-emerald/10 transition-all text-left"
              title="View profile and account"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#d6a746] to-[#004f46] text-white flex items-center justify-center font-bold text-xs shadow-sm">
                {user.avatar || 'AM'}
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-xs font-bold text-[#172d28] leading-tight">{user.name}</span>
                <span className="text-[10px] text-idle-emerald font-semibold uppercase tracking-wider">{plan}</span>
              </div>
            </button>
            <button
              onClick={logout}
              className="hidden sm:flex w-8 h-8 rounded-lg items-center justify-center text-idle-muted hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <button
            onClick={() => setRoute('auth')}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-idle-emerald text-idle-emerald hover:bg-idle-mint font-bold text-xs transition-colors"
          >
            <LogIn className="w-3.5 h-3.5" />
            <span>Sign In</span>
          </button>
        )}

        {/* Post CTA Button */}
        <button
          onClick={handlePostClick}
          className="gold-gradient-btn flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-bold shadow-sm cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Post</span>
        </button>
      </div>
    </header>
  );
};
