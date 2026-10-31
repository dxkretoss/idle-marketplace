import React from 'react';
import { useApp } from '../context/AppContext';
import { Footer } from '../components/layout/Footer';
import { 
  ShieldCheck, 
  Scale, 
  CheckCircle2, 
  QrCode, 
  Zap, 
  AlertCircle,
  FileCheck
} from 'lucide-react';

export const TermsView = () => {
  const { setRoute } = useApp();

  return (
    <div className="space-y-8 w-full">
      {/* Header Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#003831] via-[#002f28] to-[#00201b] text-white p-6 sm:p-10 shadow-glass border border-emerald-950/20 isolate">
        <div className="absolute top-0 right-0 w-80 h-80 bg-idle-gold/15 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-2xl space-y-2">
          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-idle-gold block">
            IDLE Marketplace Member Agreement
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
            Please read these terms carefully before listing equipment, hiring local pros, or participating in the North Texas pilot exchange.
          </p>
        </div>
      </section>

      {/* Terms Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="glass-card p-4 rounded-2xl border border-idle-emerald/20 space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-idle-mint text-idle-emerald flex items-center justify-center">
            <QrCode className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-[#0e352e]">QR Custody Handoff</h4>
          <p className="text-[11px] text-idle-muted leading-relaxed">
            Legal custody and escrow release occur solely upon the scanning of the encrypted single-use QR token.
          </p>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-idle-emerald/20 space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-amber-50 text-idle-gold flex items-center justify-center">
            <Zap className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-[#0e352e]">0% Platform Cut</h4>
          <p className="text-[11px] text-idle-muted leading-relaxed">
            IDLE never takes 15%–30% cuts of your transaction value. Standard Stripe processing fees apply directly.
          </p>
        </div>

        <div className="glass-card p-4 rounded-2xl border border-idle-emerald/20 space-y-1.5">
          <div className="w-8 h-8 rounded-lg bg-emerald-50 text-idle-emerald flex items-center justify-center">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="font-bold text-xs text-[#0e352e]">$25,000 Protection</h4>
          <p className="text-[11px] text-idle-muted leading-relaxed">
            Verified members are backed by equipment protection guarantee when condition photo protocol is completed.
          </p>
        </div>
      </div>

      {/* Structured Clauses */}
      <div className="glass-card p-6 sm:p-8 rounded-3xl border border-idle-line shadow-sm space-y-8 text-xs sm:text-sm text-[#24453d] leading-relaxed">
        {/* Clause 1 */}
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#003830]">1. Pilot Agreement & Eligibility</h3>
          <p>
            By accessing or using IDLE Marketplace (&ldquo;IDLE&rdquo; or the &ldquo;Platform&rdquo;), you agree to be bound by these Terms of Service. You must be at least 18 years of age and legally authorized to enter binding contracts in the State of Texas. Commercial equipment rentals may require active general liability insurance.
          </p>
        </div>

        {/* Clause 2 */}
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#003830]">2. The Peer-to-Peer Nature of Transactions</h3>
          <p>
            IDLE provides the software infrastructure, identity verifications, and single-use QR handoff protocol. IDLE is not an equipment leasing company or employer of local service professionals. All rental agreements and services are executed directly between the provider (&ldquo;Lender&rdquo;) and the recipient (&ldquo;Renter&rdquo;).
          </p>
        </div>

        {/* Clause 3 */}
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#003830]">3. Single-Use QR Custody Protocol</h3>
          <p>
            To prevent fraud, theft, and false damage claims:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-idle-muted">
            <li><strong>Pickup Scan:</strong> Custody begins when the Renter scans the Lender’s single-use QR token at the meeting location.</li>
            <li><strong>Photo Stamping:</strong> Both parties must photograph the physical condition of the item from 4 angles during the pickup window.</li>
            <li><strong>Return Scan:</strong> Custody ends and security deposits are released when the Lender scans the return QR token upon inspection.</li>
          </ul>
        </div>

        {/* Clause 4 */}
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#003830]">4. Zero Commission & Subscriptions</h3>
          <p>
            IDLE charges zero percent (0%) marketplace commissions on equipment rentals and pro services. Members subscribe to tiered memberships (Free Member with standard limits, Studio at $29/month, Studio Pro at $59/month, Business at $149/month, and Enterprise at $399/month). Subscription fees are billed monthly through Stripe and may be cancelled at any time before the next billing cycle.
          </p>
        </div>

        {/* Clause 5 */}
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#003830]">5. Security Deposits & Damage Guarantee</h3>
          <p>
            Security deposits are held in pre-authorized escrow during active bookings. In the event of documented damage or unreturned items:
          </p>
          <p className="p-3.5 rounded-xl bg-[#edf3f0] text-xs font-medium text-[#133c33]">
            <strong>Dispute Adjudication:</strong> If an item is returned damaged, the Lender must file a dispute within 24 hours via the IDLE Resolution Desk with comparison pickup/return photos. IDLE reviews records and authorizes deposit forfeiture or coverage under our $25,000 community guarantee.
          </p>
        </div>

        {/* Clause 6 */}
        <div className="space-y-2">
          <h3 className="font-serif text-lg font-bold text-[#003830]">6. Governing Law</h3>
          <p>
            These Terms shall be governed by and construed in accordance with the laws of the State of Texas, without regard to conflict of law principles. Any legal proceeding shall be conducted in Collin County or Dallas County, Texas.
          </p>
        </div>

        {/* Clause 7 */}
        <div className="space-y-2 pt-4 border-t border-idle-line flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h4 className="font-bold text-xs text-[#003830]">Need clarification on terms or agreements?</h4>
            <p className="text-xs text-idle-muted">Our pilot team is happy to guide you through membership rights.</p>
          </div>
          <button
            onClick={() => setRoute('contact')}
            className="emerald-gradient-btn px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm cursor-pointer flex-shrink-0"
          >
            Contact Support Desk
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};
