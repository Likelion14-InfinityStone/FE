import { useNavigate } from 'react-router-dom';

const Medicine = () => {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate('/medicineDetail')}
      className="flex h-[54px] w-full items-center justify-center gap-[10px] rounded-[10px] border-2 border-[#23408F] bg-[#EAF0FF] p-[10px] font-Pretendard text-sm font-semibold tracking-[-0.5px] text-[#23408F]"
    >
      약 자세히보기
    </button>
  );
};

export default Medicine;
