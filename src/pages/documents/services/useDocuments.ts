import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import {
  createDocumentDownloadUrl,
  deleteDocument,
  fetchDocumentDetail,
  fetchDocumentsMain,
  fetchMedicationDocuments,
} from '@/apis/documents/document.api';

export const documentKeys = {
  all: ['documents'] as const,
  main: () => [...documentKeys.all, 'main'] as const,
  medication: (medicationId: number) =>
    [...documentKeys.all, 'medication', medicationId] as const,
  detail: (documentId: number) =>
    [...documentKeys.all, 'detail', documentId] as const,
};

export const useDocumentsMain = () =>
  useQuery({
    queryKey: documentKeys.main(),
    queryFn: fetchDocumentsMain,
    select: (response) => response.result,
  });

export const useMedicationDocuments = (
  medicationId: number,
  enabled: boolean
) =>
  useQuery({
    queryKey: documentKeys.medication(medicationId),
    queryFn: () => fetchMedicationDocuments(medicationId),
    select: (response) => response.result,
    enabled,
  });

export const useDocumentDetail = (documentId: number, enabled: boolean) =>
  useQuery({
    queryKey: documentKeys.detail(documentId),
    queryFn: () => fetchDocumentDetail(documentId),
    select: (response) => response.result,
    enabled,
    refetchInterval: 4 * 60 * 1000,
  });

export const useDocumentDownload = () =>
  useMutation({
    mutationFn: createDocumentDownloadUrl,
  });

export const useDocumentDelete = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteDocument,
    onSuccess: (_response, documentId) => {
      queryClient.removeQueries({ queryKey: documentKeys.detail(documentId) });
      void queryClient.invalidateQueries({ queryKey: documentKeys.main() });
      void queryClient.invalidateQueries({
        queryKey: [...documentKeys.all, 'medication'],
      });
    },
  });
};
