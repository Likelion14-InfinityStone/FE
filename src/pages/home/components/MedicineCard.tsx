import type { SavedMedicine } from '@/hooks/useSavedMedicines';
import MedicineCardBack from './MedicineCardBack';
import type { MedicineCardFrontProps } from './MedicineCardFront';
import MedicineCardFront from './MedicineCardFront';

type MedicineCardProps = MedicineCardFrontProps & {
  medicineName: string;
  isActive: boolean;
  isFlipped: boolean;
  onFlip: () => void;
  medicine?: SavedMedicine;
};

const MedicineCard = ({
  name,
  medicineName,
  status,
  label,
  onRegister,
  isActive,
  isFlipped,
  onFlip,
  medicine,
}: MedicineCardProps) => {
  return (
    <div
      onClick={() => {
        if (isActive) {
          onFlip();
        }
      }}
      className={`w-70 shrink-0 snap-center cursor-pointer overflow-hidden transition-[height,opacity] duration-300 ${
        isActive ? 'h-125 opacity-100' : 'h-100 opacity-55'
      }`}
    >
      {isFlipped ? (
        <MedicineCardBack medicine={medicine} />
      ) : (
        <MedicineCardFront
          name={name}
          status={status}
          label={label ?? medicineName}
          onRegister={onRegister}
          isCompact={!isActive}
        />
      )}
    </div>
  );
};

export default MedicineCard;
