import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import {
  Briefcase,
  Check,
  Clock,
  ShieldCheck,
  X,
  Star,
  ArrowRight,
  Shield,
  Calendar,
  AlertCircle
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
    listings,
    activeBooking,
    setActiveBooking,
    advanceBookingStage,
    updateBooking,
    setRoute,
    isAuthenticated,
    addToast
  } = useApp();

  // Selected booking for detailed modal view
  const [modalBooking, setModalBooking] = useState(null);
  const [bookingView, setBookingView] = useState('timeline'); // 'timeline' | 'confirm' | 'extension' | 'issue' | 'review'
  const [stageFilter, setStageFilter] = useState('all'); // 'all' | 'review' | 'handoff' | 'completed'

  // Tint.ai 3rd-party protection plan toggle state (preserved intact, defaulted to false while toggle is hidden)
  const [protectionPlanOn, setProtectionPlanOn] = useState(false);

  // Form states for stage confirmation, extension, issue, review
  const [proposedDate, setProposedDate] = useState('2026-10-31');
  const [proposedTime, setProposedTime] = useState('12:00');
  const [conditionNotes, setConditionNotes] = useState('');
  const [hasAcknowledged, setHasAcknowledged] = useState(false);
  const [changeRequest, setChangeRequest] = useState('');
  const [issuePath, setIssuePath] = useState('Direct negotiation');
  const [issueText, setIssueText] = useState('');
  const [issueRemedy, setIssueRemedy] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  // Local memory for filed cases & reviews in demo
  const [cases, setCases] = useState([]);
  const [reviews, setReviews] = useState([]);

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

  const handleOpenBooking = (b) => {
    setModalBooking(b);
    setBookingView('timeline');
    // Inactive while toggle is hidden per user request
    setProtectionPlanOn(false);
    setHasAcknowledged(false);
    if (setActiveBooking) setActiveBooking(b);
  };

  const handleCloseModal = () => {
    setModalBooking(null);
  };

  // Calculations for current active modal booking
  const currentStageIndex = modalBooking ? STAGES.indexOf(modalBooking.stage) : 0;
  const nextStageName = currentStageIndex < STAGES.length - 1 ? STAGES[currentStageIndex + 1] : 'Completed';
  const dailyRate = modalBooking?.price || 420;
  const rentalDays = modalBooking?.rentalDays || 1;
  const itemSubtotal = dailyRate * rentalDays;
  const depositHold = modalBooking?.deposit || 1000;
  const idleFee = Number((itemSubtotal * 0.025).toFixed(2)); // 2.5% platform fee
  const insurancePremium = protectionPlanOn ? Number((12.50 * rentalDays).toFixed(2)) : 0;
  const totalAmountDue = Number((itemSubtotal + idleFee + insurancePremium).toFixed(2));
  const policyId = modalBooking?.policyId || 'TN-420EPS-26';

  const handleAdvanceStage = () => {
    if (!modalBooking) return;
    if (currentStageIndex < STAGES.length - 1) {
      const nextStage = STAGES[currentStageIndex + 1];
      if (advanceBookingStage) {
        advanceBookingStage(modalBooking.id, nextStage);
      }
      if (updateBooking) {
        updateBooking(modalBooking.id, {
          stage: nextStage,
          total: totalAmountDue,
          protectionPlanEnabled: protectionPlanOn
        });
      }
      setModalBooking(prev => ({
        ...prev,
        stage: nextStage,
        total: totalAmountDue,
        protectionPlanEnabled: protectionPlanOn
      }));
      setBookingView('timeline');
      setHasAcknowledged(false);
      addToast(`Recorded ${nextStage} preview! ${protectionPlanOn ? 'Tint.ai insurance policy bound.' : ''}`, 'success');
    }
  };

  const handleSaveChange = (e) => {
    e.preventDefault();
    if (!changeRequest.trim()) return;
    addToast('Change request saved locally. Awaiting provider response.', 'info');
    setChangeRequest('');
    setBookingView('timeline');
  };

  const handleSaveIssue = (e) => {
    e.preventDefault();
    if (!issueText.trim() || !issueRemedy.trim()) return;
    setCases(prev => [
      ...prev,
      {
        bookingId: modalBooking.id,
        path: issuePath,
        status: 'Open review',
        description: issueText,
        remedy: issueRemedy,
        time: Date.now()
      }
    ]);
    addToast('Issue record created locally. Support notified.', 'warning');
    setIssueText('');
    setIssueRemedy('');
    setBookingView('timeline');
  };

  const handleSaveReview = (e) => {
    e.preventDefault();
    if (!reviewText.trim()) return;
    setReviews(prev => [
      ...prev,
      {
        bookingId: modalBooking.id,
        rating: reviewRating,
        text: reviewText,
        time: Date.now()
      }
    ]);
    addToast('Review submitted! Thank you for your feedback.', 'success');
    setReviewText('');
    setBookingView('timeline');
  };

  const resolveItemImage = (b) => {
    if (b.image) return b.image;
    if (b.conditionPhotos?.[0]) return b.conditionPhotos[0];
    const found = listings?.find(l => l.id === b.listingId || l.title?.toLowerCase() === (b.listingTitle || b.title)?.toLowerCase());
    if (found?.image) return found.image;
    return 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80';
  };

  const getStageMeta = (stage) => {
    switch (stage) {
      case 'Draft':
        return { step: 1, label: 'Draft Pending', bg: 'bg-slate-100 text-slate-700 border-slate-200', dot: 'bg-slate-400' };
      case 'Agreement preview':
        return { step: 2, label: 'Agreement Preview', bg: 'bg-blue-50 text-blue-800 border-blue-200', dot: 'bg-blue-500' };
      case 'Payment review':
        return { step: 3, label: 'Payment Review', bg: 'bg-amber-50 text-amber-800 border-amber-200', dot: 'bg-amber-500' };
      case 'Handoff preview':
        return { step: 4, label: 'Ready for QR Handoff', bg: 'bg-emerald-50 text-emerald-800 border-emerald-200', dot: 'bg-emerald-500' };
      case 'Completed':
        return { step: 5, label: 'Completed & Fulfilled', bg: 'bg-purple-50 text-purple-800 border-purple-200', dot: 'bg-purple-500' };
      default:
        return { step: 3, label: stage, bg: 'bg-amber-50 text-amber-800 border-amber-200', dot: 'bg-amber-500' };
    }
  };

  const inReviewCount = bookings.filter(b => b.stage === 'Payment review' || b.stage === 'Agreement preview').length;
  const handoffCount = bookings.filter(b => b.stage === 'Handoff preview').length;
  const completedCount = bookings.filter(b => b.stage === 'Completed').length;

  const filteredBookings = bookings.filter(b => {
    if (stageFilter === 'review') return b.stage === 'Payment review' || b.stage === 'Agreement preview';
    if (stageFilter === 'handoff') return b.stage === 'Handoff preview';
    if (stageFilter === 'completed') return b.stage === 'Completed';
    return true;
  });

  return (
    <div className="space-y-6 pb-16">
      {/* Page Heading matching Prototype & User Screenshot */}
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#082f2c] tracking-tight">
          Bookings & transaction records.
        </h1>
        <p className="text-xs sm:text-sm text-[#6c7d70] mt-1.5 leading-relaxed">
          Illustrative booking stages. No payment holds, charges, QR authorization or real agreements occur.
        </p>
      </div>

      {/* Top Usage & Protection Overview Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white border border-[#dce8df] rounded-2xl p-4 flex flex-col gap-1 shadow-2xs">
          <strong className="text-xl sm:text-2xl font-bold text-[#004f46]">{bookings.length}</strong>
          <span className="text-xs text-[#6c7c73]">Total Records</span>
        </div>
        <div className="bg-white border border-[#dce8df] rounded-2xl p-4 flex flex-col gap-1 shadow-2xs">
          <strong className="text-xl sm:text-2xl font-bold text-amber-700">{inReviewCount}</strong>
          <span className="text-xs text-[#6c7c73]">Needs Review</span>
        </div>
        <div className="bg-white border border-[#dce8df] rounded-2xl p-4 flex flex-col gap-1 shadow-2xs">
          <strong className="text-xl sm:text-2xl font-bold text-emerald-700">{handoffCount}</strong>
          <span className="text-xs text-[#6c7c73]">Ready for Handoff</span>
        </div>
        <div className="bg-white border border-[#dce8df] rounded-2xl p-4 flex flex-col gap-1 shadow-2xs">
          <strong className="text-xl sm:text-2xl font-bold text-[#004f46]">100%</strong>
          <span className="text-xs text-[#6c7c73]">🛡️ Tint.ai Protected</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button
          type="button"
          onClick={() => setStageFilter('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            stageFilter === 'all'
              ? 'bg-[#004f46] text-white shadow-2xs'
              : 'bg-white border border-[#dce8df] text-[#596e64] hover:bg-[#f4f8f6]'
          }`}
        >
          All Records ({bookings.length})
        </button>
        <button
          type="button"
          onClick={() => setStageFilter('review')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            stageFilter === 'review'
              ? 'bg-[#004f46] text-white shadow-2xs'
              : 'bg-white border border-[#dce8df] text-[#596e64] hover:bg-[#f4f8f6]'
          }`}
        >
          Needs Review ({inReviewCount})
        </button>
        <button
          type="button"
          onClick={() => setStageFilter('handoff')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            stageFilter === 'handoff'
              ? 'bg-[#004f46] text-white shadow-2xs'
              : 'bg-white border border-[#dce8df] text-[#596e64] hover:bg-[#f4f8f6]'
          }`}
        >
          Ready for Handoff ({handoffCount})
        </button>
        <button
          type="button"
          onClick={() => setStageFilter('completed')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-colors whitespace-nowrap cursor-pointer ${
            stageFilter === 'completed'
              ? 'bg-[#004f46] text-white shadow-2xs'
              : 'bg-white border border-[#dce8df] text-[#596e64] hover:bg-[#f4f8f6]'
          }`}
        >
          Completed ({completedCount})
        </button>
      </div>

      {/* Rich Illustrated Bookings Cards List */}
      {filteredBookings.length > 0 ? (
        <div className="space-y-3.5">
          {filteredBookings.map((b) => {
            const title = b.listingTitle || b.title || 'Listing item';
            const dateStr = b.dates || (b.created ? new Date(b.created).toLocaleDateString() : '10/31/2026');
            const stage = b.stage || 'Draft';
            const stageMeta = getStageMeta(stage);
            const itemImg = resolveItemImage(b);
            const providerName = b.provider || 'Verified Host';

            return (
              <article
                key={b.id}
                className="bg-white border border-[#dce8df] hover:border-[#b4d1c0] rounded-2xl p-4 sm:p-5 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-2xs transition-all"
              >
                {/* Left Side: Thumbnail + Metadata */}
                <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 w-full md:w-auto">
                  {/* Picture Thumbnail */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden shrink-0 border border-[#dee8e1] shadow-2xs bg-[#f4f8f6]">
                    <img 
                      src={itemImg} 
                      alt={title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
                    />
                  </div>

                  {/* Metadata */}
                  <div className="space-y-1 min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#9b782c] bg-amber-50/80 px-2 py-0.5 rounded-md border border-amber-200/50">
                        {b.id}
                      </span>
                      <span className="text-[11px] text-[#718278]">
                        {providerName}
                      </span>
                    </div>

                    <h3 className="font-bold text-[#0e2e28] text-base sm:text-lg leading-snug line-clamp-1">
                      {title}
                    </h3>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-[#596e64] pt-0.5">
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar className="w-3.5 h-3.5 text-[#004f46]" />
                        <span>{dateStr}</span>
                      </span>

                      <span className="flex items-center gap-1 text-[11px] font-semibold text-[#004f46] bg-[#edf7f3] px-2 py-0.5 rounded-full border border-[#cbe4d7]">
                        <ShieldCheck className="w-3 h-3 text-[#004f46]" />
                        <span>Tint.ai Protected</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Right Side: Status Progress + Price + CTA */}
                <div className="flex items-center justify-between md:justify-end gap-4 sm:gap-6 w-full md:w-auto pt-3 md:pt-0 border-t md:border-t-0 border-[#f0f4f1]">
                  {/* Status Badge & Step Indicator */}
                  <div className="space-y-1 text-left md:text-right">
                    <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${stageMeta.bg}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${stageMeta.dot}`} />
                      <span>{stageMeta.label}</span>
                    </div>
                    <div className="text-[11px] text-[#718278] block">
                      Step {stageMeta.step} of 5
                    </div>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <div className="font-bold text-[#004f46] text-lg sm:text-xl leading-none">
                      ${b.price}
                    </div>
                    <span className="text-[10px] text-[#718278]">
                      {b.unit ? `per ${b.unit}` : 'total'}
                    </span>
                  </div>

                  {/* Open Button */}
                  <button
                    type="button"
                    onClick={() => handleOpenBooking(b)}
                    className="px-4 py-2.5 rounded-xl border border-[#004f46] bg-white text-[#004f46] hover:bg-[#004f46] hover:text-white font-bold text-xs shadow-2xs transition-all cursor-pointer whitespace-nowrap active:scale-98"
                  >
                    Open →
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="glass-card p-12 text-center rounded-3xl space-y-3 bg-white border border-[#dee8e1]">
          <Briefcase className="w-12 h-12 text-idle-muted mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#172d28]">No records in this filter</h3>
          <p className="text-xs text-idle-muted max-w-sm mx-auto">
            Switch filter or explore the marketplace to start a booking.
          </p>
          <button
            onClick={() => setStageFilter('all')}
            className="emerald-gradient-btn px-4 py-2 rounded-xl text-xs font-bold cursor-pointer"
          >
            Show all bookings
          </button>
        </div>
      )}

      {/* What an IDLE transaction will support Panel matching Prototype */}
      <section className="section">
        <div className="p-5 rounded-2xl bg-[#f5f8f6] border border-[#dce7e0] text-[#334d42] space-y-1">
          <strong className="block text-sm font-bold text-[#004f46]">
            What an IDLE transaction will support
          </strong>
          <p className="text-xs text-[#60766a] leading-relaxed">
            Offers, acceptance records, condition photos, agreed timing, fee approval, QR handoffs, completion, reviews, issue evidence and independent referral. This preview simulates transitions and does not authorize any funds or provider actions.
          </p>
        </div>
      </section>

      {/* Transaction / Booking Detail Modal Dialog matching Prototype */}
      {modalBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="booking-dialog animate-in zoom-in-95 duration-150">
            {/* Close button */}
            <button
              type="button"
              onClick={handleCloseModal}
              className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
              aria-label="Close transaction"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-[10px] font-extrabold uppercase tracking-widest text-idle-gold block">
              IDLE transaction center · local preview
            </span>

            {/* Header */}
            <div className="booking-header">
              <div>
                <h2>{modalBooking.listingTitle || modalBooking.title || 'Listing Item'}</h2>
                <p>
                  Listed amount: <strong>${modalBooking.price}</strong> · {modalBooking.provider || modalBooking.owner || 'Northline Operations'}
                </p>
              </div>
              <span className="status demo">
                {modalBooking.stage}
              </span>
            </div>

            {/* Action Navigation Buttons */}
            <div className="booking-actions">
              <button
                type="button"
                onClick={() => setBookingView('timeline')}
                className={`btn ${bookingView === 'timeline' ? 'bg-[#004f46] text-white' : 'border border-[#cadbd2] text-[#004f46] hover:bg-gray-50'}`}
              >
                Timeline
              </button>
              {currentStageIndex < 4 && (
                <button
                  type="button"
                  onClick={() => setBookingView('extension')}
                  className={`btn ${bookingView === 'extension' ? 'bg-[#004f46] text-white' : 'border border-[#cadbd2] text-[#004f46] hover:bg-gray-50'}`}
                >
                  Request a change
                </button>
              )}
              <button
                type="button"
                onClick={() => setBookingView('issue')}
                className={`btn ${bookingView === 'issue' ? 'bg-[#004f46] text-white' : 'border border-[#cadbd2] text-[#004f46] hover:bg-gray-50'}`}
              >
                Report issue
              </button>
              {currentStageIndex === 4 && (
                <button
                  type="button"
                  onClick={() => setBookingView('review')}
                  className={`btn ${bookingView === 'review' ? 'gold-gradient-btn' : 'border border-[#cadbd2] text-[#004f46] hover:bg-gray-50'}`}
                >
                  Leave a review
                </button>
              )}
            </div>

            {/* Pane 1: TIMELINE VIEW */}
            {bookingView === 'timeline' && (
              <div className="space-y-4">
                <div className="booking-timeline">
                  {STAGES.map((step, idx) => {
                    const isDone = idx <= currentStageIndex;
                    const isCurrent = idx === currentStageIndex;
                    return (
                      <div key={step} className={`booking-step ${isDone ? 'done' : ''}`}>
                        <span>
                          {idx < currentStageIndex ? (
                            <Check className="w-4 h-4 stroke-[3]" />
                          ) : isCurrent ? (
                            <Clock className="w-4 h-4" />
                          ) : (
                            idx + 1
                          )}
                        </span>
                        <div>
                          <strong>{step}</strong>
                          <small>
                            {isCurrent ? 'Current stage' : idx < currentStageIndex ? 'Previewed' : 'Not yet reached'}
                          </small>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="booking-notice">
                  Every stage is a local demonstration. It does not create a legally binding agreement, capture a payment, issue a scannable QR code or contact the other participant.
                </div>

                {currentStageIndex < 4 ? (
                  <button
                    type="button"
                    onClick={() => setBookingView('confirm')}
                    className="gold-gradient-btn w-full py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md cursor-pointer"
                  >
                    Review {STAGES[currentStageIndex + 1]} →
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => setBookingView('review')}
                    className="gold-gradient-btn w-full py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md cursor-pointer"
                  >
                    Leave demo review →
                  </button>
                )}
              </div>
            )}

            {/* Pane 2: CONFIRM / NEXT STAGE REVIEW */}
            {bookingView === 'confirm' && (
              <div className="space-y-4">
                <h3 className="booking-subtitle">{nextStageName}</h3>

                {/* Stage 0 -> 1: Proposed Date & Time */}
                {currentStageIndex === 0 && (
                  <div className="space-y-3">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="text-xs font-bold text-[#0e2e28] block mb-1">Proposed date</label>
                        <input
                          type="date"
                          value={proposedDate}
                          onChange={(e) => setProposedDate(e.target.value)}
                          className="w-full px-3 py-2 border border-[#cadbd2] rounded-xl text-xs outline-none focus:border-idle-emerald"
                          required
                        />
                      </div>
                      <div>
                        <label className="text-xs font-bold text-[#0e2e28] block mb-1">Proposed time</label>
                        <input
                          type="time"
                          value={proposedTime}
                          onChange={(e) => setProposedTime(e.target.value)}
                          className="w-full px-3 py-2 border border-[#cadbd2] rounded-xl text-xs outline-none focus:border-idle-emerald"
                          required
                        />
                      </div>
                    </div>
                    <p className="text-xs text-[#60766a] leading-relaxed">
                      Preview parties: <strong>Alex Morgan</strong> and <strong>{modalBooking.provider || 'Provider'}</strong>. Item or service: <strong>{modalBooking.listingTitle || modalBooking.title}</strong>. The next step creates a versioned example agreement snapshot.
                    </p>
                  </div>
                )}

                {/* Stage 1 -> 2: Example Agreement Snapshot */}
                {currentStageIndex === 1 && (
                  <div className="contract-sheet">
                    <strong>Example agreement • Version 1</strong>
                    <p><b>Parties:</b> Alex Morgan / {modalBooking.provider || 'Provider'}</p>
                    <p><b>Scope:</b> {modalBooking.listingTitle || modalBooking.title}</p>
                    <p><b>Price:</b> ${modalBooking.price} per {modalBooking.unit || 'day'}</p>
                    <p><b>Date:</b> {proposedDate || modalBooking.dates || '10/31/2026'} {proposedTime}</p>
                    <p><b>Cancellation and condition terms:</b> Must be accepted from actual final terms when implemented.</p>
                  </div>
                )}

                {/* Stage 2 -> 3: Payment Review WITH PRESERVED 3RD PARTY INSURANCE TOGGLE */}
                {currentStageIndex === 2 && (
                  <div className="contract-sheet space-y-1">
                    <strong>Payment review • example only</strong>
                    <div className="receipt-row">
                      <span>Listed base price</span>
                      <b>${modalBooking.price}</b>
                    </div>
                    <div className="receipt-row">
                      <span>Security authorization</span>
                      <b>${depositHold} hold (pre-auth)</b>
                    </div>
                    <div className="receipt-row">
                      <span>Platform processing costs</span>
                      <b>${idleFee.toFixed(2)} (2.5% fee)</b>
                    </div>

                    {/* 3RD PARTY TINT.AI INSURANCE TOGGLE (Hidden per user request, preserved intact) */}
                    {false && (
                      <>
                        <div className="receipt-row py-3">
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-[#004f46]">Tint.ai 3rd-Party Damage Protection</span>
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-300/60">
                                Optional Policy
                              </span>
                            </div>
                            <small className="text-idle-muted text-[11px] block mt-0.5">
                              $12.50/day comprehensive equipment damage protection · Micro-Policy: {policyId}
                            </small>
                          </div>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={protectionPlanOn}
                              onChange={(e) => setProtectionPlanOn(e.target.checked)}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#004f46]"></div>
                          </label>
                        </div>

                        {protectionPlanOn && (
                          <div className="bg-amber-50/60 p-2.5 rounded-xl border border-amber-200/60">
                            <span className="text-amber-900 font-bold">
                              Insurance Premium ({rentalDays} {rentalDays === 1 ? 'day' : 'days'} @ $12.50/day):
                            </span>
                            <b className="text-amber-900">+${insurancePremium.toFixed(2)}</b>
                          </div>
                        )}
                      </>
                    )}

                    <div className="receipt-row pt-2 text-sm font-extrabold border-t-2 border-[#004f46]">
                      <span>Actual amount charged</span>
                      <span className="text-lg text-[#004f46]">${totalAmountDue.toFixed(2)}</span>
                    </div>
                    <p className="text-[11px] text-[#718278] pt-2">
                      Deposit holds are neither guaranteed nor escrow. A production checkout requires explicit payer authorization and actual processor confirmation.
                    </p>
                  </div>
                )}

                {/* Stage 3 -> 4: Handoff Preview */}
                {currentStageIndex === 3 && (
                  <div className="contract-sheet space-y-3">
                    <strong>Handoff / completion preview</strong>
                    <div className="handoff-token">
                      {modalBooking.qrToken || `IDLE-DEMO-${String(modalBooking.id).slice(-6)}`}
                    </div>
                    <p className="text-xs text-[#526a5d]">
                      This is a reference token, not a real QR credential. To confirm a real handoff, both parties must record custody and condition, supported by actual authenticated events.
                    </p>
                    <div>
                      <label className="text-xs font-bold text-[#0e2e28] block mb-1">
                        Item condition or job completion notes
                      </label>
                      <textarea
                        value={conditionNotes}
                        onChange={(e) => setConditionNotes(e.target.value)}
                        className="w-full px-3 py-2 border border-[#cadbd2] rounded-xl text-xs outline-none focus:border-idle-emerald min-h-[70px]"
                        placeholder="Describe pickup, handoff or completed work"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#0e2e28] block mb-1">
                        Optional evidence photo (small local demo)
                      </label>
                      <input
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        className="text-xs text-idle-muted file:mr-2 file:py-1 file:px-3 file:rounded-xl file:border file:border-[#cadbd2] file:text-xs file:font-semibold file:bg-white hover:file:bg-gray-50 cursor-pointer"
                      />
                    </div>
                  </div>
                )}

                {/* Demonstration acknowledgement */}
                <label className="flex items-start gap-2.5 text-xs text-[#2b4b3e] cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={hasAcknowledged}
                    onChange={(e) => setHasAcknowledged(e.target.checked)}
                    className="mt-0.5 rounded text-idle-emerald focus:ring-idle-emerald cursor-pointer"
                    required
                  />
                  <span>I understand this is a demonstration; no agreement, charge, handoff or provider confirmation occurs.</span>
                </label>

                {/* Action buttons */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    type="button"
                    disabled={!hasAcknowledged}
                    onClick={handleAdvanceStage}
                    className="gold-gradient-btn px-5 py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Record demo step →
                  </button>
                  <button
                    type="button"
                    onClick={() => setBookingView('timeline')}
                    className="px-4 py-2.5 rounded-xl border border-[#cadbd2] text-[#004f46] hover:bg-gray-50 font-bold text-xs cursor-pointer"
                  >
                    Back
                  </button>
                </div>
              </div>
            )}

            {/* Pane 3: EXTENSION / REQUEST A CHANGE */}
            {bookingView === 'extension' && (
              <form onSubmit={handleSaveChange} className="space-y-4">
                <h3 className="booking-subtitle">Propose a change</h3>
                <p className="text-xs text-[#60766a]">
                  Extensions and changes must be re-approved by the parties. This form saves a local request only.
                </p>
                <div>
                  <label className="text-xs font-bold text-[#0e2e28] block mb-1">Requested modification</label>
                  <textarea
                    value={changeRequest}
                    onChange={(e) => setChangeRequest(e.target.value)}
                    className="w-full px-3 py-2 border border-[#cadbd2] rounded-xl text-xs outline-none focus:border-idle-emerald min-h-[90px]"
                    placeholder="Extend through Friday, change pickup place, update scope…"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="gold-gradient-btn px-5 py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Save proposed change
                </button>
              </form>
            )}

            {/* Pane 4: REPORT ISSUE */}
            {bookingView === 'issue' && (
              <form onSubmit={handleSaveIssue} className="space-y-4">
                <h3 className="booking-subtitle">Create an issue record</h3>
                <p className="text-xs text-[#60766a]">
                  Describe the concern and proposed remedy. IDLE documents communications; independent mediators or arbitrators act under their own agreements.
                </p>
                <div>
                  <label className="text-xs font-bold text-[#0e2e28] block mb-1">Preferred path</label>
                  <select
                    value={issuePath}
                    onChange={(e) => setIssuePath(e.target.value)}
                    className="w-full px-3 py-2 border border-[#cadbd2] rounded-xl text-xs outline-none focus:border-idle-emerald"
                  >
                    <option value="Direct negotiation">Discuss with the other party</option>
                    <option value="Independent referral inquiry">Explore independent remote mediation / arbitration</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0e2e28] block mb-1">What happened?</label>
                  <textarea
                    value={issueText}
                    onChange={(e) => setIssueText(e.target.value)}
                    className="w-full px-3 py-2 border border-[#cadbd2] rounded-xl text-xs outline-none focus:border-idle-emerald min-h-[80px]"
                    placeholder="Describe the disputed facts and relevant evidence"
                    required
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-[#0e2e28] block mb-1">Requested resolution</label>
                  <input
                    type="text"
                    value={issueRemedy}
                    onChange={(e) => setIssueRemedy(e.target.value)}
                    className="w-full px-3 py-2 border border-[#cadbd2] rounded-xl text-xs outline-none focus:border-idle-emerald"
                    placeholder="Return item, propose refund, repair costs…"
                    required
                  />
                </div>
                <label className="flex items-start gap-2.5 text-xs text-[#2b4b3e] cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-0.5 rounded text-idle-emerald focus:ring-idle-emerald cursor-pointer"
                  />
                  <span>I understand this does not automatically contact another party, freeze money or send evidence to a third party.</span>
                </label>
                <button
                  type="submit"
                  className="gold-gradient-btn px-5 py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer"
                >
                  Save issue record
                </button>

                {cases.filter(c => c.bookingId === modalBooking.id).map((c, i) => (
                  <div key={i} className="subtle-box">
                    <strong>{c.path}</strong> · {c.status}
                    <p className="text-xs mt-1">{c.description}</p>
                    <small className="text-idle-muted block mt-1">Requested: {c.remedy}</small>
                  </div>
                ))}
              </form>
            )}

            {/* Pane 5: LEAVE REVIEW */}
            {bookingView === 'review' && (
              <form onSubmit={handleSaveReview} className="space-y-4">
                <h3 className="booking-subtitle">Review your experience</h3>
                {currentStageIndex !== 4 ? (
                  <p className="text-xs text-[#60766a]">
                    Reviews become eligible after the completion stage.
                  </p>
                ) : (
                  <>
                    <div>
                      <label className="text-xs font-bold text-[#0e2e28] block mb-1">Your rating</label>
                      <select
                        value={reviewRating}
                        onChange={(e) => setReviewRating(Number(e.target.value))}
                        className="w-full px-3 py-2 border border-[#cadbd2] rounded-xl text-xs outline-none focus:border-idle-emerald"
                      >
                        <option value={5}>5 stars</option>
                        <option value={4}>4 stars</option>
                        <option value={3}>3 stars</option>
                        <option value={2}>2 stars</option>
                        <option value={1}>1 star</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-[#0e2e28] block mb-1">Review text</label>
                      <textarea
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="w-full px-3 py-2 border border-[#cadbd2] rounded-xl text-xs outline-none focus:border-idle-emerald min-h-[80px]"
                        placeholder="How did the rental or service go?"
                        required
                      />
                    </div>
                    <button
                      type="submit"
                      className="gold-gradient-btn px-5 py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer"
                    >
                      Save demo review
                    </button>
                  </>
                )}

                {reviews.filter(r => r.bookingId === modalBooking.id).map((r, i) => (
                  <div key={i} className="subtle-box">
                    ★ {r.rating}/5 · {r.text}
                  </div>
                ))}
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
