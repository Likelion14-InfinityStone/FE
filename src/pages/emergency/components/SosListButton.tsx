import SosDetailButtonIcon from '@/assets/images/sos/sosDetailButtonIcon.svg';

interface SosListButtonProps {
  icon: string;
  label: string;
  onClick: () => void;
}

const SosListButton = ({ icon, label, onClick }: SosListButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex justify-between p-5 w-full items-center rounded-xl border-2 border-[#EF5050]"
    >
      <div className="flex gap-2">
        <img src={icon} alt="경고 아이콘" className="h-6 w-6 shrink-0" />
        <p className="font-Pretendard text-[1rem] leading-5.6 font-medium tracking-[0.4px] text-[#191919]">
          {label}
        </p>
      </div>

      <img src={SosDetailButtonIcon} />
    </button>
  );
};

export default SosListButton;
