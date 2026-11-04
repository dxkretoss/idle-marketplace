import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  PackagePlus,
  Crown,
  Sparkles,
  Check,
  X,
  ArrowRight,
  ShieldCheck,
  Plus
} from 'lucide-react';

export const ExtraListingAddonModal = ({
  isOpen,
  onClose,
  activeRentals = 0,
  activeServices = 0,
  rentalLimit = 4,
  serviceLimit = 4,
  extraRentalsCount = 0,
  extraServicesCount = 0,
  targetKind = 'rental'
}) => {
  const { plan, setRoute, addExtraSlot, addToast } = useApp();

  if (!isOpen) return null;

  const handleBuyExtraSlot = (kind) => {
    if (addExtraSlot) {
      addExtraSlot(kind);
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-emerald-950/60 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg bg-white rounded-3xl border border-idle-line shadow-2xl overflow-hidden flex flex-col">
        {/* Top Gold Accent Bar */}
        <div className="h-1.5 w-full bg-gradient-to-r from-idle-gold via-amber-400 to-idle-gold" />

        {/* Modal Header */}
        <div className="p-6 pb-4 border-b border-idle-line flex items-start justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold bg-idle-gold/10 px-2 py-0.5 rounded-full border border-idle-gold/30">
                Capacity Limit Reached
              </span>
              <span className="text-xs text-idle-muted">Plan: {plan}</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-[#082f2c] mt-1">
              Extra listing or upgrade?
            </h2>
            <p className="text-xs text-idle-muted mt-0.5 leading-relaxed">
              When a bucket is full, add one 30-day slot or preview a higher tier. No IDLE percentage commission.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body: Capacity Overview & Options */}
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Rentals Bucket Card */}
            <div className={`p-4 rounded-2xl border transition-all ${
              targetKind === 'rental' ? 'border-idle-gold bg-amber-50/40 shadow-xs' : 'border-idle-line bg-gray-50/50'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-idle-muted">
                  Rentals
                </span>
                <span className="text-xs font-bold text-[#082f2c]">
                  {activeRentals} / {Number.isFinite(rentalLimit) ? rentalLimit : 'Fair use'}
                </span>
              </div>
              <p className="text-[11px] text-idle-muted leading-tight">
                Includes {extraRentalsCount} extra 30-day slot{extraRentalsCount === 1 ? '' : 's'}.
              </p>
              <button
                type="button"
                onClick={() => handleBuyExtraSlot('rental')}
                className="mt-3 w-full py-2 px-3 rounded-xl bg-idle-emerald hover:bg-[#003d36] text-white text-xs font-bold shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add 1 Rental Slot · $12.00
              </button>
            </div>

            {/* Services Bucket Card */}
            <div className={`p-4 rounded-2xl border transition-all ${
              targetKind !== 'rental' ? 'border-idle-gold bg-amber-50/40 shadow-xs' : 'border-idle-line bg-gray-50/50'
            }`}>
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-idle-muted">
                  Tasks & Services
                </span>
                <span className="text-xs font-bold text-[#082f2c]">
                  {activeServices} / {Number.isFinite(serviceLimit) ? serviceLimit : 'Fair use'}
                </span>
              </div>
              <p className="text-[11px] text-idle-muted leading-tight">
                Includes {extraServicesCount} extra 30-day slot{extraServicesCount === 1 ? '' : 's'}.
              </p>
              <button
                type="button"
                onClick={() => handleBuyExtraSlot('service')}
                className="mt-3 w-full py-2 px-3 rounded-xl bg-idle-emerald hover:bg-[#003d36] text-white text-xs font-bold shadow-xs transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5" />
                Add 1 Task Slot · $12.00
              </button>
            </div>
          </div>

          <div className="p-3.5 rounded-2xl bg-idle-mint/30 border border-idle-emerald/20 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-idle-emerald shrink-0 mt-0.5" />
            <div className="text-xs text-idle-forest leading-relaxed">
              <strong>Transparent demo price:</strong> Founder-proposed $12.00 per 30-day listing slot with no automatic recurring charge. Expired extra slots are archived safely without deleting content.
            </div>
          </div>
        </div>

        {/* Modal Footer: Upgrade Alternative */}
        <div className="p-4 px-6 border-t border-idle-line bg-gray-50/60 flex items-center justify-between">
          <div>
            <span className="text-xs text-gray-500 block">Need a higher monthly allowance?</span>
            <span className="text-xs font-bold text-[#082f2c]">Compare Studio Pro or Trade</span>
          </div>
          <button
            type="button"
            onClick={() => {
              onClose();
              setRoute('membership');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl gold-gradient-btn text-xs font-bold shadow-xs cursor-pointer active:scale-95"
          >
            <Crown className="w-3.5 h-3.5" />
            View Member Plans
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

