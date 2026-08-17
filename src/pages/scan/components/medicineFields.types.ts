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

export const REQUIRED_MEDICINE_FIELDS: (keyof MedicineFields)[] = [
  'productInfo',
  'frequency',
  'dosePerTime',
];

export const EMPTY_MEDICINE_FIELDS: MedicineFields = {
  productInfo: '',
  frequency: '',
  duration: '',
  dosePerTime: '',
};

export const EMPTY_PASSPORT_FIELDS: PassportFields = {
  dispensedDate: '',
  issuer: '',
};

export const isMedicineComplete = (medicine: MedicineFields): boolean =>
  REQUIRED_MEDICINE_FIELDS.every((field) => medicine[field].trim() !== '');
