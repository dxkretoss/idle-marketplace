import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  X,
  ShieldCheck,
  Sparkles,
  CheckCircle2,
  Star,
  MapPin,
  Clock,
  Play,
  MessageSquare,
  ArrowRight,
  ExternalLink,
  Package,
  Wrench
} from 'lucide-react';

export const ProviderProfileModal = () => {
  const {
    selectedProvider,
    setSelectedProvider,
    listings,
    setActiveListing,
    setActiveReel,
    reels,
    startMessageThread,
    addToast
  } = useApp();

  if (!selectedProvider) return null;

  // Find provider's listings in marketplace
  const providerName = selectedProvider.name || selectedProvider.author || selectedProvider.owner || '';
  const providerListings = listings.filter((l) => {
    const owner = l.owner || '';
    return (
      owner.toLowerCase().includes(providerName.toLowerCase()) ||
      providerName.toLowerCase().includes(owner.toLowerCase())
    );
  });

  // Find any active 24h reels by this provider
  const providerReel = reels.find((r) => {
    const author = r.author || '';
    return (
      author.toLowerCase().includes(providerName.toLowerCase()) ||
      providerName.toLowerCase().includes(author.toLowerCase())
    );
  });

  const handleOpenReel = () => {
    if (providerReel) {
      setSelectedProvider(null);
      setActiveReel(providerReel);
    } else {
      addToast('No active 24h reel found for this provider today.', 'info');
    }
  };

  const handleMessage = () => {
    const mockListing = providerListings[0] || {
      id: 999,
      owner: providerName,
      title: `${providerName} Consultation & Services`,
      image: selectedProvider.avatar || selectedProvider.image
    };
    setSelectedProvider(null);
    startMessageThread(mockListing);
  };

  const handleViewListing = (listing) => {
    setSelectedProvider(null);
    setActiveListing(listing);
  };

  const area = selectedProvider.area || 'Frisco, TX';
  const rating = selectedProvider.rating || 4.98;
  const reviewsCount = selectedProvider.reviewsCount || 42;
  const avatar = selectedProvider.avatar || selectedProvider.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={() => setSelectedProvider(null)}
    >
      <div
        className="relative w-full max-w-2xl max-h-[90vh] bg-[#faf9f5] rounded-3xl overflow-hidden shadow-2xl flex flex-col border border-idle-line"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Dedicated Modal Close Button in Top-Right Corner */}
        <button
          type="button"
          onClick={() => setSelectedProvider(null)}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 w-8 h-8 rounded-full bg-black/5 hover:bg-black/10 text-idle-muted hover:text-[#082f2c] flex items-center justify-center transition-all cursor-pointer z-10"
          aria-label="Close Profile"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Clean Top Header Bar */}
        <div className="relative p-5 sm:p-6 pb-4 border-b border-idle-line/70 bg-white flex flex-col sm:flex-row sm:items-center justify-between gap-4 shrink-0 pr-14 sm:pr-16">
          <div className="flex items-center gap-3.5 sm:gap-4 min-w-0">
            {/* Full Round Profile Picture */}
            <div className="relative shrink-0">
              <div className="w-16 h-16 sm:w-18 sm:h-18 rounded-full overflow-hidden border-2 border-idle-emerald/30 shadow-md bg-white">
                <img
                  src={avatar}
                  alt={providerName}
                  className="w-full h-full object-cover"
                />
              </div>
              {providerReel && (
                <button
                  type="button"
                  onClick={handleOpenReel}
                  className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-idle-gold text-[#082f2c] shadow-md hover:scale-110 transition-transform cursor-pointer border-2 border-white"
                  title="Watch 24-hr Reel"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                </button>
              )}
            </div>

            {/* Provider Details */}
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#082f2c] leading-tight truncate">
                  {providerName}
                </h2>
                <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-idle-mint text-[#004f46] border border-idle-emerald/20 text-[10px] font-bold shrink-0">
                  <ShieldCheck className="w-3 h-3 text-idle-emerald" />
                  <span>Verified Provider</span>
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs text-idle-muted mt-1">
                <span className="flex items-center gap-1 font-semibold text-[#004f46]">
                  <MapPin className="w-3.5 h-3.5 text-idle-gold" />
                  {area}
                </span>
                <span>·</span>
                <span>North Texas DFW</span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 shrink-0">
            {providerReel && (
              <button
                type="button"
                onClick={handleOpenReel}
                className="h-9 px-3.5 rounded-xl bg-idle-mint text-[#004f46] hover:bg-idle-mint/80 border border-idle-emerald/20 text-xs font-bold inline-flex items-center gap-1.5 whitespace-nowrap transition-all cursor-pointer shadow-xs"
              >
                <Play className="w-3.5 h-3.5 fill-current text-idle-gold shrink-0" />
                <span>24h Reel</span>
              </button>
            )}
            <button
              type="button"
              onClick={handleMessage}
              className="h-9 px-4 rounded-xl bg-[#004f46] hover:bg-[#003d36] text-white text-xs font-bold inline-flex items-center gap-1.5 whitespace-nowrap shadow-sm transition-all cursor-pointer"
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0" />
              <span>Message</span>
            </button>
          </div>
        </div>

        {/* Profile Card Body */}
        <div className="p-5 sm:p-6 overflow-y-auto no-scrollbar flex-1 space-y-5">
          {/* Verification Badges Row */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-300 text-xs font-bold">
              <ShieldCheck className="w-3.5 h-3.5 text-idle-emerald" />
              <span>ID Verified</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-900 border border-amber-300 text-xs font-bold">
              <Sparkles className="w-3.5 h-3.5 text-idle-gold" />
              <span>Monthly Top Provider</span>
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-50 text-teal-800 border border-teal-200 text-xs font-bold">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              <span>Insurance Verified</span>
            </span>
          </div>

          {/* Key Metrics Grid */}
          <div className="grid grid-cols-3 gap-2.5 sm:gap-3 p-3.5 rounded-2xl bg-white border border-[#dcebe0]">
            <div className="text-center">
              <div className="flex items-center justify-center gap-1 text-base font-bold text-[#004f46]">
                <Star className="w-4 h-4 fill-idle-gold text-idle-gold" />
                <span>{rating}</span>
              </div>
              <span className="text-[10px] text-idle-muted font-medium uppercase tracking-wider block mt-0.5">
                {reviewsCount} Reviews
              </span>
            </div>
            <div className="text-center border-x border-[#dcebe0]">
              <div className="text-base font-bold text-[#004f46]">50+</div>
              <span className="text-[10px] text-idle-muted font-medium uppercase tracking-wider block mt-0.5">
                QR Handoffs
              </span>
            </div>
            <div className="text-center">
              <div className="text-base font-bold text-emerald-700">100%</div>
              <span className="text-[10px] text-idle-muted font-medium uppercase tracking-wider block mt-0.5">
                On-Time Return
              </span>
            </div>
          </div>

          {/* Active 24-hr Reel Banner if available */}
          {providerReel && (
            <div
              onClick={handleOpenReel}
              className="p-3.5 rounded-2xl bg-gradient-to-r from-amber-50 to-[#fffdf3] border border-idle-gold/50 flex items-center justify-between cursor-pointer hover:border-idle-gold transition-all"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl overflow-hidden relative shrink-0 border border-idle-gold">
                  <img
                    src={providerReel.image}
                    alt={providerReel.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                    <Play className="w-4 h-4 text-white fill-white" />
                  </div>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-xs font-bold text-[#082f2c]">
                      {providerReel.title}
                    </strong>
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-idle-gold/20 text-idle-gold border border-idle-gold/30">
                      24h Live
                    </span>
                  </div>
                  <p className="text-[11px] text-idle-muted mt-0.5 line-clamp-1">
                    {providerReel.caption}
                  </p>
                </div>
              </div>
              <span className="text-xs font-bold text-idle-emerald shrink-0 flex items-center gap-1">
                <span>Watch</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          )}

          {/* Active Equipment Listings & Services Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-base sm:text-lg font-bold text-[#004f46] flex items-center gap-2">
                <Package className="w-4 h-4 text-idle-gold" />
                <span>Listings & Services</span>
              </h3>
              <span className="text-xs text-idle-muted font-medium">
                {providerListings.length} Active in DFW
              </span>
            </div>

            {providerListings.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {providerListings.map((listing) => (
                  <div
                    key={listing.id}
                    onClick={() => handleViewListing(listing)}
                    className="glass-card glass-card-hover p-3 rounded-2xl border border-[#dcebe0] flex items-center gap-3 cursor-pointer group transition-all"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-white shrink-0 border border-idle-line">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-idle-gold block">
                        {listing.category}
                      </span>
                      <h4 className="text-xs font-bold text-[#082f2c] truncate mt-0.5 group-hover:text-idle-emerald transition-colors">
                        {listing.title}
                      </h4>
                      <div className="flex items-center justify-between mt-1.5">
                        <span className="text-xs font-bold text-idle-emerald">
                          ${listing.price} <span className="text-[10px] text-idle-muted font-normal">/ {listing.unit || 'day'}</span>
                        </span>
                        <span className="text-[10px] text-[#004f46] font-semibold flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                          <span>Book</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="p-4 rounded-2xl bg-white border border-[#dcebe0] text-center text-xs text-idle-muted">
                No individual inventory items listed right now. Message provider directly for custom requests.
              </div>
            )}
          </div>

          {/* Verified Customer Reviews */}
          <div className="space-y-3 pt-2">
            <h3 className="font-serif text-base sm:text-lg font-bold text-[#004f46] flex items-center gap-2">
              <Star className="w-4 h-4 text-idle-gold fill-idle-gold" />
              <span>Verified Reviews</span>
            </h3>

            <div className="space-y-2.5">
              <div className="p-3.5 rounded-2xl bg-white border border-[#dcebe0] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-idle-mint text-idle-emerald flex items-center justify-center text-[10px] font-bold">
                      RM
                    </div>
                    <strong className="text-xs font-bold text-[#082f2c]">Rachel M.</strong>
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                      Photo Verified
                    </span>
                  </div>
                  <div className="flex text-idle-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-idle-muted leading-relaxed">
                  "Equipment was spotlessly maintained and pre-calibrated. The single-use QR custody check-in took less than a minute at pickup. Will definitely rent again!"
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#dcebe0] space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-full bg-idle-mint text-idle-emerald flex items-center justify-center text-[10px] font-bold">
                      DK
                    </div>
                    <strong className="text-xs font-bold text-[#082f2c]">David K.</strong>
                    <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.2 rounded bg-emerald-100 text-emerald-800">
                      Photo Verified
                    </span>
                  </div>
                  <div className="flex text-idle-gold">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-idle-muted leading-relaxed">
                  "Prompt communication and very professional work. Everything went smoothly from reservation to completion."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

