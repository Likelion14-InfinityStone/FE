import { useState } from 'react';

import nextArrowIcon from '@/assets/images/onboard/nextArrowIcon.svg';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

type DatePickerPopoverProps = {
  initialDate?: Date;
  onClose: () => void;
  onSelect: (date: Date) => void;
};

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const getWeekdayColor = (weekday: number) => {
  if (weekday === 0) return 'text-[#B92C1A]';
  if (weekday === 6) return 'text-[#115FB3]';
  return 'text-[#191919]';
};

const DatePickerPopover = ({
  initialDate,
  onClose,
  onSelect,
}: DatePickerPopoverProps) => {
  const today = new Date();

  const [viewYear, setViewYear] = useState(
    initialDate?.getFullYear() ?? today.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    initialDate?.getMonth() ?? today.getMonth()
  );

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1);
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();
  const leadingBlankDays = firstDayOfMonth.getDay();

  const days = Array.from(
    { length: daysInMonth },
    (_, index) => new Date(viewYear, viewMonth, index + 1)
  );

  const handlePrevMonth = () => {
    if (viewMonth === 0) {
      setViewYear((year) => year - 1);
      setViewMonth(11);
      return;
    }

    setViewMonth((month) => month - 1);
  };

  const handleNextMonth = () => {
    if (viewMonth === 11) {
      setViewYear((year) => year + 1);
      setViewMonth(0);
      return;
    }

    setViewMonth((month) => month + 1);
  };

  return (
    <>
      <div className="fixed inset-0 z-10" onClick={onClose} />

      <div className="absolute right-0 top-[calc(100%+8px)] z-20 w-[290px] rounded-[16px] border border-[#E2E2E2] bg-[#FCFCFC] p-[16px] shadow-[0px_2px_8px_0px_rgba(0,0,0,0.08)]">
        <div className="flex items-center justify-between">
          <p className="font-Pretendard text-[14px] font-semibold tracking-[0.336px] text-[#191919]">
            {viewYear}년 {viewMonth + 1}월
          </p>

          <div className="flex items-center gap-3">
            <button type="button" aria-label="이전 달" onClick={handlePrevMonth}>
              <img
                src={nextArrowIcon}
                alt=""
                className="h-[12px] w-[8px] rotate-180"
              />
            </button>
            <button type="button" aria-label="다음 달" onClick={handleNextMonth}>
              <img src={nextArrowIcon} alt="" className="h-[12px] w-[8px]" />
            </button>
          </div>
        </div>

        <div className="mt-[10px] grid grid-cols-7">
          {WEEKDAYS.map((weekday, index) => (
            <div
              key={weekday}
              className={`font-Pretendard flex items-center justify-center py-1 text-[11px] font-medium ${getWeekdayColor(index)}`}
            >
              {weekday}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {Array.from({ length: leadingBlankDays }).map((_, index) => (
            <div key={`blank-${index}`} />
          ))}

          {days.map((date) => {
            const weekday = date.getDay();
            const isSelected = Boolean(initialDate && isSameDay(date, initialDate));

            return (
              <div key={date.toISOString()} className="flex items-center justify-center py-[2px]">
                <button
                  type="button"
                  onClick={() => onSelect(date)}
                  className={`font-Pretendard flex size-[26px] items-center justify-center rounded-full text-[12px] font-medium ${
                    isSelected
                      ? 'bg-[#23408F] text-[#FAFAF6]'
                      : getWeekdayColor(weekday)
                  }`}
                >
                  {date.getDate()}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default DatePickerPopover;
