import { useQuery } from '@tanstack/react-query';

import { fetchDocumentsMain } from '@/apis/documents/document.api';

export const documentKeys = {
  all: ['documents'] as const,
  main: () => [...documentKeys.all, 'main'] as const,
};

export const useDocumentsMain = () =>
  useQuery({
    queryKey: documentKeys.main(),
    queryFn: fetchDocumentsMain,
    select: (response) => response.result,
  });
