import ModalButton from './ModalButton';

type LoadMethodModalProps = {
  onClose: () => void;
  onSelectGallery: () => void;
  onSelectManual: () => void;
};

const LoadMethodModal = ({
  onClose,
  onSelectGallery,
  onSelectManual,
}: LoadMethodModalProps) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#161615]/68"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[402px] rounded-t-[30px] bg-[#FCFCFC] pt-[22px] pb-[28px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-center">
          <div className="h-[4px] w-[60px] rounded-[100px] bg-[#E2E2E2]" />
        </div>

        <h2 className="mt-[20px] text-center font-Pretendard text-[20px] font-semibold leading-[140%] tracking-[0.024em] text-[#191919]">
          다른 불러오기 수단 선택
        </h2>

        <div className="mt-[22px] flex flex-col gap-[10px] px-[26px]">
          <ModalButton text="갤러리에서 불러오기" onClick={onSelectGallery} />
          <ModalButton text="직접 입력하기" onClick={onSelectManual} />
        </div>
      </div>
    </div>
  );
};

export default LoadMethodModal;
