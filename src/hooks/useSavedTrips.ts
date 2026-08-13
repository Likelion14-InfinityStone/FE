import { useCallback, useState } from 'react';
import { TRIPS, type Trip } from '@/constants/trip';

const SAVED_KEY = 'savedTrips';
const DELETED_KEY = 'deletedTripIds';

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
  const [savedTrips, setSavedTrips] = useState<Trip[]>(() =>
    readJSON(SAVED_KEY, [])
  );
  const [deletedTripIds, setDeletedTripIds] = useState<number[]>(() =>
    readJSON(DELETED_KEY, [])
  );

  const addTrip = useCallback((trip: Trip) => {
    setSavedTrips((prev) => {
      if (prev.some((existing) => existing.id === trip.id)) return prev;
      const next = [...prev, trip];
      writeJSON(SAVED_KEY, next);
      return next;
    });
    setDeletedTripIds((prev) => {
      if (!prev.includes(trip.id)) return prev;
      const next = prev.filter((id) => id !== trip.id);
      writeJSON(DELETED_KEY, next);
      return next;
    });
  }, []);

  const updateTrip = useCallback((id: number, updates: Partial<Trip>) => {
    setSavedTrips((prev) => {
      const exists = prev.some((trip) => trip.id === id);
      const next = exists
        ? prev.map((trip) =>
            trip.id === id ? { ...trip, ...updates } : trip
          )
        : (() => {
            const base = TRIPS.find((trip) => trip.id === id);
            return base ? [...prev, { ...base, ...updates }] : prev;
          })();
      writeJSON(SAVED_KEY, next);
      return next;
    });
  }, []);

  const removeTrip = useCallback((id: number) => {
    setSavedTrips((prev) => {
      const next = prev.filter((trip) => trip.id !== id);
      writeJSON(SAVED_KEY, next);
      return next;
    });
    setDeletedTripIds((prev) => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      writeJSON(DELETED_KEY, next);
      return next;
    });
  }, []);

  const mergedTrips = new Map<number, Trip>();
  TRIPS.forEach((trip) => mergedTrips.set(trip.id, trip));
  savedTrips.forEach((trip) => mergedTrips.set(trip.id, trip));

  const trips = Array.from(mergedTrips.values()).filter(
    (trip) => !deletedTripIds.includes(trip.id)
  );

  return { trips, addTrip, updateTrip, removeTrip };
};
