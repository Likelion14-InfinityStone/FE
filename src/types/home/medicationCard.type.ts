export type DoseUnit = 'TABLET' | 'CAPSULE' | 'PACKET' | 'ML' | 'DROP' | 'MG';

export interface ConnectedCountry {
  code: string;
  name: string;
}

export interface MedicationCardFront {
  productName: string;
}

export interface MedicationCardBack {
  productName: string;
  dispensedAt: string;
  issuer: string;
  ingredients: string[];
  contentMg: number | null;
  intakesPerDay: number;
  totalDays: number;
  dosePerIntake: number;
  doseUnit: DoseUnit;
  connectedCountries: ConnectedCountry[];
}

export interface MedicationCard {
  medicationId: number;
  front: MedicationCardFront;
  back: MedicationCardBack;
}

export interface MedicationCardPageResult {
  nickname: string;
  cards: MedicationCard[];
  page: number;
  size: number;
  hasNext: boolean;
  totalElements: number;
}

export interface MedicationCardDetailResult extends MedicationCard {
  nickname: string;
}

export interface MedicationCardPageParams {
  page?: number;
  size?: number;
}

export type MedicationCardLanguage = 'ko' | 'en';

export interface MedicationListItem {
  medicationId: number;
  productKoName: string;
}

export interface MedicationListResult {
  medications: MedicationListItem[];
}
