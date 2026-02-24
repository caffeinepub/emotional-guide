import { useState, useEffect, useRef } from 'react';
import ConversationInput from '../components/ConversationInput';
import ConversationHistory from '../components/ConversationHistory';
import GuestPromptBanner from '../components/GuestPromptBanner';
import MusicControl from '../components/MusicControl';
import { useGetAllCheckInsWithResponses } from '../hooks/useCheckIns';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import { Loader2 } from 'lucide-react';

interface ChatPageProps {
  isGuest: boolean;
  onLogin: () => void;
}

export default function ChatPage({ isGuest, onLogin }: ChatPageProps) {
  const { data: checkInsWithResponses, isLoading, error } = useGetAllCheckInsWithResponses(isGuest);
  const [refreshKey, setRefreshKey] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);
  
  // Background music hook
  const { isPlaying, isMuted, togglePlay, toggleMute } = useBackgroundMusic(
    '/assets/background-music.mp3',
    0.35
  );

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
      <div className="relative min-h-screen">
        <div className="ana-room-background" />
        <div className="relative z-10 flex items-center justify-center min-h-[60vh]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </div>
    );
  }

  if (error) {
    console.error('[ChatPage] Showing error state');
    return (
      <div className="relative min-h-screen">
        <div className="ana-room-background" />
        <div className="relative z-10 flex items-center justify-center min-h-[60vh]">
          <div className="text-center bg-background/90 backdrop-blur-sm p-6 rounded-2xl border border-border">
            <p className="text-destructive text-lg mb-2">⚠️ Error loading conversations</p>
            <p className="text-muted-foreground text-sm">Please check the console for details</p>
          </div>
        </div>
      </div>
    );
  }

  console.log('[ChatPage] Rendering chat interface with', checkInsWithResponses?.length || 0, 'check-ins');

  return (
    <div className="relative min-h-screen flex">
      {/* Background room with Ana - visible on left side */}
      <div className="ana-room-background-split" />
      
      {/* Chat interface positioned on the right */}
      <div className="chat-container">
        <div className="relative z-10 w-full px-4 py-8">
          {isGuest && <GuestPromptBanner onLogin={onLogin} />}
          
          <div className="mb-8 bg-background/80 backdrop-blur-md p-6 rounded-2xl border border-border/50 shadow-warm-lg">
            <h1 className="text-3xl font-bold mb-2 text-foreground">How are you feeling today?</h1>
            <p className="text-muted-foreground">
              Share what's on your mind. I'm here to listen and support you.
            </p>
          </div>

          <div className="space-y-6 mb-8">
            <ConversationHistory checkInsWithResponses={checkInsWithResponses || []} />
            <div ref={bottomRef} />
          </div>

          <div className="sticky bottom-0 bg-background/95 backdrop-blur-md py-4 border-t border-border/50 rounded-t-2xl shadow-warm-xl">
            <ConversationInput onCheckInAdded={handleNewCheckIn} isGuest={isGuest} />
          </div>
        </div>
      </div>

      {/* Music control */}
      <MusicControl
        isPlaying={isPlaying}
        isMuted={isMuted}
        onTogglePlay={togglePlay}
        onToggleMute={toggleMute}
      />
    </div>
  );
}
