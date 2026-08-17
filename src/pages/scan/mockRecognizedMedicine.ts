import type { MedicineFields, PassportFields } from './components/medicineFields.types';

// TODO: OCR API 연동 후 실제 인식 결과로 교체 (현재는 UI 확인용 목 데이터)
export const MOCK_RECOGNIZED_PASSPORT: PassportFields = {
  dispensedDate: '2026.07.01',
  issuer: '서울메디컬의원',
};

export const MOCK_RECOGNIZED_MEDICINES: MedicineFields[] = [
  {
    productInfo: '콘서타 27mg',
    frequency: '1일 1회',
    duration: '27일',
    dosePerTime: '1정',
  },
  {
    productInfo: '로라타딘 10mg',
    frequency: '1일 1회',
    duration: '14일',
    dosePerTime: '',
  },
];
