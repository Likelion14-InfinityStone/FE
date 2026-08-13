import { useState } from 'react';
import SosPiruIcon from '@/assets/images/sos/sosPiruIcon.svg';
import SosBottomSheet from '@/pages/emergency/components/SosBottomSheet';

const SosButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 bottom-29 z-10 mx-auto w-full max-w-100.5 px-4">
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="pointer-events-auto ml-auto flex h-16 w-16 flex-col items-center justify-center rounded-full bg-[#EF5050] p-2.5"
        >
          <p className="font-Pretendard text-[1.375rem] leading-none font-semibold tracking-[-0.5px] text-white">
            SOS
          </p>
          <img src={SosPiruIcon} alt="" />
        </button>
      </div>
      <SosBottomSheet isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default SosButton;
