import { useNavigate } from 'react-router-dom';

import stopStemp from '@/assets/images/register/medicineDetail/stopStemp.svg';
import rightButtonIcon from '@/assets/images/register/tripTicket/rightbuttonIcon.svg';

type MedicinePassportButtonProps = {
  name: string;
  quantity: number;
};

const MedicinePassportButton = ({
  name,
  quantity,
}: MedicinePassportButtonProps) => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate('/medicineDetail')}
      className="flex h-[74px] w-full items-center gap-4 rounded-2xl border border-[#848B9C] bg-[#FCFCFC] px-4 shadow-[0px_2px_2px_0px_rgba(113,112,113,0.2)]"
    >
      <img src={stopStemp} alt="" className="size-[46px] shrink-0" />
      <div className="flex flex-1 flex-col items-start gap-1">
        <p className="font-Pretendard text-[1rem] leading-[1.4] font-medium tracking-[0.384px] text-[#191919]">
          {name}
        </p>
        <p className="font-Pretendard text-[0.875rem] leading-[1.4] tracking-[0.336px] text-[#191919]">
          소지 {quantity}정
        </p>
      </div>
      <img src={rightButtonIcon} alt="" className="h-[17px] w-[9px] shrink-0" />
    </button>
  );
};

export default MedicinePassportButton;
