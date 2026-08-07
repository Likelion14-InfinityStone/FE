type ChecklistBoxProps = {
  title: string;
  checked?: boolean;
  isOpen: boolean;
  checkIcon: React.ReactNode;
  chevronIcon: React.ReactNode;
  onToggle: () => void;
  children?: React.ReactNode;
};

const ChecklistBox = ({
  title,
  checked = true,
  isOpen,
  checkIcon,
  chevronIcon,
  onToggle,
  children,
}: ChecklistBoxProps) => {
  return (
    <div className="w-full box-border flex flex-col gap-5 p-5 bg-[#FCFCFC] border-2 border-[#23408F] rounded-[20px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.04)]">
      <button
        type="button"
        onClick={onToggle}
        className="h-6 w-full flex items-center justify-between"
      >
        <span className="w-6 h-6 shrink-0">{checkIcon}</span>
        <p
          className={`flex-1 ml-[10px] text-left font-medium text-base tracking-[0.384px] ${
            checked ? 'text-[#848B9C]' : 'text-[#191919]'
          }`}
        >
          {title}
        </p>
        <span
          className={`w-6 h-6 shrink-0 flex items-center justify-center transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          {chevronIcon}
        </span>
      </button>

      {isOpen && children}
    </div>
  );
};

export default ChecklistBox;
