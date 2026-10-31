import React, { createContext, useContext, useState, useEffect } from 'react';

const AdminContext = createContext(null);

const STORAGE_KEY = 'idle_admin_preview_v2';

export const ADMIN_ROLES = {
  'Super Admin': {
    desc: 'Full operational owner preview',
    views: ['overview', 'members', 'listings', 'support', 'transactions', 'subscriptions', 'elite', 'reels', 'teams', 'ai', 'automations', 'resources', 'audit'],
    icon: '♛'
  },
  'Operations Lead': {
    desc: 'Marketplace, bookings and operational queues',
    views: ['overview', 'members', 'listings', 'support', 'transactions', 'elite', 'teams', 'ai', 'automations', 'resources', 'audit'],
    icon: '▦'
  },
  'Support Agent': {
    desc: 'Support tickets, team chat and approved knowledge',
    views: ['overview', 'support', 'teams', 'ai', 'resources'],
    icon: '◉'
  },
  'Trust & Safety': {
    desc: 'Listings, Reel reports, verification statuses',
    views: ['overview', 'members', 'listings', 'support', 'elite', 'reels', 'teams', 'ai', 'resources', 'audit'],
    icon: '◇'
  },
  'Finance Lead': {
    desc: 'Subscription summaries, disputes and approvals',
    views: ['overview', 'transactions', 'subscriptions', 'support', 'teams', 'resources', 'audit'],
    icon: '◈'
  },
  'Elite Concierge': {
    desc: 'Private-member coordination with minimum data access',
    views: ['overview', 'elite', 'support', 'teams', 'ai', 'resources'],
    icon: '♛'
  }
};

export const ADMIN_NAV_GROUPS = [
  ['OPERATIONS', [
    ['overview', 'Overview', '◫'],
    ['members', 'Members', '♙'],
    ['listings', 'Listings', '▦'],
    ['support', 'Support inbox', '✉'],
    ['transactions', 'Transactions', '⇄'],
    ['subscriptions', 'Subscriptions', '◈']
  ]],
  ['PRIVATE & CONTENT', [
    // Hidden per user request (kept intact for easy re-enabling)
    ['elite', 'Elite PM', '♛', { hidden: true }],
    ['reels', 'Reels & Safety', '▶']
  ]],
  ['YOUR TEAM', [
    ['teams', 'Team workspace', '♧'],
    ['ai', 'AI Help Desk', '✦'],
    ['automations', 'Automations', '⚙'],
    // Hidden per user request (kept intact for easy re-enabling)
    ['resources', 'Resources', '☷', { hidden: true }],
    ['audit', 'Audit history', '▤']
  ]]
];

export const ADMIN_VIEW_TITLES = {
  overview: 'Operations overview',
  members: 'Member management',
  listings: 'Marketplace review',
  support: 'Customer support center',
  transactions: 'Transaction oversight',
  subscriptions: 'Subscription operations',
  elite: 'Elite PM concierge',
  reels: 'Reels and trust & safety',
  teams: 'Internal team workspace',
  ai: 'AI-assisted help desk',
  automations: 'Automation control room',
  resources: 'Tools and resources',
  audit: 'Activity and audit trail'
};

