type BottomButtonProps = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

const BottomButton = ({
  text,
  onClick,
  disabled = false,
}: BottomButtonProps) => {
  return (
    <button
      type="button"
      className="w-full rounded-[20px] bg-[#23408F] py-5 disabled:cursor-not-allowed disabled:bg-[#23408F]/40"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="font-Pretendard text-[1.125rem] leading-6.3 font-semibold tracking-[0.4px] text-[#FAFAF6]">
        {text}
      </span>
    </button>
  );
};

export default BottomButton;
