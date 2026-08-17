import type { PassportFields } from '@/types/scan/scan.type';

type PassportInfoCardProps = {
  passport: PassportFields;
  onChange: (field: keyof PassportFields, value: string) => void;
};

const PASSPORT_ROWS: { key: keyof PassportFields; label: string }[] = [
  { key: 'dispensedDate', label: '조제일자' },
  { key: 'issuer', label: '발행 기관' },
];

const PassportInfoCard = ({ passport, onChange }: PassportInfoCardProps) => {
  return (
    <div className="w-full rounded-[20px] border border-[#23408F] bg-[#FCFCFC] px-[22px] py-[26px] shadow-[0px_2px_2px_0px_rgba(113,112,113,0.2)]">
      <div className="flex flex-col gap-[20px]">
        {PASSPORT_ROWS.map((row) => (
          <div
            key={row.key}
            className="flex items-center justify-between gap-[12px] border-b border-[#E2E2E2] pb-[4px]"
          >
            <label className="shrink-0 whitespace-nowrap font-Pretendard text-[16px] font-medium tracking-[0.384px] text-[#848B9C]">
              {row.label}
            </label>
            <input
              value={passport[row.key]}
              onChange={(event) => onChange(row.key, event.target.value)}
              placeholder="입력해 주세요"
              className="min-w-0 flex-1 bg-transparent text-right font-Pretendard text-[16px] font-normal tracking-[0.384px] text-[#191919] outline-none placeholder:text-[#EF5050]"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PassportInfoCard;
