import { useState } from 'react';
import { Music, BookOpen, Wind, Sparkles, Tv, ChevronDown, ChevronUp } from 'lucide-react';
import WhatToWatchTabContent from './WhatToWatchTabContent';
import GoodVibesTabContent from './GoodVibesTabContent';
import { ScrollArea } from '@/components/ui/scroll-area';

type TabId = 'music' | 'journal' | 'meditation' | 'good-vibes' | 'watch-this';

interface Tab {
  id: TabId;
  label: string;
  icon: React.ReactNode;
}

interface ChatBottomTabsProps {
  onJournalClick?: () => void;
  onMusicClick?: () => void;
  onMeditationClick?: () => void;
}

const TABS: Tab[] = [
  { id: 'music', label: 'Music', icon: <Music className="h-3.5 w-3.5" /> },
  { id: 'journal', label: 'Journal', icon: <BookOpen className="h-3.5 w-3.5" /> },
  { id: 'meditation', label: 'Meditation', icon: <Wind className="h-3.5 w-3.5" /> },
  { id: 'good-vibes', label: 'Good Vibes', icon: <Sparkles className="h-3.5 w-3.5" /> },
  { id: 'watch-this', label: 'Watch This', icon: <Tv className="h-3.5 w-3.5" /> },
];

// Default mood for the bottom tabs (general/positive)
const DEFAULT_MOOD = 'happy';

export default function ChatBottomTabs({ onJournalClick, onMusicClick, onMeditationClick }: ChatBottomTabsProps) {
  const [activeTab, setActiveTab] = useState<TabId | null>(null);

  const handleTabClick = (tabId: TabId) => {
    if (tabId === 'journal') {
      onJournalClick?.();
      return;
    }
    if (tabId === 'music') {
      onMusicClick?.();
      return;
    }
    if (tabId === 'meditation') {
      onMeditationClick?.();
      return;
    }
    setActiveTab(prev => (prev === tabId ? null : tabId));
  };

  return (
    <div className="border-t border-border/40 bg-background/80 backdrop-blur-sm rounded-b-2xl overflow-hidden">
      {/* Content panel — shown above the tab bar when a tab is active */}
      {activeTab && activeTab !== 'journal' && activeTab !== 'music' && activeTab !== 'meditation' && (
        <div className="border-b border-border/30 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <ScrollArea className="h-56 px-4 py-3">
            {activeTab === 'good-vibes' && <GoodVibesTabContent />}
            {activeTab === 'watch-this' && <WhatToWatchTabContent mood={DEFAULT_MOOD} />}
          </ScrollArea>
        </div>
      )}

      {/* Tab bar */}
      <div className="flex items-stretch">
        {TABS.map((tab) => {
          const isNavigationTab = tab.id === 'journal' || tab.id === 'music' || tab.id === 'meditation';
          const isActive = !isNavigationTab && activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`
                flex-1 flex flex-col items-center justify-center gap-1 py-2.5 px-1
                text-xs font-medium transition-all duration-200
                border-t-2
                ${isActive
                  ? 'border-t-primary text-primary bg-primary/5'
                  : isNavigationTab
                    ? 'border-t-transparent text-primary/80 hover:text-primary hover:bg-primary/5'
                    : 'border-t-transparent text-muted-foreground hover:text-foreground hover:bg-muted/40'
                }
              `}
              aria-pressed={isActive}
              title={
                tab.id === 'journal'
                  ? 'Open Journal'
                  : tab.id === 'music'
                  ? 'Open Music'
                  : tab.id === 'meditation'
                  ? 'Open Meditation'
                  : undefined
              }
            >
              {tab.icon}
              <span className="leading-none">{tab.label}</span>
              {isActive && <ChevronDown className="h-2.5 w-2.5 opacity-60" />}
              {!isActive && !isNavigationTab && <ChevronUp className="h-2.5 w-2.5 opacity-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
