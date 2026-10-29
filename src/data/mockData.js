// IDLE Marketplace Mock Data & Entity Models
// Structured for seamless future Supabase PostgreSQL schema mapping and React Native reuse

export const CATEGORIES = [
  { id: 'All', label: 'All Categories', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80', description: 'Everything in your local radius' },
  { id: 'Tools', label: 'Tools & Equipment', image: 'https://images.unsplash.com/photo-1610477865545-37711c53144d?auto=format&fit=crop&w=800&q=80', description: 'Rent heavy machinery, power tools & gear' },
  { id: 'Outdoor', label: 'Outdoor & Adventure', image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=800&q=80', description: 'Tents, kayaks, camping & trail kits' },
  { id: 'Home', label: 'Home & Living', image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80', description: 'Designer furniture, staging & home goods' },
  { id: 'Electronics', label: 'Tech & Media', image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80', description: 'Cameras, drones, lenses & sound gear' },
  { id: 'Vehicles', label: 'Vehicles & Hauling', image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=800&q=80', description: 'Trucks, vans & trailers for moves' },
  { id: 'Services', label: 'Local Pros & Skills', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80', description: 'Handymen, repairs, landscaping & setups' },
  { id: 'Fashion', label: 'Fashion & Wardrobe', image: 'https://images.unsplash.com/photo-1746730921429-3a6489172f1b?auto=format&fit=crop&w=800&q=80', description: 'Occasion dresses, suits & luxury bags' },
  { id: 'Events', label: 'Events & Experiences', image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80', description: 'Canopies, lighting, sound & catering' },
  { id: 'Enterprise', label: 'Enterprise & Teams', image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80', description: 'Commercial spaces, fleet & staffing' },
  { id: 'Fitness', label: 'Fitness & Wellness', image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80', description: 'Personal trainers, sports kits & recovery' }
];

export const INITIAL_LISTINGS = [
  {
    id: 1,
    title: 'Compact Excavator Rental',
    category: 'Tools',
    price: 250,
    unit: 'day',
    deposit: 500,
    area: 'Frisco',
    owner: 'Northline Rentals',
    ownerVerified: true,
    rating: 4.95,
    reviewsCount: 38,
    image: 'https://images.unsplash.com/photo-1610477865545-37711c53144d?auto=format&fit=crop&w=1000&q=80',
    type: 'rental',
    tag: 'Heavy Equipment',
    desc: 'Compact earthmoving equipment for qualified users. Perfect for residential grading, trenching, and landscaping. Single-use QR handoff and operator agreement included.',
    provider: 'Business',
    features: ['Trailer included', 'Operating safety checklist', 'Clean tank guarantee', 'Single-use QR release']
  },
  {
    id: 2,
    title: 'Sony Alpha FX3 Cinema Camera Kit',
    category: 'Electronics',
    price: 85,
    unit: 'day',
    deposit: 300,
    area: 'Plano',
    owner: 'Maya Creative Studio',
    ownerVerified: true,
    rating: 4.98,
    reviewsCount: 54,
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=1000&q=80',
    type: 'rental',
    tag: 'Content Creators',
    desc: 'Full-frame cinema line camera with 24-70mm G-Master f/2.8 lens, 2x 160GB CFexpress cards, 3 batteries, and lightweight cage for weekend productions.',
    provider: 'Trade',
    features: ['4K 120p Ready', 'Top handle with XLR inputs', 'Pelican hardcase', 'Condition check before handoff']
  },
  {
    id: 3,
    title: 'Modern Sectional Lounge Sofa',
    category: 'Home',
    price: 45,
    unit: 'weekend',
    deposit: 150,
    area: 'Allen',
    owner: 'Home & Co. Staging',
    ownerVerified: true,
    rating: 4.88,
    reviewsCount: 19,
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80',
    type: 'rental',
    tag: 'Home Staging',
    desc: 'Contemporary oat-colored linen modular sectional sofa. Ideal for temporary real-estate open houses, commercial photo shoots, or weekend events.',
    provider: 'Business',
    features: ['Spotless professional steam cleaned', 'Modular 3-piece setup', 'Protective transit slipcovers']
  },
  {
    id: 4,
    title: '1-on-1 Functional Mobility & Strength Coach',
    category: 'Services',
    price: 60,
    unit: 'session',
    deposit: 0,
    area: 'McKinney',
    owner: 'Taylor Fitness Co.',
    ownerVerified: true,
    rating: 5.0,
    reviewsCount: 42,
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=1000&q=80',
    type: 'service',
    tag: 'Fitness Coach',
    desc: '60-minute private biomechanics and strength training session. Customized mobility evaluation, barbell mechanics, and recovery guidance. Meets at local training partner facility.',
    provider: 'Trade',
    features: ['NASM Certified', 'Personalized recovery plan', 'Video gait analysis', 'Direct chat consultation']
  },
  {
    id: 5,
    title: 'Designer Gala Occasion Outfit & Stole',
    category: 'Fashion',
    price: 75,
    unit: 'day',
    deposit: 200,
    area: 'Plano',
    owner: 'Avery Style Collective',
    ownerVerified: true,
    rating: 4.96,
    reviewsCount: 67,
    image: 'https://images.unsplash.com/photo-1746730921429-3a6489172f1b?auto=format&fit=crop&w=1000&q=80',
    type: 'rental',
    tag: 'Occasion Wear',
    desc: 'Curated emerald and gold embroidered gala evening outfit with tailored silhouette. Includes garment bag and insured dry cleaning upon return.',
    provider: 'Trade',
    features: ['Includes eco dry-cleaning', 'Fits sizes 4-6 (adjustable)', 'Wardrobe styling consultation included']
  },
  {
    id: 6,
    title: 'Licensed Handyman & Home Repair Pro',
    category: 'Services',
    price: 65,
    unit: 'hour',
    deposit: 0,
    area: 'Frisco',
    owner: 'Atlas Home Services',
    ownerVerified: true,
    rating: 4.92,
    reviewsCount: 88,
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1000&q=80',
    type: 'service',
    tag: 'Home Repairs',
    desc: 'General residential repairs, TV mounting, drywall patch, door alignment, fixture installs, and hardware repairs. Fully insured with own equipped work van.',
    provider: 'Business',
    features: ['General liability insured', 'Same-day urgent response', 'Full tool trailer on site']
  },
  {
    id: 7,
    title: '30x20ft Commercial Event Canopy Tent',
    category: 'Events',
    price: 450,
    unit: 'event',
    deposit: 350,
    area: 'Dallas',
    owner: 'Gather Events Co.',
    ownerVerified: true,
    rating: 4.89,
    reviewsCount: 23,
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=1000&q=80',
    type: 'rental',
    tag: 'Events & Parties',
    desc: 'Weather-rated commercial canopy tent with sidewalls, bistro perimeter lighting, and anchor weights. Accommodates up to 60 seated guests.',
    provider: 'Business',
    features: ['Wind-rated up to 35mph', 'Includes setup & takedown', 'Waterproof heavy-duty vinyl']
  },
  {
    id: 8,
    title: 'Ford F-250 Heavy Duty Hauling Truck',
    category: 'Vehicles',
    price: 120,
    unit: 'day',
    deposit: 400,
    area: 'Frisco',
    owner: 'Metro Fleet Logistics',
    ownerVerified: true,
    rating: 4.91,
    reviewsCount: 31,
    image: 'https://images.unsplash.com/photo-1542362567-b07e54358753?auto=format&fit=crop&w=1000&q=80',
    type: 'rental',
    tag: 'Vehicles',
    desc: 'Heavy-duty 8-foot bed pickup with gooseneck hitch prep, ratchet tie-down straps, and ramp extensions. Ideal for local furniture moves or material pickup.',
    provider: 'Business',
    features: ['10,000lb towing capacity', 'Backup camera with hitch line', 'Includes 100 free miles/day']
  },
  {
    id: 9,
    title: '2-Person Professional Office Move Crew',
    category: 'Services',
    price: 95,
    unit: 'hour',
    deposit: 0,
    area: 'Plano',
    owner: 'MoveWell Logistics',
    ownerVerified: true,
    rating: 4.97,
    reviewsCount: 76,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80',
    type: 'service',
    tag: 'Work Crews',
    desc: 'Experienced commercial moving team with furniture blankets, hydraulic dollies, corner guards, and disassembly/reassembly tools.',
    provider: 'Business',
    features: ['Workers compensation insured', 'Floor protection runners included', 'Precision desk cable management']
  },
  {
    id: 10,
    title: 'Live Sound & Stage Lighting Package',
    category: 'Events',
    price: 350,
    unit: 'event',
    deposit: 250,
    area: 'Dallas',
    owner: 'Gather Collective Audio',
    ownerVerified: true,
    rating: 4.94,
    reviewsCount: 29,
    image: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1000&q=80',
    type: 'service',
    tag: 'Audiovisual',
    desc: 'Complete PA sound system with 2 subwoofers, 2 wireless microphones, digital mixer, and 4 DMX LED wash uplights. Ideal for weddings, speaking events & live bands.',
    provider: 'Business',
    features: ['Sound technician delivery & soundcheck', 'Bluetooth backing track feed', 'Zero-feedback compression']
  },
  {
    id: 11,
    title: 'Enterprise Field Task Dispatch & Staffing',
    category: 'Enterprise',
    price: 420,
    unit: 'day',
    deposit: 0,
    area: 'Dallas',
    owner: 'Northline Enterprise Solutions',
    ownerVerified: true,
    rating: 5.0,
    reviewsCount: 14,
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1000&q=80',
    type: 'service',
    tag: 'Enterprise Teams',
    desc: 'Turnkey operational staffing support for corporate installations, regional rollouts, fleet distribution, and site handoffs. Full audit logs.',
    provider: 'Enterprise',
    features: ['Dedicated dispatcher', 'Real-time GPS status board', 'Enterprise compliance reports']
  },
  {
    id: 12,
    title: 'Executive Boardroom & Creative Studio Space',
    category: 'Enterprise',
    price: 180,
    unit: 'day',
    deposit: 200,
    area: 'Frisco',
    owner: 'Harbor Workspaces',
    ownerVerified: true,
    rating: 4.93,
    reviewsCount: 52,
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80',
    type: 'rental',
    tag: 'Workspaces',
    desc: 'High-speed fiber boardroom with 85-inch 4K conferencing screen, Herman Miller ergonomic chairs, espresso bar, and break-out lounge.',
    provider: 'Enterprise',
    features: ['Fiber 1Gbps symmetrical', 'Zoom Room hardware integration', 'Keyless mobile entry']
  },
  {
    id: 13,
    title: 'Complete 4-Person Wilderness Camping Kit',
    category: 'Outdoor',
    price: 35,
    unit: 'day',
    deposit: 100,
    area: 'Frisco',
    owner: 'Jordan Outdoors',
    ownerVerified: true,
    rating: 4.91,
    reviewsCount: 27,
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=80',
    type: 'rental',
    tag: 'Adventure Gear',
    desc: 'Instant-pitch 4-person tent, 2 sleeping bags, 2 inflatable pads, dual-burner propane stove, and Yeti Tundra cooler.',
    provider: 'Trade',
    features: ['Pre-inspected seams', 'Cookware and camp lantern included', 'Compact duffel packing']
  },
  {
    id: 14,
    title: 'Saint Laurent Monogram Matelassé Handbag',
    category: 'Fashion',
    price: 55,
    unit: 'day',
    deposit: 250,
    area: 'Plano',
    owner: 'Avery Style Collective',
    ownerVerified: true,
    rating: 4.99,
    reviewsCount: 81,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1000&q=80',
    type: 'rental',
    tag: 'Luxury Fashion',
    desc: 'Authentic quilted chevron grain de poudre leather bag with antique gold-toned hardware. Verified authenticity with RFID authentication record.',
    provider: 'Trade',
    features: ['Serial verified authenticity', 'Includes velvet dustbag', 'Pristine hardware condition']
  },
  {
    id: 15,
    title: 'Gourmet Wood-Fired Catering Pop-up trailer',
    category: 'Events',
    price: 650,
    unit: 'event',
    deposit: 400,
    area: 'Dallas',
    owner: 'Gather Craft Food Co.',
    ownerVerified: true,
    rating: 4.96,
    reviewsCount: 39,
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=80',
    type: 'service',
    tag: 'Food & Catering',
    desc: 'Mobile wood-fired pizza and artisanal street food trailer for corporate celebrations, private festivals, and neighborhood block parties.',
    provider: 'Business',
    features: ['Dallas County health permit active', 'Serves up to 150 guests', 'Self-contained quiet generator']
  },
  {
    id: 16,
    title: 'Architectural Landscaping & Yard Restoration',
    category: 'Services',
    price: 55,
    unit: 'hour',
    deposit: 0,
    area: 'McKinney',
    owner: 'Greenway Outdoor Care',
    ownerVerified: true,
    rating: 4.88,
    reviewsCount: 34,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=1000&q=80',
    type: 'service',
    tag: 'Outdoor Care',
    desc: 'Seasonal cleanups, precision hedging, sod installation, stone walkway repairs, and automated irrigation calibration.',
    provider: 'Trade',
    features: ['Zero-emission battery equipment', 'Soil pH test included', 'Debris haul-away included']
  }
];

export const DEMO_STORIES = [
  {
    id: 'story-1',
    title: 'Designer Gala Outfit Reveal',
    author: 'Avery Style',
    category: 'Fashion',
    area: 'Plano, TX',
    image: 'https://images.unsplash.com/photo-1746730921429-3a6489172f1b?auto=format&fit=crop&w=800&q=80',
    listingId: 5,
    caption: 'A closer look at this weekend’s emerald gala outfit. Highlighting the silk lapel detailing and hand-stitched borders. Tap below to reserve!',
    duration: 15,
    likes: 124,
    created: Date.now() - 3600000 * 3
  },
  {
    id: 'story-2',
    title: 'Mobility & Form Demo',
    author: 'Taylor Fitness',
    category: 'Fitness',
    area: 'McKinney, TX',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
    listingId: 4,
    caption: 'Focusing on thoracic rotation and hip drive before heavy deadlifts. Meet me in McKinney this week for 1-on-1 assessment sessions.',
    duration: 18,
    likes: 98,
    created: Date.now() - 3600000 * 5
  },
  {
    id: 'story-3',
    title: 'Behind the Handyman Job',
    author: 'Atlas Home Services',
    category: 'Home Services',
    area: 'Frisco, TX',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    listingId: 6,
    caption: 'Custom floating shelf alignment using precision cross-line lasers. Check out the clean wall mount finish.',
    duration: 12,
    likes: 72,
    created: Date.now() - 3600000 * 8
  },
  {
    id: 'story-4',
    title: 'Excavator Walkaround & Test',
    author: 'Northline Rentals',
    category: 'Equipment',
    area: 'Frisco, TX',
    image: 'https://images.unsplash.com/photo-1610477865545-37711c53144d?auto=format&fit=crop&w=800&q=80',
    listingId: 1,
    caption: 'Quick equipment walkaround: inspecting track tension, hydraulic fittings, and digital safety interlocks before customer dispatch.',
    duration: 20,
    likes: 156,
    created: Date.now() - 3600000 * 11
  },
  {
    id: 'story-5',
    title: 'Cinema Gear Rig Setup',
    author: 'Maya Creative',
    category: 'Creators',
    area: 'Plano, TX',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    listingId: 2,
    caption: 'Rigging the FX3 with V-mount battery power and wireless monitor transmission for a commercial shoot in downtown Dallas.',
    duration: 14,
    likes: 210,
    created: Date.now() - 3600000 * 14
  },
  {
    id: 'story-6',
    title: 'Office Move Crew in Action',
    author: 'MoveWell Logistics',
    category: 'Work Crews',
    area: 'Plano, TX',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    listingId: 9,
    caption: 'Zero downtime weekend office relocation. Disassembled 14 executive desks and re-cabled them in under 4 hours.',
    duration: 16,
    likes: 64,
    created: Date.now() - 3600000 * 16
  },
  {
    id: 'story-7',
    title: 'Creative Boardroom Tour',
    author: 'Harbor Workspaces',
    category: 'Enterprise',
    area: 'Frisco, TX',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
    listingId: 12,
    caption: 'Natural lighting, acoustic panels, and instant airplay for presentation slides. Ready for your next board meeting.',
    duration: 15,
    likes: 85,
    created: Date.now() - 3600000 * 19
  },
  {
    id: 'story-8',
    title: 'Outdoor Wedding Canopy Preview',
    author: 'Gather Events',
    category: 'Events',
    area: 'Dallas, TX',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    listingId: 7,
    caption: 'From a bare lawn to an elegant lighted banquet space. Our 30x20 tent with warm perimeter festoon lighting.',
    duration: 22,
    likes: 188,
    created: Date.now() - 3600000 * 21
  }
];

export const REEL_CATEGORIES = [
  { id: 'All', label: 'All Reels', desc: 'Browse all local stories' },
  { id: 'Fashion', label: 'Fashion & Shopping', desc: 'Outfits, stylist reveals & luxury wear' },
  { id: 'Equipment', label: 'Tools & Equipment', desc: 'Heavy machinery, power tools & walkarounds' },
  { id: 'Home Services', label: 'Home Services', desc: 'Handymen, custom installations & living' },
  { id: 'Creators', label: 'Tech & Creators', desc: 'Cinema kits, camera rigs & sound gear' },
  { id: 'Fitness', label: 'Fitness & Health', desc: 'Form demos, coaching & mobility' },
  { id: 'Work Crews', label: 'Work Crews & Logistics', desc: 'Office moves, fleet & dispatch' },
  { id: 'Enterprise', label: 'Enterprise & Spaces', desc: 'Boardrooms, commercial studios & spaces' },
  { id: 'Events', label: 'Events & Experiences', desc: 'Canopies, lighting & banquet setups' }
];

export const matchesReelCategory = (reelCategory, filterId) => {
  if (!filterId || filterId === 'All') return true;
  if (!reelCategory) return false;

  const rCat = reelCategory.toLowerCase().trim();
  const fId = filterId.toLowerCase().trim();

  if (rCat === fId) return true;

  if (fId === 'fashion' || fId === 'shopping') {
    return rCat.includes('fashion') || rCat.includes('shop') || rCat.includes('wardrobe');
  }
  if (fId === 'equipment' || fId === 'tools') {
    return rCat.includes('equipment') || rCat.includes('tool') || rCat.includes('machinery');
  }
  if (fId === 'home services' || fId === 'home' || fId === 'services') {
    return rCat.includes('home') || rCat.includes('service') || rCat.includes('handyman') || rCat.includes('repair');
  }
  if (fId === 'creators' || fId === 'electronics' || fId === 'tech') {
    return rCat.includes('creator') || rCat.includes('cinema') || rCat.includes('camera') || rCat.includes('tech') || rCat.includes('media');
  }
  if (fId === 'work crews' || fId === 'crews' || fId === 'vehicles') {
    return rCat.includes('crew') || rCat.includes('move') || rCat.includes('logistic') || rCat.includes('truck') || rCat.includes('vehicle');
  }
  if (fId === 'enterprise') {
    return rCat.includes('enterprise') || rCat.includes('workspace') || rCat.includes('office') || rCat.includes('boardroom');
  }
  if (fId === 'fitness') {
    return rCat.includes('fit') || rCat.includes('health') || rCat.includes('workout') || rCat.includes('trainer');
  }
  if (fId === 'events') {
    return rCat.includes('event') || rCat.includes('party') || rCat.includes('wedding') || rCat.includes('canopy');
  }

  return rCat.includes(fId);
};

export const RESOURCE_GUIDES = [
  {
    id: 'membership',
    title: 'Membership & Account Tiers',
    iconName: 'UserCheck',
    badge: 'Core Policy',
    summary: 'How IDLE subscription plans work without transaction commissions. Plan upgrades, role permissions, and billing cycles.',
    content: 'IDLE operates on a transparent subscription model rather than charging per-transaction commission fees. Free members can browse and submit eligible service requests. Trade ($15/mo), Business ($45/mo), and Enterprise ($90/mo) unlock listings, messaging, QR custody handoffs, and business team dispatch.'
  },
  {
    id: 'payments',
    title: 'Payments, Payouts & Receipts',
    iconName: 'Wallet',
    badge: 'Stripe Connect',
    summary: 'Payment methods, automated provider payouts via Stripe Connect, security deposit holds, and clear receipts.',
    content: 'All financial exchanges are handled via Stripe Connect. Security deposits are authorized as temporary holds on member payment cards and released automatically upon successful return scans.'
  },
  {
    id: 'identity',
    title: 'Identity Checks & Badges',
    iconName: 'ShieldCheck',
    badge: 'Trust & Safety',
    summary: 'Consent-based driver license & identity verification powered by Stripe Identity to protect local neighbors.',
    content: 'High-value equipment and luxury fashion rentals require identity verification. Providers and renters submit a government-issued photo ID processed securely through Stripe Identity.'
  },
  {
    id: 'listings',
    title: 'Listings, Inventory & Calendars',
    iconName: 'Package',
    badge: 'Inventory',
    summary: 'Publishing rentals and services with condition guidelines, pricing units, and approximate location privacy.',
    content: 'Listings display approximate neighborhood areas (e.g. Frisco, Plano, Allen) rather than exact street addresses until a booking agreement is mutually confirmed.'
  },
  {
    id: 'messages',
    title: 'Messages, Offers & Negotiations',
    iconName: 'MessageSquare',
    badge: 'Communication',
    summary: 'Paid member chat, formal counter-offers, versioned agreements, and real-time transaction updates.',
    content: 'Paid members communicate directly within the app. Formal counter-offers lock in agreed dates, pricing, and custom delivery terms before any payment authorization.'
  },
  {
    id: 'pickup',
    title: 'Pickup, Delivery & Location Sharing',
    iconName: 'MapPin',
    badge: 'Logistics',
    summary: 'Coordinating handoff windows, meeting points, and live dispatcher tracking during active enterprise jobs.',
    content: 'For team dispatches and high-value deliveries, members can enable optional live location sharing for safe arrival and handoff coordination.'
  },
  {
    id: 'qr-handoff',
    title: 'Condition Photos & QR Handoffs',
    iconName: 'QrCode',
    badge: 'Custody Transfer',
    summary: 'Single-use dynamic QR codes for pickup verification, return custody confirmation, and timestamped condition photos.',
    content: 'Custody is transferred only when the renter scans the provider’s single-use dynamic QR code. Before confirming, both parties take rapid condition photos stored in the immutable booking log.'
  },
  {
    id: 'ai-help',
    title: 'AI Help & Customer Support',
    iconName: 'Bot',
    badge: '24/7 Assistance',
    summary: 'Smart AI assistant for instant answers on listing terms, booking rules, dispute mediation, and policy guides.',
    content: 'The IDLE AI assistant is trained on the platform knowledge base to answer questions regarding deposit timing, rental contracts, equipment requirements, and emergency support.'
  },
  {
    id: 'disputes',
    title: 'Resolution & Fair Arbitration',
    iconName: 'Scale',
    badge: 'Dispute Handling',
    summary: 'Direct party negotiation tools first, followed by administrative dispute escalation and evidence reviews.',
    content: 'If an item is damaged or returned late, the booking record provides direct negotiation channels. If unresolved within 48 hours, IDLE admins review timestamped photos and release deposit funds accordingly.'
  },
  {
    id: 'reviews',
    title: 'Reviews, Ratings & Reputation',
    iconName: 'Star',
    badge: 'Community Trust',
    summary: 'Two-way verified ratings after completed bookings to build a trustworthy local ecosystem.',
    content: 'Only members with completed transactions can post reviews. Both provider and renter receive a verified review prompt with criteria for punctuality, item condition, and communication.'
  },
  {
    id: 'privacy',
    title: 'Privacy, Data Rights & Exports',
    iconName: 'Lock',
    badge: 'Data Security',
    summary: 'Full control over personal data, exportable records, notification preferences, and privacy rules.',
    content: 'Members can export their complete booking history, messages, and listing records at any time. Private location coordinates are never sold or exposed to third-party ad networks.'
  }
];

export const PLANS = [
  {
    id: 'Free',
    name: 'Free Member',
    price: 0,
    period: 'forever',
    badge: 'Community',
    description: 'Explore the local marketplace, browse items, save favorites, and post eligible requests.',
    features: [
      'Browse all local listings & map view',
      'Watch public 24-hour social Reels',
      'Post eligible community requests',
      'Save favorites and search alerts',
      'Standard community support'
    ],
    buttonText: 'Current Plan',
    isCurrent: true,
    highlight: false
  },
  {
    id: 'Trade',
    name: 'Trade',
    price: 15,
    period: 'month',
    badge: 'Most Popular',
    description: 'For individuals, freelancers, and side-earners looking to rent out gear and offer local skills.',
    features: [
      'All Free Member features',
      'Unlimited rental & service listings',
      'Post 24-hour promotional Reels',
      'Direct messaging & price negotiations',
      'Stripe Connect instant payouts',
      'Single-use QR code handoff security',
      'Zero commission on member transactions'
    ],
    buttonText: 'Upgrade to Trade',
    isCurrent: false,
    highlight: true
  },
  {
    id: 'Business',
    name: 'Business',
    price: 45,
    period: 'month',
    badge: 'Growing Teams',
    description: 'For established rental shops, contractors, and service businesses requiring higher volume.',
    features: [
      'All Trade features included',
      'Up to 3 named team seats',
      'Multiple location inventory management',
      'Verified Business trust badge',
      'Priority placement in search results',
      'Automated invoice generation',
      'Security deposit hold management'
    ],
    buttonText: 'Upgrade to Business',
    isCurrent: false,
    highlight: false
  },
  {
    id: 'Enterprise',
    name: 'Enterprise',
    price: 90,
    period: 'month',
    badge: 'Operations Hub',
    description: 'Full operational suite with 10 seats, field dispatching, live GPS tasks, and fleet tools.',
    features: [
      '10 baseline named team seats',
      'Real-time task dispatch & live ETA',
      'Fleet & heavy equipment calendar',
      'Multi-tier role approvals',
      'Enterprise analytics & audit logs',
      'Dedicated account manager',
      'Custom API & Webhook integrations'
    ],
    buttonText: 'Upgrade to Enterprise',
    isCurrent: false,
    highlight: false
  }
];

export const ENTERPRISE_LANES = [
  {
    title: 'Workforce & Field Operations',
    description: 'Dispatch crew members, track on-site arrivals, and manage job handoff checklists.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=800&q=80',
    icon: 'HardHat'
  },
  {
    title: 'Equipment & Fleet Logistics',
    description: 'Fleet calendars, equipment maintenance logs, and verified custodian handoff records.',
    image: 'https://images.unsplash.com/photo-1610477865545-37711c53144d?auto=format&fit=crop&w=800&q=80',
    icon: 'Truck'
  },
  {
    title: 'Events & Hospitality Crews',
    description: 'Coordinate setup crews, canopy deliveries, staging audio, and catering pop-ups.',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=800&q=80',
    icon: 'Tent'
  },
  {
    title: 'Corporate & Coworking Spaces',
    description: 'Automate room reservations, digital access keys, and executive presentation tech.',
    image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
    icon: 'Building2'
  },
  {
    title: 'Facilities & Commercial Repairs',
    description: 'Track urgent maintenance tickets, plumbing/HVAC dispatches, and warranty invoices.',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
    icon: 'Wrench'
  },
  {
    title: 'Creative Production Services',
    description: 'Mobilize camera packages, lighting rigs, aerial drone teams, and studio suites.',
    image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
    icon: 'Video'
  }
];

export const INITIAL_ENTERPRISE_TEAM = [
  { id: 'tm-1', name: 'Sam Vance', role: 'Owner / Admin', email: 'sam.v@northline.com', status: 'Active', tasksCount: 8 },
  { id: 'tm-2', name: 'Elena Ramos', role: 'Lead Dispatcher', email: 'elena.r@northline.com', status: 'Active', tasksCount: 14 },
  { id: 'tm-3', name: 'Marcus Chen', role: 'Field Technician', email: 'm.chen@northline.com', status: 'On Job', tasksCount: 5 },
  { id: 'tm-4', name: 'Jessica Taylor', role: 'Inventory Manager', email: 'j.taylor@northline.com', status: 'Active', tasksCount: 9 }
];

export const INITIAL_ENTERPRISE_TASKS = [
  { id: 'task-101', title: 'Deliver Cat Mini-Excavator & Trench Attachment', assignee: 'Marcus Chen', area: 'Frisco North', priority: 'High', status: 'In Transit', eta: '25 min' },
  { id: 'task-102', title: 'Soundcheck & Lighting Rig Setup for Dallas Gala', assignee: 'Elena Ramos', area: 'Downtown Dallas', priority: 'Urgent', status: 'Assigned', eta: '1 hr 10 min' },
  { id: 'task-103', title: 'Complete Return Custody Scan on 8ft Work Trailer', assignee: 'Jessica Taylor', area: 'Plano Depot', priority: 'Normal', status: 'Pending Scan', eta: 'Today 4:00 PM' },
  { id: 'task-104', title: 'Emergency Drywall & Ceiling Leak Inspection', assignee: 'Marcus Chen', area: 'McKinney West', priority: 'High', status: 'Scheduled', eta: 'Tomorrow 9:00 AM' }
];

export const JOURNEY_STEPS = [
  { step: 1, title: 'Welcome & Signup', category: 'Discovery', desc: 'New member creates account with email or Apple/Google sign-in.' },
  { step: 2, title: 'Choose Participation', category: 'Discovery', desc: 'Select casual explorer, peer provider (Trade), or commercial business.' },
  { step: 3, title: 'Build Profile & ID Check', category: 'Verification', desc: 'Set local service area (e.g. Frisco/Dallas) and verify ID with Stripe.' },
  { step: 4, title: 'Activate Tools & Connect', category: 'Verification', desc: 'Setup Stripe Connect payout account for direct bank transfers.' },
  { step: 5, title: 'Explore or Post Listing', category: 'Marketplace', desc: 'Search nearby listings, watch 24-hr Reels, or publish gear to rent.' },
  { step: 6, title: 'Ask & Negotiate Offer', category: 'Negotiation', desc: 'Paid chat allows direct messaging, price adjustments, and delivery terms.' },
  { step: 7, title: 'Accept Agreement', category: 'Negotiation', desc: 'Both parties confirm dates, rental terms, and deposit conditions.' },
  { step: 8, title: 'Approve Payment & Holds', category: 'Payment', desc: 'Stripe authorizes payment and holds refundable security deposit.' },
  { step: 9, title: 'Coordinate Handoff', category: 'Logistics', desc: 'Confirm pickup window, exchange directions, and share live location.' },
  { step: 10, title: 'Record Condition & QR Scan', category: 'Custody', desc: 'Renter scans provider’s dynamic QR code and uploads condition photos.' },
  { step: 11, title: 'Active Rental Period', category: 'Custody', desc: 'Equipment or services are deployed under agreed protection terms.' },
  { step: 12, title: 'Return Scan & Deposit Release', category: 'Completion', desc: 'Return QR code scanned. Item inspected and deposit hold released.' },
  { step: 13, title: 'Dispute Resolution (If Any)', category: 'Resolution', desc: 'Independent mediation or photo inspection if items are damaged.' },
  { step: 14, title: 'Two-Way Verified Review', category: 'Reputation', desc: 'Both members rate communication, reliability, and condition.' },
  { step: 15, title: 'Ecosystem Reinvestment', category: 'Growth', desc: 'Zero transaction commission encourages repeat local engagement.' }
];
