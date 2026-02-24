import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAddCheckIn } from '../hooks/useCheckIns';
import { Send, Loader2, Mic, MicOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import VoiceRecordingIndicator from './VoiceRecordingIndicator';
import ResourceCard from './ResourceCard';
import { getFoodLinks, getMusicLinks, getStoryLinks, getSelfCareLinks, getVideoLinks } from '../utils/moodResourceLinks';

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

export default function ConversationInput({ onCheckInAdded, isGuest }: ConversationInputProps) {
  const [feeling, setFeeling] = useState<string>('');
  const [content, setContent] = useState('');
  const [attemptCount, setAttemptCount] = useState(0);
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

  // Get resource links based on selected mood
  const foodLinks = feeling ? getFoodLinks(feeling) : [];
  const musicLinks = feeling ? getMusicLinks(feeling) : [];
  const storyLinks = feeling ? getStoryLinks(feeling) : [];
  const selfCareLinks = feeling ? getSelfCareLinks(feeling) : [];
  const videoLinks = feeling ? getVideoLinks(feeling) : [];

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
        <Select value={feeling} onValueChange={setFeeling}>
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
        <div className="relative py-6 px-2">
          {/* Cloud-shaped layout container with 5 resource cards */}
          <div className="relative min-h-[360px] sm:min-h-[320px]">
            {/* Top-left cloud bubble - Food */}
            <div className="absolute top-0 left-0 w-full sm:w-[48%] z-10 animate-in fade-in slide-in-from-top-4 duration-500">
              <ResourceCard
                category="🍲 Food for your mood"
                imageSrc="/assets/generated/food-mood-card.dim_200x200.png"
                links={foodLinks}
              />
            </div>

            {/* Top-right cloud bubble - Music */}
            <div className="absolute top-0 sm:top-4 right-0 w-full sm:w-[48%] mt-32 sm:mt-0 z-20 animate-in fade-in slide-in-from-top-4 duration-500 delay-100">
              <ResourceCard
                category="🎵 Music for your mood"
                imageSrc="/assets/generated/music-mood-card.dim_200x200.png"
                links={musicLinks}
              />
            </div>

            {/* Center cloud bubble - Videos */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full sm:w-[45%] mt-64 sm:mt-0 z-30 animate-in fade-in zoom-in-95 duration-500 delay-150">
              <ResourceCard
                category="🎬 Videos for your mood"
                imageSrc="/assets/generated/videos-mood-card.dim_200x200.png"
                links={videoLinks}
              />
            </div>

            {/* Bottom-left cloud bubble - Stories */}
            <div className="absolute bottom-0 left-0 w-full sm:w-[48%] mt-96 sm:mt-0 z-20 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
              <ResourceCard
                category="📖 Stories for your mood"
                imageSrc="/assets/generated/stories-mood-card.dim_200x200.png"
                links={storyLinks}
              />
            </div>

            {/* Bottom-right cloud bubble - Self-care */}
            <div className="absolute bottom-0 sm:bottom-4 right-0 w-full sm:w-[48%] mt-[32rem] sm:mt-0 z-10 animate-in fade-in slide-in-from-bottom-4 duration-500 delay-300">
              <ResourceCard
                category="💆 Self-care for your mood"
                imageSrc="/assets/generated/selfcare-mood-card.dim_200x200.png"
                links={selfCareLinks}
              />
            </div>
          </div>
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
