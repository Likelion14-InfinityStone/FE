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
    <div className="flex min-h-full w-full flex-col pb-10 pt-7 gap-9.5">
      <button type="button" aria-label="뒤로 가기" onClick={onBack}>
        <img src={BackArrowIcon} alt="" />
      </button>

      <p className="text-[1.5rem] font-Pretendard leading-[normal] font-semibold tracking-[-0.12px] text-[#000000] whitespace-pre-line">
        {'서비스 이용을 위해\n정보 수집 약관에 동의해 주세요'}
      </p>

      <ul className="space-y-6.5">
        {terms.map((term) => {
          const checked = agreedTermIds.includes(term.id);

          return (
            <li key={term.id}>
              <div className="flex w-full items-center gap-3">
                <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => onToggleAgreement(term.id)}
                    className="peer sr-only"
                  />
                  <span className="rounded-full peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-[#23408F]">
                    <img
                      src={checked ? ActivateCheckIcon : InactivateCheckIcon}
                      alt=""
                    />
                  </span>
                  <span className="min-w-0 flex-1 text-[1.125rem] font-Pretendard leading-[normal] font-medium tracking-[-0.5px] text-[#191919]">
                    {term.title}
                    <span className="text-[#23408F]"> (필수)</span>
                  </span>
                </label>

                <button
                  type="button"
                  aria-label="자세히 보기"
                  className="my-1"
                  onClick={() => onSelectTerm(term.id)}
                >
                  <img src={NextArrowIcon} alt="" />
                </button>
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
