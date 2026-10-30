import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, PlaySquare, Clock, ArrowRight, Upload } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const PostPrivateReelModal = ({ isOpen, onClose }) => {
  const { addToast } = useApp();
  const [caption, setCaption] = useState('');
  const [category, setCategory] = useState('Vehicles');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!caption.trim()) {
      addToast('Please enter a caption for your reel', 'error');
      return;
    }
    addToast('Your 24-hour private reel is now live for Elite members!', 'success');
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-[#090d11] text-white max-w-md w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-[#d7b467]/40 shadow-2xl p-6 relative space-y-4 no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#d7b467]/20 border border-[#d7b467]/40 flex items-center justify-center text-[#d7b467]">
              <PlaySquare className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#d7b467]">
                IDLE Elite PM
              </span>
              <h3 className="font-serif text-lg font-bold text-white">Post 24h Private Reel</h3>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-gray-400 hover:text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#d7b467] text-white focus:outline-none cursor-pointer"
            >
              <option value="Vehicles">Exotic Supercars & Drives</option>
              <option value="Aviation">Private Aviation & Runways</option>
              <option value="Estates">Sovereign Estates & Mansions</option>
              <option value="Ground">Executive Shuttles & Livery</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
              Media Upload
            </label>
            <div className="p-6 rounded-2xl border-2 border-dashed border-white/20 hover:border-[#d7b467]/60 text-center space-y-1.5 transition-colors cursor-pointer bg-white/5">
              <Upload className="w-6 h-6 text-[#d7b467] mx-auto" />
              <div className="text-xs font-semibold text-gray-200">Tap to upload 9:16 vertical video or photo</div>
              <div className="text-[10px] text-gray-400">MP4, MOV or JPEG · Automatically expires in 24 hours</div>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
              Reel Caption
            </label>
            <textarea
              rows={3}
              value={caption}
              onChange={(e) => setCaption(e.target.value)}
              placeholder="Describe the vehicle, aircraft, or venue setup..."
              className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 focus:border-[#d7b467] text-white focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d7b467] to-[#aa8334] text-black font-bold text-xs hover:opacity-95 shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Share 24-Hour Reel</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

