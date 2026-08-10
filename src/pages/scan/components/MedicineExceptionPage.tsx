import backIcon from '@/assets/images/register/medicineDetail/backIcon.svg';

type ExceptionButton = {
  text: string;
  onClick: () => void;
  primary?: boolean;
};

type MedicineExceptionPageProps = {
  stamp: string;
  title: string;
  subtitleLines: string[];
  buttons: ExceptionButton[];
  onBack: () => void;
};

const MedicineExceptionPage = ({
  stamp,
  title,
  subtitleLines,
  buttons,
  onBack,
}: MedicineExceptionPageProps) => {
  return (
    <div className="flex min-h-dvh w-full flex-col bg-[#FAFAF6]">
      <div className="relative flex items-center pt-[22px]">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={onBack}
          className="absolute left-[26px] flex h-6 w-6 items-center justify-center"
        >
          <img src={backIcon} alt="" className="h-5 w-[10px]" />
        </button>
        <p className="flex-1 text-center font-Pretendard text-[22px] font-semibold tracking-[0.528px] text-black">
          인식 결과 확인
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-[30px] px-[26px]">
        <img src={stamp} alt="" className="h-[170px] w-[170px]" />

        <div className="flex flex-col items-center gap-[8px]">
          <p className="text-center font-Pretendard text-[20px] font-bold tracking-[0.48px] text-[#EF5050]">
            {title}
          </p>
          <p className="text-center font-Pretendard text-[16px] leading-[24px] tracking-[-0.5px] text-[#191919]">
            {subtitleLines.map((line, index) => (
              <span key={line}>
                {line}
                {index < subtitleLines.length - 1 && <br />}
              </span>
            ))}
          </p>
        </div>
      </div>

      <div className="flex gap-[10px] px-[26px] pb-[40px]">
        {buttons.map((button) => (
          <button
            key={button.text}
            type="button"
            onClick={button.onClick}
            className={`h-[64px] flex-1 rounded-[20px] font-Pretendard text-[18px] font-semibold tracking-[0.432px] text-[#FAFAF6] ${
              button.primary ? 'bg-[#23408F]' : 'bg-[#E2E2E2]'
            }`}
          >
            {button.text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MedicineExceptionPage;
