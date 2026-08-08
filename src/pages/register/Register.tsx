import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

type StoredDocument = { name: string; dataUrl: string };

const DESTINATION_RULE_STATUS_STYLES: Record<DestinationRuleStatus, string> = {
  warning: 'text-[#EF5050]',
  safe: 'text-[#23408F]',
};

// TODO: 지금은 임시로 localStorage에 저장 - 추후 DB(백엔드) 연동되면 API 호출로 교체 예정
const DOCUMENT_STORAGE_KEYS: Record<UploadableKey, string> = {
  prescription: 'medicineDetail:document:prescription',
  opinion: 'medicineDetail:document:opinion',
};

const readStoredDocument = (key: UploadableKey): StoredDocument | null => {
  try {
    const raw = localStorage.getItem(DOCUMENT_STORAGE_KEYS[key]);
    return raw ? (JSON.parse(raw) as StoredDocument) : null;
  } catch {
    return null;
  }
};

const writeStoredDocument = (
  key: UploadableKey,
  doc: StoredDocument | null
): boolean => {
  try {
    if (doc) {
      localStorage.setItem(DOCUMENT_STORAGE_KEYS[key], JSON.stringify(doc));
    } else {
      localStorage.removeItem(DOCUMENT_STORAGE_KEYS[key]);
    }
    return true;
  } catch {
    // localStorage 용량 초과 등으로 저장에 실패한 경우 호출부에서 화면 상태를 되돌릴 수 있도록 알림
    return false;
  }
};

// "%PDF-" 매직 바이트 확인 - accept 속성은 파일 선택기의 필터일 뿐 실제 파일 내용을 보장하지 않음
const PDF_HEADER_BYTES = [0x25, 0x50, 0x44, 0x46, 0x2d] as const;

const isPdfDataUrl = (dataUrl: string): boolean => {
  const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1);
  try {
    const headerBytes = atob(base64.slice(0, 8));
    if (headerBytes.length < PDF_HEADER_BYTES.length) return false;
    return PDF_HEADER_BYTES.every(
      (byte, index) => headerBytes.charCodeAt(index) === byte
    );
  } catch {
    return false;
  }
};

const dataUrlToBlob = (dataUrl: string, mime: string): Blob => {
  const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
};

const openFilePreviewWindow = (doc: StoredDocument) => {
  // 저장 시 PDF 매직 바이트를 검증했더라도, 미리보기 Blob은 항상 application/pdf로 고정해
  // 브라우저가 이를 HTML 등으로 렌더링(오리진 내 스크립트 실행)하지 않도록 한다
  const blobUrl = URL.createObjectURL(
    dataUrlToBlob(doc.dataUrl, 'application/pdf')
  );
  window.open(blobUrl, '_blank', 'noopener,noreferrer');
};

