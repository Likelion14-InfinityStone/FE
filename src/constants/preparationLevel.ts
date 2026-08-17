import readyStemp from '@/assets/images/register/medicineDetail/readyStemp.svg';
import ckeckStemp from '@/assets/images/register/medicineDetail/ckeckStemp.svg';
import stopStemp from '@/assets/images/register/medicineDetail/stopStemp.svg';
import type { PreparationLevel } from '@/types/register';

export const PREPARATION_LEVEL_ICON: Record<
  PreparationLevel,
  { src: string; alt: string }
> = {
  ALLOWED: { src: readyStemp, alt: '반입 가능' },
  PREP_REQUIRED: { src: ckeckStemp, alt: '서류 준비 필요' },
  NOT_ALLOWED: { src: stopStemp, alt: '반입 불가' },
};
