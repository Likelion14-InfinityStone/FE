import { useRef, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import type { AxiosError } from 'axios';

import DetailTabBar from '@/pages/register/components/medicineDetailPage/components/DetailTabBar';
import MedicationPassportCard from '@/pages/register/components/medicineDetailPage/components/MedicinePassportCard';
import ChecklistBox from '@/pages/register/components/medicineDetailPage/components/button/ChecklistBox';
import ActionButton from '@/pages/register/components/medicineDetailPage/components/button/ActionButton';
import {
  useMedicationDestination,
  useTripMedicationChecklist,
  useUpdateTripMedicationChecklistItem,
  useUploadChecklistDocument,
} from '@/pages/register/services/useTripDetail';
import { DOSE_UNIT_LABEL } from '@/constants/doseUnit';
import { PREPARATION_LEVEL_ICON } from '@/constants/preparationLevel';
import type {
  ChecklistDocumentType,
  MedicationDestinationDetail,
  PreparationLevel,
  TripMedicationChecklistItem,
  TripMedicationChecklistResult,
} from '@/types/register';

import backIcon from '@/assets/images/register/medicineDetail/backIcon.svg';
import pillIcon from '@/assets/images/register/medicineDetail/pillIcon.svg';
import calinderIcon from '@/assets/images/register/medicineDetail/calinderIcon.svg';
import placeIcon from '@/assets/images/register/medicineDetail/placeIcon.svg';
import check from '@/assets/images/register/medicineDetail/check.svg';
import discheck from '@/assets/images/register/medicineDetail/discheck.svg';
import downArrowIcon from '@/assets/images/register/medicineDetail/downArrowIcon.svg';
import pdfIcon from '@/assets/images/register/medicineDetail/pdfIcon.svg';
import documentIcon from '@/assets/images/register/medicineDetail/documentIcon.svg';
import glassIcon from '@/assets/images/register/medicineDetail/glassIcon.svg';
import reasonPUFIIcon from '@/assets/images/register/medicineDetail/reasonPUFIIcon.svg';

const MAX_DOCUMENT_FILE_SIZE = 10 * 1024 * 1024;

const getChecklistDocumentType = (label: string): ChecklistDocumentType =>
  label.includes('처방전') ? 'EN_PRESCRIPTION' : 'DOCTOR_NOTE';

type MedicineDetailState = {
  tripId?: number;
  tripMedicationId?: number;
  preparationLevel?: PreparationLevel;
};

const DETAIL_TABS = [
  { key: 'destination', label: '목적지' },
  { key: 'checklist', label: '체크리스트' },
  { key: 'summary', label: '요약 근거' },
] as const;

const MedicineDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = location.state as MedicineDetailState | null;
  const { tripId, tripMedicationId, preparationLevel } = navState ?? {};

  const {
    data: medication,
    isPending,
    isError,
    error,
  } = useMedicationDestination(
    tripId ?? 0,
    tripMedicationId ?? 0,
    Boolean(tripId && tripMedicationId)
  );

  const {
    data: checklist,
    isPending: isChecklistPending,
    isError: isChecklistError,
  } = useTripMedicationChecklist(
    tripId ?? 0,
    tripMedicationId ?? 0,
    Boolean(tripId && tripMedicationId)
  );

  if (!tripId || !tripMedicationId) {
    return <Navigate to="/register" replace />;
  }

  if (isPending) {
    return (
      <div className="flex min-h-dvh w-full items-center justify-center bg-[#FAFAF6]">
        <p className="font-Pretendard text-base text-[#848B9C]">
          약 정보를 불러오는 중이에요...
        </p>
      </div>
    );
  }

  if (isError) {
    const message =
      (error as AxiosError<{ message?: string }>)?.response?.data?.message ??
      '약 정보를 불러오지 못했어요.';

    return (
      <div className="flex min-h-dvh w-full flex-col items-center justify-center gap-4 bg-[#FAFAF6] px-6">
        <p className="font-Pretendard text-base text-[#848B9C]">{message}</p>
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="font-Pretendard text-base font-semibold text-[#23408F]"
        >
          돌아가기
        </button>
      </div>
    );
  }

  return (
    <MedicineDetailContent
      tripId={tripId}
      medication={medication}
      preparationLevel={preparationLevel}
      checklist={checklist}
      isChecklistPending={isChecklistPending}
      isChecklistError={isChecklistError}
      onBack={() => navigate(-1)}
    />
  );
};

type MedicineDetailContentProps = {
  tripId: number;
  medication: MedicationDestinationDetail;
  preparationLevel?: PreparationLevel;
  checklist?: TripMedicationChecklistResult;
  isChecklistPending: boolean;
  isChecklistError: boolean;
  onBack: () => void;
};

