import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useInternetIdentity } from './hooks/useInternetIdentity';
import { useGetCallerUserProfile } from './hooks/useUserProfile';
import Layout from './components/Layout';
import WelcomeScreen from './pages/WelcomeScreen';
import ChatPage from './pages/ChatPage';
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

  return (
    <>
      <Layout isGuest={guestMode && !isAuthenticated}>
        <ChatPage isGuest={guestMode && !isAuthenticated} onLogin={handleLogin} />
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
