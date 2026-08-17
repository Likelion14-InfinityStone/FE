import { instance } from '@/apis/instance';
import type { ApiResultEnvelope } from '@/types/api.type';
import type { UserMeResult } from '@/types/account/account.type';

export const fetchUserMe = async (): Promise<
  ApiResultEnvelope<UserMeResult>
> => {
  const response =
    await instance.get<ApiResultEnvelope<UserMeResult>>('/api/users/me');

  return response.data;
};
