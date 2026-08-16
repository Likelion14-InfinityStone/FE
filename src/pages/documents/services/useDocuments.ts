import { useQuery } from '@tanstack/react-query';

import {
  fetchDocumentsMain,
  fetchMedicationDocuments,
} from '@/apis/documents/document.api';

export const documentKeys = {
  all: ['documents'] as const,
  main: () => [...documentKeys.all, 'main'] as const,
  medication: (medicationId: number) =>
    [...documentKeys.all, 'medication', medicationId] as const,
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
