import { useState } from 'react';

import type { SavedMedicine } from '@/hooks/useSavedMedicines';
import MedicineInfo from './MedicineInfo';

// 교체 예정
const MOCK_MEDICINE: SavedMedicine = {
  id: 0,
  name: '김피루',
  dispensedDate: '2026. 07. 20.',
  issuer: '서울메디컬의원',
  productInfo: '로라타딘 10mg',
  frequency: '1일 1회',
  duration: '14일',
  dosePerTime: '1정',
};

type MedicineCardBackProps = {
  medicine?: SavedMedicine;
};

const MedicineCardBack = ({
  medicine = MOCK_MEDICINE,
}: MedicineCardBackProps) => {
  const [isKorean, setIsKorean] = useState(true);

  const fields = [
    { labelKo: '성명', labelEn: 'Name', value: medicine.name },
    {
      labelKo: '조제 일자',
      labelEn: 'Dispensed on',
      value: medicine.dispensedDate,
    },
    { labelKo: '발행 기관', labelEn: 'Issuer', value: medicine.issuer },
    {
      labelKo: '제품명 및 함량',
      labelEn: 'Product\n& strength',
      value: medicine.productInfo,
    },
    { labelKo: '복용 횟수', labelEn: 'Frequency', value: medicine.frequency },
    { labelKo: '복용 일수', labelEn: 'Duration', value: medicine.duration },
    { labelKo: '1회 복용량', labelEn: 'Dose', value: medicine.dosePerTime },
  ];

  return (
    <div className="h-full w-full pt-6 pb-5 px-5.5 rounded-[20px] shadow-[0_2px_2px_0_rgba(0,0,0,0.04)] bg-[#FCFCFC] border-2 border-[#23408F]">
      <div className="flex flex-col gap-6">
        <div className="flex items-start gap-3">
          <p className="min-w-0 flex-1 [overflow-wrap:anywhere] font-Pretendard text-[1rem] leading-5.6 tracking-[0.4px] font-semibold text-[#000000]">
            {medicine.productInfo}
          </p>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setIsKorean((prev) => !prev);
            }}
            className="shrink-0 whitespace-nowrap px-2 py-1.5 border border-[#23408F] rounded-xl"
          >
            <p className="whitespace-nowrap font-Pretendard text-[0.875rem] leading-4.9 tracking-[0.3px] font-semibold text-[#23408F]">
              {isKorean ? '한국어' : 'EN'}
            </p>
          </button>
        </div>
        <div className="flex flex-col gap-3.5">
          {fields.map((field) => (
            <MedicineInfo
              key={field.labelKo}
              label={isKorean ? field.labelKo : field.labelEn}
              value={field.value}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MedicineCardBack;