const getInitialAdminData = () => {
  const now = Date.now();
  return {
    users: [
      { id: 'M-1042', name: 'Jordan Vance', plan: 'Studio', city: 'Frisco', status: 'Active', identity: 'Verified', credentials: 'Not requested', joined: '2026-10-22', service: 'Provider', email: 'jordan.v@example.com' },
      { id: 'M-1048', name: 'Elena Rostova', plan: 'Studio Pro', city: 'Plano', status: 'Active', identity: 'Pending', credentials: 'Awaiting review', joined: '2026-10-23', service: 'Provider', email: 'elena.r@example.com' },
      { id: 'M-1051', name: 'Marcus Bell', plan: 'Free', city: 'Dallas', status: 'Active', identity: 'Not requested', credentials: 'Not requested', joined: '2026-10-24', service: 'Customer', email: 'marcus.b@example.com' },
      { id: 'M-1063', name: 'Prestige Livery Trust', plan: 'Business', city: 'Southlake', status: 'Active', identity: 'Verified', credentials: 'Complete', joined: '2026-10-25', service: 'Business', email: 'dispatch@prestigelivery.com' },
      { id: 'M-1071', name: 'Park Cities Asset Group', plan: 'Enterprise', city: 'Dallas', status: 'Active', identity: 'Verified', credentials: 'Complete', joined: '2026-10-25', service: 'Organization', email: 'treasury@parkcities.com' },
      { id: 'M-1078', name: 'Apex Aerial Lab', plan: 'Studio', city: 'Prosper', status: 'Review', identity: 'Pending', credentials: 'Requires user action', joined: '2026-10-26', service: 'Provider', email: 'ops@apexaerial.com' },
      { id: 'M-1082', name: 'Stonebriar Executive', plan: 'Studio Pro', city: 'Frisco', status: 'Active', identity: 'Verified', credentials: 'Not requested', joined: '2026-10-27', service: 'Provider', email: 'concierge@stonebriar.com' },
      { id: 'M-1091', name: 'Claire Dupont', plan: 'Free', city: 'McKinney', status: 'Active', identity: 'Not requested', credentials: 'Not requested', joined: '2026-10-28', service: 'Customer', email: 'claire.d@example.com' }
    ],
    listings: [
      { id: 'L-221', title: 'Compact Excavator & Trailer Rig', category: 'Equipment rental', city: 'Frisco', scope: 'Public', status: 'Active', member: 'M-1042', price: '$250/day' },
      { id: 'L-227', title: 'Executive Strength Coaching Session', category: 'Personal training', city: 'Plano', scope: 'Public', status: 'Active', member: 'M-1048', price: '$120/hr' },
      { id: 'L-231', title: 'Luxury Black SUV Chauffeur Transfer', category: 'Ground transport', city: 'Dallas', scope: 'Elite PM', status: 'Review', member: 'M-1063', price: '$150/hr' },
      { id: 'L-238', title: 'Mediterranean Estate Pavilion & Lawns', category: 'Private estate', city: 'Southlake', scope: 'Elite PM', status: 'Active', member: 'M-1071', price: '$1,200/hr' },
      { id: 'L-245', title: 'Sony FX3 Cinema Creator Kit', category: 'Electronics rental', city: 'Plano', scope: 'Public', status: 'Flagged', member: 'M-1078', price: '$85/day' },
      { id: 'L-251', title: 'Covered Private Vertiport Parking Bay', category: 'Private parking', city: 'Frisco', scope: 'Elite PM', status: 'Review', member: 'M-1082', price: '$45/day' }
    ],
    tickets: [
      {
        id: 'C-321',
        member: 'M-1042',
        subject: 'When will the rental deposit authorization expire?',
        team: 'Customer Support',
        assignee: 'Support Agent',
        priority: 'Medium',
        status: 'Open',
        category: 'Payments',
        updated: now - 2500000,
        messages: [
          { from: 'member', body: 'I returned the rental with clean QR scan in Plano. When does the temporary authorization deposit end?', at: now - 3600000 }
        ]
      },
      {
        id: 'C-322',
        member: 'M-1048',
        subject: 'Provider business verification is pending',
        team: 'Trust & Safety',
        assignee: 'Trust & Safety',
        priority: 'Medium',
        status: 'In progress',
        category: 'Verification',
        updated: now - 6500000,
        messages: [
          { from: 'member', body: 'My verification screen says pending Stripe KYC check. Can an agent verify the operator certificate?', at: now - 8500000 }
        ]
      },
      {
        id: 'C-323',
        member: 'M-1063',
        subject: 'Elite parking host scheduling conflict at Frisco Station',
        team: 'Elite Concierge',
        assignee: 'Elite Concierge',
        priority: 'High',
        status: 'Open',
        category: 'Elite PM',
        updated: now - 1000000,
        messages: [
          { from: 'member', body: 'Please coordinate an earlier arrival window for the black-car transport. Flight landing at Addison FBO at 3 PM.', at: now - 1700000 }
        ]
      },
      {
        id: 'C-324',
        member: 'M-1051',
        subject: 'Understanding free versus Studio subscription capabilities',
        team: 'Customer Support',
        assignee: 'Support Agent',
        priority: 'Low',
        status: 'Open',
        category: 'Membership',
        updated: now - 5400000,
        messages: [
          { from: 'member', body: 'Can I message a provider with a free account, or do I need the Studio tier to confirm custody handoffs?', at: now - 9400000 }
        ]
      },
      {
        id: 'C-325',
        member: 'M-1078',
        subject: 'Report about a misleading camera serial number',
        team: 'Trust & Safety',
        assignee: 'Trust & Safety',
        priority: 'High',
        status: 'In progress',
        category: 'Safety',
        updated: now - 3200000,
        messages: [
          { from: 'member', body: 'The listing states cinema rig has dual CFexpress cards, but photos show standard SD cards only.', at: now - 3600000 }
        ]
      },
      {
        id: 'C-326',
        member: 'M-1071',
        subject: 'How to add an enterprise dispatcher seat?',
        team: 'Marketplace Operations',
        assignee: 'Operations Lead',
        priority: 'Low',
        status: 'Resolved',
        category: 'Enterprise',
        updated: now - 10200000,
        messages: [
          { from: 'member', body: 'Where do I add a team dispatcher for our corporate account?', at: now - 15200000 },
          { from: 'agent', body: 'Navigate to your Enterprise Workspace → Team Members → Invite Seat, and select Dispatcher permissions.', at: now - 10200000 }
        ]
      }
    ],
    transactions: [
      { id: 'B-441', member: 'M-1042', scope: 'Public', type: 'Rental', amount: 250, status: 'Handoff scheduled', payment: 'Authorization hold $1,500 active', issue: 'None' },
      { id: 'B-446', member: 'M-1048', scope: 'Public', type: 'Service', amount: 120, status: 'Completed', payment: 'Stripe Connect split released (97.5% / 2.5%)', issue: 'None' },
      { id: 'B-452', member: 'M-1063', scope: 'Elite PM', type: 'Private parking', amount: 140, status: 'Pending host approval', payment: 'Pre-authorized hold', issue: 'Arrival conflict' },
      { id: 'B-454', member: 'M-1071', scope: 'Elite PM', type: 'Estate experience', amount: 1200, status: 'Request received', payment: 'Escrow hold pending', issue: 'None' }
    ],
    invoices: [
      { id: 'S-541', member: 'M-1042', plan: 'Studio', amount: 29, status: 'Paid', next: '2026-11-22' },
      { id: 'S-548', member: 'M-1048', plan: 'Studio Pro', amount: 59, status: 'Paid', next: '2026-11-23' },
      { id: 'S-563', member: 'M-1063', plan: 'Business', amount: 149, status: 'Paid', next: '2026-11-25' },
      { id: 'S-571', member: 'M-1071', plan: 'Enterprise', amount: 399, status: 'Paid', next: '2026-11-25' },
      { id: 'S-578', member: 'M-1078', plan: 'Studio', amount: 29, status: 'Failed (demo)', next: 'Review required' }
    ],
    eliteApprovals: [
      { id: 'E-21', member: 'M-1063', kind: 'Private parking listing', city: 'Southlake', status: 'Pending', notes: 'Gated access credentials and host authority check required' },
      { id: 'E-22', member: 'M-1071', kind: 'Private estate event', city: 'Frisco', status: 'Pending', notes: 'Event occupancy, valet route and insurance certificate review outstanding' },
      { id: 'E-23', member: 'M-1082', kind: 'Luxury ground transfer', city: 'Dallas', status: 'Pending', notes: 'Chauffeur license and executive insurance policy pending review' }
    ],
    reels: [
      { id: 'R-71', author: 'M-1042', scope: 'Public', caption: 'New excavator and bobcat bundle available in Frisco', status: 'Active', reports: 0, expires: now + 54000000 },
      { id: 'R-72', author: 'M-1078', scope: 'Public', caption: 'Weekend 4K cinema toolkit test shots', status: 'Flagged', reports: 2, expires: now + 24600000 },
      { id: 'R-73', author: 'M-1063', scope: 'Elite PM', caption: 'Executive chauffeur arrival showcase at Addison FBO', status: 'Active', reports: 0, expires: now + 40200000 },
      { id: 'R-74', author: 'M-1071', scope: 'Elite PM', caption: 'Highland Park estate boardroom walkthrough', status: 'Review', reports: 1, expires: now + 72000000 }
    ],
    employees: [
      { id: 'A-01', name: 'Owner', role: 'Super Admin', team: 'Administration', status: 'Active' },
      { id: 'A-02', name: 'Ops Desk', role: 'Operations Lead', team: 'Marketplace Operations', status: 'Active' },
      { id: 'A-03', name: 'Care Desk', role: 'Support Agent', team: 'Customer Support', status: 'Active' },
      { id: 'A-04', name: 'Safety Desk', role: 'Trust & Safety', team: 'Trust & Safety', status: 'Active' },
      { id: 'A-05', name: 'Billing Desk', role: 'Finance Lead', team: 'Billing & Subscriptions', status: 'Active' },
      { id: 'A-06', name: 'Elite Desk', role: 'Elite Concierge', team: 'Elite Concierge', status: 'Active' }
    ],
    tasks: [
      { id: 'W-101', title: 'Review reported cinema kit listing for item serial mismatch', team: 'Trust & Safety', assignee: 'Safety Desk', priority: 'High', status: 'In progress' },
      { id: 'W-102', title: 'Send status update for pending operator verification', team: 'Customer Support', assignee: 'Care Desk', priority: 'Medium', status: 'Open' },
      { id: 'W-103', title: 'Check private parking host documentation and access gates', team: 'Elite Concierge', assignee: 'Elite Desk', priority: 'High', status: 'Open' },
      { id: 'W-104', title: 'Review subscription retry billing notice copy', team: 'Billing & Subscriptions', assignee: 'Billing Desk', priority: 'Low', status: 'Completed' }
    ],
    channels: {
      general: [
        { id: 'c1', by: 'Ops Desk', msg: 'Welcome to the IDLE admin operations center. Always verify custody signatures prior to escrow release.', at: now - 10000000 }
      ],
      support: [
        { id: 'c2', by: 'Care Desk', msg: 'Ticket C-321 deposit query was addressed. Reminded renter about 48-hr Stripe pre-auth release window.', at: now - 6000000 }
      ],
      safety: [
        { id: 'c3', by: 'Safety Desk', msg: 'Reel R-72 flagged for equipment review. Host has supplied matching serial confirmation.', at: now - 8000000 }
      ],
      elite: [
        { id: 'c4', by: 'Elite Desk', msg: 'Part 135 flight coordinator confirmed empty leg out of McKinney TKI. Escrow token active.', at: now - 5000000 }
      ]
    },
    automations: [
      { id: 'a1', name: '24-hour Reel Expiry', desc: 'Automatically unpublish and archive stories older than 24 hours.', enabled: true },
      { id: 'a2', name: 'Automated Tint.ai Underwriting', desc: 'Auto-verify renter protection eligibility and calculate daily policy tier ($12.50/day).', enabled: true },
      { id: 'a3', name: 'Clean QR Custody Auto-Release', desc: 'Release pre-authorized deposit holds immediately upon matching return QR scans.', enabled: true },
      { id: 'a4', name: 'Private Listing Host Verification Hold', desc: 'Place unverified private asset listings in queue until host ownership is confirmed.', enabled: true },
      { id: 'a5', name: 'Stripe Connect Split Payouts', desc: 'Route 97.5% of completed funds directly to lender account, retaining 2.5% platform fee.', enabled: true },
      { id: 'a6', name: 'Urgent Support SLA Escalation', desc: 'Escalate open safety or custody dispute tickets unaddressed after 60 minutes.', enabled: true },
      { id: 'a7', name: 'Automated High-Risk Abuse Filter', desc: 'Flag listings with mismatched external links for manual operator review.', enabled: false }
    ],
    history: [
      { id: 'LOG-1', at: now - 12000000, actor: 'Super Admin', event: 'Admin operational center initialized', module: 'System' },
      { id: 'LOG-2', at: now - 7200000, actor: 'Trust & Safety', event: 'Verified Part 135 operator credentials for M-1071', module: 'Members' },
      { id: 'LOG-3', at: now - 3600000, actor: 'Finance Lead', event: 'Stripe Connect payout split confirmed for BK-9872', module: 'Transactions' }
    ]
  };
};

