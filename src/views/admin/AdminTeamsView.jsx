import React, { useState } from 'react';
import { useAdmin } from '../../context/AdminContext';
import { Users2, CheckCircle2, Clock, Send, MessageSquare } from 'lucide-react';

export const AdminTeamsView = () => {
  const { adminData, addAuditLog, showFeedback } = useAdmin();
  const [activeChannel, setActiveChannel] = useState('general');
  const [chatInput, setChatInput] = useState('');

  const channelMessages = adminData.channels[activeChannel] || [];

  const handleSendChat = (e) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: `msg-${Date.now()}`,
      by: 'Owner (You)',
      msg: chatInput.trim(),
      at: Date.now()
    };

    adminData.channels[activeChannel] = [...channelMessages, newMsg];
    setChatInput('');
    showFeedback(`Note posted to #${activeChannel}`);
  };

  return (
    <div className="space-y-6">
      {/* Team Roster & Tasks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Staff Roster */}
        <div className="bg-white rounded-3xl border border-[#e2e8e5] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#0c302c] flex items-center gap-2">
              <Users2 className="w-4 h-4 text-[#0c302c]" />
              <span>Operations Staff ({adminData.employees.length})</span>
            </h3>
            <span className="text-xs text-gray-400">Named Seats</span>
          </div>

          <div className="divide-y divide-gray-100">
            {adminData.employees.map(emp => (
              <div key={emp.id} className="py-2.5 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-gray-900">{emp.name}</div>
                  <div className="text-[10px] text-gray-400">{emp.team}</div>
                </div>
                <div className="text-right">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-[#0c302c]/10 text-[#0c302c]">
                    {emp.role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dispatch Task Assignments */}
        <div className="bg-white rounded-3xl border border-[#e2e8e5] p-5 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#0c302c] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#d9b972]" />
              <span>Operational Dispatch Tasks</span>
            </h3>
            <span className="text-xs text-gray-400">Queue</span>
          </div>

          <div className="space-y-2">
            {adminData.tasks.map(t => (
              <div key={t.id} className="p-3 rounded-2xl bg-gray-50 border border-gray-100 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-gray-900">{t.title}</div>
                  <div className="text-[10px] text-gray-500 mt-0.5">
                    Assigned: <strong>{t.assignee}</strong> · {t.team}
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                  t.status === 'Completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                }`}>
                  {t.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Internal Staff Channel Chat */}
      <div className="bg-white rounded-3xl border border-[#e2e8e5] p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between border-b border-gray-100 pb-3">
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-[#0c302c]" />
            <span className="font-bold text-sm text-[#0c302c]">Internal Channel Notes</span>
          </div>

          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl text-xs">
            {['general', 'support', 'safety', 'elite'].map(ch => (
              <button
                key={ch}
                type="button"
                onClick={() => setActiveChannel(ch)}
                className={`px-3 py-1 rounded-lg font-bold capitalize transition-all cursor-pointer ${
                  activeChannel === ch ? 'bg-white text-[#0c302c] shadow-xs' : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                #{ch}
              </button>
            ))}
          </div>
        </div>

        <div className="h-44 overflow-y-auto space-y-3 p-2 bg-gray-50/50 rounded-2xl border border-gray-100 text-xs no-scrollbar">
          {channelMessages.map((m, idx) => (
            <div key={idx} className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 text-[11px]">{m.by}</span>
                <span className="text-[10px] text-gray-400">
                  {new Date(m.at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
              <p className="text-gray-700 text-xs pl-0.5 leading-relaxed">{m.msg}</p>
            </div>
          ))}
        </div>

        <form onSubmit={handleSendChat} className="flex items-center gap-2 pt-1">
          <input
            type="text"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            placeholder={`Leave internal note in #${activeChannel}...`}
            className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-xs focus:outline-none focus:border-[#0c302c]"
          />
          <button
            type="submit"
            className="px-4 py-2.5 rounded-xl bg-[#0c302c] text-white font-bold text-xs hover:bg-[#16443c] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Post Note</span>
          </button>
        </form>
      </div>
    </div>
  );
};

