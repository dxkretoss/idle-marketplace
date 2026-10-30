import React, { useState } from 'react';
import { useAdmin, ADMIN_ROLES } from '../../context/AdminContext';
import { useApp } from '../../context/AppContext';
import { Lock, ArrowRight, ArrowLeft, ShieldCheck, KeyRound, User, Eye, EyeOff } from 'lucide-react';

export const AdminLoginView = () => {
  const { role, loginAdmin } = useAdmin();
  const { setRoute } = useApp();
  const [username, setUsername] = useState('admin@idle.market');
  const [passcode, setPasscode] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState(role || 'Super Admin');
  const [error, setError] = useState('');

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
    <div className="min-h-screen w-full bg-[#071d19] flex items-center justify-center p-4 select-none">
      <div className="max-w-md w-full bg-[#0a2622] border border-[#1e443c] rounded-3xl p-6 sm:p-8 text-white shadow-2xl relative overflow-hidden">
        {/* Subtle Gold Ambient Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 bg-[#d9b972]/15 blur-3xl pointer-events-none rounded-full" />

        {/* Brand Mark */}
        <div className="text-center space-y-2 relative z-10 mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[#d9b972]/20 border border-[#d9b972]/40 text-[#d9b972] mb-1">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="font-serif text-2xl font-bold tracking-tight text-white">
            IDLE Operations Center
          </h1>
          <p className="text-xs text-[#8fb8a8]">
            Restricted Administrative Access · Authorized Personnel Only
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleUnlock} className="space-y-4 relative z-10">
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

          {/* Role Selection */}
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-[#8fb8a8] mb-1.5">
              Operational Role
            </label>
            <div className="grid grid-cols-2 gap-2">
              {Object.entries(ADMIN_ROLES).map(([rName, rData]) => {
                const isSelected = selectedRole === rName;
                return (
                  <button
                    key={rName}
                    type="button"
                    onClick={() => setSelectedRole(rName)}
                    className={`p-2.5 rounded-xl border text-left text-xs transition-all cursor-pointer flex flex-col justify-between ${
                      isSelected
                        ? 'bg-[#d9b972] text-[#0a2622] border-[#d9b972] font-bold shadow-md'
                        : 'bg-[#071d19] text-[#c2ded3] border-[#1e443c] hover:border-[#2b564c]'
                    }`}
                  >
                    <span className="font-semibold truncate">{rData.icon} {rName}</span>
                    <span className={`text-[9px] mt-1 ${isSelected ? 'text-[#0a2622]/80' : 'text-gray-400'}`}>
                      {rData.views.length} views
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

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
  );
};
