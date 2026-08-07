interface ResultRowProps {
  index: number;
  label: string;
  value?: string;
}

const ResultRow = ({ index, label, value }: ResultRowProps) => {
  return (
    <div className="flex items-center justify-between border-b border-[#E2E2E2] pb-0.5">
      <div className="flex gap-4.5">
        <p className="font-Pretendard text-[1rem] leading-5.6 font-medium text-[#6D6D6D]">
          {index}
        </p>
        <p className="font-Pretendard text-[1rem] leading-5.6 font-medium text-[#191919]">
          {label}
        </p>
      </div>

      {value && (
        <p className="font-Pretendard text-[1rem] leading-5.6 font-medium text-[#191919]">
          {value}
        </p>
      )}
    </div>
  );
};

export default ResultRow;
