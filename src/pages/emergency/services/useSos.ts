import { useMutation } from '@tanstack/react-query';
import { fetchSosContacts } from '@/apis/emergency/sos.api';

export const useSosContacts = () =>
  useMutation({
    mutationFn: fetchSosContacts,
  });
