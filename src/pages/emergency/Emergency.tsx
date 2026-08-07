import { useRef, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import PageHeader from '@/components/layout/PageHeader';
import BottomButton from '@/components/button/BottomButton';
import EmergencyBanner from './components/EmergencyBanner';
import EmergencyForm from './components/EmergencyForm';
import EmergencyResult from './components/EmergencyResult';
import { EMERGENCY_CONFIG, isEmergencyReason } from '@/constants/emergency';

const Emergency = () => {
  const [searchParams] = useSearchParams();
  const [showResult, setShowResult] = useState(false);
  const pageRef = useRef<HTMLDivElement>(null);
  const reasonParam = searchParams.get('reason');
  const reason = isEmergencyReason(reasonParam) ? reasonParam : 'lost';
  const config = EMERGENCY_CONFIG[reason];

  return (
    <div ref={pageRef} className="flex flex-col min-h-full">
      <PageHeader title="긴급 도움" />
      <div className="flex flex-col gap-6.5">
        <EmergencyBanner icon={config.icon} title={config.title} />

        <div
          className={`flex flex-1 flex-col gap-8 ${showResult ? '' : 'pb-23'}`}
        >
          {showResult ? (
            <EmergencyResult config={config} />
          ) : (
            <EmergencyForm questions={config.questions} />
          )}

          {!showResult && (
            <div className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-100.5 overflow-y-auto bg-[#FAFAF6] px-6.5 pt-4 pb-[max(20px,env(safe-area-inset-bottom))]">
              <BottomButton
                text="확인"
                onClick={() => {
                  setShowResult(true);
                  requestAnimationFrame(() =>
                    pageRef.current?.scrollIntoView({ block: 'start' })
                  );
                }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Emergency;
