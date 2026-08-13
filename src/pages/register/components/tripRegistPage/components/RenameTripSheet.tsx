import { useRef, useState } from 'react';

import BottomButton from '@/components/button/BottomButton';
import BottomSheet from '@/components/layout/BottomSheet';

type RenameTripSheetProps = {
  currentName: string;
  isDuplicate: (name: string) => boolean;
  onClose: () => void;
  onSave: (name: string) => void;
};

const RenameTripSheet = ({
  currentName,
  isDuplicate,
  onClose,
  onSave,
}: RenameTripSheetProps) => {
  const [name, setName] = useState(currentName);
  const inputRef = useRef<HTMLInputElement>(null);

  const trimmedName = name.trim();
  const showDuplicateError =
    trimmedName !== currentName && isDuplicate(trimmedName);

  const handleSave = () => {
    if (!trimmedName || showDuplicateError) return;
    onSave(trimmedName);
  };

  return (
    <BottomSheet
      onClose={onClose}
      ariaLabel="여행 이름 수정하기"
      initialFocusRef={inputRef}
      panelClassName="rounded-t-[30px] bg-[#FCFCFC]"
    >
      <p className="mt-6 text-center font-Pretendard text-[1.25rem] font-semibold tracking-[-0.5px] text-[#42403A]">
        여행 이름 수정하기
      </p>

      <div className="mt-[30px] px-[26px]">
        <input
          ref={inputRef}
          value={name}
          onChange={(event) => setName(event.target.value)}
          className={`h-16 w-full rounded-[20px] border bg-[#FCFCFC] px-4 font-Pretendard text-[1rem] tracking-[0.384px] text-[#191919] outline-none ${
            showDuplicateError ? 'border-[#EF5050]' : 'border-[#23408F]'
          }`}
        />
        {showDuplicateError && (
          <p className="mt-2 font-Pretendard text-[0.8125rem] tracking-[0.288px] text-[#EF5050]">
            중복된 이름입니다. 다른 이름을 입력해 주세요.
          </p>
        )}
      </div>

      <div className="mt-[26px] px-[26px]">
        <BottomButton
          text="저장하기"
          onClick={handleSave}
          disabled={!trimmedName || showDuplicateError}
        />
      </div>
    </BottomSheet>
  );
};

export default RenameTripSheet;
