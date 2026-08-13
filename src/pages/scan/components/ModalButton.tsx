type ModalButtonProps = {
  text: string;
  onClick?: () => void;
};

const ModalButton = ({ text, onClick }: ModalButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-[64px] w-full items-center justify-start rounded-[15px] border border-[#23408F] bg-[#EAF0FF] px-[20px] py-[12px]"
    >
      <span className="font-Pretendard text-[16px] font-semibold leading-[140%] tracking-[0.024em] text-[#191919]">
        {text}
      </span>
    </button>
  );
};

export default ModalButton;
