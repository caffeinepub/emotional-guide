import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import { useGuestCheckIns } from './useGuestCheckIns';
import type { CheckInWithResponse, SupportiveResponse } from '../backend';

// Type for storing check-ins with their responses
export interface CheckInWithResponseData {
  checkIn: {
    timestamp: bigint;
    feelings: string;
    content: string;
  };
  response: SupportiveResponse;
}

export function useGetAllCheckInsWithResponses(isGuest: boolean = false) {
  const { actor, isFetching: actorFetching } = useActor();
  const guestHook = useGuestCheckIns();

  const backendQuery = useQuery<CheckInWithResponseData[]>({
    queryKey: ['checkInsWithResponses'],
    queryFn: async () => {
      console.log('[useGetAllCheckInsWithResponses] Starting query, actor available:', !!actor);
      if (!actor) {
        console.warn('[useGetAllCheckInsWithResponses] Actor not available, returning empty array');
        return [];
      }
      
      try {
        // Backend only returns check-ins, not responses
        // We need to get stored responses from cache or generate fallback
        console.log('[useGetAllCheckInsWithResponses] Calling actor.getAllCheckIns()');
        const checkIns = await actor.getAllCheckIns();
        console.log('[useGetAllCheckInsWithResponses] Received check-ins:', checkIns.length);
        
        const result = checkIns.map(checkIn => {
          const response = generateFallbackResponse(checkIn.feelings);
          console.log('[useGetAllCheckInsWithResponses] Generated fallback for feeling:', checkIn.feelings);
          return {
            checkIn,
            response
          };
        });
        
        console.log('[useGetAllCheckInsWithResponses] Returning', result.length, 'check-ins with responses');
        return result;
      } catch (error) {
        console.error('[useGetAllCheckInsWithResponses] Error fetching check-ins:', error);
        if (error instanceof Error) {
          console.error('[useGetAllCheckInsWithResponses] Error message:', error.message);
          console.error('[useGetAllCheckInsWithResponses] Error stack:', error.stack);
        }
        throw error;
      }
    },
    enabled: !isGuest && !!actor && !actorFetching,
  });

  if (isGuest) {
    console.log('[useGetAllCheckInsWithResponses] Guest mode, returning guest check-ins:', guestHook.checkInsWithResponses.length);
    return {
      data: guestHook.checkInsWithResponses,
      isLoading: guestHook.isLoading,
      error: null,
      refetch: () => Promise.resolve({ data: guestHook.checkInsWithResponses }),
    };
  }

  console.log('[useGetAllCheckInsWithResponses] Backend query state - loading:', backendQuery.isLoading, 'error:', !!backendQuery.error, 'data count:', backendQuery.data?.length || 0);
  return backendQuery;
}

