type InputButtonStatus = 'default' | 'success' | 'error';

type InputButtonProps = {
  value: string;
  onChange: (value: string) => void;
  onCheck: () => void;
  status?: InputButtonStatus;
  checkable?: boolean;
  placeholder?: string;
};

const STATUS_CLASSES: Record<
  InputButtonStatus,
  { box: string; text: string }
> = {
  default: { box: 'border-[#E2E2E2]', text: 'text-[#191919]' },
  success: { box: 'border-[#23408F]', text: 'text-[#23408F]' },
  error: { box: 'border-[#EF5050] bg-[#EF5050]/20', text: 'text-[#EF5050]' },
};

const InputButton = ({
  value,
  onChange,
  onCheck,
  status = 'default',
  checkable = false,
  placeholder = '닉네임을 입력해 주세요',
}: InputButtonProps) => {
  const statusClasses = STATUS_CLASSES[status];

  return (
    <div
      className={`flex h-16 w-full items-center justify-between rounded-xl border-2 pr-3 pl-6 ${statusClasses.box}`}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`font-pretendard flex-1 text-[14px] leading-[1.4] font-semibold tracking-[0.336px] outline-none placeholder:text-[#848B9C] ${statusClasses.text}`}
      />
      {status !== 'error' && (
        <button
          type="button"
          className={`font-pretendard flex h-8 w-[74px] shrink-0 items-center justify-center rounded-[6px] text-[14px] leading-[1.6] tracking-[-0.35px] disabled:cursor-not-allowed ${
            checkable
              ? 'bg-[#23408F] text-[#FAFAF6]'
              : 'bg-[#E2E2E2] text-[#848B9C]'
          }`}
          onClick={onCheck}
          disabled={!checkable}
        >
          중복확인
        </button>
      )}
    </div>
  );
};

export default InputButton;
