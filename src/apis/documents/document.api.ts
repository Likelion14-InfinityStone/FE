import { instance } from '@/apis/instance';
import type { ApiResultEnvelope } from '@/types/api.type';
import type {
  DocumentDetailResult,
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
