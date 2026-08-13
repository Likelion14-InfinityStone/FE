import { useEffect, useRef } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import backButtonIcon from '@/assets/images/register/tripTicket/backButtonIcon.svg';
import savePUFIIcon from '@/assets/images/register/tripTicket/savePUFIIcon.svg';
import BottomButton from '@/components/button/BottomButton';
import { useSavedTrips } from '@/hooks/useSavedTrips';
import type { Trip } from '@/constants/trip';
import type { AirportSelection } from '@/types/register';

type SaveMedicineState = {
  departure?: AirportSelection;
  arrival?: AirportSelection;
  travelPeriod?: string;
  medicineQuantities?: Record<string, number>;
  selectedMedicines?: string[];
};

const SaveMedicinePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = location.state as SaveMedicineState | null;
  const { addTrip } = useSavedTrips();
  const hasSavedRef = useRef(false);

  const destinationLabel = navState?.arrival
    ? `${navState.arrival.code}(${navState.arrival.location})`
    : '';

  const savedMedicines = navState?.selectedMedicines ?? [];

  useEffect(() => {
    if (hasSavedRef.current || !navState?.arrival) return;
    hasSavedRef.current = true;

    const departureCountry = navState?.departure?.country ?? '';
    const arrivalCountry = navState?.arrival?.country ?? '';

    const medicines = Object.fromEntries(
      (navState?.selectedMedicines ?? []).map((name) => [
        name,
        navState?.medicineQuantities?.[name] ?? 1,
      ])
    );

    const trip: Trip = {
      id: Date.now(),
      country: arrivalCountry || '기타',
      title: `${arrivalCountry || '여행지'} 여행`,
      departureCode: navState?.departure?.code ?? '',
      departureCountry,
      departureLocation: navState?.departure?.location ?? '',
      arrivalCode: navState?.arrival?.code ?? '',
      arrivalCountry,
      arrivalLocation: navState?.arrival?.location ?? '',
      departureDate: navState?.travelPeriod ?? '',
      medicines,
    };

    addTrip(trip);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!navState || !navState.arrival) {
    return <Navigate to="/register" replace />;
  }

  const handleBack = () => {
    const remainingQuantities = Object.fromEntries(
      Object.entries(navState?.medicineQuantities ?? {}).filter(
        ([name]) => !(navState?.selectedMedicines ?? []).includes(name)
      )
    );

    navigate('/registerResult', {
      state: {
        departure: navState?.departure,
        arrival: navState?.arrival,
        travelPeriod: navState?.travelPeriod,
        medicineQuantities: remainingQuantities,
      },
    });
  };

  return (
    <div className="flex min-h-dvh w-full flex-col bg-[#FAFAF6] pb-10">
      <div className="relative flex items-center pt-16.5">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={handleBack}
          className="absolute left-0 flex h-6 w-6 items-center justify-center"
        >
          <img src={backButtonIcon} alt="" className="h-5 w-[10px]" />
        </button>

        <p className="font-Pretendard flex-1 text-center text-[1.375rem] font-semibold tracking-[0.528px] text-black">
          {destinationLabel}
        </p>
      </div>

      <p className="font-Pretendard mt-7.5 text-[1.5rem] leading-[1.4] font-semibold tracking-[0.576px] text-[#191919]">
        약 분석 결과
      </p>

      <img
        src={savePUFIIcon}
        alt=""
        className="mt-23 size-[170px] self-center"
      />

      <p className="font-Pretendard mt-8.5 text-center text-xl leading-[1.4] font-bold tracking-[0.48px] text-[#23408F]">
        {savedMedicines.map((name) => (
          <span key={name} className="block">
            {name}
          </span>
        ))}
        <span className="block">새로운 체크로그함에 저장 완료!</span>
      </p>

      <div className="flex-1" />

      <BottomButton text="나가기" onClick={() => navigate('/register')} />
    </div>
  );
};

export default SaveMedicinePage;
