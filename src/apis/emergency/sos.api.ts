import { instance } from '@/apis/instance';
import type { ApiResultEnvelope } from '@/types/api.type';
import type {
  SosContactsRequest,
  SosContactsResult,
  SosScriptRequest,
  SosScriptResult,
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

export const translateSosScript = async (
  request: SosScriptRequest
): Promise<ApiResultEnvelope<SosScriptResult>> => {
  const response = await instance.post<ApiResultEnvelope<SosScriptResult>>(
    '/api/sos/scripts',
    request
  );

  return response.data;
};
