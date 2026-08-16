import Header from '@/components/layout/Header';
import { useNavigate } from 'react-router-dom';
import DocumentSummaryCard from './components/DocumentSummaryCard';
import MedicineDocumentRow from './components/MedicineDocumentRow';
import { useDocumentsMain } from './services/useDocuments';

const Documents = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError, refetch } = useDocumentsMain();
  const documentSummary = [
    {
      label: '총 서류',
      count: data?.summary.totalCount ?? 0,
      tone: 'total' as const,
    },
    {
      label: '등록 완료',
      count: data?.summary.registeredCount ?? 0,
      tone: 'registered' as const,
    },
    {
      label: '미등록',
      count: data?.summary.unregisteredCount ?? 0,
      tone: 'unregistered' as const,
    },
  ];

  return (
    <div className="flex h-full w-full flex-col gap-2">
      <Header title="서류함" />

      <div className="flex flex-col gap-7.5">
        <div className="flex flex-col gap-6">
          <p className="font-Pretendard text-[1rem] leading-5.5 font-medium text-[#191919]">
            보관 현황
          </p>
          <div className="flex gap-2.5">
            {documentSummary.map((item) => (
              <DocumentSummaryCard key={item.label} {...item} />
            ))}
          </div>
        </div>

        <div className=" flex flex-col gap-3">
          <p className="font-Pretendard text-[1rem] leading-5.5 font-semibold text-[#191919]">
            약품별 서류 목록
          </p>
          <div className="flex flex-col gap-5">
            {isLoading && (
              <p className="py-5 text-center font-Pretendard text-[0.875rem] text-[#848B9C]">
                서류 목록을 불러오는 중...
              </p>
            )}

            {isError && (
              <button
                type="button"
                onClick={() => refetch()}
                className="py-5 text-center font-Pretendard text-[0.875rem] font-semibold text-[#23408F]"
              >
                다시 시도하기
              </button>
            )}

            {data?.medications.map((medicine) => (
              <MedicineDocumentRow
                key={medicine.medicationId}
                name={medicine.productKoName}
                onClick={() =>
                  navigate(
                    `/documents/${encodeURIComponent(medicine.productKoName)}`,
                    { state: { medicationId: medicine.medicationId } }
                  )
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
