import { useEffect, useRef, useState } from 'react';

export function useBackgroundMusic(audioSrc: string, volume: number = 0.3) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Create audio element
    const audio = new Audio(audioSrc);
    audio.loop = true;
    audio.volume = volume;
    audioRef.current = audio;

    // Try to autoplay
    const playAudio = async () => {
      try {
        await audio.play();
        setIsPlaying(true);
        setError(null);
      } catch (err) {
        console.log('[useBackgroundMusic] Autoplay blocked by browser:', err);
        setError('Autoplay blocked. Click to play music.');
        setIsPlaying(false);
      }
    };

    playAudio();

    // Cleanup on unmount
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, [audioSrc, volume]);

  const togglePlay = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        await audioRef.current.play();
        setIsPlaying(true);
        setError(null);
      }
    } catch (err) {
      console.error('[useBackgroundMusic] Error toggling playback:', err);
      setError('Failed to play audio');
    }
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    const newMutedState = !isMuted;
    audioRef.current.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  return {
    isPlaying,
    isMuted,
    error,
    togglePlay,
    toggleMute,
  };
}
