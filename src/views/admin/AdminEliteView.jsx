import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Crown, ShieldCheck, CheckCircle2, Clock, Plane, Car, Building2, MapPin } from 'lucide-react';

export const AdminEliteView = () => {
  const { adminData, approveEliteItem } = useAdmin();

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-[#090d11] border border-[#d7b467]/40 rounded-3xl p-6 text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#d7b467]/10 blur-3xl pointer-events-none rounded-full" />
        <div className="relative z-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-black/60 border border-[#d7b467]/50 text-[#d7b467] text-[10px] font-bold uppercase tracking-wider">
            <Crown className="w-3.5 h-3.5" />
            <span>IDLE Elite PM · Private Members Operations</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#faedd1]">
            Private Aviation, Vertiport Shuttles & Sovereign Estates
          </h2>
          <p className="text-xs text-gray-300 max-w-xl">
            Coordinate private transit, Part 135 flight referrals, single-use QR boarding passes, and estate privacy non-disclosure agreements.
          </p>
        </div>
      </div>

      {/* Approvals Table */}
      <div className="bg-white rounded-3xl border border-[#e2e8e5] p-5 shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-base text-[#0c302c]">Private Asset Verification Queue</h3>
          <p className="text-xs text-gray-500">
            Audit off-market listings before surfacing them to verified Elite PM members.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <th className="py-3 px-3">Queue ID</th>
                <th className="py-3 px-3">Host Member</th>
                <th className="py-3 px-3">Asset Classification</th>
                <th className="py-3 px-3">Metro Hub</th>
                <th className="py-3 px-3">Compliance & Authority Notes</th>
                <th className="py-3 px-3">Verification Status</th>
                <th className="py-3 px-3 text-right">Concierge Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {adminData.eliteApprovals.map(item => {
                const isApproved = item.status === 'Approved';

                return (
                  <tr key={item.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-[#795a1a]">
                      {item.id}
                    </td>
                    <td className="py-3 px-3 font-mono text-gray-600">
                      {item.member}
                    </td>
                    <td className="py-3 px-3 font-semibold text-gray-900">
                      {item.kind}
                    </td>
                    <td className="py-3 px-3 text-gray-600">
                      {item.city}
                    </td>
                    <td className="py-3 px-3 text-gray-500 text-[11px] max-w-xs">
                      {item.notes}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isApproved
                          ? 'bg-emerald-100 text-emerald-800'
                          : 'bg-amber-100 text-amber-800'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right space-x-1">
                      {!isApproved ? (
                        <>
                          <button
                            type="button"
                            onClick={() => approveEliteItem(item.id, 'Approved')}
                            className="px-2.5 py-1 rounded-lg bg-[#0c302c] hover:bg-[#16443c] font-bold text-[11px] text-white transition-colors cursor-pointer"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            onClick={() => approveEliteItem(item.id, 'Docs Requested')}
                            className="px-2.5 py-1 rounded-lg border border-gray-200 hover:bg-gray-100 font-semibold text-[11px] text-gray-700 transition-colors cursor-pointer"
                          >
                            Req Docs
                          </button>
                        </>
                      ) : (
                        <span className="text-[11px] font-bold text-emerald-600">Active in PM</span>
                      )}
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

