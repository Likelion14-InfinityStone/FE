interface HeaderProps {
  title: string;
  actionIcon?: string;
  actionLabel?: string;
  onAction?: () => void;
}

const Header = ({ title, actionIcon, actionLabel, onAction }: HeaderProps) => {
  return (
    <div className="flex items-center justify-between pt-10">
      <p className="text-[#000000] font-Pretendard font-semibold text-[1.5rem] leading-8.5">
        {title}
      </p>
      {actionIcon && onAction && (
        <button type="button" aria-label={actionLabel} onClick={onAction}>
          <img src={actionIcon} alt="" className="h-6.5 w-6.5" />
        </button>
      )}
    </div>
  );
};

export default Header;
