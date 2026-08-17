import { instance } from '@/apis/instance';
import type { ApiResultEnvelope } from '@/types/api.type';
import type {
  CreateTripRequest,
  CreateTripResult,
  MedicationDestinationDetail,
  TripChecklogResult,
  TripDetailResult,
  UpdateTripTitleResult,
} from '@/types/register';

export const fetchTripDetail = async (
  tripId: number
): Promise<ApiResultEnvelope<TripDetailResult>> => {
  const response = await instance.get<ApiResultEnvelope<TripDetailResult>>(
    `/api/trips/${tripId}`
  );

  return response.data;
};

export const fetchMedicationDestination = async (
  tripId: number,
  tripMedicationId: number
): Promise<ApiResultEnvelope<MedicationDestinationDetail>> => {
  const response = await instance.get<
    ApiResultEnvelope<MedicationDestinationDetail>
  >(`/api/trips/${tripId}/medications/${tripMedicationId}/destination`);

  return response.data;
};

export const fetchTripChecklog = async (
  countryCode?: string
): Promise<ApiResultEnvelope<TripChecklogResult>> => {
  const response = await instance.get<ApiResultEnvelope<TripChecklogResult>>(
    '/api/trips/checklog',
    { params: countryCode ? { country: countryCode } : undefined }
  );

  return response.data;
};

export const createTrip = async (
  payload: CreateTripRequest
): Promise<ApiResultEnvelope<CreateTripResult>> => {
  const response = await instance.post<ApiResultEnvelope<CreateTripResult>>(
    '/api/trips',
    payload
  );

  return response.data;
};

export const updateTripTitle = async (
  tripId: number,
  title: string
): Promise<ApiResultEnvelope<UpdateTripTitleResult>> => {
  const response = await instance.patch<
    ApiResultEnvelope<UpdateTripTitleResult>
  >(`/api/trips/${tripId}/title`, { title });

  return response.data;
};
