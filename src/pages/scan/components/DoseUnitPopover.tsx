import { useEffect, useState } from 'react';

import type { DoseUnit } from '@/types/home/medicationCard.type';

const DOSE_UNIT_LABEL: Record<DoseUnit, string> = {
  TABLET: '정',
  CAPSULE: '캡슐',
  PACKET: '포',
  ML: 'mL',
  DROP: '방울',
  MG: 'mg',
};

const DOSE_UNIT_OPTIONS = Object.keys(DOSE_UNIT_LABEL) as DoseUnit[];

type DoseUnitPopoverProps = {
  value: DoseUnit;
  onClose: () => void;
  onSelect: (unit: DoseUnit) => void;
};

const DoseUnitPopover = ({ value, onClose, onSelect }: DoseUnitPopoverProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsExpanded(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />

      <div
        className={`absolute right-0 top-[calc(100%+6px)] z-20 w-[96px] overflow-hidden rounded-[14px] border border-[#E2E2E2] bg-[#FCFCFC] shadow-[0px_4px_10px_0px_rgba(0,0,0,0.1)] transition-all duration-250 ease-out ${
          isExpanded
            ? 'max-h-[220px] translate-y-0 opacity-100'
            : 'max-h-0 -translate-y-1 opacity-0'
        }`}
      >
        {DOSE_UNIT_OPTIONS.map((unit) => {
          const isSelected = unit === value;

          return (
            <button
              key={unit}
              type="button"
              onClick={() => onSelect(unit)}
              className={`block w-full px-[14px] py-[10px] text-center font-Pretendard text-[14px] tracking-[0.336px] ${
                isSelected
                  ? 'bg-[#EAF0FF] font-semibold text-[#23408F]'
                  : 'text-[#191919]'
              }`}
            >
              {DOSE_UNIT_LABEL[unit]}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default DoseUnitPopover;
