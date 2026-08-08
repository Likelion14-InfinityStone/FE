import fixIcon from '@/assets/images/register/tripTicket/fixIcon.svg';

type EditButtonProps = {
  onClick: () => void;
};

const EditButton = ({ onClick }: EditButtonProps) => {
  return (
    <button
      type="button"
      aria-label="여행 이름 수정"
      onClick={onClick}
      className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[#FAFAF6] shadow-[0px_2px_2px_0px_rgba(113,112,113,0.2)]"
    >
      <img src={fixIcon} alt="" className="size-5" />
    </button>
  );
};

export default EditButton;
