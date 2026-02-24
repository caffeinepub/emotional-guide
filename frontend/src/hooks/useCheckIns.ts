import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useGuestCheckIns } from './useGuestCheckIns';
import type { CheckInWithResponse, EmotionalCheckIn, SupportiveResponse } from '../backend';

export const CHECKINS_QUERY_KEY = ['checkInsWithResponses'];

function buildFallbackResponse(feelings: string): SupportiveResponse {
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

export function useGetAllCheckInsWithResponses(isGuest: boolean) {
  const { actor, isFetching: actorFetching } = useActor();
  const guestHook = useGuestCheckIns();

  const authQuery = useQuery<CheckInWithResponse[]>({
    queryKey: CHECKINS_QUERY_KEY,
    queryFn: async () => {
      if (!actor) return [];
      const checkIns: EmotionalCheckIn[] = await actor.getAllCheckIns();
      return checkIns.map((checkIn) => ({
        checkIn,
        response: buildFallbackResponse(checkIn.feelings),
      }));
    },
    enabled: !isGuest && !!actor && !actorFetching,
  });

  if (isGuest) {
    return {
      data: guestHook.checkInsWithResponses,
      isLoading: false,
      isError: false,
      error: null,
    };
  }

  return authQuery;
}

export function useAddCheckIn(isGuest: boolean) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const guestHook = useGuestCheckIns();

  return useMutation<CheckInWithResponse, Error, { feelings: string; content: string }>({
    mutationFn: async ({ feelings, content }) => {
      if (isGuest) {
        // For guests: use local storage-based check-in
        return guestHook.addCheckIn(feelings, content);
      }
      if (!actor) throw new Error('Not connected to backend');
      const result = await actor.addCheckIn(feelings, content);
      return result;
    },
    onSuccess: (newCheckInWithResponse, { feelings: _f, content: _c }) => {
      if (isGuest) {
        // Guest data is already updated in localStorage and state via guestHook.addCheckIn
        // Also update the React Query cache so ConversationHistory re-renders immediately
        queryClient.setQueryData<CheckInWithResponse[]>(
          ['guestCheckIns'],
          (old) => {
            const existing = old ?? [];
            return [...existing, newCheckInWithResponse];
          }
        );
      } else {
        // For authenticated users: append to cache immediately, then invalidate to sync with backend
        queryClient.setQueryData<CheckInWithResponse[]>(CHECKINS_QUERY_KEY, (old) => {
          const existing = old ?? [];
          return [...existing, newCheckInWithResponse];
        });
      }
    },
  });
}
