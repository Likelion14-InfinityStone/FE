import { instance } from '@/apis/instance';
import type { ApiResultEnvelope } from '@/types/api.type';
import type {
  TripMedicationListResult,
  TripMedicationPreviewRequest,
  TripMedicationPreviewResult,
} from '@/types/register';

export const fetchTripMedications = async (): Promise<
  ApiResultEnvelope<TripMedicationListResult>
> => {
  const response = await instance.get<
    ApiResultEnvelope<TripMedicationListResult>
  >('/api/trips/medications');

  return response.data;
};

export const previewTripMedications = async (
  payload: TripMedicationPreviewRequest
): Promise<ApiResultEnvelope<TripMedicationPreviewResult>> => {
  const response = await instance.post<
    ApiResultEnvelope<TripMedicationPreviewResult>
  >('/api/trips/analyze', payload);

  return response.data;
};
