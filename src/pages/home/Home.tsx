import Header from '@/components/layout/Header';
import MedicineCard from './components/MedicineCard';
import SosPiruIcon from '@/assets/images/home/sosPiruIcon.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CARD_STEP = 298;

// 임시 카드 목록
const medicineCards = [
  { id: 1, name: '피루피루', status: 'unregistered' as const },
  { id: 2, name: '피루피루', status: 'unregistered' as const },
  { id: 3, name: '피루피루', status: 'unregistered' as const },
];

const Home = () => {
  const navigate = useNavigate();
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [flippedCardId, setFlippedCardId] = useState<number | null>(null);

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
      <div className="pointer-events-none fixed inset-x-0 bottom-29 z-10 mx-auto w-full max-w-100.5 px-4">
        <button
          type="button"
          onClick={() => navigate('/emergency')}
          className="pointer-events-auto ml-auto flex h-16 w-16 p-2.5 flex-col items-center justify-center rounded-full bg-[#EF5050]"
        >
          <p className="font-Pretendard text-[1.375rem] leading-none font-semibold tracking-[-0.5px] text-white">
            SOS
          </p>
          <img src={SosPiruIcon} alt="" className="block" />
        </button>
      </div>
    </div>
  );
};

export default Home;
