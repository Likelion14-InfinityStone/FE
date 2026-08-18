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
  const parenIndex = label.indexOf('(');
  const beforeParen = parenIndex === -1 ? label : label.slice(0, parenIndex);
  const afterParen = parenIndex === -1 ? '' : label.slice(parenIndex);

  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-10.5 max-w-full items-center justify-center rounded-full px-4 py-2 text-center font-Pretendard text-base tracking-[-0.5px] break-words ${VARIANT_CLASSES[variant]}`}
    >
      {beforeParen}
      {afterParen && <wbr />}
      {afterParen}
    </button>
  );
};

export default MedicineChip;
