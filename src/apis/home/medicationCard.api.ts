import { instance } from '@/apis/instance';
import type { ApiResultEnvelope } from '@/types/api.type';
import type {
  MedicationCardDetailResult,
  MedicationCardLanguage,
  MedicationCardPageParams,
  MedicationCardPageResult,
} from '@/types/home/medicationCard.type';

export const fetchMedicationCards = async (
  params: MedicationCardPageParams = {}
): Promise<ApiResultEnvelope<MedicationCardPageResult>> => {
  const response = await instance.get<
    ApiResultEnvelope<MedicationCardPageResult>
  >('/api/medications/cards', { params });

  return response.data;
};

export const fetchMedicationCardDetail = async (
  medicationId: number,
  lang: MedicationCardLanguage = 'ko'
): Promise<ApiResultEnvelope<MedicationCardDetailResult>> => {
  const response = await instance.get<
    ApiResultEnvelope<MedicationCardDetailResult>
  >(`/api/medications/${medicationId}/card`, {
    params: { lang },
  });

  return response.data;
};
