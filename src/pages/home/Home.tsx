import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import Header from '@/components/layout/Header';
import SosButton from '@/components/button/SosButton';
import type { SavedMedicine } from '@/hooks/useSavedMedicines';
import type {
  DoseUnit,
  MedicationCard as MedicationCardData,
} from '@/types/home/medicationCard.type';
import MedicineCard from './components/MedicineCard';
import MedicineCardDrawer from './components/MedicineCardDrawer';
import {
  useMedicationCardDetail,
  useMedicationCards,
} from './services/useMedicationCards';
import MoreCardIcon from '@/assets/images/home/moreCardIcon.svg';

const CARD_STEP = 298;

const DOSE_UNIT_LABEL: Record<DoseUnit, string> = {
  TABLET: '정',
  CAPSULE: '캡슐',
  PACKET: '포',
  ML: 'mL',
  DROP: '방울',
  MG: 'mg',
};

type HomeMedicineCard = {
  id: number;
  name: string;
  medicineName: string;
  status: 'unregistered' | 'registered';
  medicine?: SavedMedicine;
};

type HomeLocationState = {
  medicineName?: string;
  showBack?: boolean;
};

const toHomeMedicineCard = (
  card: MedicationCardData,
  nickname: string
): HomeMedicineCard => ({
  id: card.medicationId,
  name: nickname,
  medicineName: card.front.productName,
  status: 'registered',
  medicine: {
    id: card.medicationId,
    name: nickname,
    dispensedDate: card.back.dispensedAt,
    issuer: card.back.issuer,
    productInfo: `${card.back.productName}${
      card.back.contentMg === null ? '' : ` / ${card.back.contentMg}mg`
    }`,
    frequency: `1일 ${card.back.intakesPerDay}회`,
    duration: `${card.back.totalDays}일`,
    dosePerTime: `${card.back.dosePerIntake}${DOSE_UNIT_LABEL[card.back.doseUnit]}`,
  },
});

const Home = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const locationState = state as HomeLocationState | null;
  const {
    data: medicationCardPage,
    isLoading,
    isError,
    refetch,
  } = useMedicationCards();
  const [selectedDetailId, setSelectedDetailId] = useState<number | null>(null);
  const { data: selectedCardDetail } = useMedicationCardDetail(
    selectedDetailId ?? 0,
    'ko',
    selectedDetailId !== null
  );

  const medicineCards: HomeMedicineCard[] = medicationCardPage
    ? medicationCardPage.cards.length > 0
      ? medicationCardPage.cards.map((card) =>
          selectedCardDetail?.medicationId === card.medicationId
            ? toHomeMedicineCard(
                selectedCardDetail,
                selectedCardDetail.nickname
              )
            : toHomeMedicineCard(card, medicationCardPage.nickname)
        )
      : [
          {
            id: -1,
            name: medicationCardPage.nickname,
            medicineName: '',
            status: 'unregistered' as const,
          },
        ]
    : [];

  const requestedCardIndex = Math.max(
    medicineCards.findIndex(
      (card) => card.medicineName === locationState?.medicineName
    ),
    0
  );
  const cardListRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState(requestedCardIndex);
  const [flippedCardId, setFlippedCardId] = useState<number | null>(() =>
    locationState?.showBack
      ? (medicineCards[requestedCardIndex]?.id ?? null)
      : null
  );
  const [isCardDrawerOpen, setIsCardDrawerOpen] = useState(false);

  const selectCard = (cardId: number) => {
    const selectedIndex = medicineCards.findIndex((card) => card.id === cardId);
    if (selectedIndex < 0) return;

    setSelectedDetailId(cardId);
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
        onAction={() => {
          setSelectedDetailId(null);
          setIsCardDrawerOpen(true);
        }}
      />
      <div
        ref={cardListRef}
        onScroll={(event) => {
          if (medicineCards.length === 0) return;

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
        {isLoading && (
          <p className="m-auto font-Pretendard text-sm text-[#667085]">
            복약 카드를 불러오는 중이에요.
          </p>
        )}
        {isError && (
          <button
            type="button"
            onClick={() => refetch()}
            className="m-auto font-Pretendard text-sm font-semibold text-[#23408F]"
          >
            불러오지 못했어요. 다시 시도하기
          </button>
        )}
        {medicineCards.map((card, index) => (
          <MedicineCard
            key={card.id}
            name={card.name}
            medicineName={card.medicineName}
            status={card.status}
            medicationId={card.id}
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
      {isCardDrawerOpen && medicationCardPage && (
        <MedicineCardDrawer
          medicines={medicineCards.filter(
            (card) => card.status === 'registered'
          )}
          onClose={() => setIsCardDrawerOpen(false)}
          onRegister={() => navigate('/register')}
          onSelect={selectCard}
        />
      )}
    </div>
  );
};

export default Home;
