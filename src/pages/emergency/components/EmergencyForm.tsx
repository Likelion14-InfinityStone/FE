import { useState } from 'react';

import {
  EMERGENCY_MOCK_OPTIONS,
  type EmergencyAnswers,
  type EmergencyConfig,
  type EmergencyField,
  type EmergencyOption,
  type EmergencyOptionMap,
} from '@/constants/emergency';
import SosQuestion from './SosQuestion';
import type { SosLocation } from '@/types/emergency/sos.type';

interface EmergencyFormProps {
  questions: EmergencyConfig['questions'];
  answers: EmergencyAnswers;
  options?: EmergencyOptionMap;
  onAnswerChange: (field: EmergencyField, answer: EmergencyOption) => void;
  onLocationChange: (location: SosLocation | null) => void;
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
  options = EMERGENCY_MOCK_OPTIONS,
  onAnswerChange,
  onLocationChange,
}: EmergencyFormProps) => {
  const [openQuestion, setOpenQuestion] = useState<EmergencyField | null>(null);
  const [locatingQuestion, setLocatingQuestion] =
    useState<EmergencyField | null>(null);

  const handleLocation = async (field: EmergencyField) => {
    if (!navigator.geolocation) {
      onLocationChange(null);
      const message = '위치 정보를 지원하지 않는 브라우저입니다';
      onAnswerChange(field, { value: message, label: message });
      return;
    }

    setLocatingQuestion(field);

    try {
      const { coords } = await getCurrentPosition();
      onLocationChange({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
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

      onAnswerChange(field, {
        value: data.countryName,
        label: data.countryName,
      });
    } catch {
      onLocationChange(null);
      const message = '위치 확인에 실패했습니다';
      onAnswerChange(field, { value: message, label: message });
    } finally {
      setLocatingQuestion(null);
    }
  };

  return (
    <div className="flex flex-col gap-6.5">
      {questions.map(({ field, label, placeholder, type }) => (
        <SosQuestion
          key={field}
          label={label}
          placeholder={placeholder}
          type={type}
          isOpen={openQuestion === field}
          selectedValue={answers[field]?.label}
          selectedOptionValue={answers[field]?.value}
          options={options[field] ?? []}
          onToggle={() =>
            setOpenQuestion((current) => (current === field ? null : field))
          }
          onSelect={(answer) => {
            onAnswerChange(field, answer);
            if (type !== 'text') setOpenQuestion(null);
          }}
          onLocation={() => void handleLocation(field)}
          isLocating={locatingQuestion === field}
        />
      ))}
    </div>
  );
};

export default EmergencyForm;
