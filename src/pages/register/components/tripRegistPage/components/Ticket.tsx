import { useNavigate } from 'react-router-dom';

import AirplaneIcon from '@/assets/images/register/tripTicket/airplane.svg';
import ExampleJapan from '@/assets/images/register/tripTicket/Example-Japan.svg';
import CalenderIcon from '@/assets/images/register/tripTicket/calenderIcon.svg';

type TicketProps = {
  id: number;
  dDay: string;
  title: string;
  flagImage?: string;
  departureCode: string;
  departureCountry: string;
  departureLocation: string;
  arrivalCode: string;
  arrivalCountry: string;
  arrivalLocation: string;
  departureDate: string;
  calenderIcon?: React.ReactNode;
  interactive?: boolean;
};

const Ticket = ({
  id,
  dDay,
  title,
  flagImage = ExampleJapan,
  departureCode,
  departureCountry,
  departureLocation,
  arrivalCode,
  arrivalCountry,
  arrivalLocation,
  departureDate,
  interactive = true,
}: TicketProps) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!interactive) return;

    navigate('/medicine', { state: { tripId: id } });
  };

  return (
    <div
      role={interactive ? 'button' : undefined}
      tabIndex={interactive ? 0 : undefined}
      onClick={interactive ? handleClick : undefined}
      onKeyDown={
        interactive
          ? (event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                handleClick();
              }
            }
          : undefined
      }
      className={`relative h-[120px] w-full ${
        interactive ? 'cursor-pointer' : ''
      }`}
    >
      <div className="flex h-full w-full overflow-hidden rounded-2xl drop-shadow-[0px_2px_1px_rgba(0,0,0,0.1)]">
        <div className="flex w-[90px] shrink-0 flex-col items-center justify-center gap-[18px] bg-[#23408F]">
          <span className="font-Pretendard text-[1.25rem] leading-[1.4] font-semibold tracking-[0.48px] text-[#FAFAF6]">
            {dDay}
          </span>

          <img src={flagImage} alt="" className="h-[30px] w-[46px]" />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-[0.2px] bg-white px-4">
          <p className="font-Pretendard text-[0.75rem] leading-[1.4] font-semibold tracking-[0.288px] text-[#23408F]">
            {title}
          </p>

          <div className="flex w-full flex-col items-center gap-0.2">
            <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2">
              <span className="font-Pretendard text-center text-[0.625rem] leading-[1.4] tracking-[0.24px] text-[#6D6D6D]">
                {departureCountry}
              </span>

              <span className="w-20" />

              <span className="font-Pretendard text-center text-[0.625rem] leading-[1.4] tracking-[0.24px] text-[#6D6D6D]">
                {arrivalCountry}
              </span>
            </div>

            <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2">
              <span className="font-Pretendard text-center text-[1.25rem] leading-[1.4] font-semibold tracking-[0.48px] text-[#191919]">
                {departureCode}
              </span>

              <div className="relative flex h-3.5 w-20 shrink-0 items-center">
                <div className="h-0 w-full border-t border-dashed border-[#23408F]" />

                <img
                  src={AirplaneIcon}
                  alt=""
                  className="absolute top-1/2 left-1/2 size-3.5 -translate-x-1/2 -translate-y-1/2"
                />
              </div>

              <span className="font-Pretendard text-center text-[1.25rem] leading-[1.4] font-semibold tracking-[0.48px] text-[#191919]">
                {arrivalCode}
              </span>
            </div>
          </div>

          <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2">
            <span className="font-Pretendard text-center text-[0.625rem] leading-[1.4] tracking-[0.24px] text-[#6D6D6D]">
              {departureLocation}
            </span>

            <span className="w-20" />

            <span className="font-Pretendard text-center text-[0.625rem] leading-[1.4] tracking-[0.24px] text-[#6D6D6D]">
              {arrivalLocation}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <img src={CalenderIcon} alt="" className="size-3.5" />

            <span className="font-Pretendard text-[0.75rem] leading-[1.4] font-medium tracking-[0.288px] text-[#191919]">
              {departureDate}
            </span>
          </div>
        </div>
      </div>
      <span className="pointer-events-none absolute -top-[13px] left-[90px] z-10 size-[26px] -translate-x-1/2 rounded-full bg-[#FAFAF6]" />
      <span className="pointer-events-none absolute -bottom-[13px] left-[90px] z-10 size-[26px] -translate-x-1/2 rounded-full bg-[#FAFAF6] shadow-[inset_0_3px_4px_-2px_rgba(0,0,0,0.25)]" />{' '}
    </div>
  );
};

export default Ticket;
