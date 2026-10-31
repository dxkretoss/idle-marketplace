import React, { useState, useRef, useEffect } from 'react';
import { useAdmin, ADMIN_ROLES } from '../../context/AdminContext';
import { useApp } from '../../context/AppContext';
import {
  Lock,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  User,
  Eye,
  EyeOff,
  ChevronDown,
  Check
} from 'lucide-react';

export const AdminLoginView = () => {
  const { role, loginAdmin } = useAdmin();
  const { setRoute } = useApp();
  const [username, setUsername] = useState('admin@idle.market');
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(role || 'Super Admin');
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const [error, setError] = useState('');
  const roleDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (roleDropdownRef.current && !roleDropdownRef.current.contains(e.target)) {
        setRoleDropdownOpen(false);
      }
    };
    if (roleDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [roleDropdownOpen]);

  const handleUnlock = (e) => {
    e?.preventDefault();
    setError('');

    if (!username.trim()) {
      setError('Please enter your admin username or email');
      return;
    }

    if (!passcode.trim()) {
      setError('Please enter your admin passcode (Hint: IDLE-DEMO)');
      return;
    }

    const res = loginAdmin({ username, passcode, role: selectedRole });
    if (!res.success) {
      setError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  const handleQuickDemoFill = () => {
    setUsername('admin@idle.market');
    setPasscode('IDLE-DEMO');
    setError('');
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[#071d19] text-white select-none">
      {/* ================= LEFT SIDE: HIGH-IMPACT OPERATIONS VISUAL ================= */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#061815] overflow-hidden flex-col justify-between p-12 xl:p-16 isolate border-r border-[#1e443c]">
        {/* Immersive Photography Background */}
        <img
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85"
          alt="Operations Command"
          className="absolute inset-0 w-full h-full object-cover object-center -z-20 opacity-25 mix-blend-luminosity filter contrast-125"
        />

        {/* Emerald / Obsidian Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#071d19] via-[#0a2622]/90 to-[#071d19]/80 -z-10" />

        {/* Ambient Glows */}
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-[#d9b972]/15 rounded-full blur-3xl pointer-events-none -z-10" />
        <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none -z-10" />

        {/* Top Header */}
        <div className="flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <img
              src="/IDLE_logo.png"
              alt="IDLE"
              className="h-8 w-auto object-contain brightness-0 invert"
            />
            <span className="text-[10px] font-black uppercase tracking-widest bg-[#d9b972] text-[#0a2622] px-2.5 py-1 rounded shadow-sm">
              Admin
            </span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[#8fb8a8] bg-[#071d19]/80 border border-[#1e443c] px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>Systems Nominal</span>
          </div>
        </div>

        {/* Middle Value Proposition Headline & Narrative */}
        <div className="max-w-lg space-y-6 my-auto z-10 py-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#d9b972]/15 border border-[#d9b972]/30 text-[#d9b972] text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>Restricted Access Control</span>
          </div>

          <h1 className="font-serif text-3xl xl:text-4xl font-bold leading-tight text-white tracking-tight">
            Command & Oversight for North Texas Metro.
          </h1>

          <p className="text-sm text-[#8fb8a8] leading-relaxed">
            Real-time oversight for verified custody handoffs, Stripe Connect escrow splits, and private member operations across Dallas–Fort Worth.
          </p>

          {/* Operations Features / Metrics */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <div className="bg-[#071d19]/80 border border-[#1e443c] p-3.5 rounded-2xl">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#729e8e]">Custody Protocol</div>
              <div className="text-sm font-bold text-white mt-1">Single-Use QR Handoffs</div>
              <div className="text-[11px] text-[#8fb8a8] mt-0.5">Verified condition photo stamping</div>
            </div>
            <div className="bg-[#071d19]/80 border border-[#1e443c] p-3.5 rounded-2xl">
              <div className="text-[10px] uppercase font-bold tracking-wider text-[#729e8e]">Coverage Area</div>
              <div className="text-sm font-bold text-white mt-1">DFW Pilot Radius</div>
              <div className="text-[11px] text-[#8fb8a8] mt-0.5">Plano · Frisco · Dallas · Fort Worth</div>
            </div>
          </div>
        </div>

        {/* Bottom Security Assurance */}
        <div className="flex items-center justify-between text-xs text-[#729e8e] pt-6 border-t border-[#1e443c] z-10">
          <span className="flex items-center gap-1.5">
            <Lock className="w-3.5 h-3.5 text-[#d9b972]" />
            <span>256-Bit Encrypted Admin Session</span>
          </span>
          <span>Authorized Personnel Only</span>
        </div>
      </div>

      {/* ================= RIGHT SIDE: AUTH MODEL / FORM ================= */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-14 relative overflow-y-auto">
        {/* Subtle Gold Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#d9b972]/10 blur-3xl pointer-events-none rounded-full" />

        <div className="max-w-md w-full bg-[#0a2622] border border-[#1e443c] rounded-3xl p-7 sm:p-9 text-white shadow-2xl relative overflow-visible z-10">
          {/* Mobile Brand Mark (shown on screens smaller than lg) */}
          <div className="lg:hidden flex items-center justify-center gap-2.5 mb-6 pb-5 border-b border-[#1e443c]">
            <img
              src="/IDLE_logo.png"
              alt="IDLE"
              className="h-7 w-auto object-contain brightness-0 invert"
            />
            <span className="text-[10px] font-black uppercase tracking-widest bg-[#d9b972] text-[#0a2622] px-2 py-0.5 rounded shadow-sm">
              Admin
            </span>
          </div>

          {/* Form Header */}
          <div className="text-center space-y-2 relative z-10 mb-6">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#d9b972]/20 border border-[#d9b972]/40 text-[#d9b972] mb-1">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h2 className="font-serif text-2xl font-bold tracking-tight text-white">
              IDLE Operations Center
            </h2>
            <p className="text-xs text-[#8fb8a8]">
              Restricted Administrative Access · Authorized Personnel Only
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleUnlock} className="space-y-4 relative z-30">
            {/* Username / Email */}
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#d9b972] mb-1.5">
                Admin Username / Email
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin@idle.market"
                  className="w-full bg-[#071d19] border border-[#2b564c] focus:border-[#d9b972] rounded-xl px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none"
                />
                <User className="w-4 h-4 text-gray-400 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Passcode / Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-[11px] font-bold uppercase tracking-wider text-[#d9b972]">
                  Admin Passcode
                </label>
                <button
                  type="button"
                  onClick={handleQuickDemoFill}
                  className="text-[10px] text-[#d9b972]/80 hover:text-[#d9b972] underline cursor-pointer"
                >
                  Auto-fill demo credentials
                </button>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  placeholder="Enter passcode (e.g. IDLE-DEMO)"
                  className="w-full bg-[#071d19] border border-[#2b564c] focus:border-[#d9b972] rounded-xl px-4 py-2.5 pr-10 text-sm text-white placeholder-gray-500 font-mono tracking-wider focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {error && <p className="text-xs text-rose-400 mt-1.5 font-medium">{error}</p>}
            </div>

            {/* Role Selection Dropdown */}
            <div className="relative" ref={roleDropdownRef}>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8fb8a8] mb-1.5">
                Operational Role
              </label>

              <button
                type="button"
                onClick={() => setRoleDropdownOpen(prev => !prev)}
                className="w-full bg-[#071d19] border border-[#2b564c] hover:border-[#d9b972]/80 focus:border-[#d9b972] rounded-xl px-4 py-2.5 text-sm text-white flex items-center justify-between cursor-pointer transition-colors"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <span className="text-[#d9b972] text-base">{ADMIN_ROLES[selectedRole]?.icon || '♛'}</span>
                  <span className="font-semibold truncate">{selectedRole}</span>
                  <span className="text-[10px] bg-[#1e443c] text-[#8fb8a8] px-2 py-0.5 rounded-full font-medium">
                    {ADMIN_ROLES[selectedRole]?.views.length} views
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${roleDropdownOpen ? 'rotate-180 text-[#d9b972]' : ''}`} />
              </button>

              {roleDropdownOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-[#0a2622] border border-[#2b564c] rounded-2xl shadow-2xl py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150 max-h-[380px] overflow-y-auto no-scrollbar">
                  <div className="px-3 pb-1.5 mb-1 border-b border-[#1e443c] text-[10px] font-bold uppercase tracking-wider text-[#729e8e]">
                    Select Operational Access Level
                  </div>
                  <div className="px-1.5 space-y-1">
                    {Object.entries(ADMIN_ROLES).map(([rName, rData]) => {
                      const isSelected = selectedRole === rName;
                      return (
                        <button
                          key={rName}
                          type="button"
                          onClick={() => {
                            setSelectedRole(rName);
                            setRoleDropdownOpen(false);
                          }}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-[#d9b972] text-[#0a2622] font-bold shadow-sm'
                              : 'hover:bg-[#163a32] text-[#c2ded3]'
                          }`}
                        >
                          <div className="min-w-0">
                            <div className="flex items-center gap-2">
                              <span>{rData.icon}</span>
                              <span className="font-semibold truncate">{rName}</span>
                            </div>
                            <p className={`text-[10px] mt-0.5 truncate ${isSelected ? 'text-[#0a2622]/85' : 'text-[#8fb8a8]'}`}>
                              {rData.desc}
                            </p>
                          </div>
                          <div className="flex items-center gap-1.5 ml-2 shrink-0">
                            <span className={`text-[9px] px-1.5 py-0.5 rounded ${
                              isSelected ? 'bg-[#0a2622]/20 text-[#0a2622]' : 'bg-[#071d19] text-gray-400'
                            }`}>
                              {rData.views.length} views
                            </span>
                            {isSelected && <Check className="w-3.5 h-3.5 text-[#0a2622] stroke-[2.5]" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Authenticate CTA Button */}
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d9b972] to-[#b89547] text-[#0a2622] font-bold text-sm hover:opacity-95 shadow-lg flex items-center justify-center gap-2 cursor-pointer transition-transform active:scale-98"
            >
              <Lock className="w-4 h-4" />
              <span>Authenticate & Enter Dashboard</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-4 border-t border-[#1e443c] text-center relative z-10">
            <button
              type="button"
              onClick={() => setRoute('home')}
              className="text-xs text-[#8fb8a8] hover:text-white inline-flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to IDLE Marketplace</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
