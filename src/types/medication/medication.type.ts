import type { DoseUnit } from '@/types/home/medicationCard.type';

export interface MedicationSaveItem {
  mfdsProductCode: string;
  productKoName: string;
  productEnName: string;
  intakesPerDay: number;
  totalDays: number;
  dosePerIntake: number;
  doseUnit: DoseUnit;
}

export interface MedicationSaveRequest {
  dispensedAt: string;
  issuer: string;
  medications: MedicationSaveItem[];
}

export interface SavedMedicationSummary {
  medicationId: number;
  productKoName: string;
}

export interface MedicationSaveResult {
  medications: SavedMedicationSummary[];
}
