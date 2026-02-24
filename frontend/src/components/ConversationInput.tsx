import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { useAddCheckIn } from '../hooks/useCheckIns';
import { Send, Loader2, Mic, MicOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import VoiceRecordingIndicator from './VoiceRecordingIndicator';
import MusicTabContent from './MusicTabContent';
import DanceTabContent from './DanceTabContent';
import StoriesTabContent from './StoriesTabContent';
import SelfCareTabContent from './SelfCareTabContent';
import MeditationTabContent from './MeditationTabContent';
import WhatToWatchTabContent from './WhatToWatchTabContent';
import JournalingTabContent from './JournalingTabContent';

interface ConversationInputProps {
  onCheckInAdded: () => void;
  isGuest: boolean;
}

const emotions = [
  { value: 'happy', label: 'Happy 😊', emoji: '😊' },
  { value: 'sad', label: 'Sad 😢', emoji: '😢' },
  { value: 'anxious', label: 'Anxious 😰', emoji: '😰' },
  { value: 'angry', label: 'Angry 😠', emoji: '😠' },
  { value: 'excited', label: 'Excited 🤩', emoji: '🤩' },
  { value: 'tired', label: 'Tired 😴', emoji: '😴' },
  { value: 'confused', label: 'Confused 😕', emoji: '😕' },
  { value: 'grateful', label: 'Grateful 🙏', emoji: '🙏' },
  { value: 'overwhelmed', label: 'Overwhelmed 😵', emoji: '😵' },
  { value: 'peaceful', label: 'Peaceful 😌', emoji: '😌' },
  { value: 'lonely', label: 'Lonely 😔', emoji: '😔' },
  { value: 'stressed', label: 'Stressed 😓', emoji: '😓' },
];

const TAB_LIST = ['music', 'dance', 'stories', 'selfcare', 'meditation', 'watch', 'journaling'] as const;

export default function ConversationInput({ onCheckInAdded, isGuest }: ConversationInputProps) {
  const [feeling, setFeeling] = useState<string>('');
  const [content, setContent] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
  const [activeTab, setActiveTab] = useState('music');
  const mutation = useAddCheckIn(isGuest);

  const {
    isListening,
    transcript,
    interimTranscript,
    error: speechError,
    isSupported,
    startListening,
    stopListening,
    resetTranscript,
  } = useSpeechRecognition({
    continuous: false,
    interimResults: true,
  });

  // Component mount logging
  useEffect(() => {
    console.log('[ConversationInput] Component mounted at', new Date().toISOString());
    console.log('[ConversationInput] Initial state:', {
      feeling,
      activeTab,
      isGuest,
      tabsAvailable: TAB_LIST,
    });

    return () => {
      console.log('[ConversationInput] Component unmounting at', new Date().toISOString());
    };
  }, []);

  // Track feeling changes
  useEffect(() => {
    console.log('[ConversationInput] Feeling changed:', {
      newFeeling: feeling,
      timestamp: new Date().toISOString(),
      shouldShowTabs: !!feeling,
    });
  }, [feeling]);

  // Track active tab changes
  useEffect(() => {
    console.log('[ConversationInput] Active tab changed:', {
      newTab: activeTab,
      timestamp: new Date().toISOString(),
    });
  }, [activeTab]);

  // Update content when transcript changes
  useEffect(() => {
    if (transcript) {
      setContent((prev) => {
        const newContent = prev ? `${prev} ${transcript}` : transcript;
        return newContent;
      });
      resetTranscript();
    }
  }, [transcript, resetTranscript]);

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleFeelingChange = (value: string) => {
    console.log('[ConversationInput] Feeling selection:', {
      previousFeeling: feeling,
      newFeeling: value,
      timestamp: new Date().toISOString(),
    });
    setFeeling(value);
  };

  const handleTabChange = (value: string) => {
    console.log('[ConversationInput] Tab clicked:', {
      previousTab: activeTab,
      newTab: value,
      timestamp: new Date().toISOString(),
    });
    setActiveTab(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!feeling || !content.trim()) {
      console.warn('[ConversationInput] Submit attempted with missing data - feeling:', feeling, 'content:', content.trim());
      return;
    }

    // Stop listening if still active
    if (isListening) {
      stopListening();
    }

    const currentAttempt = attemptCount + 1;
    setAttemptCount(currentAttempt);
    const timestamp = new Date().toISOString();
    
    console.log('[ConversationInput] Submitting check-in:', {
      attempt: currentAttempt,
      timestamp,
      feeling,
      contentLength: content.length,
      isGuest,
    });

    try {
      await mutation.mutateAsync({ feelings: feeling, content });
      console.log('[ConversationInput] Check-in submitted successfully at', timestamp);
      
      setFeeling('');
      setContent('');
      onCheckInAdded();
      
      console.log('[ConversationInput] Form reset and callback triggered');
    } catch (error) {
      console.error('[ConversationInput] Submit error:', error);
      if (error instanceof Error) {
        console.error('[ConversationInput] Error type:', error.constructor.name);
        console.error('[ConversationInput] Error message:', error.message);
        console.error('[ConversationInput] Error stack:', error.stack);
      }
      console.error('[ConversationInput] Full error object:', JSON.stringify(error, null, 2));
    }
  };

  const isDisabled = !feeling || !content.trim() || mutation.isPending;

  // Log render state
  console.log('[ConversationInput] Rendering with state:', {
    feeling,
    activeTab,
    showingTabs: !!feeling,
    timestamp: new Date().toISOString(),
  });

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {mutation.error && (
        <Alert variant="destructive">
          <AlertDescription>
            <div className="space-y-1">
              <p className="font-medium">Failed to submit your check-in</p>
              <p className="text-sm">
                {mutation.error instanceof Error 
                  ? mutation.error.message 
                  : 'An unexpected error occurred. Please check the console for details.'}
              </p>
              <p className="text-xs opacity-75">
                Attempt #{attemptCount} at {new Date().toLocaleTimeString()}
              </p>
            </div>
          </AlertDescription>
        </Alert>
      )}

      {speechError && (
        <Alert variant="destructive">
          <AlertDescription>
            <p className="text-sm">{speechError}</p>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3">
        <Select value={feeling} onValueChange={handleFeelingChange}>
          <SelectTrigger className="w-[200px]">
            <SelectValue placeholder="How are you feeling?" />
          </SelectTrigger>
          <SelectContent>
            {emotions.map((emotion) => (
              <SelectItem key={emotion.value} value={emotion.value}>
                {emotion.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {feeling && (
        <div className="animate-in fade-in slide-in-from-top-4 duration-500">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <TabsList className="w-full grid grid-cols-4 lg:grid-cols-7 gap-1 h-auto p-1 bg-muted/50">
              <TabsTrigger 
                value="music" 
                className="text-xs sm:text-sm px-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Music
              </TabsTrigger>
              <TabsTrigger 
                value="dance" 
                className="text-xs sm:text-sm px-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Dance
              </TabsTrigger>
              <TabsTrigger 
                value="stories" 
                className="text-xs sm:text-sm px-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Stories
              </TabsTrigger>
              <TabsTrigger 
                value="selfcare" 
                className="text-xs sm:text-sm px-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Self Care
              </TabsTrigger>
              <TabsTrigger 
                value="meditation" 
                className="text-xs sm:text-sm px-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Meditation
              </TabsTrigger>
              <TabsTrigger 
                value="watch" 
                className="text-xs sm:text-sm px-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                What to Watch
              </TabsTrigger>
              <TabsTrigger 
                value="journaling" 
                className="text-xs sm:text-sm px-2 py-2 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                Journaling
              </TabsTrigger>
            </TabsList>

            <div className="mt-4 p-4 rounded-2xl bg-background/50 backdrop-blur-sm border border-border/50 min-h-[200px]">
              <TabsContent value="music" className="mt-0">
                <MusicTabContent mood={feeling} />
              </TabsContent>

              <TabsContent value="dance" className="mt-0">
                <DanceTabContent mood={feeling} />
              </TabsContent>

              <TabsContent value="stories" className="mt-0">
                <StoriesTabContent mood={feeling} />
              </TabsContent>

              <TabsContent value="selfcare" className="mt-0">
                <SelfCareTabContent mood={feeling} />
              </TabsContent>

              <TabsContent value="meditation" className="mt-0">
                <MeditationTabContent mood={feeling} />
              </TabsContent>

              <TabsContent value="watch" className="mt-0">
                <WhatToWatchTabContent mood={feeling} />
              </TabsContent>

              <TabsContent value="journaling" className="mt-0">
                <JournalingTabContent mood={feeling} />
              </TabsContent>
            </div>
          </Tabs>
        </div>
      )}

      {/* Voice Recording Indicator */}
      {isListening && <VoiceRecordingIndicator isRecording={isListening} />}

      {/* Talk to Ana Button */}
      {isSupported && (
        <Button
          type="button"
          onClick={handleVoiceToggle}
          disabled={mutation.isPending}
          className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white font-medium py-6 rounded-2xl shadow-warm-md transition-all duration-300 hover:shadow-warm-lg"
        >
          <Mic className={`h-5 w-5 mr-2 ${isListening ? 'animate-pulse' : ''}`} />
          {isListening ? 'Stop Recording' : 'Talk to Ana'}
        </Button>
      )}

      <div className="relative">
        <Textarea
          value={content + (interimTranscript ? ` ${interimTranscript}` : '')}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Tell me more about how you're feeling... or use the Talk to Ana button above"
          className="min-h-[100px] pr-20 resize-none"
          disabled={mutation.isPending || isListening}
        />
        <div className="absolute bottom-2 right-2 flex gap-2">
          {isSupported && (
            <Button
              type="button"
              size="icon"
              variant="ghost"
              onClick={handleVoiceToggle}
              disabled={mutation.isPending}
              className={`rounded-full ${isListening ? 'bg-primary/10 text-primary' : ''}`}
              title={isListening ? 'Stop recording' : 'Start voice input'}
            >
              {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
            </Button>
          )}
          <Button
            type="submit"
            size="icon"
            disabled={isDisabled}
            className="rounded-full"
          >
            {mutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </form>
  );
}
