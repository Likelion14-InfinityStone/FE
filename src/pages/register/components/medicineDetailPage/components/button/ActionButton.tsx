type ActionButtonVariant = 'solid' | 'dashed';

type ActionButtonProps = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  variant?: ActionButtonVariant;
};

const VARIANT_CLASSES: Record<ActionButtonVariant, string> = {
  solid: 'border-2 border-[#23408F] font-semibold',
  dashed: 'border-2 border-dashed border-[#23408F] font-normal',
};

const ActionButton = ({
  label,
  icon,
  onClick,
  variant = 'solid',
}: ActionButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full h-[54px] flex items-center justify-center gap-[10px] p-[10px] bg-[#EAF0FF] rounded-[10px] text-[#23408F] text-sm tracking-[-0.5px] ${VARIANT_CLASSES[variant]}`}
    >
      <span className="w-6 h-6 flex">{icon}</span>
      {label}
    </button>
  );
};

export default ActionButton;
