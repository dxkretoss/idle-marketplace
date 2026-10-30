import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Calendar, Crown, MapPin, Users, ArrowRight } from 'lucide-react';
import { useApp } from '../../../context/AppContext';

export const HostPrivateEventModal = ({ isOpen, onClose }) => {
  const { addToast } = useApp();
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [venue, setVenue] = useState('Private Estate, Frisco TX');
  const [capacity, setCapacity] = useState('25');
  const [desc, setDesc] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !date.trim()) {
      addToast('Please complete event title and date', 'error');
      return;
    }
    addToast(`Private experience "${title}" scheduled for member RSVPs!`, 'success');
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
              <Calendar className="w-4 h-4" />
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#d7b467]">
                IDLE Elite PM
              </span>
              <h3 className="font-serif text-lg font-bold text-white">Host a Member Experience</h3>
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
              Event Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Members-Only Collector Supercar Soirée"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#d7b467] text-white focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                Date & Timing
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g. Saturday, Dec 19 · 6 PM"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#d7b467] text-white focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
                Guest Limit
              </label>
              <input
                type="number"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                placeholder="25"
                className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#d7b467] text-white focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
              Venue Location
            </label>
            <input
              type="text"
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              placeholder="e.g. Private Estate Pavilion, Frisco TX"
              className="w-full px-3.5 py-2.5 rounded-xl bg-black/60 border border-white/15 focus:border-[#d7b467] text-white focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-[11px] font-bold uppercase tracking-wider text-gray-300 mb-1">
              Experience Description
            </label>
            <textarea
              rows={3}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Provide agenda, dress code, parking instructions, and valet details..."
              className="w-full px-3.5 py-2 rounded-xl bg-black/60 border border-white/15 focus:border-[#d7b467] text-white focus:outline-none resize-none"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-[#d7b467] to-[#aa8334] text-black font-bold text-xs hover:opacity-95 shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>Publish to Members' Circle</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
};

