import { useNavigate } from 'react-router-dom';

import questionMark from '@/assets/images/scan/questionMark.svg';
import BottomButton from '@/components/button/BottomButton';

type RecognitionHelpModalProps = {
  onRetry: () => void;
};

const CHECKLIST = [
  '글자가 선명하게 보이나요?',
  '평평한 바닥에서 찍었나요?',
  '빛 반사나 번짐이 없나요?',
];

const RecognitionHelpModal = ({ onRetry }: RecognitionHelpModalProps) => {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-[#161615]/68">
      <div className="w-full max-w-[402px] rounded-t-[30px] bg-[#FCFCFC] pt-[22px] pb-[30px]">
        <div className="flex justify-center">
          <div className="h-[4px] w-[60px] rounded-[100px] bg-[#E2E2E2]" />
        </div>

        <h2 className="mt-[20px] text-center font-Pretendard text-[20px] font-semibold tracking-[0.024em] text-[#191919]">
          확인해 보세요
        </h2>

        <div className="mt-[26px] flex flex-col gap-[12px] px-[26px]">
          {CHECKLIST.map((item) => (
            <div key={item} className="flex items-center gap-[10px]">
              <img src={questionMark} alt="" className="h-[22px] w-[22px]" />
              <p className="font-Pretendard text-[16px] tracking-[0.384px] text-[#191919]">
                {item}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-[26px] flex flex-col gap-[10px] px-[26px]">
          <BottomButton
            text="직접 입력하기"
            onClick={() => navigate('/manualInput')}
          />
          <button
            type="button"
            onClick={onRetry}
            className="w-full rounded-[20px] bg-[#23408F]/40 py-5"
          >
            <span className="font-Pretendard text-[18px] font-semibold tracking-[0.432px] text-[#FAFAF6]">
              다시 촬영하기
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecognitionHelpModal;
