import React, { useState } from 'react';
import { MessageSquare, Send, ShieldCheck, Lock, Crown } from 'lucide-react';

export const EliteInboxTab = () => {
  const [selectedThreadId, setSelectedThreadId] = useState('th-1');
  const [inputMsg, setInputMsg] = useState('');

  const [threads, setThreads] = useState([
    {
      id: 'th-1',
      title: 'Elite Aviation Concierge',
      subtitle: 'Cessna Citation X Aspen Empty Leg',
      partner: 'Apex Jet Charter Hub',
      unread: false,
      messages: [
        { id: '1', from: 'concierge', text: 'Good afternoon. We have locked your empty leg reservation request for Aspen (ASE). Single-use dynamic QR boarding token is generated.', time: '1:15 PM' },
        { id: '2', from: 'member', text: 'Thank you! Can we confirm ramp-side valet for two vehicles at McKinney TKI?', time: '1:20 PM' },
        { id: '3', from: 'concierge', text: 'Confirmed. TKI line service will escort your party directly to the aircraft stairs.', time: '1:22 PM' }
      ]
    },
    {
      id: 'th-2',
      title: 'Frisco Vertiport Black-Car Livery',
      subtitle: 'Cadillac Escalade ESV Shuttle',
      partner: 'Blackline Chauffeurs',
      unread: true,
      messages: [
        { id: '1', from: 'concierge', text: 'Chauffeur protocol active. Your driver will stage at Frisco Station Vertiport departure canopy.', time: '11:00 AM' }
      ]
    },
    {
      id: 'th-3',
      title: 'Highland Park Estate Butler',
      subtitle: 'Architectural Villa Boardroom',
      partner: 'Park Cities Asset Trust',
      unread: false,
      messages: [
        { id: '1', from: 'concierge', text: 'Non-disclosure agreement executed. Biometric gate code will activate 30 minutes prior to reservation.', time: 'Yesterday' }
      ]
    }
  ]);

  const activeThread = threads.find(t => t.id === selectedThreadId) || threads[0];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputMsg.trim()) return;

    const newMsg = {
      id: `m-${Date.now()}`,
      from: 'member',
      text: inputMsg.trim(),
      time: 'Just now'
    };

    setThreads(prev => prev.map(t => {
      if (t.id === activeThread.id) {
        return {
          ...t,
          messages: [...t.messages, newMsg]
        };
      }
      return t;
    }));
    setInputMsg('');
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[640px]">
        {/* Thread List */}
        <div className="lg:col-span-5 rounded-3xl border border-[#d7b467]/30 bg-[#090d11] p-4 shadow-xl flex flex-col h-full">
          <div className="p-2 border-b border-white/10 pb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Crown className="w-4 h-4 text-[#d7b467]" />
              <h3 className="font-serif text-sm font-bold text-white">Private Conversations</h3>
            </div>
            <span className="text-[10px] text-[#d7b467] font-mono">End-to-End Encrypted</span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-white/5 pt-2 no-scrollbar">
            {threads.map(thread => {
              const isSelected = activeThread.id === thread.id;

              return (
                <div
                  key={thread.id}
                  onClick={() => setSelectedThreadId(thread.id)}
                  className={`p-3.5 rounded-2xl transition-all cursor-pointer my-1 ${
                    isSelected
                      ? 'bg-gradient-to-r from-[#d7b467]/20 to-black border border-[#d7b467]/50 text-white'
                      : 'hover:bg-white/5 text-gray-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] text-[#d7b467] font-semibold">{thread.partner}</span>
                    <span className="text-[9px] text-gray-500">Active</span>
                  </div>
                  <h5 className="font-bold text-xs text-white truncate">{thread.title}</h5>
                  <p className="text-[11px] text-gray-400 truncate mt-0.5">{thread.subtitle}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Active Conversation Pane */}
        <div className="lg:col-span-7 rounded-3xl border border-[#d7b467]/30 bg-[#090d11] p-5 shadow-xl flex flex-col h-full">
          <div className="border-b border-white/10 pb-3 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-[#d7b467] font-semibold block">{activeThread.partner}</span>
              <h4 className="font-serif text-base font-bold text-white">{activeThread.title}</h4>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[10px] text-gray-300">
              <Lock className="w-3 h-3 text-[#d7b467]" />
              <span>Identity Protected</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 no-scrollbar">
            {activeThread.messages.map(msg => {
              const isMe = msg.from === 'member';

              return (
                <div key={msg.id} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div className="flex items-center gap-1.5 text-[10px] text-gray-400 mb-1">
                    <span>{isMe ? 'You' : 'Elite Concierge Desk'}</span>
                    <span>·</span>
                    <span>{msg.time}</span>
                  </div>
                  <div className={`p-3.5 rounded-2xl max-w-md text-xs leading-relaxed ${
                    isMe
                      ? 'bg-gradient-to-r from-[#d7b467] to-[#aa8334] text-black font-semibold rounded-tr-xs'
                      : 'bg-white/10 text-white rounded-tl-xs border border-white/10'
                  }`}>
                    {msg.text}
                  </div>
                </div>
              );
            })}
          </div>

          <form onSubmit={handleSend} className="flex items-center gap-2 pt-3 border-t border-white/10">
            <input
              type="text"
              value={inputMsg}
              onChange={(e) => setInputMsg(e.target.value)}
              placeholder="Send message to concierge..."
              className="flex-1 px-4 py-2.5 rounded-xl bg-black/60 border border-white/15 text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#d7b467]"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#d7b467] to-[#aa8334] text-black font-bold text-xs hover:opacity-95 transition-colors flex items-center gap-1.5 cursor-pointer shadow-md"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