export const AdminProvider = ({ children }) => {
  const loadInitial = () => {
    try {
      if (typeof window !== 'undefined' && window.localStorage) {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read admin state from localStorage', e);
    }
    return getInitialAdminData();
  };

  const [adminData, setAdminData] = useState(loadInitial);
  const [role, setRoleState] = useState(() => {
    try {
      return localStorage.getItem('idle_admin_active_role') || 'Super Admin';
    } catch {
      return 'Super Admin';
    }
  });
  const [adminEmail, setAdminEmail] = useState(() => {
    try {
      return localStorage.getItem('idle_admin_email') || 'admin@idle.market';
    } catch {
      return 'admin@idle.market';
    }
  });
  const [activeView, setActiveViewState] = useState('overview');
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    try {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        return sessionStorage.getItem('idle_admin_authenticated') === 'true';
      }
    } catch {
      return false;
    }
    return false;
  });
  const [feedback, setFeedback] = useState(null);

  const loginAdmin = ({ username, passcode, role: chosenRole }) => {
    const validPass = passcode && (passcode.trim().toUpperCase() === 'IDLE-DEMO' || passcode.trim().length >= 4);
    if (!validPass) {
      return { success: false, error: 'Invalid admin passcode. Use IDLE-DEMO' };
    }

    if (chosenRole && ADMIN_ROLES[chosenRole]) {
      setRoleState(chosenRole);
      try {
        localStorage.setItem('idle_admin_active_role', chosenRole);
      } catch {}
    }

    const emailToSet = username?.trim() || 'admin@idle.market';
    setAdminEmail(emailToSet);
    try {
      localStorage.setItem('idle_admin_email', emailToSet);
    } catch {}

    setIsLoggedIn(true);
    try {
      sessionStorage.setItem('idle_admin_authenticated', 'true');
    } catch {}

    addAuditLog(`Admin authenticated as ${chosenRole || role} (${username || 'admin'})`, 'Auth');
    showFeedback(`Welcome to IDLE Operations Center, ${chosenRole || role}!`);
    return { success: true };
  };

  const logoutAdmin = () => {
    setIsLoggedIn(false);
    try {
      sessionStorage.removeItem('idle_admin_authenticated');
    } catch {}
    addAuditLog('Admin session locked / logged out', 'Auth');
  };

  // Check role permission
  const can = (viewId) => {
    const roleDef = ADMIN_ROLES[role];
    if (!roleDef) return false;
    return roleDef.views.includes(viewId);
  };

  const setRole = (newRole) => {
    if (ADMIN_ROLES[newRole]) {
      setRoleState(newRole);
      try {
        localStorage.setItem('idle_admin_active_role', newRole);
      } catch {}
      // If current view is not permitted, switch to first permitted
      const roleDef = ADMIN_ROLES[newRole];
      if (!roleDef.views.includes(activeView)) {
        setActiveViewState(roleDef.views[0] || 'overview');
      }
      showFeedback(`Switched operational role to: ${newRole}`);
      addAuditLog(`Role switched to ${newRole}`, 'Auth');
    }
  };

  const setActiveView = (viewId) => {
    if (can(viewId)) {
      setActiveViewState(viewId);
    } else {
      showFeedback(`Access restricted for current role (${role})`);
    }
  };

  const showFeedback = (msg) => {
    setFeedback(msg);
    setTimeout(() => setFeedback(null), 4000);
  };

  const addAuditLog = (event, module = 'General') => {
    const entry = {
      id: `LOG-${Date.now()}`,
      at: Date.now(),
      actor: role,
      event,
      module
    };
    setAdminData(prev => ({
      ...prev,
      history: [entry, ...prev.history]
    }));
  };

  // Actions
  const updateMemberStatus = (userId, newStatus) => {
    setAdminData(prev => ({
      ...prev,
      users: prev.users.map(u => u.id === userId ? { ...u, status: newStatus } : u)
    }));
    addAuditLog(`Updated member ${userId} status to ${newStatus}`, 'Members');
    showFeedback(`Member ${userId} marked as ${newStatus}`);
  };

  const updateListingStatus = (listingId, newStatus) => {
    setAdminData(prev => ({
      ...prev,
      listings: prev.listings.map(l => l.id === listingId ? { ...l, status: newStatus } : l)
    }));
    addAuditLog(`Updated listing ${listingId} status to ${newStatus}`, 'Listings');
    showFeedback(`Listing ${listingId} is now ${newStatus}`);
  };

  const updateTicketStatus = (ticketId, newStatus) => {
    setAdminData(prev => ({
      ...prev,
      tickets: prev.tickets.map(t => t.id === ticketId ? { ...t, status: newStatus, updated: Date.now() } : t)
    }));
    addAuditLog(`Updated ticket ${ticketId} status to ${newStatus}`, 'Support');
    showFeedback(`Ticket ${ticketId} status updated to ${newStatus}`);
  };

  const replyToTicket = (ticketId, body) => {
    if (!body.trim()) return;
    setAdminData(prev => ({
      ...prev,
      tickets: prev.tickets.map(t => {
        if (t.id === ticketId) {
          return {
            ...t,
            updated: Date.now(),
            messages: [
              ...t.messages,
              { from: 'agent', body: body.trim(), at: Date.now() }
            ]
          };
        }
        return t;
      })
    }));
    addAuditLog(`Staff replied to ticket ${ticketId}`, 'Support');
    showFeedback('Response sent to customer successfully');
  };

  const toggleAutomation = (automationId) => {
    setAdminData(prev => ({
      ...prev,
      automations: prev.automations.map(a => a.id === automationId ? { ...a, enabled: !a.enabled } : a)
    }));
    addAuditLog(`Toggled automation rule ${automationId}`, 'Automations');
  };

  const approveEliteItem = (id, newStatus = 'Approved') => {
    setAdminData(prev => ({
      ...prev,
      eliteApprovals: prev.eliteApprovals.map(e => e.id === id ? { ...e, status: newStatus } : e)
    }));
    addAuditLog(`${newStatus} Elite PM item ${id}`, 'Elite PM');
    showFeedback(`Elite item ${id} ${newStatus}`);
  };

  const updateReelStatus = (reelId, newStatus) => {
    setAdminData(prev => ({
      ...prev,
      reels: prev.reels.map(r => r.id === reelId ? { ...r, status: newStatus } : r)
    }));
    addAuditLog(`Updated Reel ${reelId} to ${newStatus}`, 'Reels');
    showFeedback(`Reel ${reelId} marked as ${newStatus}`);
  };

  // Save to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(adminData));
    } catch (e) {
      console.warn('Storage quota exceeded for admin data', e);
    }
  }, [adminData]);

  return (
    <AdminContext.Provider value={{
      role,
      setRole,
      adminEmail,
      setAdminEmail,
      activeView,
      setActiveView,
      can,
      isLoggedIn,
      setIsLoggedIn,
      loginAdmin,
      logoutAdmin,
      adminData,
      setAdminData,
      feedback,
      showFeedback,
      addAuditLog,
      updateMemberStatus,
      updateListingStatus,
      updateTicketStatus,
      replyToTicket,
      toggleAutomation,
      approveEliteItem,
      updateReelStatus
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (!context) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};

