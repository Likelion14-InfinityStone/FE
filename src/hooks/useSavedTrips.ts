import { useCallback, useState } from 'react';
import type { Trip } from '@/constants/trip';

const SAVED_KEY = 'savedTrips';

const readJSON = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
};

const writeJSON = (key: string, value: unknown) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// TODO: API 연동 후 서버에 저장된 여행 목록으로 교체 (현재는 localStorage 임시 저장)
export const useSavedTrips = () => {
  const [trips, setTrips] = useState<Trip[]>(() => readJSON(SAVED_KEY, []));

  const addTrip = useCallback((trip: Trip) => {
    setTrips((prev) => {
      if (prev.some((existing) => existing.id === trip.id)) return prev;
      const next = [...prev, trip];
      writeJSON(SAVED_KEY, next);
      return next;
    });
  }, []);

  const updateTrip = useCallback(
    (id: number, updates: Partial<Omit<Trip, 'id'>>) => {
      setTrips((prev) => {
        const next = prev.map((trip) =>
          trip.id === id ? { ...trip, ...updates } : trip
        );
        writeJSON(SAVED_KEY, next);
        return next;
      });
    },
    []
  );

  const removeTrip = useCallback((id: number) => {
    setTrips((prev) => {
      const next = prev.filter((trip) => trip.id !== id);
      writeJSON(SAVED_KEY, next);
      return next;
    });
  }, []);

  return { trips, addTrip, updateTrip, removeTrip };
};
