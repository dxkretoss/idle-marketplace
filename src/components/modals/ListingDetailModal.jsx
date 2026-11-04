import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  MapPin,
  Star,
  ShieldCheck,
  Calendar,
  Heart,
  MessageSquare,
  QrCode,
  Check,
  Share2,
  Clock,
  Sparkles,
  Package,
  Layers,
  ChevronRight,
  Plus
} from 'lucide-react';

export const ListingDetailModal = () => {
  const {
    activeListing,
    setActiveListing,
    setSelectedProvider,
    likes,
    toggleLike,
    createBooking,
    startMessageThread,
    setRoute,
    addToast,
    isAuthenticated
  } = useApp();

  // Tomorrow formatted for initial date picker
  const getTomorrowStr = () => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return d.toISOString().split('T')[0];
  };

  const [startDate, setStartDate] = useState(getTomorrowStr);
  const [rentalDays, setRentalDays] = useState(3);
  const [includeBundleKit, setIncludeBundleKit] = useState(true);

  if (!activeListing) return null;

  const isLiked = likes.includes(activeListing.id);
  const dailyPrice = activeListing.price || 50;
  const isRentalType = activeListing.type === 'rental' || !activeListing.type || activeListing.unit?.includes('day') || activeListing.unit?.includes('weekend');
  const bundleAddonPrice = includeBundleKit && isRentalType ? 25 : 0;
  const subtotal = (dailyPrice * rentalDays) + bundleAddonPrice;
  const idleFee = Number((subtotal * 0.025).toFixed(2)); // 2.5% platform fee
  const depositHold = activeListing.deposit || (dailyPrice > 100 ? 500 : 150);
  const totalAmount = Number((subtotal + idleFee).toFixed(2));

  const handleStartBooking = () => {
    const listingToBook = activeListing;
    setActiveListing(null);
    createBooking(listingToBook, {
      startDate,
      rentalDays,
      subtotal,
      deposit: depositHold,
      total: totalAmount,
      dates: `${startDate} (${rentalDays} day${rentalDays > 1 ? 's' : ''}${includeBundleKit ? ' · Bundle included' : ''})`
    });
  };

  const handleOpenMessages = () => {
    const listingToMessage = activeListing;
    setActiveListing(null);
    if (startMessageThread) {
      startMessageThread(listingToMessage);
    } else {
      setRoute('messages');
    }
  };

  const handleShare = () => {
    navigator.clipboard?.writeText?.(window.location.href);
    addToast('Listing link copied to clipboard!', 'info');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 md:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="glass-card bg-white max-w-3xl w-full max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl border border-idle-emerald/20 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Top Bar */}
        <div className="sticky top-0 z-10 glass-header px-5 py-3.5 flex items-center justify-between border-b border-idle-line">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-idle-mint text-idle-emerald">
              {activeListing.category}
            </span>
            <span className="text-[11px] font-medium text-idle-muted">
              IDLE Verified Listing
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => toggleLike(activeListing.id)}
              className={`p-2 rounded-full transition-all ${isLiked ? 'text-red-500 bg-red-50' : 'text-idle-muted hover:bg-black/5'
                }`}
              title={isLiked ? 'Remove favorite' : 'Save favorite'}
            >
              <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
            </button>
            <button
              onClick={handleShare}
              className="p-2 rounded-full text-idle-muted hover:bg-black/5 transition-all"
              title="Share listing"
            >
              <Share2 className="w-5 h-5" />
            </button>
            <button
              onClick={() => setActiveListing(null)}
              className="p-2 rounded-full text-idle-muted hover:text-[#172d28] hover:bg-black/5 transition-all ml-1 cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Content */}
        <div className="p-5 md:p-7 space-y-6">
          {/* Main Visual */}
          <div className="relative h-64 md:h-84 rounded-2xl overflow-hidden bg-emerald-950/5">
            <img
              src={activeListing.image}
              alt={activeListing.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-3 left-3 bg-[#002f2a]/85 backdrop-blur-md border border-white/20 rounded-xl px-3 py-1.5 text-white flex items-center gap-1.5 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-idle-gold" />
              <span>{activeListing.area} · North Texas</span>
            </div>
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md rounded-full px-3 py-1 text-xs font-bold text-idle-emerald shadow-md flex items-center gap-1">
              <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              <span>{activeListing.rating} ({activeListing.reviewsCount})</span>
            </div>
          </div>

          {/* Title & Price Header */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-1">
            <div className="space-y-1.5 max-w-xl">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0d2e29] leading-tight">
                {activeListing.title}
              </h2>
              <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm text-idle-muted">
                <span>Offered by <button type="button" onClick={() => { setActiveListing(null); setSelectedProvider({ name: activeListing.owner, area: activeListing.area, rating: activeListing.rating, reviewsCount: activeListing.reviewsCount }); }} className="text-[#004f46] hover:underline font-bold cursor-pointer">{activeListing.owner}</button></span>
                {activeListing.ownerVerified && (
                  <span className="inline-flex items-center gap-1 text-[11px] text-idle-emerald font-semibold bg-idle-mint px-2.5 py-0.5 rounded-full border border-idle-emerald/20">
                    <ShieldCheck className="w-3.5 h-3.5 text-idle-emerald" />
                    <span>Stripe Verified</span>
                  </span>
                )}
              </div>
            </div>

            {/* Clean Price Card */}
            <div className="flex flex-col items-start sm:items-end justify-center px-4 py-2.5 rounded-2xl bg-[#f8faf9] border border-idle-line shrink-0 shadow-2xs">
              <div className="flex items-baseline gap-1">
                <span className="text-2xl sm:text-3xl font-extrabold text-[#004f46]">
                  ${activeListing.price}
                </span>
                <span className="text-xs font-medium text-idle-muted">
                  / {activeListing.unit || 'day'}
                </span>
              </div>
              {activeListing.deposit > 0 && (
                <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-amber-900 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
                  <span>${activeListing.deposit} deposit hold</span>
                </div>
              )}
            </div>
          </div>

          {/* INTERACTIVE AVAILABILITY CALENDAR & DURATION SELECTOR */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#f9fbf9] border border-idle-emerald/25 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-idle-mint text-[#004f46] flex items-center justify-center font-bold">
                  <Calendar className="w-4 h-4 text-idle-emerald" />
                </div>
                <div>
                  <h3 className="text-xs sm:text-sm font-bold text-[#082f2c]">
                    Availability & Rental Schedule
                  </h3>
                  <span className="text-[11px] text-[#6c7d70]">
                    Select start date and duration for custody handoff
                  </span>
                </div>
              </div>

              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Available Today</span>
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
              {/* Pickup Date Picker */}
              <div>
                <label className="block text-xs font-bold text-[#004f46] mb-1">
                  Pickup / Start Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    value={startDate}
                    min={new Date().toISOString().split('T')[0]}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-idle-line bg-white text-xs font-semibold text-[#082f2c] outline-none focus:border-idle-emerald focus:ring-1 focus:ring-idle-emerald"
                  />
                </div>
              </div>

              {/* Rental Duration Options */}
              <div>
                <label className="block text-xs font-bold text-[#004f46] mb-1">
                  Duration ({rentalDays} {rentalDays === 1 ? 'Day' : 'Days'})
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {[1, 2, 3, 7].map((days) => (
                    <button
                      type="button"
                      key={days}
                      onClick={() => setRentalDays(days)}
                      className={`py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                        rentalDays === days
                          ? 'bg-[#004f46] text-white border-[#004f46] shadow-xs'
                          : 'bg-white text-[#455c52] border-idle-line hover:bg-emerald-50/50'
                      }`}
                    >
                      {days} {days === 1 ? 'Day' : days === 7 ? '1 Wk' : 'Days'}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Optional Bundle Add-on checkbox */}
            {isRentalType && (
              <div
                onClick={() => setIncludeBundleKit(!includeBundleKit)}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  includeBundleKit
                    ? 'bg-amber-50/60 border-amber-300/80 text-amber-950'
                    : 'bg-white border-idle-line text-idle-muted hover:border-idle-line/80'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                    includeBundleKit ? 'bg-amber-600 border-amber-600 text-white' : 'border-gray-300 bg-white'
                  }`}>
                    {includeBundleKit && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#082f2c] block">
                      Include Creator Essentials & Protection Rig Bundle
                    </span>
                    <span className="text-[11px] text-[#6c7d70]">
                      Spare batteries, weather-sealed travel case, and quick-swap mount
                    </span>
                  </div>
                </div>
                <span className="text-xs font-bold text-[#004f46] shrink-0">
                  +$25
                </span>
              </div>
            )}

            {/* Live Pricing Breakdown */}
            <div className="p-3 rounded-xl bg-white border border-[#dee8e1] space-y-1.5 text-xs">
              <div className="flex justify-between text-[#596e64]">
                <span>Rental Subtotal ({rentalDays} {rentalDays === 1 ? 'day' : 'days'} @ ${dailyPrice}/day)</span>
                <span className="font-semibold text-[#082f2c]">${dailyPrice * rentalDays}</span>
              </div>
              {includeBundleKit && isRentalType && (
                <div className="flex justify-between text-[#596e64]">
                  <span>Equipment Bundle Add-on</span>
                  <span className="font-semibold text-[#082f2c]">+$25.00</span>
                </div>
              )}
              <div className="flex justify-between text-[#596e64]">
                <span>IDLE Platform Service Fee (2.5%)</span>
                <span className="font-semibold text-[#082f2c]">${idleFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-amber-800 pt-1 border-t border-dashed border-[#dee8e1]">
                <span>Security Deposit Hold (Refundable)</span>
                <span className="font-bold">${depositHold}</span>
              </div>
              <div className="flex justify-between text-sm font-extrabold text-[#004f46] pt-1 border-t border-idle-emerald/20">
                <span>Total Amount Due</span>
                <span>${totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-idle-muted">Overview & Terms</h3>
            <p className="text-sm text-[#274039] leading-relaxed">
              {activeListing.desc}
            </p>
          </div>

          {/* Features / Highlights */}
          {activeListing.features && (
            <div className="space-y-2.5">
              <h3 className="text-sm font-bold uppercase tracking-wider text-idle-muted">What's Included</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeListing.features.map((feat, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs md:text-sm text-[#1b3831] bg-[#f9fbf9] p-2.5 rounded-xl border border-idle-line/60">
                    <Check className="w-4 h-4 text-idle-emerald flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Trust Guarantee Box */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-50 to-teal-50/50 border border-idle-emerald/20 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-idle-emerald flex-shrink-0 mt-0.5" />
            <div className="text-xs space-y-0.5">
              <strong className="text-idle-emerald block font-bold">IDLE QR Custody Protection</strong>
              <p className="text-[#32524a]">
                Custody handoff is authorized through a single-use dynamic QR code and condition photos. Deposit holds are released automatically upon return inspection.
              </p>
            </div>
          </div>
        </div>

        {/* Modal Action Footer */}
        <div className="sticky bottom-0 z-10 bg-white/95 backdrop-blur-md px-5 py-4 border-t border-idle-line flex items-center justify-between gap-3">
          <button
            onClick={handleOpenMessages}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-idle-line hover:border-idle-emerald text-xs md:text-sm font-semibold text-[#172d28] hover:bg-idle-mint/50 transition-all cursor-pointer"
          >
            <MessageSquare className="w-4 h-4 text-idle-emerald" />
            <span>Message Provider</span>
          </button>

          <button
            onClick={handleStartBooking}
            className="gold-gradient-btn flex-1 max-w-sm flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold shadow-md cursor-pointer hover:scale-[1.01] active:scale-[0.99] transition-transform"
          >
            <QrCode className="w-4 h-4 stroke-[2.2]" />
            <span>Book with QR Handoff (${totalAmount.toFixed(2)})</span>
          </button>
        </div>
      </div>
    </div>
  );
};
