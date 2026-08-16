import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TermId } from '@/constants/term';

interface AuthState {
  accessToken: string | null;
  isLoggedIn: boolean;
  agreedTermIds: TermId[];
  login: (accessToken: string) => void;
  agreeToTerms: (termIds: TermId[]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      accessToken: null,
      isLoggedIn: false,
      agreedTermIds: [],
      login: (accessToken) => set({ accessToken, isLoggedIn: true }),
      agreeToTerms: (termIds) => set({ agreedTermIds: termIds }),
      logout: () => set({ accessToken: null, isLoggedIn: false }),
    }),
    {
      name: 'auth-storage',
      version: 1,
      migrate: (persistedState) => {
        const state = persistedState as Partial<AuthState>;

        return {
          accessToken: state.accessToken ?? null,
          isLoggedIn: state.isLoggedIn ?? false,
          agreedTermIds: state.agreedTermIds ?? [],
        } as AuthState;
      },
    }
  )
);
