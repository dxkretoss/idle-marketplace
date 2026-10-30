import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Package, Search, Filter, CheckCircle2, AlertTriangle, Eye, ShieldCheck, XCircle } from 'lucide-react';

export const AdminListingsView = () => {
  const { adminData, updateListingStatus } = useAdmin();
  const [search, setSearch] = useState('');
  const [scopeFilter, setScopeFilter] = useState('All');

  const filteredListings = adminData.listings.filter(l => {
    const matchesSearch = l.title.toLowerCase().includes(search.toLowerCase()) ||
                          l.category.toLowerCase().includes(search.toLowerCase()) ||
                          l.city.toLowerCase().includes(search.toLowerCase());
    if (scopeFilter === 'All') return matchesSearch;
    if (scopeFilter === 'Elite PM') return matchesSearch && l.scope === 'Elite PM';
    if (scopeFilter === 'Public') return matchesSearch && l.scope === 'Public';
    if (scopeFilter === 'Flagged') return matchesSearch && l.status === 'Flagged';
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-[#e2e8e5] p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-base text-[#0c302c]">Marketplace Inventory Moderation</h3>
            <p className="text-xs text-gray-500">
              Audit public and Elite PM listings for policy compliance, safety, and price transparency.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search listing or city..."
                className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-[#0c302c] w-52"
              />
            </div>

            <div className="flex items-center rounded-xl bg-gray-100 p-1 border border-gray-200 text-xs">
              {['All', 'Public', 'Elite PM', 'Flagged'].map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setScopeFilter(f)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    scopeFilter === f ? 'bg-white text-[#0c302c] shadow-xs' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Listings Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <th className="py-3 px-3">Listing ID</th>
                <th className="py-3 px-3">Item Title</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Scope</th>
                <th className="py-3 px-3">Location & Rate</th>
                <th className="py-3 px-3">Owner</th>
                <th className="py-3 px-3">Review Status</th>
                <th className="py-3 px-3 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredListings.map(item => {
                const isActive = item.status === 'Active';
                const isFlagged = item.status === 'Flagged';
                const isElite = item.scope === 'Elite PM';

                return (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-gray-700">
                      {item.id}
                    </td>
                    <td className="py-3 px-3 font-semibold text-gray-900">
                      {item.title}
                    </td>
                    <td className="py-3 px-3 text-gray-600">
                      {item.category}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isElite
                          ? 'bg-[#fbf3db] text-[#795a1a] border border-[#d9b972]/40'
                          : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                      }`}>
                        {item.scope}
                      </span>
                    </td>
                    <td className="py-3 px-3">
                      <div className="text-gray-900 font-bold">{item.price}</div>
                      <div className="text-[10px] text-gray-400">{item.city}</div>
                    </td>
                    <td className="py-3 px-3 font-mono text-gray-500">
                      {item.member}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : isFlagged
                          ? 'bg-rose-100 text-rose-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right space-x-1">
                      {item.status !== 'Active' && (
                        <button
                          type="button"
                          onClick={() => updateListingStatus(item.id, 'Active')}
                          className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 font-bold text-[11px] text-white transition-colors cursor-pointer"
                        >
                          Approve
                        </button>
                      )}
                      {item.status !== 'Flagged' && (
                        <button
                          type="button"
                          onClick={() => updateListingStatus(item.id, 'Flagged')}
                          className="px-2.5 py-1 rounded-lg border border-rose-200 hover:bg-rose-50 font-bold text-[11px] text-rose-700 transition-colors cursor-pointer"
                        >
                          Flag
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => updateListingStatus(item.id, 'Review')}
                        className="px-2.5 py-1 rounded-lg border border-gray-200 hover:bg-gray-100 font-semibold text-[11px] text-gray-700 transition-colors cursor-pointer"
                      >
                        Hold
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

