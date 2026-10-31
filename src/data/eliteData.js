// IDLE Elite PM Mock Data & Image Registry

export const ELITE_PHOTOS = {
  hero: '/images/elite/hero.webp',
  aviation: '/images/elite/aviation.webp',
  ground: '/images/elite/ground.webp',
  luxurycar: '/images/elite/ground.webp',
  estates: '/images/elite/estates.webp',
  modernEstate: '/images/elite/estates.webp',
  texas: '/images/elite/texas.webp',
  parking: '/images/elite/parking.webp',
  garage: '/images/elite/parking.webp',
  exotic: '/images/elite/exotic.webp',
  gala: '/images/elite/hero.webp',
  chef: '/images/elite/texas.webp'
};

export const getElitePhoto = (key) => {
  return ELITE_PHOTOS[key] || ELITE_PHOTOS.texas;
};

export const ELITE_TYPES = [
  ['All', 'Discover all', 'Your private world', 'texas', '✦'],
  ['Vehicles', 'Exotic rentals', 'Collectible cars & drives', 'exotic', '◇'],
  ['Ground', 'Black-car travel', 'Drivers, airport & events', 'luxurycar', '↗'],
  ['Estates', 'Luxury estates', 'Frisco homes & retreats', 'modernEstate', '⌂'],
  ['Parking', 'Private parking', 'Gated spaces & arrival', 'garage', '▣'],
  ['Events', 'Private events', 'Black tie & social circle', 'gala', '✧'],
  ['Concierge', 'Concierge', 'Chef, errands & planning', 'concierge', '♢'],
  ['Aviation', 'Private aviation', 'Operator inquiries only', 'aviation', '✈']
];

