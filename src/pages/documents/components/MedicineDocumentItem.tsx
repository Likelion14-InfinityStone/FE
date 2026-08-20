import DocumentsDetailArrowIcon from '@/assets/images/documents/documentsDetailArrowIcon.svg';
import CheckPiruIcon from '@/assets/images/documents/checkPiruIcon.svg';
import NoPiruIcon from '@/assets/images/documents/noPiruIcon.svg';
import ReadyPiruIcon from '@/assets/images/documents/readyPiruIcon.svg';

type MedicineDocumentItemProps = {
  title: string;
  registeredOn?: string | null;
  status: '등록완료' | '갱신필요' | '미발급';
  onClick?: () => void;
};

const STATUS_ICONS = {
  등록완료: ReadyPiruIcon,
  갱신필요: CheckPiruIcon,
  미발급: NoPiruIcon,
} as const;

const MedicineDocumentItem = ({
  title,
  registeredOn,
  status,
  onClick,
}: MedicineDocumentItemProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!onClick}
      className="flex w-full items-center gap-3.5 rounded-[20px] border border-[#848B9C] bg-[#FCFCFC] px-5 py-2.5 shadow-[0_2px_2px_0_rgba(113,112,113,0.20)] disabled:cursor-default"
    >
      <img
        src={STATUS_ICONS[status]}
        alt={`${status} 상태`}
        className="h-13.75 w-13.75 shrink-0"
      />

      <p className="flex min-w-0 flex-1 flex-col items-start text-left gap-1">
        <span className="font-Pretendard text-[1rem] leading-5.5 font-medium text-[#191919]">
          {title}
        </span>
        <span
          aria-hidden={!registeredOn}
          className="min-h-5 font-Pretendard text-[0.875rem] leading-5 font-regular text-[#191919]"
        >
          {registeredOn ? `등록일 ${registeredOn}` : '\u00A0'}
        </span>
      </p>

      {onClick && <img src={DocumentsDetailArrowIcon} alt="" />}
    </button>
  );
};

export default MedicineDocumentItem;
