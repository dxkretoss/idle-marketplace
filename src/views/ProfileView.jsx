import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  User,
  ShieldCheck,
  Wallet,
  Bell,
  Download,
  RotateCcw,
  CheckCircle2,
  MapPin,
  Mail,
  Crown,
  ExternalLink,
  LogOut,
  Camera
} from 'lucide-react';

import { AuthGate } from '../components/common/AuthGate';

const AVATAR_PRESETS = [
  { label: 'Creative Studio', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
  { label: 'Pro Handyman', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
  { label: 'Fleet Ops', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
  { label: 'General Contractor', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' }
];

export const ProfileView = () => {
  const { user, setUser, plan, setPlan, setRoute, resetDemoData, addToast, logout, isAuthenticated } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email || 'alex.morgan@example.com');
  const [area, setArea] = useState(user.area || 'Frisco, TX');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || AVATAR_PRESETS[0].url);
  const [notifications, setNotifications] = useState(user.notifications);

  if (!isAuthenticated) {
    return (
      <AuthGate
        badge="Member Account"
        title="Sign in to view your profile"
        subtitle="You must be signed in to manage your identity verification, Stripe Connect status, and account settings."
        actionText="Sign In to Your Account"
      />
    );
  }

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name,
      email,
      area,
      avatarUrl,
      notifications
    }));
    addToast('Profile and location updated successfully!', 'success');
  };

  const handleExportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(
      localStorage.getItem('idle_marketplace_app_state_v1') || '{}'
    );
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `idle_demo_data_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addToast('Demo state exported as JSON!', 'info');
  };

  return (
    <div className="space-y-8 pb-16 w-full">
      {/* Page Heading */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
          Trust & Member Account
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#082f2c] mt-0.5">
          Member Profile & Verification.
        </h1>
        <p className="text-xs sm:text-sm text-idle-muted mt-1">
          Manage your verified credentials, active service location, and profile photo.
        </p>
      </div>

      {/* Member Banner Card */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-idle-emerald/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-glass">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gradient-to-tr from-[#d6a746] to-[#004f46] text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-md border-2 border-white flex-shrink-0 relative group">
            {avatarUrl ? (
              <img
                src={avatarUrl}
                alt={user.name}
                className="w-full h-full object-cover"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            ) : (
              <span>{user.avatar || 'AM'}</span>
            )}
          </div>
          <div className="space-y-1">
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0d2e29]">
                {user.name}
              </h2>
              <span className="inline-flex items-center gap-1 text-[11px] font-bold text-idle-emerald bg-idle-mint px-2.5 py-0.5 rounded-full border border-idle-emerald/20">
                <ShieldCheck className="w-3.5 h-3.5" /> ID Verified
              </span>
            </div>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-xs text-idle-muted">
              <MapPin className="w-3.5 h-3.5 text-idle-gold" />
              <span>{area} · North Texas Pilot</span>
            </div>
          </div>
        </div>

        {/* Current Plan Badge Card */}
        <div className="p-3.5 rounded-2xl bg-[#f4f8f6] border border-idle-line flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-idle-mint text-idle-emerald flex items-center justify-center">
            <Crown className="w-5 h-5 text-idle-gold" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold text-idle-muted block">Subscription Tier</span>
            <strong className="text-sm font-bold text-[#172d28]">{plan} Plan</strong>
          </div>
          <button
            onClick={() => setRoute('membership')}
            className="text-xs font-bold text-idle-emerald hover:text-idle-teal underline ml-2"
          >
            Change
          </button>
        </div>
      </div>

      {/* Main Settings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Edit Information Form */}
        <div className="glass-card p-6 rounded-3xl border border-idle-line space-y-4">
          <h3 className="font-serif text-base font-bold text-[#0d2e29] flex items-center gap-2">
            <User className="w-4 h-4 text-idle-emerald" />
            <span>Profile Details</span>
          </h3>

          <form onSubmit={handleSaveProfile} className="space-y-3.5 text-xs sm:text-sm">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-idle-muted mb-1">
                Display Name
              </label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-idle-muted mb-1">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none"
              />
            </div>

            {/* Service Location with quick suggestions */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-idle-muted mb-1">
                Active Service Location
              </label>
              <div className="space-y-1.5">
                <input
                  type="text"
                  required
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="e.g. Frisco, TX"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none"
                />
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {['Frisco, TX', 'Plano, TX', 'Dallas, TX', 'Fort Worth, TX', 'McKinney, TX', 'Arlington, TX'].map(city => (
                    <button
                      key={city}
                      type="button"
                      onClick={() => setArea(city)}
                      className={`text-[11px] px-2.5 py-1 rounded-lg border transition-all cursor-pointer ${area === city
                          ? 'bg-idle-mint text-idle-emerald border-idle-emerald font-bold'
                          : 'bg-white border-idle-line text-idle-muted hover:border-idle-emerald/40'
                        }`}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Profile Avatar Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-idle-muted mb-1">
                Profile Image
              </label>
              <div className="space-y-2">
                <input
                  type="url"
                  value={avatarUrl}
                  onChange={(e) => setAvatarUrl(e.target.value)}
                  placeholder="Paste image URL (https://...)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none text-xs"
                />
                <div className="flex items-center gap-2 pt-0.5">
                  <span className="text-[10px] text-idle-muted font-bold uppercase">Presets:</span>
                  <div className="flex items-center gap-1.5">
                    {AVATAR_PRESETS.map((preset) => (
                      <button
                        key={preset.label}
                        type="button"
                        onClick={() => setAvatarUrl(preset.url)}
                        title={preset.label}
                        className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all cursor-pointer ${avatarUrl === preset.url ? 'border-idle-emerald scale-110 shadow-sm' : 'border-transparent opacity-70 hover:opacity-100'
                          }`}
                      >
                        <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <label className="flex items-center gap-2 text-xs text-idle-muted pt-1 cursor-pointer">
              <input
                type="checkbox"
                checked={notifications}
                onChange={(e) => setNotifications(e.target.checked)}
                className="rounded text-idle-emerald focus:ring-idle-emerald"
              />
              <span>Receive in-app alerts for QR handoffs & messages</span>
            </label>

            <button
              type="submit"
              className="emerald-gradient-btn w-full py-2.5 rounded-xl font-bold mt-2"
            >
              Save Profile Changes
            </button>
          </form>
        </div>

        {/* Verification & Trust Services */}
        <div className="space-y-6">
          {/* Stripe Verification Status Box */}
          <div className="glass-card p-6 rounded-3xl border border-idle-line space-y-3">
            <h3 className="font-serif text-base font-bold text-[#0d2e29] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-idle-emerald" />
              <span>Identity Verification Status</span>
            </h3>
            <p className="text-xs text-idle-muted leading-relaxed">
              Verified through Stripe Identity with driver license authentication. Enables high-value equipment custody transfers.
            </p>
            <div className="flex items-center justify-between p-3 rounded-xl bg-idle-mint/60 border border-idle-emerald/20 text-xs">
              <div className="flex items-center gap-2 text-idle-emerald font-bold">
                <CheckCircle2 className="w-4 h-4" />
                <span>Level 2 Identity Confirmed</span>
              </div>
              <span className="text-[10px] text-idle-muted">Expires Oct 2027</span>
            </div>
          </div>

          {/* Stripe Connect Payout Box */}
          <div className="glass-card p-6 rounded-3xl border border-idle-line space-y-3">
            <h3 className="font-serif text-base font-bold text-[#0d2e29] flex items-center gap-2">
              <Wallet className="w-4 h-4 text-idle-emerald" />
              <span>Stripe Connect Payout Account</span>
            </h3>
            <p className="text-xs text-idle-muted leading-relaxed">
              Direct ACH payouts connected. When renters complete custody returns, your earnings are deposited instantly.
            </p>
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#f4f7f5] border border-idle-line text-xs font-semibold">
              <span>Checking Account ending in •••• 4291</span>
              <span className="text-idle-emerald font-bold">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Controls & Data Management */}
      {/* <section className="glass-card p-6 rounded-3xl border border-idle-line space-y-3">
        <h3 className="font-serif text-base font-bold text-[#0d2e29]">
          Demo Controls & Governance
        </h3>
        <p className="text-xs text-idle-muted">
          Export your simulation state or reset the local database back to default factory conditions.
        </p>

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={() => setRoute('auth')}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-idle-emerald text-idle-emerald hover:bg-idle-mint transition-colors"
          >
            <User className="w-3.5 h-3.5" />
            <span>Switch Account / Sign In</span>
          </button>

          <button
            onClick={logout}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-idle-line text-idle-muted hover:text-red-500 hover:bg-red-50 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>

          <button
            onClick={handleExportData}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-idle-line text-[#172d28] hover:bg-black/5 transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Demo State (JSON)</span>
          </button>

          <button
            onClick={resetDemoData}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-red-300 text-red-600 hover:bg-red-50 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Demo State</span>
          </button>
        </div>
      </section> */}
    </div>
  );
};
