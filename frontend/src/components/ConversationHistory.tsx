import React, { useEffect, useRef } from 'react';
import { useGetAllCheckInsWithResponses } from '../hooks/useCheckIns';
import { useGuestCheckIns } from '../hooks/useGuestCheckIns';
import { Skeleton } from '@/components/ui/skeleton';

interface ConversationHistoryProps {
  isGuest: boolean;
}

function formatTime(timestamp: bigint): string {
  try {
    // Backend timestamps are in nanoseconds
    const ms = Number(timestamp / BigInt(1_000_000));
    const date = new Date(ms);
    if (isNaN(date.getTime())) return '';
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch {
    return '';
  }
}

export default function ConversationHistory({ isGuest }: ConversationHistoryProps) {
  // For guests, use the guest hook directly so we always have live state
  const guestHook = useGuestCheckIns();
  const authQuery = useGetAllCheckInsWithResponses(isGuest);

  const checkInsWithResponses = isGuest
    ? guestHook.checkInsWithResponses
    : (authQuery.data ?? []);

  const isLoading = isGuest ? false : authQuery.isLoading;

  const bottomRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const userScrolledUpRef = useRef(false);

  // Track manual scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      userScrolledUpRef.current = scrollTop + clientHeight < scrollHeight - 50;
    };
    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    if (!userScrolledUpRef.current && bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [checkInsWithResponses.length]);

  // Always scroll to bottom on initial load
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: 'auto' });
    }
  }, []);

  if (isLoading) {
    return (
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="space-y-2">
            <div className="flex justify-end">
              <Skeleton className="h-12 w-48 rounded-2xl" />
            </div>
            <div className="flex justify-start">
              <Skeleton className="h-20 w-64 rounded-2xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (checkInsWithResponses.length === 0) {
    return (
      <div className="flex-1 overflow-y-auto p-4 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 chat-empty-icon-bg">
          <span className="text-3xl">💬</span>
        </div>
        <p className="chat-empty-title font-medium text-lg">Hi! I'm Ana.</p>
        <p className="chat-empty-subtitle text-sm mt-1 max-w-xs">
          Share how you're feeling and I'll be here to listen and support you.
        </p>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="flex-1 overflow-y-auto p-4 space-y-6"
    >
      {checkInsWithResponses.map((item, index) => (
        <div key={index} className="space-y-3">
          {/* User message bubble — right-aligned, solid warm coral background */}
          <div className="flex justify-end">
            <div className="max-w-[80%] space-y-1">
              {/* "You" label aligned right */}
              <p className="text-xs font-semibold text-right pr-1 sent-message-label">You</p>
              <div className="sent-bubble rounded-2xl rounded-tr-sm px-4 py-3 shadow-md">
                {item.checkIn.feelings && item.checkIn.feelings !== 'general' && (
                  <span className="inline-block text-xs font-semibold uppercase tracking-wide mb-1 mr-2 sent-bubble-tag">
                    [{item.checkIn.feelings}]
                  </span>
                )}
                <p className="text-sm leading-relaxed font-medium sent-bubble-text">
                  {item.checkIn.content}
                </p>
              </div>
              {item.checkIn.timestamp > BigInt(0) && (
                <p className="text-xs text-right pr-1 sent-bubble-time">
                  {formatTime(item.checkIn.timestamp)}
                </p>
              )}
            </div>
          </div>

          {/* Ana's response bubble — left-aligned, solid opaque background */}
          <div className="flex justify-start gap-2">
            <div className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm ana-avatar-bg">
              <span className="text-sm">🌸</span>
            </div>
            <div className="max-w-[80%] space-y-2">
              <div className="ana-response-card rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
                <p className="text-xs font-semibold mb-2 ana-name-label">Ana</p>
                <p className="text-sm leading-relaxed ana-response-text">
                  {item.response.mainMessage}
                </p>

                {item.response.actionOptions && item.response.actionOptions.length > 0 && (
                  <div className="mt-3 space-y-1">
                    <p className="text-xs font-medium uppercase tracking-wide ana-section-label">
                      Try this:
                    </p>
                    <ul className="space-y-1">
                      {item.response.actionOptions.map((option, optIdx) => (
                        <li key={optIdx} className="flex items-start gap-2 text-xs ana-option-text">
                          <span className="ana-bullet mt-0.5">•</span>
                          <span>{option}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {item.response.followUpQuestion && (
                  <p className="mt-3 text-xs italic ana-followup-text border-t ana-divider pt-2">
                    {item.response.followUpQuestion}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
