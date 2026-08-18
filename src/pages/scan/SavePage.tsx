import { useNavigate } from 'react-router-dom';

import backIcon from '@/assets/images/register/medicineDetail/backIcon.svg';
import doneStemp from '@/assets/images/scan/doneStemp.svg';
import BottomButton from '@/components/button/BottomButton';

type SavePageProps = {
  medicineNames: string[];
  skippedMedicineNames?: string[];
};

const summarize = (names: string[]) => {
  const [firstName, ...restNames] = names;
  return restNames.length > 0 ? `${firstName} 외 ${restNames.length}건` : firstName;
};

const SavePage = ({ medicineNames, skippedMedicineNames = [] }: SavePageProps) => {
  const navigate = useNavigate();
  const displayName = summarize(medicineNames);
  const hasSkipped = skippedMedicineNames.length > 0;

  return (
    <div className="flex min-h-dvh w-full flex-col bg-[#FAFAF6]">
      <div className="relative flex items-center pt-[22px]">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={() => navigate('/scan')}
          className="absolute left-[26px] flex h-6 w-6 items-center justify-center"
        >
          <img src={backIcon} alt="" className="h-5 w-[10px]" />
        </button>
        <p className="flex-1 text-center font-Pretendard text-[22px] font-semibold tracking-[0.528px] text-black">
          약 스캔
        </p>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center gap-[30px] px-[26px]">
        <img src={doneStemp} alt="저장 완료" className="h-[170px] w-[170px]" />

        <div className="flex flex-col items-center gap-[8px]">
          <p className="text-center font-Pretendard text-[20px] font-bold tracking-[0.48px] text-[#23408F]">
            {displayName}
          </p>
          <p className="text-center font-Pretendard text-[16px] leading-[24px] tracking-[-0.5px] text-[#191919]">
            복약 카드에 저장됐어요.
            <br />
            이제 여행을 준비할 때 이 약을 선택할 수 있어요.
          </p>

          {hasSkipped && (
            <p className="mt-[6px] text-center font-Pretendard text-[14px] leading-[22px] tracking-[-0.35px] text-[#848B9C]">
              {summarize(skippedMedicineNames)}은(는) 이미 등록되어 있어 이번
              저장에서 제외됐어요.
            </p>
          )}
        </div>
      </div>

      <div className="px-[26px] pb-[40px]">
        <BottomButton
          text="복약 카드로 이동"
          onClick={() => navigate('/home')}
        />
      </div>
    </div>
  );
};

export default SavePage;
