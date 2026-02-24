import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { JournalEntry } from '../backend';

export type { JournalEntry };

export function useGetJournalEntries() {
  const { actor, isFetching: actorFetching } = useActor();

  return useQuery<JournalEntry[]>({
    queryKey: ['journalEntries'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getJournalEntries();
    },
    enabled: !!actor && !actorFetching,
  });
}

export function useSaveJournalEntry() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      methodType,
      content,
      moodTag,
    }: {
      methodType: string;
      content: string;
      moodTag?: string;
    }) => {
      if (!actor) throw new Error('Actor not available');
      await actor.saveJournalEntry(methodType, content, moodTag ?? null);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['journalEntries'] });
    },
  });
}