export const ELITE_SEED_LISTINGS = [
  { 
    id: 'elite-v3', 
    category: 'Vehicles', 
    title: 'Red exotic sports car · Frisco', 
    city: 'Frisco', 
    price: 1350, 
    unit: 'day', 
    img: 'exotic', 
    host: 'Private exotic vehicle host · Example', 
    description: 'An Italian-inspired supercar experience for a special occasion. Vehicle ownership, commercial insurance and permitted drivers must be independently confirmed.', 
    x: 36, 
    y: 27, 
    features: 'Driver eligibility · mileage policy · condition photos' 
  },
  { 
    id: 'elite-v4', 
    category: 'Vehicles', 
    title: 'Porsche weekend luxury drive', 
    city: 'Dallas', 
    price: 680, 
    unit: 'day', 
    img: 'exotic', 
    host: 'Private performance host · Example', 
    description: 'Premium sports-car rental concept for an approved weekend guest. Exact model and availability are not represented.', 
    x: 53, 
    y: 76, 
    features: 'Security deposit terms · driver credentials · handoff photos' 
  },
  { 
    id: 'elite-g3', 
    category: 'Ground', 
    title: 'Black SUV with private driver', 
    city: 'Southlake', 
    price: 325, 
    unit: 'trip', 
    img: 'luxurycar', 
    host: 'Executive black-car provider · Example', 
    description: 'Door-to-door private travel concept for meetings, dinners and events with a licensed and insured operator.', 
    x: 19, 
    y: 49, 
    features: 'Private chauffeur · coordinated pickup · operator verification' 
  },
  { 
    id: 'elite-p4', 
    category: 'Parking', 
    title: 'Secure collector-car garage · Prosper', 
    city: 'Prosper', 
    price: 195, 
    unit: 'day', 
    img: 'garage', 
    host: 'Private collector garage · Example', 
    description: 'Illustrative covered secured parking space for high-value vehicles; property approval and insurance must be checked.', 
    x: 59, 
    y: 17, 
    features: 'Indoor parking · dimensions · approved arrival window' 
  },
  { 
    id: 'elite-s3', 
    category: 'Estates', 
    title: 'Modern pool estate · Frisco', 
    city: 'Frisco', 
    price: 1900, 
    unit: 'night', 
    img: 'modernEstate', 
    host: 'North Texas private estate · Example', 
    description: 'A private modern residence concept for authorized stays or hosted gatherings, subject to owner rules and zoning.', 
    x: 32, 
    y: 25, 
    features: 'Private entrance · guest capacity · property authorization' 
  },
  { 
    id: 'elite-e2', 
    category: 'Events', 
    title: 'Black-tie private dining experience', 
    city: 'Dallas', 
    price: 450, 
    unit: 'guest', 
    img: 'gala', 
    host: 'Private dining curator · Example', 
    description: 'Illustrative invitation-only dining and networking experience. Availability and hosts are not verified.', 
    x: 49, 
    y: 73, 
    features: 'Invitation required · dress code · venue approval' 
  },
  { 
    id: 'elite-c2', 
    category: 'Concierge', 
    title: 'Private chef for an intimate dinner', 
    city: 'Southlake', 
    price: 650, 
    unit: 'event', 
    img: 'chef', 
    host: 'Independent culinary provider · Example', 
    description: 'A privately arranged chef experience so members can spend more time with their guests. Food safety and professional requirements apply.', 
    x: 20, 
    y: 46, 
    features: 'Menu consultation · scheduling · direct third-party provider' 
  },
  { 
    id: 'elite-p1', 
    category: 'Parking', 
    title: 'Private covered garage · Frisco', 
    city: 'Frisco', 
    price: 85, 
    unit: 'day', 
    img: 'garage', 
    host: 'Private garage host · Example', 
    description: 'Covered vehicle parking with reserved arrival window and entry instructions after host approval.', 
    x: 35, 
    y: 30, 
    features: 'Covered space · pre-approved vehicles · host confirmation' 
  },
  { 
    id: 'elite-p2', 
    category: 'Parking', 
    title: 'Reserved event parking · Dallas', 
    city: 'Dallas', 
    price: 120, 
    unit: 'event', 
    img: 'parking', 
    host: 'Event parking host · Example', 
    description: 'Secure arrival coordination for an evening event. Subject to property authorization and access rules.', 
    x: 52, 
    y: 74, 
    features: 'Scheduled arrival · approved vehicle · event hours' 
  },
  { 
    id: 'elite-p3', 
    category: 'Parking', 
    title: 'Gated driveway access · Southlake', 
    city: 'Southlake', 
    price: 95, 
    unit: 'day', 
    img: 'parking', 
    host: 'Private property host · Example', 
    description: 'Private driveway availability for an approved guest vehicle, subject to owner and association rules.', 
    x: 18, 
    y: 52, 
    features: 'Gate instructions after acceptance · vehicle dimensions' 
  },
  { 
    id: 'elite-g1', 
    category: 'Ground', 
    title: 'Executive black SUV transfer', 
    city: 'Frisco', 
    price: 260, 
    unit: 'trip', 
    img: 'ground', 
    host: 'Executive transfer · Example', 
    description: 'Illustrative professional chauffeur service for private arrivals and airport transfers. Licensed provider required.', 
    x: 39, 
    y: 27, 
    features: 'Private pickup · professional driver · flight timing' 
  },
  { 
    id: 'elite-g2', 
    category: 'Ground', 
    title: 'Private event arrival concierge', 
    city: 'Dallas', 
    price: 190, 
    unit: 'visit', 
    img: 'ground', 
    host: 'Arrival coordinator · Example', 
    description: 'Guest arrivals, luggage coordination and scheduled handoffs for events and business travel.', 
    x: 56, 
    y: 77, 
    features: 'Guest list coordination · discreet handoff' 
  },
  { 
    id: 'elite-v1', 
    category: 'Vehicles', 
    title: 'Luxury black SUV rental', 
    city: 'Prosper', 
    price: 340, 
    unit: 'day', 
    img: 'luxurycar', 
    host: 'Premium vehicle host · Example', 
    description: 'Premium SUV peer-to-peer rental concept. Driver eligibility, insurance and authorized use require validation.', 
    x: 61, 
    y: 15, 
    features: 'Vehicle handoff · approved drivers · condition photos' 
  },
  { 
    id: 'elite-v2', 
    category: 'Vehicles', 
    title: 'Weekend executive car', 
    city: 'Southlake', 
    price: 285, 
    unit: 'day', 
    img: 'exotic', 
    host: 'Private vehicle host · Example', 
    description: 'Premium vehicle for a weekend occasion, contingent on valid documentation and insurance.', 
    x: 21, 
    y: 51, 
    features: 'Verified pickup · mileage conditions · return checklist' 
  },
  { 
    id: 'elite-s1', 
    category: 'Estates', 
    title: 'Mediterranean estate gathering', 
    city: 'Southlake', 
    price: 1800, 
    unit: 'event', 
    img: 'modernEstate', 
    host: 'Private estate host · Example', 
    description: 'Private residence suited to permitted hosted gatherings. Capacity, insurance and local rules must be reviewed.', 
    x: 22, 
    y: 49, 
    features: 'Private host · event windows · property conditions' 
  },
  { 
    id: 'elite-s2', 
    category: 'Estates', 
    title: 'Luxury Frisco executive residence', 
    city: 'Frisco', 
    price: 950, 
    unit: 'night', 
    img: 'texas', 
    host: 'North Texas property host · Example', 
    description: 'Contemporary home for eligible, expressly authorized short stays or private use.', 
    x: 34, 
    y: 25, 
    features: 'Property approval · occupancy terms · discreet arrival' 
  },
  { 
    id: 'elite-e1', 
    category: 'Events', 
    title: 'Private black-tie evening', 
    city: 'Dallas', 
    price: 750, 
    unit: 'guest', 
    img: 'gala', 
    host: 'Private event curator · Example', 
    description: 'Members-only evening gathering concept with approved invitation and venue details.', 
    x: 50, 
    y: 75, 
    features: 'Guest approval · dress code · event rules' 
  },
  { 
    id: 'elite-c1', 
    category: 'Concierge', 
    title: 'Private lifestyle concierge', 
    city: 'Frisco', 
    price: 150, 
    unit: 'hour', 
    img: 'texas', 
    host: 'Independent concierge · Example', 
    description: 'Arrangements for errands, travel coordination and personal schedules by a vetted independent provider.', 
    x: 31, 
    y: 27, 
    features: 'Scheduling · discretion · explicit task scope' 
  },
  { 
    id: 'elite-a1', 
    category: 'Aviation', 
    title: 'Private aviation operator inquiry', 
    city: 'Dallas', 
    price: null, 
    unit: '', 
    img: 'aviation', 
    host: 'Aviation interest directory · Example', 
    description: 'Referral interest only. No aircraft, charter, air taxi seat, fare or operating schedule is available through IDLE.', 
    x: 56, 
    y: 69, 
    features: 'Inquiry only · certificated operator required · no booking' 
  }
];

