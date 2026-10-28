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
  LogOut
} from 'lucide-react';

import { AuthGate } from '../components/common/AuthGate';

export const ProfileView = () => {
  const { user, setUser, plan, setPlan, setRoute, resetDemoData, addToast, logout, isAuthenticated } = useApp();

  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email || 'alex.morgan@example.com');
  const [area, setArea] = useState(user.area);
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
      notifications
    }));
    addToast('Profile updated successfully!', 'success');
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
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      {/* Page Heading */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
          Trust & Member Account
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#082f2c] mt-0.5">
          Member Profile & Verification.
        </h1>
        <p className="text-xs sm:text-sm text-idle-muted mt-1">
          Manage your verified credentials, Stripe Connect payout setup, and personal privacy controls.
        </p>
      </div>

      {/* Member Banner Card */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-idle-emerald/20 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-glass">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-[#d6a746] to-[#004f46] text-white flex items-center justify-center font-bold text-xl sm:text-2xl shadow-md border-2 border-white">
            {user.avatar || 'AM'}
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
              <span>{user.area} · North Texas Pilot</span>
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

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-idle-muted mb-1">
                Service Radius / Area
              </label>
              <input
                type="text"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none"
              />
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
      <section className="glass-card p-6 rounded-3xl border border-idle-line space-y-3">
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
      </section>
    </div>
  );
};
