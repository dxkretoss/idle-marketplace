import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { AuthGate } from '../components/common/AuthGate';
import { 
  MessageSquare, 
  Send, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  Lock,
  User,
  QrCode
} from 'lucide-react';

const PROVIDER_AVATARS = {
  'th-1': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80', // Northline Rentals - Marcus Chen
  'th-2': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80', // Avery Style Collective - Avery Brooks
  'Northline Rentals': 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=400&q=80',
  'Avery Style Collective': 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=80'
};

const getProviderImage = (thread) => {
  return thread?.providerImage || PROVIDER_AVATARS[thread?.id] || PROVIDER_AVATARS[thread?.providerName] || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80';
};

export const MessagesView = () => {
  const { inbox, sendMessage, plan, setRoute, setPlan, isAuthenticated, addToast } = useApp();

  const [activeThreadId, setActiveThreadId] = useState(inbox[0]?.id || 'th-1');
  const [inputText, setInputText] = useState('');

  if (!isAuthenticated) {
    return (
      <AuthGate
        badge="Direct Messaging"
        title="Sign in to view messages & negotiations"
        subtitle="You must be signed in to chat with equipment owners, negotiate prices, and coordinate single-use QR handoffs."
        actionText="Sign In to Access Inbox"
      />
    );
  }

  const isPaid = ['Trade', 'Business', 'Enterprise'].includes(plan);

  const activeThread = inbox.find(t => t.id === activeThreadId) || inbox[0];

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(activeThreadId, inputText);
    setInputText('');
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Page Heading */}
      <div>
        <span className="text-[10px] font-bold uppercase tracking-wider text-idle-gold block">
          Secure Communications
        </span>
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-[#082f2c] mt-0.5">
          Inbox & Negotiations.
        </h1>
        <p className="text-xs sm:text-sm text-idle-muted mt-1 max-w-xl">
          Paid members communicate directly to agree on pricing, scheduling, and single-use QR custody handoffs with zero commission taken.
        </p>
      </div>

      {/* Free Plan Gate Notice (with preview toggle) */}
      {!isPaid && (
        <div className="glass-card p-6 rounded-3xl border-2 border-idle-gold/40 bg-gradient-to-r from-amber-50/60 to-emerald-50/50 space-y-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-idle-gold/20 text-idle-gold flex items-center justify-center flex-shrink-0">
              <Lock className="w-5 h-5 text-amber-700" />
            </div>
            <div className="space-y-1">
              <h3 className="font-serif text-lg font-bold text-[#122821]">
                Direct Member Messaging is a Paid Feature
              </h3>
              <p className="text-xs text-[#2b4d42] leading-relaxed">
                Free accounts can browse listings and post community requests. Upgrading to Trade ($15/mo) unlocks in-app negotiations, instant provider chat, and single-use QR custody transfers.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <button
              onClick={() => setRoute('membership')}
              className="gold-gradient-btn px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold shadow-md flex items-center gap-2 cursor-pointer"
            >
              <span>Upgrade to Trade ($15/mo)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPlan('Trade')}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-idle-emerald text-idle-emerald hover:bg-idle-mint transition-colors cursor-pointer"
            >
              Test as Trade Member (Instant Demo)
            </button>
          </div>
        </div>
      )}

      {/* Messenger Container */}
      <div className="glass-card rounded-3xl border border-idle-emerald/20 overflow-hidden shadow-glass grid grid-cols-1 md:grid-cols-12 min-h-[540px]">
        {/* Left Threads Column */}
        <div className="md:col-span-5 border-r border-idle-line flex flex-col bg-[#fbfdfc]">
          <div className="p-4 border-b border-idle-line flex items-center justify-between">
            <h3 className="font-serif text-sm font-bold text-[#0d2e29]">Active Conversations</h3>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-idle-mint text-idle-emerald">
              {inbox.length} Threads
            </span>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-idle-line">
            {inbox.map((thread) => {
              const isSelected = thread.id === activeThreadId;
              const lastMsg = thread.messages[thread.messages.length - 1];
              const avatarUrl = getProviderImage(thread);
              return (
                <button
                  key={thread.id}
                  onClick={() => setActiveThreadId(thread.id)}
                  className={`w-full p-4 flex items-start gap-3.5 text-left transition-all cursor-pointer ${
                    isSelected 
                      ? 'bg-idle-mint/60 border-l-4 border-idle-emerald' 
                      : 'hover:bg-black/5'
                  }`}
                >
                  <div className="relative flex-shrink-0">
                    <img 
                      src={avatarUrl} 
                      alt={thread.providerName} 
                      className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-idle-emerald/20" 
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <strong className="text-xs sm:text-sm font-bold text-[#172d28] truncate">
                        {thread.providerName}
                      </strong>
                      <span className="text-[10px] text-idle-muted">{lastMsg?.time || 'Today'}</span>
                    </div>
                    <span className="text-[11px] font-semibold text-idle-emerald block truncate">
                      {thread.listingTitle}
                    </span>
                    <p className="text-xs text-idle-muted truncate mt-0.5">
                      {lastMsg?.text || 'No messages yet'}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right Active Chat Pane */}
        <div className="md:col-span-7 flex flex-col bg-white">
          {activeThread ? (
            <>
              {/* Chat Header */}
              <div className="p-4 border-b border-idle-line flex items-center justify-between bg-[#f8faf9]">
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <img 
                      src={getProviderImage(activeThread)} 
                      alt={activeThread.providerName} 
                      className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-sm ring-1 ring-idle-emerald/20" 
                    />
                    <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-500 border-2 border-white shadow-xs" />
                  </div>
                  <div>
                    <h3 className="font-serif text-sm font-bold text-[#112d26] flex items-center gap-2">
                      <span>{activeThread.providerName}</span>
                      <span className="text-[10px] font-semibold bg-idle-mint text-idle-emerald px-2 py-0.5 rounded-full border border-idle-emerald/20 flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3 text-idle-emerald" />
                        <span>Verified</span>
                      </span>
                    </h3>
                    <span className="text-xs text-idle-muted block truncate">
                      Regarding: <strong>{activeThread.listingTitle}</strong>
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => addToast('Booking details and single-use QR custody will be available in Phase 2!', 'info')}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold border border-idle-emerald text-idle-emerald hover:bg-idle-mint transition-colors cursor-pointer"
                >
                  <QrCode className="w-3.5 h-3.5" />
                  <span>View Booking</span>
                </button>
              </div>

              {/* Chat Messages Log */}
              <div className="flex-1 p-5 overflow-y-auto space-y-4 bg-gradient-to-b from-[#f9fbf9] to-white">
                <div className="text-center">
                  <span className="text-[10px] text-idle-muted bg-white border border-idle-line px-3 py-1 rounded-full shadow-sm">
                    Protected in-app negotiation thread · DFW Pilot
                  </span>
                </div>

                {activeThread.messages.map((m) => {
                  const isUser = m.from === 'user';
                  return (
                    <div
                      key={m.id}
                      className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                    >
                      <div
                        className={`max-w-md p-3.5 rounded-2xl text-xs sm:text-sm leading-relaxed shadow-sm ${
                          isUser
                            ? 'bg-idle-emerald text-white rounded-br-none'
                            : 'bg-[#edf3f0] text-[#172d28] rounded-bl-none border border-idle-line'
                        }`}
                      >
                        {m.text}
                      </div>
                      <span className="text-[10px] text-idle-muted mt-1 px-1">
                        {m.time}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Chat Input Composer */}
              <form 
                onSubmit={handleSend}
                className="p-3.5 border-t border-idle-line bg-white flex items-center gap-2"
              >
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder="Type a message or proposed schedule..."
                  className="flex-1 px-4 py-2.5 rounded-xl border border-idle-line bg-[#f8faf9] focus:bg-white focus:border-idle-emerald outline-none text-xs sm:text-sm"
                />
                <button
                  type="submit"
                  disabled={!inputText.trim()}
                  className="emerald-gradient-btn px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Send</span>
                </button>
              </form>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center text-idle-muted">
              <MessageSquare className="w-12 h-12 text-idle-line mb-2" />
              <p className="text-sm">Select a thread to view messages</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
