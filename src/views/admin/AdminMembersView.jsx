import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  Users,
  Search,
  ShieldCheck,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MoreVertical,
  Filter
} from 'lucide-react';

export const AdminMembersView = () => {
  const { adminData, updateMemberStatus } = useAdmin();
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filteredUsers = adminData.users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
                          u.id.toLowerCase().includes(search.toLowerCase()) ||
                          u.city.toLowerCase().includes(search.toLowerCase());
    if (filter === 'All') return matchesSearch;
    if (filter === 'Verified') return matchesSearch && u.identity === 'Verified';
    if (filter === 'Pending') return matchesSearch && u.identity === 'Pending';
    if (filter === 'Review') return matchesSearch && u.status === 'Review';
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="bg-white rounded-3xl border border-[#e2e8e5] p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-base text-[#0c302c]">Member Directory & Verification</h3>
            <p className="text-xs text-gray-500">
              Manage accounts, KYC identity records, and provider credential compliance.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search member, ID, city..."
                className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-xs text-gray-800 focus:outline-none focus:border-[#0c302c] w-56"
              />
            </div>

            <div className="flex items-center rounded-xl bg-gray-100 p-1 border border-gray-200 text-xs">
              {['All', 'Verified', 'Pending', 'Review'].map(f => (
                <button
                  key={f}
                  type="button"
                  onClick={() => setFilter(f)}
                  className={`px-3 py-1 rounded-lg font-semibold transition-all cursor-pointer ${
                    filter === f ? 'bg-white text-[#0c302c] shadow-xs' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Member Directory Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <th className="py-3 px-3">Member ID</th>
                <th className="py-3 px-3">Name & Contact</th>
                <th className="py-3 px-3">Plan Tier</th>
                <th className="py-3 px-3">Location</th>
                <th className="py-3 px-3">Identity KYC</th>
                <th className="py-3 px-3">Credentials</th>
                <th className="py-3 px-3">Account Status</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map(user => {
                const isVerified = user.identity === 'Verified';
                const isActive = user.status === 'Active';

                return (
                  <tr key={user.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-gray-700">
                      {user.id}
                    </td>
                    <td className="py-3 px-3">
                      <div className="font-semibold text-gray-900">{user.name}</div>
                      <div className="text-[10px] text-gray-400">{user.email}</div>
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0c302c]/10 text-[#0c302c] border border-[#0c302c]/20">
                        {user.plan}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-600">
                      {user.city}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isVerified
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {isVerified ? <CheckCircle className="w-3 h-3" /> : <AlertTriangle className="w-3 h-3" />}
                        <span>{user.identity}</span>
                      </span>
                    </td>
                    <td className="py-3 px-3 text-[11px] text-gray-500">
                      {user.credentials}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isActive
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-rose-100 text-rose-800'
                      }`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right space-x-1">
                      <button
                        type="button"
                        onClick={() => updateMemberStatus(user.id, isActive ? 'Review' : 'Active')}
                        className="px-2.5 py-1 rounded-lg border border-gray-200 hover:bg-gray-100 font-semibold text-[11px] text-gray-700 transition-colors cursor-pointer"
                      >
                        {isActive ? 'Flag Review' : 'Activate'}
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

