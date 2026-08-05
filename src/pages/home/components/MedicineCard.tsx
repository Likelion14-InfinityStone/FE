import { useState } from 'react';
import MedicineCardBack from './MedicineCardBack';
import MedicineCardFront, {
  type MedicineCardFrontProps,
} from './MedicineCardFront';

type MedicineCardProps = MedicineCardFrontProps;

const MedicineCard = ({
  name,
  status,
  label,
  onRegister,
}: MedicineCardProps) => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      onClick={() => setIsFlipped((prev) => !prev)}
      className="mt-10 mx-auto w-70 h-125 cursor-pointer"
    >
      {isFlipped ? (
        <MedicineCardBack />
      ) : (
        <MedicineCardFront
          name={name}
          status={status}
          label={label}
          onRegister={onRegister}
        />
      )}
    </div>
  );
};

export default MedicineCard;
