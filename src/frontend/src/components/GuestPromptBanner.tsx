import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, Shield } from 'lucide-react';

interface GuestPromptBannerProps {
  onLogin: () => void;
}

const BANNER_DISMISSED_KEY = 'ana-banner-dismissed';

export default function GuestPromptBanner({ onLogin }: GuestPromptBannerProps) {
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem(BANNER_DISMISSED_KEY);
    if (dismissed === 'true') {
      setIsDismissed(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsDismissed(true);
    sessionStorage.setItem(BANNER_DISMISSED_KEY, 'true');
  };

  if (isDismissed) {
    return null;
  }

  return (
    <Card className="mb-6 p-4 bg-primary/5 border-primary/30 relative">
      <button
        onClick={handleDismiss}
        className="absolute top-3 right-3 text-muted-foreground hover:text-foreground transition-colors"
        aria-label="Dismiss"
      >
        <X className="w-4 h-4" />
      </button>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pr-8">
        <div className="flex items-center gap-3 flex-1">
          <div className="p-2 bg-primary/20 rounded-full flex-shrink-0">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-sm mb-1">
              Save Your Conversations with Ana Permanently
            </h3>
            <p className="text-xs text-muted-foreground">
              Create an account to access your conversations with Ana from any device and keep them safe forever.
            </p>
          </div>
        </div>
        <Button
          onClick={onLogin}
          size="sm"
          className="gap-2 rounded-full shadow-sm hover:shadow-md transition-all flex-shrink-0"
        >
          <Shield className="w-4 h-4" />
          Create Account
        </Button>
      </div>
    </Card>
  );
}
