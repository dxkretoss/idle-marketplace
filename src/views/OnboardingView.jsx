import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Check,
  Wallet,
  Shield,
  Calendar,
  ArrowRight,
  Sparkles,
  Info
} from 'lucide-react';

export const OnboardingView = () => {
  const {
    user,
    setUser,
    plan,
    setPlan,
    PLAN_REGISTRY,
    setRoute,
    addToast
  } = useApp();

  const [step, setStep] = useState(1);
  const [name, setName] = useState(user.name === 'Guest member' ? '' : user.name || '');
  const [area, setArea] = useState(user.area || 'Frisco, TX');
  const [adultConsent, setAdultConsent] = useState(true);
  const [termsConsent, setTermsConsent] = useState(true);
  const [skills, setSkills] = useState(user.skills || 'Handyman, event decor, photography, equipment rentals');
  const [availability, setAvailability] = useState(user.availability || 'Flexible');
  const [notifications, setNotifications] = useState(user.notifications !== false);

  // Step 1: Basics submission
  const handleBasicsSubmit = (e) => {
    e.preventDefault();
    if (!adultConsent || !termsConsent) {
      addToast('Eligibility and terms consent are required to continue.', 'error');
      return;
    }
    const cleanName = name.trim().slice(0, 45) || 'Demo member';
    const cleanArea = area.trim().slice(0, 60) || 'Frisco, TX';
    setUser(prev => ({
      ...prev,
      name: cleanName,
      area: cleanArea,
      termsAcceptedAt: Date.now()
    }));
    setStep(2);
    addToast('Account basics saved! Next: Choose your membership plan.', 'info');
  };

  // Step 2: Plan selection submission
  const handlePlanSubmit = () => {
    setStep(3);
    addToast(`Selected ${plan} tier! Next: Define your skills & availability.`, 'info');
  };

  // Step 3: Profile skills submission
  const handleProfileSubmit = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      skills: skills.slice(0, 260),
      availability
    }));
    setStep(4);
    addToast('Profile saved! Final step: Tools and resources.', 'info');
  };

  // Step 4: Finish onboarding
  const handleFinish = (e) => {
    e.preventDefault();
    setUser(prev => ({
      ...prev,
      notifications,
      joined: true
    }));
    setRoute('explore');
    addToast('Welcome to IDLE! This is a local preview, not a live account.', 'success');
  };

  const TRACK_STEPS = [
    { no: '01', name: 'Basics' },
    { no: '02', name: 'Membership' },
    { no: '03', name: 'Profile' },
    { no: '04', name: 'Resources' }
  ];

  return (
    <div className="max-w-4xl mx-auto py-6 sm:py-10 px-4 sm:px-6">
      {/* Page Heading matching HTML prototype */}
      <div className="text-center sm:text-left mb-6 sm:mb-8">
        <div className="text-[11px] font-bold tracking-wider uppercase text-idle-gold mb-1">
          WELCOME TO IDLE
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#004f46] tracking-tight">
          Turn what you know and own into possibility.
        </h1>
        <p className="text-sm sm:text-base text-idle-muted mt-2 max-w-2xl leading-relaxed">
          Preview four steps toward a profile, subscription, community presence and optional tools. This is a local demonstration—not a registered account.
        </p>
      </div>

      {/* 4-Step Track Navigation - All 4 steps in ONE single horizontal line */}
      <div className="grid grid-cols-4 gap-1.5 sm:gap-3.5 mb-6 sm:mb-8">
        {TRACK_STEPS.map((st, i) => {
          const stepNum = i + 1;
          const isCurrent = step === stepNum;
          const isFinished = step > stepNum;

          return (
            <button
              key={st.no}
              type="button"
              onClick={() => setStep(stepNum)}
              className={`p-2 sm:p-4 rounded-xl sm:rounded-2xl flex flex-col items-center justify-center gap-1 sm:gap-2 border transition-all cursor-pointer ${
                isCurrent
                  ? 'border-2 border-idle-gold bg-[#fffdf3] text-[#004f46] shadow-sm'
                  : isFinished
                  ? 'border-[#c4e0ce] bg-[#edf8f1] text-[#004f46]'
                  : 'border-[#dcebe0] bg-white text-[#718777] hover:bg-[#fafbf9]'
              }`}
            >
              <span
                className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[11px] sm:text-xs font-black transition-colors ${
                  isFinished
                    ? 'bg-[#004f46] text-white'
                    : isCurrent
                    ? 'bg-[#004f46] text-white'
                    : 'bg-[#eaf3eb] text-[#718777]'
                }`}
              >
                {isFinished ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : st.no}
              </span>
              <strong className="text-[11px] sm:text-xs md:text-sm font-semibold tracking-wide truncate w-full text-center">
                {st.name}
              </strong>
            </button>
          );
        })}
      </div>

      {/* Active Step Panel matching HTML prototype */}
      <div className="glass-card rounded-3xl border border-idle-line p-6 sm:p-10 shadow-glass">
        {/* Step 1: Basics */}
        {step === 1 && (
          <div>
            <div className="text-[11px] font-bold tracking-wider uppercase text-idle-gold mb-1">
              01 / Account basics
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#004f46] mb-2">
              Everyone starts with a profile.
            </h2>
            <p className="text-sm text-idle-muted mb-6 max-w-xl leading-relaxed">
              Free profiles can browse and watch nearby Reels. Choose an approximate area; don't publish your exact home or workplace address.
            </p>

            <form onSubmit={handleBasicsSubmit} className="space-y-4 max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-[#004f46] uppercase tracking-wider mb-1.5">
                    Display name
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={45}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your display name"
                    className="w-full px-4 py-2.5 rounded-xl border border-idle-line bg-white/80 focus:outline-none focus:border-idle-emerald text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#004f46] uppercase tracking-wider mb-1.5">
                    Approximate area
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={60}
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                    placeholder="e.g. Frisco, TX"
                    className="w-full px-4 py-2.5 rounded-xl border border-idle-line bg-white/80 focus:outline-none focus:border-idle-emerald text-sm"
                  />
                </div>
              </div>

              <div className="pt-2 space-y-2.5">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#082f2c] select-none">
                  <input
                    type="checkbox"
                    checked={adultConsent}
                    onChange={(e) => setAdultConsent(e.target.checked)}
                    required
                    className="mt-0.5 rounded border-idle-line text-idle-emerald focus:ring-0"
                  />
                  <span>I meet the platform's stated age eligibility requirements.</span>
                </label>
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-[#082f2c] select-none">
                  <input
                    type="checkbox"
                    checked={termsConsent}
                    onChange={(e) => setTermsConsent(e.target.checked)}
                    required
                    className="mt-0.5 rounded border-idle-line text-idle-emerald focus:ring-0"
                  />
                  <span>I accept the demonstration terms and understand that no real account is created.</span>
                </label>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-idle-emerald hover:bg-[#003d36] text-white font-medium text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Continue →
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 2: Membership */}
        {step === 2 && (
          <div>
            <div className="text-[11px] font-bold tracking-wider uppercase text-idle-gold mb-1">
              02 / One plan across roles
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#004f46] mb-2">
              Choose your experience.
            </h2>
            <p className="text-sm text-idle-muted mb-6 max-w-xl leading-relaxed">
              Free means profile, browse and view. Studio and higher unlock new messages, earning/service listings, rentals, offers and self-promotional Reels.
            </p>

            {/* Plan selection grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mb-6">
              {Object.entries(PLAN_REGISTRY).map(([planKey, p]) => {
                const isSelected = plan === planKey;
                return (
                  <button
                    key={planKey}
                    type="button"
                    onClick={() => setPlan(planKey)}
                    className={`p-4 rounded-2xl text-left flex flex-col justify-between min-h-[140px] border transition-all cursor-pointer ${
                      isSelected
                        ? 'border-2 border-idle-gold bg-[#fffdf2] shadow-sm'
                        : 'border-[#d8e4dc] bg-white hover:border-idle-emerald/40'
                    }`}
                  >
                    <div>
                      <strong className="font-serif text-lg font-bold text-[#004f46] block">
                        {p.name || planKey}
                      </strong>
                      <span className="text-xs font-bold text-idle-emerald mt-1 block">
                        ${p.price} / month
                      </span>
                    </div>
                    <p className="text-xs text-[#607569] mt-2 leading-snug">
                      {p.caption}
                    </p>
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={handlePlanSubmit}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-idle-emerald hover:bg-[#003d36] text-white font-medium text-sm shadow-md transition-all active:scale-95 cursor-pointer"
              >
                Continue to profile →
              </button>
            </div>

            <div className="mt-5 p-3 rounded-xl bg-amber-50/70 border border-amber-200/60 text-xs text-amber-900 flex items-start gap-2">
              <Info className="w-4 h-4 shrink-0 text-amber-700 mt-0.5" />
              <span>
                Prices and plan quantities are proposed for owner approval. Choosing a plan here changes demo permissions only, without charging or activating a subscription.
              </span>
            </div>
          </div>
        )}

        {/* Step 3: Profile */}
        {step === 3 && (
          <div>
            <div className="text-[11px] font-bold tracking-wider uppercase text-idle-gold mb-1">
              03 / Your profile
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#004f46] mb-2">
              Let your community know your skills.
            </h2>
            <p className="text-sm text-idle-muted mb-6 max-w-xl leading-relaxed">
              Showcase your gear specialties, skills or local services so community members know what you can offer.
            </p>

            <form onSubmit={handleProfileSubmit} className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs font-bold text-[#004f46] uppercase tracking-wider mb-1.5">
                  Skills, interests or trades
                </label>
                <textarea
                  maxLength={260}
                  rows={3}
                  value={skills}
                  onChange={(e) => setSkills(e.target.value)}
                  placeholder="Handyman, event decor, photography, equipment rentals…"
                  className="w-full px-4 py-2.5 rounded-xl border border-idle-line bg-white/80 focus:outline-none focus:border-idle-emerald text-sm leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#004f46] uppercase tracking-wider mb-1.5">
                  Availability
                </label>
                <select
                  value={availability}
                  onChange={(e) => setAvailability(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-idle-line bg-white/80 focus:outline-none focus:border-idle-emerald text-sm"
                >
                  <option value="Flexible">Flexible</option>
                  <option value="Weekdays">Weekdays</option>
                  <option value="Weekends">Weekends</option>
                  <option value="By appointment">By appointment</option>
                </select>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-idle-emerald hover:bg-[#003d36] text-white font-medium text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  Continue to resources →
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Step 4: Tools & Resources */}
        {step === 4 && (
          <div>
            <div className="text-[11px] font-bold tracking-wider uppercase text-idle-gold mb-1">
              04 / Tools and resources
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#004f46] mb-2">
              You're ready to explore.
            </h2>
            <p className="text-sm text-idle-muted mb-6 max-w-xl leading-relaxed">
              The directory is visible to everyone. External services require separate eligibility, permission, and any vendor-provided checkout; IDLE has not connected these integrations.
            </p>

            <form onSubmit={handleFinish} className="space-y-4 max-w-xl">
              <label className="flex items-center gap-2.5 cursor-pointer text-xs text-[#082f2c] select-none pb-2">
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="rounded border-idle-line text-idle-emerald focus:ring-0"
                />
                <span>Demo notification preference (no messages are sent).</span>
              </label>

              {/* 3 Tool overview rows matching prototype */}
              <div className="space-y-2.5 pt-1">
                <div className="flex items-start gap-3 p-3.5 rounded-xl border border-[#dce9de] bg-white/70">
                  <div className="w-8 h-8 rounded-lg bg-idle-mint text-idle-emerald flex items-center justify-center shrink-0 mt-0.5">
                    <Wallet className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-[#004f46] block">
                      Payments and receipts
                    </strong>
                    <small className="text-xs text-[#6f8377] block mt-0.5 leading-snug">
                      Different from subscription billing; direct peer and vendor terms apply.
                    </small>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl border border-[#dce9de] bg-white/70">
                  <div className="w-8 h-8 rounded-lg bg-idle-mint text-idle-emerald flex items-center justify-center shrink-0 mt-0.5">
                    <Shield className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-[#004f46] block">
                      Credentials and safety
                    </strong>
                    <small className="text-xs text-[#6f8377] block mt-0.5 leading-snug">
                      Scope-specific consent, eligible payer and independent verification.
                    </small>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-xl border border-[#dce9de] bg-white/70">
                  <div className="w-8 h-8 rounded-lg bg-idle-mint text-idle-emerald flex items-center justify-center shrink-0 mt-0.5">
                    <Calendar className="w-4 h-4" />
                  </div>
                  <div>
                    <strong className="text-xs font-bold text-[#004f46] block">
                      Scheduling and operations
                    </strong>
                    <small className="text-xs text-[#6f8377] block mt-0.5 leading-snug">
                      Optional customer-owned calendars, planning and business tools.
                    </small>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-idle-gold hover:bg-[#c2963c] text-[#082f2c] font-bold text-sm shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <span>Finish and explore marketplace</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

