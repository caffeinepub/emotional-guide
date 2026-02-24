import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { UserCircle, LogIn, Shield, Cloud } from 'lucide-react';

interface WelcomeScreenProps {
  onContinueAsGuest: () => void;
  onLogin: () => void;
}

export default function WelcomeScreen({ onContinueAsGuest, onLogin }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-12">
      <img 
        src="/assets/generated/companion-icon.dim_200x200.png" 
        alt="Ana" 
        className="w-32 h-32 mb-6 rounded-full shadow-lg"
      />
      <h1 className="text-4xl font-bold mb-3 text-foreground text-center">Hi, I'm Ana</h1>
      <p className="text-lg text-muted-foreground max-w-md mb-12 text-center">
        Your friend in your every emotional need. I'm here to listen, understand, and support you through whatever you're feeling.
      </p>

      <div className="grid md:grid-cols-2 gap-6 w-full max-w-3xl">
        {/* Guest Mode Option */}
        <Card className="p-6 hover:shadow-lg transition-shadow border-2 hover:border-primary/50">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-accent/20 rounded-full">
                <UserCircle className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Continue as Guest</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6 flex-grow">
              Start chatting with Ana immediately without creating an account. Your conversations will be saved locally in your browser.
            </p>
            <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Instant access</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>No registration required</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-muted-foreground/60">○</span>
                <span className="text-muted-foreground/80">Local storage only</span>
              </li>
            </ul>
            <Button 
              onClick={onContinueAsGuest}
              variant="outline"
              size="lg"
              className="w-full gap-2 rounded-full shadow-sm hover:shadow-md transition-all"
            >
              <UserCircle className="w-5 h-5" />
              Continue as Guest
            </Button>
          </div>
        </Card>

        {/* Login Option */}
        <Card className="p-6 hover:shadow-lg transition-shadow border-2 border-primary/30 bg-primary/5">
          <div className="flex flex-col h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-primary/20 rounded-full">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">Login with Internet Identity</h2>
            </div>
            <p className="text-sm text-muted-foreground mb-6 flex-grow">
              Create a secure account to save your conversations with Ana permanently and access them from any device.
            </p>
            <ul className="space-y-2 mb-6 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Secure authentication</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>Permanent storage</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span className="font-medium">Sync across devices</span>
              </li>
            </ul>
            <Button 
              onClick={onLogin}
              size="lg"
              className="w-full gap-2 rounded-full shadow-md hover:shadow-lg transition-all"
            >
              <LogIn className="w-5 h-5" />
              Login
            </Button>
          </div>
        </Card>
      </div>

      <p className="text-xs text-muted-foreground mt-8 text-center max-w-md">
        Your privacy matters. Guest conversations are stored locally on your device. 
        Authenticated conversations are securely stored on the Internet Computer blockchain.
      </p>
    </div>
  );
}
