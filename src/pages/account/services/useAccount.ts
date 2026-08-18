import { useQuery } from '@tanstack/react-query';

import { fetchUserMe } from '@/apis/account/account.api';

export const accountKeys = {
  all: ['account'] as const,
  me: () => [...accountKeys.all, 'me'] as const,
};

export const useUserMe = () =>
  useQuery({
    queryKey: accountKeys.me(),
    queryFn: fetchUserMe,
    select: (response) => response.result,
  });
