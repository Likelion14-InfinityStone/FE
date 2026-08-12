import Header from '@/components/layout/Header';
import DocumentSummaryCard from './components/DocumentSummaryCard';
import MedicineDocumentRow from './components/MedicineDocumentRow';

const DOCUMENT_SUMMARY = [
  { label: '총 서류', count: 12, tone: 'total' as const },
  { label: '등록 완료', count: 12, tone: 'registered' as const },
  { label: '미등록', count: 12, tone: 'unregistered' as const },
];

const MEDICINES = ['슈다페드정', '로라타딘'];

const Documents = () => {
  return (
    <div className="flex h-full w-full flex-col gap-2">
      <Header title="서류함" />

      <div className="flex flex-col gap-7.5">
        <div className="flex flex-col gap-6">
          <p className="font-Pretendard text-[1rem] leading-5.5 font-medium text-[#191919]">
            보관 현황
          </p>
          <div className="flex gap-2.5">
            {DOCUMENT_SUMMARY.map((item) => (
              <DocumentSummaryCard key={item.label} {...item} />
            ))}
          </div>
        </div>

        <div className=" flex flex-col gap-3">
          <p className="font-Pretendard text-[1rem] leading-5.5 font-semibold text-[#191919]">
            약품별 서류 목록
          </p>
          <div className="flex flex-col gap-5">
            {MEDICINES.map((medicine) => (
              <MedicineDocumentRow key={medicine} name={medicine} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
