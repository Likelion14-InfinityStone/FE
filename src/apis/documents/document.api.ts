import { instance } from '@/apis/instance';
import type { ApiResultEnvelope } from '@/types/api.type';
import type {
  DocumentDetailResult,
  DocumentDownloadResult,
  DocumentsMainResult,
  MedicationDocumentsResult,
} from '@/types/documents/document.type';

export const fetchDocumentsMain = async (): Promise<
  ApiResultEnvelope<DocumentsMainResult>
> => {
  const response =
    await instance.get<ApiResultEnvelope<DocumentsMainResult>>(
      '/api/documents'
    );

  return response.data;
};

export const createDocumentDownloadUrl = async (
  documentId: number
): Promise<ApiResultEnvelope<DocumentDownloadResult>> => {
  const response = await instance.post<
    ApiResultEnvelope<DocumentDownloadResult>
  >(`/api/documents/${documentId}/download`);

  return response.data;
};

export const deleteDocument = async (
  documentId: number
): Promise<ApiResultEnvelope<null>> => {
  const response = await instance.delete<ApiResultEnvelope<null>>(
    `/api/documents/${documentId}`
  );

  return response.data;
};

export const fetchDocumentDetail = async (
  documentId: number
): Promise<ApiResultEnvelope<DocumentDetailResult>> => {
  const response = await instance.get<ApiResultEnvelope<DocumentDetailResult>>(
    `/api/documents/${documentId}`
  );

  return response.data;
};

export const fetchMedicationDocuments = async (
  medicationId: number
): Promise<ApiResultEnvelope<MedicationDocumentsResult>> => {
  const response = await instance.get<
    ApiResultEnvelope<MedicationDocumentsResult>
  >(`/api/medications/${medicationId}/documents`);

  return response.data;
};
