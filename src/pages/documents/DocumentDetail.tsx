import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import PageHeader from '@/components/layout/PageHeader';
import DocumentsDeleteIcon from '@/assets/images/documents/documentsDeleteIcon.svg';
import DocumentsDownloadIcon from '@/assets/images/documents/documentsDownloadIcon.svg';
import DocumentsShareIcon from '@/assets/images/documents/documentsShareIcon.svg';
import DeleteWarningIcon from '@/assets/images/documents/deleteWarningIcon.svg';
import ConfirmModal from '@/components/modal/ConfirmModal';
import DocumentActionButton from './components/DocumentActionButton';
import {
  useDocumentDetail,
  useDocumentDelete,
  useDocumentDownload,
} from './services/useDocuments';

const formatFileSize = (fileSize: number) => {
  if (fileSize < 1024) return `${fileSize} B`;
  if (fileSize < 1024 * 1024) return `${Math.round(fileSize / 1024)} KB`;

  return `${(fileSize / (1024 * 1024)).toFixed(1)} MB`;
};

const getFittedPreviewUrl = (previewUrl: string) =>
  `${previewUrl.split('#')[0]}#view=Fit`;

const DocumentDetail = () => {
  const navigate = useNavigate();
  const { documentId: documentIdParam } = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const documentId = Number(documentIdParam);
  const isValidDocumentId = Number.isSafeInteger(documentId) && documentId > 0;
  const { data, isLoading, isError, refetch } = useDocumentDetail(
    documentId,
    isValidDocumentId
  );
  const {
    mutate: downloadDocument,
    isPending: isDownloadPending,
    isError: isDownloadError,
  } = useDocumentDownload();
  const {
    mutate: deleteDocument,
    isPending: isDeletePending,
    isError: isDeleteError,
  } = useDocumentDelete();

  const handleDownload = () => {
    if (!isValidDocumentId) return;

    downloadDocument(documentId, {
      onSuccess: (response) => {
        const link = window.document.createElement('a');
        link.href = response.result.downloadUrl;
        link.download = response.result.originalFilename;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        window.document.body.appendChild(link);
        link.click();
        link.remove();
      },
    });
  };

  const handleDelete = () => {
    if (!isValidDocumentId) return;

    deleteDocument(documentId, {
      onSuccess: () => navigate(-1),
    });
  };

  return (
    <div className="flex min-h-full w-full flex-col">
      <PageHeader title={data?.title ?? '서류 상세'} />

      <div className="flex flex-1 flex-col gap-2.5">
        <div className="flex flex-col">
          <p className="font-Pretendard text-[1.5rem] leading-8.4 font-semibold text-[#191919]">
            {data?.productKoName ?? '약품 정보를 불러오는 중...'}
          </p>
          <p className="font-Pretendard text-[1.125rem] leading-6.3 font-semibold text-[#6D6D6D]">
            {data ? `등록일 ${data.registeredOn}` : '\u00A0'}
          </p>
          {data && (
            <p className="font-Pretendard text-[0.875rem] text-[#848B9C]">
              {data.originalFilename} · {formatFileSize(data.fileSize)}
            </p>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-6">
          <div className="flex h-95 w-full shrink-0 items-center justify-center self-center overflow-hidden rounded-lg bg-[#E1E1E1]">
            {isLoading && (
              <p className="font-Pretendard text-[1rem] font-semibold text-[#191919]">
                서류를 불러오는 중...
              </p>
            )}

            {(isError || !isValidDocumentId) && (
              <button
                type="button"
                onClick={() => {
                  if (!isValidDocumentId) {
                    navigate('/documents');
                    return;
                  }

                  void refetch();
                }}
                className="font-Pretendard text-[0.875rem] font-semibold text-[#23408F]"
              >
                {!isValidDocumentId ? '서류함으로 돌아가기' : '다시 시도하기'}
              </button>
            )}

            {data && (
              <iframe
                key={data.previewUrl}
                src={getFittedPreviewUrl(data.previewUrl)}
                title={`${data.title} 미리보기`}
                className="h-full w-full border-0"
              />
            )}

            {!isLoading && !isError && isValidDocumentId && !data && (
              <p className="font-Pretendard text-[1rem] font-semibold text-[#191919]">
                미리보기를 표시할 수 없습니다.
              </p>
            )}
          </div>

          {data && (
            <div className="mt-auto flex flex-col gap-2.5 pb-4">
              <DocumentActionButton
                label={
                  isDownloadPending
                    ? '다운로드 준비 중'
                    : isDownloadError
                      ? '다운로드 재시도'
                      : '다운로드'
                }
                icon={DocumentsDownloadIcon}
                tone="primary"
                onClick={handleDownload}
                disabled={isDownloadPending}
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
          )}
        </div>
      </div>

      {isDeleteModalOpen && (
        <ConfirmModal
          icon={DeleteWarningIcon}
          title="정말로 삭제하시겠습니까?"
          description="삭제된 서류는 복구할 수 없습니다."
          confirmText={
            isDeletePending ? '삭제 중' : isDeleteError ? '다시 시도' : '삭제'
          }
          isPending={isDeletePending}
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
};

export default DocumentDetail;
