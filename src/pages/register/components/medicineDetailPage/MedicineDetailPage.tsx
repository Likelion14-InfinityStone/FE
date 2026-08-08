import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDocumentUpload } from '@/hooks/useDocumentUpload';
import DetailTabBar from '@/pages/register/components/medicineDetailPage/components/DetailTabBar';
import MedicationPassportCard from '@/pages/register/components/medicineDetailPage/components/MedicinePassportCard';
import ChecklistBox from '@/pages/register/components/medicineDetailPage/components/button/ChecklistBox';
import ActionButton from '@/pages/register/components/medicineDetailPage/components/button/ActionButton';
import DocumentConfirmRow from '@/pages/register/components/medicineDetailPage/components/button/DocumentConfirmRow';
import UploadDropButton from '@/pages/register/components/medicineDetailPage/components/button/UploadDropButton';

import {
  MEDICINE_INFO,
  DESTINATION_RULES,
  CHECKLIST_ITEMS,
  SUMMARY_REASON,
  DETAIL_TABS,
  type ChecklistItemKey,
  type DestinationRuleStatus,
} from '@/constants/medicine';

import backIcon from '@/assets/images/register/medicineDetail/backIcon.svg';
import pillIcon from '@/assets/images/register/medicineDetail/pillIcon.svg';
import calinderIcon from '@/assets/images/register/medicineDetail/calinderIcon.svg';
import placeIcon from '@/assets/images/register/medicineDetail/placeIcon.svg';
import stopStemp from '@/assets/images/register/medicineDetail/stopStemp.svg';
import check from '@/assets/images/register/medicineDetail/check.svg';
import discheck from '@/assets/images/register/medicineDetail/discheck.svg';
import downArrowIcon from '@/assets/images/register/medicineDetail/downArrowIcon.svg';
import pdfIcon from '@/assets/images/register/medicineDetail/pdfIcon.svg';
import documentIcon from '@/assets/images/register/medicineDetail/documentIcon.svg';
import trashIcon from '@/assets/images/register/medicineDetail/trashIcon.svg';
import glassIcon from '@/assets/images/register/medicineDetail/glassIcon.svg';
import reasonPUFIIcon from '@/assets/images/register/medicineDetail/reasonPUFIIcon.svg';

type UploadableKey = Extract<ChecklistItemKey, 'prescription' | 'opinion'>;

const isUploadableKey = (key: ChecklistItemKey): key is UploadableKey =>
  key === 'prescription' || key === 'opinion';

const UPLOADABLE_KEYS = ['prescription', 'opinion'] as const;

const DESTINATION_RULE_STATUS_STYLES: Record<DestinationRuleStatus, string> = {
  warning: 'text-[#EF5050]',
  safe: 'text-[#23408F]',
};

const MedicineDetailPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(DETAIL_TABS[0].key);
  const [openItems, setOpenItems] = useState<Record<ChecklistItemKey, boolean>>(
    {
      prescription: false,
      opinion: false,
      preApproval: false,
    }
  );

  const {
    documents: uploadedDocuments,
    errors: uploadErrors,
    registerInput,
    openFilePicker: handleOpenFilePicker,
    handleFileSelected,
    confirmDocument: handleConfirmDocument,
    deleteDocument: handleDeleteDocument,
  } = useDocumentUpload(UPLOADABLE_KEYS);

  const toggleItem = (key: ChecklistItemKey) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="min-h-dvh w-full bg-[#FAFAF6] pb-10">
      <div className="relative flex items-center pt-5">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={() => navigate(-1)}
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
          name={MEDICINE_INFO.name}
          ingredient={MEDICINE_INFO.ingredient}
          stats={[
            {
              icon: <img src={pillIcon} alt="" className="h-6 w-6" />,
              label: '소지 수량',
              value: MEDICINE_INFO.possessionQuantity,
            },
            {
              icon: <img src={calinderIcon} alt="" className="h-6 w-6" />,
              label: '복용 기간',
              value: MEDICINE_INFO.dosagePeriod,
            },
            {
              icon: <img src={placeIcon} alt="" className="h-6 w-6" />,
              label: '대상 국가',
              value: MEDICINE_INFO.destinationCountry,
            },
          ]}
          // TODO: API 응답 결과에 따라 스탬프 아이콘 바뀔 예정
          stampImage={
            <img
              src={stopStemp}
              alt="기관문의 필요"
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
              {DESTINATION_RULES.map((rule) => (
                <div
                  key={rule.label}
                  className="flex items-center justify-between py-[13px] first:pt-0 last:pb-0"
                >
                  <span className="text-[16px] font-medium tracking-[0.384px] text-[#848B9C]">
                    {rule.label}
                  </span>
                  <span
                    className={`text-[16px] font-semibold tracking-[0.384px] ${DESTINATION_RULE_STATUS_STYLES[rule.status]}`}
                  >
                    {rule.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'checklist' && (
          <div className="flex flex-col gap-[26px]">
            <h2 className="text-[18px] font-semibold tracking-[0.432px] text-[#191919]">
              준비 체크 리스트
            </h2>

            <input
              ref={registerInput('prescription')}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={handleFileSelected('prescription')}
            />
            <input
              ref={registerInput('opinion')}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={handleFileSelected('opinion')}
            />

            <div className="flex flex-col gap-[12px]">
              {CHECKLIST_ITEMS.map((item) => {
                const uploadKey: UploadableKey | null = isUploadableKey(
                  item.key
                )
                  ? item.key
                  : null;
                const isChecked = uploadKey
                  ? uploadedDocuments[uploadKey] !== null
                  : item.checked;

                return (
                  <ChecklistBox
                    key={item.key}
                    title={item.title}
                    checked={isChecked}
                    isOpen={openItems[item.key]}
                    onToggle={() => toggleItem(item.key)}
                    checkIcon={
                      <img src={isChecked ? check : discheck} alt="" />
                    }
                    chevronIcon={<img src={downArrowIcon} alt="" />}
                  >
                    {uploadKey && (
                      <div className="flex flex-col gap-[10px]">
                        {uploadedDocuments[uploadKey] ? (
                          <DocumentConfirmRow
                            documentIcon={<img src={documentIcon} alt="" />}
                            trashIcon={<img src={trashIcon} alt="" />}
                            onConfirmDocument={handleConfirmDocument(uploadKey)}
                            onDelete={handleDeleteDocument(uploadKey)}
                          />
                        ) : (
                          <div className="flex flex-col gap-[10px]">
                            <UploadDropButton
                              label="PDF 업로드"
                              icon={<img src={pdfIcon} alt="" />}
                              onClick={() => handleOpenFilePicker(uploadKey)}
                            />
                          </div>
                        )}
                        {uploadErrors[uploadKey] && (
                          <p className="text-[13px] text-[#EF5050]">
                            {uploadErrors[uploadKey]}
                          </p>
                        )}
                      </div>
                    )}

                    {item.key === 'preApproval' && (
                      // TODO: 추후 DB 연동 후 실제 사전 허가 신청 상태 페이지로 이동
                      <ActionButton
                        label="신청 상태 보러가기"
                        icon={<img src={glassIcon} alt="" />}
                        onClick={() => {}}
                      />
                    )}
                  </ChecklistBox>
                );
              })}
            </div>
          </div>
        )}

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
                <p className="text-[14px] tracking-[0.336px] text-[#191919]">
                  {SUMMARY_REASON.description}
                </p>
                <div className="mt-3 flex flex-col text-right text-[12px] tracking-[0.288px] text-[#6D6D6D]">
                  <p>{SUMMARY_REASON.source}</p>
                  <p>{SUMMARY_REASON.lastUpdated}</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MedicineDetailPage;
