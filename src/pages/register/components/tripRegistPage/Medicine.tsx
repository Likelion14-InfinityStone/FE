import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';

import { useSavedTrips } from '@/hooks/useSavedTrips';
import { formatDDay, formatIsoDate } from '@/utils/dDay';
import backIcon from '@/assets/images/register/medicineDetail/backIcon.svg';
import {
  useTripDetail,
  useUpdateTripTitle,
} from '@/pages/register/services/useTripDetail';
import Ticket from './components/Ticket';
import EditButton from './components/EditButton';
import DeleteButton from './components/DeleteButton';
import MedicinePassportButton from './components/MedicinePassportButton';
import RenameTripSheet from './components/RenameTripSheet';

type MedicineState = {
  tripId?: number;
};

const Medicine = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const tripId = (location.state as MedicineState | null)?.tripId;

  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const [renameError, setRenameError] = useState<string | null>(null);
  const { removeTrip } = useSavedTrips();

  const {
    data: trip,
    isPending,
    isError,
    error,
  } = useTripDetail(tripId ?? 0, Boolean(tripId));

  const updateTripTitleMutation = useUpdateTripTitle(tripId ?? 0);

  if (!tripId) {
    return <Navigate to="/register" replace />;
  }

  const handleDelete = () => {
    if (!window.confirm('이 여행을 삭제하시겠어요?')) return;
    removeTrip(tripId);
    navigate('/register');
  };

  const handleSaveRename = (name: string) => {
    setRenameError(null);
    updateTripTitleMutation.mutate(name, {
      onSuccess: () => setIsRenameOpen(false),
      onError: (mutationError) => {
        const status = (mutationError as AxiosError)?.response?.status;
        if (status === 409) {
          setRenameError('중복된 이름입니다. 다른 이름을 입력해 주세요.');
        } else {
          setRenameError('여행 이름을 수정하지 못했어요.');
        }
      },
    });
  };

  if (isPending) {
    return (
      <div className="flex min-h-dvh w-full items-center justify-center bg-[#FAFAF6]">
        <p className="font-Pretendard text-base text-[#848B9C]">
          여행 정보를 불러오는 중이에요...
        </p>
      </div>
    );
  }

  if (isError) {
    const status = (error as AxiosError)?.response?.status;
    const message =
      status === 403
        ? '본인 여행만 확인할 수 있어요.'
        : '여행을 찾을 수 없어요.';

    return (
      <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-4 bg-[#FAFAF6] px-6">
        <p className="font-Pretendard text-base text-[#848B9C]">{message}</p>
        <button
          type="button"
          onClick={() => navigate('/register')}
          className="font-Pretendard text-base font-semibold text-[#23408F]"
        >
          체크로그함으로 돌아가기
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-dvh w-full bg-[#FAFAF6] pb-10">
      <div className="relative flex items-center pt-5 pb-1">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={() => navigate(-1)}
          className="absolute left-0 flex h-6 w-6 items-center justify-center"
        >
          <img src={backIcon} alt="" className="h-5 w-[10px]" />
        </button>
        <p className="flex-1 text-center text-[22px] font-semibold tracking-[0.528px] text-black">
          여행 체크로그함
        </p>
      </div>

      <div className="relative mt-[68px]">
        <div className="absolute -top-[43px] right-0 z-10 flex gap-[10px]">
          <EditButton onClick={() => setIsRenameOpen(true)} />
          <DeleteButton onClick={handleDelete} />
        </div>
        <Ticket
          id={trip.tripId}
          dDay={formatDDay(trip.dday)}
          title={trip.title}
          departureCode={trip.origin.airportCode}
          departureCountry={trip.origin.countryNameKo}
          departureLocation={`${trip.origin.countryNameKo} / ${trip.origin.city}`}
          arrivalCode={trip.destination.airportCode}
          arrivalCountry={trip.destination.countryNameKo}
          arrivalLocation={`${trip.destination.countryNameKo} / ${trip.destination.city}`}
          departureDate={`${formatIsoDate(trip.departOn)} - ${formatIsoDate(trip.returnOn)}`}
          interactive={false}
        />
      </div>

      <div className="mt-[26px] flex flex-col gap-3">
        {trip.medications.map((medication) => (
          <MedicinePassportButton
            key={medication.tripMedicationId}
            tripId={tripId}
            tripMedicationId={medication.tripMedicationId}
            productKoName={medication.productKoName}
            carryDays={medication.carryDays}
            preparationLevel={medication.preparationLevel}
          />
        ))}
      </div>

      {isRenameOpen && (
        <RenameTripSheet
          currentName={trip.title}
          errorMessage={renameError}
          isSaving={updateTripTitleMutation.isPending}
          onClose={() => {
            setRenameError(null);
            setIsRenameOpen(false);
          }}
          onSave={handleSaveRename}
        />
      )}
    </div>
  );
};

export default Medicine;