const MedicineDetailContent = ({
  tripId,
  medication,
  preparationLevel,
  checklist,
  isChecklistPending,
  isChecklistError,
  onBack,
}: MedicineDetailContentProps) => {
  const [activeTab, setActiveTab] = useState<string>(DETAIL_TABS[0].key);

  const stampIcon = PREPARATION_LEVEL_ICON[preparationLevel ?? 'ALLOWED'];

  return (
    <div className="min-h-dvh w-full bg-[#FAFAF6] pb-10">
      <div className="relative flex items-center pt-5">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={onBack}
          className="absolute left-0 flex h-6 w-6 items-center justify-center"
        >
          <img src={backIcon} alt="" className="h-5 w-[10px]" />
        </button>
        <p className="flex-1 text-center text-[22px] font-semibold tracking-[0.528px] text-black">
          약 상세
        </p>
      </div>

      <div className="mt-[30px]">
        <MedicationPassportCard
          name={medication.productKoName}
          ingredient={
            medication.ingredients.join(', ') +
            (medication.contentMg ? ` · ${medication.contentMg}mg` : '')
          }
          stats={[
            {
              icon: <img src={pillIcon} alt="" className="h-6 w-6" />,
              label: '소지 수량',
              value: `${medication.carryQuantity}${DOSE_UNIT_LABEL[medication.carryQuantityUnit]}`,
            },
            {
              icon: <img src={calinderIcon} alt="" className="h-6 w-6" />,
              label: '복용 기간',
              value: `${medication.carryDays}일분`,
            },
            {
              icon: <img src={placeIcon} alt="" className="h-6 w-6" />,
              label: '대상 국가',
              value: medication.destinationNameKo,
            },
          ]}
          stampImage={
            <img
              src={stampIcon.src}
              alt={stampIcon.alt}
              className="h-full w-full object-contain"
            />
          }
        />
      </div>

      <div className="mt-4">
        <DetailTabBar
          tabs={[...DETAIL_TABS]}
          activeKey={activeTab}
          onChange={setActiveTab}
        />
      </div>

      <div className="mt-[26px]">
        {activeTab === 'destination' && (
          <div className="flex flex-col gap-[28px]">
            <h2 className="text-[18px] font-semibold tracking-[0.432px] text-[#191919]">
              목적지 규정
            </h2>
            <div className="flex flex-col divide-y divide-[#E2E2E2]">
              <div className="flex items-center justify-between py-[13px] first:pt-0">
                <span className="text-[16px] font-medium tracking-[0.384px] text-[#848B9C]">
                  통제 성분 여부
                </span>
                <span
                  className={`text-[16px] font-semibold tracking-[0.384px] ${
                    medication.regulated ? 'text-[#EF5050]' : 'text-[#23408F]'
                  }`}
                >
                  {medication.regulated
                    ? (medication.categoryName ?? '포함')
                    : '해당 없음'}
                </span>
              </div>
              <div className="flex items-center justify-between py-[13px] last:pb-0">
                <span className="text-[16px] font-medium tracking-[0.384px] text-[#848B9C]">
                  수량 조건
                </span>
                <span className="text-[16px] font-semibold tracking-[0.384px] text-[#191919]">
                  {medication.quantityCondition ?? '제한 없음'}
                </span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'checklist' && (
          <>
            {isChecklistPending && (
              <p className="text-[14px] tracking-[0.336px] text-[#848B9C]">
                체크리스트를 불러오는 중이에요...
              </p>
            )}

            {!isChecklistPending && (isChecklistError || !checklist) && (
              <p className="text-[14px] tracking-[0.336px] text-[#848B9C]">
                체크리스트를 불러오지 못했어요.
              </p>
            )}

            {!isChecklistPending && checklist && (
              <ChecklistTabContent tripId={tripId} checklist={checklist} />
            )}
          </>
        )}

        {/* TODO: 요약 근거 API 연동 예정 */}
        {activeTab === 'summary' && (
          <div className="flex flex-col gap-[17px]">
            <h2 className="text-[18px] font-semibold tracking-[0.432px] text-[#191919]">
              요약 근거
            </h2>
            <div className="relative pt-[47px]">
              <img
                src={reasonPUFIIcon}
                alt=""
                className="absolute right-0 top-0 z-10 h-[52px] w-[70px] object-contain"
              />
              <div className="relative z-0 box-border rounded-[20px] border-2 border-[#23408F] bg-[#FCFCFC] p-[16px_13px] shadow-[0px_2px_2px_0px_rgba(113,112,113,0.2)]">
                <p className="text-[14px] tracking-[0.336px] text-[#848B9C]">
                  요약 근거를 준비하고 있어요. 곧 만나보실 수 있어요.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

type ChecklistTabContentProps = {
  tripId: number;
  checklist: TripMedicationChecklistResult;
};

const ChecklistTabContent = ({ tripId, checklist }: ChecklistTabContentProps) => {
  const [openItemId, setOpenItemId] = useState<number | null>(null);
  const [uploadErrors, setUploadErrors] = useState<
    Record<number, string | null>
  >({});
  const [uploadedFilenames, setUploadedFilenames] = useState<
    Record<number, string>
  >({});
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  const updateChecklistItemMutation = useUpdateTripMedicationChecklistItem(
    tripId,
    checklist.tripMedicationId
  );
  const pendingChecklistItemId =
    updateChecklistItemMutation.variables?.checklistItemId ?? null;

  const uploadDocumentMutation = useUploadChecklistDocument(
    tripId,
    checklist.tripMedicationId
  );
  const uploadingChecklistItemId = uploadDocumentMutation.isPending
    ? (uploadDocumentMutation.variables?.checklistItemId ?? null)
    : null;

  const handleFileSelected =
    (item: TripMedicationChecklistItem) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null;
      event.target.value = '';
      if (!file) return;

      setUploadErrors((prev) => ({ ...prev, [item.checklistItemId]: null }));

      if (file.type !== 'application/pdf') {
        setUploadErrors((prev) => ({
          ...prev,
          [item.checklistItemId]: 'PDF 파일만 업로드할 수 있습니다.',
        }));
        return;
      }

      if (file.size > MAX_DOCUMENT_FILE_SIZE) {
        setUploadErrors((prev) => ({
          ...prev,
          [item.checklistItemId]: '파일 크기는 최대 10MB까지 가능합니다.',
        }));
        return;
      }

      uploadDocumentMutation.mutate(
        {
          checklistItemId: item.checklistItemId,
          type: getChecklistDocumentType(item.label),
          file,
        },
        {
          onSuccess: (response) => {
            setUploadedFilenames((prev) => ({
              ...prev,
              [item.checklistItemId]: response.result.originalFilename,
            }));
          },
          onError: (uploadError) => {
            const message =
              (uploadError as AxiosError<{ message?: string }>)?.response
                ?.data?.message ?? '파일 업로드에 실패했습니다.';
            setUploadErrors((prev) => ({
              ...prev,
              [item.checklistItemId]: message,
            }));
          },
        }
      );
    };

  return (
    <div className="flex flex-col gap-[26px]">
      <div className="flex items-center justify-between">
        <h2 className="text-[18px] font-semibold tracking-[0.432px] text-[#191919]">
          준비 체크 리스트
        </h2>
        <span className="text-[14px] font-semibold tracking-[0.336px] text-[#23408F]">
          {checklist.doneCount}/{checklist.totalCount}
        </span>
      </div>

      {checklist.items.length === 0 ? (
        <p className="text-[14px] tracking-[0.336px] text-[#848B9C]">
          추가로 준비할 서류가 없어요.
        </p>
      ) : (
        <div className="flex flex-col gap-[12px]">
          {checklist.items.map((item) => {
            const isUpload = item.kind === 'UPLOAD';
            const isChecked = item.done;
            const isUploadingThisItem =
              uploadingChecklistItemId === item.checklistItemId;

            return (
              <ChecklistBox
                key={item.checklistItemId}
                title={item.label}
                checked={isChecked}
                isOpen={openItemId === item.checklistItemId}
                onToggle={() =>
                  setOpenItemId((prev) =>
                    prev === item.checklistItemId ? null : item.checklistItemId
                  )
                }
                checkIcon={<img src={isChecked ? check : discheck} alt="" />}
                chevronIcon={<img src={downArrowIcon} alt="" />}
                onCheckClick={
                  isUpload
                    ? undefined
                    : () =>
                        updateChecklistItemMutation.mutate({
                          checklistItemId: item.checklistItemId,
                          done: !item.done,
                        })
                }
                checkDisabled={
                  isUpload ||
                  (updateChecklistItemMutation.isPending &&
                    pendingChecklistItemId === item.checklistItemId)
                }
              >
                <div className="flex flex-col gap-[10px]">
                  <p className="text-[13px] tracking-[0.312px] text-[#848B9C]">
                    {item.description}
                  </p>

                  {isUpload && (
                    <input
                      ref={(el) => {
                        fileInputRefs.current[item.checklistItemId] = el;
                      }}
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={handleFileSelected(item)}
                    />
                  )}

                  {isUpload ? (
                    item.done ? (
                      <div className="flex h-[54px] items-center gap-[10px] rounded-[10px] border-2 border-[#23408F] bg-[#EAF0FF] px-[10px] text-[#23408F]">
                        <span className="flex w-5 h-5 shrink-0">
                          <img src={documentIcon} alt="" />
                        </span>
                        <span className="flex-1 truncate text-sm font-semibold tracking-[-0.5px]">
                          {uploadedFilenames[item.checklistItemId] ??
                            '업로드 완료'}
                        </span>
                      </div>
                    ) : (
                      <ActionButton
                        variant="dashed"
                        label={
                          isUploadingThisItem ? '업로드 중...' : 'PDF 업로드'
                        }
                        icon={<img src={pdfIcon} alt="" />}
                        onClick={() =>
                          fileInputRefs.current[
                            item.checklistItemId
                          ]?.click()
                        }
                      />
                    )
                  ) : (
                    <ActionButton
                      label="기관 안내 확인"
                      icon={<img src={glassIcon} alt="" />}
                      onClick={() => {
                        if (item.formUrl) {
                          window.open(item.formUrl, '_blank');
                        }
                      }}
                    />
                  )}

                  {isUpload && uploadErrors[item.checklistItemId] && (
                    <p className="text-[13px] text-[#EF5050]">
                      {uploadErrors[item.checklistItemId]}
                    </p>
                  )}
                </div>
              </ChecklistBox>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default MedicineDetailPage;
