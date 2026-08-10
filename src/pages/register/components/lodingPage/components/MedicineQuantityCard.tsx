import PlusIcon from '@/assets/images/register/tripTicket/plusIcon.svg';
import MinusIcon from '@/assets/images/register/tripTicket/minusIcon.svg';

type MedicineQuantityCardProps = {
  label: string;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
};

const MedicineQuantityCard = ({
  label,
  quantity,
  onIncrease,
  onDecrease,
}: MedicineQuantityCardProps) => {
  const canDecrease = quantity > 1;

  return (
    <div className="flex w-full items-center justify-between rounded-[20px] border border-[#E2E2E2] bg-[#FCFCFC] px-6 py-5.5">
      <p className="font-Pretendard text-[1.125rem] font-medium tracking-[0.432px] text-[#6D6D6D]">
        {label}
      </p>

      <div className="flex items-center gap-5.5">
        <button
          type="button"
          aria-label="수량 감소"
          onClick={onDecrease}
          disabled={!canDecrease}
          className="flex size-4 items-center justify-center disabled:opacity-40"
        >
          <img src={MinusIcon} alt="" />
        </button>

        <span className="w-6.5 text-center font-Pretendard text-xl font-medium tracking-[0.48px] text-[#6D6D6D]">
          {quantity}
        </span>

        <button
          type="button"
          aria-label="수량 증가"
          onClick={onIncrease}
          className="flex size-4 items-center justify-center"
        >
          <img src={PlusIcon} alt="" />
        </button>
      </div>
    </div>
  );
};

export default MedicineQuantityCard;
