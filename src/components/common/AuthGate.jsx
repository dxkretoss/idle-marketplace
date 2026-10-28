import React from 'react';
import { useApp } from '../../context/AppContext';
import { Lock, LogIn, ArrowRight, ShieldCheck, Sparkles, QrCode, Zap } from 'lucide-react';

export const AuthGate = ({ 
  title = "Authentication Required", 
  subtitle = "Please sign in or create an account to access this feature.",
  actionText = "Sign In / Create Account",
  badge = "Members Only"
}) => {
  const { setRoute } = useApp();

  return (
    <div className="max-w-2xl mx-auto my-6 sm:my-12 p-8 sm:p-12 rounded-3xl bg-white border border-[#dce5df] shadow-xl text-center space-y-6 animate-in fade-in duration-200">
      {/* Icon Badge */}
      <div className="w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200 text-amber-700 flex items-center justify-center mx-auto shadow-sm">
        <Lock className="w-8 h-8" />
      </div>

      {/* Text Info */}
      <div className="space-y-2">
        <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-200 inline-block">
          {badge}
        </span>
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#003d36] tracking-tight">
          {title}
        </h2>
        <p className="text-xs sm:text-sm text-idle-muted max-w-md mx-auto leading-relaxed">
          {subtitle}
        </p>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
        <button
          onClick={() => setRoute('auth')}
          className="gold-gradient-btn w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-bold shadow-md hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
        >
          <LogIn className="w-4 h-4" />
          <span>{actionText}</span>
        </button>
        <button
          onClick={() => setRoute('explore')}
          className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-sm font-semibold border border-idle-line text-idle-muted hover:text-[#172d28] hover:bg-[#edf3f0] transition-colors cursor-pointer"
        >
          Browse Marketplace
        </button>
      </div>

      {/* IDLE Trust Standards */}
      <div className="pt-6 border-t border-idle-line grid grid-cols-3 gap-3 text-[11px] text-idle-muted">
        <div className="flex flex-col items-center gap-1">
          <Zap className="w-4 h-4 text-idle-gold" />
          <span className="font-semibold text-[#172d28]">0% Commission</span>
          <span className="text-[10px] text-idle-muted">Keep 100% of earnings</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <QrCode className="w-4 h-4 text-idle-emerald" />
          <span className="font-semibold text-[#172d28]">QR Handoffs</span>
          <span className="text-[10px] text-idle-muted">Verified custody transfer</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <ShieldCheck className="w-4 h-4 text-idle-emerald" />
          <span className="font-semibold text-[#172d28]">Verified Trust</span>
          <span className="text-[10px] text-idle-muted">Dallas-Fort Worth Pilot</span>
        </div>
      </div>
    </div>
  );
};
