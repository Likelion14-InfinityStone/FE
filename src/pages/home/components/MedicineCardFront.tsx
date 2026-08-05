import HomePiruIcon from '@/assets/images/home/homePiruIcon.svg';

type MedicineCardStatus = 'unregistered' | 'registered';

export interface MedicineCardFrontProps {
  name: string;
  status: MedicineCardStatus;
  label?: string;
  onRegister?: () => void;
}

const MedicineCardFront = ({
  name,
  status,
  label,
  onRegister,
}: MedicineCardFrontProps) => {
  const isUnregistered = status === 'unregistered';
  const badge = isUnregistered
    ? { label: '미등록', bgClass: 'bg-[#EF5050]' }
    : { label, bgClass: 'bg-[#A1ADCC]' };

  return (
    <div className="flex h-full w-full flex-col gap-17.5 rounded-[20px] bg-[#23408F] px-6 pt-6 pb-7 shadow-[0_2px_2px_0_rgba(0,0,0,0.04)]">
      <div className={`w-fit rounded-xl px-2 py-1.5 ${badge.bgClass}`}>
        <p className="font-Pretendard text-[0.875rem] leading-4.9 font-semibold tracking-[0.3px] text-[#FAFAF6]">
          {badge.label}
        </p>
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <div className="flex flex-col gap-2.5">
            <p className="font-Pretendard text-[1.5rem] leading-8.4 font-semibold tracking-[0.6px] whitespace-pre-line text-[#FFFFFF]">
              {`안녕하세요,\n${name} 님`}
            </p>
            <p className="font-Pretendard text-[0.75rem] leading-4.9 font-regular tracking-[0.3px] text-[#FFFFFF]">
              탭해서 뒷면 확인
            </p>
          </div>
          <div className="flex flex-col gap-6.75">
            <img
              src={HomePiruIcon}
              alt=""
              className="-mx-1 w-60 max-w-none"
            />
            <p className="font-Pretendard text-[0.875rem] leading-4.9 font-regular tracking-[0.3px] text-[#FFFFFF]">
              본 카드는 복약정보 참고용이며, 처방전 · 의사 소견서 · 반입
              허가서를 대체하지 않습니다.
            </p>
          </div>
        </div>
        {isUnregistered && (
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onRegister?.();
            }}
            className="-mx-2.5 mt-5.5 flex h-11 items-center justify-center rounded-xl bg-[#A1ADCC] px-3.5 py-1.5"
          >
            <p className="font-Pretendard text-[0.875rem] leading-4.9 font-semibold tracking-[0.3px] text-[#FFFFFF]">
              등록하기
            </p>
          </button>
        )}
      </div>
    </div>
  );
};

export default MedicineCardFront;
