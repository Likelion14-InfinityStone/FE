import type { EmergencyConfig } from '@/constants/emergency';
import type { SosContact } from '@/types/emergency/sos.type';
import ResultRow from './ResultRow';
import ResultTable from './ResultTable';

interface EmergencyResultProps {
  config: EmergencyConfig;
  contacts: SosContact[];
}

const EmergencyResult = ({ config, contacts }: EmergencyResultProps) => {
  const handleFindHospital = () => {
    window.open(
      'https://www.google.com/maps/search/?api=1&query=hospitals+near+me',
      '_blank',
      'noopener,noreferrer'
    );
  };

  return (
    <div className="flex flex-col gap-6">
      <p className="font-Pretendard text-[0.875rem] leading-4.9 tracking-[0.3px] text-[#848B9C]">
        입력하신 정보를 바탕으로 현지어 설명문과 행동 순서를 만들어 드렸어요.
        서류함에서 관련 서류를 바로 확인할 수 있어요.
      </p>

      <ResultTable title="대응 순서">
        {config.steps.map((step, index) => (
          <ResultRow
            key={step}
            index={index + 1}
            label={step}
            actionLabel={
              step === '현지 의료기관 방문하기' ? '기관 찾기' : undefined
            }
            onAction={
              step === '현지 의료기관 방문하기' ? handleFindHospital : undefined
            }
          />
        ))}
      </ResultTable>

      <ResultTable title="연락처">
        {contacts.map(({ order, type, name, phone, note }) => (
          <ResultRow
            key={`${type}-${order}`}
            index={order}
            label={name}
            value={phone}
            note={note}
          />
        ))}
      </ResultTable>
    </div>
  );
};

export default EmergencyResult;
