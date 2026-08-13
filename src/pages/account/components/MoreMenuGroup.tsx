import rightArrowIcon from '@/assets/images/account/rightArrowIcon.svg';

export type MoreMenuRow = {
  label: string;
  onClick?: () => void;
  showChevron?: boolean;
};

type MoreMenuGroupProps = {
  items: MoreMenuRow[];
};

const MoreMenuGroup = ({ items }: MoreMenuGroupProps) => {
  return (
    <div className="w-full overflow-hidden rounded-[20px] border border-[#23408F] bg-[#FCFCFC]">
      {items.map((item, index) => (
        <button
          key={item.label}
          type="button"
          onClick={item.onClick}
          className={`flex h-15 w-full items-center justify-between px-5.25 ${
            index !== items.length - 1 ? 'border-b border-[#23408F]' : ''
          }`}
        >
          <span className="font-Pretendard text-base tracking-[0.384px] text-[#191919]">
            {item.label}
          </span>
          {item.showChevron !== false && (
            <img src={rightArrowIcon} alt="" className="h-6 w-6" />
          )}
        </button>
      ))}
    </div>
  );
};

export default MoreMenuGroup;
