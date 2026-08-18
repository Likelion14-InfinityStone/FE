import { useState } from 'react';

import calendarIcon from '@/assets/images/register/tripTicket/calenderIcon.svg';
import type { PassportDraft } from '@/types/scan/scan.type';
import DatePickerPopover from './DatePickerPopover';

type ScanPassportCardProps = {
  passport: PassportDraft;
  onChange: (field: keyof PassportDraft, value: string) => void;
};

const pad = (value: number) => String(value).padStart(2, '0');

const parseIsoDate = (value: string): Date | undefined => {
  if (!value) return undefined;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return undefined;
  return new Date(year, month - 1, day);
};

const toIsoDate = (date: Date) =>
  `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;

const toDisplayDate = (value: string) => {
  const date = parseIsoDate(value);
  if (!date) return '';
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
};

const ScanPassportCard = ({ passport, onChange }: ScanPassportCardProps) => {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);

  return (
    <div className="w-full rounded-[20px] border border-[#23408F] bg-[#FCFCFC] px-[22px] py-[26px] shadow-[0px_2px_2px_0px_rgba(113,112,113,0.2)]">
      <div className="flex flex-col gap-[20px]">
        <div className="relative flex items-center justify-between gap-[12px] border-b border-[#E2E2E2] pb-[4px]">
          <label className="shrink-0 whitespace-nowrap font-Pretendard text-[16px] font-medium tracking-[0.384px] text-[#848B9C]">
            조제일자
          </label>
          <button
            type="button"
            onClick={() => setIsDatePickerOpen((prev) => !prev)}
            className="flex min-w-0 flex-1 items-center justify-end gap-[8px]"
          >
            <span
              className={`font-Pretendard text-[16px] font-normal tracking-[0.384px] ${
                passport.dispensedAt ? 'text-[#191919]' : 'text-[#EF5050]'
              }`}
            >
              {toDisplayDate(passport.dispensedAt) || '입력해 주세요'}
            </span>
            <img src={calendarIcon} alt="" className="h-[20px] w-[20px] shrink-0" />
          </button>

          {isDatePickerOpen && (
            <DatePickerPopover
              initialDate={parseIsoDate(passport.dispensedAt)}
              onClose={() => setIsDatePickerOpen(false)}
              onSelect={(date) => {
                onChange('dispensedAt', toIsoDate(date));
                setIsDatePickerOpen(false);
              }}
            />
          )}
        </div>

        <div className="flex items-center justify-between gap-[12px] border-b border-[#E2E2E2] pb-[4px]">
          <label className="shrink-0 whitespace-nowrap font-Pretendard text-[16px] font-medium tracking-[0.384px] text-[#848B9C]">
            발행 기관
          </label>
          <input
            value={passport.issuer}
            onChange={(event) => onChange('issuer', event.target.value)}
            placeholder="입력해 주세요"
            className="min-w-0 flex-1 bg-transparent text-right font-Pretendard text-[16px] font-normal tracking-[0.384px] text-[#191919] outline-none placeholder:text-[#EF5050]"
          />
        </div>
      </div>
    </div>
  );
};

export default ScanPassportCard;
