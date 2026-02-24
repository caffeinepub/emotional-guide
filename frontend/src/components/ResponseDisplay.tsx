import { useEffect } from 'react';
import { SupportiveResponse } from '../backend';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { Loader2 } from 'lucide-react';

interface ResponseDisplayProps {
  response: SupportiveResponse | null;
  isLoading?: boolean;
}

export default function ResponseDisplay({ response, isLoading }: ResponseDisplayProps) {
  const { speak, isSpeaking } = useSpeechSynthesis();

  useEffect(() => {
    console.log('[ResponseDisplay] Component mounted or response changed', {
      hasResponse: !!response,
      isLoading,
      responseMainMessage: response?.mainMessage,
      timestamp: new Date().toISOString(),
    });

    if (response?.mainMessage && !isLoading) {
      console.log('[ResponseDisplay] Attempting to speak response:', {
        messageLength: response.mainMessage.length,
        messagePreview: response.mainMessage.substring(0, 50),
        timestamp: new Date().toISOString(),
      });

      // Check if speech synthesis is available
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        console.log('[ResponseDisplay] Speech synthesis API available');
        console.log('[ResponseDisplay] Current speaking state:', isSpeaking);
        
        try {
          speak(response.mainMessage);
          console.log('[ResponseDisplay] speak() function called successfully');
        } catch (error) {
          console.error('[ResponseDisplay] Error calling speak():', error);
        }
      } else {
        console.error('[ResponseDisplay] Speech synthesis API not available in this browser');
      }
    } else {
      console.log('[ResponseDisplay] Skipping speech synthesis:', {
        hasResponse: !!response,
        hasMainMessage: !!response?.mainMessage,
        isLoading,
      });
    }
  }, [response?.mainMessage, isLoading, speak, isSpeaking]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!response) {
    return null;
  }

  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-3xl p-6 shadow-warm-md">
        <p className="text-lg leading-relaxed text-foreground">{response.mainMessage}</p>
        {isSpeaking && (
          <p className="text-xs text-muted-foreground mt-2 italic">🔊 Speaking...</p>
        )}
      </div>

      {response.relatableStory && (
        <div className="bg-gradient-to-br from-accent/10 to-primary/5 rounded-3xl p-6 shadow-warm-sm">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">💭 You're not alone</h3>
          <p className="text-sm leading-relaxed text-foreground">{response.relatableStory}</p>
        </div>
      )}

      {response.actionOptions && response.actionOptions.length > 0 && (
        <div className="bg-gradient-to-br from-secondary/10 to-accent/5 rounded-3xl p-6 shadow-warm-sm">
          <h3 className="text-sm font-semibold text-muted-foreground mb-3">✨ Things you can try</h3>
          <ul className="space-y-2">
            {response.actionOptions.map((option, index) => (
              <li key={index} className="flex items-start gap-2">
                <span className="text-primary mt-0.5">•</span>
                <span className="text-sm text-foreground">{option}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {response.followUpQuestion && (
        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-3xl p-6 shadow-warm-sm border border-primary/10">
          <p className="text-sm leading-relaxed text-foreground italic">{response.followUpQuestion}</p>
        </div>
      )}
    </div>
  );
}
