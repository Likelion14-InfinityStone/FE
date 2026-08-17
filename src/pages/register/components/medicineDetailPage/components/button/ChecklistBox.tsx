type ChecklistBoxProps = {
  title: React.ReactNode;
  checked?: boolean;
  isOpen: boolean;
  checkIcon: React.ReactNode;
  chevronIcon: React.ReactNode;
  onToggle: () => void;
  onChevronClick?: () => void;
  onCheckClick?: () => void;
  checkDisabled?: boolean;
  children?: React.ReactNode;
};

const ChecklistBox = ({
  title,
  checked = true,
  isOpen,
  checkIcon,
  chevronIcon,
  onToggle,
  onChevronClick,
  onCheckClick,
  checkDisabled,
  children,
}: ChecklistBoxProps) => {
  return (
    <div className="w-full box-border flex flex-col gap-5 p-5 bg-[#FCFCFC] border-2 border-[#23408F] rounded-[20px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.04)]">
      <div className="h-6 w-full flex items-center justify-between">
        <div className="flex min-w-0 flex-1 items-center">
          <button
            type="button"
            aria-label={checked ? '체크 해제' : '체크'}
            onClick={onCheckClick ?? onToggle}
            disabled={checkDisabled}
            className="w-6 h-6 shrink-0 disabled:opacity-60"
          >
            {checkIcon}
          </button>
          <button
            type="button"
            onClick={onToggle}
            className="min-w-0 flex-1 text-left"
          >
            <p
              className={`ml-[10px] font-medium text-base tracking-[0.384px] ${
                checked ? 'text-[#848B9C]' : 'text-[#191919]'
              }`}
            >
              {title}
            </p>
          </button>
        </div>

        <button
          type="button"
          aria-label="자세히 보기"
          onClick={onChevronClick ?? onToggle}
          className={`w-6 h-6 shrink-0 flex items-center justify-center transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          {chevronIcon}
        </button>
      </div>

      {isOpen && children}
    </div>
  );
};

export default ChecklistBox;
