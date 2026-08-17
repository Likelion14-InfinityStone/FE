import { isAxiosError } from 'axios';
import { useState } from 'react';

import { saveMedications } from '@/apis/medication/medication.api';
import type {
  PassportDraft,
  QuantityField,
  ScanMedicationResult,
} from '@/types/scan/scan.type';

const isMedicineDraftComplete = (medicine: ScanMedicationResult): boolean =>
  medicine.intakesPerDay != null &&
  medicine.intakesPerDay >= 1 &&
  medicine.totalDays != null &&
  medicine.totalDays >= 1 &&
  medicine.dosePerIntake != null &&
  medicine.dosePerIntake > 0;

const firstOpenIndex = (medicines: ScanMedicationResult[]): number => {
  const firstIncomplete = medicines.findIndex(
    (item) => !isMedicineDraftComplete(item)
  );
  return firstIncomplete >= 0 ? firstIncomplete : 0;
};

const DUPLICATE_MESSAGE = '이미 등록된 의약품이 있어요.';
const DEFAULT_SAVE_ERROR = '저장에 실패했어요. 잠시 후 다시 시도해 주세요.';

export const useScanResultForm = (
  initialPassport: PassportDraft,
  initialMedicines: ScanMedicationResult[]
) => {
  const [passport, setPassport] = useState<PassportDraft>(initialPassport);
  const [medicines, setMedicines] =
    useState<ScanMedicationResult[]>(initialMedicines);
  const [openIndexes, setOpenIndexes] = useState<Set<number>>(
    () => new Set(medicines.length > 0 ? [firstOpenIndex(medicines)] : [])
  );
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [savedMedicineNames, setSavedMedicineNames] = useState<string[]>([]);
  const [isDuplicate, setIsDuplicate] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  const isComplete =
    passport.dispensedAt.trim() !== '' &&
    passport.issuer.trim() !== '' &&
    medicines.length > 0 &&
    medicines.every(isMedicineDraftComplete);

  const updatePassport = (field: keyof PassportDraft, value: string) => {
    setPassport((prev) => ({ ...prev, [field]: value }));
  };

  const updateMedicineQuantity = (
    index: number,
    field: QuantityField,
    value: number | null
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

  const removeMedicine = (index: number) => {
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

  const clearDuplicate = () => setIsDuplicate(false);

  const save = async () => {
    if (!isComplete || isSaving) return;

    setIsSaving(true);
    setSaveError(null);

    try {
      const { result } = await saveMedications({
        dispensedAt: passport.dispensedAt,
        issuer: passport.issuer,
        medications: medicines.map((item) => ({
          mfdsProductCode: item.mfdsProductCode,
          productKoName: item.productKoName,
          productEnName: item.productEnName,
          intakesPerDay: item.intakesPerDay as number,
          totalDays: item.totalDays as number,
          dosePerIntake: item.dosePerIntake as number,
          doseUnit: item.doseUnit,
        })),
      });

      setSavedMedicineNames(result.medications.map((item) => item.productKoName));
      setIsSaved(true);
    } catch (error) {
      const code = isAxiosError<{ code?: string }>(error)
        ? error.response?.data?.code
        : undefined;

      if (code === 'MEDICATION_409_1') {
        setIsDuplicate(true);
      } else {
        setSaveError(DEFAULT_SAVE_ERROR);
      }
    } finally {
      setIsSaving(false);
    }
  };

  return {
    passport,
    medicines,
    openIndexes,
    isComplete,
    isSaving,
    isSaved,
    savedMedicineNames,
    isDuplicate,
    saveError,
    updatePassport,
    updateMedicineQuantity,
    toggleMedicine,
    removeMedicine,
    clearDuplicate,
    save,
  };
};

export const DUPLICATE_MEDICINE_MESSAGE = DUPLICATE_MESSAGE;
