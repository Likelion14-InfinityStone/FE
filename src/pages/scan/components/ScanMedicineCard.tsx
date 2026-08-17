import chevronIcon from '@/assets/images/register/medicineDetail/downArrowIcon.svg';
import inputCompleteStemp from '@/assets/images/scan/inputCompleteStemp.svg';
import medicineStampIncomplete from '@/assets/images/scan/medicineStampIncomplete.svg';
import type { DoseUnit } from '@/types/home/medicationCard.type';
import type { MedicationCandidate } from '@/types/medication/medication.type';
import type {
  QuantityField,
  ScanMedicationResult,
} from '@/types/scan/scan.type';
import MedicineNameSearchInput from './MedicineNameSearchInput';

const DOSE_UNIT_LABEL: Record<DoseUnit, string> = {
  TABLET: '정',
  CAPSULE: '캡슐',
  PACKET: '포',
  ML: 'mL',
  DROP: '방울',
  MG: 'mg',
};

const DOSE_UNIT_OPTIONS = Object.keys(DOSE_UNIT_LABEL) as DoseUnit[];

type ScanMedicineCardProps = {
  medicine: ScanMedicationResult;
  isOpen: boolean;
  onToggle: () => void;
  onChangeQuantity: (field: QuantityField, value: number | null) => void;
  onRemove?: () => void;
  onChangeName?: (value: string) => void;
  onSelectCandidate?: (candidate: MedicationCandidate) => void;
  onChangeDoseUnit?: (unit: DoseUnit) => void;
};

const QUANTITY_ROWS: { key: QuantityField; label: string; suffix?: string }[] = [
  { key: 'intakesPerDay', label: '복용 횟수', suffix: '회/일' },
  { key: 'totalDays', label: '복용 일수', suffix: '일' },
  { key: 'dosePerIntake', label: '1회 복용량' },
];

const isComplete = (medicine: ScanMedicationResult): boolean =>
  medicine.intakesPerDay != null &&
  medicine.intakesPerDay >= 1 &&
  medicine.totalDays != null &&
  medicine.totalDays >= 1 &&
  medicine.dosePerIntake != null &&
  medicine.dosePerIntake > 0;

const ScanMedicineCard = ({
  medicine,
  isOpen,
  onToggle,
  onChangeQuantity,
  onRemove,
  onChangeName,
  onSelectCandidate,
  onChangeDoseUnit,
}: ScanMedicineCardProps) => {
  const complete = isComplete(medicine);
  const isNameEditable = Boolean(onChangeName && onSelectCandidate);
  const title = medicine.productKoName.trim() || '제품명을 입력해 주세요';

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
          <img
            src={complete ? inputCompleteStemp : medicineStampIncomplete}
            alt=""
            className="h-full w-full object-contain"
          />
        </span>
        <span
          className={`flex-1 truncate text-left font-Pretendard text-[16px] font-medium tracking-[0.384px] ${
            isNameEditable && !medicine.productKoName.trim()
              ? 'text-[#EF5050]'
              : 'text-[#191919]'
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

      {isOpen && (
        <div className="mt-[20px] flex flex-col gap-[20px]">
          {isNameEditable ? (
            <div className="flex items-center justify-between gap-[12px] border-b border-[#E2E2E2] pb-[4px]">
              <label className="shrink-0 whitespace-nowrap font-Pretendard text-[14px] font-medium tracking-[0.336px] text-[#848B9C]">
                제품명
              </label>
              <MedicineNameSearchInput
                value={medicine.productKoName}
                onChangeText={(text) => onChangeName?.(text)}
                onSelectCandidate={(candidate) => onSelectCandidate?.(candidate)}
                required
              />
            </div>
          ) : null}

          {isNameEditable && medicine.mfdsProductCode.trim() && (
            <p className="font-Pretendard text-[13px] tracking-[0.312px] text-[#848B9C]">
              {medicine.productEnName.trim() || '이 제품은 영문명이 등록되어 있지 않아 저장할 수 없어요.'}
            </p>
          )}

          {!isNameEditable && medicine.productEnName && (
            <p className="font-Pretendard text-[13px] tracking-[0.312px] text-[#848B9C]">
              {medicine.productEnName}
            </p>
          )}

          {QUANTITY_ROWS.map((row) => {
            const value = medicine[row.key];

            return (
              <div
                key={row.key}
                className="flex items-center justify-between gap-[12px] border-b border-[#E2E2E2] pb-[4px]"
              >
                <label className="shrink-0 whitespace-nowrap font-Pretendard text-[14px] font-medium tracking-[0.336px] text-[#848B9C]">
                  {row.label}
                </label>
                <div className="flex min-w-0 flex-1 items-center justify-end gap-[4px]">
                  <input
                    type="number"
                    min={row.key === 'dosePerIntake' ? 0 : 1}
                    step={row.key === 'dosePerIntake' ? 'any' : 1}
                    value={value ?? ''}
                    onChange={(event) => {
                      const raw = event.target.value;
                      onChangeQuantity(row.key, raw === '' ? null : Number(raw));
                    }}
                    placeholder="입력해 주세요"
                    className="min-w-0 flex-1 bg-transparent text-right font-Pretendard text-[14px] font-normal tracking-[0.336px] text-[#191919] outline-none placeholder:text-[#EF5050]"
                  />
                  {row.key === 'dosePerIntake' && onChangeDoseUnit ? (
                    <select
                      value={medicine.doseUnit}
                      onChange={(event) =>
                        onChangeDoseUnit(event.target.value as DoseUnit)
                      }
                      className="shrink-0 bg-transparent font-Pretendard text-[14px] tracking-[0.336px] text-[#191919] outline-none"
                    >
                      {DOSE_UNIT_OPTIONS.map((unit) => (
                        <option key={unit} value={unit}>
                          {DOSE_UNIT_LABEL[unit]}
                        </option>
                      ))}
                    </select>
                  ) : (
                    <span className="shrink-0 whitespace-nowrap font-Pretendard text-[14px] tracking-[0.336px] text-[#191919]">
                      {row.key === 'dosePerIntake'
                        ? DOSE_UNIT_LABEL[medicine.doseUnit]
                        : row.suffix}
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {onRemove && (
            <div className="flex justify-end">
              <button
                type="button"
                onClick={onRemove}
                className="font-Pretendard text-[13px] tracking-[0.312px] text-[#848B9C] underline"
              >
                이 약 삭제
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ScanMedicineCard;
