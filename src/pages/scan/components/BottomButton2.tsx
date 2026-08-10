type BottomButton2Props = {
  text: string;
  onClick?: () => void;
  disabled?: boolean;
};

const BottomButton2 = ({
  text,
  onClick,
  disabled = false,
}: BottomButton2Props) => {
  return (
    <button
      type="button"
      className="w-full rounded-[20px] bg-[#A4B0CD] py-5 disabled:cursor-not-allowed disabled:bg-[#23408F]/40"
      onClick={onClick}
      disabled={disabled}
    >
      <span className="font-Pretendard text-[1.125rem] leading-6.3 font-semibold tracking-[0.4px] text-[#FAFAF6]">
        {text}
      </span>
    </button>
  );
};

export default BottomButton2;
