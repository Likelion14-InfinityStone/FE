import BottomButton from '@/components/button/BottomButton';
import BottomSheet from '@/components/layout/BottomSheet';
import type { TripMedicationPreviewItem } from '@/types/register';

const REQUIREMENT_KIND_LABEL = {
  UPLOAD: '서류 제출',
  ACTION: '기관 문의',
} as const;

type MedicineExplanationModalProps = {
  medication: TripMedicationPreviewItem;
  onClose: () => void;
};

const MedicineExplanationModal = ({
  medication,
  onClose,
}: MedicineExplanationModalProps) => {
  const { productKoName, regulated, categoryName, quantityCondition } =
    medication;

  return (
    <BottomSheet
      onClose={onClose}
      ariaLabel={productKoName}
      panelClassName="rounded-t-[36px] bg-[#FAFAF6]"
    >
      <p className="font-Pretendard mt-[30px] text-center text-[1.25rem] font-semibold tracking-[0.48px] text-[#191919]">
        {productKoName}
      </p>

      <div className="mt-[27px] flex flex-col gap-[26px] px-[26px]">
        <div className="flex items-center justify-between border-b border-[#E2E2E2] pb-[13px]">
          <span className="font-Pretendard text-base font-medium tracking-[0.384px] text-[#848B9C]">
            통제 성분 여부
          </span>
          <span
            className={`font-Pretendard text-base font-semibold tracking-[0.384px] ${
              regulated ? 'text-[#EF5050]' : 'text-[#23408F]'
            }`}
          >
            {regulated ? (categoryName ?? '포함') : '해당 없음'}
          </span>
        </div>

        <div className="flex items-center justify-between border-b border-[#E2E2E2] pb-[13px]">
          <span className="font-Pretendard text-base font-medium tracking-[0.384px] text-[#848B9C]">
            수량 조건
          </span>
          <span className="font-Pretendard text-base font-semibold tracking-[0.384px] text-[#191919]">
            {quantityCondition ?? '제한 없음'}
          </span>
        </div>

        {medication.requirements.map((requirement) => (
          <div
            key={requirement.templateId}
            className="flex flex-col gap-1.5 border-b border-[#E2E2E2] pb-[13px]"
          >
            <div className="flex items-center justify-between">
              <span className="font-Pretendard text-base font-medium tracking-[0.384px] text-[#848B9C]">
                {requirement.label}
              </span>
              <span className="font-Pretendard text-base font-semibold tracking-[0.384px] text-[#EF5050]">
                {REQUIREMENT_KIND_LABEL[requirement.kind]}
              </span>
            </div>
            <p className="font-Pretendard text-sm tracking-[0.336px] text-[#848B9C]">
              {requirement.description}
            </p>
            {requirement.formUrl && (
              <a
                href={requirement.formUrl}
                className="font-Pretendard text-sm font-medium tracking-[0.336px] text-[#23408F] underline"
              >
                안내 바로가기
              </a>
            )}
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
