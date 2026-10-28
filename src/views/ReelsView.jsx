import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { StoriesStrip } from '../components/reels/StoriesStrip';
import { ReelUploadModal } from '../components/modals/ReelUploadModal';
import { 
  Play, 
  Plus, 
  Clock, 
  Film, 
  Sparkles,
  ArrowRight,
  ShieldCheck
} from 'lucide-react';

export const ReelsView = () => {
  const { reels, setActiveReel, plan, setRoute } = useApp();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);

  const isPaid = ['Trade', 'Business', 'Enterprise'].includes(plan);

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
          onClick={() => setUploadModalOpen(true)}
          className="gold-gradient-btn flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md flex-shrink-0"
        >
          <Plus className="w-4 h-4 stroke-[2.5]" />
          <span>Post a 24-Hour Reel</span>
        </button>
      </div>

      {/* Stories Bubble Strip */}
      <StoriesStrip onOpenUpload={() => setUploadModalOpen(true)} title="Active 24h Stories" />

      {/* Main Reels Grid Feed */}
      <div className="space-y-4">
        <div className="flex items-center justify-between border-b border-idle-line pb-3">
          <div>
            <h2 className="font-serif text-xl font-bold text-[#082f2c]">
              Watch the Local Edit
            </h2>
            <p className="text-xs text-idle-muted">
              Tap any tile to watch full video clip, read details, and view associated rental/service.
            </p>
          </div>
          <span className="text-xs font-semibold text-idle-emerald">
            {reels.length} Active Reels
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {reels.map((reel) => {
            const isUser = reel.source === 'user';
            const hoursLeft = Math.max(1, Math.ceil((86400000 - (Date.now() - (reel.created || Date.now()))) / 3600000));

            return (
              <div
                key={reel.id}
                onClick={() => setActiveReel(reel)}
                className="group relative h-72 sm:h-84 rounded-2xl overflow-hidden cursor-pointer shadow-glass hover:shadow-glass-hover transition-all bg-[#001f1c]"
              >
                {/* Media Image */}
                <img
                  src={reel.image}
                  alt={reel.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-black/30 group-hover:from-black/90 transition-all" />

                {/* Top Badge (Time Left) */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1 backdrop-blur-md shadow-sm ${
                    isUser 
                      ? 'bg-idle-gold text-[#122821] font-extrabold' 
                      : 'bg-[#002f2a]/80 text-emerald-100 border border-white/20'
                  }`}>
                    <Clock className="w-2.5 h-2.5" />
                    <span>{isUser ? `${hoursLeft}h left (Yours)` : 'SAMPLE'}</span>
                  </span>

                  <div className="w-7 h-7 rounded-full bg-black/40 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-idle-emerald group-hover:border-idle-emerald transition-colors">
                    <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Bottom Info */}
                <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold">
                    {reel.category}
                  </span>
                  <h3 className="font-serif text-sm sm:text-base font-bold leading-snug line-clamp-2">
                    {reel.title}
                  </h3>
                  <div className="flex items-center justify-between text-[11px] text-white/70 pt-1">
                    <span className="truncate">{reel.author}</span>
                    <span className="text-[10px]">{reel.area}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Promotional Upload Section Card */}
      <section className="glass-card p-6 md:p-8 rounded-3xl border border-idle-emerald/20 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase font-bold text-idle-gold tracking-wider">
              24-Hour Promotion
            </span>
            <span className="text-[10px] px-2 py-0.5 rounded-full bg-idle-mint text-idle-emerald font-bold">
              North Texas Radius
            </span>
          </div>
          <h3 className="font-serif text-2xl font-bold text-[#003d36]">
            Show what you're working on.
          </h3>
          <p className="text-xs md:text-sm text-idle-muted leading-relaxed">
            Share an outfit reveal, a training mobility breakdown, an equipment walkaround, or a finished client installation. Short clips keep your listings top-of-mind.
          </p>
        </div>

        <button
          onClick={() => setUploadModalOpen(true)}
          className="gold-gradient-btn px-6 py-3 rounded-xl text-xs md:text-sm font-bold shadow-md flex-shrink-0 flex items-center gap-2"
        >
          <Film className="w-4 h-4" />
          <span>Publish a 24-Hour Reel</span>
        </button>
      </section>

      {/* Reel Upload Modal */}
      <ReelUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </div>
  );
};
