import { useState } from 'react';

import type { EmergencyConfig } from '@/constants/emergency';
import SosQuestion from './SosQuestion';

interface EmergencyFormProps {
  questions: EmergencyConfig['questions'];
}

const OPTIONS = ['선택지 1', '선택지 2', '선택지 3', '선택지 4'] as const;

const EmergencyForm = ({ questions }: EmergencyFormProps) => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(
    null
  );
  const [selectedValues, setSelectedValues] = useState<Record<number, string>>(
    {}
  );

  return (
    <div className="flex flex-col gap-6.5">
      {questions.map(({ label, placeholder, type }, index) => (
        <SosQuestion
          key={label}
          label={label}
          placeholder={placeholder}
          type={type}
          isOpen={openQuestionIndex === index}
          selectedValue={selectedValues[index]}
          options={OPTIONS}
          onToggle={() =>
            setOpenQuestionIndex((current) =>
              current === index ? null : index
            )
          }
          onSelect={(value) => {
            setSelectedValues((current) => ({
              ...current,
              [index]: value,
            }));
            setOpenQuestionIndex(null);
          }}
        />
      ))}
    </div>
  );
};

export default EmergencyForm;
