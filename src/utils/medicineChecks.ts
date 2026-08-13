import type { SavedMedicine } from '@/hooks/useSavedMedicines';

export const findDuplicateMedicine = (
  medicines: SavedMedicine[],
  productInfo: string
): SavedMedicine | undefined =>
  medicines.find(
    (medicine) =>
      medicine.productInfo.trim() !== '' &&
      medicine.productInfo.trim() === productInfo.trim()
  );

export const isMedicineExpired = (
  dispensedDate: string,
  duration: string
): boolean => {
  const dispensed = new Date(dispensedDate.trim().replaceAll('.', '-'));
  const durationDays = Number(duration.match(/\d+/)?.[0]);

  if (Number.isNaN(dispensed.getTime()) || Number.isNaN(durationDays)) {
    return false;
  }

  const expiryDate = new Date(dispensed);
  expiryDate.setDate(expiryDate.getDate() + durationDays);

  return expiryDate.getTime() < Date.now();
};
