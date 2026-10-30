import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Crown, ShieldCheck, ArrowRight, Plane, Calendar, Users, Lock } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const AviationInquiryModal = ({ offering, isOpen, onClose }) => {
  const { addToast } = useApp();
  const [dates, setDates] = useState('Weekend Departure');
  const [passengers, setPassengers] = useState('4');
  const [notes, setNotes] = useState('');

  if (!isOpen || !offering) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    addToast(`Elite Concierge request submitted for "${offering.name || offering.title}"! A dedicated coordinator will reach out shortly.`, 'success');
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
                IDLE Elite Concierge
              </span>
              <h3 className="font-serif text-lg font-bold text-white">Private Asset Inquiry</h3>
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

        {/* Offering Snapshot */}
        <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-white/5 border border-white/10">
          <img
            src={offering.image || offering.img}
            alt={offering.name || offering.title}
            className="w-16 h-16 rounded-xl object-cover border border-[#d7b467]/30 shrink-0"
          />
          <div className="min-w-0 space-y-0.5">
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-500/30 px-2 py-0.2 rounded">
              {offering.badge || 'Verified Provider'}
            </span>
            <h4 className="font-bold text-sm text-white truncate">
              {offering.name || offering.title}
            </h4>
            <div className="text-xs text-[#d7b467] font-bold">
              {offering.rate || offering.price} <small className="text-gray-400 font-normal">/{offering.unit || 'day'}</small>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                Requested Timing
              </label>
              <input
                type="text"
                value={dates}
                onChange={(e) => setDates(e.target.value)}
                placeholder="e.g. This Saturday 2:00 PM"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#d7b467] text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                Party Size
              </label>
              <input
                type="number"
                value={passengers}
                onChange={(e) => setPassengers(e.target.value)}
                placeholder="4"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#d7b467] text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
              Concierge Instructions & Escort Protocol
            </label>
            <textarea
              rows={3}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="State any tarmac FBO valet requests, luggage requirements, or private security guidelines..."
              className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 focus:border-[#d7b467] text-white focus:outline-none resize-none"
            />
          </div>

          {/* Legal / Compliance Disclaimer */}
          <div className="p-3.5 rounded-xl bg-black/40 border border-[#d7b467]/30 text-[10px] text-gray-300 space-y-1">
            <div className="font-bold text-[#d7b467] flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>FAA Part 135 & Escrow Custody Assurance</span>
            </div>
            <p className="leading-relaxed text-gray-400">
              All aviation operations are conducted by independent FAA Part 135/121 licensed operators. Transactions are pre-authorized via Stripe escrow and released only upon single-use QR boarding completion.
            </p>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d7b467] to-[#aa8334] text-black font-bold text-xs hover:opacity-95 shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Inquire via Dedicated Concierge</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

