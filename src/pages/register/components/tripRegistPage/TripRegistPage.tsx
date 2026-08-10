import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/layout/Header';
import BottomButton from '@/components/button/BottomButton';
import { useSavedTrips } from '@/hooks/useSavedTrips';
import { computeDDay } from '@/utils/dDay';
import CheckNaion from './components/CheckNaion';
import Ticket from './components/Ticket';

const TripRegister = () => {
  const { trips: allTrips } = useSavedTrips();

  const countries = Array.from(new Set(allTrips.map((trip) => trip.country)));

  const [activeCountry, setActiveCountry] = useState(countries[0] ?? '');

  const filteredTrips = allTrips.filter(
    (trip) => trip.country === activeCountry
  );
  const navigate = useNavigate();

  return (
    <div className="flex h-full w-full flex-col">
      <Header title="여행 체크로그함" />

      <div className="mt-12 flex flex-wrap items-center gap-2.5">
        {countries.map((country) => (
          <CheckNaion
            key={country}
            label={country}
            active={activeCountry === country}
            onClick={() => setActiveCountry(country)}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-1 flex-col gap-6">
        {filteredTrips.map((trip) => (
          <Ticket
            key={trip.id}
            id={trip.id}
            dDay={computeDDay(trip.departureDate)}
            title={trip.title}
            departureCode={trip.departureCode}
            departureCountry={trip.departureCountry}
            departureLocation={trip.departureLocation}
            arrivalCode={trip.arrivalCode}
            arrivalCountry={trip.arrivalCountry}
            arrivalLocation={trip.arrivalLocation}
            departureDate={trip.departureDate}
            medicines={trip.medicines}
          />
        ))}
      </div>

      <div className="pt-10">
        <BottomButton
          text="반입 여부 체크 시작"
          onClick={() => navigate('/selectMedicine')}
        />
      </div>
    </div>
  );
};

export default TripRegister;
