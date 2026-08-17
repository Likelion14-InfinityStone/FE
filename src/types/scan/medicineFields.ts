import type { MedicineFields, PassportFields } from './scan.type';

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
