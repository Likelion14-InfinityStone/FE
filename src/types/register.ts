import type { DoseUnit } from '@/types/home/medicationCard.type';

export interface AirportSelection {
  code: string;
  country: string;
  location: string;
}

export interface TripMedicationListItem {
  medicationId: number;
  productKoName: string;
}

export interface TripMedicationListResult {
  medications: TripMedicationListItem[];
}

export interface SelectedMedication {
  medicationId: number;
  productKoName: string;
  quantity: number;
}

export type PreparationLevel = 'ALLOWED' | 'PREP_REQUIRED' | 'NOT_ALLOWED';

export type MedicationRequirementKind = 'UPLOAD' | 'ACTION';

export interface MedicationRequirement {
  templateId: number;
  kind: MedicationRequirementKind;
  label: string;
  formUrl: string | null;
  description: string;
}

export interface TripMedicationPreviewItem {
  medicationId: number;
  productKoName: string;
  preparationLevel: PreparationLevel;
  regulated: boolean;
  categoryCode: string | null;
  categoryName: string | null;
  quantityCondition: string | null;
  requirements: MedicationRequirement[];
}

export interface TripMedicationPreviewResult {
  medications: TripMedicationPreviewItem[];
}

export interface TripMedicationResultItem extends TripMedicationPreviewItem {
  quantity: number;
}

export interface TripMedicationPreviewRequestMedication {
  medicationId: number;
  carryDays: number;
}

export interface TripMedicationPreviewRequest {
  destinationCodeAlpha3: string;
  medications: TripMedicationPreviewRequestMedication[];
}

export interface TripAirportInfo {
  airportCode: string;
  codeAlpha3: string;
  countryNameKo: string;
  city: string;
}

export interface TripDetailMedicationItem {
  tripMedicationId: number;
  medicationId: number;
  productKoName: string;
  carryDays: number;
  preparationLevel: PreparationLevel;
}

export interface TripDetailResult {
  tripId: number;
  title: string;
  dday: number;
  origin: TripAirportInfo;
  destination: TripAirportInfo;
  departOn: string;
  returnOn: string;
  medications: TripDetailMedicationItem[];
}

export interface MedicationDestinationDetail {
  tripMedicationId: number;
  medicationId: number;
  productKoName: string;
  ingredients: string[];
  contentMg: number | null;
  carryQuantity: number;
  carryQuantityUnit: DoseUnit;
  carryDays: number;
  destinationNameKo: string;
  regulated: boolean;
  categoryCode: string | null;
  categoryName: string | null;
  quantityCondition: string | null;
  requirements: MedicationRequirement[];
}

export interface TripAirportInput {
  airportCode: string;
  city: string;
  codeAlpha3: string;
}

export interface CreateTripMedicationInput {
  medicationId: number;
  carryDays: number;
  preparationLevel: PreparationLevel;
  regulated: boolean;
  categoryCode: string | null;
  categoryName: string | null;
  quantityCondition: string | null;
  requirementTemplateIds: number[];
}

export interface CreateTripRequest {
  title?: string;
  origin: TripAirportInput;
  destination: TripAirportInput;
  departOn: string;
  returnOn: string;
  medications: CreateTripMedicationInput[];
}

export interface CreateTripResultMedication {
  tripMedicationId: number;
  medicationId: number;
  productKoName: string;
  preparationLevel: PreparationLevel;
}

export interface CreateTripResult {
  tripId: number;
  title: string;
  medications: CreateTripResultMedication[];
}

export interface TripChecklogCountry {
  countryCode: string;
  nameKo: string;
}

export interface TripChecklogItem {
  tripId: number;
  title: string;
  dday: number;
  origin: TripAirportInfo;
  destination: TripAirportInfo;
  departOn: string;
  returnOn: string;
}

export interface TripChecklogResult {
  countries: TripChecklogCountry[];
  selectedCountryCode: string;
  trips: TripChecklogItem[];
}

export interface UpdateTripTitleResult {
  tripId: number;
  title: string;
}

export interface TripMedicationChecklistItem {
  checklistItemId: number;
  kind: MedicationRequirementKind;
  label: string;
  description: string;
  formUrl: string | null;
  done: boolean;
}

export interface TripMedicationChecklistResult {
  tripMedicationId: number;
  doneCount: number;
  totalCount: number;
  items: TripMedicationChecklistItem[];
}

export type ChecklistDocumentType = 'EN_PRESCRIPTION' | 'DOCTOR_NOTE';

export interface ChecklistDocumentUploadResult {
  documentId: number;
  checklistItemId: number;
  type: ChecklistDocumentType;
  originalFilename: string;
  fileSize: number;
  uploadedAt: string;
}
