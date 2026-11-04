import React from 'react';
import {
  LayoutGrid,
  Wrench,
  CheckSquare,
  Package,
  Truck,
  Shirt,
  Camera,
  Hammer,
  Compass,
  Sparkles
} from 'lucide-react';

export const MARKETPLACE_CATEGORIES = [
  { id: 'All', label: 'All', icon: LayoutGrid, count: 'Everything' },
  { id: 'Tools', label: 'Tools', icon: Wrench, count: 'Drills, saws & rigs' },
  { id: 'Tasks', label: 'Tasks', icon: CheckSquare, count: 'Assembly & moving' },
  { id: 'Rentals', label: 'Rentals', icon: Package, count: 'Trailers, cameras' },
  { id: 'Vehicles', label: 'Vehicles', icon: Truck, count: 'Haulers & vans' },
  { id: 'Fashion', label: 'Clothing', icon: Shirt, count: 'Occasion & couture' },
  { id: 'Electronics', label: 'Electronics', icon: Camera, count: 'Cinematography & audio' },
  { id: 'Services', label: 'Home Services', icon: Hammer, count: 'Repairs & setups' },
  { id: 'Outdoor', label: 'Outdoor', icon: Compass, count: 'Camp & watercraft' },
  { id: 'Events', label: 'Events', icon: Sparkles, count: 'Staging & decor' }
];

export const CategoryNavigation = ({
  activeCategory = 'All',
  onSelectCategory,
  showLabel = true,
  className = ''
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Category Icons Navigation - Horizontal Scrollable Shortcuts (NOT Listing Posts) */}
      <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar py-1.5 px-0.5 scroll-smooth">
        {MARKETPLACE_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = activeCategory === cat.id || (activeCategory === 'All' && cat.id === 'All');

          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => onSelectCategory && onSelectCategory(cat.id)}
              className={`flex-shrink-0 inline-flex items-center gap-2 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-2xl border text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer select-none ${
                isSelected
                  ? 'bg-[#004f46] text-white border-[#004f46] shadow-sm scale-[1.02]'
                  : 'bg-white hover:bg-idle-mint/50 text-[#082f2c] border-[#dcebe0] hover:border-idle-emerald/40'
              }`}
              title={`Filter marketplace by ${cat.label}`}
            >
              <div
                className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors ${
                  isSelected
                    ? 'bg-white/20 text-idle-gold'
                    : 'bg-idle-mint text-idle-emerald'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
              </div>
              <span className="whitespace-nowrap font-medium tracking-tight">
                {cat.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

