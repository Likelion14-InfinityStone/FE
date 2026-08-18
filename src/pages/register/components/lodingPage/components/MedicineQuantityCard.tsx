import { useEffect, useState } from 'react';

import PlusIcon from '@/assets/images/register/tripTicket/plusIcon.svg';
import MinusIcon from '@/assets/images/register/tripTicket/minusIcon.svg';

type MedicineQuantityCardProps = {
  label: string;
  quantity: number;
  onIncrease: () => void;
  onDecrease: () => void;
  onChangeQuantity: (quantity: number) => void;
};

const MedicineQuantityCard = ({
  label,
  quantity,
  onIncrease,
  onDecrease,
  onChangeQuantity,
}: MedicineQuantityCardProps) => {
  const canDecrease = quantity > 1;
  const parenIndex = label.indexOf('(');
  const beforeParen = parenIndex === -1 ? label : label.slice(0, parenIndex);
  const afterParen = parenIndex === -1 ? '' : label.slice(parenIndex);

  const [inputValue, setInputValue] = useState(String(quantity));

  useEffect(() => {
    setInputValue(String(quantity));
  }, [quantity]);

  const commitInputValue = (raw: string) => {
    const parsed = Number(raw);
    const next = Number.isFinite(parsed) && parsed >= 1 ? Math.floor(parsed) : 1;
    onChangeQuantity(next);
    setInputValue(String(next));
  };

  return (
    <div className="flex w-full items-center justify-between gap-4 rounded-[20px] border border-[#E2E2E2] bg-[#FCFCFC] px-6 py-5.5">
      <p className="min-w-0 break-words font-Pretendard text-[1.125rem] font-medium tracking-[0.432px] text-[#6D6D6D]">
        {beforeParen}
        {afterParen && <br />}
        {afterParen}
      </p>

      <div className="flex shrink-0 items-center gap-5.5">
        <button
          type="button"
          aria-label="수량 감소"
          onClick={onDecrease}
          disabled={!canDecrease}
          className="flex size-4 items-center justify-center disabled:opacity-40"
        >
          <img src={MinusIcon} alt="" />
        </button>

        <input
          type="text"
          inputMode="numeric"
          aria-label="복용 일수"
          value={inputValue}
          onChange={(event) =>
            setInputValue(event.target.value.replace(/[^0-9]/g, ''))
          }
          onBlur={(event) => commitInputValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') event.currentTarget.blur();
          }}
          className="w-6.5 shrink-0 bg-transparent text-center font-Pretendard text-xl font-medium tracking-[0.48px] text-[#6D6D6D] outline-none"
        />

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
