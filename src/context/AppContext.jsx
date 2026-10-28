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

  const VALID_ROUTES = ['home', 'explore', 'reels', 'post', 'messages', 'transactions', 'enterprise', 'resources', 'membership', 'profile', 'journey', 'auth', 'privacy', 'terms', 'contact'];
  const PHASE_2_ROUTES = ['transactions', 'enterprise', 'resources'];

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
      notifications: true
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

  // Search & Exploration Filters
  const [search, setSearch] = useState(savedState?.search || '');
  const [category, setCategory] = useState(savedState?.category || 'All');
  const [sortBy, setSortBy] = useState(savedState?.sortBy || 'featured');
  const [onlyFavorites, setOnlyFavorites] = useState(savedState?.onlyFavorites || false);

  // Entities & Datasets
  const [listings, setListings] = useState(savedState?.listings || INITIAL_LISTINGS);
  const [likes, setLikes] = useState(savedState?.likes || [1, 2, 5]);
  const [reels, setReels] = useState(savedState?.reels || DEMO_STORIES);

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
      id: 'BK-8901',
      listingId: 1,
      listingTitle: 'Compact Excavator Rental',
      provider: 'Northline Rentals',
      renterName: 'Alex Morgan',
      price: 250,
      unit: 'day',
      deposit: 500,
      total: 750,
      stage: 'Agreement preview', // 'Draft', 'Agreement preview', 'Payment review', 'Handoff preview', 'Completed'
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
      deposit: 200,
      total: 275,
      stage: 'Handoff preview',
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
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      listingId: listing.id,
      listingTitle: listing.title,
      provider: listing.owner,
      renterName: user.name,
      price: listing.price,
      unit: listing.unit,
      deposit: listing.deposit || 100,
      total: (listing.price || 0) + (listing.deposit || 100),
      stage: 'Agreement preview',
      created: Date.now(),
      qrToken: `QR-IDLE-${listing.id}-${Date.now().toString(36).toUpperCase()}`,
      conditionPhotos: [listing.image],
      statusHistory: [
        { time: 'Just now', message: `Booking initiated for ${listing.title}` },
        { time: 'Just now', message: 'Agreement terms loaded for review' }
      ]
    };
    setBookings(prev => [newBooking, ...prev]);
    setActiveBooking(newBooking);
    addToast('Booking initiated! Agreement & single-use QR custody features will launch in Phase 2.', 'info');
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
    addToast('Message sent to provider', 'info');
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
  }, [route, plan, user, isAuthenticated, search, category, sortBy, onlyFavorites, listings, likes, reels, bookings, inbox, enterpriseTeam, enterpriseTasks]);

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
      user,
      setUser,
      setUserLocation,
      plan,
      setPlan,
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
      inbox,
      sendMessage,
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
