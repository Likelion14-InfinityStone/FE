import { useNavigate } from 'react-router-dom';

import SosLostIcon from '@/assets/images/sos/sosLostIcon.svg';
import SosPoliceIcon from '@/assets/images/sos/sosPoliceIcon.svg';
import SosShortageIcon from '@/assets/images/sos/sosShortageIcon.svg';
import SosEmergencyIcon from '@/assets/images/sos/sosEmergencyIcon.svg';
import SosListButton from './SosListButton';

interface SosBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

const emergencyOptions = [
  { id: 'lost', icon: SosLostIcon, label: '약을 잃어버렸어요' },
  {
    id: 'police',
    icon: SosPoliceIcon,
    label: '세관 혹은 경찰의 확인을 받고 있어요',
  },
  { id: 'shortage', icon: SosShortageIcon, label: '가져온 약이 부족해요' },
  { id: 'symptom', icon: SosEmergencyIcon, label: '응급 증상이 있어요' },
] as const;

const SosBottomSheet = ({ isOpen, onClose }: SosBottomSheetProps) => {
  const navigate = useNavigate();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 mx-auto w-full max-w-100.5 bg-black/40"
      onClick={onClose}
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="flex flex-col absolute inset-x-0 bottom-0 rounded-t-[36px] bg-[#FCFCFC] px-6.5 pt-5.5 pb-12.5 gap-6"
      >
        <button
          type="button"
          onClick={onClose}
          className="mx-auto block h-1.25 w-17.25 rounded-full bg-[#E1E1E1]"
        />

        <div className="flex flex-col gap-6 text-center">
          <div className="flex flex-col gap-3">
            <p className="font-Pretendard text-[1.375rem] leading-7.7 font-semibold tracking-[0.5px] text-[#EF5050]">
              SOS 긴급 도움
            </p>
            <p className="font-Pretendard text-[1rem] leading-5.6 tracking-[0.4px] text-[#191919] whitespace-pre-line">
              {`현재 어떤 상황인지 아래에서\n차분하게 선택해 주세요.`}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            {emergencyOptions.map(({ id, icon, label }) => (
              <SosListButton
                key={id}
                icon={icon}
                label={label}
                onClick={() =>
                  navigate('/emergency', { state: { reason: id } })
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SosBottomSheet;
