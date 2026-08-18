import { useNavigate } from 'react-router-dom';

import rightButtonIcon from '@/assets/images/register/tripTicket/rightbuttonIcon.svg';
import { PREPARATION_LEVEL_ICON } from '@/constants/preparationLevel';
import type { PreparationLevel } from '@/types/register';

type MedicinePassportButtonProps = {
  tripId: number;
  tripMedicationId: number;
  productKoName: string;
  carryDays: number;
  preparationLevel: PreparationLevel;
};

const MedicinePassportButton = ({
  tripId,
  tripMedicationId,
  productKoName,
  carryDays,
  preparationLevel,
}: MedicinePassportButtonProps) => {
  const navigate = useNavigate();
  const levelIcon = PREPARATION_LEVEL_ICON[preparationLevel];

  return (
    <button
      type="button"
      onClick={() => navigate(`/medicineDetail/${tripId}/${tripMedicationId}`)}
      className="flex w-full items-center gap-4 rounded-2xl border border-[#848B9C] bg-[#FCFCFC] px-4 py-[10px] shadow-[0px_2px_2px_0px_rgba(113,112,113,0.2)]"
    >
      <img
        src={levelIcon.src}
        alt={levelIcon.alt}
        className="size-[46px] shrink-0"
      />
      <div className="flex flex-1 flex-col items-start gap-1">
        <p className="font-Pretendard text-[1rem] leading-[1.4] font-medium tracking-[0.384px] text-[#191919]">
          {productKoName}
        </p>
        <p className="font-Pretendard text-[0.875rem] leading-[1.4] tracking-[0.336px] text-[#191919]">
          소지 {carryDays}일분
        </p>
      </div>
      <img src={rightButtonIcon} alt="" className="h-[17px] w-[9px] shrink-0" />
    </button>
  );
};

export default MedicinePassportButton;
