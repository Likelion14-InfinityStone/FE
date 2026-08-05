interface MedicineInfoProps {
  label: string;
  value: string;
}

const MedicineInfo = ({ label, value }: MedicineInfoProps) => {
  return (
    <div className="flex w-full items-center justify-between border-b border-[#6D6D6D] pb-0.25">
      <p className="font-Pretendard text-[0.875rem] leading-4.9 tracking-[0.3px] font-medium text-[#767676]">
        {label}
      </p>
      <p className="font-Pretendard text-[0.875rem] leading-4.9 tracking-[0.3px] font-medium text-[#000000] text-right">
        {value}
      </p>
    </div>
  );
};

export default MedicineInfo;
