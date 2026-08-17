import { useState } from 'react';

import {
  EMERGENCY_MOCK_OPTIONS,
  type EmergencyAnswers,
  type EmergencyConfig,
} from '@/constants/emergency';
import SosQuestion from './SosQuestion';

interface EmergencyFormProps {
  questions: EmergencyConfig['questions'];
  answers: EmergencyAnswers;
  onAnswerChange: (index: number, value: string) => void;
}

interface ReverseGeocodeResponse {
  countryName?: string;
}

const getCurrentPosition = () =>
  new Promise<GeolocationPosition>((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000,
    });
  });

const EmergencyForm = ({
  questions,
  answers,
  onAnswerChange,
}: EmergencyFormProps) => {
  const [openQuestionIndex, setOpenQuestionIndex] = useState<number | null>(
    null
  );
  const [locatingQuestionIndex, setLocatingQuestionIndex] = useState<
    number | null
  >(null);

  const handleLocation = async (index: number) => {
    if (!navigator.geolocation) {
      onAnswerChange(index, '위치 정보를 지원하지 않는 브라우저입니다');
      return;
    }

    setLocatingQuestionIndex(index);

    try {
      const { coords } = await getCurrentPosition();
      const searchParams = new URLSearchParams({
        latitude: String(coords.latitude),
        longitude: String(coords.longitude),
        localityLanguage: 'ko',
      });
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?${searchParams}`
      );

      if (!response.ok) {
        throw new Error('국가 정보를 불러오지 못했습니다.');
      }

      const data = (await response.json()) as ReverseGeocodeResponse;

      if (!data.countryName) {
        throw new Error('국가 정보를 확인하지 못했습니다.');
      }

      onAnswerChange(index, data.countryName);
    } catch {
      onAnswerChange(index, '위치 확인에 실패했습니다');
    } finally {
      setLocatingQuestionIndex(null);
    }
  };

  return (
    <div className="flex flex-col gap-6.5">
      {questions.map(({ label, placeholder, type }, index) => (
        <SosQuestion
          key={label}
          label={label}
          placeholder={placeholder}
          type={type}
          isOpen={openQuestionIndex === index}
          selectedValue={answers[index]}
          options={EMERGENCY_MOCK_OPTIONS}
          onToggle={() =>
            setOpenQuestionIndex((current) =>
              current === index ? null : index
            )
          }
          onSelect={(value) => {
            onAnswerChange(index, value);
            setOpenQuestionIndex(null);
          }}
          onLocation={() => void handleLocation(index)}
          isLocating={locatingQuestionIndex === index}
        />
      ))}
    </div>
  );
};

export default EmergencyForm;
