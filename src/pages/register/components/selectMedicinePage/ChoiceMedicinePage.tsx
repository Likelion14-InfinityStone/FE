import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import backButtonIcon from '@/assets/images/register/tripTicket/backButtonIcon.svg';
import { MY_MEDICINES } from '@/constants/medicine';
import MedicineChip from '@/pages/register/components/lodingPage/components/MedicineChip';
import MedicineQuantityCard from '@/pages/register/components/lodingPage/components/MedicineQuantityCard';
import SmallButton from './components/SmallButton';

const TOTAL_STEPS = 3;
const CURRENT_STEP = 1;

type AirportSelection = {
  code: string;
  location: string;
};

type ChoiceMedicineState = {
  departure?: AirportSelection;
  arrival?: AirportSelection;
  travelPeriod?: string;
  medicineQuantities?: Record<string, number>;
};

const ChoiceMedicinePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = location.state as ChoiceMedicineState | null;

  const [quantities, setQuantities] = useState<Record<string, number>>(
    navState?.medicineQuantities ?? {}
  );

  const handleBack = () => {
    navigate('/selectMedicine', {
      state: { ...navState, medicineQuantities: quantities },
    });
  };

  const selectedMedicines = MY_MEDICINES.filter((name) => name in quantities);

  const toggleMedicine = (name: string) => {
    setQuantities((prev) => {
      if (name in prev) {
        const next = { ...prev };
        delete next[name];
        return next;
      }

      return { ...prev, [name]: 1 };
    });
  };

  const handleIncrease = (name: string) => {
    setQuantities((prev) => ({ ...prev, [name]: prev[name] + 1 }));
  };

  const handleDecrease = (name: string) => {
    setQuantities((prev) => ({
      ...prev,
      [name]: Math.max(1, prev[name] - 1),
    }));
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

        <div className="flex flex-1 items-center justify-center gap-4.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
            <span
              key={index}
              className={`h-3 rounded-full ${
                index === CURRENT_STEP ? 'w-6 bg-[#23408F]' : 'w-3 bg-[#D9D9D9]'
              }`}
            />
          ))}
        </div>
      </div>

      <p className="font-Pretendard mt-10 text-[1.5rem] leading-[1.4] font-semibold tracking-[0.576px] text-[#191919]">
        가져갈 약을 선택해 주세요
      </p>

      <p className="font-Pretendard mt-9 text-base font-medium tracking-[0.384px] text-[#848B9C]">
        내 약 보관함
      </p>

      <div className="mt-4 flex flex-wrap gap-2.5">
        {MY_MEDICINES.map((name) => (
          <MedicineChip
            key={name}
            label={name}
            variant={name in quantities ? 'selected' : 'default'}
            onClick={() => toggleMedicine(name)}
          />
        ))}
        <MedicineChip label="+ 약 추가" variant="add" />
      </div>

      {selectedMedicines.length > 0 && (
        <div className="mt-6 flex flex-col gap-4">
          {selectedMedicines.map((name) => (
            <MedicineQuantityCard
              key={name}
              label={name}
              quantity={quantities[name]}
              onIncrease={() => handleIncrease(name)}
              onDecrease={() => handleDecrease(name)}
            />
          ))}
        </div>
      )}

      <div className="flex-1" />

      <div className="flex gap-2.5">
        <SmallButton text="이전" variant="secondary" onClick={handleBack} />
        <SmallButton
          text="다음"
          variant="primary"
          disabled={selectedMedicines.length === 0}
          onClick={() => {}}
        />
      </div>
    </div>
  );
};

export default ChoiceMedicinePage;
