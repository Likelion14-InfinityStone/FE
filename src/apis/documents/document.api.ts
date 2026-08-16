import { instance } from '@/apis/instance';
import type { ApiResultEnvelope } from '@/types/api.type';
import type { DocumentsMainResult } from '@/types/documents/document.type';

export const fetchDocumentsMain = async (): Promise<
  ApiResultEnvelope<DocumentsMainResult>
> => {
  const response =
    await instance.get<ApiResultEnvelope<DocumentsMainResult>>(
      '/api/documents'
    );

  return response.data;
};
