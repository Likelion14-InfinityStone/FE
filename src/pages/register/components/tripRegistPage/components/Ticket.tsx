import AirplaneIcon from '@/assets/images/register/airplane.svg';
import ExampleJapan from '@/assets/images/register/Example-Japan.svg';

type TicketProps = {
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
};

const Ticket = ({
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
}: TicketProps) => {
  return (
    <div className="relative flex h-[120px] w-full overflow-hidden rounded-2xl drop-shadow-[0px_2px_1px_rgba(0,0,0,0.04)]">
      <div className="flex w-[90px] shrink-0 flex-col items-center justify-center gap-[18px] bg-[#23408F]">
        <span className="font-Pretendard text-[1.25rem] leading-[1.4] font-semibold tracking-[0.48px] text-[#FAFAF6]">
          {dDay}
        </span>
        <img src={flagImage} alt="" className="h-[30px] w-[46px]" />
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-1 bg-white px-4">
        <p className="font-Pretendard text-[0.75rem] leading-[1.4] font-semibold tracking-[0.288px] text-[#23408F]">
          {title}
        </p>

        <div className="flex w-full flex-col items-center gap-0.5">
          <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center gap-2">
            <span className="font-Pretendard text-center text-[0.75rem] leading-[1.4] tracking-[0.288px] text-[#6D6D6D]">
              {departureCountry}
            </span>
            <span className="w-20" />
            <span className="font-Pretendard text-center text-[0.75rem] leading-[1.4] tracking-[0.288px] text-[#6D6D6D]">
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
          <span className="font-Pretendard text-center text-[0.75rem] leading-[1.4] tracking-[0.288px] text-[#6D6D6D]">
            {departureLocation}
          </span>
          <span className="w-20" />
          <span className="font-Pretendard text-center text-[0.75rem] leading-[1.4] tracking-[0.288px] text-[#6D6D6D]">
            {arrivalLocation}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="font-Pretendard text-[0.75rem] leading-[1.4] tracking-[0.288px] text-[#6D6D6D]">
            출국 일자
          </span>
          <span className="font-Pretendard text-[0.75rem] leading-[1.4] font-medium tracking-[0.288px] text-[#191919]">
            {departureDate}
          </span>
        </div>
      </div>

      <span className="absolute -top-[13px] left-[90px] size-[26px] -translate-x-1/2 rounded-full bg-[#FAFAF6]" />
      <span className="absolute -bottom-[13px] left-[90px] size-[26px] -translate-x-1/2 rounded-full bg-[#FAFAF6]" />
    </div>
  );
};

export default Ticket;
