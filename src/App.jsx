import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { SidebarNav } from './components/layout/SidebarNav';
import { Topbar } from './components/layout/Topbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { ToastContainer } from './components/layout/ToastContainer';
import { ListingDetailModal } from './components/modals/ListingDetailModal';
import { ReelViewerModal } from './components/modals/ReelViewerModal';
import { ResourceDetailModal } from './components/modals/ResourceDetailModal';

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
import { ContactView } from './views/ContactView';
import { PrivacyView } from './views/PrivacyView';
import { TermsView } from './views/TermsView';
import { ElitePmView } from './views/ElitePmView';
import { OwnerSandboxView } from './views/OwnerSandboxView';
import { TasksView } from './views/TasksView';
import { AdminProvider } from './context/AdminContext';
import { AdminLayout } from './views/admin/AdminLayout';

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
      case 'tasks':
        return <TasksView />;
      case 'post':
        return <PostView />;
      case 'messages':
        return <MessagesView />;
      case 'transactions':
      case 'bookings':
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
      case 'contact':
        return <ContactView />;
      case 'privacy':
        return <PrivacyView />;
      case 'terms':
        return <TermsView />;
      case 'elitepm':
      case 'elite-pm':
        return <ElitePmView />;
      case 'owner':
        return <OwnerSandboxView />;
      default:
        return <HomeView />;
    }
  };

  // Standalone full-screen layout for Admin Console (/admin)
  if (route === 'admin') {
    return (
      <div className="min-h-screen w-full bg-[#f4f7f5] text-[#172d28]">
        <AdminLayout />
        <ToastContainer />
      </div>
    );
  }

  // Standalone full-screen layout for Authentication page
  if (route === 'auth') {
    return (
      <div className="min-h-screen w-full bg-[#f8faf8] text-[#172d28]">
        <AuthView />
        <ToastContainer />
      </div>
    );
  }

  const isEliteRoute = route === 'elitepm' || route === 'elite-pm';

  return (
    <div className={`min-h-screen ${isEliteRoute ? 'bg-[#0d1110]' : 'bg-[#f8faf8]'} text-[#172d28] w-full`}>
      {/* Full-width responsive dashboard shell */}
      <div className={`w-full min-h-screen flex flex-col md:flex-row relative ${isEliteRoute ? 'bg-[#0d1110]' : 'bg-[#f8faf8]'}`}>
        {/* Sticky Emerald Desktop Sidebar flush to left edge */}
        <SidebarNav />

        {/* Main Content Area filling remaining width */}
        <div className={`flex-1 flex flex-col min-w-0 w-full ${isEliteRoute ? 'bg-[#0d1110]' : ''}`}>
          <Topbar />

          {/* View Container */}
          <main className={`flex-1 w-full min-w-0 ${isEliteRoute ? 'p-0 bg-[#0d1110]' : 'p-4 sm:p-6 md:p-8 pb-0 sm:pb-0 md:pb-0'}`}>
            {renderCurrentView()}
          </main>
        </div>
      </div>

      {/* Global Interactive Modals & Drawers */}
      <ListingDetailModal />
      <ReelViewerModal />
      <ResourceDetailModal />
      <ToastContainer />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AdminProvider>
        <MainContent />
      </AdminProvider>
    </AppProvider>
  );
}
