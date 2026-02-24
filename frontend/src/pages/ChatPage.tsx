import React from 'react';
import ConversationHistory from '../components/ConversationHistory';
import ConversationInput from '../components/ConversationInput';
import ChatBottomTabs from '../components/ChatBottomTabs';
import GuestPromptBanner from '../components/GuestPromptBanner';
import MusicControl from '../components/MusicControl';
import { useBackgroundMusic } from '../hooks/useBackgroundMusic';

interface ChatPageProps {
  isGuest: boolean;
  onLogin: () => void;
  onNavigateToJournal?: () => void;
  onNavigateToMusic?: () => void;
  onNavigateToMeditation?: () => void;
}

export default function ChatPage({
  isGuest,
  onLogin,
  onNavigateToJournal,
  onNavigateToMusic,
  onNavigateToMeditation,
}: ChatPageProps) {
  const { isPlaying, isMuted, togglePlay, toggleMute } = useBackgroundMusic(
    '/assets/background-music.mp3',
    0.35
  );

  return (
    /* Full-viewport background layer */
    <div className="chat-page-root">
      {/* Background image fills entire screen */}
      <div className="chat-bg-image" />

      {/* Translucent frosted overlay over the background */}
      <div className="chat-bg-overlay" />

      {/* Floating bubble chat container */}
      <div className="chat-bubble-wrapper">
        <div className="chat-bubble">
          {/* Guest banner */}
          {isGuest && <GuestPromptBanner onLogin={onLogin} />}

          {/* Conversation history */}
          <div className="flex-1 overflow-hidden flex flex-col min-h-0">
            <ConversationHistory isGuest={isGuest} />
          </div>

          {/* Input + bottom tabs */}
          <div className="flex-shrink-0">
            <ConversationInput isGuest={isGuest} />
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
