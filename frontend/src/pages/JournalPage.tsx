import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Heart,
  Feather,
  Wind,
  Smile,
  Target,
  Save,
  Loader2,
  BookOpen,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetJournalEntries, useSaveJournalEntry } from '../hooks/useJournalEntries';
import { useGuestJournalEntries, type GuestJournalEntry } from '../hooks/useGuestJournalEntries';
import JournalingMethodCard from '../components/JournalingMethodCard';
import PastJournalEntries from '../components/PastJournalEntries';
import type { JournalEntry } from '../backend';

interface JournalPageProps {
  onBack: () => void;
  isGuest: boolean;
}

type MethodId = 'gratitude' | 'reflective' | 'stream' | 'mood' | 'intentions';

interface JournalingMethod {
  id: MethodId;
  icon: React.ReactNode;
  title: string;
  description: string;
}

const METHODS: JournalingMethod[] = [
  {
    id: 'gratitude',
    icon: <Heart className="w-5 h-5" />,
    title: 'Gratitude',
    description: "List what you're thankful for today",
  },
  {
    id: 'reflective',
    icon: <Feather className="w-5 h-5" />,
    title: 'Reflective',
    description: 'Guided prompts to process your day',
  },
  {
    id: 'stream',
    icon: <Wind className="w-5 h-5" />,
    title: 'Stream of Consciousness',
    description: 'Write freely without stopping',
  },
  {
    id: 'mood',
    icon: <Smile className="w-5 h-5" />,
    title: 'Mood & Emotion',
    description: 'Explore and name your feelings',
  },
  {
    id: 'intentions',
    icon: <Target className="w-5 h-5" />,
    title: 'Intentions & Goals',
    description: 'Set your focus and intentions',
  },
];

const MOOD_OPTIONS = [
  '😊 Happy', '😔 Sad', '😰 Anxious', '😤 Angry',
  '😌 Peaceful', '😩 Overwhelmed', '🥰 Grateful', '😐 Neutral',
];

const DRAFT_KEY_PREFIX = 'ana-journal-draft-';

function getDraftKey(method: MethodId) {
  return `${DRAFT_KEY_PREFIX}${method}`;
}

// --- Method-specific form components ---

function GratitudeForm({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const lines = value ? value.split('\n') : ['', '', ''];
  const ensured = [...lines];
  while (ensured.length < 3) ensured.push('');

  const handleLine = (idx: number, text: string) => {
    const updated = [...ensured];
    updated[idx] = text;
    onChange(updated.join('\n'));
  };

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground font-medium">
        Write 3-5 things you are grateful for today:
      </p>
      {[0, 1, 2, 3, 4].map((i) => (
        <div key={i} className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center shrink-0">
            {i + 1}
          </span>
          <input
            type="text"
            value={ensured[i] ?? ''}
            onChange={(e) => handleLine(i, e.target.value)}
            placeholder="I am grateful for..."
            className="flex-1 bg-background border border-border rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground/60"
          />
        </div>
      ))}
    </div>
  );
}

