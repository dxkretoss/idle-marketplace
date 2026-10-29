import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { ListingCard } from '../components/listings/ListingCard';
import { StoriesStrip } from '../components/reels/StoriesStrip';
import { ReelUploadModal } from '../components/modals/ReelUploadModal';
import { Footer } from '../components/layout/Footer';
import { 
  ShieldCheck, 
  Users, 
  Building2, 
  Play, 
  ArrowRight, 
  Sparkles,
  Crown,
  ChevronRight,
  ChevronDown,
  QrCode,
  Zap,
  CheckCircle2,
  Star,
  Quote,
  HelpCircle,
  Lock,
  Camera,
  Check,
  MapPin,
  Clock
} from 'lucide-react';

const HERO_SHOWCASES = [
  {
    id: 'cinema',
    tabLabel: 'Cinema Gear',
    category: 'Electronics',
    title: 'Sony Alpha FX3 Cinema Kit',
    subtitle: 'Full Frame 4K 120p · 24-70mm G-Master',
    price: 85,
    unit: 'day',
    rating: 4.98,
    reviews: 54,
    location: 'Plano, TX',
    owner: 'Maya Creative Studio',
    ownerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
    ownerRole: 'Verified Studio · 54 Handoffs',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    qrToken: 'CUSTODY-QR #8921',
    listingId: 2
  },
  {
    id: 'tools',
    tabLabel: 'Pro Tools',
    category: 'Tools',
    title: 'DeWalt 20V Max 6-Tool Suite',
    subtitle: 'Brushless drills, reciprocating saw, 4x 5Ah',
    price: 32,
    unit: 'day',
    rating: 4.96,
    reviews: 42,
    location: 'Frisco, TX',
    owner: 'Marcus Vance',
    ownerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
    ownerRole: 'Master Carpenter · 42 Handoffs',
    image: 'https://images.unsplash.com/photo-1504148455328-c376907d081c?auto=format&fit=crop&w=800&q=80',
    qrToken: 'CUSTODY-QR #4109',
    listingId: 1
  },
  {
    id: 'fleet',
    tabLabel: 'Machinery',
    category: 'Tools',
    title: 'Compact Excavator w/ Trailer',
    subtitle: 'Hydraulic thumb, trench bucket, full diesel',
    price: 250,
    unit: 'day',
    rating: 4.95,
    reviews: 38,
    location: 'Frisco, TX',
    owner: 'Northline Rentals',
    ownerAvatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&q=80',
    ownerRole: 'Fleet Verified · 38 Handoffs',
    image: 'https://images.unsplash.com/photo-1610477865545-37711c53144d?auto=format&fit=crop&w=800&q=80',
    qrToken: 'CUSTODY-QR #7734',
    listingId: 1
  }
];


const FAQS = [
  {
    category: 'QR Handoffs',
    question: "How does the Single-Use QR Custody Handoff work?",
    answer: "When a reservation is confirmed, IDLE generates an encrypted, single-use QR token for that specific transaction. When the owner and renter meet for pickup, both scan the code in the IDLE web app, snap 4 mandatory condition photos, and confirm handoff. This records physical custody transfer and condition photos into a permanent digital log."
  },
  {
    category: 'Pricing',
    question: "How do IDLE membership plans work?",
    answer: "IDLE offers transparent, predictable membership tiers (Free for casual search and community requests, Trade at $15/mo, and Business at $29/mo). Paid tiers unlock unlimited listings, 24-hour promotional Reels, and direct messaging."
  },
  {
    category: 'Protection',
    question: "What happens if equipment is damaged or returned late?",
    answer: "Every verified QR handoff requires timestamped condition photos at pickup and return. In the rare event of damage or late returns, the timestamped photo records and pre-authorized security deposit hold provide clear documentation for both parties to resolve the matter directly or through dispute mediation."
  },
  {
    category: 'Reels',
    question: "What are 24-Hour Reels and why do they expire?",
    answer: "Reels are short-form social video proofs recorded by local owners and verified providers. They demonstrate equipment starting up, show tools in operation, or introduce the local team. By expiring after 24 hours, you know the item shown is currently available, tested, and operating right now in your local radius."
  },
  {
    category: 'Enterprise',
    question: "Can business teams and enterprise crews use IDLE?",
    answer: "Yes! Our Enterprise Workspaces are built specifically for general contractors, rental yards, and production studios who need multi-member dispatching, sub-contractor approvals, shared toolboxes, and centralized fleet management."
  },
  {
    category: 'General',
    question: "Is IDLE available outside of North Texas?",
    answer: "We are currently operating our launch pilot in the Dallas-Fort Worth metroplex (Frisco, Plano, Dallas, Fort Worth, McKinney, Arlington, Denton, and surrounding cities) to ensure high density and fast local handoffs. Expansion to Austin and Houston is scheduled for next quarter."
  }
];

