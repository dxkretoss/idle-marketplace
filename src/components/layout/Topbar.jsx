import React, { useState, useRef, useEffect } from 'react';
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
  LogOut, 
  UserPlus,
  Check
} from 'lucide-react';

const DFW_LOCATIONS = [
  'Frisco, TX',
  'Plano, TX',
  'Dallas Metro & Uptown, TX',
  'Fort Worth & Arlington, TX',
  'McKinney & Allen, TX',
  'Denton & Grapevine, TX',
  'Irving & Las Colinas, TX'
];

export const Topbar = () => {
  const { 
    route, 
    setRoute, 
    search, 
    setSearch, 
    user, 
    setUserLocation,
    plan, 
    isAuthenticated,
    openAuth,
    logout,
    addToast
  } = useApp();

  const [locationOpen, setLocationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [customLocation, setCustomLocation] = useState('');
  const [imgError, setImgError] = useState(false);
  const locationRef = useRef(null);
  const profileRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (locationRef.current && !locationRef.current.contains(e.target)) {
        setLocationOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    if (locationOpen || profileOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [locationOpen, profileOpen]);

  const handleSelectLocation = (loc) => {
    if (setUserLocation) {
      setUserLocation(loc);
    }
    setLocationOpen(false);
  };

  const handleCustomLocationSubmit = (e) => {
    e.preventDefault();
    if (customLocation.trim()) {
      if (setUserLocation) {
        setUserLocation(customLocation.trim());
      }
      setCustomLocation('');
      setLocationOpen(false);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (route !== 'explore') {
      setRoute('explore');
    }
  };

  const handlePostClick = () => {
    if (!isAuthenticated) {
      addToast('Please sign in or create an account to post a listing', 'info');
      openAuth('signin');
    } else {
      setRoute('post');
    }
  };

  const avatarPhoto = !imgError && (user.avatarUrl || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80');

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

      {/* Interactive Location Badge & Dropdown */}
      {isAuthenticated && (
        <div className="relative" ref={locationRef}>
          <button
            type="button"
            onClick={() => setLocationOpen(!locationOpen)}
            className="hidden sm:flex items-center gap-1.5 bg-white hover:bg-[#edf3f0] border border-idle-line hover:border-idle-emerald/40 rounded-full px-3 py-1.5 text-xs text-[#28473f] shadow-sm transition-all cursor-pointer group"
            title="Click to change your local service area"
          >
            <MapPin className="w-3.5 h-3.5 text-idle-emerald flex-shrink-0 group-hover:scale-110 transition-transform" />
            <span className="font-semibold text-idle-emerald">{user.area || 'Frisco, TX'}</span>
            <span className="text-[11px] text-idle-muted">· DFW Pilot</span>
            <ChevronDown className={`w-3 h-3 text-idle-muted group-hover:text-idle-emerald transition-transform duration-200 ${locationOpen ? 'rotate-180' : ''}`} />
          </button>

          {locationOpen && (
            <div className="absolute right-0 sm:left-0 sm:right-auto mt-2 w-72 bg-white rounded-2xl shadow-xl border border-idle-line py-2.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="px-3.5 pb-2 border-b border-idle-line">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-idle-gold block">
                  DFW Pilot Service Area
                </span>
                <span className="text-xs font-bold text-[#143a33]">
                  Select or enter your local city
                </span>
              </div>

              {/* City Selection Options */}
              <div className="p-1.5 max-h-56 overflow-y-auto space-y-0.5">
                {DFW_LOCATIONS.map((loc) => {
                  const isSelected = (user.area || '').toLowerCase().trim() === loc.toLowerCase().trim() ||
                    (user.area || '').toLowerCase().includes(loc.split(',')[0].toLowerCase().trim());
                  return (
                    <button
                      key={loc}
                      type="button"
                      onClick={() => handleSelectLocation(loc)}
                      className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs transition-colors text-left cursor-pointer ${
                        isSelected
                          ? 'bg-idle-mint text-idle-emerald font-bold'
                          : 'text-[#24423b] hover:bg-[#edf3f0]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-idle-emerald' : 'text-idle-muted'}`} />
                        <span>{loc}</span>
                      </div>
                      {isSelected && <Check className="w-3.5 h-3.5 text-idle-emerald" />}
                    </button>
                  );
                })}
              </div>

              {/* Custom Location input */}
              <form onSubmit={handleCustomLocationSubmit} className="pt-2 px-3 border-t border-idle-line flex items-center gap-1.5">
                <input
                  type="text"
                  value={customLocation}
                  onChange={(e) => setCustomLocation(e.target.value)}
                  placeholder="Or enter city / zip..."
                  className="flex-1 px-2.5 py-1.5 rounded-lg border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald text-xs outline-none"
                />
                <button
                  type="submit"
                  disabled={!customLocation.trim()}
                  className="px-2.5 py-1.5 rounded-lg bg-idle-emerald hover:bg-forest-light disabled:opacity-40 text-white font-bold text-xs transition-all cursor-pointer"
                >
                  Set
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* Right Header Controls */}
      <div className="flex items-center gap-2 md:gap-3 flex-shrink-0">

        {/* User Profile Dropdown Chip */}
        {isAuthenticated ? (
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1 pr-2.5 rounded-full hover:bg-idle-mint/60 border border-transparent hover:border-idle-emerald/20 transition-all text-left group cursor-pointer"
              title="Account options"
            >
              <div className="w-8 h-8 rounded-full overflow-hidden bg-gradient-to-br from-[#d6a746] to-[#004f46] text-white flex items-center justify-center font-bold text-xs shadow-sm ring-2 ring-white/80 group-hover:ring-idle-emerald/40 transition-all flex-shrink-0">
                {avatarPhoto ? (
                  <img
                    src={avatarPhoto}
                    alt={user.name}
                    className="w-full h-full object-cover"
                    onError={() => setImgError(true)}
                  />
                ) : (
                  <span>{user.avatar || 'AM'}</span>
                )}
              </div>
              <div className="hidden md:flex flex-col">
                <span className="text-xs font-bold text-[#172d28] leading-tight">{user.name}</span>
                <span className="text-[10px] text-idle-emerald font-semibold uppercase tracking-wider">{plan}</span>
              </div>
              <ChevronDown className={`w-3.5 h-3.5 text-idle-muted group-hover:text-idle-emerald transition-transform duration-200 ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            {/* Profile Dropdown Menu */}
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-idle-line py-1.5 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-3.5 py-2.5 border-b border-idle-line">
                  <div className="text-xs font-bold text-[#172d28] truncate">{user.name}</div>
                  <div className="text-[11px] text-idle-muted truncate">{user.email || 'Member Account'}</div>
                </div>

                <div className="p-1 space-y-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      setRoute('profile');
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-[#1a3832] hover:bg-idle-mint/70 transition-colors text-left cursor-pointer"
                  >
                    <User className="w-4 h-4 text-idle-emerald flex-shrink-0" />
                    <span>Profile</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      setProfileOpen(false);
                    }}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 transition-colors text-left cursor-pointer"
                  >
                    <LogOut className="w-4 h-4 text-red-500 flex-shrink-0" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={() => openAuth('signin')}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full border border-idle-emerald/40 hover:border-idle-emerald text-idle-emerald hover:bg-idle-mint font-bold text-xs transition-all cursor-pointer shadow-sm"
              title="Log In"
            >
              <LogIn className="w-3.5 h-3.5" />
              <span>Log In</span>
            </button>
            <button
              onClick={() => openAuth('signup')}
              className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full bg-idle-emerald hover:bg-forest-light text-white font-bold text-xs transition-all shadow-sm cursor-pointer"
              title="Create Account"
            >
              <UserPlus className="w-3.5 h-3.5" />
              <span>Sign Up</span>
            </button>
          </div>
        )}

        {/* Post CTA Button - Only shown when user is logged in */}
        {isAuthenticated && (
          <button
            onClick={handlePostClick}
            className="gold-gradient-btn flex items-center gap-1.5 px-3 md:px-4 py-2 rounded-xl text-xs md:text-sm font-bold shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4 stroke-[2.5]" />
            <span>Post</span>
          </button>
        )}
      </div>
    </header>
  );
};
