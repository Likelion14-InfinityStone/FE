import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import backButtonIcon from '@/assets/images/register/tripTicket/backButtonIcon.svg';
import type { AirportSelection, SelectedMedication } from '@/types/register';
import MedicineChip from '@/pages/register/components/lodingPage/components/MedicineChip';
import MedicineQuantityCard from '@/pages/register/components/lodingPage/components/MedicineQuantityCard';
import PageDots from '@/pages/register/components/lodingPage/components/PageDots';
import { useTripMedications } from '@/pages/register/services/useTripMedications';
import SmallButton from './components/SmallButton';

const TOTAL_STEPS = 3;
const CURRENT_STEP = 1;

type ChoiceMedicineState = {
  departure?: AirportSelection;
  arrival?: AirportSelection;
  travelPeriod?: string;
  selectedMedications?: SelectedMedication[];
};

const ChoiceMedicinePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = location.state as ChoiceMedicineState | null;

  const { data: myMedications = [] } = useTripMedications();

  const [quantities, setQuantities] = useState<Record<number, number>>(() =>
    Object.fromEntries(
      (navState?.selectedMedications ?? []).map((medication) => [
        medication.medicationId,
        medication.quantity,
      ])
    )
  );

  const buildSelectedMedications = (
    quantityMap: Record<number, number>
  ): SelectedMedication[] =>
    myMedications
      .filter((medication) => medication.medicationId in quantityMap)
      .map((medication) => ({
        medicationId: medication.medicationId,
        productKoName: medication.productKoName,
        quantity: quantityMap[medication.medicationId],
      }));

  const handleBack = () => {
    navigate('/selectMedicine', {
      state: {
        ...navState,
        selectedMedications: buildSelectedMedications(quantities),
      },
    });
  };

  const selectedMedicines = myMedications.filter(
    (medication) => medication.medicationId in quantities
  );

  const toggleMedicine = (medicationId: number) => {
    setQuantities((prev) => {
      if (medicationId in prev) {
        const next = { ...prev };
        delete next[medicationId];
        return next;
      }

      return { ...prev, [medicationId]: 1 };
    });
  };

  const handleIncrease = (medicationId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [medicationId]: prev[medicationId] + 1,
    }));
  };

  const handleDecrease = (medicationId: number) => {
    setQuantities((prev) => ({
      ...prev,
      [medicationId]: Math.max(1, prev[medicationId] - 1),
    }));
  };

  const handleChangeQuantity = (medicationId: number, quantity: number) => {
    setQuantities((prev) => ({
      ...prev,
      [medicationId]: quantity,
    }));
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

        <div className="flex flex-1 items-center justify-center">
          <PageDots total={TOTAL_STEPS} activeIndex={CURRENT_STEP} />
        </div>
      </div>

      <p className="font-Pretendard mt-10 text-[1.5rem] leading-[1.4] font-semibold tracking-[0.576px] text-[#191919]">
        가져갈 약을 선택해 주세요
      </p>

      <p className="font-Pretendard mt-9 text-base font-medium tracking-[0.384px] text-[#848B9C]">
        내 약 보관함
      </p>

      <div className="mt-4 flex flex-wrap gap-2.5">
        {myMedications.map(({ medicationId, productKoName }) => (
          <MedicineChip
            key={medicationId}
            label={productKoName}
            variant={medicationId in quantities ? 'selected' : 'default'}
            onClick={() => toggleMedicine(medicationId)}
          />
        ))}
        <MedicineChip
          label="+ 약 추가"
          variant="add"
          onClick={() => navigate('/scan')}
        />
      </div>

      <p className="font-Pretendard mt-9 text-base font-medium tracking-[0.384px] text-[#848B9C]">
        복용 일수를 설정해 주세요
      </p>

      {selectedMedicines.length > 0 && (
        <div className="mt-6 flex flex-col gap-4">
          {selectedMedicines.map(({ medicationId, productKoName }) => (
            <MedicineQuantityCard
              key={medicationId}
              label={productKoName}
              quantity={quantities[medicationId]}
              onIncrease={() => handleIncrease(medicationId)}
              onDecrease={() => handleDecrease(medicationId)}
              onChangeQuantity={(quantity) =>
                handleChangeQuantity(medicationId, quantity)
              }
            />
          ))}
        </div>
      )}

      <div className="flex-1" />

      <div className="mt-6 flex gap-2.5">
        <SmallButton text="이전" variant="secondary" onClick={handleBack} />
        <SmallButton
          text="다음"
          variant="primary"
          disabled={selectedMedicines.length === 0}
          onClick={() =>
            navigate('/loding', {
              state: {
                ...navState,
                selectedMedications: buildSelectedMedications(quantities),
              },
            })
          }
        />
      </div>
    </div>
  );
};

export default ChoiceMedicinePage;