function ReflectiveForm({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const PROMPTS = [
    'What went well today?',
    'What challenged me?',
    'What did I learn?',
    'What would I do differently?',
  ];

  const sections = value ? value.split('\n---\n') : PROMPTS.map(() => '');
  const ensured = [...sections];
  while (ensured.length < PROMPTS.length) ensured.push('');

  const handleSection = (idx: number, text: string) => {
    const updated = [...ensured];
    updated[idx] = text;
    onChange(updated.join('\n---\n'));
  };

  return (
    <div className="space-y-4">
      {PROMPTS.map((prompt, i) => (
        <div key={i}>
          <label className="block text-sm font-medium text-foreground mb-1.5">{prompt}</label>
          <Textarea
            value={ensured[i] ?? ''}
            onChange={(e) => handleSection(i, e.target.value)}
            placeholder="Write your thoughts here..."
            className="min-h-[72px] resize-none rounded-xl text-sm"
          />
        </div>
      ))}
    </div>
  );
}

function StreamForm({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Write continuously for at least 5 minutes. Do not stop, do not edit — just let it flow.
      </p>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Start writing and don't stop... whatever comes to mind..."
        className="min-h-[200px] resize-none rounded-xl text-sm leading-relaxed"
      />
    </div>
  );
}

function MoodForm({
  value,
  onChange,
  moodTag,
  onMoodTag,
}: {
  value: string;
  onChange: (v: string) => void;
  moodTag: string;
  onMoodTag: (m: string) => void;
}) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-sm font-medium text-foreground mb-2">How are you feeling right now?</p>
        <div className="flex flex-wrap gap-2">
          {MOOD_OPTIONS.map((mood) => (
            <button
              key={mood}
              onClick={() => onMoodTag(moodTag === mood ? '' : mood)}
              className={`px-3 py-1.5 rounded-full text-sm border transition-all duration-150 ${
                moodTag === mood
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-background border-border hover:border-primary/50 text-foreground'
              }`}
            >
              {mood}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-foreground mb-1.5">
          Describe your emotional state in more detail:
        </label>
        <Textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="What does this feeling feel like in your body? What triggered it? How intense is it?"
          className="min-h-[140px] resize-none rounded-xl text-sm"
        />
      </div>
    </div>
  );
}

function IntentionsForm({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  const FIELDS = [
    { label: 'My main intention for today/this week:', placeholder: 'e.g. Be more present with the people I love' },
    { label: 'One small action I will take:', placeholder: 'e.g. Put my phone away during dinner' },
    { label: 'Something I want to let go of:', placeholder: 'e.g. Worrying about things outside my control' },
    { label: 'How I want to feel at the end of the day:', placeholder: 'e.g. Calm, accomplished, connected' },
  ];

  const sections = value ? value.split('\n---\n') : FIELDS.map(() => '');
  const ensured = [...sections];
  while (ensured.length < FIELDS.length) ensured.push('');

  const handleSection = (idx: number, text: string) => {
    const updated = [...ensured];
    updated[idx] = text;
    onChange(updated.join('\n---\n'));
  };

  return (
    <div className="space-y-4">
      {FIELDS.map((field, i) => (
        <div key={i}>
          <label className="block text-sm font-medium text-foreground mb-1.5">{field.label}</label>
          <Textarea
            value={ensured[i] ?? ''}
            onChange={(e) => handleSection(i, e.target.value)}
            placeholder={field.placeholder}
            className="min-h-[72px] resize-none rounded-xl text-sm"
          />
        </div>
      ))}
    </div>
  );
}

// --- Unified entry list item type ---

interface DisplayEntry {
  id: string;
  methodType: string;
  content: string;
  moodTag?: string;
  timestamp: string | bigint;
}

function toDisplayEntries(
  authEntries: JournalEntry[] | undefined,
  guestEntries: GuestJournalEntry[],
  isGuest: boolean
): DisplayEntry[] {
  if (isGuest) {
    return [...guestEntries].sort(
      (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }
  if (!authEntries) return [];
  return [...authEntries]
    .sort((a, b) => {
      const ta = Number(a.timestamp);
      const tb = Number(b.timestamp);
      return tb - ta;
    })
    .map((e) => ({
      id: `${e.timestamp}-${e.methodType}`,
      methodType: e.methodType,
      content: e.content,
      moodTag: e.moodTag,
      timestamp: e.timestamp,
    }));
}

// --- Main JournalPage ---

export default function JournalPage({ onBack, isGuest }: JournalPageProps) {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity && !isGuest;

  const [selectedMethod, setSelectedMethod] = useState<MethodId>('gratitude');
  const [drafts, setDrafts] = useState<Record<MethodId, string>>({
    gratitude: '',
    reflective: '',
    stream: '',
    mood: '',
    intentions: '',
  });
  const [moodTag, setMoodTag] = useState('');

  // Load drafts from localStorage on mount
  useEffect(() => {
    const loaded: Record<MethodId, string> = {
      gratitude: '',
      reflective: '',
      stream: '',
      mood: '',
      intentions: '',
    };
    (['gratitude', 'reflective', 'stream', 'mood', 'intentions'] as MethodId[]).forEach((m) => {
      try {
        loaded[m] = localStorage.getItem(getDraftKey(m)) ?? '';
      } catch {
        // ignore
      }
    });
    setDrafts(loaded);
  }, []);

  // Persist draft on change
  const handleDraftChange = (method: MethodId, value: string) => {
    setDrafts((prev) => ({ ...prev, [method]: value }));
    try {
      localStorage.setItem(getDraftKey(method), value);
    } catch {
      // ignore
    }
  };

  // Auth journal hooks
  const { data: authEntries, isLoading: authLoading } = useGetJournalEntries();
  const saveEntryMutation = useSaveJournalEntry();

  // Guest journal hooks
  const { entries: guestEntries, isLoading: guestLoading, addEntry: addGuestEntry } = useGuestJournalEntries();

  const isLoading = isAuthenticated ? authLoading : guestLoading;
  const isSaving = saveEntryMutation.isPending;

  const displayEntries = toDisplayEntries(authEntries, guestEntries, !isAuthenticated);

  const currentDraft = drafts[selectedMethod];

  const handleSave = async () => {
    const content = currentDraft.trim();
    if (!content) {
      toast.error('Please write something before saving.');
      return;
    }

    if (isAuthenticated) {
      try {
        await saveEntryMutation.mutateAsync({
          methodType: selectedMethod,
          content,
          moodTag: moodTag || undefined,
        });
        toast.success('Journal entry saved!');
        handleDraftChange(selectedMethod, '');
        if (selectedMethod === 'mood') setMoodTag('');
      } catch {
        toast.error('Failed to save entry. Please try again.');
      }
    } else {
      addGuestEntry(selectedMethod, content, moodTag || undefined);
      toast.success('Journal entry saved locally!');
      handleDraftChange(selectedMethod, '');
      if (selectedMethod === 'mood') setMoodTag('');
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col">
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
            <BookOpen className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">My Journal</h1>
          </div>
          {!isAuthenticated && (
            <Badge variant="secondary" className="ml-auto text-xs">
              Guest - saved locally
            </Badge>
          )}
        </div>

        <div className="flex-1 overflow-y-auto px-4 py-6 max-w-2xl mx-auto w-full space-y-8">
          {/* Method selector */}
          <section>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Choose a journaling method
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {METHODS.map((method) => (
                <JournalingMethodCard
                  key={method.id}
                  id={method.id}
                  icon={method.icon}
                  title={method.title}
                  description={method.description}
                  isSelected={selectedMethod === method.id}
                  onClick={() => setSelectedMethod(method.id)}
                />
              ))}
            </div>
          </section>

          {/* Active method form */}
          <section className="bg-card/80 backdrop-blur-sm border border-border/60 rounded-2xl p-5 shadow-warm-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-primary">
                {METHODS.find((m) => m.id === selectedMethod)?.icon}
              </span>
              <h2 className="font-bold text-foreground">
                {METHODS.find((m) => m.id === selectedMethod)?.title} Journal
              </h2>
            </div>

            {selectedMethod === 'gratitude' && (
              <GratitudeForm
                value={currentDraft}
                onChange={(v) => handleDraftChange('gratitude', v)}
              />
            )}
            {selectedMethod === 'reflective' && (
              <ReflectiveForm
                value={currentDraft}
                onChange={(v) => handleDraftChange('reflective', v)}
              />
            )}
            {selectedMethod === 'stream' && (
              <StreamForm
                value={currentDraft}
                onChange={(v) => handleDraftChange('stream', v)}
              />
            )}
            {selectedMethod === 'mood' && (
              <MoodForm
                value={currentDraft}
                onChange={(v) => handleDraftChange('mood', v)}
                moodTag={moodTag}
                onMoodTag={setMoodTag}
              />
            )}
            {selectedMethod === 'intentions' && (
              <IntentionsForm
                value={currentDraft}
                onChange={(v) => handleDraftChange('intentions', v)}
              />
            )}

            <div className="mt-5 flex justify-end">
              <Button
                onClick={handleSave}
                disabled={isSaving || !currentDraft.trim()}
                className="rounded-xl gap-2"
              >
                {isSaving ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Save className="w-4 h-4" />
                )}
                Save Entry
              </Button>
            </div>
          </section>

          {/* Past entries */}
          <section>
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">
              Past Entries
            </h2>
            {isLoading ? (
              <div className="flex justify-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-primary" />
              </div>
            ) : (
              <PastJournalEntries entries={displayEntries} />
            )}
          </section>
        </div>
      </div>
    </div>
  );
}