export function useAddCheckIn(isGuest: boolean = false) {
  const { actor } = useActor();
  const queryClient = useQueryClient();
  const guestHook = useGuestCheckIns();

  return useMutation({
    mutationFn: async ({ feelings, content }: { feelings: string; content: string }): Promise<CheckInWithResponseData> => {
      console.log('[useAddCheckIn] Starting mutation - isGuest:', isGuest, 'feelings:', feelings, 'content length:', content.length);
      console.log('[useAddCheckIn] Actor available:', !!actor);
      
      if (isGuest) {
        console.log('[useAddCheckIn] Guest mode - generating fallback response');
        const response = generateFallbackResponse(feelings);
        console.log('[useAddCheckIn] Guest fallback response generated:', {
          mainMessage: response.mainMessage.substring(0, 50) + '...',
          hasStory: !!response.relatableStory,
          optionsCount: response.actionOptions.length,
          hasFollowUp: !!response.followUpQuestion
        });
        const result = await guestHook.addCheckIn(feelings, content, response);
        console.log('[useAddCheckIn] Guest check-in added successfully');
        return result;
      }
      
      if (!actor) {
        console.error('[useAddCheckIn] Actor not available - cannot add check-in');
        throw new Error('Actor not available');
      }
      
      try {
        console.log('[useAddCheckIn] Calling actor.addCheckIn with feelings:', feelings);
        const startTime = Date.now();
        const result: CheckInWithResponse = await actor.addCheckIn(feelings, content);
        const endTime = Date.now();
        
        console.log('[useAddCheckIn] Backend response received in', endTime - startTime, 'ms');
        console.log('[useAddCheckIn] Raw backend response structure:', {
          hasCheckIn: !!result.checkIn,
          hasResponse: !!result.response,
          checkInTimestamp: result.checkIn?.timestamp,
          checkInFeelings: result.checkIn?.feelings,
          checkInContentLength: result.checkIn?.content?.length,
          responseMainMessage: result.response?.mainMessage?.substring(0, 50) + '...',
          responseRelatableStory: result.response?.relatableStory?.substring(0, 50) + '...',
          responseActionOptionsCount: result.response?.actionOptions?.length,
          responseFollowUpQuestion: result.response?.followUpQuestion?.substring(0, 50) + '...'
        });
        
        const transformedData = {
          checkIn: result.checkIn,
          response: result.response
        };
        
        console.log('[useAddCheckIn] Transformed data structure:', {
          checkInTimestamp: transformedData.checkIn.timestamp,
          checkInFeelings: transformedData.checkIn.feelings,
          responseFields: Object.keys(transformedData.response)
        });
        
        return transformedData;
      } catch (error) {
        console.error('[useAddCheckIn] Backend addCheckIn error:', error);
        if (error instanceof Error) {
          console.error('[useAddCheckIn] Error type:', error.constructor.name);
          console.error('[useAddCheckIn] Error message:', error.message);
          console.error('[useAddCheckIn] Error stack:', error.stack);
        }
        console.error('[useAddCheckIn] Full error object:', JSON.stringify(error, null, 2));
        throw error;
      }
    },
    onSuccess: (data) => {
      console.log('[useAddCheckIn] Mutation onSuccess - Check-in added successfully');
      console.log('[useAddCheckIn] Success data:', {
        timestamp: data.checkIn.timestamp,
        feelings: data.checkIn.feelings,
        hasResponse: !!data.response,
        responseMainMessage: data.response.mainMessage.substring(0, 50) + '...'
      });
      
      if (!isGuest) {
        console.log('[useAddCheckIn] Invalidating checkInsWithResponses query');
        // Invalidate to refetch all check-ins
        queryClient.invalidateQueries({ queryKey: ['checkInsWithResponses'] });
        
        // Optimistically add the new check-in with response to cache
        console.log('[useAddCheckIn] Optimistically updating cache');
        queryClient.setQueryData<CheckInWithResponseData[]>(
          ['checkInsWithResponses'],
          (old = []) => {
            console.log('[useAddCheckIn] Old cache data count:', old.length);
            const newData = [...old, data];
            console.log('[useAddCheckIn] New cache data count:', newData.length);
            return newData;
          }
        );
      }
    },
    onError: (error) => {
      console.error('[useAddCheckIn] Mutation onError - Error details:', error);
      if (error instanceof Error) {
        console.error('[useAddCheckIn] Error name:', error.name);
        console.error('[useAddCheckIn] Error message:', error.message);
        console.error('[useAddCheckIn] Error stack:', error.stack);
      }
      console.error('[useAddCheckIn] Error type:', typeof error);
      console.error('[useAddCheckIn] Error constructor:', error?.constructor?.name);
    }
  });
}

