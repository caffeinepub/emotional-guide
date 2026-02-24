import { ExternalLink, Sparkles } from 'lucide-react';

const affirmations = [
  "You are enough, exactly as you are right now.",
  "Every day is a new opportunity to grow and shine.",
  "Your feelings are valid, and you have the strength to move through them.",
  "Small steps forward are still steps forward — keep going.",
  "You deserve kindness, especially from yourself.",
  "The world is better with you in it.",
  "You have overcome hard things before, and you will again.",
];

const goodVibesLinks = [
  { title: "The Happiness Lab Podcast", url: "https://www.happinesslab.fm/" },
  { title: "Calm – Daily Calm Meditations", url: "https://www.calm.com/blog/daily-calm" },
  { title: "Tiny Buddha – Uplifting Stories", url: "https://tinybuddha.com/" },
  { title: "The Good News Network", url: "https://www.goodnewsnetwork.org/" },
  { title: "Positive Psychology Exercises", url: "https://positivepsychology.com/positive-psychology-exercises/" },
  { title: "Gratitude Journal – Happyfeed", url: "https://www.happyfeed.co/" },
];

export default function GoodVibesTabContent() {
  return (
    <div className="space-y-4">
      {/* Affirmations */}
      <div>
        <p className="text-sm text-muted-foreground mb-3 flex items-center gap-1">
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          Daily affirmations just for you
        </p>
        <div className="space-y-2">
          {affirmations.map((affirmation, index) => (
            <div
              key={index}
              className="px-4 py-3 rounded-2xl bg-gradient-to-r from-primary/8 to-secondary/8 border border-primary/10"
            >
              <p className="text-sm font-medium text-foreground leading-relaxed">✨ {affirmation}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Feel-good links */}
      <div>
        <p className="text-sm text-muted-foreground mb-3">Feel-good resources</p>
        <div className="space-y-2">
          {goodVibesLinks.map((link, index) => (
            <a
              key={index}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-gradient-to-r from-primary/5 to-secondary/5 hover:from-primary/10 hover:to-secondary/10 transition-all duration-300 group"
            >
              <span className="flex-1 text-sm font-medium">{link.title}</span>
              <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
