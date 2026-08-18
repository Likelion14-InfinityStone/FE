import { useMutation, useQuery } from '@tanstack/react-query';

import {
  fetchTripMedications,
  previewTripMedications,
} from '@/apis/register/tripMedication.api';

export const tripMedicationKeys = {
  all: ['tripMedications'] as const,
  list: () => [...tripMedicationKeys.all, 'list'] as const,
};

export const useTripMedications = () =>
  useQuery({
    queryKey: tripMedicationKeys.list(),
    queryFn: fetchTripMedications,
    select: (response) => response.result.medications,
  });

export const useTripMedicationPreview = () =>
  useMutation({
    mutationFn: previewTripMedications,
  });
