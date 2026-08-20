import BackArrowIcon from '@/assets/images/onboard/backArrowIcon.svg';
import { useNavigate } from 'react-router-dom';

type PageHeaderProps = {
  title: string;
  onBack?: () => void;
};

const PageHeader = ({ title, onBack }: PageHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center pt-5.5 pb-5">
      <button
        type="button"
        onClick={onBack ?? (() => navigate(-1))}
        className="absolute left-0 items-center"
      >
        <img src={BackArrowIcon} alt="뒤로 가기" />
      </button>
      <p className="w-full truncate px-10 text-center font-Pretendard text-[1.375rem] leading-7.5 font-semibold text-[#191919]">
        {title}
      </p>
    </div>
  );
};

export default PageHeader;
