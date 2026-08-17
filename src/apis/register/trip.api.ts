import { instance } from '@/apis/instance';
import type { ApiResultEnvelope } from '@/types/api.type';
import type {
  ChecklistDocumentType,
  ChecklistDocumentUploadResult,
  CreateTripRequest,
  CreateTripResult,
  MedicationDestinationDetail,
  TripChecklogResult,
  TripDetailResult,
  TripMedicationChecklistResult,
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

export const fetchTripMedicationChecklist = async (
  tripId: number,
  tripMedicationId: number
): Promise<ApiResultEnvelope<TripMedicationChecklistResult>> => {
  const response = await instance.get<
    ApiResultEnvelope<TripMedicationChecklistResult>
  >(`/api/trips/${tripId}/medications/${tripMedicationId}/checklist`);

  return response.data;
};

export const updateTripMedicationChecklistItem = async (
  tripId: number,
  tripMedicationId: number,
  checklistItemId: number,
  done: boolean
): Promise<ApiResultEnvelope<TripMedicationChecklistResult>> => {
  const response = await instance.patch<
    ApiResultEnvelope<TripMedicationChecklistResult>
  >(
    `/api/trips/${tripId}/medications/${tripMedicationId}/checklist/${checklistItemId}`,
    { done }
  );

  return response.data;
};

export const uploadChecklistDocument = async (
  tripId: number,
  tripMedicationId: number,
  checklistItemId: number,
  type: ChecklistDocumentType,
  file: File
): Promise<ApiResultEnvelope<ChecklistDocumentUploadResult>> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await instance.post<
    ApiResultEnvelope<ChecklistDocumentUploadResult>
  >(
    `/api/trips/${tripId}/medications/${tripMedicationId}/checklist/${checklistItemId}/document`,
    formData,
    {
      params: { type },
      // instance의 기본 Content-Type(application/json)이 남아있으면 axios가
      // FormData를 JSON으로 직렬화해버려 서버가 멀티파트로 파싱하지 못함.
      // 헤더를 비워 브라우저가 boundary 포함 멀티파트 Content-Type을 설정하게 함.
      headers: { 'Content-Type': undefined },
    }
  );

  return response.data;
};
