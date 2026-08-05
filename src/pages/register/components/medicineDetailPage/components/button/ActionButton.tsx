type ActionButtonProps = {
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
};

const ActionButton = ({ label, icon, onClick }: ActionButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full h-[54px] flex items-center justify-center gap-[10px] p-[10px] bg-[#EAF0FF] border-2 border-[#23408F] rounded-[10px] text-[#23408F] font-semibold text-sm tracking-[-0.5px]"
    >
      <span className="w-6 h-6 flex">{icon}</span>
      {label}
    </button>
  );
};

export default ActionButton;
