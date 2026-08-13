import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { TRIPS } from '@/constants/trip';
import { computeDDay } from '@/utils/dDay';
import { useSavedTrips } from '@/hooks/useSavedTrips';
import backIcon from '@/assets/images/register/medicineDetail/backIcon.svg';
import Ticket, { type TicketData } from './components/Ticket';
import EditButton from './components/EditButton';
import DeleteButton from './components/DeleteButton';
import MedicinePassportButton from './components/MedicinePassportButton';
import RenameTripSheet from './components/RenameTripSheet';

const Medicine = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const initialTrip = (location.state as { trip?: TicketData } | null)
    ?.trip ?? { ...TRIPS[0], dDay: computeDDay(TRIPS[0].departureDate) };

  const [trip, setTrip] = useState<TicketData>(initialTrip);
  const [isRenameOpen, setIsRenameOpen] = useState(false);
  const { trips, updateTrip, removeTrip } = useSavedTrips();

  const tripCountry = trips.find((t) => t.id === trip.id)?.country;

  const isDuplicateName = (name: string) =>
    trips.some(
      (t) => t.id !== trip.id && t.country === tripCountry && t.title === name
    );

  const handleDelete = () => {
    if (!window.confirm('이 여행을 삭제하시겠어요?')) return;
    removeTrip(trip.id);
    navigate('/register');
  };

  const handleSaveRename = (name: string) => {
    setTrip((prev) => ({ ...prev, title: name }));
    updateTrip(trip.id, { title: name });
    setIsRenameOpen(false);
  };

  return (
    <div className="min-h-dvh w-full bg-[#FAFAF6] pb-10">
      <div className="relative flex items-center pt-5 pb-1">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={() => navigate(-1)}
          className="absolute left-0 flex h-6 w-6 items-center justify-center"
        >
          <img src={backIcon} alt="" className="h-5 w-[10px]" />
        </button>
        <p className="flex-1 text-center text-[22px] font-semibold tracking-[0.528px] text-black">
          여행 체크로그함
        </p>
      </div>

      <div className="relative mt-[68px]">
        <div className="absolute -top-[43px] right-0 z-10 flex gap-[10px]">
          <EditButton onClick={() => setIsRenameOpen(true)} />
          <DeleteButton onClick={handleDelete} />
        </div>
        <Ticket {...trip} interactive={false} />
      </div>

      <div className="mt-[26px] flex flex-col gap-3">
        {Object.entries(trip.medicines ?? {}).map(([name, quantity]) => (
          <MedicinePassportButton key={name} name={name} quantity={quantity} />
        ))}
      </div>

      {isRenameOpen && (
        <RenameTripSheet
          currentName={trip.title}
          isDuplicate={isDuplicateName}
          onClose={() => setIsRenameOpen(false)}
          onSave={handleSaveRename}
        />
      )}
    </div>
  );
};

export default Medicine;
