import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useUserProfile';
import Layout from './components/Layout';
import WelcomeScreen from './pages/WelcomeScreen';
import ChatPage from './pages/ChatPage';
import JournalPage from './pages/JournalPage';
import MusicPage from './pages/MusicPage';
import MeditationPage from './pages/MeditationPage';
import ProfileSetupModal from './components/ProfileSetupModal';
import { Toaster } from './components/ui/sonner';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function AppContent() {
  const { identity, login, isInitializing } = useInternetIdentity();
  const [guestMode, setGuestMode] = React.useState(false);
  const [journalOpen, setJournalOpen] = React.useState(false);
  const [musicOpen, setMusicOpen] = React.useState(false);
  const [meditationOpen, setMeditationOpen] = React.useState(false);

  const isAuthenticated = !!identity;

  const {
    data: userProfile,
    isLoading: profileLoading,
    isFetched,
  } = useGetCallerUserProfile();

  const handleLogin = async () => {
    try {
      await login();
      setGuestMode(false);
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const handleContinueAsGuest = () => {
    setGuestMode(true);
  };

  // Show welcome screen if not authenticated and not in guest mode
  if (!isAuthenticated && !guestMode && !isInitializing) {
    return (
      <Layout>
        <WelcomeScreen
          onContinueAsGuest={handleContinueAsGuest}
          onLogin={handleLogin}
        />
      </Layout>
    );
  }

  // Show profile setup modal for authenticated users without a profile
  const showProfileSetup = isAuthenticated && !profileLoading && isFetched && userProfile === null;

  const isGuest = guestMode && !isAuthenticated;

  // Journal page — full screen, no Layout wrapper
  if (journalOpen) {
    return (
      <>
        <JournalPage onBack={() => setJournalOpen(false)} isGuest={isGuest} />
        {showProfileSetup && <ProfileSetupModal />}
        <Toaster />
      </>
    );
  }

  // Music page — full screen, no Layout wrapper
  if (musicOpen) {
    return (
      <>
        <MusicPage onBack={() => setMusicOpen(false)} />
        {showProfileSetup && <ProfileSetupModal />}
        <Toaster />
      </>
    );
  }

  // Meditation page — full screen, no Layout wrapper
  if (meditationOpen) {
    return (
      <>
        <MeditationPage onClose={() => setMeditationOpen(false)} />
        {showProfileSetup && <ProfileSetupModal />}
        <Toaster />
      </>
    );
  }

  return (
    <>
      <Layout isGuest={isGuest}>
        <ChatPage
          isGuest={isGuest}
          onLogin={handleLogin}
          onNavigateToJournal={() => setJournalOpen(true)}
          onNavigateToMusic={() => setMusicOpen(true)}
          onNavigateToMeditation={() => setMeditationOpen(true)}
        />
      </Layout>
      {showProfileSetup && <ProfileSetupModal />}
    </>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppContent />
      <Toaster />
    </QueryClientProvider>
  );
}
