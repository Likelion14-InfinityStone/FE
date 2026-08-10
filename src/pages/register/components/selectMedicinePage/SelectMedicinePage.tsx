import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import BottomButton from '@/components/button/BottomButton';
import backButtonIcon from '@/assets/images/register/tripTicket/backButtonIcon.svg';
import AirportSelectCard from './components/AirportSelectCard';
import DateSelectCard from './components/DateSelectCard';
import DateRangeModal from './components/DateRangeModal';

const TOTAL_STEPS = 3;
const CURRENT_STEP = 0;

type AirportSelection = {
  code: string;
  location: string;
};

type AirportSelectionState = {
  field?: 'departure' | 'arrival';
  departure?: AirportSelection;
  arrival?: AirportSelection;
  travelPeriod?: string;
  medicineQuantities?: Record<string, number>;
};

const formatDate = (date: Date) => {
  const year = String(date.getFullYear()).slice(2);
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}.${month}.${day}`;
};

const SelectMedicinePage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = location.state as AirportSelectionState | null;

  const [departure, setDeparture] = useState(navState?.departure);
  const [arrival, setArrival] = useState(navState?.arrival);
  const [travelPeriod, setTravelPeriod] = useState(navState?.travelPeriod);
  const [medicineQuantities] = useState(navState?.medicineQuantities);
  const [flipped, setflipped] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);

  const handleConfirmDateRange = ({
    start,
    end,
  }: {
    start: Date;
    end: Date;
  }) => {
    setTravelPeriod(`${formatDate(start)} - ${formatDate(end)}`);
    setIsDateModalOpen(false);
  };

  const handleSwap = () => {
    setDeparture(arrival);
    setArrival(departure);
    setflipped(!flipped);
  };

  const handleSelectDeparture = () => {
    navigate('/airportSearch', {
      state: {
        field: 'departure',
        departure,
        arrival,
        travelPeriod,
        medicineQuantities,
      },
    });
  };

  const handleSelectArrival = () => {
    navigate('/airportSearch', {
      state: {
        field: 'arrival',
        departure,
        arrival,
        travelPeriod,
        medicineQuantities,
      },
    });
  };

  return (
    <div className="flex min-h-dvh w-full flex-col bg-[#FAFAF6] pb-10">
      <div className="relative flex items-center pt-16.5">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={() => navigate('/register')}
          className="absolute left-0 flex h-6 w-6 items-center justify-center"
        >
          <img src={backButtonIcon} alt="" className="h-5 w-[10px]" />
        </button>

        <div className="flex flex-1 items-center justify-center gap-4.5">
          {Array.from({ length: TOTAL_STEPS }).map((_, index) => (
            <span
              key={index}
              className={`h-3 rounded-full ${
                index === CURRENT_STEP ? 'w-6 bg-[#23408F]' : 'w-3 bg-[#D9D9D9]'
              }`}
            />
          ))}
        </div>
      </div>

      <p className="font-Pretendard mt-10 text-[1.5rem] leading-[1.4] font-semibold tracking-[0.576px] text-[#191919]">
        언제, 어디로 떠나시나요?
      </p>

      <div className="mt-10">
        <AirportSelectCard
          departure={departure}
          arrival={arrival}
          onSelectDeparture={handleSelectDeparture}
          onSelectArrival={handleSelectArrival}
          onSwap={handleSwap}
          flipped={flipped}
        />
      </div>

      <div className="mt-6.5">
        <DateSelectCard
          travelPeriod={travelPeriod}
          onClick={() => setIsDateModalOpen(true)}
        />
      </div>

      <div className="flex-1" />

      <BottomButton
        text="다음"
        onClick={() =>
          navigate('/choiceMedicine', {
            state: { departure, arrival, travelPeriod, medicineQuantities },
          })
        }
        disabled={!departure || !arrival || !travelPeriod}
      />

      {isDateModalOpen && (
        <DateRangeModal
          onClose={() => setIsDateModalOpen(false)}
          onConfirm={handleConfirmDateRange}
        />
      )}
    </div>
  );
};

export default SelectMedicinePage;
