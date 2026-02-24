import { useState, useEffect, useRef } from 'react';
import ConversationInput from '../components/ConversationInput';
import ConversationHistory from '../components/ConversationHistory';
import GuestPromptBanner from '../components/GuestPromptBanner';
import { useGetAllCheckInsWithResponses } from '../hooks/useCheckIns';
import { Loader2 } from 'lucide-react';

interface ChatPageProps {
  isGuest: boolean;
  onLogin: () => void;
}

export default function ChatPage({ isGuest, onLogin }: ChatPageProps) {
  const { data: checkInsWithResponses, isLoading, error } = useGetAllCheckInsWithResponses(isGuest);
  const [refreshKey, setRefreshKey] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  const handleNewCheckIn = () => {
    console.log('[ChatPage] New check-in added, triggering refresh');
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [checkInsWithResponses]);

  // Log errors for debugging
  useEffect(() => {
    if (error) {
      console.error('[ChatPage] Error loading check-ins:', error);
      if (error instanceof Error) {
        console.error('[ChatPage] Error message:', error.message);
        console.error('[ChatPage] Error stack:', error.stack);
      }
    }
  }, [error]);

  // Log data state changes
  useEffect(() => {
    console.log('[ChatPage] Data state changed:', {
      isGuest,
      isLoading,
      hasError: !!error,
      dataCount: checkInsWithResponses?.length || 0,
      refreshKey
    });
    
    if (checkInsWithResponses && checkInsWithResponses.length > 0) {
      console.log('[ChatPage] Check-ins data:', checkInsWithResponses.map((item, idx) => ({
        index: idx,
        timestamp: item.checkIn.timestamp,
        feelings: item.checkIn.feelings,
        hasResponse: !!item.response,
        responseMainMessage: item.response?.mainMessage?.substring(0, 30) + '...'
      })));
    }
  }, [isGuest, isLoading, error, checkInsWithResponses, refreshKey]);

  if (isLoading) {
    console.log('[ChatPage] Showing loading state');
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  if (error) {
    console.error('[ChatPage] Showing error state');
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-destructive text-lg mb-2">⚠️ Error loading conversations</p>
          <p className="text-muted-foreground text-sm">Please check the console for details</p>
        </div>
      </div>
    );
  }

  console.log('[ChatPage] Rendering chat interface with', checkInsWithResponses?.length || 0, 'check-ins');

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {isGuest && <GuestPromptBanner onLogin={onLogin} />}
      
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 text-foreground">How are you feeling today?</h1>
        <p className="text-muted-foreground">
          Share what's on your mind. I'm here to listen and support you.
        </p>
      </div>

      <div className="space-y-6 mb-8">
        <ConversationHistory checkInsWithResponses={checkInsWithResponses || []} />
        <div ref={bottomRef} />
      </div>

      <div className="sticky bottom-0 bg-background/95 backdrop-blur-sm py-4 border-t border-border">
        <ConversationInput onCheckInAdded={handleNewCheckIn} isGuest={isGuest} />
      </div>
    </div>
  );
}
