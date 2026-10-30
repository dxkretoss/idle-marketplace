import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Crown, Upload, ShieldCheck, ArrowRight } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const CreatePrivateListingModal = ({ isOpen, onClose }) => {
  const { addToast } = useApp();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Vehicles');
  const [rate, setRate] = useState('');
  const [unit, setUnit] = useState('day');
  const [city, setCity] = useState('Frisco, TX');
  const [desc, setDesc] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !rate.trim()) {
      addToast('Please complete asset title and rate', 'error');
      return;
    }

    addToast(`Private listing "${title}" submitted to Elite Concierge review queue!`, 'success');
    onClose();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-150"
      onClick={onClose}
    >
      <div
        className="bg-[#090d11] text-white max-w-lg w-full max-h-[90vh] overflow-y-auto rounded-3xl border border-[#d7b467]/40 shadow-2xl p-6 relative space-y-4 no-scrollbar"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[#d7b467]/20 border border-[#d7b467]/40 flex items-center justify-center text-[#d7b467]">
              <Crown className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#d7b467]">
                IDLE Elite PM
              </span>
              <h3 className="font-serif text-lg font-bold text-white">Offer a Private Asset</h3>
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
              Asset Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. 2024 Porsche 911 GT3 RS or Frisco Executive Villa"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#d7b467] text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#d7b467] text-white focus:outline-none cursor-pointer"
              >
                <option value="Vehicles">Exotic Vehicles</option>
                <option value="Ground">Vertiport Chauffeur</option>
                <option value="Estates">Sovereign Estates</option>
                <option value="Parking">Private Parking</option>
                <option value="Aviation">Private Aviation</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                Metro Hub
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#d7b467] text-white focus:outline-none cursor-pointer"
              >
                <option value="Frisco, TX">Frisco Station</option>
                <option value="Plano, TX">Legacy West Plano</option>
                <option value="McKinney, TX">McKinney National (TKI)</option>
                <option value="Addison, TX">Addison (ADS)</option>
                <option value="Highland Park, TX">Highland Park</option>
                <option value="Southlake, TX">Southlake / Westlake</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                Exclusive Rate ($)
              </label>
              <input
                type="number"
                value={rate}
                onChange={(e) => setRate(e.target.value)}
                placeholder="e.g. 1450"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#d7b467] text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                Rate Unit
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#d7b467] text-white focus:outline-none cursor-pointer"
              >
                <option value="day">per day</option>
                <option value="hour">per hour</option>
                <option value="leg">per flight leg</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
              Private Security & Escrow Protocol
            </label>
            <textarea
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="State any gate clearances, biometric protocols, or chauffeured valet specifications..."
              className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 focus:border-[#d7b467] text-white focus:outline-none resize-none"
            />
          </div>

          <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-[11px] text-gray-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#d7b467] shrink-0" />
            <span>All private assets are protected by single-use QR custody codes & NDA agreements.</span>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d7b467] to-[#aa8334] text-black font-bold text-xs hover:opacity-95 shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Submit for Concierge Review</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

