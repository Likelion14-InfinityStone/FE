import { useMutation } from '@tanstack/react-query';
import { fetchSosContacts, translateSosScript } from '@/apis/emergency/sos.api';

export const useSosContacts = () =>
  useMutation({
    mutationFn: fetchSosContacts,
  });

export const useSosScriptTranslation = () =>
  useMutation({
    mutationFn: translateSosScript,
  });
