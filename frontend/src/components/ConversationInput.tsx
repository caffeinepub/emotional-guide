import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useAddCheckIn } from '../hooks/useCheckIns';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import VoiceRecordingIndicator from './VoiceRecordingIndicator';

interface ConversationInputProps {
  isGuest: boolean;
  onCheckInAdded?: () => void;
}

const MOOD_OPTIONS = [
  { value: 'happy', emoji: '😊', label: 'Happy' },
  { value: 'sad', emoji: '😢', label: 'Sad' },
  { value: 'anxious', emoji: '😰', label: 'Anxious' },
  { value: 'angry', emoji: '😠', label: 'Angry' },
  { value: 'lonely', emoji: '🥺', label: 'Lonely' },
  { value: 'stressed', emoji: '😤', label: 'Stressed' },
  { value: 'grateful', emoji: '🙏', label: 'Grateful' },
  { value: 'calm', emoji: '😌', label: 'Calm' },
];

export default function ConversationInput({ isGuest, onCheckInAdded }: ConversationInputProps) {
  const [content, setContent] = useState('');
  const [selectedMood, setSelectedMood] = useState('');
  const [submitError, setSubmitError] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const addCheckInMutation = useAddCheckIn(isGuest);

  const {
    isListening,
    transcript,
    interimTranscript,
    startListening,
    stopListening,
    isSupported: speechSupported,
  } = useSpeechRecognition();

  // Append finalized speech transcript to content
  useEffect(() => {
    if (transcript) {
      setContent((prev) => (prev ? `${prev} ${transcript}` : transcript));
    }
  }, [transcript]);

  const displayValue = isListening
    ? content + (interimTranscript ? ` ${interimTranscript}` : '')
    : content;

  const handleVoiceToggle = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    const trimmedContent = content.trim();
    if (!trimmedContent) {
      setSubmitError('Please share how you are feeling before sending.');
      return;
    }

    const feelings = selectedMood || 'general';

    try {
      await addCheckInMutation.mutateAsync({ feelings, content: trimmedContent });
      setContent('');
      setSelectedMood('');
      if (onCheckInAdded) onCheckInAdded();
      setTimeout(() => textareaRef.current?.focus(), 100);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Something went wrong. Please try again.';
      setSubmitError(message);
    }
  };

  const isSubmitting = addCheckInMutation.isPending;
  const canSubmit = content.trim().length > 0 && !isSubmitting;

  return (
    <form onSubmit={handleSubmit} className="p-3 border-t border-border bg-background/95 backdrop-blur-sm">
      {/* Mood selector */}
      <div className="flex gap-1.5 mb-2 flex-wrap">
        {MOOD_OPTIONS.map((mood) => (
          <button
            key={mood.value}
            type="button"
            onClick={() => setSelectedMood(selectedMood === mood.value ? '' : mood.value)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium transition-all border ${
              selectedMood === mood.value
                ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                : 'bg-background text-foreground/70 border-border hover:border-primary/50 hover:text-foreground'
            }`}
          >
            <span>{mood.emoji}</span>
            <span>{mood.label}</span>
          </button>
        ))}
      </div>

      {/* Voice recording indicator */}
      {isListening && <VoiceRecordingIndicator isRecording={isListening} />}

      {/* Text input row */}
      <div className="flex gap-2 items-end">
        <div className="flex-1 relative">
          <Textarea
            ref={textareaRef}
            value={displayValue}
            onChange={(e) => {
              if (!isListening) setContent(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                if (canSubmit) {
                  handleSubmit(e as unknown as React.FormEvent);
                }
              }
            }}
            placeholder="Share how you're feeling today..."
            className="resize-none min-h-[60px] max-h-[120px] text-sm"
            rows={2}
            disabled={isSubmitting}
          />
        </div>

        {/* Voice button */}
        {speechSupported && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={handleVoiceToggle}
            disabled={isSubmitting}
            className={`flex-shrink-0 ${isListening ? 'text-destructive border-destructive' : ''}`}
            title={isListening ? 'Stop recording' : 'Start voice input'}
          >
            {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>
        )}

        {/* Send button */}
        <Button
          type="submit"
          disabled={!canSubmit}
          className="flex-shrink-0 gap-1.5"
          title="Send message"
        >
          {isSubmitting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
          <span className="hidden sm:inline">{isSubmitting ? 'Sending...' : 'Send'}</span>
        </Button>
      </div>

      {/* Error message */}
      {submitError && (
        <p className="mt-2 text-xs text-destructive">{submitError}</p>
      )}
    </form>
  );
}
