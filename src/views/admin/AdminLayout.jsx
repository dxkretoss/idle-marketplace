import React from 'react';
import { useAdmin } from '../../context/AdminContext';
import { AdminSidebar } from '../../components/admin/AdminSidebar';
import { AdminTopbar } from '../../components/admin/AdminTopbar';
import { AdminLoginView } from './AdminLoginView';

// 13 Modular View Components
import { AdminOverviewView } from './AdminOverviewView';
import { AdminMembersView } from './AdminMembersView';
import { AdminListingsView } from './AdminListingsView';
import { AdminSupportView } from './AdminSupportView';
import { AdminTransactionsView } from './AdminTransactionsView';
import { AdminSubscriptionsView } from './AdminSubscriptionsView';
import { AdminEliteView } from './AdminEliteView';
import { AdminReelsView } from './AdminReelsView';
import { AdminTeamsView } from './AdminTeamsView';
import { AdminAiHelpdeskView } from './AdminAiHelpdeskView';
import { AdminAutomationsView } from './AdminAutomationsView';
import { AdminResourcesView } from './AdminResourcesView';
import { AdminAuditView } from './AdminAuditView';

export const AdminLayout = () => {
  const { isLoggedIn, activeView, feedback } = useAdmin();

  // If locked, show passcode unlock screen
  if (!isLoggedIn) {
    return <AdminLoginView />;
  }

  const renderActiveView = () => {
    switch (activeView) {
      case 'overview':
        return <AdminOverviewView />;
      case 'members':
        return <AdminMembersView />;
      case 'listings':
        return <AdminListingsView />;
      case 'support':
        return <AdminSupportView />;
      case 'transactions':
        return <AdminTransactionsView />;
      case 'subscriptions':
        return <AdminSubscriptionsView />;
      case 'elite':
        return <AdminEliteView />;
      case 'reels':
        return <AdminReelsView />;
      case 'teams':
        return <AdminTeamsView />;
      case 'ai':
        return <AdminAiHelpdeskView />;
      case 'automations':
        return <AdminAutomationsView />;
      case 'resources':
        return <AdminResourcesView />;
      case 'audit':
        return <AdminAuditView />;
      default:
        return <AdminOverviewView />;
    }
  };

  return (
    <div className="min-h-screen w-full bg-[#f4f7f5] flex overflow-hidden font-sans">
      {/* Dark Emerald Admin Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
        <AdminTopbar />

        {/* Global Feedback Banner */}
        {feedback && (
          <div className="bg-emerald-900 text-white px-6 py-2.5 text-xs font-semibold flex items-center justify-between border-b border-emerald-800 animate-in slide-in-from-top-1 duration-150">
            <span>{feedback}</span>
          </div>
        )}

        {/* View Body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          {renderActiveView()}
        </main>
      </div>
    </div>
  );
};

