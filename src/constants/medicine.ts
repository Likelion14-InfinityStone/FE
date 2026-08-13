export const MY_MEDICINES = [
  '콘서타 27mg',
  '슈다페드정',
  '나노텍정',
  '로라타딘 10mg',
] as const;

export const MEDICINE_INFO = {
  name: '콘서타 27mg',
  ingredient: 'Methylphenidate · 27mg',
  possessionQuantity: '7정',
  dosagePeriod: '30일분',
  destinationCountry: '일본',
} as const;

export type DestinationRuleStatus = 'warning' | 'safe';

type DestinationRule = {
  label: string;
  value: string;
  status: DestinationRuleStatus;
};

export const DESTINATION_RULES: readonly DestinationRule[] = [
  { label: '통제 성분 여부', value: '포함 (마약류)', status: 'warning' },
  { label: '수량 조건', value: '최대 30일분', status: 'warning' },
  { label: '영문 처방전', value: '필요', status: 'warning' },
  { label: '의사 소견서', value: '필요', status: 'warning' },
  { label: '사전 허가', value: '필요', status: 'warning' },
  { label: '세관 신고', value: '필요', status: 'warning' },
];

export const CHECKLIST_ITEMS = [
  { key: 'prescription', title: '영문 처방전', checked: false },
  { key: 'opinion', title: '의사 소견서', checked: false },
  { key: 'preApproval', title: '사전 허가 신청', checked: false },
] as const;

export type ChecklistItemKey = (typeof CHECKLIST_ITEMS)[number]['key'];

export const SUMMARY_REASON = {
  description:
    '메틸페니데이트 성분은 일본에서 마약류로 분류되어 사전허가(야칸쇼메이) 없이는 반입이 제한됩니다.',
  source: '출처: 일본 후생노동성 · 지방후생국',
  lastUpdated: '마지막 업데이트 확인 날짜 : 2026.08.21',
} as const;

export const DETAIL_TABS = [
  { key: 'destination', label: '목적지' },
  { key: 'checklist', label: '체크리스트' },
  { key: 'summary', label: '요약 근거' },
] as const;
