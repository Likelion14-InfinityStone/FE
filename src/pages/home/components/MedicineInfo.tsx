interface MedicineInfoProps {
  label: string;
  value: string;
}

const MedicineInfo = ({ label, value }: MedicineInfoProps) => {
  return (
    <div className="flex w-full items-end gap-3 border-b border-[#6D6D6D] pb-px">
      <p className="shrink-0 whitespace-pre-line font-Pretendard text-[0.875rem] leading-4.9 tracking-[0.3px] font-medium text-[#767676]">
        {label}
      </p>
      <p className="min-w-0 flex-1 [overflow-wrap:anywhere] font-Pretendard text-[0.875rem] leading-4.9 tracking-[0.3px] font-medium text-[#000000] text-right">
        {value}
      </p>
    </div>
  );
};

export default MedicineInfo;
