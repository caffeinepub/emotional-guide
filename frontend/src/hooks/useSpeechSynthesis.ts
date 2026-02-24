import { useState, useCallback, useEffect } from 'react';

export function useSpeechSynthesis() {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isSupported, setIsSupported] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);

  useEffect(() => {
    console.log('[useSpeechSynthesis] Hook initialized');
    
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      console.log('[useSpeechSynthesis] Speech synthesis API is supported');
      setIsSupported(true);

      // Load voices
      const loadVoices = () => {
        const availableVoices = window.speechSynthesis.getVoices();
        console.log('[useSpeechSynthesis] Voices loaded:', {
          count: availableVoices.length,
          voices: availableVoices.map(v => ({ name: v.name, lang: v.lang, default: v.default })),
        });
        setVoices(availableVoices);
      };

      // Load voices immediately
      loadVoices();

      // Some browsers load voices asynchronously
      if (window.speechSynthesis.onvoiceschanged !== undefined) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
      }

      // Cleanup
      return () => {
        console.log('[useSpeechSynthesis] Cleaning up - cancelling any ongoing speech');
        window.speechSynthesis.cancel();
      };
    } else {
      console.error('[useSpeechSynthesis] Speech synthesis API is NOT supported in this browser');
      setIsSupported(false);
    }
  }, []);

  const speak = useCallback((text: string) => {
    console.log('[useSpeechSynthesis] speak() called with text:', {
      textLength: text.length,
      textPreview: text.substring(0, 100),
      timestamp: new Date().toISOString(),
    });

    if (!isSupported) {
      console.error('[useSpeechSynthesis] Cannot speak - API not supported');
      return;
    }

    if (!text || text.trim().length === 0) {
      console.warn('[useSpeechSynthesis] Cannot speak - empty text provided');
      return;
    }

    try {
      // Cancel any ongoing speech
      console.log('[useSpeechSynthesis] Cancelling any ongoing speech');
      window.speechSynthesis.cancel();

      console.log('[useSpeechSynthesis] Creating new SpeechSynthesisUtterance');
      const utterance = new SpeechSynthesisUtterance(text);

      // Select a voice (prefer English voices)
      const englishVoice = voices.find(voice => voice.lang.startsWith('en'));
      if (englishVoice) {
        console.log('[useSpeechSynthesis] Using English voice:', englishVoice.name);
        utterance.voice = englishVoice;
      } else if (voices.length > 0) {
        console.log('[useSpeechSynthesis] Using default voice:', voices[0].name);
        utterance.voice = voices[0];
      } else {
        console.warn('[useSpeechSynthesis] No voices available, using browser default');
      }

      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      console.log('[useSpeechSynthesis] Utterance settings:', {
        rate: utterance.rate,
        pitch: utterance.pitch,
        volume: utterance.volume,
        voice: utterance.voice?.name,
      });

      utterance.onstart = () => {
        console.log('[useSpeechSynthesis] Speech started');
        setIsSpeaking(true);
      };

      utterance.onend = () => {
        console.log('[useSpeechSynthesis] Speech ended');
        setIsSpeaking(false);
      };

      utterance.onerror = (event) => {
        console.error('[useSpeechSynthesis] Speech error:', {
          error: event.error,
          type: event.type,
          timestamp: new Date().toISOString(),
        });
        setIsSpeaking(false);
      };

      utterance.onpause = () => {
        console.log('[useSpeechSynthesis] Speech paused');
      };

      utterance.onresume = () => {
        console.log('[useSpeechSynthesis] Speech resumed');
      };

      console.log('[useSpeechSynthesis] Calling speechSynthesis.speak()');
      window.speechSynthesis.speak(utterance);
      console.log('[useSpeechSynthesis] speechSynthesis.speak() called successfully');

      // Log the current state of speechSynthesis
      console.log('[useSpeechSynthesis] Current speechSynthesis state:', {
        speaking: window.speechSynthesis.speaking,
        pending: window.speechSynthesis.pending,
        paused: window.speechSynthesis.paused,
      });
    } catch (error) {
      console.error('[useSpeechSynthesis] Exception in speak():', error);
      if (error instanceof Error) {
        console.error('[useSpeechSynthesis] Error details:', {
          name: error.name,
          message: error.message,
          stack: error.stack,
        });
      }
      setIsSpeaking(false);
    }
  }, [isSupported, voices]);

  const cancel = useCallback(() => {
    console.log('[useSpeechSynthesis] cancel() called');
    if (isSupported) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, [isSupported]);

  return {
    speak,
    cancel,
    isSpeaking,
    isSupported,
  };
}
