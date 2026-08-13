import calendarIcon from '@/assets/images/register/selectMedicinePage/calendarIcon.svg';

type DateSelectCardProps = {
  travelPeriod?: string;
  onClick?: () => void;
};

const DateSelectCard = ({ travelPeriod, onClick }: DateSelectCardProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[58px] w-full items-center justify-between rounded-[12px] border border-[#23408F] bg-[#FCFCFC] px-4"
    >
      <span
        className={`font-Pretendard text-[1rem] leading-[1.4] font-medium tracking-[0.384px] ${
          travelPeriod ? 'text-[#191919]' : 'text-[#848B9C]'
        }`}
      >
        {travelPeriod ?? '여행기간을 선택해 주세요'}
      </span>

      <img src={calendarIcon} alt="" className="size-[30px]" />
    </button>
  );
};

export default DateSelectCard;
