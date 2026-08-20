import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import backButtonIcon from '@/assets/images/register/tripTicket/backButtonIcon.svg';
import checkIcon from '@/assets/images/register/tripTicket/checkIcon.svg';
import nonCheckIcon from '@/assets/images/register/tripTicket/nonCheckIcon.svg';
import downArrowIcon from '@/assets/images/register/medicineDetail/downArrowIcon.svg';
import { PREPARATION_LEVEL_ICON } from '@/constants/preparationLevel';
import ChecklistBox from '@/pages/register/components/medicineDetailPage/components/button/ChecklistBox';
import SmallButton from '@/pages/register/components/selectMedicinePage/components/SmallButton';
import type {
  AirportSelection,
  TripMedicationResultItem,
} from '@/types/register';
import MedicineExplanationModal from './components/MedicineExplanationModal';

type MedicineResultState = {
  departure?: AirportSelection;
  arrival?: AirportSelection;
  travelPeriod?: string;
  medications?: TripMedicationResultItem[];
};

const MedicineResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = location.state as MedicineResultState | null;

  const [selectedItems, setSelectedItems] = useState<Record<number, boolean>>(
    {}
  );
  const [explanationTarget, setExplanationTarget] =
    useState<TripMedicationResultItem | null>(null);

  if (!navState || !navState.arrival || !navState.medications) {
    return <Navigate to="/register" replace />;
  }

  const medications = navState.medications;
  const hasSelection = Object.values(selectedItems).some(Boolean);

  const toggleSelected = (medicationId: number) => {
    setSelectedItems((prev) => ({
      ...prev,
      [medicationId]: !prev[medicationId],
    }));
  };

  const destinationLabel = navState.arrival
    ? `${navState.arrival.code}(${navState.arrival.location})`
    : '';

  return (
    <div className="flex min-h-full w-full flex-col bg-[#FAFAF6] pb-28">
      <div className="relative flex items-center pt-16.5">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={() => navigate('/choiceMedicine', { state: navState })}
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

      <div className="mt-7 flex flex-col gap-4.5">
        {medications.map((medication) => {
          const { medicationId, productKoName, preparationLevel } =
            medication;
          const isSelected = Boolean(selectedItems[medicationId]);
          const levelIcon = PREPARATION_LEVEL_ICON[preparationLevel];

          return (
            <ChecklistBox
              key={medicationId}
              title={
                <span className="flex items-center gap-2">
                  <img
                    src={levelIcon.src}
                    alt={levelIcon.alt}
                    className="size-11.5 shrink-0"
                  />
                  <span className="flex flex-col gap-1">
                    <span className="font-Pretendard text-base font-medium tracking-[0.384px] text-[#191919]">
                      {productKoName}
                    </span>
                    <span className="font-Pretendard text-sm tracking-[0.336px] text-[#191919]">
                      {medication.quantityCondition ?? levelIcon.alt}
                    </span>
                  </span>
                </span>
              }
              checked={isSelected}
              isOpen={explanationTarget?.medicationId === medicationId}
              onToggle={() => toggleSelected(medicationId)}
              onChevronClick={() => setExplanationTarget(medication)}
              checkIcon={
                <img
                  src={isSelected ? checkIcon : nonCheckIcon}
                  alt=""
                  className="size-6"
                />
              }
              chevronIcon={
                <img src={downArrowIcon} alt="" className="size-6" />
              }
            />
          );
        })}
      </div>

      <div className="flex-1" />

      <div className="fixed bottom-[max(20px,env(safe-area-inset-bottom))] left-1/2 z-20 flex w-[calc(100%-52px)] max-w-87.5 -translate-x-1/2 gap-2.5">
        <SmallButton
          text="나가기"
          variant="primary"
          onClick={() => navigate('/register')}
        />
        <SmallButton
          text="저장하기"
          variant="primary"
          disabled={!hasSelection}
          onClick={() =>
            navigate('/saveMedicine', {
              state: {
                ...navState,
                selectedMedications: medications.filter(
                  (medication) => selectedItems[medication.medicationId]
                ),
              },
            })
          }
        />
      </div>

      {explanationTarget && (
        <MedicineExplanationModal
          medication={explanationTarget}
          onClose={() => setExplanationTarget(null)}
        />
      )}
    </div>
  );
};

export default MedicineResultPage;
