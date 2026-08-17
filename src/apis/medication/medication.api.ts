import { instance } from '@/apis/instance';
import type { ApiResultEnvelope } from '@/types/api.type';
import type {
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
