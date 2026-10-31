import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Compass, 
  PlaySquare, 
  Calendar, 
  MessageSquare, 
  User, 
  Crown,
  Sparkles,
  MapPin,
  Grid,
  List,
  Search,
  X,
  Heart,
  ChevronRight,
  ShieldCheck,
  Plane,
  Car,
  Building2,
  Lock,
  Eye,
  Check
} from 'lucide-react';

import { 
  ELITE_PHOTOS, 
  getElitePhoto, 
  ELITE_TYPES, 
  ELITE_SEED_LISTINGS, 
  ELITE_SEED_REELS, 
  ELITE_SEED_EVENTS 
} from '../data/eliteData';

// Modals
import { AviationInquiryModal } from '../components/elite/modals/AviationInquiryModal';
import { CreatePrivateListingModal } from '../components/elite/modals/CreatePrivateListingModal';
import { HostPrivateEventModal } from '../components/elite/modals/HostPrivateEventModal';
import { PostPrivateReelModal } from '../components/elite/modals/PostPrivateReelModal';

export const ElitePmView = () => {
  const { setRoute, addToast, isAuthenticated, user, plan } = useApp();

  // Elite Access state: starts in concept preview state matching prototype screenshot
  const [eliteAccess, setEliteAccess] = useState(false);

  // Active sub-navigation tab
  const [activeTab, setActiveTab] = useState('discover'); // 'discover' | 'reels' | 'events' | 'inbox' | 'my-elite'

  // Discover layout & filter states
  const [layoutMode, setLayoutMode] = useState('Grid'); // 'Grid' | 'Map' | 'List'
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [savedListingIds, setSavedListingIds] = useState(['elite-v3', 'elite-s3']);
  const [rsvpdEventIds, setRsvpdEventIds] = useState(['event-1']);

  // Inbox & Roles
  const [inboxRole, setInboxRole] = useState('member'); // 'member' | 'host'
  const [activeThreadId, setActiveThreadId] = useState(null);
  const [chatMessage, setChatMessage] = useState('');

  // Modals state
  const [selectedListing, setSelectedListing] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedReel, setSelectedReel] = useState(null);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isReelModalOpen, setIsReelModalOpen] = useState(false);

  // User private custom posts created in this session
  const [userPrivatePosts, setUserPrivatePosts] = useState([]);
  const [userPrivateEvents, setUserPrivateEvents] = useState([]);
  const [userPrivateReels, setUserPrivateReels] = useState([]);

  // Filtered listings
  const allListings = useMemo(() => {
    return [...userPrivatePosts, ...ELITE_SEED_LISTINGS];
  }, [userPrivatePosts]);

  const visibleListings = useMemo(() => {
    return allListings.filter(l => {
      if (selectedCategory !== 'All' && l.category !== selectedCategory) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        return (
          l.title.toLowerCase().includes(q) ||
          l.city.toLowerCase().includes(q) ||
          l.description.toLowerCase().includes(q)
        );
      }
      return true;
    });
  }, [allListings, selectedCategory, searchQuery]);

  // Toggle Save Favorite
  const handleToggleSave = (id, e) => {
    if (e) e.stopPropagation();
    setSavedListingIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    addToast(savedListingIds.includes(id) ? 'Removed from saved experiences' : 'Saved to your private experiences', 'info');
  };

  // Toggle RSVP Event
  const handleToggleRsvp = (id, e) => {
    if (e) e.stopPropagation();
    setRsvpdEventIds(prev => 
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
    addToast(rsvpdEventIds.includes(id) ? 'Event interest removed' : 'Event interest saved! Host notified.', 'success');
  };

  return (
    <div className="elite-pm-page ep-full pb-20">
      {/* 1. Top Bar matching Prototype */}
      <div className="ep-topline">
        <span>♛ IDLE ELITE PM <small>PRIVATE MEMBERS</small></span>
        <span>OWNER PREVIEW · NORTH TEXAS</span>
      </div>

      {/* 2. Hero Section matching Prototype and User Screenshot */}
      <div className="ep-hero min-h-[380px] sm:min-h-[440px] md:min-h-[480px]">
        <img 
          src={ELITE_PHOTOS.hero} 
          alt="Private aircraft and black SUV at sunset" 
          loading="eager"
        />
        <div className="ep-hero-shade" />

        <div className="ep-hero-copy">
          <span className="ep-eyebrow">✦ IDLE · ELITE PRIVATE MEMBERS</span>
          <h1 className="font-serif text-[34px] sm:text-[48px] md:text-[58px] text-[#f8ead0] leading-[1.07] my-3.5 font-normal tracking-[-0.025em]">
            More than access.<br />
            <span className="text-[#dbb56e] font-normal not-italic block mt-1">More of your time.</span>
          </h1>
          <p className="text-[#d8e0d8] text-sm sm:text-base max-w-[520px] leading-relaxed">
            Private arrivals, exceptional places, discreet services and experiences worth making time for.
          </p>

          <div className="ep-hero-actions">
            {eliteAccess ? (
              <span className="ep-access-indicator">✦ ELITE ACCESS · OWNER DEMO</span>
            ) : (
              <button 
                type="button" 
                className="ep-btn gold cursor-pointer"
                onClick={() => {
                  setEliteAccess(true);
                  addToast('Elite owner preview unlocked!', 'success');
                }}
              >
                Unlock Elite owner preview ↗
              </button>
            )}

            <button 
              type="button" 
              className="ep-btn outline cursor-pointer"
              onClick={() => setRoute('explore')}
            >
              Explore all of IDLE ↗
            </button>

            <button 
              type="button" 
              className="ep-btn outline cursor-pointer"
              onClick={() => {
                setEliteAccess(true);
                setActiveTab('discover');
                setLayoutMode('Map');
              }}
            >
              Explore private map ↗
            </button>
          </div>
        </div>
      </div>

      {/* 3. Sub-Navigation 5-Tab Bar (.ep-tabbar) matching Prototype */}
      <nav className="ep-tabbar" aria-label="Elite PM sections">
        <button 
          type="button" 
          className={activeTab === 'discover' ? 'active' : ''} 
          onClick={() => setActiveTab('discover')}
        >
          <Compass className="w-4 h-4" />
          <span>Discover</span>
        </button>
        <button 
          type="button" 
          className={activeTab === 'reels' ? 'active' : ''} 
          onClick={() => setActiveTab('reels')}
        >
          <PlaySquare className="w-4 h-4" />
          <span>Reels</span>
        </button>
        <button 
          type="button" 
          className={activeTab === 'events' ? 'active' : ''} 
          onClick={() => setActiveTab('events')}
        >
          <Calendar className="w-4 h-4" />
          <span>Events</span>
        </button>
        <button 
          type="button" 
          className={activeTab === 'inbox' ? 'active' : ''} 
          onClick={() => setActiveTab('inbox')}
        >
          <MessageSquare className="w-4 h-4" />
          <span>Inbox</span>
        </button>
        <button 
          type="button" 
          className={activeTab === 'my-elite' ? 'active' : ''} 
          onClick={() => setActiveTab('my-elite')}
        >
          <User className="w-4 h-4" />
          <span>My Elite</span>
        </button>
      </nav>

      {/* 4. Owner Access Notice Bar (.ep-memberline / .ep-lockline) */}
      {eliteAccess ? (
        <div className="ep-memberline">
          <strong>Private members experience</strong>
          <span>Regular IDLE tools are unlocked in this owner demo. Your private feed and reservations stay in Elite PM.</span>
          <button 
            type="button" 
            className="ep-btn subtle cursor-pointer"
            onClick={() => setEliteAccess(false)}
          >
            Preview locked view
          </button>
        </div>
      ) : (
        <div className="ep-lockline">
          <div>
            <strong>Private Members access</strong>
            <span>Explore the concept; unlock the owner preview to see private listings, message hosts, RSVP and post.</span>
          </div>
          <button 
            type="button" 
            className="ep-btn gold cursor-pointer"
            onClick={() => {
              setEliteAccess(true);
              addToast('Owner demo unlocked!', 'success');
            }}
          >
            Unlock owner demo
          </button>
        </div>
      )}

      {/* 5. Dynamic Content Area */}
      {!eliteAccess ? (
        /* Locked Concept Landing Page (elitePreviewLanding) */
        <div className="ep-public-preview">
          <div className="ep-section-heading">
            <div>
              <span className="ep-eyebrow">A PRIVATE MEMBERSHIP CONCEPT</span>
              <h2>Less logistics. More life.</h2>
              <p>Explore the categories below. Member listings, Reels, events and conversations are hidden until access is granted.</p>
            </div>
          </div>

          {/* Directory Category Cards */}
          <div className="ep-categories">
            {ELITE_TYPES.map(([key, name, sub, img, glyph]) => (
              <button 
                key={key}
                type="button"
                onClick={() => {
                  setEliteAccess(true);
                  setSelectedCategory(key);
                  setActiveTab('discover');
                }}
                className={`ep-cat ${selectedCategory === key ? 'active' : ''} cursor-pointer`}
              >
                <img src={getElitePhoto(img)} alt={name} loading="lazy" />
                <div className="ep-cat-shadow" />
                <div className="ep-cat-label">
                  <span>{glyph}</span>
                  <strong>{name}</strong>
                  <small>{sub}</small>
                </div>
              </button>
            ))}
          </div>

          <div className="ep-lockline">
            <div>
              <strong>Discover the private world</strong>
              <span>Preview access to see private inventory, private social posts, member events, messaging and reservations.</span>
            </div>
            <button 
              type="button" 
              className="ep-btn gold cursor-pointer"
              onClick={() => {
                setEliteAccess(true);
                addToast('Unlocked full owner demo!', 'success');
              }}
            >
              Unlock owner demo
            </button>
          </div>

          <p className="ep-footnote">
            No public visitor can see private listings or member messages in this preview. Real privacy will require authentication and backend access controls.
          </p>
        </div>
      ) : activeTab === 'discover' ? (
        /* Discover Tab */
        <div className="space-y-6 animate-in fade-in duration-200">
          {/* 24-Hour Stories Strip */}
          <div className="ep-section-heading">
            <div>
              <span className="ep-eyebrow">24-HOUR PRIVATE STORIES</span>
              <h2>Behind the invitation.</h2>
            </div>
            <button 
              type="button"
              onClick={() => setActiveTab('reels')}
              className="text-xs font-bold text-[#e6c891] hover:underline cursor-pointer"
            >
              View all private stories →
            </button>
          </div>

          <div className="ep-stories">
            {ELITE_SEED_REELS.map(r => (
              <button 
                key={r.id} 
                type="button" 
                onClick={() => setSelectedReel(r)}
                className="ep-story cursor-pointer"
              >
                <div className="ep-story-ring">
                  <img src={getElitePhoto(r.img)} alt={r.title} />
                </div>
                <span>{r.author.split('·')[0]}</span>
              </button>
            ))}
          </div>

          {/* Directory Category Strip */}
          <div className="ep-categories">
            {ELITE_TYPES.map(([key, name, sub, img, glyph]) => (
              <button 
                key={key}
                type="button"
                onClick={() => setSelectedCategory(key)}
                className={`ep-cat ${selectedCategory === key ? 'active' : ''} cursor-pointer`}
              >
                <img src={getElitePhoto(img)} alt={name} loading="lazy" />
                <div className="ep-cat-shadow" />
                <div className="ep-cat-label">
                  <span>{glyph}</span>
                  <strong>{name}</strong>
                  <small>{sub}</small>
                </div>
              </button>
            ))}
          </div>

          {/* Discover Header + View Toggle & Search */}
          <div className="ep-discover-head">
            <div>
              <span className="ep-eyebrow">EXPLORE PRIVATELY</span>
              <h2>{selectedCategory === 'All' ? 'The private collection' : ELITE_TYPES.find(t => t[0] === selectedCategory)?.[1] || selectedCategory}</h2>
              <p>{visibleListings.length} sample listings · private posts kept separate</p>
            </div>

            <div className="ep-view-toggle">
              {['Grid', 'Map', 'List'].map(mode => (
                <button 
                  key={mode} 
                  type="button"
                  className={layoutMode === mode ? 'active' : ''}
                  onClick={() => setLayoutMode(mode)}
                >
                  {mode === 'Map' ? '⌖' : mode === 'Grid' ? '⊞' : '☷'} {mode}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input Bar */}
          <div className="ep-discovery-tools max-w-[1130px] mx-auto px-4 sm:px-0">
            <div className="relative w-full">
              <span className="absolute left-3.5 top-2.5 text-[#9ea997]">⌕</span>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search private listings, locations, hosts or amenities..."
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#493e2a] bg-[#12221b] text-[#e8ded0] text-xs focus:border-[#a78550] outline-none"
              />
            </div>
          </div>

          {/* Map Canvas View or Listings Grid */}
          {layoutMode === 'Map' ? (
            <div className="ep-map-wrap max-w-[1130px] mx-auto bg-[#0a1410] border border-[#6b5536] rounded-2xl p-6 text-center space-y-4">
              <div className="relative h-96 w-full rounded-xl overflow-hidden bg-[#0e1d16] border border-[#3b4b3e] flex items-center justify-center">
                <img 
                  src={ELITE_PHOTOS.hero} 
                  alt="North Texas Map schematic" 
                  className="w-full h-full object-cover opacity-20 filter grayscale" 
                />
                <div className="absolute inset-0 bg-radial-gradient from-transparent to-[#0a1410]" />
                <div className="absolute inset-0 flex flex-col items-center justify-center space-y-2 p-6 z-10">
                  <MapPin className="w-10 h-10 text-[#eecf8e]" />
                  <h3 className="font-serif text-2xl font-bold text-[#eecf8e]">North Texas Private Map</h3>
                  <p className="text-xs text-[#b8c6b8] max-w-md">
                    Showing {visibleListings.length} approximate private rendezvous points across Frisco, Dallas, Southlake and Prosper.
                  </p>
                  <div className="flex flex-wrap justify-center gap-2 pt-2">
                    {visibleListings.slice(0, 5).map(l => (
                      <button 
                        key={l.id} 
                        type="button"
                        onClick={() => setSelectedListing(l)}
                        className="px-3 py-1 rounded-full bg-[#17251f] border border-[#826e48] text-xs text-[#eecf8e] font-semibold hover:bg-[#826e48] hover:text-black cursor-pointer"
                      >
                        {l.city} · ${l.price ? `$${l.price}` : 'Inquiry'}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Listings Grid */
            <div className={`ep-grid max-w-[1130px] mx-auto ${layoutMode === 'List' ? '!grid-cols-1' : ''}`}>
              {visibleListings.map(l => {
                const isSaved = savedListingIds.includes(l.id);
                const photoSrc = getElitePhoto(l.img);

                return (
                  <article key={l.id} className="ep-listing">
                    <button 
                      type="button" 
                      onClick={() => setSelectedListing(l)} 
                      className="ep-listing-image cursor-pointer w-full text-left"
                    >
                      <img src={photoSrc} alt={l.title} loading="lazy" />
                      <span>{l.category === 'Aviation' ? 'INQUIRY ONLY' : 'EXAMPLE · PRIVATE MEMBERS'}</span>
                    </button>

                    <div className="ep-listing-body">
                      <div className="ep-listing-meta">
                        <span>⌖ {l.city} · {l.category}</span>
                        <button 
                          type="button" 
                          onClick={(e) => handleToggleSave(l.id, e)}
                          className="cursor-pointer text-base"
                          title={isSaved ? 'Saved' : 'Save for later'}
                        >
                          {isSaved ? '♥' : '♡'}
                        </button>
                      </div>

                      <h3>{l.title}</h3>
                      <p>{l.description}</p>

                      <div className="ep-listing-foot">
                        <strong>{l.price ? `$${l.price} / ${l.unit}` : 'Operator Inquiry'}</strong>
                        <div className="ep-card-acts">
                          <button 
                            type="button" 
                            onClick={() => setSelectedListing(l)}
                            className="cursor-pointer"
                          >
                            View ↗
                          </button>
                          <button 
                            type="button" 
                            onClick={() => setSelectedListing(l)}
                            className="cursor-pointer"
                          >
                            {l.category === 'Aviation' ? 'Inquire' : 'Request'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      ) : activeTab === 'reels' ? (
        /* Reels Tab */
        <div className="space-y-6 animate-in fade-in duration-200 max-w-[1130px] mx-auto">
          <div className="ep-section-heading">
            <div>
              <span className="ep-eyebrow">PRIVATE SOCIAL DISCOVERY</span>
              <h2>The members' circle.</h2>
              <p>Share your work, arrivals, homes, collections, and experiences with the private preview community.</p>
            </div>
            <button 
              type="button" 
              onClick={() => setIsReelModalOpen(true)}
              className="ep-btn gold cursor-pointer"
            >
              Post a private Reel
            </button>
          </div>

          <div className="ep-reel-grid">
            {[...userPrivateReels, ...ELITE_SEED_REELS].map(r => (
              <article key={r.id} className="ep-reel-card">
                <button 
                  type="button" 
                  onClick={() => setSelectedReel(r)}
                  className="ep-reel-media cursor-pointer w-full text-left"
                >
                  <img src={getElitePhoto(r.img)} alt={r.title} loading="lazy" />
                  <span className="ep-reel-category">{r.category}</span>
                  <div className="ep-reel-play">▶</div>
                </button>
                <div className="ep-reel-info">
                  <h4>{r.title}</h4>
                  <p>{r.caption}</p>
                  <small>{r.author}</small>
                </div>
              </article>
            ))}
          </div>

          <div className="ep-footnote">
            Private Reels are only visible within this local owner demo. In production, server-side membership access, expiration and moderation are required.
          </div>
        </div>
      ) : activeTab === 'events' ? (
        /* Events Tab */
        <div className="space-y-6 animate-in fade-in duration-200 max-w-[1130px] mx-auto">
          <div className="ep-section-heading">
            <div>
              <span className="ep-eyebrow">MEMBERS-ONLY EXPERIENCES</span>
              <h2>The invitation is the beginning.</h2>
              <p>Private dinners, black-tie gatherings, estate hosting and community moments.</p>
            </div>
            <button 
              type="button" 
              onClick={() => setIsEventModalOpen(true)}
              className="ep-btn gold cursor-pointer"
            >
              Host a private event
            </button>
          </div>

          <div className="ep-event-grid">
            {[...userPrivateEvents, ...ELITE_SEED_EVENTS].map(ev => {
              const isRsvpd = rsvpdEventIds.includes(ev.id);
              return (
                <article key={ev.id} className="ep-event-card">
                  <button 
                    type="button"
                    onClick={() => setSelectedEvent(ev)} 
                    className="ep-event-media cursor-pointer w-full text-left"
                  >
                    <img src={getElitePhoto(ev.img)} alt={ev.title} loading="lazy" />
                    <span>{ev.city}</span>
                  </button>
                  <div className="ep-event-details">
                    <span className="ep-event-date">📅 {ev.date} · {ev.time}</span>
                    <h3>{ev.title}</h3>
                    <p>{ev.description}</p>
                    <div className="ep-event-foot">
                      <small>{ev.host}</small>
                      <button 
                        type="button" 
                        onClick={(e) => handleToggleRsvp(ev.id, e)}
                        className={`ep-btn small cursor-pointer ${isRsvpd ? 'subtle' : 'gold'}`}
                      >
                        {isRsvpd ? '✓ Saved RSVP' : 'Save RSVP'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="ep-footnote">
            These are fictional examples, not confirmed invitations or ticket availability. Event interest is local and does not reserve admission.
          </div>
        </div>
      ) : activeTab === 'inbox' ? (
        /* Inbox Tab */
        <div className="space-y-6 animate-in fade-in duration-200 max-w-[1130px] mx-auto">
          <div className="ep-section-heading">
            <div>
              <span className="ep-eyebrow">PRIVATE COMMUNICATION</span>
              <h2>Member conversations.</h2>
              <p>Private threads are separate from IDLE's public marketplace Inbox.</p>
            </div>
          </div>

          <div className="ep-role-toggle">
            <span>Viewing as</span>
            <button 
              type="button"
              className={inboxRole === 'member' ? 'active' : ''}
              onClick={() => setInboxRole('member')}
            >
              Member
            </button>
            <button 
              type="button"
              className={inboxRole === 'host' ? 'active' : ''}
              onClick={() => setInboxRole('host')}
            >
              Host
            </button>
          </div>

          <div className="ep-inbox-list">
            <button 
              type="button"
              onClick={() => setActiveThreadId('th-1')}
              className="cursor-pointer"
            >
              <span>✉</span>
              <div>
                <strong>Red exotic sports car · Frisco</strong>
                <small>3 messages · 1 active offer</small>
              </div>
              <b>Open ↗</b>
            </button>

            <button 
              type="button"
              onClick={() => setActiveThreadId('th-2')}
              className="cursor-pointer"
            >
              <span>✉</span>
              <div>
                <strong>Modern pool estate · Frisco</strong>
                <small>2 messages · Booking requested</small>
              </div>
              <b>Open ↗</b>
            </button>
          </div>

          {activeThreadId && (
            <div className="ep-dialog-content bg-[#111c17] border border-[#c1a16b] rounded-2xl p-5 space-y-4">
              <div className="flex items-center justify-between border-b border-[#3b4b3e] pb-2">
                <span className="ep-eyebrow">ACTIVE CONVERSATION</span>
                <button 
                  type="button"
                  onClick={() => setActiveThreadId(null)}
                  className="text-xs text-[#9ea997] hover:text-white"
                >
                  Close thread ✕
                </button>
              </div>

              <div className="ep-chat-history">
                <div className="ep-chat-bubble">
                  <small>Private Host · Yesterday</small>
                  Welcome. We received your private inquiry and have reserved your requested arrival window.
                </div>
                <div className="ep-chat-bubble mine">
                  <small>You · Yesterday</small>
                  Excellent, thank you. We will coordinate pickup directly with our driver.
                </div>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!chatMessage.trim()) return;
                  addToast('Message sent to private host', 'success');
                  setChatMessage('');
                }}
                className="ep-chat-form flex gap-2"
              >
                <input 
                  type="text"
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
                  placeholder="Type a private reply..."
                  className="flex-1 px-3 py-2 rounded-xl bg-[#0c1710] border border-[#4c634e] text-xs text-[#e7e9dc] outline-none"
                />
                <button type="submit" className="ep-btn gold small">
                  Send
                </button>
              </form>
            </div>
          )}
        </div>
      ) : (
        /* My Elite Tab */
        <div className="space-y-6 animate-in fade-in duration-200 max-w-[1130px] mx-auto">
          <div className="ep-section-heading">
            <div>
              <span className="ep-eyebrow">YOUR PRIVATE WORLD</span>
              <h2>My Elite PM.</h2>
              <p>Manage private listings, reservations, events and membership controls.</p>
            </div>
          </div>

          <div className="ep-stat-grid">
            <div className="ep-stat">
              <strong>{userPrivatePosts.length}</strong>
              <span>Private posts</span>
            </div>
            <div className="ep-stat">
              <strong>{userPrivateEvents.length}</strong>
              <span>Event drafts</span>
            </div>
            <div className="ep-stat">
              <strong>{savedListingIds.length}</strong>
              <span>Saved experiences</span>
            </div>
            <div className="ep-stat">
              <strong>{rsvpdEventIds.length}</strong>
              <span>RSVP Events</span>
            </div>
          </div>

          <div className="ep-activity-actions">
            <button 
              type="button" 
              onClick={() => setIsListingModalOpen(true)}
              className="ep-btn gold cursor-pointer"
            >
              ＋ Offer a private listing
            </button>
            <button 
              type="button" 
              onClick={() => setIsEventModalOpen(true)}
              className="ep-btn outline cursor-pointer"
            >
              ＋ Host an experience
            </button>
            <button 
              type="button" 
              onClick={() => setIsReelModalOpen(true)}
              className="ep-btn outline cursor-pointer"
            >
              ▶ Share a private Reel
            </button>
          </div>
        </div>
      )}

      {/* 6. Bottom Section (.ep-bottom) matching Prototype */}
      <section className="ep-bottom">
        <span>✦ ELITE PM</span>
        <h2>More life. Less logistics.</h2>
        <p>A member-only layer within IDLE, designed around convenience, privacy and time. Elite access retains the rest of IDLE's services.</p>
        <div>
          <button 
            type="button" 
            className="ep-btn outline cursor-pointer"
            onClick={() => setRoute('explore')}
          >
            Visit regular IDLE marketplace
          </button>
          <button 
            type="button" 
            className="ep-btn outline cursor-pointer"
            onClick={() => setRoute('resources')}
          >
            Tools & Resources
          </button>
        </div>
        <small>
          All people, listings, memberships, invitations and locations shown here are illustrative. No public sharing, background check or payment occurs.
        </small>
      </section>

      {/* 7. Interactive Modals */}
      {/* Listing Detail & Request Modal */}
      {selectedListing && (
        <div className="ep-dialog-backdrop" onClick={() => setSelectedListing(null)}>
          <div className="ep-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="ep-dialog-hero relative">
              <img src={getElitePhoto(selectedListing.img)} alt={selectedListing.title} />
              <button 
                type="button"
                onClick={() => setSelectedListing(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/75 text-white flex items-center justify-center cursor-pointer hover:bg-black"
              >
                ✕
              </button>
            </div>
            <div className="ep-dialog-content">
              <span className="ep-eyebrow">{selectedListing.city} · {selectedListing.category} · PRIVATE MEMBER EXAMPLE</span>
              <h2>{selectedListing.title}</h2>
              <p>{selectedListing.description}</p>
              <div className="ep-detail-summary">
                <strong>{selectedListing.price ? `$${selectedListing.price} / ${selectedListing.unit}` : 'Inquiry only'}</strong>
                <span>{selectedListing.host}</span>
              </div>
              <div className="ep-detail-features">
                {selectedListing.features}
              </div>
              <div className="ep-dialog-actions flex gap-3 pt-4">
                <button 
                  type="button" 
                  className="ep-btn gold flex-1 cursor-pointer"
                  onClick={() => {
                    addToast(`Conversation initiated with ${selectedListing.host}`, 'success');
                    setSelectedListing(null);
                    setActiveTab('inbox');
                  }}
                >
                  Message host
                </button>
                <button 
                  type="button" 
                  className="ep-btn outline flex-1 cursor-pointer"
                  onClick={() => {
                    addToast('Availability request submitted locally!', 'info');
                    setSelectedListing(null);
                  }}
                >
                  Request availability
                </button>
              </div>
              <p className="ep-footnote">
                {selectedListing.category === 'Aviation'
                  ? 'Air-taxi / flight booking is unavailable. Inquiries are non-binding.'
                  : 'No real property, vehicle or provider availability is represented.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Event Detail Modal */}
      {selectedEvent && (
        <div className="ep-dialog-backdrop" onClick={() => setSelectedEvent(null)}>
          <div className="ep-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="ep-dialog-hero relative">
              <img src={getElitePhoto(selectedEvent.img)} alt={selectedEvent.title} />
              <button 
                type="button"
                onClick={() => setSelectedEvent(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/75 text-white flex items-center justify-center cursor-pointer hover:bg-black"
              >
                ✕
              </button>
            </div>
            <div className="ep-dialog-content">
              <span className="ep-eyebrow">PRIVATE EVENT · {selectedEvent.city}</span>
              <h2>{selectedEvent.title}</h2>
              <p>{selectedEvent.description}</p>
              <div className="ep-detail-summary">
                <strong>{selectedEvent.date} · {selectedEvent.time}</strong>
                <span>{selectedEvent.host}</span>
              </div>
              <div className="pt-4">
                <button 
                  type="button" 
                  className="ep-btn gold w-full cursor-pointer"
                  onClick={() => {
                    handleToggleRsvp(selectedEvent.id);
                    setSelectedEvent(null);
                  }}
                >
                  {rsvpdEventIds.includes(selectedEvent.id) ? 'Remove saved interest' : 'Save private event interest'}
                </button>
              </div>
              <p className="ep-footnote">This is not a real ticket, invitation or confirmed event.</p>
            </div>
          </div>
        </div>
      )}

      {/* Reel Player Modal */}
      {selectedReel && (
        <div className="ep-dialog-backdrop" onClick={() => setSelectedReel(null)}>
          <div className="ep-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="ep-story-view relative">
              <img src={getElitePhoto(selectedReel.img)} alt={selectedReel.title} />
              <button 
                type="button"
                onClick={() => setSelectedReel(null)}
                className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/75 text-white flex items-center justify-center cursor-pointer hover:bg-black z-20"
              >
                ✕
              </button>
              <div className="ep-story-overlay">
                <span>{selectedReel.category} · 24-HOUR LOCAL BROADCAST</span>
                <h2>{selectedReel.title}</h2>
                <p>{selectedReel.caption}</p>
                <small>{selectedReel.author}</small>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Creation Modals */}
      <CreatePrivateListingModal
        isOpen={isListingModalOpen}
        onClose={() => setIsListingModalOpen(false)}
        onCreated={(newItem) => {
          setUserPrivatePosts(prev => [newItem, ...prev]);
          addToast('Private listing draft published to your portfolio!', 'success');
        }}
      />

      <HostPrivateEventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
        onCreated={(newEvent) => {
          setUserPrivateEvents(prev => [newEvent, ...prev]);
          addToast('Private event registered to your portfolio!', 'success');
        }}
      />

      <PostPrivateReelModal
        isOpen={isReelModalOpen}
        onClose={() => setIsReelModalOpen(false)}
        onCreated={(newReel) => {
          setUserPrivateReels(prev => [newReel, ...prev]);
          addToast('Private reel broadcast to members circle!', 'success');
        }}
      />
    </div>
  );
};
