import { useQuery } from '@tanstack/react-query';

import { fetchMedicationCards } from '@/apis/home/medicationCard.api';

const HOME_MEDICATION_CARD_PARAMS = { page: 0, size: 3 } as const;

export const useMedicationCards = () =>
  useQuery({
    queryKey: ['medicationCards', HOME_MEDICATION_CARD_PARAMS],
    queryFn: () => fetchMedicationCards(HOME_MEDICATION_CARD_PARAMS),
    select: (response) => response.result,
  });
