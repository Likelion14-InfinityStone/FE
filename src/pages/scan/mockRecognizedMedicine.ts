import type { MedicineFormFields } from './components/MedicineInputCard';

// TODO: OCR API 연동 후 실제 인식 결과로 교체 (현재는 UI 확인용 목 데이터)
export const MOCK_RECOGNIZED_MEDICINE: MedicineFormFields = {
  name: '김피루',
  dispensedDate: '2026.07.01',
  issuer: '서울메디컬의원',
  productInfo: '로라타딘 10mg',
  frequency: '1일 1회',
  duration: '14일',
  dosePerTime: '1정',
};
