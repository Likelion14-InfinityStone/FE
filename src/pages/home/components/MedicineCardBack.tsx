import { useState } from 'react';

import type { SavedMedicine } from '@/hooks/useSavedMedicines';
import type { DoseUnit } from '@/types/home/medicationCard.type';
import { useMedicationCardDetail } from '../services/useMedicationCards';
import MedicineInfo from './MedicineInfo';

const DOSE_UNIT_LABEL_EN: Record<DoseUnit, string> = {
  TABLET: 'tablet(s)',
  CAPSULE: 'capsule(s)',
  PACKET: 'packet(s)',
  ML: 'mL',
  DROP: 'drop(s)',
  MG: 'mg',
};

type MedicineCardBackProps = {
  medicationId: number;
  medicine: SavedMedicine;
};

const MedicineCardBack = ({
  medicationId,
  medicine,
}: MedicineCardBackProps) => {
  const [isKorean, setIsKorean] = useState(true);
  const {
    data: englishCard,
    isFetching: isEnglishFetching,
    isError: isEnglishError,
  } = useMedicationCardDetail(medicationId, 'en', !isKorean);
  const isEnglishDisplayed = !isKorean && Boolean(englishCard);
  const displayedMedicine: SavedMedicine =
    isEnglishDisplayed && englishCard
      ? {
          id: englishCard.medicationId,
          name: englishCard.nickname,
          dispensedDate: englishCard.back.dispensedAt,
          issuer: englishCard.back.issuer,
          productInfo: `${englishCard.back.productName}${
            englishCard.back.contentMg === null
              ? ''
              : ` / ${englishCard.back.contentMg}mg`
          }`,
          frequency: `${englishCard.back.intakesPerDay} time(s)/day`,
          duration: `${englishCard.back.totalDays} day(s)`,
          dosePerTime: `${englishCard.back.dosePerIntake} ${DOSE_UNIT_LABEL_EN[englishCard.back.doseUnit]}`,
        }
      : medicine;

  const fields = [
    { labelKo: '성명', labelEn: 'Name', value: displayedMedicine.name },
    {
      labelKo: '조제 일자',
      labelEn: 'Dispensed on',
      value: displayedMedicine.dispensedDate,
    },
    {
      labelKo: '발행 기관',
      labelEn: 'Issuer',
      value: displayedMedicine.issuer,
    },
    {
      labelKo: '제품명 및 함량',
      labelEn: 'Product\n& strength',
      value: displayedMedicine.productInfo,
    },
    {
      labelKo: '복용 횟수',
      labelEn: 'Frequency',
      value: displayedMedicine.frequency,
    },
    {
      labelKo: '복용 일수',
      labelEn: 'Duration',
      value: displayedMedicine.duration,
    },
    {
      labelKo: '1회 복용량',
      labelEn: 'Dose',
      value: displayedMedicine.dosePerTime,
    },
  ];

  return (
    <div className="h-full w-full pt-6 pb-5 px-5.5 rounded-[20px] shadow-[0_2px_2px_0_rgba(0,0,0,0.04)] bg-[#FCFCFC] border-2 border-[#23408F]">
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-3">
          <p className="min-w-0 flex-1 wrap-anywhere font-Pretendard text-[1rem] leading-5.6 tracking-[0.4px] font-semibold text-[#000000]">
            {displayedMedicine.productInfo}
          </p>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();

              if (isEnglishError) {
                setIsKorean(true);
                return;
              }

              setIsKorean((prev) => !prev);
            }}
            disabled={isEnglishFetching}
            className="shrink-0 whitespace-nowrap px-2 py-1.5 border border-[#23408F] rounded-xl"
          >
            <p className="whitespace-nowrap font-Pretendard text-[0.875rem] leading-4.9 tracking-[0.3px] font-semibold text-[#23408F]">
              {isEnglishFetching
                ? '로딩'
                : isEnglishError
                  ? '한국어'
                  : isKorean
                    ? '한국어'
                    : 'EN'}
            </p>
          </button>
        </div>
        <div className="flex flex-col gap-3.5">
          {fields.map((field) => (
            <MedicineInfo
              key={field.labelKo}
              label={isEnglishDisplayed ? field.labelEn : field.labelKo}
              value={field.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicineCardBack;
