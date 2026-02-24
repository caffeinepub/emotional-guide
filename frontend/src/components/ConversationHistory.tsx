import { Card } from '@/components/ui/card';
import { useEffect } from 'react';
import type { CheckInWithResponseData } from '../hooks/useCheckIns';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

interface ConversationHistoryProps {
  checkInsWithResponses: CheckInWithResponseData[];
}

export default function ConversationHistory({ checkInsWithResponses }: ConversationHistoryProps) {
  const { cancel } = useSpeechSynthesis();

  useEffect(() => {
    console.log('[ConversationHistory] Rendering with checkIns:', {
      count: checkInsWithResponses.length,
      checkIns: checkInsWithResponses.map((ci, idx) => ({
        index: idx,
        hasCheckIn: !!ci.checkIn,
        hasResponse: !!ci.response,
        responseFields: ci.response ? Object.keys(ci.response) : [],
        mainMessage: ci.response?.mainMessage?.substring(0, 50),
      }))
    });
  }, [checkInsWithResponses]);

  // Cancel any ongoing speech when component unmounts
  useEffect(() => {
    return () => {
      cancel();
    };
  }, [cancel]);

  if (checkInsWithResponses.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No conversations yet. Share how you're feeling to get started!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {checkInsWithResponses.map((checkInData, index) => {
        const { checkIn, response } = checkInData;
        
        console.log(`[ConversationHistory] Rendering check-in ${index}:`, {
          hasCheckIn: !!checkIn,
          hasResponse: !!response,
          responseType: typeof response,
          responseKeys: response ? Object.keys(response) : [],
        });

        if (!response) {
          console.error(`[ConversationHistory] Missing response for check-in ${index}`);
          return null;
        }

        const { mainMessage, relatableStory, actionOptions, followUpQuestion } = response;

        if (!mainMessage) {
          console.error(`[ConversationHistory] Missing mainMessage in response for check-in ${index}`, response);
        }

        return (
          <div key={index} className="space-y-3">
            {/* User's message */}
            <div className="flex justify-end">
              <div className="max-w-[80%]">
                <Card className="bg-primary text-primary-foreground p-4 rounded-3xl rounded-tr-md shadow-sm">
                  <div className="space-y-2">
                    <p className="text-xs opacity-80">
                      Feeling: <span className="font-medium capitalize">{checkIn.feelings}</span>
                    </p>
                    <p className="text-sm leading-relaxed">{checkIn.content}</p>
                  </div>
                </Card>
              </div>
            </div>

            {/* Ana's response */}
            <div className="flex justify-start">
              <div className="max-w-[80%]">
                <div className="flex items-start gap-3">
                  <img 
                    src="/assets/generated/companion-icon.dim_200x200.png" 
                    alt="Ana" 
                    className="w-10 h-10 rounded-full shadow-sm"
                  />
                  <Card className="bg-card border-2 border-border p-4 rounded-3xl rounded-tl-md shadow-sm">
                    <div className="space-y-3">
                      <p className="text-sm leading-relaxed text-foreground">
                        {mainMessage || '⚠️ Response message not available'}
                      </p>
                      
                      {relatableStory && (
                        <div className="pt-2 border-t border-border">
                          <p className="text-xs text-muted-foreground italic">{relatableStory}</p>
                        </div>
                      )}
                      
                      {actionOptions && actionOptions.length > 0 && (
                        <div className="pt-2">
                          <p className="text-xs font-medium text-muted-foreground mb-2">You might try:</p>
                          <ul className="space-y-1">
                            {actionOptions.map((option, optionIndex) => (
                              <li key={optionIndex} className="text-xs text-muted-foreground flex items-start gap-2">
                                <span className="text-primary">•</span>
                                <span>{option}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {followUpQuestion && (
                        <div className="pt-2 border-t border-border">
                          <p className="text-xs text-muted-foreground">{followUpQuestion}</p>
                        </div>
                      )}
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