const Register = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>(DETAIL_TABS[0].key);
  const [openItems, setOpenItems] = useState<Record<ChecklistItemKey, boolean>>(
    {
      prescription: false,
      opinion: false,
      preApproval: false,
    }
  );

  // 영문 처방전 / 의사 소견서 업로드 파일 - 업로드되면 체크 표시가 파란색으로 바뀜
  // 지금은 임시로 localStorage에서 불러오고 저장함 (추후 DB 연동 시 서버 데이터로 교체)
  const [uploadedDocuments, setUploadedDocuments] = useState<
    Record<UploadableKey, StoredDocument | null>
  >(() => ({
    prescription: readStoredDocument('prescription'),
    opinion: readStoredDocument('opinion'),
  }));

  const [uploadErrors, setUploadErrors] = useState<
    Record<UploadableKey, string | null>
  >({ prescription: null, opinion: null });

  const prescriptionFileInputRef = useRef<HTMLInputElement>(null);
  const opinionFileInputRef = useRef<HTMLInputElement>(null);
  const fileInputRefs: Record<
    UploadableKey,
    React.RefObject<HTMLInputElement | null>
  > = {
    prescription: prescriptionFileInputRef,
    opinion: opinionFileInputRef,
  };

  // 키별 요청 버전 - 늦게 끝난 이전 FileReader.onload가 이후의 새 선택/삭제 상태를 덮어쓰지 않도록 막는다
  const fileRequestVersionRef = useRef<Record<UploadableKey, number>>({
    prescription: 0,
    opinion: 0,
  });

  const toggleItem = (key: ChecklistItemKey) => {
    setOpenItems((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleOpenFilePicker = (key: UploadableKey) => {
    fileInputRefs[key].current?.click();
  };

  const handleFileSelected =
    (key: UploadableKey) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null;
      event.target.value = '';
      if (!file) return;

      const requestVersion = (fileRequestVersionRef.current[key] += 1);
      setUploadErrors((prev) => ({ ...prev, [key]: null }));

      const reader = new FileReader();
      reader.onload = () => {
        // 이 요청이 최신이 아니면(그 사이 새 파일이 선택되었거나 삭제되었으면) 결과를 버린다
        if (fileRequestVersionRef.current[key] !== requestVersion) return;
        if (typeof reader.result !== 'string') return;

        if (!isPdfDataUrl(reader.result)) {
          setUploadErrors((prev) => ({
            ...prev,
            [key]: 'PDF 파일만 업로드할 수 있습니다.',
          }));
          return;
        }

        const doc: StoredDocument = { name: file.name, dataUrl: reader.result };
        if (!writeStoredDocument(key, doc)) {
          setUploadErrors((prev) => ({
            ...prev,
            [key]: '파일 저장에 실패했습니다. 다시 시도해 주세요.',
          }));
          return;
        }
        setUploadedDocuments((prev) => ({ ...prev, [key]: doc }));
      };
      reader.readAsDataURL(file);
    };

  const handleConfirmDocument = (key: UploadableKey) => () => {
    const doc = uploadedDocuments[key];
    if (doc) openFilePreviewWindow(doc);
  };

  const handleDeleteDocument = (key: UploadableKey) => () => {
    // 진행 중이던 이전 파일 읽기가 완료돼도 이 삭제 이후에는 무시되도록 버전을 올린다
    fileRequestVersionRef.current[key] += 1;

    if (!writeStoredDocument(key, null)) {
      setUploadErrors((prev) => ({
        ...prev,
        [key]: '파일 삭제에 실패했습니다. 다시 시도해 주세요.',
      }));
      return;
    }
    setUploadErrors((prev) => ({ ...prev, [key]: null }));
    setUploadedDocuments((prev) => ({ ...prev, [key]: null }));
  };

  return (
    <div className="min-h-dvh w-full bg-[#FAFAF6] pb-10">
      <div className="relative flex h-[30px] items-center pt-5">
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
          // TODO: API 응답 결과에 따라 스탬프 아이콘이 동적으로 바뀔 예정
          // (stopStemp: 반입 금지/기관 문의, readyStemp: 반입 가능, ckeckStemp: 조건부 확인)
          // 지금은 stopStemp로 고정
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
              ref={prescriptionFileInputRef}
              type="file"
              accept=".pdf,application/pdf"
              className="hidden"
              onChange={handleFileSelected('prescription')}
            />
            <input
              ref={opinionFileInputRef}
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
          <div>
            <div className="flex items-start justify-between">
              <h2 className="pt-[3px] text-[18px] font-semibold tracking-[0.432px] text-[#191919]">
                요약 근거
              </h2>
              {/* 강아지 아이콘은 헤딩과 같은 줄에서, 카드보다 항상 위(z-index)에 그려짐 */}
              <img
                src={reasonPUFIIcon}
                alt=""
                className="relative z-10 h-[52px] w-[70px] object-contain"
              />
            </div>
            <div className="relative z-0 -mt-[5px] box-border rounded-[20px] border-2 border-[#23408F] bg-[#FCFCFC] p-[16px_13px] shadow-[0px_2px_2px_0px_rgba(113,112,113,0.2)]">
              <p className="text-[14px] tracking-[0.336px] text-[#191919]">
                {SUMMARY_REASON.description}
              </p>
              <div className="mt-3 flex flex-col text-right text-[12px] tracking-[0.288px] text-[#6D6D6D]">
                <p>{SUMMARY_REASON.source}</p>
                <p>{SUMMARY_REASON.lastUpdated}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
