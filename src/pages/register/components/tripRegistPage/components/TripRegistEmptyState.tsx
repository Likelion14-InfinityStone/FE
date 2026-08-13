import EmptyPUFIIcon from '@/assets/images/register/tripTicket/emptyFUFIIcon.svg';

const TripRegistEmptyState = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-9">
      <img src={EmptyPUFIIcon} alt="" className="size-[170px]" />
      <p className="font-Pretendard text-xl font-bold tracking-[0.48px] text-[#23408F]">
        체크로그함이 비어있어요.
      </p>
    </div>
  );
};

export default TripRegistEmptyState;
