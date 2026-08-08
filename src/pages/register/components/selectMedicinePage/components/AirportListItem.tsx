import planeActiveIcon from '@/assets/images/register/selectMedicinePage/planeActiveIcon.svg';
import planeInactiveIcon from '@/assets/images/register/selectMedicinePage/planeInactiveIcon.svg';

type AirportListItemProps = {
  airportName: string;
  airportCode: string;
  country: string;
  selected?: boolean;
  onClick?: () => void;
};

const AirportListItem = ({
  airportName,
  airportCode,
  country,
  selected = false,
  onClick,
}: AirportListItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-6 rounded-xl px-4.5 py-2.5 ${
        selected ? 'bg-[#EAF0FF]' : ''
      }`}
    >
      <img
        src={selected ? planeActiveIcon : planeInactiveIcon}
        alt=""
        className="size-6 shrink-0"
      />

      <div className="flex flex-col items-start">
        <span
          className={`font-Pretendard text-[1rem] leading-[1.6] font-semibold tracking-[-0.4px] ${
            selected ? 'text-[#23408F]' : 'text-[#191919]'
          }`}
        >
          {airportName} ({airportCode})
        </span>

        <span
          className={`font-Pretendard text-[0.875rem] leading-[23px] tracking-[-0.35px] ${
            selected ? 'text-[#23408F]' : 'text-[#5C5950]'
          }`}
        >
          공항 ㅣ {country}
        </span>
      </div>
    </button>
  );
};

export default AirportListItem;
