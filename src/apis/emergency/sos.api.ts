import { instance } from '@/apis/instance';
import type { ApiResultEnvelope } from '@/types/api.type';
import type {
  SosContactsRequest,
  SosContactsResult,
} from '@/types/emergency/sos.type';

export const fetchSosContacts = async (
  request: SosContactsRequest
): Promise<ApiResultEnvelope<SosContactsResult>> => {
  const response = await instance.post<ApiResultEnvelope<SosContactsResult>>(
    '/api/sos/contacts',
    request
  );

  return response.data;
};
