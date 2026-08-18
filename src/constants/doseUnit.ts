import type { DoseUnit } from '@/types/home/medicationCard.type';

export const DOSE_UNIT_LABEL: Record<DoseUnit, string> = {
  TABLET: '정',
  CAPSULE: '캡슐',
  PACKET: '포',
  ML: 'mL',
  DROP: '방울',
  MG: 'mg',
};
