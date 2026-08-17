import { useState } from 'react';

import { useSavedMedicines } from '@/hooks/useSavedMedicines';
import {
  findDuplicateMedicine,
  isMedicineExpired,
} from '@/utils/medicineChecks';
import { EMPTY_MEDICINE_FIELDS, isMedicineComplete } from '@/types/scan/medicineFields';
import type { MedicineFields, PassportFields } from '@/types/scan/scan.type';

type SaveException = 'duplicate' | 'expired' | null;

const firstOpenIndex = (medicines: MedicineFields[]): number => {
  const firstIncomplete = medicines.findIndex((item) => !isMedicineComplete(item));
  return firstIncomplete >= 0 ? firstIncomplete : 0;
};

export const useMedicineForm = (
  initialPassport: PassportFields,
  initialMedicines: MedicineFields[]
) => {
  const { savedMedicines, addMedicine } = useSavedMedicines();
  const [passport, setPassport] = useState<PassportFields>(initialPassport);
  const [medicines, setMedicines] = useState<MedicineFields[]>(initialMedicines);
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(
    () => new Set([firstOpenIndex(initialMedicines)])
  );
  const [isSaved, setIsSaved] = useState(false);
  const [exception, setException] = useState<SaveException>(null);
  const [exceptionMedicineName, setExceptionMedicineName] = useState('');

  const isComplete =
    passport.dispensedDate.trim() !== '' &&
    passport.issuer.trim() !== '' &&
    medicines.length > 0 &&
    medicines.every(isMedicineComplete);

  const updatePassport = (field: keyof PassportFields, value: string) => {
    setPassport((prev) => ({ ...prev, [field]: value }));
  };

  const updateMedicine = (
    index: number,
    field: keyof MedicineFields,
    value: string
  ) => {
    setMedicines((prev) =>
      prev.map((item, i) => (i === index ? { ...item, [field]: value } : item))
    );
  };

  const toggleMedicine = (index: number) => {
    setOpenIndexes((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const addMedicineRow = () => {
    setMedicines((prev) => {
      setOpenIndexes((prevOpen) => new Set(prevOpen).add(prev.length));
      return [...prev, EMPTY_MEDICINE_FIELDS];
    });
  };

  const removeMedicineRow = (index: number) => {
    setMedicines((prev) => prev.filter((_, i) => i !== index));
    setOpenIndexes((prev) => {
      const next = new Set<number>();
      prev.forEach((i) => {
        if (i < index) next.add(i);
        else if (i > index) next.add(i - 1);
      });
      return next;
    });
  };

  const resetException = () => setException(null);

  const save = () => {
    if (!isComplete) return;

    const duplicate = medicines.find((item) =>
      findDuplicateMedicine(savedMedicines, item.productInfo)
    );
    if (duplicate) {
      setExceptionMedicineName(duplicate.productInfo);
      setException('duplicate');
      return;
    }

    const expired = medicines.find((item) =>
      isMedicineExpired(passport.dispensedDate, item.duration)
    );
    if (expired) {
      setExceptionMedicineName(expired.productInfo);
      setException('expired');
      return;
    }

    medicines.forEach((item) => addMedicine({ name: '', ...passport, ...item }));
    setIsSaved(true);
  };

  return {
    passport,
    medicines,
    openIndexes,
    isComplete,
    isSaved,
    exception,
    exceptionMedicineName,
    updatePassport,
    updateMedicine,
    toggleMedicine,
    addMedicineRow,
    removeMedicineRow,
    resetException,
    save,
  };
};
