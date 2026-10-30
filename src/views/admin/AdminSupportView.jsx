import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import {
  MessageSquare,
  Search,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
  Sparkles,
  User,
  ShieldCheck
} from 'lucide-react';

export const AdminSupportView = () => {
  const { adminData, updateTicketStatus, replyToTicket } = useAdmin();
  const [selectedTicketId, setSelectedTicketId] = useState(adminData.tickets[0]?.id || null);
  const [replyText, setReplyText] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const selectedTicket = adminData.tickets.find(t => t.id === selectedTicketId) || adminData.tickets[0];

  const filteredTickets = adminData.tickets.filter(t => {
    if (statusFilter === 'All') return true;
    return t.status.toLowerCase() === statusFilter.toLowerCase();
  });

  const handleSendReply = (e) => {
    e.preventDefault();
    if (replyText.trim() && selectedTicket) {
      replyToTicket(selectedTicket.id, replyText);
      setReplyText('');
    }
  };

  const handleCannedResponse = (text) => {
    setReplyText(text);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[720px]">
        {/* Ticket List (Left 5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-[#e2e8e5] p-4 shadow-sm flex flex-col h-full">
          <div className="p-2 space-y-3 border-b border-gray-100 pb-3">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm text-[#0c302c]">Support Inbox & Tickets</h3>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800">
                {adminData.tickets.filter(t => t.status === 'Open').length} Open
              </span>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs">
              {['All', 'Open', 'In progress', 'Resolved'].map(st => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`flex-1 py-1 text-center rounded-lg font-semibold transition-all cursor-pointer text-[11px] ${
                    statusFilter === st ? 'bg-white text-[#0c302c] shadow-xs' : 'text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Tickets Scroll List */}
          <div className="flex-1 overflow-y-auto divide-y divide-gray-100 pt-2 no-scrollbar">
            {filteredTickets.map(ticket => {
              const isSelected = selectedTicket?.id === ticket.id;
              const isHigh = ticket.priority === 'High';

              return (
                <div
                  key={ticket.id}
                  onClick={() => setSelectedTicketId(ticket.id)}
                  className={`p-3.5 rounded-2xl transition-all cursor-pointer my-1 ${
                    isSelected
                      ? 'bg-[#0c302c] text-white shadow-sm'
                      : 'hover:bg-gray-50 text-gray-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-mono text-[10px] font-bold opacity-70">
                      {ticket.id} · {ticket.member}
                    </span>
                    <span className={`text-[9px] font-bold uppercase px-1.5 py-0.5 rounded ${
                      isSelected
                        ? 'bg-white/20 text-white'
                        : isHigh
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {ticket.priority}
                    </span>
                  </div>

                  <h5 className="font-bold text-xs line-clamp-1 mb-1">
                    {ticket.subject}
                  </h5>

                  <div className="flex items-center justify-between text-[10px] opacity-80">
                    <span>{ticket.category}</span>
                    <span>{ticket.status}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ticket Detail & Live Thread (Right 7 Cols) */}
        {selectedTicket ? (
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#e2e8e5] p-6 shadow-sm flex flex-col h-full">
            {/* Ticket Header */}
            <div className="border-b border-gray-100 pb-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs font-bold text-gray-400">
                    {selectedTicket.id}
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-800 border border-emerald-200">
                    {selectedTicket.team}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <select
                    value={selectedTicket.status}
                    onChange={(e) => updateTicketStatus(selectedTicket.id, e.target.value)}
                    className="text-xs font-bold px-2.5 py-1 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none cursor-pointer"
                  >
                    <option value="Open">Status: Open</option>
                    <option value="In progress">Status: In progress</option>
                    <option value="Resolved">Status: Resolved</option>
                  </select>
                </div>
              </div>

              <h4 className="font-bold text-base text-[#0c302c]">
                {selectedTicket.subject}
              </h4>
            </div>

            {/* Conversation Thread */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 no-scrollbar">
              {selectedTicket.messages.map((msg, idx) => {
                const isAgent = msg.from === 'agent';
                return (
                  <div
                    key={idx}
                    className={`flex flex-col ${isAgent ? 'items-end' : 'items-start'}`}
                  >
                    <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mb-1">
                      <span className="font-bold text-gray-600">
                        {isAgent ? 'Operations Staff' : `Member ${selectedTicket.member}`}
                      </span>
                      <span>·</span>
                      <span>{new Date(msg.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>

                    <div className={`p-3.5 rounded-2xl max-w-md text-xs leading-relaxed ${
                      isAgent
                        ? 'bg-[#0c302c] text-white rounded-tr-xs'
                        : 'bg-gray-100 text-gray-800 rounded-tl-xs'
                    }`}>
                      {msg.body}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Canned Quick Suggestions */}
            <div className="pt-2 pb-2 border-t border-gray-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[10px]">
              <span className="text-gray-400 font-bold shrink-0 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-[#d9b972]" /> Canned:
              </span>
              <button
                type="button"
                onClick={() => handleCannedResponse('The pre-authorized deposit hold automatically drops 48 hours after a clean QR handoff inspection.')}
                className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 whitespace-nowrap cursor-pointer"
              >
                Deposit Policy
              </button>
              <button
                type="button"
                onClick={() => handleCannedResponse('Free members can browse and message. To accept binding customer offers and publish inventory, activate the Studio plan.')}
                className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 whitespace-nowrap cursor-pointer"
              >
                Plan Differences
              </button>
              <button
                type="button"
                onClick={() => handleCannedResponse('Our concierge team has received your arrival request and will coordinate tarmac gate clearance with Addison FBO.')}
                className="px-2.5 py-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 whitespace-nowrap cursor-pointer"
              >
                Elite FBO Dispatch
              </button>
            </div>

            {/* Reply Input Form */}
            <form onSubmit={handleSendReply} className="flex items-center gap-2 pt-2">
              <input
                type="text"
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type response to member..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0c302c]"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-[#0c302c] text-white font-bold text-xs hover:bg-[#16443c] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Send</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="lg:col-span-7 bg-white rounded-3xl border border-[#e2e8e5] p-10 flex items-center justify-center text-gray-400 text-xs">
            Select a ticket from the inbox queue to view conversation.
          </div>
        )}
      </div>
    </div>
  );
};

