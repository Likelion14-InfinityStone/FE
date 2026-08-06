import { useNavigate } from 'react-router-dom';
import SosPiruIcon from '@/assets/images/sosPiruIcon.svg';

const SosButton = () => {
  const navigate = useNavigate();

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-29 z-10 mx-auto w-full max-w-100.5 px-4">
      <button
        type="button"
        onClick={() => navigate('/emergency')}
        className="pointer-events-auto ml-auto flex h-16 w-16 flex-col items-center justify-center rounded-full bg-[#EF5050] p-2.5"
      >
        <p className="font-Pretendard text-[1.375rem] leading-none font-semibold tracking-[-0.5px] text-white">
          SOS
        </p>
        <img src={SosPiruIcon} alt="" />
      </button>
    </div>
  );
};

export default SosButton;
