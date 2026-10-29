import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import {
  User,
  Sparkles,
  Check,
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
  Camera,
  Upload,
  X,
  Trash2,
  ChevronDown,
  Search
} from 'lucide-react';

import { AuthGate } from '../components/common/AuthGate';

const AVATAR_PRESETS = [
  { label: 'Creative Studio', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80' },
  { label: 'Pro Handyman', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80' },
  { label: 'Fleet Ops', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80' },
  { label: 'General Contractor', url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80' }
];

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

export const ProfileView = () => {
  const { user, setUser, plan, setPlan, setRoute, resetDemoData, addToast, logout, isAuthenticated } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email || 'alex.morgan@example.com');
  const [area, setArea] = useState(user.area || 'Frisco, TX');
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl || AVATAR_PRESETS[0].url);
  const [notifications, setNotifications] = useState(user.notifications);
  const [userInterests, setUserInterests] = useState(user.interests || ['Home', 'Tools', 'Electronics', 'Services']);
  const avatarInputRef = useRef(null);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
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

  const handleAvatarFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Please select an image file (PNG, JPG, WEBP)', 'error');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      addToast('Image size should be less than 10MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const newUrl = event.target.result;
      setAvatarUrl(newUrl);
      setUser(prev => ({
        ...prev,
        avatarUrl: newUrl
      }));
      setAvatarModalOpen(false);
      addToast('Profile photo updated successfully!', 'success');
    };
    reader.onerror = () => {
      addToast('Failed to load image file', 'error');
    };
    reader.readAsDataURL(file);
  };

  const handleSelectPreset = (url) => {
    setAvatarUrl(url);
    setUser(prev => ({
      ...prev,
      avatarUrl: url
    }));
    setAvatarModalOpen(false);
    addToast('Profile photo updated!', 'success');
  };

  const handleRemovePhoto = () => {
    setAvatarUrl('');
    setUser(prev => ({
      ...prev,
      avatarUrl: ''
    }));
    setAvatarModalOpen(false);
    addToast('Profile photo removed (showing initials)', 'info');
  };

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

  const handleToggleInterest = (catId) => {
    setUserInterests(prev => {
      if (prev.includes(catId)) {
        return prev.filter(id => id !== catId);
      } else {
        return [...prev, catId];
      }
    });
  };

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      name,
      email,
      area,
      avatarUrl,
      notifications,
      interests: userInterests.length > 0 ? userInterests : ['Home', 'Tools', 'Electronics', 'Services']
    }));
    addToast('Profile and category feed preferences updated!', 'success');
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
          {/* Avatar with Camera Icon Overlay & Direct Change Controls */}
          <div className="relative group flex-shrink-0">
            <div 
              onClick={() => setAvatarModalOpen(true)}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden bg-gradient-to-tr from-[#d6a746] to-[#004f46] text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-md border-2 border-white cursor-pointer relative transition-all group-hover:scale-105 group-hover:shadow-lg"
              title="Click to change profile photo"
            >
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

              {/* Hover Dark Overlay with Camera Icon */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-1">
                <Camera className="w-5 h-5 text-idle-gold" />
                <span className="text-[9px] font-bold mt-0.5">Change</span>
              </div>
            </div>

            {/* Small Floating Camera Badge Button */}
            <button
              type="button"
              onClick={() => setAvatarModalOpen(true)}
              className="absolute -bottom-1 -right-1 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-idle-emerald text-white border-2 border-white shadow-md flex items-center justify-center hover:bg-[#002f2a] hover:scale-110 transition-all cursor-pointer"
              title="Change profile photo"
            >
              <Camera className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
            </button>
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
            <button
              type="button"
              onClick={() => setAvatarModalOpen(true)}
              className="text-[11px] font-bold text-idle-emerald hover:underline flex items-center gap-1 cursor-pointer pt-0.5"
            >
              <Camera className="w-3 h-3" />
              <span>Change profile photo</span>
            </button>
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

            {/* Service Location with Interactive Dropdown */}
            <div className="relative" ref={locationRef}>
              <label className="block text-xs font-bold uppercase tracking-wider text-idle-muted mb-1">
                Active Service Location
              </label>

              {/* Dropdown Trigger */}
              <button
                type="button"
                onClick={() => {
                  setIsLocationOpen(!isLocationOpen);
                  setLocationSearch('');
                }}
                className="w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] hover:bg-white focus:bg-white focus:border-idle-emerald text-left transition-all cursor-pointer shadow-sm"
              >
                <div className="flex items-center gap-2 text-sm text-[#172d28] font-medium">
                  <MapPin className="w-4 h-4 text-idle-emerald shrink-0" />
                  <span>{area || 'Select a North Texas location'}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-idle-muted transition-transform duration-200 ${isLocationOpen ? 'rotate-180 text-idle-emerald' : ''}`} />
              </button>

              {/* Dropdown Menu */}
              {isLocationOpen && (
                <div className="absolute z-30 left-0 right-0 mt-1.5 bg-white border border-idle-line rounded-xl shadow-xl overflow-hidden">
                  {/* Search bar inside dropdown */}
                  <div className="p-2 border-b border-idle-line bg-[#fafcfb]">
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-idle-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={locationSearch}
                        onChange={(e) => setLocationSearch(e.target.value)}
                        placeholder="Search North Texas city or type custom..."
                        className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-idle-line bg-white focus:outline-none focus:border-idle-emerald"
                        autoFocus
                      />
                    </div>
                  </div>

                  {/* List of Locations */}
                  <div className="max-h-56 overflow-y-auto divide-y divide-idle-line/40">
                    {DFW_LOCATIONS.filter(loc => loc.toLowerCase().includes(locationSearch.toLowerCase().trim())).map(loc => {
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
                          className={`w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left transition-colors cursor-pointer ${
                            isSelected
                              ? 'bg-idle-mint/60 text-idle-emerald font-semibold'
                              : 'text-idle-charcoal hover:bg-[#f8faf9]'
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

                    {/* Custom location option if searched text doesn't exactly match any item */}
                    {locationSearch.trim() && !DFW_LOCATIONS.some(l => l.toLowerCase() === locationSearch.trim().toLowerCase()) && (
                      <button
                        type="button"
                        onClick={() => {
                          setArea(locationSearch.trim());
                          setIsLocationOpen(false);
                          setLocationSearch('');
                        }}
                        className="w-full flex items-center justify-between px-3.5 py-2.5 text-xs text-left text-idle-emerald bg-idle-mint/30 hover:bg-idle-mint/60 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3.5 h-3.5 text-idle-emerald" />
                          <span>Use &quot;{locationSearch.trim()}&quot;</span>
                        </div>
                        <Check className="w-3.5 h-3.5 text-idle-emerald" />
                      </button>
                    )}

                    {DFW_LOCATIONS.filter(loc => loc.toLowerCase().includes(locationSearch.toLowerCase().trim())).length === 0 && !locationSearch.trim() && (
                      <div className="px-3 py-4 text-center text-xs text-idle-muted">
                        No locations found
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Category Feed Preferences */}
            <div className="pt-2 border-t border-idle-line space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-[#172d28] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-idle-gold" />
                  <span>Personalized Feed Categories</span>
                </span>
                <span className="text-[11px] text-idle-muted">{userInterests.length} selected</span>
              </div>
              <p className="text-[11px] text-idle-muted leading-tight">
                Select your preferred marketplace categories to filter your homepage feed:
              </p>
              <div className="grid grid-cols-2 gap-2 pt-1 max-h-48 overflow-y-auto no-scrollbar pr-0.5">
                {CATEGORIES.filter(c => c.id !== 'All').map((cat) => {
                  const isChecked = userInterests.includes(cat.id);
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => handleToggleInterest(cat.id)}
                      className={`p-2 rounded-xl text-left text-xs font-semibold flex items-center justify-between gap-1.5 border transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-idle-mint/70 border-idle-emerald text-idle-emerald shadow-xs'
                          : 'bg-[#edf3f0] hover:bg-white border-idle-line text-[#213f37]'
                      }`}
                    >
                      <span className="truncate">{cat.label}</span>
                      {isChecked && <Check className="w-3 h-3 text-idle-emerald flex-shrink-0" />}
                    </button>
                  );
                })}
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
      {/* Change Profile Photo Modal */}
      {avatarModalOpen && (
        <div 
          className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 !m-0"
          onClick={() => setAvatarModalOpen(false)}
        >
          <div 
            className="glass-card bg-white max-w-sm w-full rounded-3xl shadow-2xl border border-idle-emerald/20 p-6 space-y-4 flex flex-col text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-idle-line pb-3">
              <div className="flex items-center gap-2">
                <Camera className="w-4 h-4 text-idle-gold" />
                <h3 className="font-serif text-base font-bold text-[#003d36]">Change Profile Photo</h3>
              </div>
              <button 
                type="button"
                onClick={() => setAvatarModalOpen(false)}
                className="p-1 rounded-full text-idle-muted hover:bg-black/5 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Current Avatar Preview */}
            <div className="mx-auto w-24 h-24 rounded-full overflow-hidden border-4 border-idle-mint shadow-md relative bg-gradient-to-tr from-[#d6a746] to-[#004f46] text-white flex items-center justify-center font-bold text-3xl">
              {avatarUrl ? (
                <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
              ) : (
                <span>{user.avatar || 'AM'}</span>
              )}
            </div>

            {/* Hidden File Input */}
            <input
              type="file"
              ref={avatarInputRef}
              onChange={handleAvatarFileChange}
              accept="image/*"
              className="hidden"
            />

            {/* Action 1: Upload from Device */}
            <button
              type="button"
              onClick={() => avatarInputRef.current?.click()}
              className="gold-gradient-btn w-full py-3 rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Photo from Device</span>
            </button>

            {/* Action 2: Presets */}
            <div className="space-y-2 pt-2 border-t border-idle-line">
              <span className="text-[11px] font-bold text-idle-muted uppercase tracking-wider block">
                Or Choose from Presets:
              </span>
              <div className="flex items-center justify-center gap-3">
                {AVATAR_PRESETS.map((preset) => {
                  const isCurrent = avatarUrl === preset.url;
                  return (
                    <button
                      key={preset.label}
                      type="button"
                      onClick={() => handleSelectPreset(preset.url)}
                      title={preset.label}
                      className={`w-10 h-10 rounded-full overflow-hidden border-2 transition-all cursor-pointer relative ${
                        isCurrent ? 'border-idle-emerald ring-2 ring-idle-emerald/40 scale-110 shadow-sm' : 'border-transparent opacity-75 hover:opacity-100 hover:scale-105'
                      }`}
                    >
                      <img src={preset.url} alt={preset.label} className="w-full h-full object-cover" />
                      {isCurrent && (
                        <div className="absolute inset-0 bg-idle-emerald/20 flex items-center justify-center">
                          <Check className="w-3.5 h-3.5 text-white stroke-[3] drop-shadow-sm" />
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Action 3: Remove photo (if avatarUrl exists) */}
            {avatarUrl && (
              <button
                type="button"
                onClick={handleRemovePhoto}
                className="text-xs text-red-500 hover:text-red-700 font-semibold flex items-center justify-center gap-1.5 pt-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove current photo</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
