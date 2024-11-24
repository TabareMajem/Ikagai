import React, { useState } from 'react';
import HomePage from './pages/HomePage';
import DarumaGardenPage from './pages/DarumaGardenPage';
import FamilyFriendsPage from './pages/FamilyFriendsPage';
import MissionsPage from './pages/MissionsPage';
import StoryPage from './pages/StoryPage';
import MessagesPage from './pages/MessagesPage';
import ProfilePage from './pages/ProfilePage';
import MarketplacePage from './pages/MarketplacePage';
import NotificationsPage from './pages/NotificationsPage';
import SupportPage from './pages/SupportPage';
import VolunteerDashboard from './pages/VolunteerDashboard';
import VolunteerMissionsPage from './pages/VolunteerMissionsPage';
import VolunteerRewardsPage from './pages/VolunteerRewardsPage';
import OnboardingModal from './components/onboarding/OnboardingModal';

type UserType = 'elder' | 'volunteer';
type PageType = 'home' | 'garden' | 'family' | 'missions' | 'story' | 'messages' | 'profile' | 'marketplace' | 'notifications' | 'support' | 'volunteer' | 'community' | 'rewards';

export default function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [userType, setUserType] = useState<UserType | null>(null);

  const handleNavigate = (page: PageType) => {
    setCurrentPage(page);
  };

  const handleOnboardingComplete = (selectedUserType: UserType) => {
    setUserType(selectedUserType);
    setShowOnboarding(false);
    setCurrentPage(selectedUserType === 'volunteer' ? 'volunteer' : 'home');
  };

  const renderContent = () => {
    // If user is a volunteer, show volunteer-specific pages
    if (userType === 'volunteer') {
      switch (currentPage) {
        case 'volunteer':
          return <VolunteerDashboard onNavigate={handleNavigate} />;
        case 'missions':
          return <VolunteerMissionsPage onNavigate={handleNavigate} />;
        case 'messages':
          return <MessagesPage onNavigate={handleNavigate} />;
        case 'profile':
          return <ProfilePage onNavigate={handleNavigate} />;
        case 'community':
          return <FamilyFriendsPage onNavigate={handleNavigate} />;
        case 'rewards':
          return <VolunteerRewardsPage onNavigate={handleNavigate} />;
        default:
          return <VolunteerDashboard onNavigate={handleNavigate} />;
      }
    }

    // Otherwise, render elder-specific pages
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'garden':
        return <DarumaGardenPage onNavigate={handleNavigate} />;
      case 'family':
        return <FamilyFriendsPage onNavigate={handleNavigate} />;
      case 'missions':
        return <MissionsPage onNavigate={handleNavigate} />;
      case 'story':
        return <StoryPage onNavigate={handleNavigate} />;
      case 'messages':
        return <MessagesPage onNavigate={handleNavigate} />;
      case 'profile':
        return <ProfilePage onNavigate={handleNavigate} />;
      case 'marketplace':
        return <MarketplacePage onNavigate={handleNavigate} />;
      case 'notifications':
        return <NotificationsPage onNavigate={handleNavigate} />;
      case 'support':
        return <SupportPage onNavigate={handleNavigate} />;
      default:
        return null;
    }
  };

  return (
    <>
      {renderContent()}

      {showOnboarding && (
        <OnboardingModal onComplete={handleOnboardingComplete} />
      )}
    </>
  );
}