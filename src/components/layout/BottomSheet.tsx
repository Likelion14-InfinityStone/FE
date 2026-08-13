import { useEffect, useRef } from 'react';
import type { ReactNode, RefObject } from 'react';

import barIcon from '@/assets/images/register/tripTicket/barIcon.svg';

type BottomSheetProps = {
  onClose: () => void;
  children: ReactNode;
  ariaLabel: string;
  panelClassName?: string;
  initialFocusRef?: RefObject<HTMLElement | null>;
};

const BottomSheet = ({
  onClose,
  children,
  ariaLabel,
  panelClassName = '',
  initialFocusRef,
}: BottomSheetProps) => {
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    (initialFocusRef?.current ?? panelRef.current)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [onClose, initialFocusRef]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label={ariaLabel}
        tabIndex={-1}
        className={`max-h-[85vh] w-full max-w-[402px] overflow-y-auto pt-[22px] pb-10 outline-none ${panelClassName}`}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-center">
          <img src={barIcon} alt="" className="h-1 w-[60px]" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default BottomSheet;
