import plusIcon from '@/assets/images/scan/addMedicinePlusIcon.svg';

type AddMedicineButtonProps = {
  onClick: () => void;
};

const AddMedicineButton = ({ onClick }: AddMedicineButtonProps) => {
  return (
    <button
      type="button"
      aria-label="약 추가하기"
      onClick={onClick}
      className="mx-auto flex h-[46px] w-[46px] items-center justify-center rounded-full border border-dashed border-[#23408F]"
    >
      <img src={plusIcon} alt="" className="h-[16px] w-[16px]" />
    </button>
  );
};

export default AddMedicineButton;
