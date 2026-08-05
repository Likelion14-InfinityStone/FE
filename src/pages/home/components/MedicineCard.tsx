import HomePiruIcon from '@/assets/images/home/homePiruIcon.svg';

type MedicineCardStatus = 'unregistered' | 'registered';

interface MedicineCardProps {
  name: string;
  status: MedicineCardStatus;
  label?: string;
  onRegister?: () => void;
}

const MedicineCard = ({
  name,
  status,
  label,
  onRegister,
}: MedicineCardProps) => {
  const isUnregistered = status === 'unregistered';
  const badge = isUnregistered
    ? { label: '미등록', bgClass: 'bg-[#EF5050]' }
    : { label, bgClass: 'bg-[#A1ADCC]' };

  return (
    <div className="flex flex-col mt-10 mx-auto w-70 h-125 px-6 pt-6 pb-7 gap-17.5 bg-[#23408F] rounded-[20px] shadow-[0_2px_2px_0_rgba(0,0,0,0.04)]">
      <div className={`w-fit px-2 py-1.5 rounded-xl ${badge.bgClass}`}>
        <p className="font-Pretendard text-[0.875rem] font-semibold text-[#FAFAF6] leading-4.9 tracking-[0.3px]">
          {badge.label}
        </p>
      </div>
      <div className="flex flex-col justify-between">
        <div>
          <div className="flex flex-col gap-2.5">
            <p className="font-Pretendard text-[1.5rem] font-semibold text-[#FFFFFF] leading-8.4 tracking-[0.6px] whitespace-pre-line">
              {`안녕하세요,\n${name} 님`}
            </p>
            <p className="font-Pretendard text-[0.75rem] font-regular text-[#FFFFFF] leading-4.9 tracking-[0.3px]">
              탭해서 뒷면 확인
            </p>
          </div>
          <div className="flex flex-col gap-6.75">
            <img src={HomePiruIcon} className="w-60 max-w-none -mx-1" />
            <p className="font-Pretendard text-[0.875rem] font-regular text-[#FFFFFF] leading-4.9 tracking-[0.3px]">
              본 카드는 복약정보 참고용이며, 처방전 · 의사 소견서 · 반입
              허가서를 대체하지 않습니다.
            </p>
          </div>
        </div>
        {isUnregistered && (
          <button
            type="button"
            onClick={onRegister}
            className="flex -mx-2.5 mt-5.5 h-11 px-3.5 py-1.5 rounded-xl bg-[#A1ADCC] justify-center items-center"
          >
            <p className="font-Pretendard text-[0.875rem] font-semibold text-[#FFFFFF] leading-4.9 tracking-[0.3px]">
              등록하기
            </p>
          </button>
        )}
      </div>
    </div>
  );
};

export default MedicineCard;
