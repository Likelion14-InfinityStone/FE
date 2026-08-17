export type SosSituation =
  | 'MEDICATION_LOST'
  | 'CUSTOMS_CHECK'
  | 'MEDICATION_SHORTAGE'
  | 'EMERGENCY_SYMPTOM';

export interface SosLocation {
  latitude: number;
  longitude: number;
}

export interface SosContactsRequest {
  situation: SosSituation;
  tripId: number;
  location: SosLocation | null;
}

export type SosContactType =
  'LOCAL_POLICE' | 'LOCAL_EMERGENCY' | 'EMBASSY' | 'MEDICAL_INFO';

export interface SosContact {
  order: number;
  type: SosContactType;
  name: string;
  phone: string;
  note: string | null;
}

export interface SosContactsResult {
  contacts: SosContact[];
}
