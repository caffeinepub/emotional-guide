import { Mic } from 'lucide-react';

interface VoiceRecordingIndicatorProps {
  isRecording: boolean;
}

export default function VoiceRecordingIndicator({ isRecording }: VoiceRecordingIndicatorProps) {
  if (!isRecording) return null;

  return (
    <div className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-2xl border border-primary/20 animate-in fade-in slide-in-from-top-2 duration-300">
      <div className="relative">
        <Mic className="h-5 w-5 text-primary" />
        <div className="absolute inset-0 animate-ping">
          <Mic className="h-5 w-5 text-primary opacity-75" />
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-sm font-medium text-foreground">Listening...</span>
        <span className="text-xs text-muted-foreground">Speak now</span>
      </div>
      <div className="flex gap-1 ml-auto">
        <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
        <div className="w-1 h-6 bg-primary rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
        <div className="w-1 h-4 bg-primary rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
      </div>
    </div>
  );
}
