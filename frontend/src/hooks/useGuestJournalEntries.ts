import { useState, useEffect } from 'react';

const GUEST_JOURNAL_KEY = 'ana-guest-journal-entries';

export interface GuestJournalEntry {
  id: string;
  methodType: string;
  content: string;
  moodTag?: string;
  timestamp: string; // ISO string
}

export function useGuestJournalEntries() {
  const [entries, setEntries] = useState<GuestJournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(GUEST_JOURNAL_KEY);
      if (stored) {
        setEntries(JSON.parse(stored));
      }
    } catch {
      // ignore parse errors
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addEntry = (methodType: string, content: string, moodTag?: string): GuestJournalEntry => {
    const newEntry: GuestJournalEntry = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      methodType,
      content,
      moodTag,
      timestamp: new Date().toISOString(),
    };
    const updated = [newEntry, ...entries];
    setEntries(updated);
    try {
      localStorage.setItem(GUEST_JOURNAL_KEY, JSON.stringify(updated));
    } catch {
      // ignore storage errors
    }
    return newEntry;
  };

  return { entries, isLoading, addEntry };
}