export const ELITE_SEED_REELS = [
  { 
    id: 'er6', 
    title: 'The exotic weekend collection', 
    author: 'Private vehicle host · Example', 
    caption: 'Discover a special drive with a properly approved host.', 
    img: 'exotic', 
    category: 'Vehicles', 
    listingId: 'elite-v3', 
    sample: true,
    expiresIn: '24h'
  },
  { 
    id: 'er7', 
    title: 'An evening handled beautifully', 
    author: 'Private chef · Example', 
    caption: 'Spend time with your guests; arrange the details privately.', 
    img: 'chef', 
    category: 'Concierge', 
    listingId: 'elite-c2', 
    sample: true,
    expiresIn: '24h'
  },
  { 
    id: 'er1', 
    title: 'The art of arriving', 
    author: 'Elite Ground · Example', 
    caption: 'From airport to dinner, your plans should flow seamlessly.', 
    img: 'ground', 
    category: 'Ground', 
    listingId: 'elite-g1', 
    sample: true,
    expiresIn: '24h'
  },
  { 
    id: 'er2', 
    title: 'A private Mediterranean escape', 
    author: 'Estate host · Example', 
    caption: 'A beautiful setting for memories with family or guests.', 
    img: 'estates', 
    category: 'Estates', 
    listingId: 'elite-s1', 
    sample: true,
    expiresIn: '24h'
  },
  { 
    id: 'er3', 
    title: 'Make every arrival effortless', 
    author: 'Parking host · Example', 
    caption: 'Arrive with a plan. No circling the block.', 
    img: 'parking', 
    category: 'Parking', 
    listingId: 'elite-p1', 
    sample: true,
    expiresIn: '24h'
  },
  { 
    id: 'er4', 
    title: 'Behind the invitation', 
    author: 'Event curator · Example', 
    caption: 'A discreet evening for members who value their time.', 
    img: 'texas', 
    category: 'Events', 
    eventId: 'event-1', 
    sample: true,
    expiresIn: '24h'
  },
  { 
    id: 'er5', 
    title: 'The future of North Texas travel', 
    author: 'Aviation directory · Example', 
    caption: 'Aviation interest only; no operating air-taxi booking is represented.', 
    img: 'aviation', 
    category: 'Aviation', 
    listingId: 'elite-a1', 
    sample: true,
    expiresIn: '24h'
  }
];

export const ELITE_SEED_EVENTS = [
  { 
    id: 'event-5', 
    title: 'Members-only exotic car soirée', 
    city: 'Frisco', 
    date: '2026-12-19', 
    time: '18:00', 
    img: 'exotic', 
    category: 'Automotive', 
    description: 'Illustrative owners and enthusiasts evening; invitation and venue details not confirmed.', 
    host: 'Automotive community · Example' 
  },
  { 
    id: 'event-1', 
    title: 'Black-tie member evening', 
    city: 'Dallas', 
    date: '2026-12-05', 
    time: '19:30', 
    img: 'estates', 
    category: 'Black tie', 
    description: 'Illustrative invitation-only reception celebrating entrepreneurs, art and conversation.', 
    host: 'Private event curator · Example' 
  },
  { 
    id: 'event-2', 
    title: 'Private chef & tasting table', 
    city: 'Southlake', 
    date: '2026-12-12', 
    time: '18:00', 
    img: 'estates', 
    category: 'Dining', 
    description: 'A chef-led dining concept at a permitted private estate, with arrangements handled independently.', 
    host: 'Dining host · Example' 
  },
  { 
    id: 'event-3', 
    title: 'Founder and executive salon', 
    city: 'Frisco', 
    date: '2027-01-09', 
    time: '18:30', 
    img: 'texas', 
    category: 'Business', 
    description: 'A small group networking and ideas event for private members.', 
    host: 'Community host · Example' 
  },
  { 
    id: 'event-4', 
    title: 'Private car collection evening', 
    city: 'Prosper', 
    date: '2027-01-16', 
    time: '16:00', 
    img: 'ground', 
    category: 'Lifestyle', 
    description: 'Curated automotive showcase concept with invitation and venue approval.', 
    host: 'Collector host · Example' 
  }
];

