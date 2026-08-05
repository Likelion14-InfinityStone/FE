import Header from '@/components/layout/Header';
import MedicineCard from './components/MedicineCard';
import SosPiruIcon from '@/assets/images/home/sosPiruIcon.svg';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full">
      <Header title="복약 카드" />
      <MedicineCard
        name="피루피루"
        status="unregistered"
        onRegister={() => navigate('/ready')}
      />
      <div className="pointer-events-none fixed inset-x-0 bottom-29 z-10 mx-auto w-full max-w-100.5 px-4">
        <button
          type="button"
          onClick={() => navigate('/emergency')}
          className="pointer-events-auto ml-auto flex h-16 w-16 p-2.5 flex-col items-center justify-center rounded-full bg-[#EF5050]"
        >
          <p className="font-Pretendard text-[1.375rem] leading-none font-semibold tracking-[-0.5px] text-white">
            SOS
          </p>
          <img src={SosPiruIcon} alt="" className="block" />
        </button>
      </div>
    </div>
  );
};

export default Home;
