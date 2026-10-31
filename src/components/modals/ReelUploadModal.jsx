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
    <div className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200 !m-0">
      <div 
        className="glass-card bg-white max-w-2xl w-full max-h-[92vh] overflow-y-auto rounded-3xl shadow-2xl border border-idle-emerald/20 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header matching prototype */}
        <div className="sticky top-0 z-10 glass-header px-5 sm:px-6 py-4 flex items-center justify-between border-b border-[#dce6df] bg-white/95 backdrop-blur-md">
          <div className="space-y-0.5">
            <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#9b782c]">
              24-HOUR PROMOTION
            </div>
            <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#004f46]">
              Show what you're working on.
            </h2>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full text-[#7a8d82] hover:text-[#004f46] hover:bg-black/5 cursor-pointer transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        {!isPaid ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-amber-50 text-idle-gold flex items-center justify-center border border-idle-gold/30">
              <Sparkles className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#172d28]">Publishing requires a paid membership</h3>
              <p className="text-xs text-idle-muted max-w-sm mx-auto mt-1">
                Free accounts can watch. Studio, Studio Pro, Business and Enterprise can create promotional Reels.
              </p>
            </div>
            <button
              type="button"
              onClick={() => {
                onClose();
                setRoute('membership');
              }}
              className="gold-gradient-btn px-6 py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer"
            >
              Unlock posting →
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4 text-xs">
            <p className="text-xs text-[#596e64] -mt-1">
              Share an outfit, a workout, a before-and-after job, or enterprise project. The local demo only stores your post in this browser.
            </p>

            {/* Row 1: Reel title & Category */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#004f46]">
                  Reel title
                </label>
                <input
                  type="text"
                  required
                  maxLength={80}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="A new listing, a workout, a finished job…"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe6df] bg-[#fbfcfa] focus:bg-white focus:border-[#004f46] outline-none transition-all text-xs"
                />
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#004f46]">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe6df] bg-[#fbfcfa] focus:bg-white focus:border-[#004f46] outline-none transition-all text-xs cursor-pointer"
                >
                  {['Fashion', 'Fitness', 'Home services', 'Equipment', 'Creators', 'Enterprise', 'Events', 'Outdoor'].map((cat) => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Row 2: What are you showing? & Link to listing */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#004f46]">
                  What are you showing?
                </label>
                <textarea
                  required
                  rows={3}
                  maxLength={300}
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
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

            {/* Row 3: Photo or short video */}
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

              {/* Media Preview or Presets */}
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
            <label className="flex items-start gap-2 pt-1 text-xs text-[#596e64] cursor-pointer select-none">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 rounded text-[#004f46] focus:ring-[#004f46] cursor-pointer"
              />
              <span>
                I have permission to publish the media and identifiable people shown, and I understand this demo stores the post only in my browser.
              </span>
            </label>

            {/* Row 5: Submit CTA */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={!consent}
                className="gold-gradient-btn w-full py-3 rounded-xl font-bold text-xs shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <span>Publish a 24-hour demo Reel →</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
