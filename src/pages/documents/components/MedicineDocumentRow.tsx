import DocumentsDetailArrowIcon from '@/assets/images/documents/documentsDetailArrowIcon.svg';

type MedicineDocumentRowProps = {
  name: string;
  onClick?: () => void;
};

const MedicineDocumentRow = ({ name, onClick }: MedicineDocumentRowProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between rounded-[20px] border border-[#848B9C] bg-[#FCFCFC] px-5 py-6.25 shadow-[0_2px_2px_0_rgba(113,112,113,0.20)]"
    >
      <p className="font-Pretendard text-[1rem] leading-5.5 font-medium text-[#191919]">
        {name}
      </p>
      <img src={DocumentsDetailArrowIcon} alt="" className="h-6 w-6" />
    </button>
  );
};

export default MedicineDocumentRow;
