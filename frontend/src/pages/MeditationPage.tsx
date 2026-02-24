import React, { useState, useCallback } from 'react';
import { ArrowLeft, Wind, Clock, Tag, ExternalLink, X, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  getMeditationTechniques,
  meditationMoodCategories,
  type MeditationTechnique,
  type MeditationMoodCategory,
} from '../utils/meditationData';

interface MeditationPageProps {
  onClose: () => void;
}

export default function MeditationPage({ onClose }: MeditationPageProps) {
  const [selectedMood, setSelectedMood] = useState<string>('calm');
  const [activeTechnique, setActiveTechnique] = useState<MeditationTechnique | null>(null);

  const techniques = getMeditationTechniques(selectedMood);
  const currentMoodInfo = meditationMoodCategories.find(m => m.id === selectedMood);

  const handleMoodSelect = (moodId: string) => {
    setSelectedMood(moodId);
    setActiveTechnique(null);
  };

  const handleTechniqueSelect = useCallback((technique: MeditationTechnique) => {
    setActiveTechnique(technique);
  }, []);

  const handleClosePlayer = useCallback(() => {
    setActiveTechnique(null);
  }, []);

  return (
    <div className="relative min-h-screen flex flex-col bg-background">
      {/* Soft background */}
      <div className="ana-room-background" />

      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <div className="sticky top-0 z-20 bg-background/90 backdrop-blur-md border-b border-border/50 px-4 py-3 flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="rounded-full shrink-0"
            aria-label="Back to chat"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex items-center gap-2">
            <Wind className="w-5 h-5 text-primary" />
            <h1 className="text-lg font-bold text-foreground">Meditation for Your Mood</h1>
          </div>
          <Badge variant="secondary" className="ml-auto text-xs hidden sm:flex">
            {currentMoodInfo?.emoji} {currentMoodInfo?.label}
          </Badge>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-y-auto pb-40">
          <div className="px-4 pt-6 pb-4 max-w-3xl mx-auto w-full">
            {/* Intro */}
            <p className="text-muted-foreground text-sm mb-5">
              Choose how you're feeling and discover meditation techniques tailored to your mood.
            </p>

            {/* Mood selector */}
            <section className="mb-6">
              <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
                How are you feeling?
              </h2>
              <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                {meditationMoodCategories.map((mood) => (
                  <button
                    key={mood.id}
                    onClick={() => handleMoodSelect(mood.id)}
                    className={`
                      flex flex-col items-center gap-1.5 p-2.5 rounded-2xl border transition-all duration-200
                      ${selectedMood === mood.id
                        ? `bg-gradient-to-br ${mood.color} ${mood.borderColor} border-2 scale-105 shadow-warm-md`
                        : 'border-border/40 bg-card/60 hover:bg-card hover:border-border hover:scale-102'
                      }
                    `}
                    aria-pressed={selectedMood === mood.id}
                  >
                    <span className="text-xl leading-none">{mood.emoji}</span>
                    <span className="text-xs font-medium text-foreground leading-none">{mood.label}</span>
                  </button>
                ))}
              </div>
            </section>

            {/* Tagline for selected mood */}
            {currentMoodInfo && (
              <div className="mb-5 flex items-center gap-2">
                <span className="text-2xl">{currentMoodInfo.emoji}</span>
                <div>
                  <p className="text-base font-semibold text-foreground">{currentMoodInfo.label}</p>
                  <p className="text-xs text-muted-foreground">{currentMoodInfo.tagline}</p>
                </div>
              </div>
            )}

            {/* Techniques list */}
            <section>
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Techniques for you
                </h2>
                <span className="text-xs text-muted-foreground">{techniques.length} practices</span>
              </div>

              <div className="space-y-3">
                {techniques.map((technique, index) => (
                  <TechniqueCard
                    key={`${technique.name}-${index}`}
                    technique={technique}
                    isActive={activeTechnique?.name === technique.name}
                    onSelect={handleTechniqueSelect}
                  />
                ))}
              </div>
            </section>
          </div>
        </div>

        {/* Inline Player — fixed at bottom */}
        {activeTechnique && (
          <div className="fixed bottom-0 left-0 right-0 z-30 bg-background/95 backdrop-blur-xl border-t border-border/60 shadow-warm-2xl">
            {/* Technique info bar */}
            <div className="flex items-center gap-3 px-4 py-3 border-b border-border/30">
              <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center shrink-0">
                <Wind className="w-4 h-4 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{activeTechnique.name}</p>
                <p className="text-xs text-muted-foreground truncate">
                  {activeTechnique.category} · {activeTechnique.duration}
                </p>
              </div>
              <Badge variant="outline" className="text-xs shrink-0 hidden sm:flex">
                {currentMoodInfo?.emoji} {currentMoodInfo?.label}
              </Badge>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClosePlayer}
                className="rounded-full shrink-0 h-8 w-8"
                aria-label="Close player"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>

            {/* YouTube embed */}
            <div className="w-full aspect-video max-h-[280px] sm:max-h-[320px] bg-black">
              <iframe
                key={activeTechnique.resourceUrl}
                src={`${activeTechnique.resourceUrl}?autoplay=1&rel=0&modestbranding=1`}
                title={activeTechnique.name}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// --- TechniqueCard sub-component ---

interface TechniqueCardProps {
  technique: MeditationTechnique;
  isActive: boolean;
  onSelect: (technique: MeditationTechnique) => void;
}

function TechniqueCard({ technique, isActive, onSelect }: TechniqueCardProps) {
  return (
    <button
      onClick={() => onSelect(technique)}
      className={`
        w-full flex items-start gap-3 p-4 rounded-2xl border transition-all duration-200 text-left
        ${isActive
          ? 'bg-primary/10 border-primary/40 shadow-warm-md'
          : 'bg-card/70 border-border/40 hover:bg-card hover:border-border/70 hover:shadow-warm'
        }
      `}
      aria-label={`Start ${technique.name}`}
    >
      {/* Play indicator */}
      <div className={`
        w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-all duration-200
        ${isActive ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}
      `}>
        <Play className="w-4 h-4" />
      </div>

      {/* Technique info */}
      <div className="flex-1 min-w-0">
        <p className={`text-sm font-semibold mb-1 ${isActive ? 'text-primary' : 'text-foreground'}`}>
          {technique.name}
        </p>
        <p className="text-xs text-muted-foreground leading-relaxed mb-2">
          {technique.description}
        </p>
        <div className="flex items-center gap-2 flex-wrap">
          <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3 h-3" />
            {technique.duration}
          </span>
          <Badge variant="secondary" className="text-xs py-0 h-5">
            <Tag className="w-2.5 h-2.5 mr-1" />
            {technique.category}
          </Badge>
        </div>
      </div>

      {/* Arrow */}
      <div className={`shrink-0 self-center transition-all duration-200 ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
        <ExternalLink className="w-4 h-4" />
      </div>
    </button>
  );
}
