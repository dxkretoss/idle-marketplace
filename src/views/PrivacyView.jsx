import React from 'react';
import { useApp } from '../context/AppContext';
import { Footer } from '../components/layout/Footer';
import { 
  ShieldCheck, 
  Lock, 
  MapPin, 
  Camera, 
  CreditCard, 
  EyeOff, 
  Mail, 
  CheckCircle2, 
  FileText
} from 'lucide-react';

export const PrivacyView = () => {
  const { setRoute } = useApp();

  return (
    <div className="space-y-8 w-full">
      {/* Header Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#003831] via-[#002f28] to-[#00201b] text-white p-6 sm:p-10 shadow-glass border border-emerald-950/20 isolate">
        <div className="absolute top-0 right-0 w-80 h-80 bg-idle-gold/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-2xl space-y-2">
          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-idle-gold block">
            IDLE Marketplace Legal & Security
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
            Effective Date: Pilot Launch {new Date().getFullYear()} · Dallas-Fort Worth Metropolitan Area
          </p>
        </div>
      </section>

      {/* Privacy Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 rounded-2xl border border-idle-emerald/20 space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-idle-mint text-idle-emerald flex items-center justify-center">
            <EyeOff className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-[#0e352e]">Zero Exact Address Leaks</h4>
          <p className="text-[11px] text-idle-muted leading-relaxed">
            Public listings only display approximate neighborhood circles. Exact pickup addresses are only revealed after an authorized agreement.
          </p>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-idle-emerald/20 space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-idle-gold flex items-center justify-center">
            <Lock className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-[#0e352e]">256-Bit Encrypted Custody</h4>
          <p className="text-[11px] text-idle-muted leading-relaxed">
            Condition photos and single-use QR tokens are cryptographically locked and stored in secure cloud vaults with immutable timestamps.
          </p>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-idle-emerald/20 space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-idle-emerald flex items-center justify-center">
            <CreditCard className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-[#0e352e]">No Stored Card Data</h4>
          <p className="text-[11px] text-idle-muted leading-relaxed">
            All payments, security deposits, and member bank transfers are handled directly by Stripe Connect PCI-DSS Level 1 compliance.
          </p>
        </div>
      </div>

      {/* Structured Legal Sections */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-idle-line shadow-sm space-y-8 text-xs sm:text-sm text-[#24453d] leading-relaxed">
        {/* Section 1 */}
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#003830] flex items-center gap-2">
            <span>1. Information We Collect</span>
          </h3>
          <p>
            When you register for the IDLE Marketplace pilot, we collect the necessary credentials to maintain trust, verify authentic member identities, and facilitate peer-to-peer equipment rentals and pro services:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-idle-muted">
            <li><strong>Account & Contact Data:</strong> Name, verified email address, phone number, and service area (e.g. Frisco, Plano, Dallas).</li>
            <li><strong>Identity Verification:</strong> Driver’s license or government photo ID for high-value equipment custody approvals (processed via secure third-party verification).</li>
            <li><strong>Condition Photo Records:</strong> High-resolution photographs captured during pickup and return QR scans to verify item condition.</li>
            <li><strong>Protected In-App Messaging:</strong> Communications between renters and providers for handoff coordination.</li>
          </ul>
        </div>

        {/* Section 2 */}
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#003830] flex items-center gap-2">
            <span>2. How Location Data is Handled</span>
          </h3>
          <p>
            IDLE is built on a neighborhood-first model. Unlike traditional directories that expose homeowner or facility addresses to anonymous web scrapers:
          </p>
          <p className="p-3.5 rounded-xl bg-[#edf3f0] text-xs font-medium text-[#133c33]">
            <strong>The Approximate Radius Standard:</strong> Public search and explore listings only display general proximity circles (e.g. &ldquo;Frisco · 2.4 miles away&rdquo;). Exact handoff points or pickup addresses are revealed ONLY after a booking agreement is accepted by both parties.
          </p>
        </div>

        {/* Section 3 */}
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#003830] flex items-center gap-2">
            <span>3. Single-Use QR Custody Protocol</span>
          </h3>
          <p>
            Our cryptographic single-use QR handoff tokens prevent fraud and unauthorized custody transfers. Each scan logs the timestamp, token validity, and condition photos. These logs are stored solely to guarantee that deposits are released accurately and to provide evidence in dispute resolution.
          </p>
        </div>

        {/* Section 4 */}
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#003830] flex items-center gap-2">
            <span>4. Payments & Financial Data</span>
          </h3>
          <p>
            IDLE maintains a strict <strong>Zero Commission Policy</strong> for member transactions. All payout bank routing and credit card numbers are handled directly through Stripe Connect. IDLE servers never store, log, or have access to raw credit card numbers or banking passwords.
          </p>
        </div>

        {/* Section 5 */}
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#003830] flex items-center gap-2">
            <span>5. We Never Sell Your Data</span>
          </h3>
          <p>
            IDLE Marketplace does not sell, rent, or trade your personal information, browsing history, or negotiation threads to third-party data brokers or behavioral advertisers.
          </p>
        </div>

        {/* Section 6 */}
        <div className="space-y-2 pt-4 border-t border-idle-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-xs text-[#003830]">Questions regarding your privacy?</h4>
            <p className="text-xs text-idle-muted">Our Dallas-Fort Worth data protection officer is available for member inquiries.</p>
          </div>
          <button
            onClick={() => setRoute('contact')}
            className="emerald-gradient-btn px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm cursor-pointer flex-shrink-0"
          >
            Contact Privacy Support
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};
