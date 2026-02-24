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
          <div
            key={index}
            className="px-4 py-3 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5"
          >
            <p className="text-sm font-medium text-foreground">{prompt}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
