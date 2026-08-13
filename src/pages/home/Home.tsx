import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/layout/Header';
import SosButton from '@/components/button/SosButton';
import { useSavedMedicines } from '@/hooks/useSavedMedicines';
import type { SavedMedicine } from '@/hooks/useSavedMedicines';
import MedicineCard from './components/MedicineCard';

const CARD_STEP = 298;

// 임시 카드 목록
const MOCK_MEDICINE_CARDS: {
  id: number;
  name: string;
  status: 'unregistered';
  medicine?: SavedMedicine;
}[] = [
  { id: 1, name: '피루피루', status: 'unregistered' },
  { id: 2, name: '피루피루', status: 'unregistered' },
  { id: 3, name: '피루피루', status: 'unregistered' },
];

const Home = () => {
  const navigate = useNavigate();
  const { savedMedicines } = useSavedMedicines();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);

  const medicineCards = [
    ...MOCK_MEDICINE_CARDS,
    ...savedMedicines.map((medicine) => ({
      id: medicine.id,
      name: medicine.name,
      status: 'unregistered' as const,
      medicine,
    })),
  ];

  return (
    <div className="w-full h-full">
      <Header title="복약 카드" />
      <div
        onScroll={(event) => {
          const nextIndex = Math.round(
            event.currentTarget.scrollLeft / CARD_STEP
          );
          const boundedIndex = Math.min(
            Math.max(nextIndex, 0),
            medicineCards.length - 1
          );

          if (boundedIndex !== activeCardIndex) {
            setActiveCardIndex(boundedIndex);
            setFlippedCardId(null);
          }
        }}
        className="-mx-6.5 mt-10 flex h-125 w-[calc(100%+52px)] snap-x snap-mandatory items-center gap-4.5 overflow-x-auto px-[calc((100%-280px)/2)] scrollbar-none [&::-webkit-scrollbar]:hidden"
      >
        {medicineCards.map((card, index) => (
          <MedicineCard
            key={card.id}
            name={card.name}
            status={card.status}
            medicine={card.medicine}
            isActive={activeCardIndex === index}
            isFlipped={flippedCardId === card.id}
            onFlip={() =>
              setFlippedCardId((currentId) =>
                currentId === card.id ? null : card.id
              )
            }
            onRegister={() => navigate('/register')}
          />
        ))}
      </div>
      <SosButton />
    </div>
  );
};

export default Home;
