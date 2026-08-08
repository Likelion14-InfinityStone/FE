import DropdownIcon from '@/assets/images/sos/dropdownIcon.svg';
import TransitionIcon from '@/assets/images/sos/transitionIcon.svg';

const JAPANESE_TEXT = `こんにちは。私は韓国から来た旅行者です。旅行中に服用していた薬を紛失しました。現在の体調は「問題ありません」。 この薬は健康管理のために服用しているものです。 同じ成分の薬を入手したいので、必要な対応についてご案内いただけますでしょうか。 この後、薬に関する書類と詳しい情報をお見せします。`;
const KOREAN_TEXT = `안녕하세요. 저는 대한민국에서 온 여행객입니다. 여행 중 복용하던 약을 분실했습니다. 지금 상황은 ‘괜찮음’ 상황입니다. 이 약은 제 건강 관리를 위해 복용하고 있는 약입니다. 동일한 성분의 약을 구하거나 필요한 조치를 안내받고 싶습니다. 제가 추가로 해당 약의 서류와 약 정보를 보여드릴게요.`;

const EmergencyTranslation = () => {
  return (
    <div className="flex flex-col gap-3.5">
      <p className="font-Pretendard text-[1rem] leading-5.6 font-semibold text-[#191919]">
        현지어 설명문
      </p>

      <div className="relative flex flex-col gap-5 rounded-[20px] border border-[#23408F] px-3.75 py-6.5">
        <div className="flex items-center justify-between gap-4 px-5 text-center">
          <p className="px-5 py-2 font-Pretendard text-[1rem] font-semibold">
            한국어
          </p>
          <img src={TransitionIcon} alt="" />
          <div className="flex items-center gap-2">
            <p className="px-5 py-2 font-Pretendard text-[1rem] font-semibold">
              일본어
            </p>
            <img src={DropdownIcon} alt="" className="h-1.875 w-3.75" />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="whitespace-pre-line font-Pretendard font-regular text-[0.875rem] leading-5.5 text-[#191919]">
            {KOREAN_TEXT}
          </p>
          <div className="h-px w-full bg-[#E2E2E2]" />
          <p className="whitespace-pre-line font-Pretendard font-regular text-[0.875rem] leading-5.5 text-[#191919]">
            {JAPANESE_TEXT}
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmergencyTranslation;
