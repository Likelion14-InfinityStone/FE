import chevronIcon from '@/assets/images/register/medicineDetail/downArrowIcon.svg';
import medicineStampIncomplete from '@/assets/images/scan/medicineStampIncomplete.svg';
import medicineStempComplete from '@/assets/images/scan/inputCompleteStemp.svg';
import {
  isMedicineComplete,
  REQUIRED_MEDICINE_FIELDS,
  type MedicineFields,
} from './medicineFields.types';

type MedicineAccordionCardProps = {
  medicine: MedicineFields;
  isOpen: boolean;
  onToggle: () => void;
  onChange: (field: keyof MedicineFields, value: string) => void;
  onRemove?: () => void;
};

const FIELD_ROWS: { key: keyof MedicineFields; label: string }[] = [
  { key: 'productInfo', label: '제품명' },
  { key: 'frequency', label: '복용 횟수' },
  { key: 'duration', label: '복용 일수' },
  { key: 'dosePerTime', label: '1회 복용량' },
];

const MedicineAccordionCard = ({
  medicine,
  isOpen,
  onToggle,
  onChange,
  onRemove,
}: MedicineAccordionCardProps) => {
  const complete = isMedicineComplete(medicine);
  const title = medicine.productInfo.trim() || '제품명을 입력해 주세요';

  return (
    <div
      className={`w-full rounded-[20px] border border-[#23408F] bg-[#FCFCFC] ${
        isOpen
          ? 'px-[19px] py-[24px] shadow-[0px_2px_2px_0px_rgba(0,0,0,0.04)]'
          : 'px-[22px] py-[10px] shadow-[0px_2px_2px_0px_rgba(113,112,113,0.2)]'
      }`}
    >
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-[12px]"
      >
        <span className="relative h-[54px] w-[54px] shrink-0">
          {complete ? (
            <img
              src={medicineStempComplete}
              alt=""
              className="h-full w-full object-contain"
            />
          ) : (
            <img
              src={medicineStampIncomplete}
              alt=""
              className="h-full w-full object-contain"
            />
          )}
        </span>
        <span
          className={`flex-1 truncate text-left font-Pretendard text-[16px] font-medium tracking-[0.384px] ${
            medicine.productInfo.trim() ? 'text-[#191919]' : 'text-[#EF5050]'
          }`}
        >
          {title}
        </span>
        <img
          src={chevronIcon}
          alt=""
          className={`h-6 w-6 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && onRemove && (
        <div className="mt-[12px] flex justify-end">
          <button
            type="button"
            onClick={onRemove}
            className="font-Pretendard text-[13px] tracking-[0.312px] text-[#848B9C] underline"
          >
            이 약 삭제
          </button>
        </div>
      )}

      {isOpen && (
        <div className="mt-[20px] flex flex-col gap-[20px]">
          {FIELD_ROWS.map((row) => {
            const required = (
              REQUIRED_MEDICINE_FIELDS as readonly (keyof MedicineFields)[]
            ).includes(row.key);

            return (
              <div
                key={row.key}
                className="flex items-center justify-between gap-[12px] border-b border-[#E2E2E2] pb-[4px]"
              >
                <label className="shrink-0 whitespace-nowrap font-Pretendard text-[14px] font-medium tracking-[0.336px] text-[#848B9C]">
                  {row.label}
                </label>
                <input
                  value={medicine[row.key]}
                  onChange={(event) => onChange(row.key, event.target.value)}
                  placeholder="입력해 주세요"
                  className={`min-w-0 flex-1 bg-transparent text-right font-Pretendard text-[14px] font-normal tracking-[0.336px] text-[#191919] outline-none ${
                    required
                      ? 'placeholder:text-[#EF5050]'
                      : 'placeholder:text-[#848B9C]'
                  }`}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MedicineAccordionCard;
