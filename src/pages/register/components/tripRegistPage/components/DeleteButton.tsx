import trashIcon from '@/assets/images/register/tripTicket/trashIcon.svg';

type DeleteButtonProps = {
  onClick: () => void;
};

const DeleteButton = ({ onClick }: DeleteButtonProps) => {
  return (
    <button
      type="button"
      aria-label="여행 삭제"
      onClick={onClick}
      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#FAFAF6] shadow-[0px_2px_2px_0px_rgba(113,112,113,0.2)]"
    >
      <img src={trashIcon} alt="" className="size-5" />
    </button>
  );
};

export default DeleteButton;
