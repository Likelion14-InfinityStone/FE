import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import DocumentsDeleteIcon from '@/assets/images/documents/documentsDeleteIcon.svg';
import DocumentsDownloadIcon from '@/assets/images/documents/documentsDownloadIcon.svg';
import DocumentsShareIcon from '@/assets/images/documents/documentsShareIcon.svg';
import DeleteWarningIcon from '@/assets/images/documents/deleteWarningIcon.svg';
import ConfirmModal from '@/components/modal/ConfirmModal';
import DocumentActionButton from './components/DocumentActionButton';
import { MEDICINE_DOCUMENTS } from './constants';

const DocumentDetail = () => {
  const navigate = useNavigate();
  const { medicineName, documentIndex } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const medicine = medicineName
    ? decodeURIComponent(medicineName)
    : '콘서타 27mg';
  const document =
    MEDICINE_DOCUMENTS[Number(documentIndex)] ?? MEDICINE_DOCUMENTS[0];

  return (
    <div className="flex min-h-full w-full flex-col">
      <PageHeader title={document.title} />

      <div className="flex flex-1 flex-col gap-2.5">
        <div className="flex flex-col">
          <p className="font-Pretendard text-[1.5rem] leading-8.4 font-semibold text-[#191919]">
            {medicine}
          </p>
          <p className="font-Pretendard text-[1.125rem] leading-6.3 font-semibold text-[#6D6D6D]">
            유효 기한 {document.expiresAt ?? '-'} 까지
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <div className="flex h-95 w-full shrink-0 items-center justify-center self-center rounded-lg bg-[#E1E1E1]">
            <p className="font-Pretendard text-[1rem] font-semibold text-[#191919]">
              사진 미리 보기
            </p>
          </div>

          <div className="mt-auto flex flex-col gap-2.5 pb-4">
            <DocumentActionButton
              label="다운로드"
              icon={DocumentsDownloadIcon}
              tone="primary"
            />
            <DocumentActionButton
              label="공유"
              icon={DocumentsShareIcon}
              tone="secondary"
            />
            <DocumentActionButton
              label="서류 삭제"
              icon={DocumentsDeleteIcon}
              tone="danger"
              onClick={() => setIsDeleteModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {isDeleteModalOpen && (
        <ConfirmModal
          icon={DeleteWarningIcon}
          title="정말로 삭제하시겠습니까?"
          description="삭제된 서류는 복구할 수 없습니다."
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={() => navigate(-1)}
        />
      )}
    </div>
  );
};

export default DocumentDetail;
