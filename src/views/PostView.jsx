import React, { useState, useRef, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles,
  Check,
  X,
  Upload,
  PlusCircle,
  Eye,
  Archive,
  RotateCcw,
  Trash2
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

const CATEGORY_OPTIONS = [
  { value: 'Tools', label: 'Tools & equipment' },
  { value: 'Vehicles', label: 'Vehicles' },
  { value: 'Outdoor', label: 'Outdoor & adventure' },
  { value: 'Home', label: 'Home & living' },
  { value: 'Tech', label: 'Tech & media' },
  { value: 'Workers', label: 'Local workers' },
  { value: 'Fashion', label: 'Fashion & style' },
  { value: 'Events', label: 'Events & experiences' },
  { value: 'Enterprise', label: 'Business & enterprise' }
];

export const PostView = () => {
  const { 
    addListing, 
    updateListing,
    listings, 
    removeListing, 
    user, 
    plan, 
    ownerRole,
    setRoute,
    setActiveListing,
    reels,
    isAuthenticated,
    addToast
  } = useApp();

  // Form states matching docs/IDLE_Full_Marketplace_Elite_PM_Admin_Console (2).html#post
  const [kind, setKind] = useState('service'); // 'service' | 'rental' | 'request' | 'business'
  const [category, setCategory] = useState('Tools');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('75');
  const [area, setArea] = useState(user?.area?.split(',')[0] || 'Frisco');
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [selectedImage, setSelectedImage] = useState(PRESET_IMAGES[0]);
  const [permission, setPermission] = useState(false);
  const [editingListingId, setEditingListingId] = useState(null);

  const fileInputRef = useRef(null);

  // Auth gate check: must be logged in to access posting
  if (!isAuthenticated) {
    return (
      <AuthGate
        badge="YOUR STUDIO / CREATE & MANAGE"
        title="Put your skills and things to work."
        subtitle="Post service offerings, rental items, task requests and company inventory, then edit or archive what you have published in this owner demo."
        actionText="Sign In to Post"
      />
    );
  }

  // Check paid entitlement: Free accounts see the Studio upgrade box
  const isPaid = plan && plan !== 'Free';
  const canManageOrg = plan === 'Business' || plan === 'Enterprise' || plan === 'Studio Pro' || ownerRole === 'enterprise';

  // Current user's listings
  const userListings = useMemo(() => {
    return listings.filter(l => l.owner === user.name || l.author === user.name || l.ownerVerified);
  }, [listings, user.name]);

  // Usage stats calculations
  const activeServices = userListings.filter(l => (l.type === 'service' || l.type === 'request' || l.kind === 'service' || l.kind === 'request') && l.status !== 'archived').length;
  const activeRentals = userListings.filter(l => (l.type === 'rental' || l.kind === 'rental' || (!l.type && !l.kind)) && l.status !== 'archived').length;
  const activeCount = userListings.filter(l => l.status !== 'archived').length;
  const archivedCount = userListings.filter(l => l.status === 'archived').length;
  const userReelsCount = reels?.filter(r => r.author === user?.name || r.owner === user?.name).length || 0;

  // Handle uploading custom image from device
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
      addToast('Photo loaded successfully!', 'success');
    };
    reader.onerror = () => {
      addToast('Failed to load image file', 'error');
    };
    reader.readAsDataURL(file);
  };

  const handleToggleArchive = (id) => {
    const item = listings.find(l => l.id === id);
    if (!item) return;
    const nextStatus = item.status === 'archived' ? 'active' : 'archived';
    if (updateListing) {
      updateListing(id, { status: nextStatus });
      addToast(nextStatus === 'archived' ? 'Listing moved to archive' : 'Listing restored to active', 'info');
    }
  };

  const handleEditListing = (item) => {
    setEditingListingId(item.id);
    setTitle(item.title || '');
    setPrice(item.price ? String(item.price) : '75');
    setArea(item.area || 'Frisco');
    setDate(item.date || '');
    setDescription(item.desc || item.description || '');
    setSelectedImage(item.image || PRESET_IMAGES[0]);
    setCategory(item.category || 'Tools');
    setKind(item.type || item.kind || 'service');

    const formEl = document.getElementById('create-listing');
    if (formEl) formEl.scrollIntoView({ behavior: 'smooth' });
    addToast('Editing listing: ' + item.title, 'info');
  };

  const handleSeedDemoInventory = () => {
    const samples = [
      {
        title: 'Compact Excavator Rental',
        category: 'Tools',
        price: 250,
        unit: 'day',
        deposit: 500,
        area: 'Frisco',
        image: 'https://images.unsplash.com/photo-1610477865545-37711c53144d?auto=format&fit=crop&w=800&q=80',
        type: 'rental',
        tag: 'Rental Gear',
        desc: 'Reliable diesel digger with trailer, perfect for trenching, foundation prep and residential grading.',
        status: 'active'
      },
      {
        title: 'Sony FX6 Cinema Camera Rig',
        category: 'Tech',
        price: 90,
        unit: 'day',
        deposit: 1500,
        area: 'Frisco',
        image: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80',
        type: 'rental',
        tag: 'Cinema Gear',
        desc: 'Full cinematic production kit with 24-70mm GM lens, V-mount power station and wireless audio.',
        status: 'active'
      },
      {
        title: 'Enterprise Project Staffing',
        category: 'Enterprise',
        price: 420,
        unit: 'day',
        deposit: 1000,
        area: 'Plano',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
        type: 'service',
        tag: 'Enterprise Staffing',
        desc: 'Dedicated on-site logistics crew and certified machinery handlers for multi-day infrastructure setups.',
        status: 'active'
      }
    ];

    samples.forEach(s => addListing(s));
    addToast('Loaded 3 example Studio listings into your inventory!', 'success');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isAuthenticated) {
      addToast('Please sign in to publish a listing', 'error');
      setRoute('auth');
      return;
    }

    if (!permission) {
      addToast('Please confirm your permission to publish.', 'error');
      return;
    }

    if (editingListingId) {
      if (updateListing) {
        updateListing(editingListingId, {
          title,
          category,
          price: Number(price),
          area,
          image: selectedImage,
          type: kind,
          desc: description,
          date
        });
        addToast('Listing updated successfully!', 'success');
      }
      setEditingListingId(null);
    } else {
      addListing({
        title,
        category,
        price: Number(price),
        unit: kind === 'request' ? 'budget' : 'day',
        deposit: kind === 'rental' ? Math.round(Number(price) * 1.5) : 0,
        area,
        image: selectedImage,
        type: kind,
        tag: kind === 'request' ? 'Task Request' : kind === 'service' ? 'Service Offer' : 'Rental Item',
        desc: description,
        date,
        status: 'active'
      });
      addToast('Listing published demo successfully!', 'success');
    }

    // Reset form fields
    setTitle('');
    setDescription('');
    setDate('');
    setPermission(false);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Page Heading matching docs/IDLE_Full_Marketplace_Elite_PM_Admin_Console (2).html#post */}
      <div className="space-y-1">
        <div className="text-[10px] font-extrabold uppercase tracking-widest text-[#9b782c]">
          YOUR STUDIO / CREATE & MANAGE
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#004f46]">
          Put your skills and things to work.
        </h1>
        <p className="text-xs sm:text-sm text-[#596e64] max-w-2xl leading-relaxed">
          Post service offerings, rental items, task requests and company inventory, then edit or archive what you have published in this owner demo.
        </p>
      </div>

      {/* 3 Top Usage Stats Cards (.post-usage) matching Prototype */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="bg-white border border-[#dce8df] rounded-2xl p-4 sm:p-5 flex flex-col gap-1.5 shadow-2xs">
          <strong className="text-xl sm:text-2xl font-bold text-[#004f46]">
            {activeServices} / Fair use
          </strong>
          <span className="text-xs text-[#6c7c73]">Active service/task posts</span>
        </div>

        <div className="bg-white border border-[#dce8df] rounded-2xl p-4 sm:p-5 flex flex-col gap-1.5 shadow-2xs">
          <strong className="text-xl sm:text-2xl font-bold text-[#004f46]">
            {activeRentals} / Fair use
          </strong>
          <span className="text-xs text-[#6c7c73]">Active rentals</span>
        </div>

        <div className="bg-white border border-[#dce8df] rounded-2xl p-4 sm:p-5 flex flex-col gap-1.5 shadow-2xs">
          <strong className="text-xl sm:text-2xl font-bold text-[#004f46]">
            {userReelsCount} / 12
          </strong>
          <span className="text-xs text-[#6c7c73]">Promotional Reels / 24h</span>
        </div>
      </div>

      {/* Entitlement check: upgrade prompt for Free plan */}
      {!isPaid ? (
        <div className="bg-[#f8faf9] border border-[#dce8df] rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 shadow-xs">
          <div className="space-y-1.5">
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#004f46]">
              Studio unlocks publishing.
            </h3>
            <p className="text-xs sm:text-sm text-[#596e64] max-w-xl leading-relaxed">
              Free accounts can create a profile, view nearby Reels and explore listings. Switch to Studio or higher to create earning listings, post tasks and communicate.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setRoute('membership')}
            className="gold-gradient-btn px-6 py-3 rounded-xl font-bold text-xs sm:text-sm shadow-md cursor-pointer whitespace-nowrap flex items-center gap-2 hover:brightness-105 transition-transform active:scale-98"
          >
            <Sparkles className="w-4 h-4" />
            <span>Preview Studio access →</span>
          </button>
        </div>
      ) : (
        /* Create Listing Form Card (#create-listing) matching Prototype */
        <div id="create-listing" className="bg-white border border-[#dce8df] rounded-2xl p-6 sm:p-8 space-y-6 shadow-xs">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#f0f4f1] pb-4">
            <div className="space-y-0.5">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#9b782c] block">
                NEW MARKETPLACE LISTING
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#004f46]">
                {editingListingId ? 'Edit your listing' : 'What would you like to post?'}
              </h2>
            </div>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-[#edf7f3] text-[#004f46] border border-[#cbe4d7] tracking-wider self-start sm:self-auto">
              LOCAL DEMO
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            {/* Form Grid matching Prototype */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Field 1: Listing type */}
              <div className="space-y-1.5">
                <label htmlFor="post-kind" className="block text-xs font-bold text-[#004f46]">
                  Listing type
                </label>
                <select
                  id="post-kind"
                  name="kind"
                  value={kind}
                  onChange={(e) => setKind(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe6df] bg-[#fbfcfa] focus:bg-white focus:border-[#004f46] outline-none transition-all text-xs cursor-pointer"
                >
                  <option value="service">Offer a service or trade</option>
                  <option value="rental">Rent out an item</option>
                  <option value="request">Post a task request</option>
                  {canManageOrg && <option value="business">Organization listing</option>}
                </select>
              </div>

              {/* Field 2: Category */}
              <div className="space-y-1.5">
                <label htmlFor="post-category" className="block text-xs font-bold text-[#004f46]">
                  Category
                </label>
                <select
                  id="post-category"
                  name="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe6df] bg-[#fbfcfa] focus:bg-white focus:border-[#004f46] outline-none transition-all text-xs cursor-pointer"
                >
                  {CATEGORY_OPTIONS.map((cat) => (
                    <option key={cat.value} value={cat.value}>{cat.label}</option>
                  ))}
                </select>
              </div>

              {/* Field 3: Listing title */}
              <div className="space-y-1.5">
                <label htmlFor="post-title" className="block text-xs font-bold text-[#004f46]">
                  Listing title
                </label>
                <input
                  id="post-title"
                  name="title"
                  required
                  maxLength={90}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Weekend camera kit or cabinet installation"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe6df] bg-[#fbfcfa] focus:bg-white focus:border-[#004f46] outline-none transition-all text-xs"
                />
              </div>

              {/* Field 4: Asking price / task budget USD */}
              <div className="space-y-1.5">
                <label htmlFor="post-price" className="block text-xs font-bold text-[#004f46]">
                  Asking price / task budget USD
                </label>
                <input
                  id="post-price"
                  name="price"
                  type="number"
                  min="0"
                  max="999999"
                  step="0.01"
                  required
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  placeholder="75"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe6df] bg-[#fbfcfa] focus:bg-white focus:border-[#004f46] outline-none transition-all text-xs font-semibold"
                />
              </div>

              {/* Field 5: Approximate location */}
              <div className="space-y-1.5">
                <label htmlFor="post-area" className="block text-xs font-bold text-[#004f46]">
                  Approximate location
                </label>
                <input
                  id="post-area"
                  name="area"
                  required
                  maxLength={45}
                  value={area}
                  onChange={(e) => setArea(e.target.value)}
                  placeholder="Frisco"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe6df] bg-[#fbfcfa] focus:bg-white focus:border-[#004f46] outline-none transition-all text-xs"
                />
              </div>

              {/* Field 6: Available from */}
              <div className="space-y-1.5">
                <label htmlFor="post-date" className="block text-xs font-bold text-[#004f46]">
                  Available from
                </label>
                <input
                  id="post-date"
                  name="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe6df] bg-[#fbfcfa] focus:bg-white focus:border-[#004f46] outline-none transition-all text-xs cursor-pointer"
                />
              </div>
            </div>

            {/* Field 7: Details, condition and scope (full width) */}
            <div className="space-y-1.5">
              <label htmlFor="post-description" className="block text-xs font-bold text-[#004f46]">
                Details, condition and scope
              </label>
              <textarea
                id="post-description"
                name="description"
                required
                minLength={10}
                maxLength={750}
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe the item, skill, task scope, conditions, and anything a customer should know."
                className="w-full px-3.5 py-2.5 rounded-xl border border-[#dbe6df] bg-[#fbfcfa] focus:bg-white focus:border-[#004f46] outline-none transition-all text-xs resize-none"
              />
            </div>

            {/* Field 8: Photo (optional) with file upload, preview, and demo presets */}
            <div className="space-y-2">
              <label htmlFor="post-photo" className="block text-xs font-bold text-[#004f46]">
                Photo (optional)
              </label>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                <input
                  id="post-photo"
                  name="photo"
                  type="file"
                  ref={fileInputRef}
                  accept="image/jpeg,image/png,image/webp"
                  onChange={handleImageFileChange}
                  className="block w-full sm:w-auto text-xs text-[#596e64] file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border file:border-[#dbe6df] file:text-xs file:font-bold file:bg-[#f1f8f2] file:text-[#004f46] hover:file:bg-[#e1f6f1] file:cursor-pointer cursor-pointer"
                />
                <small className="text-[11px] text-[#7a8d82]">
                  A clear photo is compressed to fit browser-only demo storage; it stays on this device.
                </small>
              </div>

              {/* Photo preview or preset chooser */}
              {selectedImage ? (
                <div className="flex items-center gap-3 pt-2">
                  <div className="relative w-36 h-24 rounded-xl overflow-hidden border-2 border-[#004f46] shadow-sm bg-black">
                    <img src={selectedImage} alt="Listing preview" className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => setSelectedImage('')}
                      className="absolute top-1 right-1 bg-black/75 hover:bg-black text-white rounded-full p-1 text-[10px] cursor-pointer"
                      title="Remove photo"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="text-[11px] text-[#596e64]">
                    <span className="font-bold text-[#004f46] block">Photo Attached</span>
                    <span>Ready for marketplace showcase</span>
                  </div>
                </div>
              ) : (
                <div className="pt-1">
                  <span className="text-[11px] text-[#7a8d82] block mb-1.5">
                    Or pick a sample marketplace photo:
                  </span>
                  <div className="flex items-center gap-2 overflow-x-auto pb-1">
                    {PRESET_IMAGES.map((imgUrl, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedImage(imgUrl)}
                        className="w-16 h-12 rounded-lg overflow-hidden border border-[#dbe6df] hover:border-[#004f46] shrink-0 cursor-pointer transition-transform hover:scale-105"
                      >
                        <img src={imgUrl} alt={`Preset ${i}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Field 9: Permission Checkbox */}
            <label className="flex items-start gap-2 pt-1 text-xs text-[#596e64] cursor-pointer select-none">
              <input
                type="checkbox"
                name="permission"
                required
                checked={permission}
                onChange={(e) => setPermission(e.target.checked)}
                className="mt-0.5 rounded text-[#004f46] focus:ring-[#004f46] cursor-pointer"
              />
              <span>
                I have permission to post this item, service and any identifiable people shown.
              </span>
            </label>

            {/* Actions: Button & Note */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2">
              <button
                type="submit"
                disabled={!permission}
                className="gold-gradient-btn px-6 py-3 rounded-xl font-bold text-xs shadow-md cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-transform active:scale-98"
              >
                <span>{editingListingId ? 'Update listing →' : 'Publish demo listing →'}</span>
              </button>
              <span className="text-[11px] text-[#7a8d82]">
                Local only · No actual customers are notified
              </span>
            </div>
          </form>
        </div>
      )}

      {/* Your listings & inventory Section matching Prototype */}
      <section className="space-y-4 pt-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#dce6df] pb-3">
          <div>
            <h2 className="font-serif text-2xl font-bold text-[#004f46]">
              Your listings & inventory
            </h2>
            <p className="text-xs text-[#718278]">
              {activeCount} active · {archivedCount} archived · sorted newest first
            </p>
          </div>
          <button
            type="button"
            onClick={() => setRoute('explore')}
            className="px-4 py-2 rounded-xl border border-[#dce6df] hover:border-[#004f46] text-[#004f46] font-bold text-xs bg-white shadow-2xs transition-colors self-start sm:self-auto cursor-pointer"
          >
            See marketplace →
          </button>
        </div>

        {userListings.length > 0 ? (
          <div className="space-y-3.5">
            {userListings.map((p) => {
              const isArchived = p.status === 'archived';
              return (
                <article 
                  key={p.id}
                  className="bg-white border border-[#dce8df] rounded-2xl overflow-hidden flex flex-col sm:flex-row items-stretch shadow-2xs transition-all hover:border-[#b8d1c2]"
                >
                  {/* Thumbnail Photo */}
                  <div className="w-full sm:w-52 h-44 sm:h-auto min-h-[140px] shrink-0 bg-[#eef4f0] relative">
                    <img 
                      src={p.image || PRESET_IMAGES[0]} 
                      alt={p.title} 
                      className={`w-full h-full object-cover ${isArchived ? 'grayscale opacity-75' : ''}`}
                    />
                  </div>

                  {/* Details Panel */}
                  <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between gap-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                          isArchived ? 'bg-gray-100 text-gray-600' : 'bg-[#edf7f3] text-[#004f46] border border-[#cbe4d7]'
                        }`}>
                          {(p.type || p.kind || 'Listing').toUpperCase()} · {isArchived ? 'ARCHIVED' : 'ACTIVE'}
                        </span>
                        <span className="text-[11px] text-[#718278]">{p.category}</span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-[#004f46]">
                        {p.title}
                      </h3>

                      <p className="text-xs text-[#596e64] line-clamp-2">
                        <span className="font-semibold text-[#143e33]">{p.area || 'Frisco'}</span>
                        {' · '}
                        <span className="font-bold text-[#004f46]">${Number(p.price || 0).toFixed(2)}</span>
                        {' · '}
                        <span>{p.desc || p.description || 'Verified local listing item.'}</span>
                      </p>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2 border-t border-[#f0f4f1]">
                      <button
                        type="button"
                        onClick={() => handleEditListing(p)}
                        className="px-3 py-1.5 rounded-lg border border-[#dce6df] hover:border-[#004f46] text-[#004f46] text-xs font-semibold bg-white transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleArchive(p.id)}
                        className="px-3 py-1.5 rounded-lg border border-[#dce6df] hover:border-[#004f46] text-[#004f46] text-xs font-semibold bg-white transition-colors cursor-pointer"
                      >
                        {isArchived ? 'Restore' : 'Archive'}
                      </button>
                      {!isArchived && (
                        <button
                          type="button"
                          onClick={() => {
                            if (setActiveListing) setActiveListing(p);
                            setRoute('explore');
                          }}
                          className="px-3 py-1.5 rounded-lg border border-[#004f46] bg-[#edf7f3] text-[#004f46] text-xs font-bold hover:bg-[#004f46] hover:text-white transition-colors cursor-pointer"
                        >
                          View
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => removeListing(p.id)}
                        className="ml-auto text-xs text-red-500 hover:text-red-700 hover:underline cursor-pointer"
                        title="Permanently remove"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="bg-white border border-[#dce8df] rounded-2xl p-8 sm:p-12 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 text-[#9b782c] flex items-center justify-center mx-auto border border-amber-200/50">
              <Sparkles className="w-6 h-6" />
            </div>
            <h3 className="font-serif text-lg font-bold text-[#004f46]">
              No Studio posts yet.
            </h3>
            <p className="text-xs text-[#718278] max-w-md mx-auto">
              Load the sample Studio business or create your first listing above to see it immediately in Explore.
            </p>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleSeedDemoInventory}
                className="gold-gradient-btn px-5 py-2.5 rounded-xl text-xs font-bold shadow-sm cursor-pointer"
              >
                Load example inventory →
              </button>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};
