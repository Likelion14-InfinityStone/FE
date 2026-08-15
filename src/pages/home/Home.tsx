import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from '@/components/layout/Header';
import SosButton from '@/components/button/SosButton';
import { useSavedMedicines } from '@/hooks/useSavedMedicines';
import type { SavedMedicine } from '@/hooks/useSavedMedicines';
import MedicineCard from './components/MedicineCard';
import MedicineCardDrawer from './components/MedicineCardDrawer';
import MoreCardIcon from '@/assets/images/home/moreCardIcon.svg';

const CARD_STEP = 298;

// 임시 카드 목록
const MOCK_MEDICINE_CARDS: {
  id: number;
  name: string;
  medicineName: string;
  status: 'unregistered' | 'registered';
  medicine?: SavedMedicine;
}[] = [
  {
    id: 1,
    name: '피루피루',
    medicineName: '로라타딘 10mg\nLoratadine 10mg',
    status: 'registered',
    medicine: {
      id: 1,
      name: '피루피루',
      dispensedDate: '2026.08.16',
      issuer: '메디패스 약국',
      productInfo: '로라타딘 10mg',
      frequency: '1일 1회',
      duration: '7일',
      dosePerTime: '1정',
    },
  },
  { id: 2, name: '피루피루', medicineName: '', status: 'unregistered' },
  { id: 3, name: '피루피루', medicineName: '', status: 'unregistered' },
];

type HomeLocationState = {
  medicineName?: string;
  showBack?: boolean;
};

const Home = () => {
  const navigate = useNavigate();
  const { savedMedicines } = useSavedMedicines();
  const { state } = useLocation();
  const locationState = state as HomeLocationState | null;

  const medicineCards = [
    ...MOCK_MEDICINE_CARDS,
    ...savedMedicines.map((medicine) => ({
      id: medicine.id,
      name: medicine.name,
      medicineName: medicine.productInfo,
      status: 'registered' as const,
      medicine,
    })),
  ];

  const requestedCardIndex = Math.max(
    medicineCards.findIndex(
      (card) => card.medicineName === locationState?.medicineName
    ),
    0
  );
  const cardListRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(requestedCardIndex);
  const [flippedCardId, setFlippedCardId] = useState<number | null>(() =>
    locationState?.showBack ? medicineCards[requestedCardIndex].id : null
  );
  const [isCardDrawerOpen, setIsCardDrawerOpen] = useState(false);

  const selectCard = (cardId: number) => {
    const selectedIndex = medicineCards.findIndex((card) => card.id === cardId);
    if (selectedIndex < 0) return;

    setActiveCardIndex(selectedIndex);
    setFlippedCardId(cardId);
    setIsCardDrawerOpen(false);
    cardListRef.current?.scrollTo({
      left: selectedIndex * CARD_STEP,
      behavior: 'instant',
    });
  };

  useEffect(() => {
    cardListRef.current?.scrollTo({
      left: requestedCardIndex * CARD_STEP,
      behavior: 'instant',
    });
  }, [requestedCardIndex]);

  return (
    <div className="w-full h-full">
      <Header
        title="복약 카드"
        actionIcon={MoreCardIcon}
        actionLabel="복약 카드 모아 보기"
        onAction={() => setIsCardDrawerOpen(true)}
      />
      <div
        ref={cardListRef}
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
            medicineName={card.medicineName}
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
      {isCardDrawerOpen && (
        <MedicineCardDrawer
          medicines={medicineCards}
          onClose={() => setIsCardDrawerOpen(false)}
          onRegister={() => navigate('/register')}
          onSelect={selectCard}
        />
      )}
    </div>
  );
};

export default Home;
