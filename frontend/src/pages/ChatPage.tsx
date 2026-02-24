import { useState, useEffect, useRef } from 'react';
import ConversationInput from '../components/ConversationInput';
import ConversationHistory from '../components/ConversationHistory';
import GuestPromptBanner from '../components/GuestPromptBanner';
import MusicControl from '../components/MusicControl';
import ChatBottomTabs from '../components/ChatBottomTabs';
import { useGetAllCheckInsWithResponses } from '../hooks/useCheckIns';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';
import { Loader2 } from 'lucide-react';

interface ChatPageProps {
  isGuest: boolean;
  onLogin: () => void;
  onNavigateToJournal: () => void;
  onNavigateToMusic: () => void;
  onNavigateToMeditation: () => void;
}

export default function ChatPage({ isGuest, onLogin, onNavigateToJournal, onNavigateToMusic, onNavigateToMeditation }: ChatPageProps) {
  const { data: checkInsWithResponses, isLoading, error } = useGetAllCheckInsWithResponses(isGuest);
  const [refreshKey, setRefreshKey] = useState(0);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Background music hook
  const { isPlaying, isMuted, togglePlay, toggleMute } = useBackgroundMusic(
    '/assets/background-music.mp3',
    0.35
  );

  const handleNewCheckIn = () => {
    setRefreshKey(prev => prev + 1);
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [checkInsWithResponses]);

  useEffect(() => {
    if (error) {
      console.error('[ChatPage] Error loading check-ins:', error);
    }
  }, [error]);

  if (isLoading) {
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

  return (
    <div className="relative min-h-screen flex">
      {/* Background room with Ana - visible on left side */}
      <div className="ana-room-background-split" />

      {/* Chat interface positioned on the right */}
      <div className="chat-container">
        <div className="relative z-10 w-full px-4 py-8 pb-0">
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

          {/* Input + bottom tabs wrapped together */}
          <div className="sticky bottom-0 rounded-t-2xl overflow-hidden shadow-warm-xl">
            {/* Input area */}
            <div className="bg-background/95 backdrop-blur-md px-4 pt-4 pb-3 border-t border-border/50">
              <ConversationInput onCheckInAdded={handleNewCheckIn} isGuest={isGuest} />
            </div>

            {/* Bottom tabs */}
            <ChatBottomTabs
              onJournalClick={onNavigateToJournal}
              onMusicClick={onNavigateToMusic}
              onMeditationClick={onNavigateToMeditation}
            />
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
