export type DocumentStatus = '등록완료' | '갱신필요' | '미발급';

export type MedicineDocument = {
  title: string;
  issuedAt?: string;
  expiresAt?: string;
  status: DocumentStatus;
};

export const MEDICINE_DOCUMENTS: MedicineDocument[] = [
  {
    title: '영문처방전',
    issuedAt: '2026.07.11',
    expiresAt: '2026.08.21',
    status: '등록완료',
  },
  {
    title: '의사 소견서',
    issuedAt: '2023.02.17',
    expiresAt: '2023.03.17',
    status: '갱신필요',
  },
  { title: '영문처방전', status: '미발급' },
];
