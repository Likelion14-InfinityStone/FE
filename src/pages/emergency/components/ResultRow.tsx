interface ResultRowProps {
  index: number;
  label: string;
  value?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const ResultRow = ({
  index,
  label,
  value,
  actionLabel,
  onAction,
}: ResultRowProps) => {
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

      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="flex h-7.5 w-22.5 shrink-0 items-center justify-center gap-2.5 rounded-xl bg-[#A1ADCC] px-3 py-1 font-Pretendard text-[0.8125rem] leading-4.5 font-medium whitespace-nowrap text-white"
        >
          {actionLabel}
          <span aria-hidden="true" className="text-[1.25rem] leading-none">
            →
          </span>
        </button>
      )}
    </div>
  );
};

export default ResultRow;
