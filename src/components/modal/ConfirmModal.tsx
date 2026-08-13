type ConfirmModalProps = {
  icon: string;
  title: string;
  description: string;
  cancelText?: string;
  confirmText?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

const ConfirmModal = ({
  icon,
  title,
  description,
  cancelText = '취소',
  confirmText = '확인',
  onCancel,
  onConfirm,
}: ConfirmModalProps) => {
  return (
    <div
      onClick={onCancel}
      className="fixed inset-0 z-50 flex items-center justify-center bg-[rgba(25,25,21,0.6)] px-6.5"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-modal-title"
        onClick={(event) => event.stopPropagation()}
        className="flex h-61 w-77.5 shrink-0 flex-col items-center rounded-2xl bg-[#FCFCFC] px-4 pt-5.5 pb-5 gap-2.5"
      >
        <img src={icon} alt="" />
        <div className="flex flex-col w-full gap-4">
          <div className="flex flex-col items-center">
            <p
              id="confirm-modal-title"
              className="font-Pretendard text-[1rem] font-semibold text-[#282723]"
            >
              {title}
            </p>
            <p className="font-Pretendard text-[0.875rem] font-regular text-[#8E8B7E]">
              {description}
            </p>
          </div>
          <div className="flex w-full gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="py-3.75 flex-1 rounded-xl border border-[#E2E2E2]"
            >
              <p className="font-Pretendard text-[1rem] font-semibold text-[#848B9C]">
                {cancelText}
              </p>
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className="py-3.75 flex-1 rounded-xl bg-[#23408F]"
            >
              <p className="font-Pretendard text-[1rem] font-semibold text-[#FAFAF6]">
                {confirmText}
              </p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
