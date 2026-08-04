type BottomButtonVariant = 'primary' | 'kakao';

type BottomButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
  icon?: string;
  variant?: BottomButtonVariant;
};

const VARIANT_CLASSES: Record<
  BottomButtonVariant,
  { button: string; text: string }
> = {
  primary: {
    button: 'bg-[#23408F] disabled:bg-[#23408F]/40',
    text: 'text-[#FAFAF6]',
  },
  kakao: {
    button: 'bg-[#FFE812] disabled:bg-[#FFE812]/40',
    text: 'text-[#191919]',
  },
};

const BottomButton = ({
  text,
  onClick,
  disabled = false,
  icon,
  variant = 'primary',
}: BottomButtonProps) => {
  const variantClasses = VARIANT_CLASSES[variant];

  return (
    <button
      type="button"
      className={`flex w-full items-center justify-center gap-3 rounded-[20px] py-5 disabled:cursor-not-allowed ${variantClasses.button}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <img src={icon} alt="" />}
      <span
        className={`font-Pretendard text-[1.125rem] leading-6.3 font-semibold tracking-[0.4px] ${variantClasses.text}`}
      >
        {text}
      </span>
    </button>
  );
};

export default BottomButton;
