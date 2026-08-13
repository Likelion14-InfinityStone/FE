import { useState } from 'react';

import BottomButton from '@/components/button/BottomButton';
import barIcon from '@/assets/images/register/tripTicket/barIcon.svg';
import nextArrowIcon from '@/assets/images/onboard/nextArrowIcon.svg';

const WEEKDAYS = ['일', '월', '화', '수', '목', '금', '토'];

type DateRange = {
  start: Date | null;
  end: Date | null;
};

type DateRangeModalProps = {
  initialStart?: Date;
  initialEnd?: Date;
  onClose: () => void;
  onConfirm: (range: { start: Date; end: Date }) => void;
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

const DateRangeModal = ({
  initialStart,
  initialEnd,
  onClose,
  onConfirm,
}: DateRangeModalProps) => {
  const today = new Date();

  const [viewYear, setViewYear] = useState(
    initialStart?.getFullYear() ?? today.getFullYear()
  );
  const [viewMonth, setViewMonth] = useState(
    initialStart?.getMonth() ?? today.getMonth()
  );
  const [range, setRange] = useState<DateRange>({
    start: initialStart ?? null,
    end: initialEnd ?? null,
  });

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

  const handleSelectDate = (date: Date) => {
    setRange((prev) => {
      if (!prev.start || (prev.start && prev.end)) {
        return { start: date, end: null };
      }

      if (date < prev.start) {
        return { start: date, end: null };
      }

      return { start: prev.start, end: date };
    });
  };

  const handleConfirm = () => {
    if (!range.start || !range.end) return;
    onConfirm({ start: range.start, end: range.end });
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="max-h-[85vh] w-full max-w-[402px] overflow-y-auto rounded-t-[30px] bg-[#FAFAF6] pt-[22px] pb-10"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-center">
          <img src={barIcon} alt="" className="h-1 w-[60px]" />
        </div>

        <div className="mt-[30px] px-[26px]">
          <p className="font-Pretendard text-[1.125rem] font-semibold tracking-[0.432px] text-[#191919]">
            여행 기간을 선택해 주세요
          </p>

          <div className="mt-6 flex items-center justify-between">
            <p className="font-Pretendard text-[1.125rem] font-semibold tracking-[0.432px] text-[#191919]">
              {viewYear}년 {viewMonth + 1}월
            </p>

            <div className="flex items-center gap-5">
              <button
                type="button"
                aria-label="이전 달"
                onClick={handlePrevMonth}
              >
                <img
                  src={nextArrowIcon}
                  alt=""
                  className="h-[18px] w-2.5 rotate-180"
                />
              </button>

              <button
                type="button"
                aria-label="다음 달"
                onClick={handleNextMonth}
              >
                <img src={nextArrowIcon} alt="" className="h-[18px] w-2.5" />
              </button>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-7">
            {WEEKDAYS.map((weekday, index) => (
              <div
                key={weekday}
                className={`font-Pretendard flex items-center justify-center py-3 text-[1rem] font-medium ${getWeekdayColor(index)}`}
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
              const isStart = Boolean(
                range.start && isSameDay(date, range.start)
              );
              const isEnd = Boolean(range.end && isSameDay(date, range.end));
              const isEdge = isStart || isEnd;
              const isInRange = Boolean(
                range.start &&
                range.end &&
                date > range.start &&
                date < range.end
              );

              return (
                <div
                  key={date.toISOString()}
                  className="relative flex items-center justify-center py-1.5"
                >
                  {(isEdge || isInRange) && range.start && range.end && (
                    <span
                      className={`absolute top-1/2 h-11 -translate-y-1/2 bg-[#23408F]/20 ${
                        isStart
                          ? 'left-[calc(50%-22px)] rounded-l-full'
                          : 'left-0'
                      } ${
                        isEnd
                          ? 'right-[calc(50%-22px)] rounded-r-full'
                          : 'right-0'
                      }`}
                    />
                  )}

                  <button
                    type="button"
                    onClick={() => handleSelectDate(date)}
                    className={`font-Pretendard relative z-10 flex size-11 items-center justify-center rounded-full text-[1rem] font-medium ${
                      isEdge
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

        <div className="mt-6 px-[26px]">
          <BottomButton
            text="확인"
            onClick={handleConfirm}
            disabled={!range.start || !range.end}
          />
        </div>
      </div>
    </div>
  );
};

export default DateRangeModal;
