type NoticeContentViewProps = {
  effectiveDate?: string;
  body: string[];
};

const NoticeContentView = ({ effectiveDate, body }: NoticeContentViewProps) => {
  return (
    <div className="mt-9 flex w-full flex-col rounded-[20px] border border-[#23408F] bg-[#FCFCFC] px-3 py-2.5">
      {effectiveDate && (
        <p className="font-Pretendard text-xs tracking-[-0.06px] text-[#848B9C]">
          {effectiveDate}
        </p>
      )}
      {body.map((paragraph) => (
        <p
          key={paragraph}
          className="font-Pretendard text-xs tracking-[-0.06px] text-[#848B9C]"
        >
          {paragraph}
        </p>
      ))}
    </div>
  );
};

export default NoticeContentView;
