import { useLocation, useNavigate, useParams } from 'react-router-dom';
import BottomButton from '@/components/button/BottomButton';
import PageHeader from '@/components/layout/PageHeader';
import MedicineDocumentItem from './components/MedicineDocumentItem';
import { useMedicationDocuments } from './services/useDocuments';

type MedicineDocumentsLocationState = {
  medicationId?: number;
};

const MedicineDocuments = () => {
  const navigate = useNavigate();
  const { medicineName } = useParams();
  const { state } = useLocation();
  const medicationId = (state as MedicineDocumentsLocationState | null)
    ?.medicationId;
  const { data, isLoading, isError, refetch } = useMedicationDocuments(
    medicationId ?? 0,
    medicationId !== undefined
  );
  const decodedMedicineName = medicineName ?? '콘서타 27mg';

  return (
    <div className="flex h-full w-full flex-col">
      <PageHeader title="약품별 서류 목록" />

      <div className="flex flex-1 flex-col gap-6 pt-3">
        <h1 className="font-Pretendard text-[1.375rem] leading-7.5 font-semibold text-[#191919]">
          {data?.productKoName ?? decodedMedicineName}
        </h1>

        <div className="flex flex-col gap-4.5">
          {isLoading && (
            <p className="py-5 text-center font-Pretendard text-[0.875rem] text-[#848B9C]">
              서류 목록을 불러오는 중...
            </p>
          )}

          {(isError || medicationId === undefined) && (
            <button
              type="button"
              onClick={() => {
                if (medicationId === undefined) {
                  navigate('/documents');
                  return;
                }

                void refetch();
              }}
              className="py-5 text-center font-Pretendard text-[0.875rem] font-semibold text-[#23408F]"
            >
              {medicationId === undefined
                ? '서류함으로 돌아가기'
                : '다시 시도하기'}
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
                        `/documents/${encodeURIComponent(data.productKoName)}/${document.documentId}`
                      )
              }
            />
          ))}
        </div>

        <div className="mt-auto pb-4">
          <BottomButton
            text="복약 카드 보기"
            onClick={() =>
              navigate('/home', {
                state: {
                  medicineName: decodedMedicineName,
                  showBack: true,
                },
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default MedicineDocuments;
