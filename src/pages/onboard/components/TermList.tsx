import BottomButton from '@/components/button/BottomButton';
import type { Term, TermId } from '@/constants/term';

import BackArrowIcon from '@/assets/images/onboard/backArrowIcon.svg';
import NextArrowIcon from '@/assets/images/onboard/nextArrowIcon.svg';
import ActivateCheckIcon from '@/assets/images/onboard/activateCheckIcon.svg';
import InactivateCheckIcon from '@/assets/images/onboard/inactivateCheckIcon.svg';

interface TermsListProps {
  terms: readonly Term[];
  agreedTermIds: TermId[];
  onToggleAgreement: (termId: TermId) => void;
  onSelectTerm: (termId: TermId) => void;
  onBack: () => void;
  onConfirm: () => void;
}

const TermsList = ({
  terms,
  agreedTermIds,
  onToggleAgreement,
  onSelectTerm,
  onBack,
  onConfirm,
}: TermsListProps) => {
  const hasAgreedToAll = agreedTermIds.length === terms.length;

  return (
    <div className="flex min-h-dvh w-full flex-col pb-10 pt-7 gap-9.5">
      <img
        src={BackArrowIcon}
        alt="뒤로 가기"
        className="self-start cursor-pointer"
        onClick={onBack}
      />

      <p className="text-[1.5rem] font-Pretendard leading-[normal] font-semibold tracking-[-0.12px] text-[#000000] whitespace-pre-line">
        {'서비스 이용을 위해\n정보 수집 약관에 동의해 주세요'}
      </p>

      <ul className="space-y-6.5">
        {terms.map((term) => {
          const checked = agreedTermIds.includes(term.id);

          return (
            <li key={term.id}>
              <div className="flex w-full items-center gap-3">
                <img
                  src={checked ? ActivateCheckIcon : InactivateCheckIcon}
                  className="cursor-pointer"
                  onClick={() => onToggleAgreement(term.id)}
                  alt="동의 여부 체크"
                />

                <p className="min-w-0 flex-1 text-[1.125rem] font-Pretendard leading-[normal] font-medium tracking-[-0.5px] text-[#191919]">
                  {term.title}
                  <span className="text-[#23408F]"> (필수)</span>
                </p>
                <img
                  src={NextArrowIcon}
                  alt="자세히 보기"
                  className="my-1 cursor-pointer"
                  onClick={() => onSelectTerm(term.id)}
                />
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-auto">
        <BottomButton
          text="동의하고 시작하기"
          disabled={!hasAgreedToAll}
          onClick={onConfirm}
        />
      </div>
    </div>
  );
};

export default TermsList;
