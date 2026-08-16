type DocumentActionButtonProps = {
  label: string;
  icon: string;
  tone: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
  disabled?: boolean;
};

const TONE_STYLES = {
  primary: 'bg-[#23408F]',
  secondary: 'bg-[#A4B0CD]',
  danger: 'bg-[#EF5050]',
} as const;

const DocumentActionButton = ({
  label,
  icon,
  tone,
  onClick,
  disabled = false,
}: DocumentActionButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || !onClick}
      className={`flex py-5 w-full items-center justify-center gap-2.5 rounded-xl disabled:cursor-not-allowed ${TONE_STYLES[tone]}`}
    >
      <img src={icon} alt="" />
      <p className="font-Pretendard text-[1rem] font-semibold text-[#FAFAF6]">
        {label}
      </p>
    </button>
  );
};

export default DocumentActionButton;
