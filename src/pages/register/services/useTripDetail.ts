import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';

import {
  deleteTrip,
  fetchMedicationBasis,
  fetchMedicationDestination,
  fetchTripChecklog,
  fetchTripDetail,
  fetchTripMedicationChecklist,
  updateTripMedicationChecklistItem,
  updateTripTitle,
  uploadChecklistDocument,
} from '@/apis/register/trip.api';
import type { ApiResultEnvelope } from '@/types/api.type';
import type { ChecklistDocumentType, TripDetailResult } from '@/types/register';

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

export const useDeleteTrip = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (tripId: number) => deleteTrip(tripId),
    onSuccess: (_response, tripId) => {
      queryClient.removeQueries({ queryKey: tripDetailKeys.detail(tripId) });
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

export const tripMedicationChecklistKeys = {
  all: ['tripMedicationChecklist'] as const,
  detail: (tripId: number, tripMedicationId: number) =>
    [...tripMedicationChecklistKeys.all, tripId, tripMedicationId] as const,
};

export const useTripMedicationChecklist = (
  tripId: number,
  tripMedicationId: number,
  enabled: boolean
) =>
  useQuery({
    queryKey: tripMedicationChecklistKeys.detail(tripId, tripMedicationId),
    queryFn: () => fetchTripMedicationChecklist(tripId, tripMedicationId),
    select: (response) => response.result,
    enabled,
    retry: false,
  });

export const useUpdateTripMedicationChecklistItem = (
  tripId: number,
  tripMedicationId: number
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      checklistItemId,
      done,
    }: {
      checklistItemId: number;
      done: boolean;
    }) =>
      updateTripMedicationChecklistItem(
        tripId,
        tripMedicationId,
        checklistItemId,
        done
      ),
    onSuccess: (response) => {
      queryClient.setQueryData(
        tripMedicationChecklistKeys.detail(tripId, tripMedicationId),
        response
      );
    },
  });
};

export const useUploadChecklistDocument = (
  tripId: number,
  tripMedicationId: number
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      checklistItemId,
      type,
      file,
    }: {
      checklistItemId: number;
      type: ChecklistDocumentType;
      file: File;
    }) =>
      uploadChecklistDocument(
        tripId,
        tripMedicationId,
        checklistItemId,
        type,
        file
      ),
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: tripMedicationChecklistKeys.detail(tripId, tripMedicationId),
      });
    },
  });
};

export const medicationBasisKeys = {
  all: ['medicationBasis'] as const,
  detail: (tripId: number, tripMedicationId: number) =>
    [...medicationBasisKeys.all, tripId, tripMedicationId] as const,
};

export const useMedicationBasis = (
  tripId: number,
  tripMedicationId: number,
  enabled: boolean
) =>
  useQuery({
    queryKey: medicationBasisKeys.detail(tripId, tripMedicationId),
    queryFn: () => fetchMedicationBasis(tripId, tripMedicationId),
    select: (response) => response.result,
    enabled,
    retry: false,
  });

export const tripChecklogKeys = {
  all: ['tripChecklog'] as const,
  list: (countryCode?: string) =>
    [...tripChecklogKeys.all, countryCode ?? null] as const,
  fullList: () => [...tripChecklogKeys.all, 'fullList'] as const,
};

export const useTripChecklog = (countryCode?: string) =>
  useQuery({
    queryKey: tripChecklogKeys.list(countryCode),
    queryFn: () => fetchTripChecklog(countryCode),
    select: (response) => response.result,
  });

export const useAllTrips = () =>
  useQuery({
    queryKey: tripChecklogKeys.fullList(),
    queryFn: async () => {
      const initialResponse = await fetchTripChecklog();
      const initialResult = initialResponse.result;
      const remainingCountries = initialResult.countries.filter(
        (country) => country.countryCode !== initialResult.selectedCountryCode
      );
      const countryResponses = await Promise.allSettled(
        remainingCountries.map((country) =>
          fetchTripChecklog(country.countryCode)
        )
      );
      const additionalTrips = countryResponses.flatMap((response) =>
        response.status === 'fulfilled' ? response.value.result.trips : []
      );
      const tripsById = new Map(
        [...initialResult.trips, ...additionalTrips].map((trip) => [
          trip.tripId,
          trip,
        ])
      );

      return [...tripsById.values()];
    },
  });
