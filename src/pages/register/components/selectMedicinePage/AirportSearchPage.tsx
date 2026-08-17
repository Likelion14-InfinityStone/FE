import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import BottomButton from '@/components/button/BottomButton';
import backButtonIcon from '@/assets/images/register/tripTicket/backButtonIcon.svg';
import { AIRPORTS } from '@/constants/airport';
import type { AirportSelection, SelectedMedication } from '@/types/register';
import AirportListItem from './components/AirportListItem';

type AirportSelectionState = {
  field?: 'departure' | 'arrival';
  departure?: AirportSelection;
  arrival?: AirportSelection;
  travelPeriod?: string;
  selectedMedications?: SelectedMedication[];
};

const AirportSearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = location.state as AirportSelectionState | null;
  const field = navState?.field ?? 'departure';

  const [query, setQuery] = useState('');
  const [selectedCode, setSelectedCode] = useState<string>();

  const trimmedQuery = query.trim();

  const filteredAirports = trimmedQuery
    ? AIRPORTS.filter(
        (airport) =>
          airport.name.includes(trimmedQuery) ||
          airport.country.includes(trimmedQuery)
      )
    : [];

  const selectedAirport = AIRPORTS.find(
    (airport) => airport.code === selectedCode
  );

  const handleConfirm = () => {
    if (!selectedAirport) return;

    const selection: AirportSelection = {
      code: selectedAirport.code,
      country: selectedAirport.country,
      location: selectedAirport.location,
    };

    navigate('/selectMedicine', {
      state: {
        departure: field === 'departure' ? selection : navState?.departure,
        arrival: field === 'arrival' ? selection : navState?.arrival,
        travelPeriod: navState?.travelPeriod,
        selectedMedications: navState?.selectedMedications,
      },
    });
  };

  return (
    <div className="flex min-h-dvh w-full flex-col bg-[#FAFAF6] pb-10">
      <div className="relative flex items-center pt-16.5">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={() => navigate(-1)}
          className="absolute left-0 flex h-6 w-6 items-center justify-center"
        >
          <img src={backButtonIcon} alt="" className="h-5 w-[10px]" />
        </button>

        <p className="font-Pretendard flex-1 text-center text-[1.375rem] font-semibold tracking-[-0.5px] text-black">
          어디로 가시나요?
        </p>
      </div>

      <input
        type="text"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="공항명을 검색해 주세요"
        className="font-Pretendard mt-10 h-[58px] w-full rounded-xl border border-[#23408F] bg-[#FCFCFC] px-4 text-[1rem] tracking-[0.384px] text-[#191919] placeholder:text-[#848B9C] focus:outline-none"
      />

      <div className="mt-6 flex flex-col gap-3">
        {filteredAirports.map((airport) => (
          <AirportListItem
            key={airport.code}
            airportName={airport.name}
            airportCode={airport.code}
            country={airport.country}
            selected={selectedCode === airport.code}
            onClick={() => setSelectedCode(airport.code)}
          />
        ))}
      </div>

      <div className="flex-1" />

      <BottomButton
        text="확인"
        onClick={handleConfirm}
        disabled={!selectedAirport}
      />
    </div>
  );
};

export default AirportSearchPage;
