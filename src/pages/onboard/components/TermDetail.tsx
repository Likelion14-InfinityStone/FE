import BottomButton from '@/components/button/BottomButton';
import type { Term } from '@/constants/term';

import BackArrowIcon from '@/assets/images/onboard/backArrowIcon.svg';
import ActivateCheckIcon from '@/assets/images/onboard/activateCheckIcon.svg';
import InactivateCheckIcon from '@/assets/images/onboard/inactivateCheckIcon.svg';

interface TermDetailProps {
  term: Term;
  checked: boolean;
  onToggleAgreement: () => void;
  onClose: () => void;
}

const TermDetail = ({
  term,
  checked,
  onToggleAgreement,
  onClose,
}: TermDetailProps) => {
  return (
    <div className="flex min-h-dvh w-full flex-col pb-10 pt-7 gap-9.5">
      <img
        src={BackArrowIcon}
        alt="목록으로"
        className="self-start"
        onClick={onClose}
      />

      <p className="font-Pretendard text-[1.5rem] leading-[normal] font-semibold tracking-[-0.12px] text-[#000000]">
        {term.title}
      </p>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-3">
          <img
            src={checked ? ActivateCheckIcon : InactivateCheckIcon}
            onClick={onToggleAgreement}
            alt="동의 여부 체크"
          />
          <p className="text-[1.25rem] font-Pretendard font-medium tracking-[-0.1px] text-[#191919]">
            {term.title}
            <span className="text-[#23408F]"> (필수)</span>
          </p>
        </div>

        <div className="rounded-[20px] border border-[#D9D9D9] px-2.5 py-3">
          <p className="font-Pretendard text-[0.75rem] leading-[normal] tracking-[-0.06px] text-[#848B9C] whitespace-pre-line">
            {term.content}
          </p>
        </div>
      </div>

      <div className="mt-auto">
        <BottomButton text="확인" onClick={onClose} />
      </div>
    </div>
  );
};

export default TermDetail;
