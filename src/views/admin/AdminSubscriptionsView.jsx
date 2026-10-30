import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { CreditCard, DollarSign, TrendingUp, AlertCircle, CheckCircle2 } from 'lucide-react';

export const AdminSubscriptionsView = () => {
  const { adminData, addAuditLog, showFeedback } = useAdmin();

  const mrr = adminData.invoices
    .filter(i => i.status === 'Paid')
    .reduce((acc, i) => acc + (i.amount || 0), 0);

  const handleRetryInvoice = (id) => {
    addAuditLog(`Retried payment authorization for invoice ${id}`, 'Subscriptions');
    showFeedback(`Payment retry queued for invoice ${id}`);
  };

  return (
    <div className="space-y-6">
      {/* MRR Highlights */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl bg-white border border-[#e2e8e5] shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Monthly Recurring Revenue</span>
          <div className="text-2xl font-serif font-black text-[#0c302c]">${mrr} /mo</div>
          <p className="text-[11px] text-emerald-600 font-semibold">+18% growth this month</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#e2e8e5] shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Paid Subscribers</span>
          <div className="text-2xl font-serif font-black text-[#0c302c]">{adminData.invoices.filter(i => i.status === 'Paid').length}</div>
          <p className="text-[11px] text-gray-500">Studio & Enterprise seats</p>
        </div>

        <div className="p-5 rounded-3xl bg-white border border-[#e2e8e5] shadow-sm space-y-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Failed / Retries</span>
          <div className="text-2xl font-serif font-black text-rose-600">1</div>
          <p className="text-[11px] text-rose-600 font-semibold">Requires card update</p>
        </div>
      </div>

      {/* Invoices Table */}
      <div className="bg-white rounded-3xl border border-[#e2e8e5] p-5 shadow-sm space-y-4">
        <div>
          <h3 className="font-bold text-base text-[#0c302c]">Active Subscription Invoices</h3>
          <p className="text-xs text-gray-500">
            Billing cycles, automated retries, and membership plan upgrades.
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-[10px] font-bold uppercase tracking-wider text-gray-400">
                <th className="py-3 px-3">Invoice ID</th>
                <th className="py-3 px-3">Subscriber</th>
                <th className="py-3 px-3">Active Tier</th>
                <th className="py-3 px-3">Monthly Charge</th>
                <th className="py-3 px-3">Billing Status</th>
                <th className="py-3 px-3">Next Renewal</th>
                <th className="py-3 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {adminData.invoices.map(inv => {
                const isPaid = inv.status === 'Paid';

                return (
                  <tr key={inv.id} className="hover:bg-gray-50/60 transition-colors">
                    <td className="py-3 px-3 font-mono font-bold text-gray-800">
                      {inv.id}
                    </td>
                    <td className="py-3 px-3 font-mono text-gray-600">
                      {inv.member}
                    </td>
                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0c302c]/10 text-[#0c302c] border border-[#0c302c]/20">
                        {inv.plan}
                      </span>
                    </td>
                    <td className="py-3 px-3 font-bold text-gray-900">
                      ${inv.amount}/mo
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        isPaid ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {inv.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-gray-600">
                      {inv.next}
                    </td>
                    <td className="py-3 px-3 text-right">
                      {!isPaid && (
                        <button
                          type="button"
                          onClick={() => handleRetryInvoice(inv.id)}
                          className="px-2.5 py-1 rounded-lg bg-[#0c302c] hover:bg-[#16443c] font-bold text-[11px] text-white transition-colors cursor-pointer"
                        >
                          Retry Webhook
                        </button>
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

