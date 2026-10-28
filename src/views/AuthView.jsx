import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import {
  Lock,
  Mail,
  User,
  MapPin,
  Eye,
  EyeOff,
  ShieldCheck,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  LogIn,
  UserPlus,
  KeyRound,
  Crown,
  Compass,
  QrCode,
  Zap,
  Building2,
  ChevronDown,
  Search,
  Check,
  X
} from 'lucide-react';

const DFW_LOCATIONS = [
  'Frisco, TX',
  'Plano, TX',
  'Dallas, TX',
  'Fort Worth, TX',
  'McKinney, TX',
  'Arlington, TX',
  'Denton, TX',
  'Irving / Las Colinas, TX',
  'Grapevine, TX',
  'Southlake, TX',
  'Allen, TX',
  'Richardson, TX',
  'Carrollton, TX',
  'Garland, TX',
  'Lewisville, TX',
  'Grand Prairie, TX'
];

export const AuthView = () => {
  const { login, signup, setRoute, addToast, authMode, setAuthMode } = useApp();

  const [mode, setMode] = useState(authMode || 'signin'); // 'signin' | 'signup' | 'forgot'
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (authMode && (authMode === 'signin' || authMode === 'signup')) {
      setMode(authMode);
    }
  }, [authMode]);

  // Form States
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [area, setArea] = useState('Frisco, TX');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Location Dropdown States
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [locationSearch, setLocationSearch] = useState('');
  const locationRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (locationRef.current && !locationRef.current.contains(event.target)) {
        setIsLocationOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredLocations = DFW_LOCATIONS.filter((loc) =>
    loc.toLowerCase().includes(locationSearch.toLowerCase().trim())
  );

  const handleSignIn = (e) => {
    e.preventDefault();
    login(email || 'alex.morgan@example.com', password || 'password123');
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (!termsAccepted) {
      addToast('Please accept the IDLE community terms', 'error');
      return;
    }
    signup({
      name,
      email,
      area,
      plan: 'Free'
    });
  };

  const handleForgot = (e) => {
    e.preventDefault();
    addToast(`Password recovery link sent to ${email || 'your email'}!`, 'info');
    setMode('signin');
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#f8faf8]">
      {/* ================= LEFT SIDE: TRENDY AUTH BOX ================= */}
      <div className="w-full lg:w-[50%] xl:w-[46%] min-h-screen flex flex-col justify-between p-6 sm:p-10 md:p-12 pb-12 sm:pb-16 bg-white z-10">
        {/* Top Header: Logo & Back to Marketplace */}
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => setRoute('home')}
            className="flex items-center gap-2 text-xs font-bold text-idle-muted hover:text-idle-emerald transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span>Back to Marketplace</span>
          </button>

          <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full bg-idle-mint text-idle-emerald border border-idle-emerald/20">
            DFW Pilot
          </span>
        </div>

        {/* Centered Form Container */}
        <div className="max-w-md w-full mx-auto my-auto space-y-6 pb-6">
          {/* Brand Logo & Headline */}
          <div>
            <img
              src="/IDLE_logo.png"
              alt="IDLE Marketplace"
              className="h-10 sm:h-12 w-auto object-contain mb-3"
            />
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#003d36]">
              {mode === 'signin' && 'Welcome back to IDLE'}
              {mode === 'signup' && 'Create your IDLE account'}
              {mode === 'forgot' && 'Reset your password'}
            </h1>
            <p className="text-xs sm:text-sm text-idle-muted mt-1 leading-relaxed">
              {mode === 'signin' && 'Sign in to access your local rentals, negotiations, and single-use QR custody handoffs.'}
              {mode === 'signup' && 'Join the social-first marketplace for equipment, skills, and teams with zero commission.'}
              {mode === 'forgot' && 'Enter your registered email and we will send a secure Supabase recovery link.'}
            </p>
          </div>

          {/* Mode Tabs Switcher */}
          {mode !== 'forgot' && (
            <div className="flex p-1 bg-[#f0f5f2] rounded-2xl border border-idle-line">
              <button
                type="button"
                onClick={() => setMode('signin')}
                className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${mode === 'signin'
                  ? 'bg-idle-emerald text-white shadow-sm'
                  : 'text-idle-muted hover:text-[#172d28]'
                  }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => setMode('signup')}
                className={`flex-1 py-2 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all ${mode === 'signup'
                  ? 'bg-idle-emerald text-white shadow-sm'
                  : 'text-idle-muted hover:text-[#172d28]'
                  }`}
              >
                Create Account
              </button>
            </div>
          )}

          {/* ================= SIGN IN FORM ================= */}
          {mode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#172d28] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-idle-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="alex.morgan@example.com"
                    className="w-full pl-10 pr-3.5 py-3.5 rounded-2xl border border-[#d2e0d8] bg-[#edf3f0] hover:bg-[#e7efea] focus:bg-white focus:border-idle-emerald focus:ring-2 focus:ring-idle-emerald/15 focus:shadow-none outline-none transition-all shadow-inner text-[#172d28] placeholder:text-[#8ba096] text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#172d28]">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setMode('forgot')}
                    className="text-[11px] font-semibold text-idle-emerald hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-idle-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-10 pr-11 py-3.5 rounded-2xl border border-[#d2e0d8] bg-[#edf3f0] hover:bg-[#e7efea] focus:bg-white focus:border-idle-emerald focus:ring-2 focus:ring-idle-emerald/15 focus:shadow-none outline-none transition-all shadow-inner text-[#172d28] placeholder:text-[#8ba096] text-xs sm:text-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-idle-muted hover:text-[#172d28] transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-idle-muted pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded text-idle-emerald focus:ring-idle-emerald" />
                  <span>Keep me signed in</span>
                </label>
              </div>

              <button
                type="submit"
                className="gold-gradient-btn w-full py-3.5 rounded-xl text-sm font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <LogIn className="w-4 h-4" />
                <span>Sign In to IDLE</span>
              </button>
            </form>
          )}

          {/* ================= SIGN UP FORM ================= */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#172d28] mb-1.5">
                  Full Name / Business Name
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-idle-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Alex Morgan or Northline Studio"
                    className="w-full pl-10 pr-3.5 py-3.5 rounded-2xl border border-[#d2e0d8] bg-[#edf3f0] hover:bg-[#e7efea] focus:bg-white focus:border-idle-emerald focus:ring-2 focus:ring-idle-emerald/15 focus:shadow-none outline-none transition-all shadow-inner text-[#172d28] placeholder:text-[#8ba096] text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#172d28] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-idle-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-3.5 py-3.5 rounded-2xl border border-[#d2e0d8] bg-[#edf3f0] hover:bg-[#e7efea] focus:bg-white focus:border-idle-emerald focus:ring-2 focus:ring-idle-emerald/15 focus:shadow-none outline-none transition-all shadow-inner text-[#172d28] placeholder:text-[#8ba096] text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              <div ref={locationRef} className="relative">
                <label className="block text-xs font-bold uppercase tracking-wider text-[#172d28] mb-1.5">
                  Service Area (DFW Pilot)
                </label>
                <div className="relative">
                  <MapPin className="w-4 h-4 text-idle-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                  <button
                    type="button"
                    onClick={() => setIsLocationOpen(!isLocationOpen)}
                    className="w-full pl-10 pr-10 py-3.5 rounded-2xl border border-[#d2e0d8] bg-[#edf3f0] hover:bg-[#e7efea] focus:bg-white focus:border-idle-emerald focus:ring-2 focus:ring-idle-emerald/15 transition-all shadow-inner text-xs sm:text-sm font-medium text-left flex items-center justify-between cursor-pointer"
                  >
                    <span className={area ? "text-[#172d28]" : "text-[#8ba096]"}>
                      {area || "Select your DFW service area"}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-idle-muted transition-transform duration-200 ${isLocationOpen ? 'rotate-180 text-idle-emerald' : ''}`} />
                  </button>
                  <input type="hidden" name="area" value={area} required />
                </div>

                {/* Dropdown Menu with Embedded Search Bar */}
                {isLocationOpen && (
                  <div className="absolute left-0 right-0 top-full mt-2 z-50 bg-white rounded-2xl border border-[#d2e0d8] shadow-2xl p-2.5 space-y-2">
                    {/* Search Bar in Dropdown */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-idle-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                        placeholder="Search North Texas cities or zip..."
                        autoFocus
                        className="w-full pl-8 pr-7 py-2 rounded-xl border border-[#d2e0d8] bg-[#edf3f0] text-xs text-[#172d28] placeholder:text-[#8ba096] outline-none focus:bg-white focus:border-idle-emerald shadow-inner transition-all"
                      />
                      {locationSearch && (
                        <button
                          type="button"
                          onClick={() => setLocationSearch('')}
                          className="absolute right-2.5 top-1/2 -translate-y-1/2 text-idle-muted hover:text-[#172d28] p-0.5"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      )}
                    </div>

                    {/* Filtered Cities List */}
                    <div className="max-h-48 overflow-y-auto space-y-0.5 pr-1 no-scrollbar">
                      {filteredLocations.map((loc) => {
                        const isSelected = area === loc;
                        return (
                          <button
                            key={loc}
                            type="button"
                            onClick={() => {
                              setArea(loc);
                              setIsLocationOpen(false);
                              setLocationSearch('');
                            }}
                            className={`w-full text-left px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors ${isSelected
                                ? 'bg-idle-mint text-idle-emerald font-bold'
                                : 'text-[#172d28] hover:bg-[#edf3f0]'
                              }`}
                          >
                            <div className="flex items-center gap-2">
                              <MapPin className={`w-3.5 h-3.5 ${isSelected ? 'text-idle-emerald' : 'text-idle-muted'}`} />
                              <span>{loc}</span>
                            </div>
                            {isSelected && <Check className="w-3.5 h-3.5 text-idle-emerald flex-shrink-0" />}
                          </button>
                        );
                      })}

                      {/* Custom Location Option if query does not match */}
                      {locationSearch.trim() && !filteredLocations.some(l => l.toLowerCase() === locationSearch.trim().toLowerCase()) && (
                        <button
                          type="button"
                          onClick={() => {
                            setArea(locationSearch.trim());
                            setIsLocationOpen(false);
                            setLocationSearch('');
                          }}
                          className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-idle-emerald hover:bg-idle-mint flex items-center gap-2 transition-colors border border-dashed border-idle-emerald/30 mt-1"
                        >
                          <MapPin className="w-3.5 h-3.5 text-idle-emerald flex-shrink-0" />
                          <span>Use "{locationSearch.trim()}"</span>
                        </button>
                      )}

                      {filteredLocations.length === 0 && !locationSearch.trim() && (
                        <div className="py-3 text-center text-xs text-idle-muted">
                          No locations found
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#172d28] mb-1.5">
                  Password
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-idle-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    className="w-full pl-10 pr-11 py-3.5 rounded-2xl border border-[#d2e0d8] bg-[#edf3f0] hover:bg-[#e7efea] focus:bg-white focus:border-idle-emerald focus:ring-2 focus:ring-idle-emerald/15 focus:shadow-none outline-none transition-all shadow-inner text-[#172d28] placeholder:text-[#8ba096] text-xs sm:text-sm font-medium"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-idle-muted hover:text-[#172d28] transition-colors p-1"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <label className="flex items-start gap-2.5 text-xs text-idle-muted pt-1 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 rounded text-idle-emerald focus:ring-idle-emerald"
                />
                <span>
                  I agree to IDLE's Terms of Service, single-use QR custody verification rules, and zero-commission subscription policies.
                </span>
              </label>

              <button
                type="submit"
                disabled={!termsAccepted}
                className="gold-gradient-btn w-full py-3.5 rounded-xl text-sm font-bold shadow-md flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <UserPlus className="w-4 h-4" />
                <span>Create My IDLE Account</span>
              </button>
            </form>
          )}

          {/* ================= FORGOT PASSWORD ================= */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgot} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#172d28] mb-1.5">
                  Registered Account Email
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-idle-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your registered email"
                    className="w-full pl-10 pr-3.5 py-3.5 rounded-2xl border border-[#d2e0d8] bg-[#edf3f0] hover:bg-[#e7efea] focus:bg-white focus:border-idle-emerald focus:ring-2 focus:ring-idle-emerald/15 focus:shadow-none outline-none transition-all shadow-inner text-[#172d28] placeholder:text-[#8ba096] text-xs sm:text-sm font-medium"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="gold-gradient-btn w-full py-3.5 rounded-xl text-sm font-bold shadow-md flex items-center justify-center gap-2"
              >
                <KeyRound className="w-4 h-4" />
                <span>Send Password Reset Link</span>
              </button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className="text-xs font-bold text-idle-emerald hover:underline"
                >
                  &larr; Back to Sign In
                </button>
              </div>
            </form>
          )}

          {/* Platform Trust & Protection Note */}
          <div className="mt-6 p-4 rounded-2xl bg-[#f8faf9] border border-idle-line flex items-center gap-3 text-xs text-idle-muted">
            <ShieldCheck className="w-4 h-4 text-idle-emerald flex-shrink-0" />
            <span className="text-[11px] leading-snug">
              Protected by <strong>IDLE Trust Standards</strong> — Direct member negotiations, verified identities, and single-use QR custody handoffs with zero transaction commission.
            </span>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-idle-line flex items-center justify-between text-[11px] text-idle-muted">
          <span className="flex items-center gap-1.5 text-idle-emerald font-semibold">
            <ShieldCheck className="w-3.5 h-3.5 text-idle-emerald" />
            <span>IDLE Verified Network</span>
          </span>
          <span>© 2026 IDLE Marketplace · Dallas–Fort Worth Pilot</span>
        </div>
      </div>

      {/* ================= RIGHT SIDE: HIGH-IMPACT VISUAL & BRAND STORY ================= */}
      <div className="hidden lg:flex flex-1 relative bg-[#002f2a] overflow-hidden flex-col justify-between p-10 xl:p-14 text-white isolate">
        {/* Immersive Photography Background */}
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1600&q=85"
          alt="IDLE Community"
          className="absolute inset-0 w-full h-full object-cover object-center -z-20 opacity-35 mix-blend-luminosity"
        />

        {/* Deep Emerald Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#002823] via-[#003830]/85 to-[#00241e]/70 -z-10" />

        {/* Top Right Tagline */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-serif text-2xl font-bold tracking-tight text-white">
              IDLE
            </span>
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-white/10 border border-white/20 text-idle-gold">
              Social-First Marketplace
            </span>
          </div>

          <div className="text-right text-xs text-emerald-200/80">
            North Texas Pilot · Dallas / Fort Worth
          </div>
        </div>

        {/* Middle Value Proposition Headline */}
        <div className="max-w-xl space-y-4 my-auto">
          <span className="text-xs uppercase font-extrabold tracking-widest text-idle-gold block">
            A Better Way to Share & Earn
          </span>
          <h2 className="font-serif text-3xl xl:text-5xl font-bold tracking-tight leading-[1.1]">
            "No one and nothing should have to sit idle."
          </h2>
          <p className="text-sm xl:text-base text-emerald-100/90 leading-relaxed max-w-lg">
            Rent out unused equipment, tools, and space. Offer your professional skills, and coordinate business teams with zero transaction commissions.
          </p>
        </div>

        {/* Floating Frosted Glass Feature Badges */}
        <div className="grid grid-cols-3 gap-3.5 pt-6 border-t border-white/15">
          <div className="glass-dark p-3.5 rounded-2xl border border-white/15 space-y-1">
            <div className='flex gap-2 items-center'>
              <QrCode className="w-5 h-5 text-idle-gold" />
              <strong className="block text-xs font-bold text-white">Single-Use QR Handoffs</strong>
            </div>
            <p className="text-[10px] text-emerald-200/70 leading-snug">
              Verified custody transfer & condition checks.
            </p>
          </div>

          <div className="glass-dark p-3.5 rounded-2xl border border-white/15 space-y-1">
            <div className='flex gap-2 items-center'>
              <Zap className="w-5 h-5 text-idle-gold" />
              <strong className="block text-xs font-bold text-white">0% Transaction Cut</strong>
            </div>
            <p className="text-[10px] text-emerald-200/70 leading-snug">
              Predictable flat monthly memberships.
            </p>
          </div>

          <div className="glass-dark p-3.5 rounded-2xl border border-white/15 space-y-1">
            <div className='flex gap-2 items-center'>
              <Building2 className="w-5 h-5 text-idle-gold" />
              <strong className="block text-xs font-bold text-white">Enterprise Teams</strong>
            </div>
            <p className="text-[10px] text-emerald-200/70 leading-snug">
              Multi-seat field dispatch & approvals.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
