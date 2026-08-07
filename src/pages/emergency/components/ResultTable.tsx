import type { ReactNode } from 'react';
import InfoPiruIcon from '@/assets/images/sos/InfoPiruIcon.svg';

interface ResultTableProps {
  title: string;
  children: ReactNode;
}

const ResultTable = ({ title, children }: ResultTableProps) => {
  return (
    <div className="flex flex-col gap-3">
      <p className="font-Pretendard text-[1rem] leading-5.6 font-medium text-[#000000]">
        {title}
      </p>
      <div className="relative rounded-[20px] border border-[#23408F] px-4 py-3.5">
        <img src={InfoPiruIcon} alt="" className="absolute right-0.5 -top-6" />
        {children}
      </div>
    </div>
  );
};

export default ResultTable;
