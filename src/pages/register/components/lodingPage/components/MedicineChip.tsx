type MedicineChipVariant = 'default' | 'selected' | 'add';

type MedicineChipProps = {
  label: string;
  variant?: MedicineChipVariant;
  onClick?: () => void;
};

const VARIANT_CLASSES: Record<MedicineChipVariant, string> = {
  default: 'border-2 border-[#E2E2E2] font-normal text-[#848B9C]',
  selected: 'bg-[#23408F] font-medium text-[#FAFAF6]',
  add: 'border-2 border-dashed border-[#23408F] bg-[#EAF0FF] font-normal text-[#848B9C]',
};

const MedicineChip = ({
  label,
  variant = 'default',
  onClick,
}: MedicineChipProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex h-10.5 shrink-0 items-center justify-center rounded-full px-4 font-Pretendard text-base tracking-[-0.5px] ${VARIANT_CLASSES[variant]}`}
    >
      {label}
    </button>
  );
};

export default MedicineChip;
