import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_LISTINGS,
  DEMO_STORIES,
  INITIAL_ENTERPRISE_TEAM,
  INITIAL_ENTERPRISE_TASKS
} from '../data/mockData';

const AppContext = createContext(null);

const STORAGE_KEY = 'idle_marketplace_app_state_v2';
const LEGACY_STORAGE_KEY = 'idle_marketplace_app_state_v1';

export const PLAN_REGISTRY = {
  Free: { price: 0, seats: 1, services: 0, rentals: 0, reels: 0, activeReels: 0, locations: 1, name: 'Free', caption: 'Browse, profile and view local Reels' },
  Studio: { price: 29, seats: 1, services: 4, rentals: 4, reels: 1, activeReels: 1, locations: 1, name: 'Studio', caption: 'Start with four offers and four rentals' },
  'Studio Pro': { price: 59, seats: 1, services: 20, rentals: 20, reels: 3, activeReels: 3, locations: 1, name: 'Studio Pro', caption: 'Multi-trade tools for independent operators' },
  Business: { price: 149, seats: 5, services: 60, rentals: 60, reels: 6, activeReels: 6, locations: 3, name: 'Business', caption: 'Team inventory, approvals and dispatch' },
  Enterprise: { price: 399, seats: 10, services: Infinity, rentals: Infinity, reels: 12, activeReels: 12, locations: Infinity, name: 'Enterprise', caption: 'Multi-site operations and advanced controls' }
};

