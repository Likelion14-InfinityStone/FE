import type { DoseUnit } from '@/types/home/medicationCard.type';

export interface ScanMedicationResult {
  mfdsProductCode: string;
  productKoName: string;
  productEnName: string;
  intakesPerDay: number | null;
  totalDays: number | null;
  dosePerIntake: number | null;
  doseUnit: DoseUnit;
}

export interface ScanResult {
  dispensedAt: string | null;
  issuer: string | null;
  medications: ScanMedicationResult[];
}

export type MedicineFields = {
  productInfo: string;
  frequency: string;
  duration: string;
  dosePerTime: string;
};

export type PassportFields = {
  dispensedDate: string;
  issuer: string;
};

export type PassportDraft = {
  dispensedAt: string;
  issuer: string;
};

export type QuantityField = 'intakesPerDay' | 'totalDays' | 'dosePerIntake';
