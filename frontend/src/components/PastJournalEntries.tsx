import React, { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface EntryItem {
  id: string;
  methodType: string;
  content: string;
  moodTag?: string;
  timestamp: string | bigint;
}

interface PastJournalEntriesProps {
  entries: EntryItem[];
}

const METHOD_LABELS: Record<string, string> = {
  gratitude: '🙏 Gratitude',
  reflective: '🪞 Reflective',
  stream: '🌊 Stream of Consciousness',
  mood: '💛 Mood & Emotion',
  intentions: '🎯 Intentions & Goals',
};

function formatTimestamp(ts: string | bigint): string {
  try {
    let date: Date;
    if (typeof ts === 'bigint') {
      // nanoseconds to ms
      date = new Date(Number(ts / BigInt(1_000_000)));
    } else {
      date = new Date(ts);
    }
    return date.toLocaleDateString(undefined, {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  } catch {
    return '';
  }
}

export default function PastJournalEntries({ entries }: PastJournalEntriesProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (entries.length === 0) {
    return (
      <div className="text-center py-10 text-muted-foreground">
        <BookOpen className="w-10 h-10 mx-auto mb-3 opacity-30" />
        <p className="text-sm">No journal entries yet. Start writing above!</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {entries.map((entry) => {
        const isExpanded = expandedId === entry.id;
        const preview = entry.content.length > 120 ? entry.content.slice(0, 120) + '…' : entry.content;
        const label = METHOD_LABELS[entry.methodType] ?? entry.methodType;

        return (
          <button
            key={entry.id}
            onClick={() => setExpandedId(isExpanded ? null : entry.id)}
            className="w-full text-left bg-card border border-border rounded-2xl p-4 hover:border-primary/40 transition-all duration-200 group"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <Badge variant="secondary" className="text-xs font-medium shrink-0">
                    {label}
                  </Badge>
                  {entry.moodTag && (
                    <Badge variant="outline" className="text-xs shrink-0">
                      {entry.moodTag}
                    </Badge>
                  )}
                  <span className="text-xs text-muted-foreground ml-auto shrink-0">
                    {formatTimestamp(entry.timestamp)}
                  </span>
                </div>
                <p className="text-sm text-foreground/80 leading-relaxed whitespace-pre-wrap">
                  {isExpanded ? entry.content : preview}
                </p>
              </div>
              <div className="shrink-0 text-muted-foreground group-hover:text-primary transition-colors mt-1">
                {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
}
