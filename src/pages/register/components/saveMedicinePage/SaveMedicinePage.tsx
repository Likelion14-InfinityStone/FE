import { useEffect, useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import backButtonIcon from '@/assets/images/register/tripTicket/backButtonIcon.svg';
import savePUFIIcon from '@/assets/images/register/tripTicket/savePUFIIcon.svg';
import BottomButton from '@/components/button/BottomButton';
import { createTrip } from '@/apis/register/trip.api';
import { COUNTRY_ALPHA3 } from '@/constants/airport';
import { parseTravelPeriod } from '@/utils/dDay';
import type {
  AirportSelection,
  CreateTripRequest,
  CreateTripResult,
  TripMedicationResultItem,
} from '@/types/register';

type SaveMedicineState = {
  departure?: AirportSelection;
  arrival?: AirportSelection;
  travelPeriod?: string;
  medications?: TripMedicationResultItem[];
  selectedMedications?: TripMedicationResultItem[];
};

type SaveStatus = 'pending' | 'success' | 'error';

const cityOf = (location: string) => location.split(' / ').at(-1) ?? location;

const buildCreateTripPayload = (
  navState: SaveMedicineState
): CreateTripRequest | null => {
  const { departure, arrival, travelPeriod } = navState;
  const medications = navState.selectedMedications ?? [];
  const dateRange = parseTravelPeriod(travelPeriod);
  const originAlpha3 = departure ? COUNTRY_ALPHA3[departure.country] : undefined;
  const destinationAlpha3 = arrival
    ? COUNTRY_ALPHA3[arrival.country]
    : undefined;

  if (
    !departure ||
    !arrival ||
    !dateRange ||
    !originAlpha3 ||
    !destinationAlpha3 ||
    medications.length === 0
  ) {
    return null;
  }

  return {
    origin: {
      airportCode: departure.code,
      city: cityOf(departure.location),
      codeAlpha3: originAlpha3,
    },
    destination: {
      airportCode: arrival.code,
      city: cityOf(arrival.location),
      codeAlpha3: destinationAlpha3,
    },
    departOn: dateRange.departOn,
    returnOn: dateRange.returnOn,
    medications: medications.map((medication) => ({
      medicationId: medication.medicationId,
      carryDays: medication.quantity,
      preparationLevel: medication.preparationLevel,
      regulated: medication.regulated,
      categoryCode: medication.categoryCode,
      categoryName: medication.categoryName,
      quantityCondition: medication.quantityCondition,
      requirementTemplateIds: medication.requirements.map(
        (requirement) => requirement.templateId
      ),
    })),
  };
};

const SaveMedicinePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = location.state as SaveMedicineState | null;
  const requestRef = useRef<ReturnType<typeof createTrip> | null>(null);

  const [saveStatus, setSaveStatus] = useState<SaveStatus>('pending');
  const [savedTrip, setSavedTrip] = useState<CreateTripResult | null>(null);

  const destinationLabel = navState?.arrival
    ? `${navState.arrival.code}(${navState.arrival.location})`
    : '';

  const savedMedicines = navState?.selectedMedications ?? [];

  useEffect(() => {
    if (!navState) return;
    const payload = buildCreateTripPayload(navState);

    if (!payload) {
      Promise.resolve().then(() => setSaveStatus('error'));
      return;
    }

    if (!requestRef.current) {
      requestRef.current = createTrip(payload);
    }

    requestRef.current
      .then((response) => {
        if (!response.isSuccess || !response.result) {
          setSaveStatus('error');
          return;
        }

        setSavedTrip(response.result);
        setSaveStatus('success');
      })
      .catch(() => {
        setSaveStatus('error');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!navState || !navState.arrival) {
    return <Navigate to="/register" replace />;
  }

  const handleBack = () => {
    const savedIds = new Set(
      (navState?.selectedMedications ?? []).map(
        (medication) => medication.medicationId
      )
    );
    const remainingMedications = (navState?.medications ?? []).filter(
      (medication) => !savedIds.has(medication.medicationId)
    );

    navigate('/registerResult', {
      state: {
        departure: navState?.departure,
        arrival: navState?.arrival,
        travelPeriod: navState?.travelPeriod,
        medications: remainingMedications,
      },
    });
  };

  return (
    <div className="flex h-full w-full flex-col bg-[#FAFAF6] pb-10">
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

      {saveStatus === 'error' ? (
        <p className="font-Pretendard mt-8.5 text-center text-base font-medium tracking-[0.384px] text-[#EF5050]">
          저장에 실패했어요. 다시 시도해 주세요.
        </p>
      ) : (
        <p className="font-Pretendard mt-8.5 text-center text-xl leading-[1.4] font-bold tracking-[0.48px] text-[#23408F]">
          {savedMedicines.map((medication) => (
            <span key={medication.medicationId} className="block">
              {medication.productKoName}
            </span>
          ))}
          <span className="block">
            {saveStatus === 'success'
              ? `${savedTrip?.title ?? '새로운'} 체크로그함에 저장 완료!`
              : '저장하는 중이에요...'}
          </span>
        </p>
      )}

      <div className="flex-1" />

      <BottomButton text="나가기" onClick={() => navigate('/register')} />
    </div>
  );
};

export default SaveMedicinePage;
