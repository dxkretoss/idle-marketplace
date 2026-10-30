import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Film, Sparkles } from 'lucide-react';

const SAMPLE_MEDIA = [
  'https://images.unsplash.com/photo-1746730921429-3a6489172f1b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1610477865545-37711c53144d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80'
];

export const ReelUploadModal = ({ isOpen, onClose }) => {
  const { addReel, user, plan, listings, setRoute, isAuthenticated, openAuth, addToast } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Fashion');
  const [caption, setCaption] = useState('');
  const [linkedListingId, setLinkedListingId] = useState('');
  const [previewMedia, setPreviewMedia] = useState(SAMPLE_MEDIA[0]);
  const [isVideo, setIsVideo] = useState(false);
  const [consent, setConsent] = useState(false);

  if (!isOpen) return null;

  // Paid membership check: any plan other than Free
  const isPaid = plan !== 'Free';

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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      onClose();
      addToast('Please sign in or create an account to share stories and reels', 'info');
      if (openAuth) openAuth('signin');
      else setRoute('auth');
      return;
    }
    if (!isPaid) {
      onClose();
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
      title: title.trim(),
      category,
      caption: caption.trim(),
      image: previewMedia,
      media: previewMedia,
      isVideo,
      listingId: linkedListingId ? Number(linkedListingId) : null,
      area: user?.area || 'Frisco, TX'
    });

    onClose();
    setTitle('');
    setCaption('');
    setLinkedListingId('');
    setConsent(false);
  };

  return (
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 !m-0">
      <div 
        className="glass-card bg-white max-w-xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-idle-emerald/20 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 glass-header px-5 py-4 flex items-center justify-between border-b border-idle-line">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-idle-mint text-idle-emerald flex items-center justify-center">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#003d36]">Show what you're working on.</h2>
              <p className="text-[11px] text-idle-muted">Share an outfit, workout, or project for 24 hours</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-idle-muted hover:bg-black/5 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {!isPaid ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-idle-gold flex items-center justify-center border border-idle-gold/30">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#172d28]">Publishing requires a paid membership</h3>
              <p className="text-xs text-idle-muted max-w-xs mx-auto mt-1">
                Free accounts can watch. Studio, Studio Pro, Business and Enterprise can create promotional Reels.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                setRoute('membership');
              }}
              className="gold-gradient-btn px-6 py-2.5 rounded-xl text-sm font-bold shadow-md cursor-pointer"
            >
              Unlock Studio →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-4 text-xs md:text-sm">
            {/* Field 1: Reel Title */}
            <div>
              <label className="block text-xs font-bold text-[#004f46] mb-1">
                Reel title
              </label>
              <input
                type="text"
                required
                maxLength={80}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="A new listing, a workout, a finished job…"
                className="w-full px-3.5 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none transition-all text-xs"
              />
            </div>

            {/* Field 2: Category */}
            <div>
              <label className="block text-xs font-bold text-[#004f46] mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none transition-all text-xs cursor-pointer"
              >
                {['Fashion', 'Fitness', 'Home services', 'Equipment', 'Creators', 'Enterprise', 'Events', 'Outdoor'].map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Field 3: What are you showing? (Caption) */}
            <div>
              <label className="block text-xs font-bold text-[#004f46] mb-1">
                What are you showing?
              </label>
              <textarea
                required
                rows={3}
                maxLength={300}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Tell people what makes this moment worth checking out"
                className="w-full px-3.5 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none transition-all text-xs resize-none"
              />
            </div>

            {/* Field 4: Link to your marketplace listing */}
            <div>
              <label className="block text-xs font-bold text-[#004f46] mb-1">
                Link to your marketplace listing
              </label>
              <select
                value={linkedListingId}
                onChange={(e) => setLinkedListingId(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none transition-all text-xs cursor-pointer"
              >
                <option value="">Reel only · no listing</option>
                {listings.map(l => (
                  <option key={l.id} value={l.id}>{l.title}</option>
                ))}
              </select>
            </div>

            {/* Field 5: Photo or short video */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#004f46]">
                Photo or short video
              </label>
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp,video/mp4,video/webm"
                onChange={handleFileChange}
                className="block w-full text-xs text-[#596e64] file:mr-3 file:py-2 file:px-3 file:rounded-xl file:border file:border-idle-line file:text-xs file:font-bold file:bg-[#f1f8f2] file:text-[#004f46] hover:file:bg-[#e1f6f1] file:cursor-pointer cursor-pointer"
              />
              <span className="text-[11px] text-[#7a8d82] block">
                0 / 12 new Reels in the last 24h. Browser media limit 1.5 MB.
              </span>

              {/* Media preview */}
              {previewMedia && (
                <div className="relative w-32 h-20 rounded-xl overflow-hidden border-2 border-idle-emerald shadow-sm bg-black mt-2">
                  {isVideo ? (
                    <video src={previewMedia} className="w-full h-full object-cover" autoPlay muted loop playsInline />
                  ) : (
                    <img src={previewMedia} alt="Preview" className="w-full h-full object-cover" />
                  )}
                </div>
              )}

              {/* Sample Presets */}
              <div className="pt-1">
                <span className="text-[11px] text-[#7a8d82] block mb-1">Or pick a demo clip:</span>
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
                  {SAMPLE_MEDIA.map((url, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => { setPreviewMedia(url); setIsVideo(false); }}
                      className="w-14 h-10 rounded-lg overflow-hidden border border-idle-line hover:border-idle-emerald shrink-0 cursor-pointer"
                    >
                      <img src={url} alt={`Option ${i}`} className="w-full h-full object-cover" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Field 6: Consent Checkbox */}
            <label className="flex items-start gap-2.5 text-xs text-idle-muted pt-1 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 rounded text-idle-emerald focus:ring-idle-emerald cursor-pointer"
              />
              <span>
                I have permission to publish the media and identifiable people shown, and I understand this demo stores the post only in my browser.
              </span>
            </label>

            {/* Field 7: Submit CTA */}
            <button
              type="submit"
              disabled={!consent}
              className="gold-gradient-btn w-full py-3 rounded-xl text-xs sm:text-sm font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer transition-transform active:scale-98"
            >
              Publish a 24-hour demo Reel →
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
