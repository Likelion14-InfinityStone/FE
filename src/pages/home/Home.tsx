import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from '@/components/layout/Header';
import SosButton from '@/components/button/SosButton';
import MedicineCard from './components/MedicineCard';
import MedicineCardDrawer from './components/MedicineCardDrawer';
import MoreCardIcon from '@/assets/images/home/moreCardIcon.svg';

const CARD_STEP = 298;

// 임시 카드 목록
const medicineCards = [
  {
    id: 1,
    name: '피루피루',
    medicineName: '로라타딘',
    status: 'registered' as const,
  },
  {
    id: 2,
    name: '피루피루',
    medicineName: '슈다페드정',
    status: 'registered' as const,
  },
  {
    id: 3,
    name: '피루피루',
    medicineName: '콘서타 27mg',
    status: 'registered' as const,
  },
];

type HomeLocationState = {
  medicineName?: string;
  showBack?: boolean;
};

const Home = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const locationState = state as HomeLocationState | null;
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
      behavior: 'smooth',
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
            isActive={activeCardIndex === index}
            isFlipped={flippedCardId === card.id}
            onFlip={() =>
              setFlippedCardId((currentId) =>
                currentId === card.id ? null : card.id
              )
            }
            onRegister={() => navigate('/ready')}
          />
        ))}
      </div>
      <SosButton />
      {isCardDrawerOpen && (
        <MedicineCardDrawer
          medicines={medicineCards}
          onClose={() => setIsCardDrawerOpen(false)}
          onRegister={() => navigate('/ready')}
          onSelect={selectCard}
        />
      )}
    </div>
  );
};

export default Home;
