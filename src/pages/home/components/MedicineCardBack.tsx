import { useState } from 'react';
import MedicineInfo from './MedicineInfo';

const medicineInfoFields = [
  { key: 'patientName', label: { ko: '성명', en: 'Name' } },
  { key: 'dispensedAt', label: { ko: '조제 일자', en: 'Dispensed on' } },
  { key: 'issuer', label: { ko: '발행 기관', en: 'Issuer' } },
  {
    key: 'ingredientName',
    label: { ko: '국제 성분명', en: 'Generic name' },
  },
  { key: 'strength', label: { ko: '함량', en: 'Strength' } },
  { key: 'frequency', label: { ko: '복용 횟수', en: 'Frequency' } },
  { key: 'duration', label: { ko: '복용 일수', en: 'Duration' } },
  { key: 'dose', label: { ko: '1회 복용량', en: 'Dose' } },
  { key: 'prescribedAt', label: { ko: '처방일', en: 'Prescribed on' } },
] as const;

type MedicineInfoKey = (typeof medicineInfoFields)[number]['key'];
type MedicineValues = Record<MedicineInfoKey, string>;

// 교체 예정
const medicineValues: MedicineValues & {
  medicineName: string;
  connectedTrip: string;
} = {
  medicineName: '로라타딘 10mg',
  patientName: '김피루',
  dispensedAt: '2026. 07. 20.',
  issuer: '서울메디컬의원',
  ingredientName: 'Loratadine',
  strength: '10mg',
  frequency: '1일 1회',
  duration: '14일',
  dose: '1정',
  prescribedAt: '2026. 07. 20.',
  connectedTrip: '일본',
};

const MedicineCardBack = () => {
  const [isKorean, setIsKorean] = useState(true);

  return (
    <div className="h-full w-full pt-6 pb-5 px-5.5 rounded-[20px] shadow-[0_2px_2px_0_rgba(0,0,0,0.04)] bg-[#FCFCFC] border-2 border-[#23408F]">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <p className="font-Pretendard text-[1rem] leading-5.6 tracking-[0.4px] font-semibold text-[#000000]">
            {medicineValues.medicineName}
          </p>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              setIsKorean((prev) => !prev);
            }}
            className="px-2 py-1.5 border border-[#23408F] rounded-xl"
          >
            <p className="font-Pretendard text-[0.875rem] leading-4.9 tracking-[0.3px] font-semibold text-[#23408F]">
              {isKorean ? 'EN' : '한국어'}
            </p>
          </button>
        </div>
        <div className="flex flex-col gap-3.5">
          {medicineInfoFields.map(({ key, label }) => (
            <MedicineInfo
              key={key}
              label={isKorean ? label.ko : label.en}
              value={medicineValues[key]}
            />
          ))}
          <div className="flex flex-col gap-1.25">
            <p className="font-Pretendard text-[0.875rem] leading-4.9 tracking-[0.3px] font-medium text-[#767676]">
              {isKorean ? '연결된 여행' : 'Connected trip'}
            </p>
            <div className="w-fit py-2 px-4 bg-[#EAF0FF] rounded-3xl">
              <p className="font-Pretendard text-[0.75rem] leading-4.2 tracking-[0.3px] font-semibold text-[#23408F]">
                {medicineValues.connectedTrip}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineCardBack;
