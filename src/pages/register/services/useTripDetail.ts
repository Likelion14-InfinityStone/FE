import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

import {
  fetchMedicationDestination,
  fetchTripChecklog,
  fetchTripDetail,
  updateTripTitle,
} from '@/apis/register/trip.api';
import type { ApiResultEnvelope } from '@/types/api.type';
import type { TripDetailResult } from '@/types/register';

export const tripDetailKeys = {
  all: ['tripDetail'] as const,
  detail: (tripId: number) => [...tripDetailKeys.all, tripId] as const,
};

export const useTripDetail = (tripId: number, enabled: boolean) =>
  useQuery({
    queryKey: tripDetailKeys.detail(tripId),
    queryFn: () => fetchTripDetail(tripId),
    select: (response) => response.result,
    enabled,
    retry: false,
  });

export const useUpdateTripTitle = (tripId: number) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (title: string) => updateTripTitle(tripId, title),
    onSuccess: (response) => {
      queryClient.setQueryData<ApiResultEnvelope<TripDetailResult>>(
        tripDetailKeys.detail(tripId),
        (previous) =>
          previous && {
            ...previous,
            result: { ...previous.result, title: response.result.title },
          }
      );
      void queryClient.invalidateQueries({ queryKey: tripChecklogKeys.all });
    },
  });
};

export const medicationDestinationKeys = {
  all: ['medicationDestination'] as const,
  detail: (tripId: number, tripMedicationId: number) =>
    [...medicationDestinationKeys.all, tripId, tripMedicationId] as const,
};

export const useMedicationDestination = (
  tripId: number,
  tripMedicationId: number,
  enabled: boolean
) =>
  useQuery({
    queryKey: medicationDestinationKeys.detail(tripId, tripMedicationId),
    queryFn: () => fetchMedicationDestination(tripId, tripMedicationId),
    select: (response) => response.result,
    enabled,
    retry: false,
  });

export const tripChecklogKeys = {
  all: ['tripChecklog'] as const,
  list: (countryCode?: string) =>
    [...tripChecklogKeys.all, countryCode ?? null] as const,
};

export const useTripChecklog = (countryCode?: string) =>
  useQuery({
    queryKey: tripChecklogKeys.list(countryCode),
    queryFn: () => fetchTripChecklog(countryCode),
    select: (response) => response.result,
  });
