import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  accessToken: string | null;
  isLoggedIn: boolean;
  login: (accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isLoggedIn: false,
      login: (accessToken) => set({ accessToken, isLoggedIn: true }),
      logout: () => set({ accessToken: null, isLoggedIn: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