// Helper function to generate fallback responses
function generateFallbackResponse(feelings: string): SupportiveResponse {
  console.log('[generateFallbackResponse] Generating fallback for feeling:', feelings);
  
  const fallbackResponses: Record<string, SupportiveResponse> = {
    sad: {
      mainMessage: "It's okay to feel sad sometimes. You're not alone and things can get better. Remember, emotions are valid and healing takes time.",
      relatableStory: "I've heard from many people who've felt this way. One person shared how they started journaling their feelings and found it helped them process their sadness. They discovered that acknowledging their emotions, rather than pushing them away, was the first step toward healing.",
      actionOptions: ["Take a gentle walk outside", "Write down your thoughts", "Reach out to someone you trust"],
      followUpQuestion: "Would you like to talk more about what's making you feel this way?"
    },
    anxious: {
      mainMessage: "Take a deep breath. Anxiety is normal, but you have the strength to overcome it. Quick grounding exercise: Name five things you can see, four you can touch, three you can hear, two you can smell, and one you can taste.",
      relatableStory: "Someone once told me they felt like their anxiety was controlling their life. They started practicing deep breathing exercises and found that even just 5 minutes a day made a difference. You're not alone in feeling this way.",
      actionOptions: ["Try the 4-7-8 breathing technique", "Write down what's worrying you", "Listen to calming music"],
      followUpQuestion: "Is there anything specific that's triggering your anxiety right now?"
    },
    happy: {
      mainMessage: "That's wonderful! Embrace your joy and let it inspire others. Take a moment to reflect on what made you happy today.",
      relatableStory: "I love hearing about moments of happiness! Someone recently shared how they started keeping a 'joy journal' to remember these precious moments. They said it helps them during tougher times to look back and remember that happiness is always possible.",
      actionOptions: ["Share your happiness with someone", "Write down what made you happy", "Do something kind for someone else"],
      followUpQuestion: "What brought this happiness into your life today?"
    },
    angry: {
      mainMessage: "Anger is a valid emotion. Find healthy ways to release it, and remember, it's okay to take a break and gather your thoughts.",
      relatableStory: "I've heard from people who struggled with anger and found that physical activity really helped. One person started going for runs when they felt angry, and it gave them space to process their feelings. Your anger is telling you something important.",
      actionOptions: ["Try some physical exercise", "Practice progressive muscle relaxation", "Express your feelings through art or writing"],
      followUpQuestion: "Would it help to talk about what's making you feel angry?"
    },
    excited: {
      mainMessage: "That's amazing! Your excitement is contagious. Enjoy this wonderful feeling!",
      relatableStory: "Excitement is such a beautiful emotion! Someone once told me they were so excited about a new opportunity that they couldn't sleep. They channeled that energy into planning and preparing, which made the experience even better.",
      actionOptions: ["Share your excitement with loved ones", "Channel this energy into something creative", "Write down your thoughts and plans"],
      followUpQuestion: "What's got you feeling so excited? I'd love to hear more!"
    },
    tired: {
      mainMessage: "Rest is important. Take care of yourself and recharge when you need to.",
      relatableStory: "Many people push through tiredness, but I've heard from those who learned to listen to their bodies. One person realized that taking short breaks throughout the day actually made them more productive and less exhausted overall.",
      actionOptions: ["Take a short nap if possible", "Practice gentle stretching", "Reduce screen time before bed"],
      followUpQuestion: "Have you been getting enough rest lately? What's been keeping you busy?"
    },
    confused: {
      mainMessage: "It's okay to feel uncertain. Take your time to process your thoughts.",
      relatableStory: "Confusion can feel overwhelming, but someone once shared that they found clarity by breaking down their thoughts into smaller pieces. They wrote everything down and slowly things started making more sense.",
      actionOptions: ["Write down what's confusing you", "Talk it through with someone", "Take a break and come back to it later"],
      followUpQuestion: "What's been on your mind? Sometimes talking helps clarify things."
    },
    grateful: {
      mainMessage: "Gratitude is a beautiful feeling. Cherish these moments of appreciation.",
      relatableStory: "I've heard from people who practice daily gratitude and how it transformed their outlook on life. One person said that even on difficult days, finding one thing to be grateful for helped shift their perspective.",
      actionOptions: ["Write a thank you note", "Share your gratitude with someone", "Start a gratitude journal"],
      followUpQuestion: "What are you feeling grateful for today?"
    },
    overwhelmed: {
      mainMessage: "When things feel like too much, remember to take it one step at a time.",
      relatableStory: "Someone once told me they felt like they were drowning in responsibilities. They learned to prioritize and tackle one thing at a time, which made everything feel more manageable. You don't have to do everything at once.",
      actionOptions: ["Make a list and prioritize", "Delegate or ask for help", "Take a 10-minute break to breathe"],
      followUpQuestion: "What's feeling most overwhelming right now? Let's break it down together."
    },
    peaceful: {
      mainMessage: "What a lovely state of mind. Savor this peaceful moment.",
      relatableStory: "Peace is precious. Someone shared with me how they learned to recognize and appreciate these moments, even taking photos or writing notes to remember them. These peaceful moments can be anchors during busier times.",
      actionOptions: ["Practice mindfulness meditation", "Spend time in nature", "Journal about this feeling"],
      followUpQuestion: "What helped you find this peace? I'd love to know more."
    },
    lonely: {
      mainMessage: "Feeling lonely is tough, but remember, there are people who care about you. Reach out to a friend or try joining a local group or club.",
      relatableStory: "Many people have experienced loneliness. One person shared how they joined a book club and found not just friends, but a sense of belonging. Taking that first step to connect can make all the difference.",
      actionOptions: ["Call a friend or family member", "Join an online community with shared interests", "Volunteer for a cause you care about"],
      followUpQuestion: "Is there someone you've been meaning to reach out to?"
    },
    stressed: {
      mainMessage: "Stress can be overwhelming, but you're strong. Try breaking tasks into smaller steps and celebrate each accomplishment, no matter how small.",
      relatableStory: "I've heard from people who felt crushed by stress. One person learned to use the Pomodoro technique - working in focused 25-minute bursts with breaks. It helped them feel more in control and less overwhelmed.",
      actionOptions: ["Take short breaks throughout the day", "Prioritize self-care activities", "Practice deep breathing exercises"],
      followUpQuestion: "What's the biggest source of stress for you right now?"
    }
  };
  
  const feeling = feelings.toLowerCase();
  const response = fallbackResponses[feeling] || {
    mainMessage: "Thank you for sharing your feelings with me. Whatever you're experiencing is valid and important.",
    relatableStory: "Everyone's emotional journey is unique, but you're not alone. I've heard from many people who've felt similar things, and they found that simply acknowledging their feelings was a powerful first step.",
    actionOptions: ["Take some time for self-reflection", "Reach out to someone you trust", "Practice self-compassion"],
    followUpQuestion: "Is there anything else you'd like to talk about or explore together?"
  };
  
  console.log('[generateFallbackResponse] Generated response for', feeling, '- has all fields:', {
    hasMainMessage: !!response.mainMessage,
    hasStory: !!response.relatableStory,
    optionsCount: response.actionOptions.length,
    hasFollowUp: !!response.followUpQuestion
  });
  
  return response;
}
