import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { AuthGate } from '../components/common/AuthGate';
import { INITIAL_LISTINGS } from '../data/mockData';
import {
  MessageSquare,
  Send,
  ShieldCheck,
  Sparkles,
  ArrowRight,
  Lock,
  User,
  QrCode,
  Search,
  CheckCheck,
  Paperclip,
  Image as ImageIcon,
  X,
  Star,
  MapPin,
  Clock,
  ExternalLink,
  Check,
  Info,
  Calendar,
  ThumbsUp,
  Award,
  Crown
} from 'lucide-react';

const PROVIDER_AVATARS = {
  'th-1': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80', // Northline Rentals - Marcus Chen
  'th-2': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', // Avery Style Collective - Avery Brooks
  'Northline Rentals': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  'Avery Style Collective': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
};

const PROVIDER_PROFILES = {
  'Northline Rentals': {
    name: 'Northline Rentals',
    contactPerson: 'Marcus Chen',
    role: 'Commercial Fleet Manager & Operator',
    tier: 'Enterprise Partner',
    location: 'Frisco, TX · DFW Pilot',
    rating: 4.95,
    reviewsCount: 38,
    responseTime: '< 15 mins',
    handoffsCount: 142,
    memberSince: 'March 2024',
    verified: true,
    bio: 'Premier North Texas heavy equipment and commercial tools provider. Fully insured machinery with single-use digital QR handoff protocols and pre-flight inspection checklists.',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1610477865545-37711c53144d?auto=format&fit=crop&w=800&q=80',
    activeListings: [
      { id: 1, title: 'Compact Excavator Rental', price: 250, unit: 'day', image: 'https://images.unsplash.com/photo-1610477865545-37711c53144d?auto=format&fit=crop&w=400&q=80', rating: 4.95, area: 'Frisco, TX' },
      { id: 7, title: 'Trailer & Heavy Haul Flatbed', price: 90, unit: 'day', image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80', rating: 4.92, area: 'Frisco, TX' }
    ],
    badges: ['Stripe Identity Verified', 'Commercial Insurance On File', 'QR Custody Certified', 'Top Rated Host']
  },
  'Avery Style Collective': {
    name: 'Avery Style Collective',
    contactPerson: 'Avery Brooks',
    role: 'Wardrobe Stylist & Occasion Designer',
    tier: 'Trade Member',
    location: 'Plano, TX · DFW Pilot',
    rating: 4.96,
    reviewsCount: 67,
    responseTime: '< 30 mins',
    handoffsCount: 89,
    memberSince: 'June 2024',
    verified: true,
    bio: 'Curated gala couture, luxury evening wear, and photoshoot styling packages. All designer pieces are dry-cleaned and fit-guaranteed.',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
    coverImage: 'https://images.unsplash.com/photo-1746730921429-3a6489172f1b?auto=format&fit=crop&w=800&q=80',
    activeListings: [
      { id: 5, title: 'Designer Gala Occasion Outfit & Stole', price: 75, unit: 'day', image: 'https://images.unsplash.com/photo-1746730921429-3a6489172f1b?auto=format&fit=crop&w=400&q=80', rating: 4.96, area: 'Plano, TX' }
    ],
    badges: ['Stripe Identity Verified', 'Eco Dry-Cleaning Certified', 'Style Consultant', '100% On-Time Handoff']
  }
};

const getProviderImage = (thread) => {
  return thread?.providerImage || PROVIDER_AVATARS[thread?.id] || PROVIDER_AVATARS[thread?.providerName] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
};

export const MessagesView = () => {
  const { 
    inbox, 
    sendMessage, 
    plan, 
    setRoute, 
    setPlan, 
    isAuthenticated, 
    addToast, 
    bookings, 
    setActiveBooking,
    setActiveListing,
    activeThreadId: globalActiveThreadId,
    setActiveThreadId: globalSetActiveThreadId
  } = useApp();

  const [localActiveThreadId, setLocalActiveThreadId] = useState(inbox[0]?.id || 'th-1');
  const activeThreadId = globalActiveThreadId || localActiveThreadId;
  const setActiveThreadId = globalSetActiveThreadId || setLocalActiveThreadId;
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  const activeThread = inbox.find(t => t.id === activeThreadId) || inbox[0];

  // Auto-scroll to bottom of chat when new messages appear
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeThread?.messages?.length, activeThreadId]);

  if (!isAuthenticated) {
    return (
      <AuthGate
        badge="Direct Messaging"
        title="Sign in to view messages & negotiations"
        subtitle="You must be signed in to chat with equipment owners, negotiate prices, and coordinate single-use QR handoffs."
        actionText="Sign In to Access Inbox"
      />
    );
  }

  const isPaid = ['Trade', 'Business', 'Enterprise'].includes(plan);

  // Filtered threads for left column
  const filteredInbox = inbox.filter(t => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      t.providerName?.toLowerCase().includes(q) ||
      t.listingTitle?.toLowerCase().includes(q) ||
      t.messages?.some(m => m.text?.toLowerCase().includes(q))
    );
  });

  // Find provider profile or fallback
  const currentProviderProfile = PROVIDER_PROFILES[activeThread?.providerName] || {
    name: activeThread?.providerName || 'Local Member',
    contactPerson: activeThread?.providerName || 'Member',
    role: 'Verified Marketplace Host',
    tier: 'Trade Member',
    location: 'North Texas Pilot Area',
    rating: 4.95,
    reviewsCount: 24,
    responseTime: '< 30 mins',
    handoffsCount: 45,
    memberSince: 'January 2024',
    verified: true,
    bio: 'IDLE North Texas verified community member. Coordinates single-use QR handoffs with equipment and service protection.',
    avatar: getProviderImage(activeThread),
    coverImage: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    activeListings: [
      { id: 1, title: activeThread?.listingTitle || 'Featured Service', price: 150, unit: 'day', image: 'https://images.unsplash.com/photo-1610477865545-37711c53144d?auto=format&fit=crop&w=400&q=80', rating: 4.95, area: 'Frisco, TX' }
    ],
    badges: ['Stripe Identity Verified', 'QR Custody Certified', 'North Texas Pilot Host']
  };

  // Find linked listing for context banner
  const linkedListing = INITIAL_LISTINGS.find(
    l => l.title === activeThread?.listingTitle || l.owner === activeThread?.providerName
  ) || {
    id: 1,
    title: activeThread?.listingTitle || 'Compact Excavator Rental',
    price: 250,
    unit: 'day',
    area: 'Frisco',
    image: 'https://images.unsplash.com/photo-1610477865545-37711c53144d?auto=format&fit=crop&w=400&q=80'
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeThreadId, inputText);
    setInputText('');
  };

