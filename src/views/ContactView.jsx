import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Footer } from '../components/layout/Footer';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  ShieldCheck, 
  CheckCircle2, 
  MessageSquare,
  HelpCircle,
  Sparkles,
  QrCode,
  AlertCircle
} from 'lucide-react';

export const ContactView = () => {
  const { setRoute, addToast, user, isAuthenticated } = useApp();

  const [formData, setFormData] = useState({
    name: isAuthenticated ? user.name : '',
    email: isAuthenticated ? user.email : '',
    category: 'booking',
    urgency: 'normal',
    referenceId: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [ticketId, setTicketId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      addToast('Please complete all required fields', 'error');
      return;
    }

    const generatedTicket = `IDLE-${Math.floor(100000 + Math.random() * 900000)}`;
    setTicketId(generatedTicket);
    setSubmitted(true);
    addToast(`Support request ${generatedTicket} submitted successfully!`, 'success');
  };

  const handleReset = () => {
    setSubmitted(false);
    setFormData({
      name: isAuthenticated ? user.name : '',
      email: isAuthenticated ? user.email : '',
      category: 'booking',
      urgency: 'normal',
      referenceId: '',
      message: ''
    });
  };

  return (
    <div className="space-y-8 w-full">
      {/* Header Banner */}
      <section className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#003831] via-[#002f28] to-[#00201b] text-white p-6 sm:p-10 shadow-glass border border-emerald-950/20 isolate">
        <div className="absolute top-0 right-0 w-80 h-80 bg-idle-gold/15 rounded-full blur-3xl pointer-events-none -z-10" />
        
        <div className="max-w-2xl space-y-2">
          <span className="text-[10px] sm:text-[11px] font-extrabold uppercase tracking-widest text-idle-gold block">
            DFW Pilot Support & Resolution Desk
          </span>
          <h1 className="font-serif text-2xl sm:text-4xl font-bold tracking-tight text-white">
            We’re here to help you trade with confidence.
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
            Our North Texas pilot operations team is online 7 days a week to support equipment pickups, single-use QR custody verifications, dispute escrow releases, and business fleet onboarding.
          </p>
        </div>
      </section>

      {/* Quick Contact Channel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Card 1: Urgent Handoff Line */}
        <div className="glass-card p-5 rounded-2xl border border-idle-emerald/20 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-idle-mint text-idle-emerald flex items-center justify-center shadow-sm">
              <Phone className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#003830]">Live Handoff Dispatch</h3>
            <p className="text-xs text-idle-muted leading-relaxed">
              For active item pickups, return verifications, or emergency condition disputes in progress.
            </p>
          </div>
          <div className="pt-2 border-t border-idle-line">
            <span className="text-xs font-bold text-idle-emerald block">+1 (214) 555-4353</span>
            <span className="text-[10px] text-idle-muted">7:00 AM – 9:00 PM CST · Daily</span>
          </div>
        </div>

        {/* Card 2: Email Resolution Desk */}
        <div className="glass-card p-5 rounded-2xl border border-idle-emerald/20 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-amber-50 text-idle-gold flex items-center justify-center shadow-sm">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#003830]">Support & Verification</h3>
            <p className="text-xs text-idle-muted leading-relaxed">
              Listing approvals, Trade membership questions, and Stripe Connect payout support.
            </p>
          </div>
          <div className="pt-2 border-t border-idle-line">
            <span className="text-xs font-bold text-idle-emerald block">support@idle-marketplace.com</span>
            <span className="text-[10px] text-idle-muted">Typical response within 2 hours</span>
          </div>
        </div>

        {/* Card 3: Pilot Hub Office */}
        <div className="glass-card p-5 rounded-2xl border border-idle-emerald/20 flex flex-col justify-between space-y-3">
          <div className="space-y-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-idle-emerald flex items-center justify-center shadow-sm">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-base font-bold text-[#003830]">DFW Regional Pilot Hub</h3>
            <p className="text-xs text-idle-muted leading-relaxed">
              Operating across Frisco, Plano, McKinney, and greater Dallas-Fort Worth metro area.
            </p>
          </div>
          <div className="pt-2 border-t border-idle-line">
            <span className="text-xs font-bold text-idle-emerald block">North Texas Coverage Hub</span>
            <span className="text-[10px] text-idle-muted">Frisco & Plano, TX</span>
          </div>
        </div>
      </div>

      {/* Main Form & FAQs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Contact Form */}
        <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-3xl border border-idle-line shadow-sm">
          {submitted ? (
            <div className="text-center py-10 space-y-4">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-idle-emerald flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-[#003830]">Support Ticket Created</h3>
                <p className="text-xs text-idle-muted max-w-sm mx-auto">
                  Your ticket reference is <strong className="text-idle-emerald font-bold">{ticketId}</strong>. A North Texas support specialist has received your inquiry.
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-[#edf3f0] text-xs text-[#21433c] text-left max-w-sm mx-auto space-y-1">
                <p><strong>From:</strong> {formData.name} ({formData.email})</p>
                <p><strong>Category:</strong> {formData.category}</p>
                <p><strong>Urgency:</strong> {formData.urgency.toUpperCase()}</p>
              </div>
              <button
                onClick={handleReset}
                className="gold-gradient-btn px-6 py-2.5 rounded-xl text-xs font-bold shadow-md cursor-pointer"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1 mb-4">
                <h2 className="font-serif text-xl font-bold text-[#003830]">Send a Message to Support</h2>
                <p className="text-xs text-idle-muted">
                  Fill out the form below and our pilot dispatch team will respond promptly.
                </p>
              </div>

              {/* Name & Email Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1a3832] mb-1">
                    Your Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d2e0d8] bg-[#edf3f0] focus:bg-white focus:border-idle-emerald text-xs outline-none transition-all"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1a3832] mb-1">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d2e0d8] bg-[#edf3f0] focus:bg-white focus:border-idle-emerald text-xs outline-none transition-all"
                  />
                </div>
              </div>

              {/* Category & Urgency Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#1a3832] mb-1">
                    Topic / Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d2e0d8] bg-[#edf3f0] focus:bg-white focus:border-idle-emerald text-xs outline-none transition-all cursor-pointer"
                  >
                    <option value="booking">Active Booking & QR Handoff</option>
                    <option value="listing">Listing & Condition Photo Verification</option>
                    <option value="payouts">Stripe Connect & Payouts</option>
                    <option value="membership">Trade / Business Membership Plan</option>
                    <option value="enterprise">Enterprise Fleet & Team Workspace</option>
                    <option value="safety">Trust, Security & Damage Guarantee</option>
                    <option value="general">General Feedback or Question</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#1a3832] mb-1">
                    Urgency Level
                  </label>
                  <select
                    value={formData.urgency}
                    onChange={(e) => setFormData({ ...formData, urgency: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#d2e0d8] bg-[#edf3f0] focus:bg-white focus:border-idle-emerald text-xs outline-none transition-all cursor-pointer"
                  >
                    <option value="normal">Normal (Within 2-4 hours)</option>
                    <option value="high">High (Active pickup today)</option>
                    <option value="urgent">Urgent (Custody dispute in progress)</option>
                  </select>
                </div>
              </div>

              {/* Reference ID (Optional) */}
              <div>
                <label className="block text-xs font-bold text-[#1a3832] mb-1">
                  Booking ID or Listing Title <span className="text-[10px] text-idle-muted font-normal">(Optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.referenceId}
                  onChange={(e) => setFormData({ ...formData, referenceId: e.target.value })}
                  placeholder="e.g. BK-8901 or Compact Excavator"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d2e0d8] bg-[#edf3f0] focus:bg-white focus:border-idle-emerald text-xs outline-none transition-all"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold text-[#1a3832] mb-1">
                  How can we help? <span className="text-red-500">*</span>
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Please describe your question or issue in detail..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#d2e0d8] bg-[#edf3f0] focus:bg-white focus:border-idle-emerald text-xs outline-none transition-all resize-none"
                />
              </div>

              <button
                type="submit"
                className="emerald-gradient-btn w-full py-3 rounded-xl text-xs font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Support Ticket</span>
              </button>
            </form>
          )}
        </div>

        {/* Right: Quick Answers & Platform Policies */}
        <div className="lg:col-span-5 space-y-4">
          <div className="glass-card p-6 rounded-3xl border border-idle-line space-y-4">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-idle-emerald" />
              <h3 className="font-serif text-base font-bold text-[#003830]">Quick Resolution Guide</h3>
            </div>

            <div className="space-y-3 text-xs text-idle-muted leading-relaxed">
              <div className="p-3 rounded-2xl bg-[#edf3f0] space-y-1">
                <h4 className="font-bold text-[#143a33] flex items-center gap-1.5">
                  <QrCode className="w-3.5 h-3.5 text-idle-emerald" />
                  <span>How does single-use QR handoff work?</span>
                </h4>
                <p className="text-[11px] text-[#294c44]">
                  Neither party can claim custody without scanning the one-time cryptographic QR token at pickup. When scanned, escrow locks in place and condition photos are permanently stamped.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#edf3f0] space-y-1">
                <h4 className="font-bold text-[#143a33] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-idle-gold" />
                  <span>Zero-Commission Policy</span>
                </h4>
                <p className="text-[11px] text-[#294c44]">
                  IDLE never takes 15-30% cuts like other rental platforms. Members keep 100% of their earnings with flat $15/mo Trade memberships.
                </p>
              </div>

              <div className="p-3 rounded-2xl bg-[#edf3f0] space-y-1">
                <h4 className="font-bold text-[#143a33] flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-amber-600" />
                  <span>What if an item is returned damaged?</span>
                </h4>
                <p className="text-[11px] text-[#294c44]">
                  Every booking requires pickup photo stamping. In the rare event of damage, our Dallas-Fort Worth pilot team reviews before/after stamps to release security deposits or trigger the $25,000 guarantee.
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs font-bold text-idle-emerald">
              <button 
                onClick={() => setRoute('terms')}
                className="hover:underline cursor-pointer"
              >
                Read Terms of Service &rarr;
              </button>
              <button 
                onClick={() => setRoute('privacy')}
                className="hover:underline cursor-pointer"
              >
                Privacy Policy &rarr;
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
