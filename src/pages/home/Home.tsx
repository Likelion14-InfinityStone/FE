import Header from '@/components/layout/Header';
import MedicineCard from './components/MedicineCard';

const Home = () => {
  return (
    <div className="w-full h-full">
      <Header title="복약 카드" />
      <MedicineCard name="피루피루" status="unregistered" />
    </div>
  );
};

export default Home;
