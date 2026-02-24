import { useState } from 'react';
import { ExternalLink, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ResourceLink {
  title: string;
  url: string;
}

interface ResourceCardProps {
  category: string;
  imageSrc: string;
  links: ResourceLink[];
  className?: string;
}

export default function ResourceCard({ category, imageSrc, links, className = '' }: ResourceCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div className={`flip-card-container ${className}`}>
      <div className={`flip-card-inner ${isFlipped ? 'flipped' : ''}`}>
        {/* Front Face */}
        <div className="flip-card-face flip-card-front">
          <button
            onClick={handleFlip}
            className="w-full h-full rounded-[32px] overflow-hidden shadow-warm-md hover:shadow-warm-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
            aria-label={`View ${category} resources`}
          >
            <img
              src={imageSrc}
              alt={`${category} mood card`}
              className="w-full h-full object-cover"
            />
          </button>
        </div>

        {/* Back Face */}
        <div className="flip-card-face flip-card-back">
          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-secondary/10 rounded-[32px] p-4 shadow-warm-md backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-sm font-semibold text-foreground">{category}</h4>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleFlip}
                className="h-6 w-6 rounded-full"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 max-h-[140px] overflow-y-auto">
              {links.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-2xl bg-background/95 backdrop-blur-sm hover:bg-background transition-colors text-xs"
                >
                  <span className="flex-1 text-left">{link.title}</span>
                  <ExternalLink className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
