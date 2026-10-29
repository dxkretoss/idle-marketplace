import React from 'react';
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
  Sparkles
} from 'lucide-react';

export const ListingDetailModal = () => {
  const { 
    activeListing, 
    setActiveListing, 
    likes, 
    toggleLike, 
    createBooking, 
    setRoute, 
    addToast,
    isAuthenticated
  } = useApp();

  if (!activeListing) return null;

  const isLiked = likes.includes(activeListing.id);

  const handleStartBooking = () => {
    if (!isAuthenticated) {
      setActiveListing(null);
      addToast('Please sign in or create an account to book equipment or services', 'info');
      setRoute('auth');
      return;
    }
    const listingToBook = activeListing;
    setActiveListing(null);
    createBooking(listingToBook);
  };

  const handleOpenMessages = () => {
    if (!isAuthenticated) {
      setActiveListing(null);
      addToast('Please sign in to message providers and negotiate', 'info');
      setRoute('auth');
      return;
    }
    setActiveListing(null);
    setRoute('messages');
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
              className={`p-2 rounded-full transition-all ${
                isLiked ? 'text-red-500 bg-red-50' : 'text-idle-muted hover:bg-black/5'
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
              className="p-2 rounded-full text-idle-muted hover:text-[#172d28] hover:bg-black/5 transition-all ml-1"
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

          {/* Title & Price Header - Redesigned UI */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-1">
            <div className="space-y-1.5 max-w-xl">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#0d2e29] leading-tight">
                {activeListing.title}
              </h2>
              <div className="flex items-center gap-2 flex-wrap text-xs sm:text-sm text-idle-muted">
                <span>Offered by <strong className="text-[#172d28] font-semibold">{activeListing.owner}</strong></span>
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
                  / {activeListing.unit}
                </span>
              </div>
              {activeListing.deposit > 0 && (
                <div className="mt-1 flex items-center gap-1 text-[11px] font-semibold text-amber-900 bg-amber-50 border border-amber-200/60 px-2 py-0.5 rounded-md">
                  <span>${activeListing.deposit} deposit hold</span>
                </div>
              )}
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
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-idle-line hover:border-idle-emerald text-xs md:text-sm font-semibold text-[#172d28] hover:bg-idle-mint/50 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-idle-emerald" />
            <span>Message Provider</span>
          </button>

          <button
            onClick={handleStartBooking}
            className="gold-gradient-btn flex-1 max-w-sm flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold shadow-md"
          >
            <QrCode className="w-4 h-4 stroke-[2.2]" />
            <span>Book with QR Handoff</span>
          </button>
        </div>
      </div>
    </div>
  );
};