export const AppProvider = ({ children }) => {
  // Load saved state or use initial defaults
  const loadInitialState = () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        if (localStorage.getItem(LEGACY_STORAGE_KEY)) {
          localStorage.removeItem(LEGACY_STORAGE_KEY);
        }
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read from localStorage', e);
    }
    return null;
  };

  const savedState = loadInitialState();

  const VALID_ROUTES = ['home', 'explore', 'reels', 'tasks', 'post', 'messages', 'transactions', 'bookings', 'enterprise', 'resources', 'membership', 'profile', 'journey', 'auth', 'privacy', 'terms', 'contact', 'elite-pm', 'admin', 'owner'];
  const PHASE_2_ROUTES = [];

  const getInitialRoute = () => {
    // Check clean pathname first (e.g. /post, /explore)
    const pathname = window.location.pathname.replace(/^\/+/, '').split('/')[0];
    if (pathname && VALID_ROUTES.includes(pathname) && !PHASE_2_ROUTES.includes(pathname)) {
      return pathname;
    }
    // Clean up any remaining legacy hash if present
    const hash = window.location.hash.replace('#', '').split('?')[0];
    if (hash && VALID_ROUTES.includes(hash) && !PHASE_2_ROUTES.includes(hash)) {
      window.history.replaceState(null, '', hash === 'home' ? '/' : `/${hash}`);
      return hash;
    }
    return savedState?.route && !PHASE_2_ROUTES.includes(savedState.route) ? savedState.route : 'home';
  };

  // Core navigation route (clean URLs without #)
  const [route, setRouteState] = useState(getInitialRoute);

  // User & Subscription Plan - strictly false by default for first-time visitors
  const [isAuthenticated, setIsAuthenticated] = useState(Boolean(savedState?.isAuthenticated));
  const [authMode, setAuthMode] = useState('signin'); // 'signin' | 'signup'

  const openAuth = (mode = 'signin') => {
    setAuthMode(mode);
    setRoute('auth');
  };

  const DEFAULT_AVATAR_URL = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80';

  const [user, setUser] = useState(() => {
    const defaultUser = {
      name: 'Alex Morgan',
      email: 'alex.morgan@example.com',
      area: 'Frisco, TX',
      plan: 'Free',
      isVerified: true,
      stripeConnected: true,
      joined: true,
      avatar: 'AM',
      avatarUrl: DEFAULT_AVATAR_URL,
      notifications: true,
      interests: savedState?.user?.interests || ['Home', 'Tools', 'Electronics', 'Services']
    };
    if (savedState?.user) {
      return {
        ...defaultUser,
        ...savedState.user,
        avatarUrl: savedState.user.avatarUrl || DEFAULT_AVATAR_URL
      };
    }
    return defaultUser;
  });

  const setUserLocation = (newArea) => {
    setUser(prev => ({
      ...prev,
      area: newArea
    }));
    addToast(`Active location set to ${newArea}!`, 'success');
  };

  const [plan, setPlanState] = useState(savedState?.plan || 'Free');
  const [ownerRole, setOwnerRoleState] = useState(savedState?.ownerRole || 'customer');

  const setOwnerRole = (role) => {
    const normalized = role === 'provider' ? 'provider' : 'customer';
    setOwnerRoleState(normalized);
    addToast(`Now acting as ${normalized === 'provider' ? 'Provider' : 'Customer'}`, 'info');
  };

  // Auth actions
  const login = (email, password) => {
    setIsAuthenticated(true);
    if (email && email !== 'alex.morgan@example.com') {
      const generatedName = email.split('@')[0].split('.').map(s => s.charAt(0).toUpperCase() + s.slice(1)).join(' ') || 'Alex Morgan';
      setUser(prev => ({
        ...prev,
        email: email,
        name: generatedName,
        avatar: (email.split('@')[0].slice(0, 2) || 'AM').toUpperCase()
      }));
    }
    addToast(`Welcome back, ${user.name}!`, 'success');
    setRoute('home');
  };

  const signup = (userData) => {
    setIsAuthenticated(true);
    setUser(prev => ({
      ...prev,
      name: userData.name || prev.name,
      email: userData.email || prev.email,
      area: userData.area || prev.area,
      plan: userData.plan || 'Free',
      interests: (userData.interests && userData.interests.length > 0) ? userData.interests : (prev.interests || ['Home', 'Tools', 'Electronics', 'Services']),
      avatar: (userData.name || 'AM').split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()
    }));
    if (userData.plan) {
      setPlanState(userData.plan);
    }
    addToast('Account created successfully!', 'success');
    setRoute('home');
  };

  const logout = () => {
    setIsAuthenticated(false);
    addToast('You have been signed out.', 'info');
    setRoute('home');
  };

  const updateInterests = (newInterests) => {
    setUser(prev => ({
      ...prev,
      interests: newInterests
    }));
    addToast('Your feed preferences have been updated!', 'success');
  };

  // Search & Exploration Filters
  const [search, setSearch] = useState(savedState?.search || '');
  const [category, setCategory] = useState(savedState?.category || 'All');
  const [sortBy, setSortBy] = useState(savedState?.sortBy || 'featured');
  const [onlyFavorites, setOnlyFavorites] = useState(savedState?.onlyFavorites || false);

  // Entities & Datasets
  const [listings, setListings] = useState(savedState?.listings || INITIAL_LISTINGS);
  const [likes, setLikes] = useState(savedState?.likes || [1, 2, 5]);
  const [reels, setReels] = useState(savedState?.reels || DEMO_STORIES);
  const [reelsFilter, setReelsFilter] = useState('All');

  // Modals & Active Selections
  const [activeReel, setActiveReel] = useState(null);
  const [activeListing, setActiveListing] = useState(null);
  const [activeBooking, setActiveBooking] = useState(null);
  const [selectedResource, setSelectedResource] = useState(null);
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [postModalOpen, setPostModalOpen] = useState(false);

  // Bookings & Transactions Lifecycle
  const [bookings, setBookings] = useState(savedState?.bookings || [
    {
      id: 'BK-9872',
      listingId: 2,
      listingTitle: 'Sony FX6 Cinema Camera Rig',
      provider: 'Alex R.',
      renterName: 'Alex Morgan',
      price: 90,
      unit: 'day',
      rentalDays: 3,
      dates: 'Oct 12-14 (3 days)',
      deposit: 1500,
      total: 314.25,
      stage: 'Payment review', // Exactly matching client screenshot flow
      protectionPlanEnabled: true,
      protectionDailyRate: 12.50,
      policyId: 'TN-987XBC-24',
      created: Date.now() - 3600000 * 2,
      qrToken: 'QR-IDLE-SONY-9872-SECURE',
      image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
      conditionPhotos: ['https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80'],
      statusHistory: [
        { time: '2 hours ago', message: 'Booking initiated for Sony FX6 Cinema Camera Rig' },
        { time: '1 hour ago', message: 'Digital agreement approved by Alex R. & renter' },
        { time: 'Just now', message: 'Payment and Tint.ai protection plan review ready' }
      ]
    },
    {
      id: 'BK-8901',
      listingId: 1,
      listingTitle: 'Compact Excavator Rental',
      provider: 'Northline Rentals',
      renterName: 'Alex Morgan',
      price: 250,
      unit: 'day',
      rentalDays: 2,
      dates: 'Tomorrow (2 days)',
      deposit: 500,
      total: 512.50,
      stage: 'Agreement preview',
      protectionPlanEnabled: true,
      protectionDailyRate: 12.50,
      policyId: 'TN-8901-EXC',
      created: Date.now() - 3600000 * 4,
      qrToken: 'QR-IDLE-EXC-8901-SECURE',
      conditionPhotos: ['https://images.unsplash.com/photo-1610477865545-37711c53144d?auto=format&fit=crop&w=400&q=80'],
      statusHistory: [
        { time: '4 hours ago', message: 'Booking requested by Alex Morgan' },
        { time: '3 hours ago', message: 'Northline Rentals accepted terms' },
        { time: '2 hours ago', message: 'Agreement draft generated' }
      ]
    },
    {
      id: 'BK-8902',
      listingId: 5,
      listingTitle: 'Designer Gala Occasion Outfit & Stole',
      provider: 'Avery Style Collective',
      renterName: 'Alex Morgan',
      price: 75,
      unit: 'day',
      rentalDays: 1,
      dates: 'Friday Gala (1 day)',
      deposit: 200,
      total: 89.38,
      stage: 'Handoff preview',
      protectionPlanEnabled: true,
      protectionDailyRate: 12.50,
      policyId: 'TN-8902-FAS',
      created: Date.now() - 3600000 * 24,
      qrToken: 'QR-IDLE-FAS-8902-SECURE',
      conditionPhotos: ['https://images.unsplash.com/photo-1746730921429-3a6489172f1b?auto=format&fit=crop&w=400&q=80'],
      statusHistory: [
        { time: '1 day ago', message: 'Booking requested & payment held' },
        { time: '18 hours ago', message: 'Security deposit authorized' },
        { time: '2 hours ago', message: 'Ready for pickup QR scan in Plano' }
      ]
    }
  ]);

  // Messages & Negotiations
  const [activeThreadId, setActiveThreadId] = useState(savedState?.activeThreadId || 'th-1');
  const [inbox, setInbox] = useState(savedState?.inbox || [
    {
      id: 'th-1',
      providerName: 'Northline Rentals',
      providerAvatar: 'NR',
      providerImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
      listingTitle: 'Compact Excavator Rental',
      unread: false,
      messages: [
        { id: 'm1', from: 'provider', text: 'Hi Alex! The excavator is serviced and fueled. When would you like the trailer handoff?', time: '3:15 PM' },
        { id: 'm2', from: 'user', text: 'Hi! Can we meet at the Frisco North depot tomorrow at 9:00 AM?', time: '3:20 PM' },
        { id: 'm3', from: 'provider', text: 'Sounds perfect. The single-use QR handoff code is ready in your booking dashboard.', time: '3:22 PM' }
      ]
    },
    {
      id: 'th-2',
      providerName: 'Avery Style Collective',
      providerAvatar: 'AS',
      providerImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80',
      listingTitle: 'Designer Gala Occasion Outfit',
      unread: true,
      messages: [
        { id: 'm4', from: 'user', text: 'Hi Avery! Can this outfit be fitted for a Saturday gala?', time: 'Yesterday' },
        { id: 'm5', from: 'provider', text: 'Absolutely! I include a matching gold-trimmed stole and eco dry cleaning.', time: 'Yesterday' }
      ]
    }
  ]);

  // Enterprise Workspace
  const [enterpriseTeam, setEnterpriseTeam] = useState(savedState?.enterpriseTeam || INITIAL_ENTERPRISE_TEAM);
  const [enterpriseTasks, setEnterpriseTasks] = useState(savedState?.enterpriseTasks || INITIAL_ENTERPRISE_TASKS);

  // Toasts Notification system (with duplicate suppression)
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = 'info') => {
    setToasts(prev => {
      // Prevent identical notifications from appearing twice simultaneously
      if (prev.some(t => t.message === message)) {
        return prev;
      }
      const id = Date.now() + Math.random();
      setTimeout(() => {
        setToasts(current => current.filter(t => t.id !== id));
      }, 3500);
      return [...prev, { id, message, type }];
    });
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Clean HTML5 route transitions (no # in URL)
  const setRoute = (newRoute) => {
    if (PHASE_2_ROUTES.includes(newRoute)) {
      addToast('This feature will be available in Phase 2!', 'info');
      return;
    }
    setRouteState(newRoute);
    const path = newRoute === 'home' ? '/' : `/${newRoute}`;
    window.history.pushState({ route: newRoute }, '', path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Support browser Back and Forward navigation
  useEffect(() => {
    const handlePopState = () => {
      const pathname = window.location.pathname.replace(/^\/+/, '').split('/')[0] || 'home';
      if (VALID_ROUTES.includes(pathname) && !PHASE_2_ROUTES.includes(pathname)) {
        setRouteState(pathname);
      } else {
        setRouteState('home');
        window.history.replaceState(null, '', '/');
      }
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Switch subscription plan
  const setPlan = (newPlan) => {
    setPlanState(newPlan);
    setUser(prev => ({ ...prev, plan: newPlan }));
    addToast(`Membership updated to ${newPlan}!`, 'success');
  };

  // Toggle favorite / bookmark
  const toggleLike = (id) => {
    const isLiked = likes.includes(id);
    if (isLiked) {
      setLikes(prev => prev.filter(x => x !== id));
      addToast('Removed from saved favorites', 'info');
    } else {
      setLikes(prev => [...prev, id]);
      addToast('Saved to your favorites!', 'success');
    }
  };

  // Add new listing
  const addListing = (newListing) => {
    if (!isAuthenticated) {
      addToast('Please sign in or create an account to post a listing', 'error');
      setRoute('auth');
      return;
    }
    const item = {
      ...newListing,
      id: Date.now(),
      rating: 5.0,
      reviewsCount: 1,
      owner: user.name,
      ownerVerified: true,
      provider: plan
    };
    setListings(prev => [item, ...prev]);
    addToast('Your listing was published successfully!', 'success');
  };

  // Remove listing
  const removeListing = (id) => {
    setListings(prev => prev.filter(x => x.id !== id));
    addToast('Listing removed', 'info');
  };

  // Add 24-hr social reel
  const addReel = (reelData) => {
    if (!isAuthenticated) {
      addToast('Please sign in to share a 24-hr story or reel', 'error');
      setRoute('auth');
      return;
    }
    const newReel = {
      ...reelData,
      id: `user-reel-${Date.now()}`,
      author: user.name,
      likes: 1,
      created: Date.now(),
      source: 'user'
    };
    setReels(prev => [newReel, ...prev]);
    addToast('Your 24-hour Reel is now live for North Texas!', 'success');
  };

  // Create booking
  const createBooking = (listing) => {
    if (!isAuthenticated) {
      addToast('Please sign in or create an account to book equipment or services', 'error');
      setRoute('auth');
      return;
    }
    const days = 3;
    const subtotal = (listing.price || 50) * days;
    const idleFee = Number((subtotal * 0.025).toFixed(2));
    const insurance = Number((12.50 * days).toFixed(2));
    const totalDue = Number((subtotal + idleFee + insurance).toFixed(2));
    const depositHold = listing.deposit || (listing.price > 100 ? 500 : 150);

    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      listingId: listing.id,
      listingTitle: listing.title,
      provider: listing.owner || 'IDLE Verified Provider',
      renterName: user.name || 'Alex Morgan',
      price: listing.price,
      unit: listing.unit || 'day',
      rentalDays: days,
      dates: `Next ${days} Days (${days} days)`,
      deposit: depositHold,
      total: totalDue,
      stage: 'Payment review', // Open directly to Payment & Protection Plan review
      protectionPlanEnabled: true,
      protectionDailyRate: 12.50,
      policyId: `TN-${Math.floor(100 + Math.random() * 900)}XBC-24`,
      created: Date.now(),
      qrToken: `QR-IDLE-${listing.id || 'GEN'}-${Date.now().toString(36).toUpperCase()}`,
      image: listing.image,
      conditionPhotos: [listing.image],
      statusHistory: [
        { time: 'Just now', message: `Booking initiated for ${listing.title}` },
        { time: 'Just now', message: 'Payment review & Tint.ai protection plan ready' }
      ]
    };
    setBookings(prev => [newBooking, ...prev]);
    setActiveBooking(newBooking);
    setRoute('bookings');
    addToast(`Booking initiated for "${listing.title}"! Review payment & protection plan.`, 'success');
  };

  // Toggle or update protection plan on a booking
  const updateBooking = (bookingId, updates) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        const updated = { ...b, ...updates };
        if (activeBooking?.id === bookingId) {
          setActiveBooking(updated);
        }
        return updated;
      }
      return b;
    }));
  };

  // Open or initiate direct messaging thread for a listing
  const startMessageThread = (listing) => {
    if (!isAuthenticated) {
      addToast('Please sign in to message providers and negotiate', 'info');
      setRoute('auth');
      return;
    }
    const providerName = listing.owner || 'Community Provider';
    const listingTitle = listing.title || 'Marketplace Item';

    let thread = inbox.find(t =>
      (t.providerName && t.providerName.toLowerCase() === providerName.toLowerCase()) ||
      (t.listingTitle && t.listingTitle.toLowerCase() === listingTitle.toLowerCase())
    );

    if (!thread) {
      const newThreadId = `th-${Date.now()}`;
      thread = {
        id: newThreadId,
        providerName: providerName,
        providerAvatar: providerName.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || 'CP',
        providerImage: listing.image || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
        listingTitle: listingTitle,
        unread: false,
        messages: [
          {
            id: `m-${Date.now()}`,
            from: 'provider',
            text: `Hi ${user.name ? user.name.split(' ')[0] : 'there'}! Thanks for checking out "${listingTitle}". When would you like to arrange pickup or inspection?`,
            time: 'Just now'
          }
        ]
      };
      setInbox(prev => [thread, ...prev]);
      setActiveThreadId(newThreadId);
    } else {
      setActiveThreadId(thread.id);
    }

    setRoute('messages');
    addToast(`Opened conversation with ${providerName}`, 'info');
  };

  // Update booking stage
  const advanceBookingStage = (bookingId, nextStage) => {
    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        const updated = {
          ...b,
          stage: nextStage,
          statusHistory: [
            { time: 'Just now', message: `Stage advanced to: ${nextStage}` },
            ...(b.statusHistory || [])
          ]
        };
        if (activeBooking?.id === bookingId) {
          setActiveBooking(updated);
        }
        return updated;
      }
      return b;
    }));
    addToast(`Booking updated: ${nextStage}`, 'success');
  };

  // Send in-thread message
  const sendMessage = (threadId, text) => {
    if (!text.trim()) return;
    setInbox(prev => prev.map(t => {
      if (t.id === threadId) {
        return {
          ...t,
          messages: [
            ...t.messages,
            { id: `m-${Date.now()}`, from: 'user', text, time: 'Just now' }
          ]
        };
      }
      return t;
    }));
  };

  // Enterprise team actions
  const addEnterpriseMember = (member) => {
    const newMember = {
      ...member,
      id: `tm-${Date.now()}`,
      status: 'Active',
      tasksCount: 0
    };
    setEnterpriseTeam(prev => [...prev, newMember]);
    addToast(`Team member ${member.name} added!`, 'success');
  };

  const removeEnterpriseMember = (id) => {
    setEnterpriseTeam(prev => prev.filter(m => m.id !== id));
    addToast('Team member removed', 'info');
  };

  const addEnterpriseTask = (task) => {
    const newTask = {
      ...task,
      id: `task-${Date.now()}`,
      status: 'Assigned'
    };
    setEnterpriseTasks(prev => [newTask, ...prev]);
    addToast(`Dispatch assignment created: ${task.title}`, 'success');
  };

  // 1-Click Studio Business Seeder for Owner Sandbox
  const seedOwnerDemo = () => {
    setIsAuthenticated(true);
    setPlanState('Studio');
    setOwnerRoleState('provider');
    setUser(prev => ({
      ...prev,
      name: prev.name === 'Guest member' ? 'Your IDLE Studio' : prev.name,
      joined: true,
      plan: 'Studio'
    }));

    const sampleListings = [
      {
        id: 10001,
        title: 'Local Handyman · Furniture & Small Repairs',
        category: 'Services',
        price: 65,
        unit: 'hour',
        area: 'Frisco, TX',
        image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?auto=format&fit=crop&w=600&q=80',
        description: 'Furniture assembly, door adjustments and small household repairs. Tools and materials confirmed prior to arrival.',
        rating: 5.0,
        reviewsCount: 4,
        owner: 'Your IDLE Studio',
        ownerVerified: true,
        type: 'Service'
      },
      {
        id: 10002,
        title: 'Weekend Move & Home Setup Assistance',
        category: 'Services',
        price: 95,
        unit: 'hour',
        area: 'Plano, TX',
        image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=600&q=80',
        description: 'Two-person moving helper service for staging furniture, assembling decor and regional courier transport.',
        rating: 4.95,
        reviewsCount: 7,
        owner: 'Your IDLE Studio',
        ownerVerified: true,
        type: 'Service'
      },
      {
        id: 10003,
        title: 'Sony FX3 Cinema Camera Kit for Creators',
        category: 'Electronics',
        price: 85,
        unit: 'day',
        area: 'Frisco, TX',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80',
        description: 'Full 4K creator cinema package with 24-70mm G Master lens, carbon tripod and high-speed SD cards.',
        rating: 5.0,
        reviewsCount: 12,
        owner: 'Your IDLE Studio',
        ownerVerified: true,
        type: 'Rental'
      },
      {
        id: 10004,
        title: '4-Person Camping & Outdoor Expedition Bundle',
        category: 'Outdoors',
        price: 35,
        unit: 'day',
        area: 'Frisco, TX',
        image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?auto=format&fit=crop&w=600&q=80',
        description: 'Waterproof 4-person cabin tent, dual sleeping bags, portable propane burner and battery lantern.',
        rating: 4.9,
        reviewsCount: 9,
        owner: 'Your IDLE Studio',
        ownerVerified: true,
        type: 'Rental'
      }
    ];

    setListings(prev => {
      const existingIds = new Set(prev.map(l => l.id));
      const toAdd = sampleListings.filter(l => !existingIds.has(l.id));
      return [...toAdd, ...prev];
    });

    // Seed customer inquiry thread
    const seedThread = {
      id: 'th-seed-owner',
      providerName: 'Marcus Vance',
      providerAvatar: 'MV',
      providerImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      listingTitle: 'Sony FX3 Cinema Camera Kit for Creators',
      unread: true,
      messages: [
        { id: 'sm1', from: 'provider', text: 'Hi! I saw your Sony FX3 camera rig. Is this available for a commercial shoot this Saturday?', time: '10:15 AM' },
        { id: 'sm2', from: 'user', text: 'Yes, it is clean and pre-calibrated. We can do a pickup handoff in Frisco.', time: '10:20 AM' },
        { id: 'sm3', from: 'provider', text: 'Great! I have submitted an offer for $85/day for 2 days. Looking forward to the QR handoff!', time: '10:25 AM' }
      ]
    };

    setInbox(prev => [seedThread, ...prev.filter(t => t.id !== 'th-seed-owner')]);
    addToast('Studio business seeded: inventory, inquiries & customer offers are ready!', 'success');
    setRoute('owner');
  };

  // Reset demo data
  const resetDemoData = () => {
    localStorage.removeItem(STORAGE_KEY);
    window.location.reload();
  };

  // Save state to localStorage whenever critical data changes
  useEffect(() => {
    try {
      const stateToSave = {
        route,
        plan,
        ownerRole,
        user,
        isAuthenticated,
        search,
        category,
        sortBy,
        onlyFavorites,
        listings,
        likes,
        reels,
        bookings,
        inbox,
        enterpriseTeam,
        enterpriseTasks
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (e) {
      console.warn('Storage quota exceeded', e);
    }
  }, [route, plan, ownerRole, user, isAuthenticated, search, category, sortBy, onlyFavorites, listings, likes, reels, bookings, inbox, enterpriseTeam, enterpriseTasks]);

  return (
    <AppContext.Provider value={{
      route,
      setRoute,
      isAuthenticated,
      authMode,
      setAuthMode,
      openAuth,
      login,
      signup,
      logout,
      updateInterests,
      user,
      setUser,
      setUserLocation,
      plan,
      setPlan,
      ownerRole,
      setOwnerRole,
      PLAN_REGISTRY,
      search,
      setSearch,
      category,
      setCategory,
      sortBy,
      setSortBy,
      onlyFavorites,
      setOnlyFavorites,
      listings,
      likes,
      toggleLike,
      addListing,
      removeListing,
      reels,
      reelsFilter,
      setReelsFilter,
      addReel,
      activeReel,
      setActiveReel,
      activeListing,
      setActiveListing,
      bookings,
      createBooking,
      activeBooking,
      setActiveBooking,
      advanceBookingStage,
      updateBooking,
      inbox,
      sendMessage,
      activeThreadId,
      setActiveThreadId,
      startMessageThread,
      enterpriseTeam,
      addEnterpriseMember,
      removeEnterpriseMember,
      enterpriseTasks,
      addEnterpriseTask,
      selectedResource,
      setSelectedResource,
      onboardingOpen,
      setOnboardingOpen,
      postModalOpen,
      setPostModalOpen,
      toasts,
      addToast,
      removeToast,
      seedOwnerDemo,
      resetDemoData
    }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
