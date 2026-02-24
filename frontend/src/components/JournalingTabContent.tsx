import { ExternalLink } from 'lucide-react';
import { getJournalingPrompts } from '../utils/moodResourceLinks';

interface JournalingTabContentProps {
  mood: string;
}

export default function JournalingTabContent({ mood }: JournalingTabContentProps) {
  const prompts = getJournalingPrompts(mood);

  return (
    <div className="space-y-3">
      <p className="text-sm text-muted-foreground">
        Reflective prompts to help you process your emotions
      </p>
      <div className="space-y-3">
        {prompts.map((prompt, index) => (
          <a
            key={index}
            href={prompt.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 group"
          >
            <span className="flex-1 text-sm font-medium text-foreground">{prompt.title}</span>
            <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
          </a>
        ))}
      </div>
    </div>
  );
}
