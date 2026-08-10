import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import backButtonIcon from '@/assets/images/register/tripTicket/backButtonIcon.svg';
import loadingRing from '@/assets/images/register/lodingpage/loadingRing.svg';
import pufiLogo from '@/assets/images/register/lodingpage/lodingPUFI.svg';
import PageDots from './components/PageDots';

const TOTAL_STEPS = 3;
const CURRENT_STEP = 2;
const NAVIGATE_DELAY_MS = 2000;
// TODO: 규정 확인 결과 페이지가 만들어지면 실제 경로로 교체
const NEXT_PATH = '/registerResult';

type AirportSelection = {
  code: string;
  location: string;
};

type LodingPageState = {
  departure?: AirportSelection;
  arrival?: AirportSelection;
  travelPeriod?: string;
  medicineQuantities?: Record<string, number>;
};

const LodingPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = location.state as LodingPageState | null;

  const countryLabel =
    [navState?.departure?.location, navState?.arrival?.location]
      .filter(Boolean)
      .join(', ') || '일본, 대한민국';

  const handleBack = () => {
    navigate('/choiceMedicine', { state: navState });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate(NEXT_PATH, { replace: true, state: navState });
    }, NAVIGATE_DELAY_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex min-h-dvh w-full flex-col bg-[#FAFAF6] pb-10">
      <div className="relative flex items-center pt-16.5">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={handleBack}
          className="absolute left-0 flex h-6 w-6 items-center justify-center"
        >
          <img src={backButtonIcon} alt="" className="h-5 w-[10px]" />
        </button>

        <div className="flex flex-1 items-center justify-center">
          <PageDots total={TOTAL_STEPS} activeIndex={CURRENT_STEP} />
        </div>
      </div>

      <p className="font-Pretendard mt-10 text-[1.5rem] leading-[1.4] font-semibold tracking-[0.576px] text-[#191919]">
        국가별 규정을 확인하고 있어요
      </p>

      <p className="font-Pretendard mt-1.5 text-sm leading-[1.4] font-normal tracking-[0.336px] text-[#848B9C]">
        공공데이터 및 공식 기관 자료를 훑어보는 중이에요.
      </p>

      <div className="flex flex-1 flex-col items-center justify-center gap-9">
        <div className="relative flex size-45 items-center justify-center">
          <img
            src={loadingRing}
            alt=""
            className="absolute inset-0 size-full animate-spin [animation-duration:2s]"
          />
          <img src={pufiLogo} alt="" className="relative h-22 w-29.5" />
        </div>

        <p className="font-Pretendard text-sm leading-[1.4] font-normal tracking-[0.336px] text-[#767676]">
          {countryLabel} 규정 확인 중 ...
        </p>
      </div>
    </div>
  );
};

export default LodingPage;
