import { useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

import PageHeader from '@/components/layout/PageHeader';
import BottomButton from '@/components/button/BottomButton';
import DoubleButton from '@/components/button/DoubleButton';
import DocumentsIcon from '@/assets/images/sos/documentsIcon.svg';
import LanguageIcon from '@/assets/images/sos/languageIcon.svg';
import EmergencyBanner from './components/EmergencyBanner';
import EmergencyForm from './components/EmergencyForm';
import EmergencyResult from './components/EmergencyResult';
import EmergencyTranslation from './components/EmergencyTranslation';
import { useMedicationList } from '@/pages/home/services/useMedicationCards';
import { useAllTrips } from '@/pages/register/services/useTripDetail';
import {
  EMERGENCY_CONFIG,
  EMERGENCY_MOCK_OPTIONS,
  SOS_SITUATION,
  createEmergencyTranslation,
  type EmergencyAnswers,
  isEmergencyReason,
} from '@/constants/emergency';
import { useSosContacts, useSosScriptTranslation } from './services/useSos';
import type {
  SosContact,
  SosLocation,
  SosScriptResult,
} from '@/types/emergency/sos.type';

const Emergency = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<'form' | 'result' | 'translation'>('form');
  const [answers, setAnswers] = useState<EmergencyAnswers>({});
  const [location, setLocation] = useState<SosLocation | null>(null);
  const [contacts, setContacts] = useState<SosContact[]>([]);
  const [translatedScript, setTranslatedScript] =
    useState<SosScriptResult | null>(null);
  const { data: medications = [] } = useMedicationList(true);
  const { data: trips = [] } = useAllTrips();
  const {
    mutate: fetchContacts,
    isPending: isContactsPending,
    isError: isContactsError,
  } = useSosContacts();
  const {
    mutate: translateScript,
    isPending: isTranslationPending,
    isError: isTranslationError,
  } = useSosScriptTranslation();
  const pageRef = useRef<HTMLDivElement>(null);
  const reasonParam = searchParams.get('reason');
  const reason = isEmergencyReason(reasonParam) ? reasonParam : 'lost';
  const config = EMERGENCY_CONFIG[reason];
  const translationData = createEmergencyTranslation(reason, answers);
  const displayedTranslationData = translatedScript
    ? {
        ...translationData,
        targetLanguage: translatedScript.targetLanguageLabel,
        translatedText: translatedScript.translatedText,
      }
    : translationData;
  const isFormComplete = config.questions.every(({ field }) => {
    const answer = answers[field]?.label.trim();

    return (
      Boolean(answer) &&
      answer !== '위치 확인에 실패했습니다' &&
      answer !== '위치 정보를 지원하지 않는 브라우저입니다'
    );
  });
  const emergencyOptions = {
    ...EMERGENCY_MOCK_OPTIONS,
    trip: trips.map((trip) => ({
      value: String(trip.tripId),
      label: trip.title,
    })),
    medication: medications.map((medication) => ({
      value: String(medication.medicationId),
      label: medication.productKoName,
    })),
  };
  const handleConfirm = () => {
    const tripId = Number(answers.trip?.value);
    if (!isFormComplete || !Number.isSafeInteger(tripId) || tripId <= 0) return;

    fetchContacts(
      {
        situation: SOS_SITUATION[reason],
        tripId,
        location,
      },
      {
        onSuccess: (response) => {
          setContacts(response.result.contacts);
          setView('result');
          requestAnimationFrame(() =>
            pageRef.current?.scrollIntoView({ block: 'start' })
          );
        },
      }
    );
  };
  const handleTranslation = () => {
    const tripId = Number(answers.trip?.value);
    if (!Number.isSafeInteger(tripId) || tripId <= 0) return;

    translateScript(
      { tripId, text: translationData.sourceText },
      {
        onSuccess: (response) => {
          setTranslatedScript(response.result);
          setView('translation');
          requestAnimationFrame(() =>
            pageRef.current?.scrollIntoView({ block: 'start' })
          );
        },
      }
    );
  };

  return (
    <div ref={pageRef} className="flex flex-col min-h-full">
      <PageHeader
        title="긴급 도움"
        onBack={view === 'translation' ? () => setView('result') : undefined}
      />
      <div className="flex flex-col gap-6.5">
        <EmergencyBanner icon={config.icon} title={config.title} />

        <div className="flex flex-1 flex-col gap-8 pb-23">
          {view === 'result' ? (
            <EmergencyResult config={config} contacts={contacts} />
          ) : view === 'translation' ? (
            <EmergencyTranslation data={displayedTranslationData} />
          ) : (
            <EmergencyForm
              questions={config.questions}
              answers={answers}
              options={emergencyOptions}
              onLocationChange={setLocation}
              onAnswerChange={(field, answer) =>
                setAnswers((current) => ({ ...current, [field]: answer }))
              }
            />
          )}

          <div className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-100.5 overflow-y-auto bg-[#FAFAF6] px-6.5 pt-4 pb-[max(20px,env(safe-area-inset-bottom))]">
            {view === 'form' ? (
              <BottomButton
                text={
                  isContactsPending
                    ? '연락처 조회 중'
                    : isContactsError
                      ? '다시 시도'
                      : '확인'
                }
                disabled={!isFormComplete || isContactsPending}
                onClick={handleConfirm}
              />
            ) : view === 'result' ? (
              <DoubleButton
                leftButton={{
                  text: '서류함 이동',
                  icon: DocumentsIcon,
                  backgroundColor: '#A1ADCC',
                  onClick: () => navigate('/documents'),
                }}
                rightButton={{
                  text: isTranslationPending
                    ? '번역 중'
                    : isTranslationError
                      ? '번역 재시도'
                      : '현지어 설명문',
                  icon: LanguageIcon,
                  backgroundColor: '#23408F',
                  onClick: handleTranslation,
                  disabled: isTranslationPending,
                }}
              />
            ) : (
              <BottomButton
                text="서류함 이동"
                icon={DocumentsIcon}
                onClick={() => navigate('/documents')}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Emergency;
