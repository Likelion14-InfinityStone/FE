type DocumentActionButtonProps = {
  label: string;
  icon: string;
  tone: 'primary' | 'secondary' | 'danger';
  onClick?: () => void;
};

const TONE_STYLES = {
  primary: 'bg-[#23408F]',
  secondary: 'bg-[#A1ADCC]',
  danger: 'bg-[#EF5050]',
} as const;

const DocumentActionButton = ({
  label,
  icon,
  tone,
  onClick,
}: DocumentActionButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex py-4 w-full items-center justify-center gap-2.5 rounded-xl font-Pretendard text-[1rem] font-semibold text-white ${TONE_STYLES[tone]}`}
    >
      <img src={icon} alt="" />
      {label}
    </button>
  );
};

export default DocumentActionButton;
