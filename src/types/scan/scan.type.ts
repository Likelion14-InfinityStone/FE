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
