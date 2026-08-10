import { useCallback, useState } from 'react';

export type SavedMedicine = {
  id: number;
  name: string;
  dispensedDate: string;
  issuer: string;
  productInfo: string;
  frequency: string;
  duration: string;
  dosePerTime: string;
};

const SAVED_KEY = 'savedMedicines';

const readJSON = <T,>(key: string, fallback: T): T => {
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

// TODO: 서류함/API 연동 후 서버 저장으로 교체 (현재는 localStorage 임시 저장)
export const useSavedMedicines = () => {
  const [savedMedicines, setSavedMedicines] = useState<SavedMedicine[]>(() =>
    readJSON(SAVED_KEY, [])
  );

  const addMedicine = useCallback(
    (medicine: Omit<SavedMedicine, 'id'>) => {
      const newMedicine: SavedMedicine = { ...medicine, id: Date.now() };
      setSavedMedicines((prev) => {
        const next = [...prev, newMedicine];
        writeJSON(SAVED_KEY, next);
        return next;
      });
      return newMedicine;
    },
    []
  );

  return { savedMedicines, addMedicine };
};
