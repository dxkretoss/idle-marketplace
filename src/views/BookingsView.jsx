import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Briefcase, 
  QrCode, 
  ShieldCheck, 
  CheckCircle2, 
  Clock, 
  ArrowRight, 
  Camera, 
  FileText,
  DollarSign,
  AlertCircle
} from 'lucide-react';

import { AuthGate } from '../components/common/AuthGate';

const STAGES = [
  'Draft', 
  'Agreement preview', 
  'Payment review', 
  'Handoff preview', 
  'Completed'
];

export const BookingsView = () => {
  const { bookings, activeBooking, setActiveBooking, advanceBookingStage, setRoute, isAuthenticated } = useApp();

  if (!isAuthenticated) {
    return (
      <AuthGate
        badge="Active Bookings"
        title="Sign in to view your bookings & handoffs"
        subtitle="You must be signed in to manage active equipment rentals, stage progress, and single-use QR custody transfers."
        actionText="Sign In to View Bookings"
      />
    );
  }

  const selectedBooking = activeBooking || bookings[0];

  const handleNextStage = (b) => {
    const currentIdx = STAGES.indexOf(b.stage);
    if (currentIdx < STAGES.length - 1) {
      advanceBookingStage(b.id, STAGES[currentIdx + 1]);
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Heading */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
          Custody & Agreements
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#082f2c] mt-0.5">
          Bookings & Transactions.
        </h1>
        <p className="text-xs sm:text-sm text-idle-muted mt-1 max-w-xl">
          Move through the 5-stage transaction lifecycle. Single-use dynamic QR codes verify physical pickup, return condition, and security deposit release.
        </p>
      </div>

      {/* Main Selected Booking Card & Stepper */}
      {selectedBooking ? (
        <div className="glass-card p-6 md:p-8 rounded-3xl border border-idle-emerald/20 shadow-glass space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-idle-line pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-idle-emerald bg-idle-mint px-2.5 py-0.5 rounded-full">
                  {selectedBooking.id}
                </span>
                <span className="text-xs text-idle-muted">
                  Provider: <strong>{selectedBooking.provider}</strong>
                </span>
              </div>
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0d2e29]">
                {selectedBooking.listingTitle}
              </h2>
            </div>

            <div className="text-right">
              <span className="text-2xl font-extrabold text-[#004f46]">
                ${selectedBooking.total}
              </span>
              <span className="text-xs text-idle-muted block">
                (${selectedBooking.price} rental + ${selectedBooking.deposit} deposit hold)
              </span>
            </div>
          </div>

          {/* 5-Stage Stepper Bar */}
          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-idle-muted block">
              Lifecycle Progress
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {STAGES.map((stg, i) => {
                const currentIdx = STAGES.indexOf(selectedBooking.stage);
                const isPassed = i <= currentIdx;
                const isCurrent = i === currentIdx;
                return (
                  <div
                    key={stg}
                    className={`p-3 rounded-2xl border text-center transition-all ${
                      isCurrent
                        ? 'bg-idle-emerald text-white border-idle-emerald shadow-md'
                        : isPassed
                          ? 'bg-idle-mint/80 border-idle-emerald/40 text-idle-emerald font-semibold'
                          : 'bg-[#f8faf9] border-idle-line text-idle-muted'
                    }`}
                  >
                    <div className="flex items-center justify-center mb-1">
                      {isPassed ? (
                        <CheckCircle2 className={`w-4 h-4 ${isCurrent ? 'text-idle-gold' : 'text-idle-emerald'}`} />
                      ) : (
                        <span className="w-4 h-4 rounded-full border border-current text-[10px] flex items-center justify-center font-bold">
                          {i + 1}
                        </span>
                      )}
                    </div>
                    <span className="text-[11px] font-bold block">{stg}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* QR Handoff & Deposit Visual Section */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-2">
            {/* Left: Dynamic QR Code Box */}
            <div className="md:col-span-5 bg-[#f4f9f6] p-5 rounded-2xl border border-idle-line flex flex-col items-center text-center space-y-3">
              <div className="p-3 bg-white rounded-2xl shadow-sm border border-idle-line">
                {/* Visual SVG QR representation */}
                <div className="w-36 h-36 bg-[#003d36] rounded-xl p-2.5 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div className="w-9 h-9 bg-white rounded-md p-1.5 flex items-center justify-center">
                      <div className="w-4 h-4 bg-[#003d36] rounded-sm" />
                    </div>
                    <div className="w-9 h-9 bg-white rounded-md p-1.5 flex items-center justify-center">
                      <div className="w-4 h-4 bg-[#003d36] rounded-sm" />
                    </div>
                  </div>
                  <div className="flex justify-center items-center">
                    <QrCode className="w-10 h-10 text-idle-gold stroke-[2]" />
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="w-9 h-9 bg-white rounded-md p-1.5 flex items-center justify-center">
                      <div className="w-4 h-4 bg-[#003d36] rounded-sm" />
                    </div>
                    <span className="text-[8px] font-mono font-bold text-idle-gold">IDLE</span>
                  </div>
                </div>
              </div>

              <div>
                <strong className="text-xs font-bold text-[#172d28] block">Single-Use Handoff Token</strong>
                <span className="text-[10px] font-mono text-idle-muted">{selectedBooking.qrToken}</span>
              </div>
              <p className="text-[11px] text-idle-muted max-w-xs">
                Scan with mobile camera to confirm pickup custody or complete return inspection.
              </p>
            </div>

            {/* Right: Security Details & Action Stepper */}
            <div className="md:col-span-7 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs text-idle-emerald font-bold">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Stripe Deposit Protection Active</span>
                </div>

                <div className="p-4 rounded-xl bg-white border border-idle-line space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-idle-muted">Rental Fee:</span>
                    <strong className="text-[#172d28]">${selectedBooking.price}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-idle-muted">Refundable Deposit Hold:</span>
                    <strong className="text-idle-emerald">${selectedBooking.deposit}</strong>
                  </div>
                  <div className="h-px bg-idle-line my-1" />
                  <div className="flex justify-between text-xs font-bold">
                    <span>Total Authorization:</span>
                    <span className="text-[#004f46]">${selectedBooking.total}</span>
                  </div>
                </div>

                {/* Audit Timeline */}
                <div>
                  <h4 className="text-[11px] font-bold uppercase tracking-wider text-idle-muted mb-2">
                    Audit Log History
                  </h4>
                  <div className="space-y-1.5 text-xs">
                    {selectedBooking.statusHistory?.map((h, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-idle-muted">
                        <Clock className="w-3.5 h-3.5 text-idle-emerald flex-shrink-0" />
                        <span className="text-[#1e3b33] font-medium">{h.message}</span>
                        <span className="text-[10px] text-idle-muted/70">({h.time})</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Advance Stage Simulation CTA */}
              <div className="pt-3 border-t border-idle-line flex flex-wrap items-center gap-3">
                {selectedBooking.stage !== 'Completed' ? (
                  <button
                    onClick={() => handleNextStage(selectedBooking)}
                    className="gold-gradient-btn px-6 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center gap-2"
                  >
                    <span>Advance Stage ({selectedBooking.stage} &rarr;)</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-bold text-idle-emerald bg-idle-mint px-4 py-2 rounded-xl">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Transaction Completed & Deposit Released</span>
                  </div>
                )}
                <span className="text-[11px] text-idle-muted">
                  Interactive demo simulation for DFW pilot test
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="glass-card p-12 text-center rounded-3xl space-y-3">
          <Briefcase className="w-12 h-12 text-idle-muted mx-auto" />
          <h3 className="font-serif text-lg font-bold text-[#172d28]">No active bookings</h3>
          <p className="text-xs text-idle-muted max-w-sm mx-auto">
            Choose any listing from Explore and tap "Book with QR Handoff" to start a simulated agreement.
          </p>
          <button
            onClick={() => setRoute('explore')}
            className="emerald-gradient-btn px-4 py-2 rounded-xl text-xs font-bold"
          >
            Explore Marketplace
          </button>
        </div>
      )}

      {/* Transaction Features Overview */}
      <section className="glass-card p-6 rounded-3xl border border-idle-line space-y-2">
        <h3 className="font-serif text-base font-bold text-[#0d2e29] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-idle-emerald" />
          <span>What an IDLE Transaction Protects</span>
        </h3>
        <p className="text-xs text-idle-muted leading-relaxed">
          Binding digital rental agreements, Stripe credit card pre-authorizations, condition photos uploaded prior to release, timestamped dynamic QR custody handoffs, automated deposit refunds, and independent arbitration escalation if items are returned damaged.
        </p>
      </section>
    </div>
  );
};
