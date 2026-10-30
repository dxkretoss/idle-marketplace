import React, { useState, useRef, useEffect } from 'react';
import { useAdmin, ADMIN_ROLES, ADMIN_VIEW_TITLES } from '../../context/AdminContext';
import { useApp } from '../../context/AppContext';
import {
  ChevronDown,
  ExternalLink,
  ShieldCheck,
  Check,
  AlertCircle,
  X,
  LogOut
} from 'lucide-react';

export const AdminTopbar = () => {
  const { role, setRole, activeView, feedback, logoutAdmin } = useAdmin();
  const { setRoute } = useApp();
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setRoleDropdownOpen(false);
      }
    };
    if (roleDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [roleDropdownOpen]);

  const currentTitle = ADMIN_VIEW_TITLES[activeView] || 'Operations';

  return (
    <header className="h-16 bg-white border-b border-[#e1e9e4] px-6 flex items-center justify-between sticky top-0 z-30 shadow-sm">
      {/* Left Title Area */}
      <div>
        <div className="text-[10px] uppercase font-bold tracking-widest text-[#698a7c]">
          IDLE / Admin Operations Sandbox
        </div>
        <h2 className="text-base sm:text-lg font-bold text-[#0c302c] font-serif leading-tight">
          {currentTitle}
        </h2>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Role Selector Pill */}
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            onClick={() => setRoleDropdownOpen(prev => !prev)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#fbf3db] border border-[#d9b972]/60 text-xs font-bold text-[#795a1a] hover:bg-[#faebd0] transition-colors cursor-pointer"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#d9b972]" />
            <span>{role}</span>
            <ChevronDown className="w-3 h-3 text-[#795a1a]" />
          </button>

          {roleDropdownOpen && (
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-200 py-2 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
              <div className="px-4 py-2 border-b border-gray-100">
                <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                  Switch Operational Role
                </span>
                <p className="text-xs text-gray-500 mt-0.5">
                  Filters available navigation and permissions.
                </p>
              </div>

              <div className="p-1 space-y-0.5">
                {Object.entries(ADMIN_ROLES).map(([rName, rData]) => {
                  const isCurrent = role === rName;
                  return (
                    <button
                      key={rName}
                      type="button"
                      onClick={() => {
                        setRole(rName);
                        setRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-colors cursor-pointer ${
                        isCurrent
                          ? 'bg-[#0c302c] text-white font-bold'
                          : 'hover:bg-gray-50 text-gray-800'
                      }`}
                    >
                      <div>
                        <div className="flex items-center gap-1.5 font-semibold">
                          <span>{rData.icon}</span>
                          <span>{rName}</span>
                        </div>
                        <div className={`text-[10px] ${isCurrent ? 'text-gray-300' : 'text-gray-400'}`}>
                          {rData.desc}
                        </div>
                      </div>
                      {isCurrent && <Check className="w-3.5 h-3.5 text-[#d9b972]" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* View Marketplace Button */}
        <button
          type="button"
          onClick={() => setRoute('home')}
          className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors cursor-pointer"
        >
          <span>Marketplace</span>
          <ExternalLink className="w-3.5 h-3.5 text-gray-400" />
        </button>

        {/* Lock Console / Sign Out Button */}
        <button
          type="button"
          onClick={logoutAdmin}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-rose-200/60 bg-rose-50 text-xs font-bold text-rose-700 hover:bg-rose-100 transition-colors cursor-pointer"
          title="Sign out of admin"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Lock</span>
        </button>
      </div>
    </header>
  );
};

