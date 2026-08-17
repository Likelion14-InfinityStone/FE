import type { PassportDraft } from '@/types/scan/scan.type';

type ScanPassportCardProps = {
  passport: PassportDraft;
  onChange: (field: keyof PassportDraft, value: string) => void;
};

const ScanPassportCard = ({ passport, onChange }: ScanPassportCardProps) => {
  return (
    <div className="w-full rounded-[20px] border border-[#23408F] bg-[#FCFCFC] px-[22px] py-[26px] shadow-[0px_2px_2px_0px_rgba(113,112,113,0.2)]">
      <div className="flex flex-col gap-[20px]">
        <div className="flex items-center justify-between gap-[12px] border-b border-[#E2E2E2] pb-[4px]">
          <label className="shrink-0 whitespace-nowrap font-Pretendard text-[16px] font-medium tracking-[0.384px] text-[#848B9C]">
            조제일자
          </label>
          <input
            type="date"
            value={passport.dispensedAt}
            onChange={(event) => onChange('dispensedAt', event.target.value)}
            className={`min-w-0 flex-1 bg-transparent text-right font-Pretendard text-[16px] font-normal tracking-[0.384px] outline-none ${
              passport.dispensedAt ? 'text-[#191919]' : 'text-[#EF5050]'
            }`}
          />
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
