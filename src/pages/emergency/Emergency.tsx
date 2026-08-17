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
import {
  EMERGENCY_CONFIG,
  EMERGENCY_MOCK_OPTIONS,
  createEmergencyTranslation,
  type EmergencyAnswers,
  isEmergencyReason,
} from '@/constants/emergency';

const Emergency = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [view, setView] = useState<'form' | 'result' | 'translation'>('form');
  const [answers, setAnswers] = useState<EmergencyAnswers>({});
  const { data: medications = [] } = useMedicationList(true);
  const pageRef = useRef<HTMLDivElement>(null);
  const reasonParam = searchParams.get('reason');
  const reason = isEmergencyReason(reasonParam) ? reasonParam : 'lost';
  const config = EMERGENCY_CONFIG[reason];
  const translationData = createEmergencyTranslation(reason, answers);
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
    medication: medications.map((medication) => ({
      value: String(medication.medicationId),
      label: medication.productKoName,
    })),
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
            <EmergencyResult config={config} />
          ) : view === 'translation' ? (
            <EmergencyTranslation data={translationData} />
          ) : (
            <EmergencyForm
              questions={config.questions}
              answers={answers}
              options={emergencyOptions}
              onAnswerChange={(field, answer) =>
                setAnswers((current) => ({ ...current, [field]: answer }))
              }
            />
          )}

          <div className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-100.5 overflow-y-auto bg-[#FAFAF6] px-6.5 pt-4 pb-[max(20px,env(safe-area-inset-bottom))]">
            {view === 'form' ? (
              <BottomButton
                text="확인"
                disabled={!isFormComplete}
                onClick={() => {
                  setView('result');
                  requestAnimationFrame(() =>
                    pageRef.current?.scrollIntoView({ block: 'start' })
                  );
                }}
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
                  text: '현지어 설명문',
                  icon: LanguageIcon,
                  backgroundColor: '#23408F',
                  onClick: () => {
                    setView('translation');
                    requestAnimationFrame(() =>
                      pageRef.current?.scrollIntoView({ block: 'start' })
                    );
                  },
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
