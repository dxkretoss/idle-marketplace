import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { X, Upload, Sparkles, ShieldCheck, Film, Image as ImageIcon } from 'lucide-react';

const SAMPLE_MEDIA = [
  'https://images.unsplash.com/photo-1746730921429-3a6489172f1b?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1610477865545-37711c53144d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80'
];

export const ReelUploadModal = ({ isOpen, onClose }) => {
  const { addReel, user, plan, setRoute, isAuthenticated, addToast } = useApp();

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Fashion');
  const [caption, setCaption] = useState('');
  const [selectedImage, setSelectedImage] = useState(SAMPLE_MEDIA[0]);
  const [consent, setConsent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      onClose();
      addToast('Please sign in or create an account to share stories and reels', 'info');
      setRoute('auth');
      return;
    }
    if (!consent) return;

    addReel({
      title,
      category,
      caption,
      image: selectedImage,
      area: user.area || 'Frisco, TX'
    });

    onClose();
    setTitle('');
    setCaption('');
  };

  const isPaid = ['Trade', 'Business', 'Enterprise'].includes(plan);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div 
        className="glass-card bg-white max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-idle-emerald/20 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 z-10 glass-header px-5 py-4 flex items-center justify-between border-b border-idle-line">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-idle-mint text-idle-emerald flex items-center justify-center">
              <Film className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif text-lg font-bold text-[#003d36]">Create 24-Hour Reel</h2>
              <p className="text-[11px] text-idle-muted">Showcase gear, workouts or before-and-after work</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full text-idle-muted hover:bg-black/5"
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
              <h3 className="font-serif text-xl font-bold text-[#172d28]">Paid Membership Required</h3>
              <p className="text-xs text-idle-muted max-w-xs mx-auto mt-1">
                Free members can watch local Reels. Upgrade to Trade ($15/mo) to publish 24-hour promotional videos with zero commission.
              </p>
            </div>
            <button
              onClick={() => {
                onClose();
                setRoute('membership');
              }}
              className="gold-gradient-btn px-6 py-2.5 rounded-xl text-sm font-bold shadow-md"
            >
              Explore Memberships
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 md:p-6 space-y-4 text-xs md:text-sm">
            <div>
              <label className="block text-xs font-bold text-[#172d28] uppercase tracking-wider mb-1">
                Reel Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. New Designer Gala Outfit or Excavator Test"
                className="w-full px-3.5 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172d28] uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none transition-all"
              >
                {['Fashion', 'Fitness', 'Home Services', 'Equipment', 'Creators', 'Enterprise', 'Events', 'Outdoor'].map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172d28] uppercase tracking-wider mb-1">
                Choose Media / Photo
              </label>
              <div className="grid grid-cols-3 gap-2">
                {SAMPLE_MEDIA.map((url, i) => (
                  <button
                    type="button"
                    key={i}
                    onClick={() => setSelectedImage(url)}
                    className={`relative h-20 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedImage === url ? 'border-idle-gold scale-102 shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={url} alt={`Option ${i}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172d28] uppercase tracking-wider mb-1">
                Caption
              </label>
              <textarea
                required
                rows={3}
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Describe what people are seeing in this clip..."
                className="w-full px-3.5 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none transition-all resize-none"
              />
            </div>

            <label className="flex items-start gap-2.5 text-xs text-idle-muted pt-1 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 rounded text-idle-emerald focus:ring-idle-emerald"
              />
              <span>
                I confirm I have permission to post this media and understand it will be visible for 24 hours in the North Texas demo radius.
              </span>
            </label>

            <button
              type="submit"
              disabled={!consent}
              className="gold-gradient-btn w-full py-3 rounded-xl text-sm font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Publish 24-Hour Reel
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
