import React, { useState, useRef, useCallback } from 'react';
import { ArrowLeft, Music, Play, Pause, ChevronRight, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { moodMusicTracks, moodCategories, type MusicTrack } from '../utils/moodResourceLinks';

interface MusicPageProps {
  onBack: () => void;
}

export default function MusicPage({ onBack }: MusicPageProps) {
  const [selectedMood, setSelectedMood] = useState<string>('happy');
  const [currentTrack, setCurrentTrack] = useState<MusicTrack | null>(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const tracks = moodMusicTracks[selectedMood] || moodMusicTracks.happy;
  const currentMoodInfo = moodCategories.find(m => m.id === selectedMood);

  const handleTrackSelect = useCallback((track: MusicTrack) => {
    setCurrentTrack(track);
    setIsPlayerOpen(true);
  }, []);

  const handleClosePlayer = useCallback(() => {
    setIsPlayerOpen(false);
    setCurrentTrack(null);
  }, []);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    // Close player when switching moods
    if (isPlayerOpen) {
      setIsPlayerOpen(false);
      setCurrentTrack(null);
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      {/* Soft background */}
      <div className="ana-room-background" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/50 px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="rounded-full shrink-0"
            aria-label="Back to chat"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Music className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">Music for Your Mood</h1>
          </div>
          <Badge variant="secondary" className="ml-auto text-xs hidden sm:flex">
            {currentMoodInfo?.emoji} {currentMoodInfo?.label}
          </Badge>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto pb-40">
          {/* Hero section */}
          <div className="px-4 pt-6 pb-4 max-w-3xl mx-auto w-full">
            <p className="text-muted-foreground text-sm mb-5">
              Choose how you're feeling and discover music that resonates with your mood.
            </p>

            {/* Mood selector */}
            <section className="mb-6">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                How are you feeling?
              </h2>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {moodCategories.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => handleMoodSelect(mood.id)}
                    className={`
                      flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border transition-all duration-200
                      ${selectedMood === mood.id
                        ? `bg-gradient-to-br ${mood.color} ${mood.borderColor} border-2 scale-105 shadow-warm-md`
                        : 'border-border/40 bg-card/60 hover:bg-card hover:border-border hover:scale-102'
                      }
                    `}
                    aria-pressed={selectedMood === mood.id}
                  >
                    <span className="text-xl leading-none">{mood.emoji}</span>
                    <span className="text-xs font-medium text-foreground leading-none">{mood.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Track list */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  {currentMoodInfo?.emoji} {currentMoodInfo?.label} Playlist
                </h2>
                <span className="text-xs text-muted-foreground">{tracks.length} tracks</span>
              </div>

              <div className="space-y-2">
                {tracks.map((track, index) => (
                  <TrackCard
                    key={`${track.title}-${index}`}
                    track={track}
                    index={index}
                    isPlaying={currentTrack?.embedUrl === track.embedUrl && isPlayerOpen}
                    onSelect={handleTrackSelect}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Inline Player — fixed at bottom */}
        {isPlayerOpen && currentTrack && (
          <div className="fixed bottom-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-xl border-t border-border/60 shadow-warm-2xl">
            {/* Track info bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                <Music className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{currentTrack.title}</p>
                <p className="text-xs text-muted-foreground truncate">{currentTrack.artist} · {currentTrack.genre}</p>
              </div>
              <Badge variant="outline" className="text-xs shrink-0 hidden sm:flex">
                {currentMoodInfo?.emoji} {currentMoodInfo?.label}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClosePlayer}
                className="rounded-full shrink-0 h-8 w-8"
                aria-label="Close player"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* YouTube embed */}
            <div className="w-full aspect-video max-h-[280px] sm:max-h-[320px] bg-black">
              <iframe
                ref={iframeRef}
                key={currentTrack.embedUrl}
                src={`${currentTrack.embedUrl}?autoplay=1&rel=0&modestbranding=1`}
                title={`${currentTrack.title} by ${currentTrack.artist}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- TrackCard sub-component ---

interface TrackCardProps {
  track: MusicTrack;
  index: number;
  isPlaying: boolean;
  onSelect: (track: MusicTrack) => void;
}

function TrackCard({ track, index, isPlaying, onSelect }: TrackCardProps) {
  return (
    <button
      onClick={() => onSelect(track)}
      className={`
        w-full flex items-center gap-3 p-3 rounded-2xl border transition-all duration-200 text-left
        ${isPlaying
          ? 'bg-primary/10 border-primary/40 shadow-warm-md'
          : 'bg-card/70 border-border/40 hover:bg-card hover:border-border/70 hover:shadow-warm'
        }
      `}
      aria-label={`Play ${track.title} by ${track.artist}`}
    >
      {/* Track number / play indicator */}
      <div className={`
        w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200
        ${isPlaying ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
      `}>
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <span className="text-xs font-bold">{String(index + 1).padStart(2, '0')}</span>
        )}
      </div>

      {/* Track info */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold truncate ${isPlaying ? 'text-primary' : 'text-foreground'}`}>
          {track.title}
        </p>
        <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
      </div>

      {/* Genre badge */}
      <Badge
        variant="secondary"
        className="text-xs shrink-0 hidden sm:flex"
      >
        {track.genre}
      </Badge>

      {/* Play icon */}
      <div className={`shrink-0 transition-all duration-200 ${isPlaying ? 'text-primary' : 'text-muted-foreground'}`}>
        {isPlaying ? (
          <Pause className="w-4 h-4" />
        ) : (
          <Play className="w-4 h-4" />
        )}
      </div>
    </button>
  );
}
