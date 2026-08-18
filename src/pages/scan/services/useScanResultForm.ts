import { isAxiosError } from 'axios';
import { useState } from 'react';

import { saveMedications } from '@/apis/medication/medication.api';
import type { DoseUnit } from '@/types/home/medicationCard.type';
import type { MedicationCandidate } from '@/types/medication/medication.type';
import type {
  PassportDraft,
  QuantityField,
  ScanMedicationResult,
} from '@/types/scan/scan.type';

export const isMedicineDraftComplete = (
  medicine: ScanMedicationResult
): boolean =>
  medicine.productKoName.trim() !== '' &&
  medicine.mfdsProductCode.trim() !== '' &&
  medicine.productEnName.trim() !== '' &&
  medicine.intakesPerDay != null &&
  Number.isInteger(medicine.intakesPerDay) &&
  medicine.intakesPerDay >= 1 &&
  medicine.totalDays != null &&
  Number.isInteger(medicine.totalDays) &&
  medicine.totalDays >= 1 &&
  medicine.dosePerIntake != null &&
  medicine.dosePerIntake > 0;

export const EMPTY_MEDICATION_DRAFT: ScanMedicationResult = {
  mfdsProductCode: '',
  productKoName: '',
  productEnName: '',
  intakesPerDay: null,
  totalDays: null,
  dosePerIntake: null,
  doseUnit: 'TABLET',
};

export const EMPTY_PASSPORT_DRAFT: PassportDraft = {
  dispensedAt: '',
  issuer: '',
};

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

  const updateMedicineIdentity = (
    index: number,
    patch: Pick<
      ScanMedicationResult,
      'mfdsProductCode' | 'productKoName' | 'productEnName'
    >
  ) => {
    setMedicines((prev) =>
      prev.map((item, i) => (i === index ? { ...item, ...patch } : item))
    );
  };

  const updateMedicineName = (index: number, productKoName: string) => {
    updateMedicineIdentity(index, {
      mfdsProductCode: '',
      productKoName,
      productEnName: '',
    });
  };

  const selectMedicineCandidate = (
    index: number,
    candidate: MedicationCandidate
  ) => {
    updateMedicineIdentity(index, {
      mfdsProductCode: candidate.mfdsProductCode,
      productKoName: candidate.productKoName,
      productEnName: candidate.productEnName ?? '',
    });
  };

  const updateMedicineDoseUnit = (index: number, doseUnit: DoseUnit) => {
    setMedicines((prev) =>
      prev.map((item, i) => (i === index ? { ...item, doseUnit } : item))
    );
  };

  const addMedicine = () => {
    setMedicines((prev) => {
      setOpenIndexes((prevOpen) => new Set(prevOpen).add(prev.length));
      return [...prev, EMPTY_MEDICATION_DRAFT];
    });
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
    updateMedicineName,
    selectMedicineCandidate,
    updateMedicineDoseUnit,
    addMedicine,
    toggleMedicine,
    removeMedicine,
    clearDuplicate,
    save,
  };
};

export const DUPLICATE_MEDICINE_MESSAGE = DUPLICATE_MESSAGE;
