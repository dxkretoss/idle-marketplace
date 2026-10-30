import React, { useMemo, useState } from 'react';
import { useApp } from '../context/AppContext';
import { StoriesStrip } from '../components/reels/StoriesStrip';
import { ReelUploadModal } from '../components/modals/ReelUploadModal';
import { matchesReelCategory } from '../data/mockData';
import { 
  Play, 
  Plus, 
  Clock, 
  Film, 
  Sparkles, 
  ArrowRight, 
  RotateCcw,
  Check,
  X
} from 'lucide-react';

const SAMPLE_MEDIA = [
  'https://images.unsplash.com/photo-1746730921429-3a6489172f1b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1610477865545-37711c53144d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80'
];

export const ReelsView = () => {
  const { 
    reels, 
    setActiveReel, 
    plan, 
    setRoute, 
    reelsFilter, 
    setReelsFilter,
    user,
    listings,
    addReel,
    isAuthenticated,
    openAuth,
    addToast
  } = useApp();

  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  // Form states for inline upload
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState('Fashion');
  const [newCaption, setNewCaption] = useState('');
  const [linkedListingId, setLinkedListingId] = useState('');
  const [previewMedia, setPreviewMedia] = useState(SAMPLE_MEDIA[0]);
  const [isVideo, setIsVideo] = useState(false);
  const [consent, setConsent] = useState(false);

  // Check if paid member (any tier other than Free)
  const isPaid = plan !== 'Free';

  // Check if member has personalized interests saved
  const userInterests = user?.interests || [];
  const hasSpecificInterests = userInterests.length > 0 && !userInterests.includes('All');

  // Filter reels based on active story bubble selection
  const filteredReels = useMemo(() => {
    if (!reelsFilter || reelsFilter === 'All') return reels;
    if (reelsFilter === 'ForYou') {
      if (!hasSpecificInterests) return reels;
      return reels.filter(reel => userInterests.some(interest => matchesReelCategory(reel.category, interest)));
    }
    return reels.filter(reel => matchesReelCategory(reel.category, reelsFilter));
  }, [reels, reelsFilter, userInterests, hasSpecificInterests]);

  const scrollToUpload = () => {
    const el = document.getElementById('upload-reel');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const input = document.getElementById('reel-title-input');
      if (input) setTimeout(() => input.focus(), 400);
    } else {
      setUploadModalOpen(true);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 1500000) {
      addToast('This standalone demo supports media up to 1.5 MB.', 'error');
      return;
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'video/mp4', 'video/webm'];
    if (!validTypes.includes(file.type)) {
      addToast('Please select a JPG, PNG, WebP, MP4 or WebM file.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPreviewMedia(reader.result);
      setIsVideo(file.type.startsWith('video/'));
      addToast('Media loaded successfully!', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleReelSubmit = (e) => {
    e.preventDefault();

    if (!isAuthenticated) {
      addToast('Please sign in or create an account to publish a Reel', 'info');
      if (openAuth) openAuth('signin');
      else setRoute('auth');
      return;
    }

    if (!isPaid) {
      addToast('Studio or higher is required for Reel publishing.', 'info');
      setRoute('membership');
      return;
    }

    if (!consent) {
      addToast('Please confirm your right to post this media.', 'error');
      return;
    }

    if (!previewMedia) {
      addToast('Please select a photo or video.', 'error');
      return;
    }

    addReel({
      title: newTitle.trim(),
      category: newCategory,
      caption: newCaption.trim(),
      image: previewMedia,
      media: previewMedia,
      isVideo: isVideo,
      listingId: linkedListingId ? Number(linkedListingId) : null,
      area: user?.area || 'Frisco, TX'
    });

    // Reset form
    setNewTitle('');
    setNewCaption('');
    setLinkedListingId('');
    setConsent(false);

    // Scroll to top to see newly created reel in strip and feed
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
            Short-Form Marketplace Discovery
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#082f2c] mt-0.5">
            Nearby Reels.
          </h1>
          <p className="text-xs sm:text-sm text-idle-muted mt-1 max-w-xl">
            Watch local stylists, equipment operators, fitness coaches, and enterprise teams in action. All member Reels expire after 24 hours.
          </p>
        </div>

        <button
          type="button"
          onClick={scrollToUpload}
          className="gold-gradient-btn flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md flex-shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Create a Reel</span>
        </button>
      </div>

      {/* Stories Bubble Strip acting directly as the Category Filter */}
      <StoriesStrip 
        onOpenUpload={scrollToUpload} 
        title="Active 24h Stories" 
        activeCategory={reelsFilter}
        onSelectCategory={(cat) => setReelsFilter(cat)}
      />

      {/* Main Reels Grid Feed */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-idle-line pb-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="font-serif text-xl font-bold text-[#082f2c]">
                {reelsFilter === 'All' && 'Watch the Local Edit'}
                {reelsFilter !== 'All' && `${reelsFilter} Reels`}
              </h2>
              {reelsFilter !== 'All' && (
                <button
                  type="button"
                  onClick={() => setReelsFilter('All')}
                  className="text-xs font-semibold text-idle-emerald hover:underline flex items-center gap-1 cursor-pointer ml-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Show All</span>
                </button>
              )}
            </div>
            <p className="text-xs text-idle-muted mt-0.5">
              {reelsFilter === 'All' && 'Tap any story bubble above to filter categories, or tap any card below to play full clip.'}
              {reelsFilter === 'Fashion' && 'Only shopping, fashion outfits, and styling reveals in North Texas.'}
              {reelsFilter === 'Equipment' && 'Heavy machinery, power equipment, and contractor walkarounds.'}
              {reelsFilter !== 'All' && reelsFilter !== 'Fashion' && reelsFilter !== 'Equipment' && `Filtered to ${reelsFilter} stories. Next/Prev playback stays within this category.`}
            </p>
          </div>

          <div className="text-xs text-idle-muted">
            Showing <span className="font-bold text-[#082f2c]">{filteredReels.length}</span> active stories
          </div>
        </div>

        {/* Reels Grid Cards */}
        {filteredReels.length === 0 ? (
          <div className="p-12 text-center glass-card rounded-2xl border border-idle-line space-y-3">
            <Film className="w-10 h-10 text-idle-muted mx-auto opacity-50" />
            <h3 className="font-serif text-lg font-bold text-[#082f2c]">No active reels in this category right now</h3>
            <p className="text-xs text-idle-muted max-w-sm mx-auto">
              Local reels expire after 24 hours. Be the first to share an outfit, a workout, or a demo in this category today!
            </p>
            <button
              type="button"
              onClick={scrollToUpload}
              className="gold-gradient-btn px-4 py-2 rounded-xl text-xs font-bold shadow-xs cursor-pointer inline-flex items-center gap-1.5"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create a Reel</span>
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
            {filteredReels.map((reel) => {
              const hoursLeft = Math.max(1, Math.ceil((86400000 - (Date.now() - (reel.created || Date.now()))) / 3600000));

              return (
                <div
                  key={reel.id}
                  onClick={() => setActiveReel(reel)}
                  className="group relative aspect-[9/16] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer border border-idle-emerald/20 hover:border-idle-gold/60 bg-[#081e1a]"
                >
                  {/* Media */}
                  {reel.isVideo ? (
                    <video
                      src={reel.media || reel.image}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      muted
                      playsInline
                    />
                  ) : (
                    <img
                      src={reel.image || reel.media}
                      alt={reel.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  )}

                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/85" />

                  {/* Top Badges */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between text-[10px] text-white">
                    <span className="px-1.5 py-0.5 rounded bg-black/50 backdrop-blur-md font-semibold tracking-wide border border-white/10 truncate max-w-[70px]">
                      {reel.category}
                    </span>
                    <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-idle-emerald/70 backdrop-blur-md font-mono text-[9px] font-bold">
                      <Clock className="w-2.5 h-2.5" />
                      {hoursLeft}h
                    </span>
                  </div>

                  {/* Center Play Button Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-md border border-white/50 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <Play className="w-4 h-4 fill-white translate-x-0.5" />
                    </div>
                  </div>

                  {/* Bottom Info Bar */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 text-white space-y-1">
                    <div className="text-xs font-bold line-clamp-1 group-hover:text-idle-goldLight transition-colors">
                      {reel.title}
                    </div>
                    <div className="text-[10px] text-emerald-200/90 truncate flex items-center justify-between">
                      <span>{reel.author || 'Local Member'}</span>
                      <span className="text-[9px] opacity-75">{reel.area?.split(',')[0] || 'DFW'}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Complete Prototype Reel Upload Form Section (Matching media_1793360356632_236f75d6.jpg) */}
      <div id="upload-reel" className="bg-white border border-[#dce6df] rounded-2xl p-6 sm:p-8 space-y-6 shadow-sm">
        <div className="space-y-1">
          <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#9b782c]">
            24-HOUR PROMOTION
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#004f46]">
            Show what you're working on.
          </h2>
          <p className="text-xs sm:text-sm text-[#596e64]">
            Share an outfit, a workout, a before-and-after job, or enterprise project. The local demo only stores your post in this browser.
          </p>
        </div>

        {!isPaid ? (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-[#f8faf9] border border-[#dbe6df] rounded-2xl p-5">
            <div>
              <strong className="block text-sm font-bold text-[#004f46]">
                Publishing requires a paid membership.
              </strong>
              <p className="text-xs text-[#596e64] mt-0.5">
                Free accounts can watch. Studio, Studio Pro, Business and Enterprise can create promotional Reels.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setRoute('membership')}
              className="gold-gradient-btn px-5 py-2.5 rounded-xl font-bold text-xs shadow-sm cursor-pointer whitespace-nowrap"
            >
              Unlock posting
            </button>
          </div>
        ) : (
          <form onSubmit={handleReelSubmit} className="space-y-4 text-xs">
            {/* Row 1: Title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#004f46]">
                  Reel title
                </label>
                <input
                  id="reel-title-input"
                  type="text"
                  required
                  maxLength={80}
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="A new listing, a workout, a finished job…"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe6df] bg-[#fbfcfa] focus:bg-white focus:border-[#004f46] outline-none transition-all text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#004f46]">
                  Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe6df] bg-[#fbfcfa] focus:bg-white focus:border-[#004f46] outline-none transition-all text-xs cursor-pointer"
                >
                  {['Fashion', 'Fitness', 'Home services', 'Equipment', 'Creators', 'Enterprise', 'Events', 'Outdoor'].map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: Caption & Linked Marketplace Listing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#004f46]">
                  What are you showing?
                </label>
                <textarea
                  required
                  rows={3}
                  maxLength={300}
                  value={newCaption}
                  onChange={(e) => setNewCaption(e.target.value)}
                  placeholder="Tell people what makes this moment worth checking out"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe6df] bg-[#fbfcfa] focus:bg-white focus:border-[#004f46] outline-none transition-all text-xs resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#004f46]">
                  Link to your marketplace listing
                </label>
                <select
                  value={linkedListingId}
                  onChange={(e) => setLinkedListingId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe6df] bg-[#fbfcfa] focus:bg-white focus:border-[#004f46] outline-none transition-all text-xs cursor-pointer"
                >
                  <option value="">Reel only · no listing</option>
                  {listings.map(l => (
                    <option key={l.id} value={l.id}>{l.title}</option>
                  ))}
                </select>
                <p className="text-[11px] text-[#7a8d82]">
                  Optional: Link a verified rental item or service offer so viewers can book directly.
                </p>
              </div>
            </div>

            {/* Row 3: Photo or Short Video */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#004f46]">
                Photo or short video
              </label>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                  onChange={handleFileChange}
                  className="block w-full sm:w-auto text-xs text-[#596e64] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border file:border-[#dbe6df] file:text-xs file:font-bold file:bg-[#f1f8f2] file:text-[#004f46] hover:file:bg-[#e1f6f1] file:cursor-pointer cursor-pointer"
                />
                <span className="text-[11px] text-[#7a8d82]">
                  0 / 12 new Reels in the last 24h. Browser media limit 1.5 MB. No public upload.
                </span>
              </div>

              {/* Media Preview or Preset Selectors */}
              {previewMedia ? (
                <div className="flex items-center gap-3 pt-2">
                  <div className="relative w-36 h-24 rounded-xl overflow-hidden border-2 border-[#004f46] shadow-sm bg-black">
                    {isVideo ? (
                      <video src={previewMedia} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                    ) : (
                      <img src={previewMedia} alt="Preview" className="w-full h-full object-cover" />
                    )}
                    <button
                      type="button"
                      onClick={() => { setPreviewMedia(null); setIsVideo(false); }}
                      className="absolute top-1 right-1 bg-black/75 hover:bg-black text-white rounded-full p-1 text-[10px] cursor-pointer"
                      title="Remove media"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-[11px] text-[#596e64]">
                    <span className="font-bold text-[#004f46] block">{isVideo ? 'Video Clip Ready' : 'Photo Attached'}</span>
                    <span>Ready for 24-hour local broadcast</span>
                  </div>
                </div>
              ) : (
                <div className="pt-1">
                  <span className="text-[11px] text-[#7a8d82] block mb-1.5">
                    Or choose one of our demo clips:
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {SAMPLE_MEDIA.map((url, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => { setPreviewMedia(url); setIsVideo(false); }}
                        className="w-16 h-12 rounded-lg overflow-hidden border border-[#dbe6df] hover:border-[#004f46] shrink-0 cursor-pointer transition-transform hover:scale-105"
                      >
                        <img src={url} alt={`Preset ${i}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Row 4: Permission Checkbox */}
            <label className="flex items-start gap-2 pt-2 text-xs text-[#596e64] cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 rounded text-[#004f46] focus:ring-[#004f46]"
              />
              <span>
                I have permission to publish the media and identifiable people shown, and I understand this demo stores the post only in my browser.
              </span>
            </label>

            {/* Row 5: Submit CTA Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!consent}
                className="gold-gradient-btn px-6 py-3 rounded-xl font-bold text-xs shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-transform active:scale-98"
              >
                <span>Publish a 24-hour demo Reel →</span>
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Reel Upload Modal for outside triggers */}
      <ReelUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </div>
  );
};
