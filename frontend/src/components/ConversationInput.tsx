import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAddCheckIn } from '../hooks/useCheckIns';
import { Send, Loader2, Mic, MicOff } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import VoiceRecordingIndicator from './VoiceRecordingIndicator';

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

  const handleFeelingChange = (value: string) => {
    setFeeling(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!feeling || !content.trim()) {
      return;
    }

    // Stop listening if still active
    if (isListening) {
      stopListening();
    }

    const currentAttempt = attemptCount + 1;
    setAttemptCount(currentAttempt);

    try {
      await mutation.mutateAsync({ feelings: feeling, content });
      setFeeling('');
      setContent('');
      onCheckInAdded();
    } catch (error) {
      console.error('[ConversationInput] Submit error:', error);
    }
  };

  const isDisabled = !feeling || !content.trim() || mutation.isPending;

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
