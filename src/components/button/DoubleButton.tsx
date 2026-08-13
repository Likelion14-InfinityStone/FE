interface DoubleButtonItem {
  text: string;
  icon: string;
  backgroundColor: string;
  onClick: () => void;
}

interface DoubleButtonProps {
  leftButton: DoubleButtonItem;
  rightButton: DoubleButtonItem;
}

const DoubleButton = ({ leftButton, rightButton }: DoubleButtonProps) => {
  return (
    <div className="flex w-full gap-2">
      {[leftButton, rightButton].map(
        ({ text, icon, backgroundColor, onClick }) => (
          <button
            key={text}
            type="button"
            onClick={onClick}
            style={{ backgroundColor }}
            className="flex min-w-0 flex-1 items-center justify-center gap-1.5 rounded-[18px] py-5"
          >
            <img src={icon} alt="" className="shrink-0" />
            <p className="font-Pretendard text-[1.125rem] leading-6.3 font-semibold whitespace-nowrap text-[#FAFAF6]">
              {text}
            </p>
          </button>
        )
      )}
    </div>
  );
};

export default DoubleButton;
