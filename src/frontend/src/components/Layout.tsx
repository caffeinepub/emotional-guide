import React from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import LoginButton from './LoginButton';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Share2 } from 'lucide-react';
import { shareContent } from '../utils/shareHelpers';
import { toast } from 'sonner';

interface LayoutProps {
  children: React.ReactNode;
  isGuest?: boolean;
}

export default function Layout({ children, isGuest = false }: LayoutProps) {
  const { identity } = useInternetIdentity();
  const isAuthenticated = !!identity;

  const handleShare = async () => {
    const shareText = `Meet Ana, your friend in your every emotional need - A safe space to share your feelings and receive supportive guidance. ${window.location.origin}`;
    const shareTitle = 'Ana - Your Friend in Every Emotional Need';
    
    const result = await shareContent({
      title: shareTitle,
      text: shareText,
      url: window.location.origin,
    });

    if (result.success) {
      toast.success('Shared successfully!');
    } else {
      if (result.method === 'clipboard') {
        toast.success('Link copied to clipboard!');
      } else {
        toast.error('Failed to share. Please try again.');
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img 
              src="/assets/generated/companion-icon.dim_200x200.png" 
              alt="Ana" 
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-xl font-semibold text-foreground">
              Ana
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleShare}
              className="text-muted-foreground hover:text-foreground"
              title="Share this app"
            >
              <Share2 className="h-5 w-5" />
            </Button>
            {isGuest && (
              <Badge variant="secondary" className="text-sm">
                Guest Mode
              </Badge>
            )}
            {!isGuest && <LoginButton />}
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8">
        {children}
      </main>

      <footer className="border-t border-border bg-card/30 py-6 mt-auto">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>
            © {new Date().getFullYear()} Built with ❤️ using{' '}
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>
    </div>
  );
}
