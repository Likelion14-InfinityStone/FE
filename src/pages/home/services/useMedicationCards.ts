import { useQuery } from '@tanstack/react-query';

import {
  fetchMedicationCardDetail,
  fetchMedicationCards,
  fetchMedicationList,
} from '@/apis/home/medicationCard.api';
import type { MedicationCardLanguage } from '@/types/home/medicationCard.type';

const HOME_MEDICATION_CARD_PARAMS = { page: 0, size: 20 } as const;

export const medicationCardKeys = {
  all: ['medicationCards'] as const,
  page: () =>
    [...medicationCardKeys.all, 'page', HOME_MEDICATION_CARD_PARAMS] as const,
  list: () => [...medicationCardKeys.all, 'list'] as const,
  detail: (medicationId: number, lang: MedicationCardLanguage) =>
    [...medicationCardKeys.all, 'detail', medicationId, lang] as const,
};

export const useMedicationCards = () =>
  useQuery({
    queryKey: medicationCardKeys.page(),
    queryFn: () => fetchMedicationCards(HOME_MEDICATION_CARD_PARAMS),
    select: (response) => response.result,
  });

export const useMedicationList = (enabled: boolean) =>
  useQuery({
    queryKey: medicationCardKeys.list(),
    queryFn: fetchMedicationList,
    select: (response) => response.result.medications,
    enabled,
  });

export const useMedicationCardDetail = (
  medicationId: number,
  lang: MedicationCardLanguage,
  enabled: boolean
) =>
  useQuery({
    queryKey: medicationCardKeys.detail(medicationId, lang),
    queryFn: () => fetchMedicationCardDetail(medicationId, lang),
    select: (response) => response.result,
    enabled,
  });
