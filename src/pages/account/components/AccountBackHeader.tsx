import { useNavigate } from 'react-router-dom';

import backIcon from '@/assets/images/register/medicineDetail/backIcon.svg';

type AccountBackHeaderProps = {
  title: string;
};

const AccountBackHeader = ({ title }: AccountBackHeaderProps) => {
  const navigate = useNavigate();

  return (
    <div className="relative flex items-center pt-5">
      <button
        type="button"
        aria-label="뒤로가기"
        onClick={() => navigate(-1)}
        className="absolute left-0 flex h-6 w-6 items-center justify-center"
      >
        <img src={backIcon} alt="" className="h-5 w-[10px]" />
      </button>
      <p className="flex-1 text-center font-Pretendard text-[22px] font-semibold tracking-[0.528px] text-black">
        {title}
      </p>
    </div>
  );
};

export default AccountBackHeader;
