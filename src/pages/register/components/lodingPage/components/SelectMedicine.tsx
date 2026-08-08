import { useState } from 'react';

import SmallButton from '@/components/button/SmallButton';
import { MY_MEDICINES } from '@/constants/medicine';
import BackArrowIcon from '@/assets/images/onboard/backArrowIcon.svg';

import PageDots from './PageDots';
import MedicineChip from './MedicineChip';
import MedicineQuantityCard from './MedicineQuantityCard';

type SelectMedicineProps = {
  onBack: () => void;
  onNext: () => void;
};

const SelectMedicine = ({ onBack, onNext }: SelectMedicineProps) => {
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);

  const handleSelect = (name: string) => {
    setSelectedName(name);
    setQuantity(1);
  };

  return (
    <div className="flex min-h-dvh w-full flex-col gap-9.5 pt-7 pb-10">
      <button type="button" aria-label="뒤로 가기" onClick={onBack}>
        <img src={BackArrowIcon} alt="" />
      </button>

      <PageDots total={3} activeIndex={selectedName ? 1 : 0} />

      <p className="font-Pretendard text-[1.5rem] leading-[normal] font-semibold tracking-[0.576px] text-[#191919]">
        가져갈 약을 선택해 주세요
      </p>

      <div className="flex flex-col gap-4">
        <p className="font-Pretendard text-base leading-[normal] font-medium tracking-[0.384px] text-[#848B9C]">
          내 약 보관함
        </p>

        <div className="flex flex-wrap gap-2.5">
          {MY_MEDICINES.map((name) => (
            <MedicineChip
              key={name}
              label={name}
              variant={selectedName === name ? 'selected' : 'default'}
              onClick={() => handleSelect(name)}
            />
          ))}
          <MedicineChip label="+ 약 추가" variant="add" />
        </div>

        {selectedName && (
          <MedicineQuantityCard
            label={selectedName}
            quantity={quantity}
            onIncrease={() => setQuantity((prev) => prev + 1)}
            onDecrease={() => setQuantity((prev) => Math.max(1, prev - 1))}
          />
        )}
      </div>

      <div className="mt-auto flex gap-2.5">
        <SmallButton text="이전" variant="secondary" onClick={onBack} />
        <SmallButton
          text="다음"
          variant="primary"
          disabled={!selectedName}
          onClick={onNext}
        />
      </div>
    </div>
  );
};

export default SelectMedicine;
