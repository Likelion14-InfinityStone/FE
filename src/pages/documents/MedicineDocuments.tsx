import { useNavigate, useParams } from 'react-router-dom';
import BottomButton from '@/components/button/BottomButton';
import PageHeader from '@/components/layout/PageHeader';
import MedicineDocumentItem from './components/MedicineDocumentItem';
import { MEDICINE_DOCUMENTS } from './constants';

const MedicineDocuments = () => {
  const navigate = useNavigate();
  const { medicineName } = useParams();
  const decodedMedicineName = medicineName ?? '콘서타 27mg';

  return (
    <div className="flex h-full w-full flex-col">
      <PageHeader title="약품별 서류 목록" />

      <div className="flex flex-1 flex-col gap-6 pt-3">
        <h1 className="font-Pretendard text-[1.375rem] leading-7.5 font-semibold text-[#191919]">
          {decodedMedicineName}
        </h1>

        <div className="flex flex-col gap-4.5">
          {MEDICINE_DOCUMENTS.map((document, index) => (
            <MedicineDocumentItem
              key={`${document.title}-${index}`}
              {...document}
              onClick={() =>
                navigate(
                  `/documents/${encodeURIComponent(decodedMedicineName)}/${index}`
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
