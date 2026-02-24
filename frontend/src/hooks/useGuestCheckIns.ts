import { useState, useEffect, useCallback } from 'react';
import type { CheckInWithResponse, SupportiveResponse } from '../backend';

const STORAGE_KEY = 'ana_guest_checkins_v2';
const GUEST_CHECKINS_EVENT = 'ana_guest_checkins_updated';

function buildGuestResponse(feelings: string): SupportiveResponse {
  const mainMessage = (() => {
    switch (feelings) {
      case 'sad':
        return "It's okay to feel sad sometimes. You're not alone and things can get better. Remember, emotions are valid and healing takes time.";
      case 'anxious':
        return "Take a deep breath. Anxiety is normal, but you have the strength to overcome it. Quick grounding exercise: Name five things you can see, four you can touch, three you can hear, two you can smell, and one you can taste.";
      case 'happy':
        return "That's wonderful! Embrace your joy and let it inspire others. Take a moment to reflect on what made you happy today.";
      case 'angry':
        return "Anger is a valid emotion. Find healthy ways to release it, and remember, it's okay to take a break and gather your thoughts.";
      case 'lonely':
        return "Feeling lonely is tough, but remember, there are people who care about you. Reach out to a friend or try joining a local group or club.";
      case 'stressed':
        return "Stress can be overwhelming, but you're strong. Try breaking tasks into smaller steps and celebrate each accomplishment, no matter how small.";
      case 'grateful':
        return "Gratitude is powerful. Consider starting a gratitude journal to capture all the positive moments in your life.";
      default:
        return "Whatever you're feeling is valid. Thank you for sharing with me. Remember, your emotions are important and it's okay to seek support.";
    }
  })();

  const actionOptions = (() => {
    switch (feelings) {
      case 'sad':
        return ['Take a walk in nature', 'Talk to a friend or loved one', 'Practice mindfulness meditation'];
      case 'anxious':
        return ['Deep breathing exercises', 'Write your thoughts in a journal', 'Listen to calming music'];
      case 'happy':
        return ['Share your positivity with someone', 'Express gratitude for three things in your life'];
      case 'angry':
        return ['Engage in physical activity', 'Try calming techniques like yoga or meditation'];
      case 'lonely':
        return ['Call a friend or family member', 'Join an online community with shared interests'];
      case 'stressed':
        return ['Take short breaks throughout the day', 'Prioritize self-care activities'];
      default:
        return ['Reach out for support', 'Explore self-care practices tailored to your needs'];
    }
  })();

  return {
    mainMessage,
    relatableStory: 'Many people have faced similar feelings and found ways to cope. You are not alone in this journey.',
    actionOptions,
    followUpQuestion: "Is there anything else you'd like to talk about or explore together? Your well-being matters, and I'm here to support you.",
  };
}

function loadFromStorage(): CheckInWithResponse[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as CheckInWithResponse[];
  } catch {
    return [];
  }
}

function saveToStorage(items: CheckInWithResponse[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    window.dispatchEvent(new CustomEvent(GUEST_CHECKINS_EVENT));
  } catch {
    // ignore storage errors
  }
}

export function useGuestCheckIns() {
  const [checkInsWithResponses, setCheckInsWithResponses] = useState<CheckInWithResponse[]>(loadFromStorage);

  useEffect(() => {
    const handler = () => {
      setCheckInsWithResponses(loadFromStorage());
    };
    window.addEventListener(GUEST_CHECKINS_EVENT, handler);
    return () => window.removeEventListener(GUEST_CHECKINS_EVENT, handler);
  }, []);

  const addCheckIn = useCallback((feelings: string, content: string): CheckInWithResponse => {
    const newCheckIn: CheckInWithResponse = {
      checkIn: {
        timestamp: BigInt(Date.now()) * BigInt(1_000_000),
        feelings,
        content,
      },
      response: buildGuestResponse(feelings),
    };

    const current = loadFromStorage();
    const updated = [...current, newCheckIn];
    saveToStorage(updated);
    setCheckInsWithResponses(updated);
    return newCheckIn;
  }, []);

  return { checkInsWithResponses, addCheckIn };
}
