import React, { useState, useRef } from 'react';
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
  DollarSign,
  Upload,
  Check,
  Image as ImageIcon
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
  const fileInputRef = useRef(null);

  // Auth gate check: must be logged in to create listings
  if (!isAuthenticated) {
    return (
      <AuthGate
        badge="Post an Opportunity"
        title="Sign in to create a listing on IDLE"
        subtitle="You must be signed in to list unused tools, equipment, and professional trade skills."
        actionText="Sign In to Post"
      />
    );
  }

  // Filter listings created by the current user
  const userListings = listings.filter(l => l.owner === user.name);

  // Handle uploading image from device
  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      addToast('Please select a valid image file (PNG, JPG, WEBP)', 'error');
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      addToast('Image size should be less than 10MB', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target.result);
      addToast('Photo uploaded from your device!', 'success');
    };
    reader.onerror = () => {
      addToast('Failed to load image file', 'error');
    };
    reader.readAsDataURL(file);
  };

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

    addToast('Your listing has been published!', 'success');

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
          Free accounts can publish community requests. Paid Trade, Business, and Enterprise accounts can offer rentals, tools, and professional services.
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

          {/* Photo Upload & Presets */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-bold text-[#172d28] uppercase tracking-wider">
                Listing Photo
              </label>
              <span className="text-[11px] text-idle-muted">Upload your own photo or pick a sample</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-start">
              {/* Upload Zone / Active Preview */}
              <div className="md:col-span-5 relative">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageFileChange}
                  accept="image/*"
                  className="hidden"
                />

                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="group relative h-36 rounded-2xl overflow-hidden border-2 border-dashed border-[#c1d5cb] hover:border-idle-emerald bg-[#f6faf8] flex flex-col items-center justify-center p-2.5 cursor-pointer transition-all shadow-xs"
                >
                  {selectedImage ? (
                    <>
                      <img 
                        src={selectedImage} 
                        alt="Selected listing preview" 
                        className="w-full h-full object-cover rounded-xl"
                      />
                      <div className="absolute inset-0 bg-black/45 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-2">
                        <Upload className="w-5 h-5 mb-1 text-idle-gold" />
                        <span className="text-xs font-bold">Click to replace photo</span>
                        <span className="text-[10px] text-emerald-200">PNG, JPG, WEBP up to 10MB</span>
                      </div>
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-bold border border-white/20 flex items-center gap-1">
                        <Check className="w-3 h-3 text-emerald-400 stroke-[3]" />
                        <span>Active Photo</span>
                      </div>
                    </>
                  ) : (
                    <div className="text-center space-y-1">
                      <div className="w-9 h-9 rounded-xl bg-idle-mint text-idle-emerald flex items-center justify-center mx-auto">
                        <Upload className="w-4 h-4" />
                      </div>
                      <span className="text-xs font-bold text-[#172d28] block">Upload photo from device</span>
                      <span className="text-[10px] text-idle-muted block">Click to browse or drop file here</span>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between mt-1 px-0.5">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="text-[11px] font-bold text-idle-emerald hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <Upload className="w-3 h-3" />
                    <span>Upload from device</span>
                  </button>
                  {selectedImage && (
                    <span className="text-[10px] text-idle-muted">Photo ready</span>
                  )}
                </div>
              </div>

              {/* Sample Presets Strip */}
              <div className="md:col-span-7 space-y-1.5">
                <span className="text-[11px] font-semibold text-idle-muted block">
                  Or pick a sample marketplace photo:
                </span>
                <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-3 lg:grid-cols-6 gap-2">
                  {PRESET_IMAGES.map((imgUrl, i) => {
                    const isSelected = selectedImage === imgUrl;
                    return (
                      <button
                        type="button"
                        key={i}
                        onClick={() => setSelectedImage(imgUrl)}
                        className={`h-16 rounded-xl overflow-hidden border-2 transition-all cursor-pointer relative ${
                          isSelected ? 'border-idle-gold shadow-md scale-102 ring-1 ring-idle-gold' : 'border-transparent opacity-60 hover:opacity-100 hover:scale-102'
                        }`}
                        title="Use sample photo"
                      >
                        <img src={imgUrl} alt={`Preset ${i}`} className="w-full h-full object-cover" />
                        {isSelected && (
                          <div className="absolute top-1 right-1 w-3.5 h-3.5 rounded-full bg-idle-emerald text-white flex items-center justify-center shadow-xs">
                            <Check className="w-2 h-2 stroke-[3]" />
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
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
              className="gold-gradient-btn w-full sm:w-auto px-8 py-3 rounded-xl text-sm font-bold shadow-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4 stroke-[2.5]" />
              <span>Publish Listing</span>
            </button>
          </div>
        </form>
      </div>

      {/* Your Active Listings Table */}
      {userListings.length > 0 && (
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-idle-line pb-2">
            <h2 className="font-serif text-xl font-bold text-[#082f2c]">
              Your Active Listings ({userListings.length})
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
                          className="p-1.5 rounded-lg text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
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
