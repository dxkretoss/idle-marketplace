import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { useApp } from '../../context/AppContext';
import {
  Users,
  Package,
  ArrowLeftRight,
  MessageSquare,
  ShieldCheck,
  Crown,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Activity,
  CheckCircle2,
  Clock
} from 'lucide-react';

export const AdminOverviewView = () => {
  const { adminData, setActiveView, role } = useAdmin();
  const { setRoute } = useApp();

  const totalMembers = adminData.users.length;
  const verifiedMembers = adminData.users.filter(u => u.identity === 'Verified').length;
  const totalListings = adminData.listings.length;
  const activeListings = adminData.listings.filter(l => l.status === 'Active').length;
  const openTickets = adminData.tickets.filter(t => t.status === 'Open').length;
  const pendingApprovals = adminData.eliteApprovals.filter(e => e.status === 'Pending').length;
  const totalVolume = adminData.transactions.reduce((acc, t) => acc + (t.amount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Top Welcome Banner */}
      <div className="bg-gradient-to-r from-[#0a2622] via-[#0f342f] to-[#0a2622] border border-[#1e443c] rounded-3xl p-6 text-white shadow-lg flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#d9b972]/20 border border-[#d9b972]/40 text-[#d9b972] text-[10px] font-bold uppercase tracking-wider">
            <Activity className="w-3 h-3" />
            <span>Operational Status: All Systems Nominal</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold tracking-tight">
            IDLE Operations Center · DFW Radius
          </h1>
          <p className="text-xs text-[#8fb8a8] max-w-xl">
            Real-time oversight for Tint.ai underwritten custody handoffs, Stripe Connect escrow splits, and Elite PM private member coordination.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveView('support')}
            className="px-4 py-2 rounded-xl bg-[#d9b972] text-[#0a2622] font-bold text-xs hover:opacity-95 shadow transition-all cursor-pointer flex items-center gap-1.5"
          >
            <span>Review Queues ({openTickets + pendingApprovals})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#e2e8e5] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Active Members</span>
            <Users className="w-4 h-4 text-[#0c302c]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#0c302c] font-serif">{totalMembers}</span>
            <span className="text-[11px] text-emerald-600 font-bold">{verifiedMembers} Verified</span>
          </div>
          <p className="text-[11px] text-gray-500">North Texas pilot members</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#e2e8e5] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Gross Booking Volume</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#0c302c] font-serif">${totalVolume.toLocaleString()}</span>
            <span className="text-[11px] text-emerald-600 font-bold">100% Escrowed</span>
          </div>
          <p className="text-[11px] text-gray-500">Stripe Connect splits routed</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#e2e8e5] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Live Inventory</span>
            <Package className="w-4 h-4 text-[#0c302c]" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#0c302c] font-serif">{totalListings}</span>
            <span className="text-[11px] text-[#b89547] font-bold">{activeListings} Published</span>
          </div>
          <p className="text-[11px] text-gray-500">Equipment, fashion & spaces</p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#e2e8e5] shadow-sm space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-bold uppercase tracking-wider">Open Inquiries</span>
            <MessageSquare className="w-4 h-4 text-amber-500" />
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-[#0c302c] font-serif">{openTickets}</span>
            <span className="text-[11px] text-amber-600 font-bold">Needs Agent</span>
          </div>
          <p className="text-[11px] text-gray-500">Average response &lt; 15m</p>
        </div>
      </div>

      {/* Two Column Section: Live Queues & Recent Audit Events */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Urgent Action Queues */}
        <div className="bg-white rounded-3xl border border-[#e2e8e5] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#0c302c] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#d9b972]" />
              <span>Pending Operational Queues</span>
            </h3>
            <span className="text-xs text-gray-400">Real-time</span>
          </div>

          <div className="space-y-2.5">
            {adminData.tickets.slice(0, 3).map(ticket => (
              <div
                key={ticket.id}
                onClick={() => setActiveView('support')}
                className="p-3.5 rounded-2xl border border-gray-100 hover:border-[#d9b972]/60 hover:bg-gray-50/50 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="space-y-1 min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-50 text-amber-700 border border-amber-200">
                      {ticket.priority} Priority
                    </span>
                    <span className="text-xs font-bold text-gray-900 truncate">
                      {ticket.subject}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate">
                    From Member {ticket.member} · {ticket.category}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#0c302c] shrink-0">Open →</span>
              </div>
            ))}

            {/* Elite PM approval navigation stopped and hidden while Elite PM is hidden */}
            {false && adminData.eliteApprovals.map(approval => (
              <div
                key={approval.id}
                onClick={() => setActiveView('elite')}
                className="p-3.5 rounded-2xl border border-gray-100 hover:border-[#d9b972]/60 hover:bg-gray-50/50 transition-all cursor-pointer flex items-center justify-between"
              >
                <div className="space-y-1 min-w-0 pr-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-[#fbf3db] text-[#795a1a] border border-[#d9b972]/40">
                      Elite PM Approval
                    </span>
                    <span className="text-xs font-bold text-gray-900 truncate">
                      {approval.kind}
                    </span>
                  </div>
                  <p className="text-[11px] text-gray-500 truncate">
                    {approval.city} · {approval.notes}
                  </p>
                </div>
                <span className="text-xs font-bold text-[#0c302c] shrink-0">Review →</span>
              </div>
            ))}
          </div>
        </div>

        {/* Live Immutable Audit History */}
        <div className="bg-white rounded-3xl border border-[#e2e8e5] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#0c302c] flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Immutable Audit Trail</span>
            </h3>
            <button
              type="button"
              onClick={() => setActiveView('audit')}
              className="text-xs text-[#0c302c] font-bold hover:underline"
            >
              View Full History →
            </button>
          </div>

          <div className="space-y-3">
            {adminData.history.slice(0, 5).map(log => (
              <div key={log.id} className="flex items-start gap-3 text-xs border-b border-gray-100 pb-2.5 last:border-0">
                <span className="text-[10px] font-mono text-gray-400 shrink-0 pt-0.5">
                  {new Date(log.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
                <div className="flex-1 min-w-0">
                  <span className="font-semibold text-gray-900">{log.event}</span>
                  <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                    <span>Actor: <strong className="text-gray-700">{log.actor}</strong></span>
                    <span>·</span>
                    <span className="px-1.5 py-0.2 rounded bg-gray-100">{log.module}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

