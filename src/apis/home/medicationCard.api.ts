import { instance } from '@/apis/instance';
import type { ApiResultEnvelope } from '@/types/api.type';
import type {
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
