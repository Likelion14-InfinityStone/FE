type BottomButtonProps = {
  text: string;
  onClick?: () => void;
};

const BottomButton = ({ text, onClick }: BottomButtonProps) => {
  return (
    <button
      type="button"
      className="w-full bg-[#23408F] py-5 rounded-[20px]"
      onClick={onClick}
    >
      <span className="font-[Pretendard] text-[1.125rem] leading-6.3 font-semibold text-[#FAFAF6]">
        {text}
      </span>
    </button>
  );
};

export default BottomButton;
