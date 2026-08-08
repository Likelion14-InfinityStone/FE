import BackArrowIcon from '@/assets/images/onboard/backArrowIcon.svg';
import PufiLogo from '@/assets/images/register/lodingPUFI.svg';
import LoadingRing from '@/assets/images/travelRegister/loadingRing.svg';

import PageDots from './PageDots';

type CheckingRegulationsProps = {
  onBack: () => void;
  countryLabel: string;
};

const CheckingRegulations = ({
  onBack,
  countryLabel,
}: CheckingRegulationsProps) => {
  return (
    <div className="flex min-h-dvh w-full flex-col gap-9.5 pt-7 pb-10">
      <button type="button" aria-label="뒤로 가기" onClick={onBack}>
        <img src={BackArrowIcon} alt="" />
      </button>

      <PageDots total={3} activeIndex={2} />

      <div className="flex flex-col gap-2">
        <p className="font-Pretendard text-[1.5rem] leading-[normal] font-semibold tracking-[0.576px] text-[#191919]">
          국가별 규정을 확인하고 있어요
        </p>
        <p className="font-Pretendard text-sm leading-[normal] font-normal tracking-[0.336px] text-[#848B9C]">
          공공데이터 및 공식 기관 자료를 훑어보는 중이에요.
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-9">
        <div className="relative flex size-45 items-center justify-center">
          <img
            src={LoadingRing}
            alt=""
            className="absolute inset-0 size-full animate-spin [animation-duration:2s]"
          />
          <img src={PufiLogo} alt="" className="relative h-22 w-29.5" />
        </div>

        <p className="font-Pretendard text-sm leading-[normal] font-normal tracking-[0.336px] text-[#767676]">
          {countryLabel} 규정 확인 중 ...
        </p>
      </div>
    </div>
  );
};

export default CheckingRegulations;
