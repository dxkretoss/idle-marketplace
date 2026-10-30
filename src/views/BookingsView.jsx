import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Briefcase, 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Camera, 
  FileText,
  DollarSign,
  AlertCircle,
  Lock,
  Sparkles,
  Zap,
  Check,
  Shield,
  ArrowDownRight,
  Split,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

import { AuthGate } from '../components/common/AuthGate';

const STAGES = [
  'Draft', 
  'Agreement preview', 
  'Payment review', 
  'Handoff preview', 
  'Completed'
];

export const BookingsView = () => {
  const { 
    bookings, 
    activeBooking, 
    setActiveBooking, 
    advanceBookingStage, 
    updateBooking,
    setRoute, 
    isAuthenticated,
    addToast 
  } = useApp();

  if (!isAuthenticated) {
    return (
      <AuthGate
        badge="Active Bookings"
        title="Sign in to view your bookings & handoffs"
        subtitle="You must be signed in to manage active equipment rentals, stage progress, and single-use QR custody transfers."
        actionText="Sign In to View Bookings"
      />
    );
  }

  const selectedBooking = activeBooking || bookings[0];

  // Stage tab selection (defaults to current booking stage, but allows exploring other stages)
  const [activeStageTab, setActiveStageTab] = useState(null);
  const currentStage = activeStageTab || selectedBooking?.stage || 'Payment review';

  // Bookings stage filter state
  const [bookingFilter, setBookingFilter] = useState('All');

  // Tint.ai protection plan toggle state
  const [protectionPlanOn, setProtectionPlanOn] = useState(
    selectedBooking?.protectionPlanEnabled !== false
  );

  const filteredBookings = React.useMemo(() => {
    if (!bookings) return [];
    if (bookingFilter === 'All') return bookings;
    if (bookingFilter === 'Payment') return bookings.filter(b => b.stage === 'Payment review');
    if (bookingFilter === 'Handoff') return bookings.filter(b => b.stage === 'Handoff preview');
    if (bookingFilter === 'Completed') return bookings.filter(b => b.stage === 'Completed');
    return bookings;
  }, [bookings, bookingFilter]);

  // Sync toggle when switching bookings
  React.useEffect(() => {
    if (selectedBooking) {
      setProtectionPlanOn(selectedBooking.protectionPlanEnabled !== false);
      setActiveStageTab(null);
    }
  }, [selectedBooking?.id]);

  if (!selectedBooking) {
    return (
      <div className="glass-card p-12 text-center rounded-3xl space-y-3">
        <Briefcase className="w-12 h-12 text-idle-muted mx-auto" />
        <h3 className="font-serif text-lg font-bold text-[#172d28]">No active bookings</h3>
        <p className="text-xs text-idle-muted max-w-sm mx-auto">
          Choose any listing from Explore and tap "Book with QR Handoff" to start a simulated agreement.
        </p>
        <button
          onClick={() => setRoute('explore')}
          className="emerald-gradient-btn px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
        >
          Explore Marketplace
        </button>
      </div>
    );
  }

  // Pricing calculations matching client's screenshot & formula
  const rentalDays = selectedBooking.rentalDays || 3;
  const dailyRate = selectedBooking.price || 90;
  const itemSubtotal = dailyRate * rentalDays;
  const depositHold = selectedBooking.deposit || 1500;
  const idleCommission = Number((itemSubtotal * 0.025).toFixed(2)); // 2.5% IDLE fee
  const lenderPayout = Number((itemSubtotal * 0.975).toFixed(2)); // 97.5% lender payout
  const insurancePremium = protectionPlanOn ? Number((12.50 * rentalDays).toFixed(2)) : 0;
  const totalAmountDue = Number((itemSubtotal + idleCommission + insurancePremium).toFixed(2));
  const policyId = selectedBooking.policyId || 'TN-987XBC-24';

  const handleNextStage = (b) => {
    const currentIdx = STAGES.indexOf(b.stage);
    if (currentIdx < STAGES.length - 1) {
      advanceBookingStage(b.id, STAGES[currentIdx + 1]);
      setActiveStageTab(null);
    }
  };

  const handleCompleteCheckout = () => {
    // Record checkout authorization in booking status and advance to Handoff preview
    if (updateBooking) {
      updateBooking(selectedBooking.id, {
        total: totalAmountDue,
        protectionPlanEnabled: protectionPlanOn,
        stage: 'Handoff preview',
        statusHistory: [
          { 
            time: 'Just now', 
            message: `Checkout authorized: $${totalAmountDue.toFixed(2)} charged via Stripe Connect ($${lenderPayout.toFixed(2)} to lender, $${idleCommission.toFixed(2)} to IDLE). $${depositHold.toFixed(2)} deposit held on card.` 
          },
          ...(protectionPlanOn ? [{ time: 'Just now', message: `Tint.ai Micro-Policy ${policyId} bound & active ($${insurancePremium.toFixed(2)})` }] : []),
          ...(selectedBooking.statusHistory || [])
        ]
      });
    } else {
      advanceBookingStage(selectedBooking.id, 'Handoff preview');
    }
    setActiveStageTab('Handoff preview');
    addToast(`Checkout complete! ${protectionPlanOn ? `Policy ${policyId} bound with Tint.ai. ` : ''}Custody handoff QR code ready.`, 'success');
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Heading */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
          Custody & Agreements
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#082f2c] mt-0.5">
          Bookings & Transactions.
        </h1>
        <p className="text-xs sm:text-sm text-idle-muted mt-1 max-w-2xl">
          Move through the 5-stage transaction lifecycle. Includes automated Tint.ai third-party protection underwriting, Stripe Connect payout routing (97.5% lender / 2.5% IDLE), and single-use dynamic QR custody verification.
        </p>
      </div>

      {/* Active Bookings Luxury Cards Carousel & Quick Filter */}
      {bookings && bookings.length > 1 && (
        <div className="space-y-3">
          {/* Header Row with Filter Pills */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-idle-emerald/15 flex items-center justify-center text-idle-emerald">
                <Briefcase className="w-3.5 h-3.5" />
              </div>
              <h3 className="text-xs sm:text-sm font-bold text-[#172d28] uppercase tracking-wider flex items-center gap-2">
                <span>Active Bookings</span>
                <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-idle-mint text-idle-emerald">
                  {bookings.length}
                </span>
              </h3>
            </div>

            {/* Quick Filter Stage Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar">
              {['All', 'Payment', 'Handoff', 'Completed'].map((tab) => {
                const isCurrentFilter = bookingFilter === tab;
                const count = tab === 'All' 
                  ? bookings.length 
                  : bookings.filter(b => {
                      if (tab === 'Payment') return b.stage === 'Payment review';
                      if (tab === 'Handoff') return b.stage === 'Handoff preview';
                      if (tab === 'Completed') return b.stage === 'Completed';
                      return true;
                    }).length;
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setBookingFilter(tab)}
                    className={`px-2.5 py-1 rounded-xl text-[11px] font-bold transition-all cursor-pointer whitespace-nowrap flex items-center gap-1.5 ${
                      isCurrentFilter
                        ? 'bg-[#004f46] text-white shadow-xs'
                        : 'bg-white hover:bg-gray-100 text-idle-muted border border-idle-line'
                    }`}
                  >
                    <span>{tab}</span>
                    <span className={`text-[9px] px-1.5 py-0.2 rounded-full ${
                      isCurrentFilter ? 'bg-idle-gold text-[#002822] font-extrabold' : 'bg-gray-100 text-gray-500'
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Luxury Horizontal Cards Rail */}
          <div className="flex items-stretch gap-3 overflow-x-auto pb-2.5 pt-1 pl-0.5 no-scrollbar snap-x">
            {filteredBookings.map((b) => {
              const isSelected = selectedBooking?.id === b.id;
              const bDays = b.rentalDays || 3;
              const bSubtotal = (b.price || 90) * bDays;
              const bTotal = b.total || Number((bSubtotal + Number((bSubtotal * 0.025).toFixed(2)) + (b.protectionPlanEnabled !== false ? Number((12.50 * bDays).toFixed(2)) : 0)).toFixed(2));
              const itemImg = b.image || b.conditionPhotos?.[0] || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=300&q=80';

              // Stage styling helper
              const getStageBadge = (stage) => {
                switch (stage) {
                  case 'Payment review':
                    return { label: 'Payment Due', color: 'bg-amber-100 text-amber-900 border-amber-300' };
                  case 'Handoff preview':
                    return { label: 'Handoff Ready', color: 'bg-emerald-100 text-emerald-900 border-emerald-300' };
                  case 'Completed':
                    return { label: 'Completed', color: 'bg-gray-100 text-gray-700 border-gray-200' };
                  case 'Draft':
                    return { label: 'Draft', color: 'bg-yellow-50 text-yellow-800 border-yellow-200' };
                  default:
                    return { label: stage || 'Agreement', color: 'bg-teal-50 text-teal-800 border-teal-200' };
                }
              };

              const stageBadge = getStageBadge(b.stage);

              return (
                <button
                  key={b.id}
                  type="button"
                  onClick={() => {
                    setActiveBooking(b);
                    setActiveStageTab(null);
                  }}
                  className={`min-w-[260px] sm:min-w-[280px] max-w-[300px] p-3 rounded-2xl border text-left transition-all duration-200 cursor-pointer snap-start flex items-center gap-3 shrink-0 relative ${
                    isSelected
                      ? 'bg-gradient-to-br from-[#02332c] to-[#01241f] text-white border-idle-gold/80 shadow-lg ring-2 ring-idle-gold/50 scale-[1.01]'
                      : 'bg-white hover:bg-[#fbfdfc] border-idle-line text-[#172d28] hover:shadow-md hover:border-idle-emerald/40'
                  }`}
                >
                  {/* Item Image Thumbnail */}
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden shrink-0 border border-white/20">
                    <img
                      src={itemImg}
                      alt={b.listingTitle}
                      className="w-full h-full object-cover"
                    />
                    {isSelected && (
                      <div className="absolute inset-0 bg-[#004f46]/40 backdrop-blur-[1px] flex items-center justify-center">
                        <span className="w-5 h-5 rounded-full bg-idle-gold text-[#002822] flex items-center justify-center font-extrabold text-[10px]">
                          ✓
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Booking Metadata */}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div className="flex items-center justify-between gap-1.5">
                      <span className={`text-[10px] font-mono font-extrabold ${isSelected ? 'text-idle-gold' : 'text-idle-emerald'}`}>
                        {b.id}
                      </span>
                      <span className={`text-[9px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-md border ${
                        isSelected ? 'bg-white/10 text-emerald-200 border-white/20' : stageBadge.color
                      }`}>
                        {stageBadge.label}
                      </span>
                    </div>

                    <h4 className={`text-xs font-bold truncate leading-tight ${isSelected ? 'text-white' : 'text-[#172d28]'}`}>
                      {b.listingTitle}
                    </h4>

                    <div className="flex items-center justify-between gap-2 pt-0.5">
                      <span className={`text-[10px] truncate ${isSelected ? 'text-emerald-200/70' : 'text-idle-muted'}`}>
                        {b.provider}
                      </span>
                      <strong className={`text-xs font-extrabold ${isSelected ? 'text-idle-gold' : 'text-[#004f46]'}`}>
                        ${bTotal.toFixed(2)}
                      </strong>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main Selected Booking Card */}
      <div className="glass-card p-5 sm:p-7 md:p-8 rounded-3xl border border-idle-emerald/20 shadow-glass space-y-6">
        {/* Booking Card Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-idle-line pb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-idle-emerald bg-idle-mint px-2.5 py-0.5 rounded-full">
                {selectedBooking.id}
              </span>
              <span className="text-xs text-idle-muted">
                Lender / Provider: <strong>{selectedBooking.provider}</strong>
              </span>
              {selectedBooking.dates && (
                <span className="text-xs text-[#004f46] bg-emerald-50 border border-emerald-200/60 px-2 py-0.5 rounded-md font-semibold">
                  {selectedBooking.dates}
                </span>
              )}
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0d2e29]">
              {selectedBooking.listingTitle}
            </h2>
          </div>

          <div className="text-left sm:text-right">
            <div className="flex items-baseline sm:justify-end gap-1.5">
              <span className="text-2xl sm:text-3xl font-extrabold text-[#004f46]">
                ${totalAmountDue.toFixed(2)}
              </span>
              <span className="text-xs font-bold text-idle-muted uppercase tracking-wider">
                Total Due
              </span>
            </div>
            <span className="text-[11px] text-amber-700 font-semibold block mt-0.5">
              + ${depositHold.toFixed(2)} refundable deposit hold (released upon return)
            </span>
          </div>
        </div>

        {/* Interactive 5-Stage Stepper Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-idle-muted block">
              Lifecycle Progress · Click any stage to inspect details
            </span>
            <span className="text-xs font-bold text-idle-emerald">
              Active Stage: <strong className="text-[#004f46]">{currentStage}</strong>
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {STAGES.map((stg, i) => {
              const bookingStageIdx = STAGES.indexOf(selectedBooking.stage);
              const isPassed = i <= bookingStageIdx;
              const isSelectedTab = currentStage === stg;
              return (
                <button
                  type="button"
                  key={stg}
                  onClick={() => setActiveStageTab(stg)}
                  className={`p-2.5 sm:p-3 rounded-2xl border text-center transition-all cursor-pointer ${
                    isSelectedTab
                      ? 'bg-idle-emerald text-white border-idle-emerald shadow-md ring-2 ring-idle-gold/60 scale-[1.02]'
                      : isPassed
                        ? 'bg-idle-mint/80 border-idle-emerald/40 text-idle-emerald font-semibold hover:bg-idle-mint'
                        : 'bg-[#f8faf9] border-idle-line text-idle-muted hover:bg-gray-100/80'
                  }`}
                >
                  <div className="flex items-center justify-center mb-1">
                    {isPassed ? (
                      <CheckCircle2 className={`w-4 h-4 ${isSelectedTab ? 'text-idle-gold' : 'text-idle-emerald'}`} />
                    ) : (
                      <span className="w-4 h-4 rounded-full border border-current text-[10px] flex items-center justify-center font-bold">
                        {i + 1}
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] font-bold block truncate">{stg}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* STAGE 3: PAYMENT REVIEW & PROTECTION PLAN (MATCHING CLIENT SCREENSHOT) */}
        {currentStage === 'Payment review' && (
          <div className="space-y-6 pt-2">
            {/* Visual Process Architecture Flowchart (Replicating Screenshot Diagram) */}
            <div className="rounded-2xl bg-gradient-to-br from-[#02241e] via-[#021f1a] to-[#011713] p-4 sm:p-5 text-white border border-idle-gold/30 shadow-xl overflow-hidden relative">
              <div className="flex items-center justify-between mb-3 border-b border-white/10 pb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-idle-gold/20 border border-idle-gold/40 flex items-center justify-center">
                    <Sparkles className="w-4 h-4 text-idle-gold" />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-bold text-white tracking-wide">
                      IDLE Checkout Architecture · Stripe Connect & Tint.ai Protocol
                    </h3>
                    <p className="text-[10px] text-emerald-200/70">
                      Dynamic split routing, instant underwriting, and automated pre-authorization hold
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-idle-gold/15 text-idle-gold border border-idle-gold/30 hidden sm:inline-block">
                  API ROUTE: v2.4/checkout
                </span>
              </div>

              {/* Responsive Flowchart Diagram */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
                {/* Step 1: Initiate */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-idle-goldLight uppercase">1. Order Details</span>
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  </div>
                  <div className="font-bold text-white truncate">{selectedBooking.listingTitle}</div>
                  <div className="text-[11px] text-emerald-200/70 mt-1">
                    {rentalDays} days @ ${dailyRate}/day (${itemSubtotal.toFixed(2)})
                  </div>
                </div>

                {/* Step 2: Protection Plan Fork */}
                <div className={`p-3 rounded-xl border transition-all flex flex-col justify-between ${
                  protectionPlanOn
                    ? 'bg-idle-gold/15 border-idle-gold text-white ring-1 ring-idle-gold/50'
                    : 'bg-white/5 border-white/10 text-white/70'
                }`}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-idle-gold uppercase">2. Tint.ai API</span>
                    <span className={`w-2 h-2 rounded-full ${protectionPlanOn ? 'bg-idle-gold animate-pulse' : 'bg-gray-500'}`} />
                  </div>
                  <div className="font-bold truncate">
                    {protectionPlanOn ? 'Third-Party Plan Active' : 'Standard Payflow'}
                  </div>
                  <div className="text-[11px] text-emerald-200/70 mt-1">
                    {protectionPlanOn ? `$12.50/day (Policy: ${policyId})` : 'No insurance premium added'}
                  </div>
                </div>

                {/* Step 3: Stripe Connect Gateway */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-idle-goldLight uppercase">3. Stripe Connect</span>
                    <Lock className="w-3 h-3 text-emerald-400" />
                  </div>
                  <div className="font-bold text-white truncate">97.5% / 2.5% Split</div>
                  <div className="text-[11px] text-emerald-200/70 mt-1">
                    Lender: ${lenderPayout.toFixed(2)} · IDLE: ${idleCommission.toFixed(2)}
                  </div>
                </div>

                {/* Step 4: Deposit Pre-Auth */}
                <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex flex-col justify-between">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[10px] font-bold text-idle-goldLight uppercase">4. Deposit Hold</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-idle-gold" />
                  </div>
                  <div className="font-bold text-white truncate">${depositHold.toFixed(2)} Card Hold</div>
                  <div className="text-[11px] text-emerald-200/70 mt-1">
                    Released upon return inspection
                  </div>
                </div>
              </div>
            </div>

            {/* Main Interactive Checkout Interface */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left Column: Protection Plan Toggle & Policy Details (7 Cols) */}
              <div className="lg:col-span-7 space-y-4">
                {/* Rental Item Summary Box */}
                <div className="p-4 rounded-2xl bg-white border border-idle-line flex items-center gap-3.5 shadow-2xs">
                  <img
                    src={selectedBooking.image || selectedBooking.conditionPhotos?.[0] || 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=400&q=80'}
                    alt={selectedBooking.listingTitle}
                    className="w-16 h-16 rounded-xl object-cover border border-idle-line shrink-0"
                  />
                  <div className="min-w-0 flex-1">
                    <span className="text-[10px] font-bold text-idle-gold uppercase tracking-wider block">
                      Rental Item Details
                    </span>
                    <h4 className="text-sm font-bold text-[#172d28] truncate">
                      {selectedBooking.listingTitle}
                    </h4>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-idle-muted mt-0.5">
                      <span>Lender: <strong className="text-[#172d28]">{selectedBooking.provider}</strong></span>
                      <span>•</span>
                      <span>Dates: <strong>{selectedBooking.dates || `${rentalDays} days`}</strong></span>
                      <span>•</span>
                      <span>Rate: <strong>${dailyRate}/{selectedBooking.unit || 'day'}</strong></span>
                    </div>
                  </div>
                </div>

                {/* 5. Payment and protection plan: The Tint.ai Toggle Card */}
                <div className={`p-5 rounded-2xl border transition-all ${
                  protectionPlanOn
                    ? 'bg-gradient-to-br from-[#fcf9f2] to-[#f9f5e8] border-idle-gold/70 shadow-md ring-1 ring-idle-gold/30'
                    : 'bg-white border-idle-line'
                }`}>
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 text-idle-gold" />
                        <h4 className="text-sm font-bold text-[#172d28]">
                          Add Third-Party Protection Plan
                        </h4>
                        <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-idle-gold/20 text-[#855f10]">
                          Optional
                        </span>
                      </div>
                      <p className="text-xs text-[#425d54] max-w-md">
                        Toggle on to add optional damage & theft coverage via <strong>Tint.ai</strong>. (Estimated $12.50/day)
                      </p>
                    </div>

                    {/* Pristine Standard iOS / Tailwind UI Toggle Switch */}
                    <div className="flex items-center gap-2.5 shrink-0">
                      <span className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full select-none transition-colors ${
                        protectionPlanOn
                          ? 'bg-idle-gold/20 text-[#855f10] border border-idle-gold/40'
                          : 'bg-gray-100 text-gray-500 border border-gray-200'
                      }`}>
                        {protectionPlanOn ? 'Active' : 'Off'}
                      </span>

                      <button
                        type="button"
                        role="switch"
                        aria-checked={protectionPlanOn}
                        onClick={() => setProtectionPlanOn(!protectionPlanOn)}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-idle-gold/50 ${
                          protectionPlanOn
                            ? 'bg-gradient-to-r from-amber-500 to-idle-gold shadow-sm'
                            : 'bg-gray-300 hover:bg-gray-400'
                        }`}
                      >
                        <span className="sr-only">Toggle Tint.ai Protection Plan</span>
                        <span
                          aria-hidden="true"
                          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out ${
                            protectionPlanOn ? 'translate-x-5' : 'translate-x-0'
                          }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Gold-bordered Insurance Summary Box (Displayed When Toggle is ON) */}
                  {protectionPlanOn ? (
                    <div className="mt-4 p-4 rounded-xl bg-white/90 border border-idle-gold/50 shadow-xs space-y-2.5 animate-in fade-in duration-200">
                      <div className="flex items-center justify-between border-b border-idle-gold/20 pb-2">
                        <div className="flex items-center gap-1.5">
                          <ShieldCheck className="w-4 h-4 text-emerald-600" />
                          <span className="text-xs font-extrabold text-[#1a3830]">
                            Insurance Summary
                          </span>
                        </div>
                        <span className="w-4 h-4 rounded-full bg-emerald-600 text-white flex items-center justify-center text-[10px]">
                          ✓
                        </span>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-[11px] text-idle-muted block">Coverage Provider:</span>
                          <strong className="text-[#172d28]">Tint.ai</strong>
                        </div>
                        <div>
                          <span className="text-[11px] text-idle-muted block">Premium Total:</span>
                          <strong className="text-[#004f46]">
                            ${insurancePremium.toFixed(2)}{' '}
                            <span className="text-[10px] font-normal text-idle-muted">
                              ({rentalDays} days @ $12.50/day)
                            </span>
                          </strong>
                        </div>
                        <div>
                          <span className="text-[11px] text-idle-muted block">Coverage Policy ID:</span>
                          <span className="font-mono font-bold text-[#1a3830]">{policyId}</span>
                        </div>
                        <div>
                          <span className="text-[11px] text-idle-muted block">Scope of Coverage:</span>
                          <span className="text-[#2b4d44] font-medium">Drops, spills, field transit & theft</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="mt-3 p-3 rounded-xl bg-gray-50 border border-gray-200 text-xs text-idle-muted flex items-center gap-2">
                      <AlertCircle className="w-4 h-4 text-gray-400 shrink-0" />
                      <span>
                        Standard rental payflow selected. Renter assumes primary liability under standard terms.
                      </span>
                    </div>
                  )}
                </div>

                {/* Stripe Connect Automated Payout Distribution Cards */}
                <div className="p-4 rounded-2xl bg-white border border-idle-line space-y-2.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#172d28] flex items-center gap-1.5">
                      <Split className="w-3.5 h-3.5 text-idle-emerald" />
                      <span>Stripe Connect Payout Distribution</span>
                    </span>
                    <span className="text-[10px] font-semibold text-idle-emerald bg-idle-mint px-2 py-0.5 rounded-full">
                      Automated Split
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 text-xs">
                    <div className="p-2.5 rounded-xl bg-[#f7faf8] border border-idle-line">
                      <span className="text-[10px] font-bold text-idle-muted uppercase block">
                        To Lender (97.5%)
                      </span>
                      <strong className="text-sm font-extrabold text-[#004f46]">
                        ${lenderPayout.toFixed(2)}
                      </strong>
                      <span className="text-[10px] text-idle-muted block truncate">
                        Dispatched to {selectedBooking.provider}
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#f7faf8] border border-idle-line">
                      <span className="text-[10px] font-bold text-idle-muted uppercase block">
                        To IDLE (2.5%)
                      </span>
                      <strong className="text-sm font-extrabold text-[#172d28]">
                        ${idleCommission.toFixed(2)}
                      </strong>
                      <span className="text-[10px] text-idle-muted block truncate">
                        Platform custody commission
                      </span>
                    </div>

                    <div className="p-2.5 rounded-xl bg-[#f7faf8] border border-idle-line col-span-2 sm:col-span-1">
                      <span className="text-[10px] font-bold text-idle-muted uppercase block">
                        To Underwriter (Tint.ai)
                      </span>
                      <strong className="text-sm font-extrabold text-[#855f10]">
                        ${insurancePremium.toFixed(2)}
                      </strong>
                      <span className="text-[10px] text-idle-muted block truncate">
                        {protectionPlanOn ? 'Policy underwriting fee' : 'No policy opted'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Checkout Breakdown & Complete Button (5 Cols) */}
              <div className="lg:col-span-5 space-y-4">
                <div className="p-5 rounded-2xl bg-white border border-idle-line shadow-xs space-y-4">
                  <div className="flex items-center justify-between border-b border-idle-line pb-3">
                    <h4 className="font-serif text-base font-bold text-[#172d28] flex items-center gap-1.5">
                      <Lock className="w-4 h-4 text-idle-emerald" />
                      <span>Order Summary</span>
                    </h4>
                    <span className="text-[11px] font-medium text-idle-muted">
                      Stripe Protected
                    </span>
                  </div>

                  {/* Pricing Breakdown Lines */}
                  <div className="space-y-2.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="text-idle-muted">
                        Item Subtotal ({rentalDays} days @ ${dailyRate}/day):
                      </span>
                      <strong className="text-[#172d28] font-bold">${itemSubtotal.toFixed(2)}</strong>
                    </div>

                    {/* Crucial Requirement 3: Separate Security Deposit Hold */}
                    <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/70 space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-amber-900 flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-700" />
                          <span>Security Deposit Hold:</span>
                        </span>
                        <strong className="text-amber-900 font-extrabold">${depositHold.toFixed(2)}</strong>
                      </div>
                      <p className="text-[10px] text-amber-800 leading-tight">
                        Held on card & released after return inspection. <strong>Not part of the amount charged today.</strong>
                      </p>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-idle-muted">IDLE Service Fee (2.5%):</span>
                      <strong className="text-[#172d28] font-bold">${idleCommission.toFixed(2)}</strong>
                    </div>

                    {protectionPlanOn && (
                      <div className="flex items-center justify-between text-idle-emerald font-semibold">
                        <span className="flex items-center gap-1">
                          <ShieldCheck className="w-3.5 h-3.5" />
                          <span>Tint.ai Protection Plan ({rentalDays} days):</span>
                        </span>
                        <strong>+${insurancePremium.toFixed(2)}</strong>
                      </div>
                    )}

                    <div className="h-px bg-idle-line my-2" />

                    {/* Total Amount Due */}
                    <div className="flex items-baseline justify-between pt-1">
                      <div>
                        <span className="text-xs font-bold uppercase tracking-wider text-[#172d28] block">
                          Total Amount Due
                        </span>
                        <span className="text-[10px] text-idle-muted">
                          (Item + 2.5% fee {protectionPlanOn ? '+ Tint.ai insurance' : ''})
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-extrabold text-[#004f46]">
                          ${totalAmountDue.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Checkout CTA Button (Matching Screenshot) */}
                  <button
                    type="button"
                    onClick={handleCompleteCheckout}
                    className="w-full gold-gradient-btn py-3.5 px-4 rounded-xl text-sm font-extrabold shadow-md flex items-center justify-center gap-2 cursor-pointer transition-transform hover:scale-[1.01] active:scale-[0.99]"
                  >
                    <Lock className="w-4 h-4 stroke-[2.5]" />
                    <span>COMPLETE SECURE CHECKOUT</span>
                  </button>

                  <div className="text-center space-y-1">
                    <span className="text-[10px] text-idle-muted block">
                      Guaranteed by Stripe Connect Escrow · 256-bit encryption
                    </span>
                    <span className="text-[10px] text-idle-emerald font-semibold block">
                      Single-use custody QR code will be generated immediately
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 1: DRAFT (RESERVATION INQUIRY & DATES COORDINATION) */}
        {currentStage === 'Draft' && (
          <div className="space-y-4 pt-2">
            <div className="p-5 rounded-2xl bg-[#f8faf9] border border-idle-line space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-idle-line pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-100 text-amber-800 flex items-center justify-center font-bold text-xs">
                    1
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#172d28]">
                      Stage 1 of 5 · Initial Draft & Reservation Request
                    </h3>
                    <p className="text-[11px] text-idle-muted">
                      Review schedule window, handoff location, and equipment inclusions before agreement generation
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-bold uppercase px-2.5 py-1 rounded-full bg-amber-50 text-amber-800 border border-amber-200">
                  Draft Reservation · In Negotiations
                </span>
              </div>

              {/* Reservation Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="p-3 bg-white rounded-xl border border-idle-line">
                  <span className="text-[10px] font-bold text-idle-muted uppercase block">
                    Requested Schedule
                  </span>
                  <strong className="text-xs text-[#172d28] block mt-0.5">
                    {selectedBooking.dates || `${rentalDays} Days Rental`}
                  </strong>
                  <span className="text-[10px] text-idle-muted">Rate: ${dailyRate}/{selectedBooking.unit || 'day'}</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-idle-line">
                  <span className="text-[10px] font-bold text-idle-muted uppercase block">
                    Preferred Handoff Depot
                  </span>
                  <strong className="text-xs text-[#172d28] block mt-0.5">
                    Frisco North IDLE Depot
                  </strong>
                  <span className="text-[10px] text-idle-muted">Verified exchange location</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-idle-line">
                  <span className="text-[10px] font-bold text-idle-muted uppercase block">
                    Lender Confirmation
                  </span>
                  <strong className="text-xs text-emerald-700 block mt-0.5">
                    {selectedBooking.provider} (Verified)
                  </strong>
                  <span className="text-[10px] text-idle-muted">Availability confirmed</span>
                </div>
              </div>

              {/* Pre-flight Checklist */}
              <div className="p-3.5 bg-white rounded-xl border border-idle-line space-y-2">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#172d28] block">
                  Draft Preparation Checklist
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#2b4d44]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-idle-emerald" />
                    <span>Lender availability & gear maintenance verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-idle-emerald" />
                    <span>Base rental rate pre-agreed (${itemSubtotal.toFixed(2)})</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-idle-emerald" />
                    <span>$100.00 standard deposit hold pre-authorized</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                    <span>Official binding contract ready to generate</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs text-idle-muted">
                Inquiry details confirmed with {selectedBooking.provider}. Proceed to generate formal digital contract.
              </span>
              <button
                type="button"
                onClick={() => {
                  advanceBookingStage(selectedBooking.id, 'Agreement preview');
                  setActiveStageTab('Agreement preview');
                  addToast('Official IDLE rental agreement generated for review.', 'info');
                }}
                className="emerald-gradient-btn px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Generate Official Digital Agreement &rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 2: AGREEMENT PREVIEW (BINDING LEGAL CONTRACT & DIGITAL SIGNATURES) */}
        {currentStage === 'Agreement preview' && (
          <div className="space-y-4 pt-2">
            <div className="p-5 rounded-2xl bg-white border border-idle-line shadow-2xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-idle-line pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-idle-emerald text-white flex items-center justify-center font-bold text-xs">
                    2
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#172d28]">
                      Stage 2 of 5 · Binding Contract & Digital Signatures
                    </h3>
                    <p className="text-[11px] text-idle-muted">
                      Formal legal contract binding custody terms, condition photos, deposit hold, and underwriting
                    </p>
                  </div>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-emerald-50 text-idle-emerald border border-emerald-200">
                  DOC ID: AGR-IDLE-2026-{selectedBooking.id.replace('BK-', '')}
                </span>
              </div>

              {/* Legal Contract Clauses */}
              <div className="p-4 rounded-xl bg-[#f8faf9] border border-idle-line space-y-2.5 text-xs text-[#2b4c44] leading-relaxed">
                <div className="font-bold text-[#172d28] border-b border-idle-line/60 pb-1.5 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-idle-emerald" />
                  <span>Binding Rental & Single-Use QR Custody Agreement Terms</span>
                </div>
                <p>
                  <strong>1. Custody Transfer Protocol:</strong> Physical equipment possession and risk of damage transfer only upon mutual mobile scanning of the single-use dynamic QR code at pickup.
                </p>
                <p>
                  <strong>2. Condition Photo Stamping:</strong> Renter and Lender agree to capture 4 timestamped digital condition photos before equipment release and upon final return.
                </p>
                <p>
                  <strong>3. Pre-Authorized Deposit Hold:</strong> A pre-authorized security deposit hold (${depositHold.toFixed(2)}) is placed on renter's card and automatically released after return inspection.
                </p>
                <p>
                  <strong>4. Tint.ai Underwriting & Arbitration:</strong> Equipment damage, theft, or late returns are resolved through expedited North Texas marketplace arbitration.
                </p>
              </div>

              {/* Dual Digital Signature Block */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 text-xs space-y-1">
                  <span className="text-[10px] font-bold text-emerald-800 uppercase block">
                    Lender Digital Signature
                  </span>
                  <div className="font-bold text-[#004f46] flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-idle-emerald" />
                    <span>Signed by {selectedBooking.provider}</span>
                  </div>
                  <span className="text-[10px] text-idle-muted block">
                    IDLE Verified Host · Identity Checked
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-amber-50/70 border border-amber-200 text-xs space-y-1">
                  <span className="text-[10px] font-bold text-amber-900 uppercase block">
                    Renter Digital Signature
                  </span>
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-amber-700" />
                    <span>Signed by {selectedBooking.renterName || 'Alex Morgan'}</span>
                  </div>
                  <span className="text-[10px] text-idle-muted block">
                    Pending final payment authorization
                  </span>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs text-idle-muted">
                Contract signed by both parties. Ready for payment, protection plan selection, and escrow hold.
              </span>
              <button
                type="button"
                onClick={() => {
                  advanceBookingStage(selectedBooking.id, 'Payment review');
                  setActiveStageTab('Payment review');
                  addToast('Agreement accepted! Proceeding to Payment & Protection Plan review.', 'success');
                }}
                className="gold-gradient-btn px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer"
              >
                <span>Sign Agreement & Proceed to Payment &rarr;</span>
              </button>
            </div>
          </div>
        )}

        {/* STAGE 4: HANDOFF PREVIEW (QR CODE & PICKUP INSPECTION) */}
        {currentStage === 'Handoff preview' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
            {/* Left: Dynamic QR Code Box */}
            <div className="md:col-span-5 bg-[#f4f9f6] p-5 rounded-2xl border border-idle-line flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-idle-line">
                <div className="w-36 h-36 bg-[#003d36] rounded-xl p-2.5 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-9 h-9 bg-white rounded-md p-1.5 flex items-center justify-center">
                      <div className="w-4 h-4 bg-[#003d36] rounded-sm" />
                    </div>
                    <div className="w-9 h-9 bg-white rounded-md p-1.5 flex items-center justify-center">
                      <div className="w-4 h-4 bg-[#003d36] rounded-sm" />
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <QrCode className="w-10 h-10 text-idle-gold stroke-[2]" />
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="w-9 h-9 bg-white rounded-md p-1.5 flex items-center justify-center">
                      <div className="w-4 h-4 bg-[#003d36] rounded-sm" />
                    </div>
                    <span className="text-[8px] font-mono font-bold text-idle-gold">IDLE</span>
                  </div>
                </div>
              </div>

              <div>
                <strong className="text-xs font-bold text-[#172d28] block">Single-Use Handoff Token</strong>
                <span className="text-[10px] font-mono text-idle-muted">{selectedBooking.qrToken}</span>
              </div>
              <p className="text-[11px] text-idle-muted max-w-xs">
                Scan with mobile camera when meeting lender in person to record custody transfer.
              </p>

              {protectionPlanOn && (
                <div className="w-full p-2.5 rounded-xl bg-amber-50 border border-idle-gold/40 text-left text-xs space-y-0.5">
                  <span className="text-[10px] font-bold text-[#855f10] uppercase flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5 text-idle-gold" />
                    <span>Tint.ai Policy Bound & Active</span>
                  </span>
                  <span className="text-[11px] font-mono text-idle-muted block">Policy ID: {policyId}</span>
                </div>
              )}
            </div>

            {/* Right: Security Details & Action Stepper */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-idle-emerald font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Stripe Deposit Pre-Authorization Active (${depositHold.toFixed(2)} hold)</span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-idle-line space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-idle-muted">Rental Fee ({rentalDays} days):</span>
                    <strong className="text-[#172d28]">${itemSubtotal.toFixed(2)}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-idle-muted">IDLE Service Fee (2.5%):</span>
                    <strong className="text-[#172d28]">${idleCommission.toFixed(2)}</strong>
                  </div>
                  {protectionPlanOn && (
                    <div className="flex justify-between text-idle-emerald">
                      <span>Tint.ai Protection Premium:</span>
                      <strong>${insurancePremium.toFixed(2)}</strong>
                    </div>
                  )}
                  <div className="h-px bg-idle-line my-1" />
                  <div className="flex justify-between text-xs font-bold">
                    <span>Amount Charged to Card:</span>
                    <span className="text-[#004f46]">${totalAmountDue.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-[11px] text-amber-700 font-semibold">
                    <span>Card Pre-Auth Hold (Deposit):</span>
                    <span>${depositHold.toFixed(2)}</span>
                  </div>
                </div>

                {/* Audit Timeline */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-idle-muted mb-2">
                    Audit Log History
                  </h4>
                  <div className="space-y-1.5 text-xs max-h-36 overflow-y-auto pr-1">
                    {selectedBooking.statusHistory?.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-idle-muted">
                        <Clock className="w-3.5 h-3.5 text-idle-emerald flex-shrink-0" />
                        <span className="text-[#1e3b33] font-medium">{h.message}</span>
                        <span className="text-[10px] text-idle-muted/70">({h.time})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Advance Stage to Completed */}
              <div className="pt-3 border-t border-idle-line flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => {
                    advanceBookingStage(selectedBooking.id, 'Completed');
                    setActiveStageTab('Completed');
                    addToast('Rental completed! Single-use QR verified and deposit hold released.', 'success');
                  }}
                  className="emerald-gradient-btn px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer"
                >
                  <span>Confirm Return & Release Deposit Hold &rarr;</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* STAGE 5: COMPLETED */}
        {currentStage === 'Completed' && (
          <div className="p-6 rounded-2xl bg-emerald-50/60 border border-idle-emerald/30 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-idle-emerald text-white flex items-center justify-center">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#0d2e29]">
                  Transaction Completed & Custody Released
                </h3>
                <p className="text-xs text-[#2b4c44]">
                  Equipment returned in full working order. The pre-authorized ${depositHold.toFixed(2)} security deposit hold has been released back to your card.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
              <div className="p-3 bg-white rounded-xl border border-idle-line">
                <span className="text-[10px] text-idle-muted block font-bold uppercase">Lender Payout</span>
                <strong className="text-sm font-bold text-[#004f46]">${lenderPayout.toFixed(2)}</strong>
                <span className="text-[10px] text-idle-muted block">Direct Stripe Connect transfer</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-idle-line">
                <span className="text-[10px] text-idle-muted block font-bold uppercase">IDLE Commission</span>
                <strong className="text-sm font-bold text-[#172d28]">${idleCommission.toFixed(2)}</strong>
                <span className="text-[10px] text-idle-muted block">2.5% platform fee settled</span>
              </div>
              <div className="p-3 bg-white rounded-xl border border-idle-line">
                <span className="text-[10px] text-idle-muted block font-bold uppercase">Deposit Status</span>
                <strong className="text-sm font-bold text-emerald-600">Released</strong>
                <span className="text-[10px] text-idle-muted block">$0 deducted (no damages)</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Transaction Features Overview */}
      <section className="glass-card p-6 rounded-3xl border border-idle-line space-y-2">
        <h3 className="font-serif text-base font-bold text-[#0d2e29] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-idle-emerald" />
          <span>What an IDLE Transaction Protects</span>
        </h3>
        <p className="text-xs text-idle-muted leading-relaxed">
          Binding digital rental agreements, Stripe credit card pre-authorizations, condition photos uploaded prior to release, timestamped dynamic QR custody handoffs, automated deposit refunds, and independent arbitration escalation if items are returned damaged.
        </p>
      </section>
    </div>
  );
};
