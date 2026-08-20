import { useNavigate, useParams } from 'react-router-dom';
import BottomButton from '@/components/button/BottomButton';
import PageHeader from '@/components/layout/PageHeader';
import MedicineDocumentItem from './components/MedicineDocumentItem';
import { useMedicationDocuments } from './services/useDocuments';

const MedicineDocuments = () => {
  const navigate = useNavigate();
  const { medicationId: medicationIdParam } = useParams();
  const medicationId = Number(medicationIdParam);
  const isValidMedicationId =
    Number.isSafeInteger(medicationId) && medicationId > 0;
  const { data, isLoading, isError, refetch } = useMedicationDocuments(
    medicationId,
    isValidMedicationId
  );

  return (
    <div className="flex w-full flex-1 flex-col">
      <PageHeader title="약품별 서류 목록" />

      <div className="flex flex-1 flex-col gap-6 pt-3 pb-56">
        <h1 className="font-Pretendard text-[1.375rem] leading-7.5 font-semibold text-[#191919]">
          {data?.productKoName ?? '약품 정보를 불러오는 중...'}
        </h1>

        <div className="flex flex-col gap-4.5">
          {isLoading && (
            <p className="py-5 text-center font-Pretendard text-[0.875rem] text-[#848B9C]">
              서류 목록을 불러오는 중...
            </p>
          )}

          {(isError || !isValidMedicationId) && (
            <button
              type="button"
              onClick={() => {
                if (!isValidMedicationId) {
                  navigate('/documents');
                  return;
                }

                void refetch();
              }}
              className="py-5 text-center font-Pretendard text-[0.875rem] font-semibold text-[#23408F]"
            >
              {!isValidMedicationId ? '서류함으로 돌아가기' : '다시 시도하기'}
            </button>
          )}

          {data?.documents.map((document) => (
            <MedicineDocumentItem
              key={document.checklistItemId}
              title={document.title}
              registeredOn={document.registeredOn}
              status={document.registered ? '등록완료' : '미발급'}
              onClick={
                document.documentId === null
                  ? undefined
                  : () =>
                      navigate(
                        `/documents/${medicationId}/${document.documentId}`,
                        { state: { documentTitle: document.title } }
                      )
              }
            />
          ))}
        </div>

        <div className="fixed bottom-[calc(8.75rem+env(safe-area-inset-bottom))] left-1/2 z-10 w-[calc(100%-52px)] max-w-87.5 -translate-x-1/2">
          <BottomButton
            text="복약 카드 보기"
            onClick={() => {
              if (!isValidMedicationId) return;

              navigate('/home', {
                state: {
                  medicationId,
                  showBack: true,
                },
              });
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default MedicineDocuments;
