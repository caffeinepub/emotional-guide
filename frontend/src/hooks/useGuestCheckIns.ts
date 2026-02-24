import { useState, useEffect } from 'react';
import type { SupportiveResponse } from '../backend';
import type { CheckInWithResponseData } from './useCheckIns';

const GUEST_STORAGE_KEY = 'ana-guest-checkins';

interface GuestCheckInStored {
  timestamp: string;
  feelings: string;
  content: string;
  response: SupportiveResponse;
}

export function useGuestCheckIns() {
  const [checkInsWithResponses, setCheckInsWithResponses] = useState<CheckInWithResponseData[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load check-ins from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(GUEST_STORAGE_KEY);
      if (stored) {
        const guestCheckIns: GuestCheckInStored[] = JSON.parse(stored);
        const converted = guestCheckIns.map(item => ({
          checkIn: {
            timestamp: BigInt(new Date(item.timestamp).getTime() * 1_000_000),
            feelings: item.feelings,
            content: item.content,
          },
          response: item.response
        }));
        setCheckInsWithResponses(converted);
      }
    } catch (error) {
      console.error('Failed to load guest check-ins:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addCheckIn = async (feelings: string, content: string, response: SupportiveResponse): Promise<CheckInWithResponseData> => {
    const newCheckInWithResponse: CheckInWithResponseData = {
      checkIn: {
        timestamp: BigInt(Date.now() * 1_000_000),
        feelings,
        content,
      },
      response
    };

    const updatedCheckIns = [...checkInsWithResponses, newCheckInWithResponse];
    setCheckInsWithResponses(updatedCheckIns);

    // Save to localStorage
    try {
      const toStore: GuestCheckInStored[] = updatedCheckIns.map(item => ({
        timestamp: new Date(Number(item.checkIn.timestamp) / 1_000_000).toISOString(),
        feelings: item.checkIn.feelings,
        content: item.checkIn.content,
        response: item.response
      }));
      localStorage.setItem(GUEST_STORAGE_KEY, JSON.stringify(toStore));
    } catch (error) {
      console.error('Failed to save guest check-in:', error);
    }

    return newCheckInWithResponse;
  };

  const clearGuestData = () => {
    setCheckInsWithResponses([]);
    try {
      localStorage.removeItem(GUEST_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear guest data:', error);
    }
  };

  return {
    checkInsWithResponses,
    isLoading,
    addCheckIn,
    clearGuestData,
  };
}
