import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Crown, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';

// Sub-components
import { EliteTabBar } from '../components/elite/EliteTabBar';
import { EliteDiscoverTab } from './elite/EliteDiscoverTab';
import { EliteReelsTab } from './elite/EliteReelsTab';
import { EliteEventsTab } from './elite/EliteEventsTab';
import { EliteInboxTab } from './elite/EliteInboxTab';
import { EliteMyPortalTab } from './elite/EliteMyPortalTab';

// Modals
import { AviationInquiryModal } from '../components/elite/modals/AviationInquiryModal';
import { CreatePrivateListingModal } from '../components/elite/modals/CreatePrivateListingModal';
import { HostPrivateEventModal } from '../components/elite/modals/HostPrivateEventModal';
import { PostPrivateReelModal } from '../components/elite/modals/PostPrivateReelModal';

export const ElitePmView = () => {
  const { setRoute, addToast, isAuthenticated } = useApp();
  const [activeTab, setActiveTab] = useState('discover'); // 'discover' | 'reels' | 'events' | 'inbox' | 'my-elite'

  // Modal states
  const [selectedOffering, setSelectedOffering] = useState(null);
  const [isListingModalOpen, setIsListingModalOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [isReelModalOpen, setIsReelModalOpen] = useState(false);

  const handleOpenOffering = (offering) => {
    if (!isAuthenticated) {
      addToast('Please sign in or request Elite verification to coordinate private assets', 'info');
      setRoute('auth');
      return;
    }
    setSelectedOffering(offering);
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Luxury Obsidian Header with High-Resolution Cinematic Background */}
      <div className="relative rounded-3xl overflow-hidden border border-[#d7b467]/40 shadow-2xl p-6 sm:p-10 md:p-12 text-center isolate min-h-[220px] flex items-center justify-center">
        {/* High-Resolution Cinematic Twilight Aviation Background */}
        <img
          src="https://images.unsplash.com/photo-1540962351504-03099e0a754b?auto=format&fit=crop&w=1800&q=85"
          alt="IDLE Elite Private Aviation Terminal"
          className="absolute inset-0 w-full h-full object-cover object-center filter brightness-[0.80] contrast-105"
        />

        {/* Sophisticated Dark Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/75 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#030508]/80 via-transparent to-[#030508]/40 pointer-events-none" />

        {/* Soft Ambient Gold Backglow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-b from-[#d7b467]/25 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-2xl mx-auto space-y-3.5 z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-black/60 border border-[#d7b467]/60 shadow-lg backdrop-blur-md">
            <Crown className="w-3.5 h-3.5 text-[#d7b467]" />
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-[#f5e6c3]">
              IDLE Elite Private Marketplace
            </span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight bg-gradient-to-r from-[#faedd1] via-[#d7b467] to-[#aa8334] bg-clip-text text-transparent drop-shadow-[0_2px_12px_rgba(0,0,0,0.85)]">
            Welcome to IDLE Elite PM
          </h1>

          <p className="text-xs sm:text-sm text-gray-200 font-medium max-w-lg mx-auto leading-relaxed drop-shadow-sm">
            Your verified access to exclusive local peer assets and private transit.
          </p>
        </div>
      </div>

      {/* 5-Tab Navigation Bar */}
      <EliteTabBar activeTab={activeTab} onSelectTab={setActiveTab} />

      {/* Dynamic Tab Content */}
      <div className="animate-in fade-in duration-200">
        {activeTab === 'discover' && (
          <EliteDiscoverTab onOpenOffering={handleOpenOffering} />
        )}

        {activeTab === 'reels' && (
          <EliteReelsTab onOpenPostModal={() => setIsReelModalOpen(true)} />
        )}

        {activeTab === 'events' && (
          <EliteEventsTab onOpenHostModal={() => setIsEventModalOpen(true)} />
        )}

        {activeTab === 'inbox' && (
          <EliteInboxTab />
        )}

        {activeTab === 'my-elite' && (
          <EliteMyPortalTab
            onOpenListingModal={() => setIsListingModalOpen(true)}
            onOpenEventModal={() => setIsEventModalOpen(true)}
            onOpenReelModal={() => setIsReelModalOpen(true)}
          />
        )}
      </div>

      {/* Interactive Modals */}
      <AviationInquiryModal
        offering={selectedOffering}
        isOpen={Boolean(selectedOffering)}
        onClose={() => setSelectedOffering(null)}
      />

      <CreatePrivateListingModal
        isOpen={isListingModalOpen}
        onClose={() => setIsListingModalOpen(false)}
      />

      <HostPrivateEventModal
        isOpen={isEventModalOpen}
        onClose={() => setIsEventModalOpen(false)}
      />

      <PostPrivateReelModal
        isOpen={isReelModalOpen}
        onClose={() => setIsReelModalOpen(false)}
      />
    </div>
  );
};
