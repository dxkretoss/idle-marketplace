import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { CATEGORIES } from '../data/mockData';
import { 
  PlusCircle, 
  Trash2, 
  ShieldCheck, 
  Info, 
  Sparkles,
  CheckCircle2,
  Calendar,
  DollarSign
} from 'lucide-react';

import { AuthGate } from '../components/common/AuthGate';

const PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1610477865545-37711c53144d?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1746730921429-3a6489172f1b?auto=format&fit=crop&w=800&q=80'
];

export const PostView = () => {
  const { 
    addListing, 
    listings, 
    removeListing, 
    user, 
    plan, 
    setRoute,
    isAuthenticated,
    addToast
  } = useApp();

  const [kind, setKind] = useState('rental'); // 'request' | 'rental' | 'service' | 'business'
  const [category, setCategory] = useState('Tools');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('75');
  const [unit, setUnit] = useState('day');
  const [area, setArea] = useState('Frisco, TX');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(PRESET_IMAGES[0]);
  const [permission, setPermission] = useState(false);

  // Auth gate check: must be logged in to create listings
  if (!isAuthenticated) {
    return (
      <AuthGate
        badge="Post an Opportunity"
        title="Sign in to create a listing on IDLE"
        subtitle="You must be signed in to list unused tools, equipment, and professional trade skills with zero transaction commission."
        actionText="Sign In to Post"
      />
    );
  }

  // Filter listings created by the current user
  const userListings = listings.filter(l => l.owner === user.name);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      addToast('Please sign in to publish a listing', 'error');
      setRoute('auth');
      return;
    }
    if (!permission) return;

    addListing({
      title,
      category,
      price: Number(price),
      unit: kind === 'request' ? 'budget' : unit,
      deposit: kind === 'rental' ? Math.round(Number(price) * 1.5) : 0,
      area,
      image: selectedImage,
      type: kind === 'request' ? 'request' : kind === 'service' ? 'service' : 'rental',
      tag: kind === 'request' ? 'Community Request' : kind === 'service' ? 'Service Offer' : 'Rental Gear',
      desc: description,
      date
    });

    // Reset form
    setTitle('');
    setDescription('');
    setPermission(false);
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Page Heading */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
          Publish Local Opportunity
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#082f2c] mt-0.5">
          What would you like to post?
        </h1>
        <p className="text-xs sm:text-sm text-idle-muted mt-1 max-w-xl">
          Free accounts can publish community requests. Paid Trade, Business, and Enterprise accounts can offer rentals, tools, and services with zero commission.
        </p>
      </div>

      {/* Main Publishing Form Card */}
      <div className="glass-card p-6 md:p-8 rounded-3xl border border-idle-emerald/20 shadow-glass">
        <form onSubmit={handleSubmit} className="space-y-5 text-xs sm:text-sm">
          {/* Post Kind Selector */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#172d28] mb-2">
              Select Post Type
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
              {[
                { id: 'request', label: 'Community Request', sub: 'Free for all members', badge: 'Free' },
                { id: 'rental', label: 'Item / Gear Rental', sub: 'Offer equipment or goods', badge: 'Paid' },
                { id: 'service', label: 'Skill or Service', sub: 'Offer professional help', badge: 'Paid' },
                { id: 'business', label: 'Enterprise Listing', sub: 'Team & fleet operations', badge: 'Team' },
              ].map((t) => (
                <button
                  type="button"
                  key={t.id}
                  onClick={() => setKind(t.id)}
                  className={`p-3.5 rounded-2xl border text-left transition-all ${
                    kind === t.id
                      ? 'bg-idle-mint/80 border-idle-emerald text-idle-emerald font-bold shadow-sm'
                      : 'bg-[#fcfdfc] border-idle-line hover:border-idle-emerald/40 text-[#253f37]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold">{t.label}</span>
                    <span className="text-[9px] uppercase px-1.5 py-0.2 rounded bg-white text-idle-emerald font-bold border border-idle-emerald/20">
                      {t.badge}
                    </span>
                  </div>
                  <span className="text-[11px] text-idle-muted font-normal block">{t.sub}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Form Fields Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
            <div>
              <label className="block text-xs font-bold text-[#172d28] uppercase tracking-wider mb-1">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none font-medium"
              >
                {CATEGORIES.filter(c => c.id !== 'All').map((cat) => (
                  <option key={cat.id} value={cat.id}>{cat.label}</option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#172d28] uppercase tracking-wider mb-1">
                Listing Title
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Sony FX3 Cinema Rig or Compact Excavator"
                className="w-full px-3.5 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172d28] uppercase tracking-wider mb-1">
                {kind === 'request' ? 'Target Budget (USD)' : 'Price (USD)'}
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-idle-muted font-bold">$</span>
                <input
                  type="number"
                  required
                  min="0"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full pl-7 pr-3.5 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172d28] uppercase tracking-wider mb-1">
                Billing Unit
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none"
              >
                <option value="day">per day</option>
                <option value="hour">per hour</option>
                <option value="weekend">per weekend</option>
                <option value="session">per session</option>
                <option value="event">per event</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#172d28] uppercase tracking-wider mb-1">
                Approximate Area
              </label>
              <input
                type="text"
                required
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#172d28] uppercase tracking-wider mb-1">
              Details & Terms
            </label>
            <textarea
              required
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Provide item specs, operating condition, pickup requirements, or what help is needed..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none resize-none"
            />
          </div>

          {/* Preset Image Chooser */}
          <div>
            <label className="block text-xs font-bold text-[#172d28] uppercase tracking-wider mb-1">
              Select Demonstration Photo
            </label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {PRESET_IMAGES.map((imgUrl, i) => (
                <button
                  type="button"
                  key={i}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`h-16 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImage === imgUrl ? 'border-idle-gold shadow-md scale-102' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Preset ${i}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Permission check */}
          <label className="flex items-start gap-2.5 text-xs text-idle-muted pt-2 cursor-pointer">
            <input
              type="checkbox"
              required
              checked={permission}
              onChange={(e) => setPermission(e.target.checked)}
              className="mt-0.5 rounded text-idle-emerald focus:ring-idle-emerald"
            />
            <span>
              I have the right to post this item or request. I understand IDLE enforces single-use QR custody transfers and member verification.
            </span>
          </label>

          {/* Submit Button */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-idle-line">
            <button
              type="submit"
              disabled={!permission}
              className="gold-gradient-btn w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Publish Demo Post</span>
            </button>
            <span className="text-[11px] text-idle-muted text-center sm:text-right">
              Demonstration listing stored in browser local state.
            </span>
          </div>
        </form>
      </div>

      {/* Your Demo Posts Table */}
      {userListings.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-idle-line pb-2">
            <h2 className="font-serif text-xl font-bold text-[#082f2c]">
              Your Active Posts ({userListings.length})
            </h2>
            <span className="text-xs text-idle-muted">Manage or remove created listings</span>
          </div>

          <div className="glass-card rounded-2xl overflow-hidden border border-idle-line">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm">
                <thead className="bg-[#f4f8f6] text-idle-muted font-bold uppercase text-[10px] tracking-wider border-b border-idle-line">
                  <tr>
                    <th className="p-3.5">Listing</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Area</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-idle-line">
                  {userListings.map((p) => (
                    <tr key={p.id} className="hover:bg-idle-mint/30 transition-colors">
                      <td className="p-3.5 font-bold text-[#112d26] flex items-center gap-2.5">
                        <img src={p.image} alt={p.title} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <span className="block">{p.title}</span>
                          <span className="text-[10px] text-idle-emerald font-semibold uppercase">{p.tag}</span>
                        </div>
                      </td>
                      <td className="p-3.5 text-idle-muted">{p.category}</td>
                      <td className="p-3.5 font-bold text-[#004f46]">${p.price} / {p.unit}</td>
                      <td className="p-3.5 text-idle-muted">{p.area}</td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => removeListing(p.id)}
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors"
                          title="Remove listing"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