const handleImageAttachment = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Please select an image file (PNG, JPG, WEBP)', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      sendMessage(activeThreadId, `📷 [Condition Photo Attached: ${file.name}]`);
      addToast('Inspection photo sent to negotiation thread', 'success');
    };
    reader.readAsDataURL(file);
  };

  const handleViewBooking = () => {
    const matchingBooking = bookings?.find(
      b => b.listingTitle === activeThread?.listingTitle || b.provider === activeThread?.providerName
    ) || bookings?.[0];

    if (matchingBooking && setActiveBooking) {
      setActiveBooking(matchingBooking);
    }
    setRoute('bookings');
  };

  const handleOpenItemListing = (listingToOpen) => {
    const target = listingToOpen || linkedListing;
    if (setActiveListing && target) {
      setActiveListing(target);
    }
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Page Heading */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
          Secure Communications
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#082f2c] mt-0.5">
          Inbox & Negotiations.
        </h1>
        <p className="text-xs sm:text-sm text-idle-muted mt-1 max-w-xl">
          Paid members communicate directly to agree on pricing, scheduling, and single-use QR custody handoffs with zero commission taken.
        </p>
      </div>

      {/* Free Plan Gate Notice (with preview toggle) */}
      {!isPaid && (
        <div className="glass-card p-6 rounded-3xl border-2 border-idle-gold/40 bg-gradient-to-r from-amber-50/60 to-emerald-50/50 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-idle-gold/20 text-idle-gold flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-amber-700" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-[#122821]">
                Direct Member Messaging is a Paid Feature
              </h3>
              <p className="text-xs text-[#2b4d42] leading-relaxed">
                Free accounts can browse listings and post community requests. Upgrading to Trade ($15/mo) unlocks in-app negotiations, instant provider chat, and single-use QR custody transfers.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => setRoute('membership')}
              className="gold-gradient-btn px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Upgrade to Trade ($15/mo)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPlan('Trade')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-idle-emerald text-idle-emerald hover:bg-idle-mint transition-colors cursor-pointer"
            >
              Test as Trade Member (Instant Demo)
            </button>
          </div>
        </div>
      )}

      {/* Messenger Container - Authentic High-End Chat Layout */}
      <div className="glass-card rounded-3xl border border-idle-emerald/20 overflow-hidden shadow-glass grid grid-cols-1 md:grid-cols-12 min-h-[600px] max-h-[750px]">
        {/* Left Threads Column */}
        <div className="md:col-span-5 border-r border-idle-line flex flex-col bg-[#fbfdfc]">
          {/* Header & Search */}
          <div className="p-3.5 border-b border-idle-line space-y-2.5">
            <div className="flex items-center justify-between">
              <h3 className="font-serif text-sm font-bold text-[#0d2e29]">Active Conversations</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-idle-mint text-idle-emerald">
                {inbox.length} Threads
              </span>
            </div>

            {/* Conversation Search Bar */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-idle-muted absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages or members..."
                className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl border border-idle-line bg-white focus:outline-none focus:border-idle-emerald placeholder:text-idle-muted/80"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-idle-muted hover:text-idle-charcoal cursor-pointer"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Conversation List */}
          <div className="flex-1 overflow-y-auto divide-y divide-idle-line/60">
            {filteredInbox.length === 0 ? (
              <div className="p-8 text-center text-xs text-idle-muted">
                No matching conversations found
              </div>
            ) : (
              filteredInbox.map((thread) => {
                const isSelected = thread.id === activeThreadId;
                const lastMsg = thread.messages[thread.messages.length - 1];
                const avatarUrl = getProviderImage(thread);
                return (
                  <button
                    key={thread.id}
                    onClick={() => setActiveThreadId(thread.id)}
                    className={`w-full p-3.5 flex items-start gap-3 text-left transition-all cursor-pointer relative ${isSelected
                      ? 'bg-idle-mint/50 border-l-4 border-idle-emerald shadow-xs'
                      : 'hover:bg-black/5'
                      }`}
                  >
                    <div className="relative flex-shrink-0">
                      <img
                        src={avatarUrl}
                        alt={thread.providerName}
                        className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs ring-1 ring-idle-emerald/20"
                      />
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <strong className="text-xs sm:text-sm font-bold text-[#172d28] truncate">
                          {thread.providerName}
                        </strong>
                        <span className="text-[10px] text-idle-muted">{lastMsg?.time || 'Today'}</span>
                      </div>
                      <span className="text-[11px] font-semibold text-idle-emerald block truncate">
                        {thread.listingTitle}
                      </span>
                      <p className="text-xs text-idle-muted truncate mt-0.5 font-normal">
                        {lastMsg?.text || 'No messages yet'}
                      </p>
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Active Chat Pane */}
        <div className="md:col-span-7 flex flex-col bg-white overflow-hidden">
          {activeThread ? (
            <>
              {/* Chat Header - Clickable Provider Profile Trigger */}
              <div className="p-3.5 sm:p-4 border-b border-idle-line flex items-center justify-between bg-[#f8faf9] gap-3">
                {/* Clickable Profile Area */}
                <div
                  onClick={() => setProfileModalOpen(true)}
                  className="flex items-center gap-3 cursor-pointer group min-w-0"
                  title="Click to view member profile & verification credentials"
                >
                  <div className="relative flex-shrink-0">
                    <img
                      src={getProviderImage(activeThread)}
                      alt={activeThread.providerName}
                      className="w-11 h-11 sm:w-12 sm:h-12 rounded-full object-cover border-2 border-white shadow-sm ring-2 ring-idle-emerald/30 group-hover:ring-idle-emerald transition-all"
                    />
                    <span className="absolute bottom-0 right-0 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif text-sm sm:text-base font-bold text-[#112d26] flex items-center gap-2 group-hover:text-idle-emerald transition-colors truncate">
                      <span className="truncate">{activeThread.providerName}</span>
                      <span className="text-[10px] font-semibold bg-idle-mint text-idle-emerald px-2 py-0.5 rounded-full border border-idle-emerald/20 flex items-center gap-1 shrink-0">
                        <ShieldCheck className="w-3 h-3 text-idle-emerald" />
                        <span>Verified</span>
                      </span>
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-idle-muted mt-0.5">
                      <span className="flex items-center gap-1 text-emerald-600 font-medium text-[11px]">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Online now
                      </span>
                    </div>
                  </div>
                </div>

                {/* Header Action Buttons */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={handleViewBooking}
                    className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs font-bold border border-idle-emerald text-idle-emerald hover:bg-idle-mint transition-colors cursor-pointer shadow-xs"
                  >
                    <QrCode className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">View Booking</span>
                    <span className="sm:hidden">Booking</span>
                  </button>
                </div>
              </div>

              {/* Chat Messages Feed */}
              <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 bg-gradient-to-b from-[#f9fbf9] to-white">
                

                {activeThread.messages.map((m) => {
                  const isUser = m.from === 'user';
                  return (
                    <div
                      key={m.id}
                      className={`flex gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                    >
                      {!isUser && (
                        <img
                          src={getProviderImage(activeThread)}
                          alt={activeThread.providerName}
                          className="w-8 h-8 rounded-full object-cover border border-white shadow-xs mt-1 shrink-0"
                        />
                      )}
                      <div className={`flex flex-col ${isUser ? 'items-end' : 'items-start'} max-w-[80%]`}>
                        <div
                          className={`p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-xs ${isUser
                            ? 'bg-gradient-to-r from-idle-emerald to-[#003d36] text-white rounded-br-none'
                            : 'bg-[#edf3f0] text-[#172d28] rounded-bl-none border border-idle-line'
                            }`}
                        >
                          {m.text}
                        </div>
                        <div className="flex items-center gap-1 text-[10px] text-idle-muted mt-1 px-1">
                          <span>{m.time}</span>
                          {isUser && (
                            <CheckCheck className="w-3.5 h-3.5 text-idle-emerald" title="Delivered & Read" />
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Hidden file input for condition photos */}
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleImageAttachment}
                accept="image/*"
                className="hidden"
              />

              {/* Chat Input Composer */}
              <form
                onSubmit={handleSend}
                className="p-3 border-t border-idle-line bg-white flex items-center gap-2"
              >
                {/* Photo / Inspection attachment button */}
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  title="Attach condition photo or inspection document"
                  className="p-2 rounded-xl text-idle-muted hover:text-idle-emerald hover:bg-idle-mint/50 transition-colors cursor-pointer shrink-0"
                >
                  <Paperclip className="w-4 h-4" />
                </button>

                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Write a message to ${activeThread.providerName}...`}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none text-xs sm:text-sm"
                />

                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="emerald-gradient-btn px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-idle-muted">
              <MessageSquare className="w-12 h-12 text-idle-line mb-2" />
              <p className="text-sm">Select a thread to view messages</p>
            </div>
          )}
        </div>
      </div>

      {/* Member / Provider Profile Modal - Seamless Modern Layout */}
      {profileModalOpen && (
        <div 
          className="fixed inset-0 top-0 left-0 right-0 bottom-0 z-50 flex items-center justify-center p-3 sm:p-5 md:p-6 bg-black/65 backdrop-blur-md animate-in fade-in duration-200 !m-0"
          onClick={() => setProfileModalOpen(false)}
        >
          <div 
            className="glass-card bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl border border-idle-emerald/20 flex flex-col relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* 1. Full-Width Cover Banner (Edge-to-Edge) */}
            <div className="relative w-full h-52 sm:h-64 bg-emerald-950 overflow-hidden shrink-0">
              <img 
                src={currentProviderProfile.coverImage} 
                alt={currentProviderProfile.name}
                className="w-full h-full object-cover object-[center_35%]"
              />
              {/* Subtle top & bottom vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-black/45" />
              
              {/* Floating Top Controls */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/55 backdrop-blur-md border border-white/20 text-white text-xs font-bold shadow-md">
                  <Crown className="w-3.5 h-3.5 text-idle-gold" />
                  <span>{currentProviderProfile.tier}</span>
                </span>

                <div className="flex items-center gap-2">
                  <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-black/55 backdrop-blur-md border border-white/20 text-white text-xs font-medium shadow-md">
                    <Clock className="w-3.5 h-3.5 text-idle-gold" />
                    <span>Replies {currentProviderProfile.responseTime}</span>
                  </span>

                  <button
                    type="button"
                    onClick={() => setProfileModalOpen(false)}
                    className="p-2 sm:p-2.5 rounded-full bg-black/55 hover:bg-black/80 text-white transition-all cursor-pointer shadow-md border border-white/20 hover:scale-105"
                    aria-label="Close modal"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* 2. Full-Width White Profile Body (Seamless, No Side Gaps) */}
            <div className="p-6 sm:p-8 space-y-6 bg-white">
              {/* Top Row: Overlapping Avatar on Left, CTA on Right */}
              <div className="flex items-end justify-between gap-4 -mt-16 sm:-mt-20 relative z-10">
                <div className="relative">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden border-4 border-white shadow-xl ring-2 ring-idle-emerald/20 bg-white">
                    <img 
                      src={currentProviderProfile.avatar} 
                      alt={currentProviderProfile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <span 
                    className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-emerald-500 border-2 border-white shadow-md flex items-center justify-center text-white" 
                    title="Stripe Identity Verified"
                  >
                    <Check className="w-3.5 h-3.5 stroke-[3]" />
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => setProfileModalOpen(false)}
                  className="gold-gradient-btn px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Back to Chat</span>
                </button>
              </div>

              {/* Host Identity Details */}
              <div className="space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#082f2c]">
                    {currentProviderProfile.name}
                  </h2>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-idle-emerald bg-idle-mint px-2.5 py-0.5 rounded-full border border-idle-emerald/20">
                    <ShieldCheck className="w-3.5 h-3.5" /> ID Verified
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-idle-muted font-medium">
                  {currentProviderProfile.role}
                </p>
                <div className="flex items-center gap-3 text-xs text-idle-muted pt-1 flex-wrap">
                  <span className="flex items-center gap-1 text-[#172d28] font-semibold">
                    <MapPin className="w-3.5 h-3.5 text-idle-gold" />
                    {currentProviderProfile.location}
                  </span>
                  <span>·</span>
                  <span className="text-emerald-700 font-semibold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-idle-gold" />
                    Fast Responder ({currentProviderProfile.responseTime})
                  </span>
                </div>
              </div>

              {/* Reputation & Trust Stats Bar */}
              <div className="grid grid-cols-3 gap-2 sm:gap-4 p-3.5 sm:p-4 rounded-2xl bg-[#f8faf9] border border-idle-line text-center">
                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-idle-muted block">
                    Rating
                  </span>
                  <div className="flex items-center justify-center gap-1 text-sm sm:text-base font-bold text-[#172d28]">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span>{currentProviderProfile.rating}</span>
                    <span className="text-[11px] text-idle-muted font-normal">({currentProviderProfile.reviewsCount})</span>
                  </div>
                </div>

                <div className="space-y-0.5 border-x border-idle-line">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-idle-muted block">
                    QR Handoffs
                  </span>
                  <span className="text-sm sm:text-base font-bold text-[#004f46] block">
                    {currentProviderProfile.handoffsCount} Completed
                  </span>
                </div>

                <div className="space-y-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-idle-muted block">
                    Member Since
                  </span>
                  <span className="text-xs sm:text-sm font-semibold text-[#172d28] block pt-0.5">
                    {currentProviderProfile.memberSince}
                  </span>
                </div>
              </div>

              {/* Verified Credentials Pills */}
              <div className="space-y-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-idle-muted block">
                  Verified Trust & Safety Credentials
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentProviderProfile.badges.map((badge, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1.5 text-xs text-[#1e3b33] bg-idle-mint/60 border border-idle-emerald/25 px-3 py-1.5 rounded-xl font-semibold shadow-2xs"
                    >
                      <Check className="w-3.5 h-3.5 text-idle-emerald stroke-[2.5]" />
                      <span>{badge}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* About Host Section */}
              <div className="space-y-2 bg-[#f4f8f6]/80 p-4 sm:p-5 rounded-2xl border border-idle-line">
                <span className="text-xs font-bold uppercase tracking-wider text-idle-muted block">
                  About Provider & Equipment Fleet
                </span>
                <p className="text-xs sm:text-sm text-[#274039] leading-relaxed">
                  {currentProviderProfile.bio}
                </p>
              </div>

              {/* Active Listings Grid */}
              <div className="space-y-3 pt-2 border-t border-idle-line">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-[#172d28]">
                    Active Marketplace Listings ({currentProviderProfile.activeListings?.length || 0})
                  </span>
                  <span className="text-[11px] text-idle-muted">
                    Single-use QR custody guaranteed
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {currentProviderProfile.activeListings?.map((listing) => (
                    <div
                      key={listing.id}
                      className="flex items-center gap-3.5 p-3 rounded-2xl border border-idle-line hover:border-idle-emerald/40 bg-[#fbfdfc] hover:bg-white transition-all shadow-xs group"
                    >
                      <img 
                        src={listing.image} 
                        alt={listing.title}
                        className="w-16 h-16 rounded-xl object-cover border border-idle-line flex-shrink-0 group-hover:scale-102 transition-transform"
                      />
                      <div className="min-w-0 flex-1">
                        <h4 className="text-xs sm:text-sm font-bold text-[#172d28] truncate group-hover:text-idle-emerald transition-colors">
                          {listing.title}
                        </h4>
                        <div className="flex items-center gap-1 text-xs font-bold text-idle-emerald mt-0.5">
                          <span>${listing.price}</span>
                          <span className="text-idle-muted font-normal">/{listing.unit}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setProfileModalOpen(false);
                            handleOpenItemListing(listing);
                          }}
                          className="text-[11px] font-bold text-idle-emerald hover:underline mt-1.5 inline-flex items-center gap-1 cursor-pointer"
                        >
                          <span>View Details & Book</span>
                          <ExternalLink className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Bottom Footer Bar */}
            <div className="p-4 sm:p-5 border-t border-idle-line bg-[#f8faf9] flex items-center justify-between">
              <span className="text-[11px] text-idle-muted flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-idle-emerald shrink-0" />
                <span>Protected single-use QR custody transfers · Verified Host</span>
              </span>
              <button
                type="button"
                onClick={() => setProfileModalOpen(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-idle-charcoal hover:bg-black/5 border border-idle-line bg-white transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};