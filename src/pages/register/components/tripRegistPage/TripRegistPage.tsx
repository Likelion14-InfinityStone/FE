import { useNavigate, useSearchParams } from 'react-router-dom';

import Header from '@/components/layout/Header';
import BottomButton from '@/components/button/BottomButton';
import { getCountryFlag } from '@/constants/countryFlags';
import { formatDDay, formatIsoDate } from '@/utils/dDay';
import { useTripChecklog } from '@/pages/register/services/useTripDetail';
import CheckNaion from './components/CheckNaion';
import Ticket from './components/Ticket';
import TripRegistEmptyState from './components/TripRegistEmptyState';

const TripRegister = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const countryCode = searchParams.get('country') ?? undefined;

  const { data, isPending } = useTripChecklog(countryCode);

  const handleSelectCountry = (code: string) => {
    setSearchParams({ country: code });
  };

  if (isPending) {
    return (
      <div className="flex h-full w-full flex-col">
        <Header title="여행 체크로그함" />
        <div className="flex flex-1 items-center justify-center">
          <p className="font-Pretendard text-base text-[#848B9C]">
            불러오는 중이에요...
          </p>
        </div>
      </div>
    );
  }

  if (!data || data.countries.length === 0) {
    return (
      <div className="flex h-full w-full flex-col pb-44">
        <Header title="여행 체크로그함" />
        <TripRegistEmptyState />
        <div className="fixed bottom-29 left-1/2 z-20 w-[calc(100%-52px)] max-w-87.5 -translate-x-1/2">
          <BottomButton
            text="반입 여부 체크 시작"
            onClick={() => navigate('/selectMedicine')}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col pb-44">
      <Header title="여행 체크로그함" />

      <div className="mt-12 flex flex-wrap items-center gap-2.5">
        {data.countries.map((country) => (
          <CheckNaion
            key={country.countryCode}
            label={country.nameKo}
            active={data.selectedCountryCode === country.countryCode}
            onClick={() => handleSelectCountry(country.countryCode)}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-col gap-6">
        {data.trips.map((trip) => (
          <Ticket
            key={trip.tripId}
            id={trip.tripId}
            dDay={formatDDay(trip.dday)}
            title={trip.title}
            flagImage={getCountryFlag(trip.destination.countryNameKo)}
            departureCode={trip.origin.airportCode}
            departureCountry={trip.origin.countryNameKo}
            departureLocation={`${trip.origin.countryNameKo} / ${trip.origin.city}`}
            arrivalCode={trip.destination.airportCode}
            arrivalCountry={trip.destination.countryNameKo}
            arrivalLocation={`${trip.destination.countryNameKo} / ${trip.destination.city}`}
            departureDate={`${formatIsoDate(trip.departOn)} - ${formatIsoDate(trip.returnOn)}`}
          />
        ))}
      </div>

      <div className="fixed bottom-29 left-1/2 z-20 w-[calc(100%-52px)] max-w-87.5 -translate-x-1/2 ">
        <BottomButton
          text="반입 여부 체크 시작"
          onClick={() => navigate('/selectMedicine')}
        />
      </div>
    </div>
  );
};

export default TripRegister;
