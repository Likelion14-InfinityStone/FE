type CheckNaionProps = {
  label: string;
  active?: boolean;
  onClick?: () => void;
};

const CheckNaion = ({ label, active = false, onClick }: CheckNaionProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-[42px] items-center justify-center rounded-[24px] px-4 py-2.5 font-Pretendard text-[1rem] leading-[1.4] tracking-[0.384px] ${
        active
          ? 'bg-[#23408F] text-[#FAFAF6]'
          : 'border-2 border-[#E2E2E2] text-[#848B9C] hover:border-[#23408F]'
      }`}
    >
      {label}
    </button>
  );
};

export default CheckNaion;
