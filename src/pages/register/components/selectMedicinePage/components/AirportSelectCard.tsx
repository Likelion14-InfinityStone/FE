import switchIcon from '@/assets/images/register/tripTicket/switchIcon.svg';
import type { AirportSelection } from '@/types/register';

type AirportSelectCardProps = {
  departure?: AirportSelection;
  arrival?: AirportSelection;
  onSelectDeparture?: () => void;
  onSelectArrival?: () => void;
  onSwap?: () => void;
  flipped: boolean;
};

const AirportSelectCard = ({
  departure,
  arrival,
  onSelectDeparture,
  onSelectArrival,
  onSwap,
  flipped,
}: AirportSelectCardProps) => {
  return (
    <div className="relative flex h-24 w-full rounded-[20px] border border-[#23408F] bg-[#FCFCFC]">
      <button
        type="button"
        onClick={onSelectDeparture}
        className="flex flex-1 flex-col items-center justify-center"
      >
        {departure ? (
          <>
            <span className="font-Pretendard text-[1.25rem] leading-[1.4] font-semibold tracking-[0.48px] text-[#191919]">
              {departure.code}
            </span>
            <span className="font-Pretendard text-[1rem] leading-[1.4] tracking-[0.384px] text-[#6D6D6D]">
              {departure.location}
            </span>
          </>
        ) : (
          <span className="font-Pretendard text-[1.125rem] leading-[1.4] font-medium tracking-[0.432px] text-[#848B9C]">
            출발지
          </span>
        )}
      </button>

      <span className="w-px bg-[#23408F]" />

      <button
        type="button"
        onClick={onSelectArrival}
        className="flex flex-1 flex-col items-center justify-center"
      >
        {arrival ? (
          <>
            <span className="font-Pretendard text-[1.25rem] leading-[1.4] font-semibold tracking-[0.48px] text-[#191919]">
              {arrival.code}
            </span>
            <span className="font-Pretendard text-[1rem] leading-[1.4] tracking-[0.384px] text-[#6D6D6D]">
              {arrival.location}
            </span>
          </>
        ) : (
          <span className="font-Pretendard text-[1.125rem] leading-[1.4] font-medium tracking-[0.432px] text-[#848B9C]">
            도착지
          </span>
        )}
      </button>

      <button
        type="button"
        aria-label="출발지와 도착지 바꾸기"
        onClick={onSwap}
        className={`absolute top-1/2 left-1/2 flex size-12 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-[#23408F] bg-[#FCFCFC]
        ${flipped ? 'scale-x-[-1]' : 'scale-x-100'}`}
      >
        <img src={switchIcon} alt="" className="size-6" />
      </button>
    </div>
  );
};

export default AirportSelectCard;
