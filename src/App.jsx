import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SidebarNav } from './components/layout/SidebarNav';
import { Topbar } from './components/layout/Topbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { ToastContainer } from './components/layout/ToastContainer';
import { ListingDetailModal } from './components/modals/ListingDetailModal';
import { ReelViewerModal } from './components/modals/ReelViewerModal';

// Views
import { HomeView } from './views/HomeView';
import { ExploreView } from './views/ExploreView';
import { ReelsView } from './views/ReelsView';
import { PostView } from './views/PostView';
import { MessagesView } from './views/MessagesView';
import { BookingsView } from './views/BookingsView';
import { EnterpriseView } from './views/EnterpriseView';
import { ResourcesView } from './views/ResourcesView';
import { MembershipView } from './views/MembershipView';
import { ProfileView } from './views/ProfileView';
import { JourneyView } from './views/JourneyView';
import { AuthView } from './views/AuthView';

const MainContent = () => {
  const { route } = useApp();

  const renderCurrentView = () => {
    switch (route) {
      case 'home':
        return <HomeView />;
      case 'explore':
        return <ExploreView />;
      case 'reels':
        return <ReelsView />;
      case 'post':
        return <PostView />;
      case 'messages':
        return <MessagesView />;
      case 'transactions':
        return <BookingsView />;
      case 'enterprise':
        return <EnterpriseView />;
      case 'resources':
        return <ResourcesView />;
      case 'membership':
        return <MembershipView />;
      case 'profile':
        return <ProfileView />;
      case 'journey':
        return <JourneyView />;
      case 'auth':
        return <AuthView />;
      default:
        return <HomeView />;
    }
  };

  // Standalone full-screen layout for Authentication page
  if (route === 'auth') {
    return (
      <div className="min-h-screen w-full bg-[#f8faf8] text-[#172d28]">
        <AuthView />
        <ToastContainer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8faf8] text-[#172d28] w-full">
      {/* Full-width responsive dashboard shell */}
      <div className="w-full min-h-screen flex flex-col md:flex-row relative bg-[#f8faf8]">
        {/* Sticky Emerald Desktop Sidebar flush to left edge */}
        <SidebarNav />

        {/* Main Content Area filling remaining width */}
        <div className="flex-1 flex flex-col min-w-0 w-full">
          <Topbar />

          {/* View Container */}
          <main className="flex-1 p-4 sm:p-6 md:p-8 w-full min-w-0">
            {renderCurrentView()}
          </main>
        </div>
      </div>

      {/* Global Interactive Modals & Drawers */}
      <ListingDetailModal />
      <ReelViewerModal />
      <ToastContainer />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
