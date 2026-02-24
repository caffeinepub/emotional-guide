import { Music, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

interface MusicControlProps {
  isPlaying: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  onTogglePlay: () => void;
}

export default function MusicControl({ isPlaying, isMuted, onToggleMute, onTogglePlay }: MusicControlProps) {
  return (
    <TooltipProvider>
      <div className="fixed bottom-6 right-6 z-50 flex gap-2">
        {!isPlaying && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onTogglePlay}
                size="icon"
                variant="secondary"
                className="h-12 w-12 rounded-full shadow-warm-lg bg-background/90 backdrop-blur-md border border-border/50 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                <Music className="h-5 w-5" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>Play background music</p>
            </TooltipContent>
          </Tooltip>
        )}
        
        {isPlaying && (
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={onToggleMute}
                size="icon"
                variant="secondary"
                className="h-12 w-12 rounded-full shadow-warm-lg bg-background/90 backdrop-blur-md border border-border/50 hover:bg-primary hover:text-primary-foreground transition-all"
              >
                {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left">
              <p>{isMuted ? 'Unmute music' : 'Mute music'}</p>
            </TooltipContent>
          </Tooltip>
        )}
      </div>
    </TooltipProvider>
  );
}
