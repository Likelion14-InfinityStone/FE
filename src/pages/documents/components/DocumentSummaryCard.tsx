import DocumentsPiruBlueIcon from '@/assets/images/documents/documentsPiruBlueIcon.svg';
import DocumentsPiruGreenIcon from '@/assets/images/documents/documentsPiruGreenIcon.svg';
import DocumentsPiruRedIcon from '@/assets/images/documents/documentsPiruRedIcon.svg';

type DocumentSummaryCardProps = {
  label: string;
  count: number;
  tone: 'total' | 'registered' | 'unregistered';
};

const TONE_STYLES = {
  total: {
    text: 'text-[#23408F]',
    icon: DocumentsPiruBlueIcon,
  },
  registered: {
    text: 'text-[#228B22]',
    icon: DocumentsPiruGreenIcon,
  },
  unregistered: {
    text: 'text-[#EF5050]',
    icon: DocumentsPiruRedIcon,
  },
} as const;

const DocumentSummaryCard = ({
  label,
  count,
  tone,
}: DocumentSummaryCardProps) => {
  const styles = TONE_STYLES[tone];

  return (
    <div className="flex flex-1 flex-col rounded-[20px] border border-[#848B9C] bg-[#FCFCFC] px-3 py-3 gap-3.5">
      <p className="font-Pretendard text-[1rem] leading-normal font-medium text-[#848B9C]">
        {label}
      </p>
      <div className="flex flex-1 flex-col items-end justify-end">
        <img src={styles.icon} alt="" className="h-7.5 w-10" />
        <p
          className={`font-Pretendard text-[1.375rem] leading-7.7 font-semibold ${styles.text}`}
        >
          {count} 건
        </p>
      </div>
    </div>
  );
};

export default DocumentSummaryCard;
