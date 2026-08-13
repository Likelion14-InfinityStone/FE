type MedicineFormFields = {
  name: string;
  dispensedDate: string;
  issuer: string;
  productInfo: string;
  frequency: string;
  duration: string;
  dosePerTime: string;
};

type MedicineInputCardProps = {
  form: MedicineFormFields;
  onChange: (field: keyof MedicineFormFields, value: string) => void;
  fields?: (keyof MedicineFormFields)[];
};

const ALL_FIELD_ROWS: { key: keyof MedicineFormFields; label: string }[] = [
  { key: 'name', label: '이름' },
  { key: 'dispensedDate', label: '조제일자' },
  { key: 'issuer', label: '발행 기관' },
  { key: 'productInfo', label: '제품명 및 함량' },
  { key: 'frequency', label: '복용 횟수' },
  { key: 'duration', label: '복용 일수' },
  { key: 'dosePerTime', label: '1회 복용량' },
];

const MedicineInputCard = ({
  form,
  onChange,
  fields,
}: MedicineInputCardProps) => {
  const rows = fields
    ? ALL_FIELD_ROWS.filter((row) => fields.includes(row.key))
    : ALL_FIELD_ROWS;

  return (
    <div className="mx-auto w-full max-w-[350px] rounded-[20px] border border-[#23408F] bg-[#FCFCFC] px-[30px] py-[43px] shadow-[0px_2px_2px_0px_rgba(113,112,113,0.2)]">
      <div className="flex flex-col gap-[30px]">
        {rows.map((row) => (
          <div
            key={row.key}
            className="flex items-center justify-between gap-[12px] border-b border-[#E2E2E2] pb-[4px]"
          >
            <label className="shrink-0 whitespace-nowrap font-Pretendard text-[16px] font-medium tracking-[0.384px] text-[#848B9C]">
              {row.label}
            </label>
            <input
              value={form[row.key]}
              onChange={(event) => onChange(row.key, event.target.value)}
              placeholder="입력해 주세요"
              className="min-w-0 flex-1 bg-transparent text-right font-Pretendard text-[16px] font-normal tracking-[0.384px] text-[#191919] outline-none placeholder:text-[#EF5050] focus:placeholder:text-transparent"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicineInputCard;
export type { MedicineFormFields };
