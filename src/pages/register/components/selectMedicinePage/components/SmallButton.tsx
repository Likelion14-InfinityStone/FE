type SmallButtonVariant = 'primary' | 'secondary';

type SmallButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  variant?: SmallButtonVariant;
};

const VARIANT_CLASSES: Record<SmallButtonVariant, string> = {
  primary: 'bg-[#23408F] disabled:bg-[#23408F]/40',
  secondary: 'bg-[#E2E2E2] disabled:bg-[#E2E2E2]/40',
};

const SmallButton = ({
  text,
  onClick,
  disabled = false,
  variant = 'primary',
}: SmallButtonProps) => {
  return (
    <button
      type="button"
      className={`flex-1 rounded-[20px] py-5 disabled:cursor-not-allowed ${VARIANT_CLASSES[variant]}`}
      onClick={onClick}
      disabled={disabled}
    >
      <span className="font-Pretendard text-[1.125rem] leading-6.3 font-semibold tracking-[0.432px] text-[#FAFAF6]">
        {text}
      </span>
    </button>
  );
};

export default SmallButton;
