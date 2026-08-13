import BottomButton from '@/components/button/BottomButton';
import BottomSheet from '@/components/layout/BottomSheet';
import {
  DESTINATION_RULES,
  type DestinationRuleStatus,
} from '@/constants/medicine';

const DESTINATION_RULE_STATUS_STYLES: Record<DestinationRuleStatus, string> = {
  warning: 'text-[#EF5050]',
  safe: 'text-[#23408F]',
};

type MedicineExplanationModalProps = {
  medicineName: string;
  onClose: () => void;
};

const MedicineExplanationModal = ({
  medicineName,
  onClose,
}: MedicineExplanationModalProps) => {
  return (
    <BottomSheet
      onClose={onClose}
      ariaLabel={medicineName}
      panelClassName="rounded-t-[36px] bg-[#FAFAF6]"
    >
      <p className="font-Pretendard mt-[30px] text-center text-[1.25rem] font-semibold tracking-[0.48px] text-[#191919]">
        {medicineName}
      </p>

      {/* TODO: 약별 실제 규정 데이터로 교체 (현재는 임시 데이터) */}
      <div className="mt-[27px] flex flex-col gap-[26px] px-[26px]">
        {DESTINATION_RULES.map((rule) => (
          <div
            key={rule.label}
            className="flex items-center justify-between border-b border-[#E2E2E2] pb-[13px]"
          >
            <span className="font-Pretendard text-base font-medium tracking-[0.384px] text-[#848B9C]">
              {rule.label}
            </span>
            <span
              className={`font-Pretendard text-base font-semibold tracking-[0.384px] ${DESTINATION_RULE_STATUS_STYLES[rule.status]}`}
            >
              {rule.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-9 px-[26px]">
        <BottomButton text="확인" onClick={onClose} />
      </div>
    </BottomSheet>
  );
};

export default MedicineExplanationModal;
