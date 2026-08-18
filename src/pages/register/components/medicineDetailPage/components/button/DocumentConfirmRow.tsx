type DocumentConfirmRowProps = {
  documentIcon: React.ReactNode;
  trashIcon: React.ReactNode;
  onConfirmDocument: () => void;
  onDelete: () => void;
  isDeleting?: boolean;
};

const DocumentConfirmRow = ({
  documentIcon,
  trashIcon,
  onConfirmDocument,
  onDelete,
  isDeleting = false,
}: DocumentConfirmRowProps) => {
  return (
    <div className="h-[54px] flex gap-[10px]">
      <button
        type="button"
        onClick={onConfirmDocument}
        className="flex-1 flex items-center justify-center gap-[10px] p-[10px] bg-[#EAF0FF] border-2 border-[#23408F] rounded-[10px] text-[#23408F] font-semibold text-sm tracking-[-0.5px]"
      >
        <span className="w-5 h-5 flex">{documentIcon}</span>
        서류 확인하기
      </button>

      <button
        type="button"
        onClick={onDelete}
        disabled={isDeleting}
        aria-label="삭제"
        className="w-[54px] h-[54px] shrink-0 flex items-center justify-center p-[10px] border-2 border-[#23408F] rounded-[10px] disabled:opacity-50"
      >
        {trashIcon}
      </button>
    </div>
  );
};

export default DocumentConfirmRow;
