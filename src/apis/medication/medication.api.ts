import { instance } from '@/apis/instance';
import type { ApiResultEnvelope } from '@/types/api.type';
import type {
  MedicationCandidateSearchResult,
  MedicationSaveRequest,
  MedicationSaveResult,
} from '@/types/medication/medication.type';

export const saveMedications = async (
  payload: MedicationSaveRequest
): Promise<ApiResultEnvelope<MedicationSaveResult>> => {
  const response = await instance.post<ApiResultEnvelope<MedicationSaveResult>>(
    '/api/medications',
    payload
  );

  return response.data;
};

export const searchMedicationCandidates = async (
  name: string
): Promise<ApiResultEnvelope<MedicationCandidateSearchResult>> => {
  const response = await instance.get<
    ApiResultEnvelope<MedicationCandidateSearchResult>
  >('/api/medications/candidates', { params: { name } });

  return response.data;
};
