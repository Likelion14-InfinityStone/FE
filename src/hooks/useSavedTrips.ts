import { useCallback, useState } from 'react';
import type { Trip } from '@/constants/trip';

const STORAGE_KEY = 'savedTrips';

const readSavedTrips = (): Trip[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Trip[]) : [];
  } catch {
    return [];
  }
};

const writeSavedTrips = (trips: Trip[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(trips));
};

// TODO: API 연동 후 서버에 저장된 여행 목록으로 교체 (현재는 localStorage 임시 저장)
export const useSavedTrips = () => {
  const [savedTrips, setSavedTrips] = useState<Trip[]>(readSavedTrips);

  const addTrip = useCallback((trip: Trip) => {
    setSavedTrips((prev) => {
      if (prev.some((existing) => existing.id === trip.id)) return prev;
      const next = [...prev, trip];
      writeSavedTrips(next);
      return next;
    });
  }, []);

  return { savedTrips, addTrip };
};
