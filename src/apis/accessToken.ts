import { useAuthStore } from '@/stores/useAuthStore';

const getDevelopmentAccessToken = () => {
  if (!import.meta.env.DEV) return null;

  return import.meta.env.VITE_DEV_ACCESS_TOKEN?.trim() || null;
};

// 로그인 토큰을 우선 사용, 개발 환경에서만 VITE_DEV_ACCESS_TOKEN 사용
export const getAccessToken = () => {
  const loginAccessToken = useAuthStore.getState().accessToken?.trim();

  return loginAccessToken || getDevelopmentAccessToken();
};
