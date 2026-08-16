import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TermId } from '@/constants/term';

interface AuthState {
  accessToken: string | null;
  isLoggedIn: boolean;
  hasAgreedToTerms: boolean;
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
      hasAgreedToTerms: false,
      agreedTermIds: [],
      login: (accessToken) => set({ accessToken, isLoggedIn: true }),
      agreeToTerms: (termIds) =>
        set({ agreedTermIds: termIds, hasAgreedToTerms: true }),
      logout: () => set({ accessToken: null, isLoggedIn: false }),
    }),
    {
      name: 'auth-storage',
    }
  )
);
