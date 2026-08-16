import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { fetchMedicationCardDetail } from '@/apis/home/medicationCard.api';
import Header from '@/components/layout/Header';
import SosButton from '@/components/button/SosButton';
import type { SavedMedicine } from '@/hooks/useSavedMedicines';
import type {
  DoseUnit,
  MedicationCard as MedicationCardData,
  MedicationCardDetailResult,
} from '@/types/home/medicationCard.type';
import MedicineCard from './components/MedicineCard';
import MedicineCardDrawer from './components/MedicineCardDrawer';
import {
  medicationCardKeys,
  useMedicationCards,
  useMedicationList,
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
  medicationId?: number;
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
  const queryClient = useQueryClient();
  const { state } = useLocation();
  const locationState = state as HomeLocationState | null;
  const [isCardDrawerOpen, setIsCardDrawerOpen] = useState(false);
  const {
    data: medicationCardPage,
    isLoading,
    isError,
    refetch,
  } = useMedicationCards();
  const [selectedCardDetail, setSelectedCardDetail] =
    useState<MedicationCardDetailResult | null>(null);
  const {
    data: sidebarMedications = [],
    isLoading: isSidebarLoading,
    isError: isSidebarError,
    refetch: refetchSidebarMedications,
  } = useMedicationList(isCardDrawerOpen);

  const baseMedicineCards: HomeMedicineCard[] = medicationCardPage
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
  const selectedHomeCard = selectedCardDetail
    ? toHomeMedicineCard(selectedCardDetail, selectedCardDetail.nickname)
    : null;
  const medicineCards = selectedHomeCard
    ? baseMedicineCards.some((card) => card.id === selectedHomeCard.id)
      ? baseMedicineCards.map((card) =>
          card.id === selectedHomeCard.id ? selectedHomeCard : card
        )
      : [
          ...baseMedicineCards.filter((card) => card.status === 'registered'),
          selectedHomeCard,
        ]
    : baseMedicineCards;
  const requestedMedicationId = locationState?.medicationId;
  const hasRequestedMedicationCard =
    requestedMedicationId !== undefined &&
    medicineCards.some((card) => card.id === requestedMedicationId);

  const requestedCardIndex = Math.max(
    medicineCards.findIndex(
      (card) =>
        (locationState?.medicationId !== undefined &&
          card.id === locationState.medicationId) ||
        (locationState?.medicationId === undefined &&
          card.medicineName === locationState?.medicineName)
    ),
    0
  );
  const cardListRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScrollRef = useRef(false);
  const [activeCardIndex, setActiveCardIndex] = useState(requestedCardIndex);
  const [flippedCardIdOverride, setFlippedCardIdOverride] = useState<
    number | null | undefined
  >(undefined);
  const initialFlippedCardId = locationState?.showBack
    ? (locationState.medicationId ??
      medicineCards[requestedCardIndex]?.id ??
      null)
    : null;
  const flippedCardId =
    flippedCardIdOverride === undefined
      ? initialFlippedCardId
      : flippedCardIdOverride;

  const selectCard = async (cardId: number) => {
    const selectedIndex = medicineCards.findIndex((card) => card.id === cardId);

    setFlippedCardIdOverride(cardId);
    setIsCardDrawerOpen(false);

    if (selectedIndex >= 0) {
      setActiveCardIndex(selectedIndex);
      cardListRef.current?.scrollTo({
        left: selectedIndex * CARD_STEP,
        behavior: 'instant',
      });
    }

    try {
      const response = await queryClient.fetchQuery({
        queryKey: medicationCardKeys.detail(cardId, 'ko'),
        queryFn: () => fetchMedicationCardDetail(cardId, 'ko'),
      });
      const detail = response.result;
      const homeCardIndex =
        medicationCardPage?.cards.findIndex(
          (card) => card.medicationId === detail.medicationId
        ) ?? -1;
      const detailIndex =
        homeCardIndex >= 0
          ? homeCardIndex
          : (medicationCardPage?.cards.length ?? 0);

      setSelectedCardDetail(detail);
      setActiveCardIndex(detailIndex);
      setFlippedCardIdOverride(detail.medicationId);
      cardListRef.current?.scrollTo({
        left: detailIndex * CARD_STEP,
        behavior: 'instant',
      });
    } catch {
      setFlippedCardIdOverride(null);
    }
  };

  useEffect(() => {
    isProgrammaticScrollRef.current = requestedCardIndex !== activeCardIndex;

    cardListRef.current?.scrollTo({
      left: requestedCardIndex * CARD_STEP,
      behavior: 'instant',
    });
  }, [requestedCardIndex, activeCardIndex]);

  useEffect(() => {
    if (
      requestedMedicationId === undefined ||
      !medicationCardPage ||
      hasRequestedMedicationCard
    ) {
      return;
    }

    void queryClient
      .fetchQuery({
        queryKey: medicationCardKeys.detail(requestedMedicationId, 'ko'),
        queryFn: () => fetchMedicationCardDetail(requestedMedicationId, 'ko'),
      })
      .then((response) => {
        setSelectedCardDetail(response.result);
        setFlippedCardIdOverride(response.result.medicationId);
      })
      .catch(() => {
        setFlippedCardIdOverride(null);
      });
  }, [
    requestedMedicationId,
    medicationCardPage,
    hasRequestedMedicationCard,
    queryClient,
  ]);

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

            if (isProgrammaticScrollRef.current) {
              isProgrammaticScrollRef.current = false;
              return;
            }

            setFlippedCardIdOverride(null);
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
              setFlippedCardIdOverride(
                flippedCardId === card.id ? null : card.id
              )
            }
            onRegister={() => navigate('/register')}
          />
        ))}
      </div>
      <SosButton />
      {isCardDrawerOpen && (
        <MedicineCardDrawer
          medicines={sidebarMedications.map((medicine) => ({
            id: medicine.medicationId,
            medicineName: medicine.productKoName,
          }))}
          isLoading={isSidebarLoading}
          isError={isSidebarError}
          onRetry={() => void refetchSidebarMedications()}
          onClose={() => setIsCardDrawerOpen(false)}
          onRegister={() => navigate('/register')}
          onSelect={selectCard}
        />
      )}
    </div>
  );
};

export default Home;
