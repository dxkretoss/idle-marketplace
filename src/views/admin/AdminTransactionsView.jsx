import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { ArrowLeftRight, ShieldCheck, CheckCircle2, AlertTriangle, CreditCard, DollarSign } from 'lucide-react';

export const AdminTransactionsView = () => {
  const { adminData, addAuditLog, showFeedback } = useAdmin();

  const handleReleaseEscrow = (txId) => {
    addAuditLog(`Released Stripe Connect escrow payout split for transaction ${txId}`, 'Finance');
    showFeedback(`Escrow payout for ${txId} confirmed: 97.5% sent to provider, 2.5% IDLE fee retained.`);
  };

  const handleResolveIssue = (txId) => {
    addAuditLog(`Resolved custody scheduling conflict for ${txId}`, 'Support');
    showFeedback(`Dispute on ${txId} marked as resolved.`);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-3xl border border-[#e2e8e5] p-5 shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-base text-[#0c302c]">Transaction & Escrow Oversight</h3>
          <p className="text-xs text-gray-500">
            Monitor 5-stage booking lifecycles, automated Stripe Connect payout splits, and Tint.ai underwriting holds.
          </p>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <th className="py-3 px-3">Transaction ID</th>
                <th className="py-3 px-3">Member</th>
                <th className="py-3 px-3">Category</th>
                <th className="py-3 px-3">Escrow Value</th>
                <th className="py-3 px-3">Lifecycle Progress</th>
                <th className="py-3 px-3">Payment / Pre-auth</th>
                <th className="py-3 px-3">Custody Issue</th>
                <th className="py-3 px-3 text-right">Oversight Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {adminData.transactions.map(tx => {
                const hasIssue = tx.issue && tx.issue !== 'None';
                const isCompleted = tx.status === 'Completed';

                return (
                  <tr key={tx.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-gray-800">
                      {tx.id}
                    </td>
                    <td className="py-3 px-3 font-mono text-gray-600">
                      {tx.member}
                    </td>
                    <td className="py-3 px-3">
                      <span className="font-semibold text-gray-800">{tx.type}</span>
                      <span className="text-[10px] text-gray-400 block">{tx.scope}</span>
                    </td>
                    <td className="py-3 px-3 font-serif font-bold text-sm text-[#0c302c]">
                      ${tx.amount.toLocaleString()}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isCompleted ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-50 text-blue-800 border border-blue-200'
                      }`}>
                        {tx.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-600 text-[11px]">
                      {tx.payment}
                    </td>
                    <td className="py-3 px-3">
                      {hasIssue ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-rose-700 bg-rose-50 border border-rose-200 px-2 py-0.5 rounded-md">
                          <AlertTriangle className="w-3 h-3" />
                          <span>{tx.issue}</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                          <CheckCircle2 className="w-3 h-3" />
                          <span>Normal</span>
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-3 text-right space-x-1">
                      {hasIssue && (
                        <button
                          type="button"
                          onClick={() => handleResolveIssue(tx.id)}
                          className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 font-bold text-[11px] text-white transition-colors cursor-pointer"
                        >
                          Arbitrate
                        </button>
                      )}
                      <button
                        type="button"
                        onClick={() => handleReleaseEscrow(tx.id)}
                        className="px-2.5 py-1 rounded-lg bg-[#0c302c] hover:bg-[#16443c] font-bold text-[11px] text-white transition-colors cursor-pointer"
                      >
                        Release Split
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