export const HomeView = () => {
  const { setRoute, setCategory, listings, setActiveListing, user, setReelsFilter } = useApp();
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [activeShowcaseId, setActiveShowcaseId] = useState('cinema');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [faqCategory, setFaqCategory] = useState('All');
  const [feedFilter, setFeedFilter] = useState('personalized'); // 'personalized' | 'all'

  const activeShowcase = HERO_SHOWCASES.find(s => s.id === activeShowcaseId) || HERO_SHOWCASES[0];

  const handleCategoryClick = (catId) => {
    setCategory(catId);
    setRoute('explore');
  };

  // User interest personalization
  const userInterests = (user?.interests && user?.interests.length > 0) ? user.interests : [];
  const hasSpecificInterests = userInterests.length > 0 && !userInterests.includes('All') && userInterests.length < 10;
  const isPersonalized = feedFilter === 'personalized' && hasSpecificInterests;

  // Filter listings according to user's selected interests
  const personalizedListings = isPersonalized
    ? listings.filter(l => userInterests.includes(l.category))
    : listings;
  const featuredListings = (personalizedListings.length > 0 ? personalizedListings : listings).slice(0, 8);

  // Prioritize categories matching user interests to the front
  const sortedCategories = [...CATEGORIES.filter(c => c.id !== 'All')].sort((a, b) => {
    const aMatch = userInterests.includes(a.id);
    const bMatch = userInterests.includes(b.id);
    if (aMatch && !bMatch) return -1;
    if (!aMatch && bMatch) return 1;
    return 0;
  });

  return (
    <div className="space-y-10">
      {/* Hero Section */}
      <section className="relative rounded-3xl overflow-hidden bg-[#073d36] min-h-[460px] lg:min-h-[500px] flex items-center shadow-glass border border-emerald-950/20 isolate">
        {/* Background Photography with Emerald Gradient Overlay */}
        <img
          src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=1800&q=85"
          alt="Local collaboration"
          className="absolute inset-0 w-full h-full object-cover object-center -z-20 opacity-35 mix-blend-luminosity"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#01231e]/98 via-[#022420]/90 to-[#00201b]/55 -z-10" />

        {/* Responsive Grid Container: Left Headline & Right Glass Showcase */}
        <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 sm:p-10 md:p-12">
          {/* Left Content */}
          <div className="lg:col-span-7 text-white space-y-4 max-w-xl">
            <span className="text-[11px] uppercase tracking-widest font-extrabold text-idle-gold block">
              The Opportunity Around You
            </span>
            <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.05]">
              Get more <br/>from what <br/>
              <span className="text-idle-goldLight italic font-normal">you own.</span>
            </h1>
            <p className="text-xs sm:text-sm md:text-base text-emerald-100/90 leading-relaxed max-w-md">
              Rent. Lend. Get help. Earn. A social-first local marketplace for equipment, skills, and business teams.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => setRoute('explore')}
                className="gold-gradient-btn px-6 py-3 rounded-xl text-xs md:text-sm font-bold shadow-lg flex items-center gap-2 cursor-pointer"
              >
                <span>Explore Marketplace</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setRoute('reels')}
                className="px-5 py-3 rounded-xl text-xs md:text-sm font-bold bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all flex items-center gap-2 cursor-pointer"
              >
                <Play className="w-4 h-4 text-idle-gold fill-idle-gold" />
                <span>Watch Reels</span>
              </button>
            </div>
          </div>

          {/* Right Showcase Card (Desktop & Tablet) */}
          <div className="lg:col-span-5 hidden lg:flex justify-end">
            <div className="relative w-full max-w-[390px] xl:max-w-[410px]">
              {/* Soft Ambient Backglow */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-idle-gold/30 via-emerald-400/20 to-amber-500/15 rounded-[34px] blur-xl opacity-60 pointer-events-none" />

              {/* Floating Top Badge */}
              <div className="absolute -top-3.5 left-5 z-20 px-3.5 py-1 rounded-full bg-[#022822] border border-idle-gold/60 shadow-xl flex items-center gap-1.5 text-[11px] font-extrabold text-idle-goldLight tracking-wide">
                <Zap className="w-3.5 h-3.5 text-idle-gold fill-idle-gold" />
                <span>Verified Members · Direct P2P</span>
              </div>

              {/* Floating Bottom Badge */}
              <div className="absolute -bottom-3.5 right-5 z-20 px-3.5 py-1 rounded-full bg-[#02251f] border border-emerald-400/40 shadow-xl flex items-center gap-1.5 text-[10px] font-bold text-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-idle-gold" />
                <span>Verified Photo Stamping</span>
              </div>

              {/* Main Frosted Glass Card */}
              <div className="relative rounded-3xl bg-gradient-to-b from-[#00362f]/95 via-[#002722]/95 to-[#001c18]/98 p-5 border border-white/20 shadow-[0_24px_55px_rgba(0,18,15,0.7)] backdrop-blur-2xl text-white space-y-3.5">
                {/* Header Bar */}
                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>
                    </span>
                    <span className="text-[11px] font-extrabold uppercase tracking-wider text-emerald-200">
                      DFW Live Handoff
                    </span>
                  </div>
                  <span className="text-[10px] text-idle-gold font-extrabold px-2.5 py-0.5 rounded-full bg-idle-gold/15 border border-idle-gold/30 flex items-center gap-1">
                    <ShieldCheck className="w-3 h-3 text-idle-gold" />
                    <span>Instant Escrow</span>
                  </span>
                </div>

                {/* Interactive Showcase Tabs */}
                <div className="grid grid-cols-3 gap-1.5 p-1 rounded-2xl bg-black/35 border border-white/10">
                  {HERO_SHOWCASES.map(item => (
                    <button
                      key={item.id}
                      onClick={() => setActiveShowcaseId(item.id)}
                      className={`py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all text-center truncate cursor-pointer ${
                        activeShowcaseId === item.id
                          ? 'bg-gradient-to-r from-idle-gold to-[#c99739] text-[#002822] shadow-sm font-extrabold'
                          : 'text-emerald-100/70 hover:text-white hover:bg-white/5'
                      }`}
                    >
                      {item.tabLabel}
                    </button>
                  ))}
                </div>

                {/* Media Preview with Overlaid Details */}
                <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-black/40 group">
                  <img
                    src={activeShowcase.image}
                    alt={activeShowcase.title}
                    className="w-full h-32 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/10" />

                  {/* Location Tag */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-[10px] font-bold text-emerald-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>{activeShowcase.location}</span>
                  </div>

                  {/* Price Tag */}
                  <div className="absolute top-2.5 right-2.5 px-3 py-1 rounded-xl bg-[#003830]/90 backdrop-blur-md border border-idle-gold/40 shadow-lg text-right">
                    <div className="text-[13px] font-extrabold text-idle-gold leading-none">
                      ${activeShowcase.price}
                      <span className="text-[10px] text-white/80 font-normal">/{activeShowcase.unit}</span>
                    </div>
                  </div>

                  {/* Owner Bar on Image Bottom */}
                  <div className="absolute bottom-2.5 left-2.5 right-2.5 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={activeShowcase.ownerAvatar}
                        alt={activeShowcase.owner}
                        className="w-7 h-7 rounded-full object-cover border-2 border-idle-gold/70"
                      />
                      <div>
                        <div className="text-[12px] font-bold text-white leading-tight flex items-center gap-1">
                          <span className="truncate max-w-[130px]">{activeShowcase.owner}</span>
                          <CheckCircle2 className="w-3.5 h-3.5 text-idle-gold flex-shrink-0" />
                        </div>
                        <span className="text-[10px] text-emerald-200/80">{activeShowcase.ownerRole}</span>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 px-2 py-0.5 rounded-lg bg-black/50 text-idle-gold text-[10px] font-bold border border-white/10 flex-shrink-0">
                      <Star className="w-3 h-3 fill-idle-gold text-idle-gold" />
                      <span>{activeShowcase.rating}</span>
                    </span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <div>
                  <h4 className="font-bold text-sm text-white leading-tight truncate">{activeShowcase.title}</h4>
                  <p className="text-[11px] text-emerald-200/75 mt-0.5 truncate">{activeShowcase.subtitle}</p>
                </div>

                {/* Single-Use QR Handoff Protocol Demonstration */}
                <div className="p-2.5 rounded-2xl bg-[#001f1a]/95 border border-idle-gold/30 shadow-inner flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    {/* High-fidelity Vector QR Stamp */}
                    <div className="w-11 h-11 rounded-xl bg-white p-1 flex items-center justify-center flex-shrink-0 shadow-md">
                      <svg viewBox="0 0 24 24" className="w-9 h-9 text-[#002621]" fill="currentColor">
                        <path d="M2 2h7v7H2V2zm2 2v3h3V4H4zm11-2h7v7h-7V2zm2 2v3h3V4h-3zM2 15h7v7H2v-7zm2 2v3h3v-3H4zm7-13h2v2h-2V4zm2 2h2v2h-2V6zm-2 2h2v2h-2V8zm4 0h2v2h-2V8zm2 2h2v2h-2v-2zm-6 3h2v2h-2v-2zm2 2h2v2h-2v-2zm2-2h2v2h-2v-2zm2 2h2v2h-2v-2zm-4 4h2v2h-2v-2zm2 2h2v2h-2v-2zm2-2h2v2h-2v-2zm2 2h2v2h-2v-2z" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[11px] font-extrabold text-white">Single-Use QR Handoff</span>
                        <span className="px-1.5 py-0.2 rounded bg-emerald-500/20 text-emerald-300 text-[9px] font-bold">Active</span>
                      </div>
                      <span className="text-[10px] font-mono text-idle-gold block mt-0.5">{activeShowcase.qrToken}</span>
                      <span className="text-[9px] text-emerald-300/75 block truncate">Verified photos & condition lock at pickup</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-[11px] font-black text-emerald-300 block">$0 Fee</span>
                    <span className="text-[9px] text-emerald-200/60 block">Keep 100%</span>
                  </div>
                </div>

                {/* Direct Action CTAs */}
                <div className="grid grid-cols-2 gap-2 pt-0.5">
                  <button
                    onClick={() => {
                      const targetListing = listings.find(l => l.id === activeShowcase.listingId) || listings[0];
                      if (setActiveListing) {
                        setActiveListing(targetListing);
                      } else {
                        setRoute('explore');
                      }
                    }}
                    className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-idle-gold to-[#c49233] text-[#002621] text-xs font-bold shadow-md hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>View Listing</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setRoute('reels')}
                    className="w-full py-2.5 px-3 rounded-xl bg-white/10 hover:bg-white/15 border border-white/20 text-white text-xs font-bold backdrop-blur-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 text-idle-gold" />
                    <span>Watch Reels</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Disclaimer note */}
        <div className="absolute right-6 bottom-3 text-[10px] text-emerald-200/50 hidden sm:block">
          DFW Pilot Launch Prototype · North Texas
        </div>
      </section>

      {/* Trust & Metric Ribbon - Distinct from original flat design */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 -mt-3">
        <div className="p-4 rounded-2xl bg-white border border-[#dce6e0] shadow-sm flex items-center gap-3.5 group hover:border-idle-emerald/40 hover:shadow-md transition-all">
          <div className="p-2.5 rounded-xl bg-idle-mint text-idle-emerald group-hover:scale-110 transition-transform flex-shrink-0">
            <Zap className="w-5 h-5 text-idle-emerald" />
          </div>
          <div className="min-w-0">
            <div className="text-sm sm:text-base font-extrabold text-[#003d36] leading-tight truncate">Direct P2P</div>
            <div className="text-[11px] text-idle-muted mt-0.5 leading-tight truncate">Connect with verified locals</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#dce6e0] shadow-sm flex items-center gap-3.5 group hover:border-idle-emerald/40 hover:shadow-md transition-all">
          <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 group-hover:scale-110 transition-transform flex-shrink-0">
            <ShieldCheck className="w-5 h-5 text-idle-gold" />
          </div>
          <div className="min-w-0">
            <div className="text-sm sm:text-base font-extrabold text-[#003d36] leading-tight truncate">User Due Diligence</div>
            <div className="text-[11px] text-idle-muted mt-0.5 leading-tight truncate">Direct verification & ratings</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#dce6e0] shadow-sm flex items-center gap-3.5 group hover:border-idle-emerald/40 hover:shadow-md transition-all">
          <div className="p-2.5 rounded-xl bg-emerald-50 text-idle-emerald group-hover:scale-110 transition-transform flex-shrink-0">
            <QrCode className="w-5 h-5 text-idle-emerald" />
          </div>
          <div className="min-w-0">
            <div className="text-sm sm:text-base font-extrabold text-[#003d36] leading-tight truncate">Single-Use QR Pass</div>
            <div className="text-[11px] text-idle-muted mt-0.5 leading-tight truncate">Condition photo locked</div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#dce6e0] shadow-sm flex items-center gap-3.5 group hover:border-idle-emerald/40 hover:shadow-md transition-all">
          <div className="p-2.5 rounded-xl bg-teal-50 text-teal-700 group-hover:scale-110 transition-transform flex-shrink-0">
            <Play className="w-5 h-5 text-teal-700 fill-teal-700" />
          </div>
          <div className="min-w-0">
            <div className="text-sm sm:text-base font-extrabold text-[#003d36] leading-tight truncate">24h Video Proofs</div>
            <div className="text-[11px] text-idle-muted mt-0.5 leading-tight truncate">See gear run live in DFW</div>
          </div>
        </div>
      </section>

      {/* 24-Hour Reels Stories Strip */}
      <section>
        <StoriesStrip
          onOpenUpload={() => setUploadModalOpen(true)}
          onSelectCategory={(cat) => {
            if (setReelsFilter) setReelsFilter(cat);
            setRoute('reels');
          }}
        />
      </section>

      {/* How IDLE Works: The Single-Use QR Protocol */}
      <section className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#00332c] via-[#002722] to-[#001d19] text-white shadow-xl border border-white/10 relative overflow-hidden isolate">
        <div className="absolute top-0 right-0 w-80 h-80 bg-idle-gold/10 rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-xl space-y-2 mb-8">
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-idle-gold block">
            The IDLE Standard
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold">
            How Single-Use QR Custody Works
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100/80 leading-relaxed">
            Unlike anonymous Craigslist meetups or rental yard paper receipts, IDLE gives local owners and renters a frictionless, tamper-proof exchange.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Step 1 */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3 group hover:border-idle-gold/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl font-bold text-idle-gold/90">01</span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-idle-gold/20 text-idle-gold border border-idle-gold/30">
                0% Fee Discovery
              </span>
            </div>
            <h3 className="font-bold text-base text-white">Find & Reserve Locally</h3>
            <p className="text-xs text-emerald-200/75 leading-relaxed">
              Browse tools, camera kits, and machinery in your radius. Watch 24h video proofs and chat directly with verified neighbors.
            </p>
          </div>

          {/* Step 2 */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3 group hover:border-emerald-400/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl font-bold text-idle-gold/90">02</span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                Photo Stamping
              </span>
            </div>
            <h3 className="font-bold text-base text-white">Scan Single-Use QR at Pickup</h3>
            <p className="text-xs text-emerald-200/75 leading-relaxed">
              Meet in person and scan the encrypted QR pass. Both parties capture 4 condition photos to verify physical item condition and record custody handoff.
            </p>
          </div>

          {/* Step 3 */}
          <div className="p-5 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md space-y-3 group hover:border-idle-gold/50 transition-all">
            <div className="flex items-center justify-between">
              <span className="font-serif text-2xl font-bold text-idle-gold/90">03</span>
              <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-idle-gold/20 text-idle-gold border border-idle-gold/30">
                Auto-Release
              </span>
            </div>
            <h3 className="font-bold text-base text-white">Return & Complete Transfer</h3>
            <p className="text-xs text-emerald-200/75 leading-relaxed">
              Scan the return token at drop-off. Security deposit holds release and completed payment transfers directly to the provider.
            </p>
          </div>
        </div>
      </section>

      {/* Shop by Category Tiles */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
              Make More Possible
            </span>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#082f2c] flex items-center gap-2">
              <span className="w-1.5 h-5 rounded-full bg-idle-emerald inline-block" />
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => {
              setCategory('All');
              setRoute('explore');
            }}
            className="text-xs font-bold text-idle-emerald hover:text-idle-teal transition-colors flex items-center gap-1"
          >
            <span>All categories</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
          {sortedCategories.map((cat) => {
            const isPreferred = hasSpecificInterests && userInterests.includes(cat.id);
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryClick(cat.id)}
                className={`glass-card glass-card-hover p-2.5 rounded-2xl flex flex-col text-left group overflow-hidden relative cursor-pointer ${
                  isPreferred ? 'border-idle-emerald/40 bg-idle-mint/20' : ''
                }`}
              >
                <div className="h-28 rounded-xl overflow-hidden bg-emerald-950/10 mb-2 relative">
                  <img
                    src={cat.image}
                    alt={cat.label}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  {isPreferred && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-[#003d36]/90 backdrop-blur-xs text-[9px] font-bold text-idle-gold border border-idle-gold/40 shadow-xs flex items-center gap-1">
                      <span>★</span>
                      <span>Preferred</span>
                    </span>
                  )}
                </div>
                <strong className="text-xs font-bold text-[#112d26] group-hover:text-idle-emerald line-clamp-1">
                  {cat.label}
                </strong>
                <p className="text-[10px] text-idle-muted line-clamp-1 mt-0.5">
                  {cat.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Featured Listings Grid */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
                Curated for Discovery
              </span>
              {hasSpecificInterests && isPersonalized && (
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-idle-mint text-idle-emerald font-bold border border-idle-emerald/20">
                  Tailored to your interests
                </span>
              )}
            </div>
            <h2 className="font-serif text-xl md:text-2xl font-bold text-[#082f2c] flex items-center gap-2 mt-0.5">
              <span className="w-1.5 h-5 rounded-full bg-idle-emerald inline-block" />
              {isPersonalized ? 'Recommended for You' : 'Featured Near You'}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {hasSpecificInterests && (
              <div className="flex items-center p-1 bg-white border border-[#dce6e0] rounded-xl shadow-xs text-xs">
                <button
                  type="button"
                  onClick={() => setFeedFilter('personalized')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    isPersonalized
                      ? 'bg-idle-emerald text-white shadow-xs'
                      : 'text-idle-muted hover:text-[#172d28]'
                  }`}
                >
                  My Interests ({userInterests.length})
                </button>
                <button
                  type="button"
                  onClick={() => setFeedFilter('all')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                    !isPersonalized
                      ? 'bg-idle-emerald text-white shadow-xs'
                      : 'text-idle-muted hover:text-[#172d28]'
                  }`}
                >
                  All Items
                </button>
              </div>
            )}

            <button
              onClick={() => setRoute('explore')}
              className="text-xs font-bold text-idle-emerald hover:text-idle-teal transition-colors flex items-center gap-1 cursor-pointer"
            >
              <span>View all listings</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {featuredListings.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </section>

      {/* Promotional Triple Panels */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div 
          onClick={() => {
            setCategory('Tools');
            setRoute('explore');
          }}
          className="glass-card glass-card-hover p-5 rounded-2xl cursor-pointer relative overflow-hidden group flex flex-col justify-between min-h-[160px]"
        >
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-idle-gold tracking-wider">Heavy Equipment</span>
            <h3 className="font-serif text-lg font-bold text-[#0d2e29]">Fleet, Tools & Machinery</h3>
            <p className="text-xs text-idle-muted">High-grade rentals, skid steers, trailers, and site tools.</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-idle-emerald pt-3">
            <span>Browse equipment</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div 
          onClick={() => {
            setCategory('Services');
            setRoute('explore');
          }}
          className="glass-card glass-card-hover p-5 rounded-2xl cursor-pointer relative overflow-hidden group flex flex-col justify-between min-h-[160px]"
        >
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-idle-gold tracking-wider">Trusted Skills</span>
            <h3 className="font-serif text-lg font-bold text-[#0d2e29]">Meet Local Pros & Crews</h3>
            <p className="text-xs text-idle-muted">Handymen, personal trainers, moving crews & stylists near you.</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-idle-emerald pt-3">
            <span>Find local experts</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        <div 
          onClick={() => {
            setCategory('Events');
            setRoute('explore');
          }}
          className="glass-card glass-card-hover p-5 rounded-2xl cursor-pointer relative overflow-hidden group flex flex-col justify-between min-h-[160px]"
        >
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-idle-gold tracking-wider">Events & Pop-ups</span>
            <h3 className="font-serif text-lg font-bold text-[#0d2e29]">Occasions & Experiences</h3>
            <p className="text-xs text-idle-muted">Tents, cinema gear, audio systems & catering pop-up trailers.</p>
          </div>
          <div className="flex items-center gap-1 text-xs font-bold text-idle-emerald pt-3">
            <span>Browse event rentals</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </section>

      {/* Membership Banner */}
      <section className="rounded-3xl p-6 md:p-8 bg-gradient-to-r from-[#003d36] via-[#004f46] to-[#0c6559] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl border border-white/10">
        <div className="space-y-2 max-w-xl">
          <span className="text-[10px] uppercase font-extrabold tracking-widest text-idle-gold block">
            Flexible Membership Tiers
          </span>
          <h2 className="font-serif text-2xl md:text-3xl font-bold">
            Browse free. Earn with Trade.
          </h2>
          <p className="text-xs md:text-sm text-emerald-100/90 leading-relaxed">
            Free members can search and submit requests. Unlock unlimited listings, 24h promotional Reels, and direct paid member chat starting at $15/month with full directory and networking tools.
          </p>
        </div>
        <button
          onClick={() => setRoute('membership')}
          className="gold-gradient-btn px-6 py-3 rounded-xl text-xs md:text-sm font-bold shadow-lg flex-shrink-0 flex items-center gap-2 cursor-pointer"
        >
          <Crown className="w-4 h-4 stroke-[2.2]" />
          <span>Compare Memberships</span>
        </button>
      </section>

      {/* ================= FAQS SECTION ================= */}
      <section className="space-y-6 pt-4">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
            Clear & Transparent Answers
          </span>
          <h2 className="font-serif text-2xl sm:text-4xl font-bold text-[#082f2c]">
            Frequently Asked Questions
          </h2>
          <p className="text-xs sm:text-sm text-idle-muted leading-relaxed">
            Everything you need to know about Single-Use QR Handoffs, membership options, and custody verifications.
          </p>

          {/* FAQ Category Pills */}
          <div className="flex flex-wrap items-center justify-center gap-1.5 pt-3">
            {['All', 'QR Handoffs', 'Pricing', 'Protection', 'Reels', 'Enterprise'].map((cat) => (
              <button
                key={cat}
                onClick={() => setFaqCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                  faqCategory === cat
                    ? 'bg-idle-emerald text-white shadow-sm'
                    : 'bg-white border border-[#dce6e0] text-[#172d28] hover:bg-idle-mint'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQs Accordion Container */}
        <div className="max-w-3xl mx-auto space-y-3">
          {FAQS
            .filter(f => faqCategory === 'All' || f.category === faqCategory)
            .map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className={`rounded-2xl transition-all border ${
                    isOpen 
                      ? 'bg-white border-idle-emerald/40 shadow-md ring-1 ring-idle-emerald/10' 
                      : 'bg-white/80 hover:bg-white border-[#dce6e0] shadow-sm'
                  }`}
                >
                  <button
                    onClick={() => setOpenFaqIndex(isOpen ? -1 : index)}
                    className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors ${
                        isOpen ? 'bg-idle-mint text-idle-emerald' : 'bg-[#f0f4f1] text-idle-muted'
                      }`}>
                        <HelpCircle className="w-4 h-4" />
                      </div>
                      <span className="font-bold text-xs sm:text-sm text-[#003d36] leading-snug">
                        {faq.question}
                      </span>
                    </div>
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 bg-idle-mint text-idle-emerald' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-idle-muted leading-relaxed border-t border-idle-line/60">
                      <p className="mt-2 text-[#24453d] font-normal leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
        </div>

        {/* Support Callout Box */}
        <div className="max-w-3xl mx-auto p-4 sm:p-5 rounded-2xl bg-gradient-to-r from-idle-mint/60 via-white to-amber-50/50 border border-idle-emerald/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="space-y-0.5">
            <h4 className="text-xs sm:text-sm font-bold text-[#003d36]">Have a specific equipment or fleet question?</h4>
            <p className="text-[11px] text-idle-muted">Our Dallas-Fort Worth pilot team is online to assist with custody verifications.</p>
          </div>
          <button
            onClick={() => setRoute('explore')}
            className="px-4 py-2 rounded-xl bg-idle-emerald hover:bg-forest-light text-white text-xs font-bold transition-all flex-shrink-0 shadow-sm cursor-pointer"
          >
            Explore Marketplace
          </button>
        </div>
      </section>

      {/* ================= COMPREHENSIVE FOOTER ================= */}
      <Footer />

      {/* Reel Upload Modal */}
      <ReelUploadModal
        isOpen={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
      />
    </div>
  );
};
