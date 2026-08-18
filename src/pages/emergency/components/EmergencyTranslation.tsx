import TransitionIcon from '@/assets/images/sos/transitionIcon.svg';
import type { EmergencyTranslationData } from '@/constants/emergency';

interface EmergencyTranslationProps {
  data: EmergencyTranslationData;
}

const EmergencyTranslation = ({ data }: EmergencyTranslationProps) => {
  return (
    <div className="flex flex-col gap-3.5">
      <p className="font-Pretendard text-[1rem] leading-5.6 font-semibold text-[#191919]">
        현지어 설명문
      </p>

      <div className="relative flex flex-col gap-5 rounded-[20px] border border-[#23408F] px-3.75 py-6.5">
        <div className="flex items-center justify-between gap-4 px-5 text-center">
          <p className="px-5 py-2 font-Pretendard text-[1rem] font-semibold">
            {data.sourceLanguage}
          </p>
          <img src={TransitionIcon} alt="" />
          <p className="px-5 py-2 font-Pretendard text-[1rem] font-semibold">
            {data.targetLanguage}
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="whitespace-pre-line font-Pretendard font-regular text-[0.875rem] leading-5.5 text-[#191919]">
            {data.sourceText}
          </p>
          <div className="h-px w-full bg-[#E2E2E2]" />
          <p className="whitespace-pre-line font-Pretendard font-regular text-[0.875rem] leading-5.5 text-[#191919]">
            {data.translatedText || '현지어 번역을 준비 중입니다.'}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyTranslation;
