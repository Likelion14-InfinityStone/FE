import WSosLostIcon from '@/assets/images/sos/wsosLostIcon.svg';
import WSosPoliceIcon from '@/assets/images/sos/wsosPoliceIcon.svg';
import WSosShortageIcon from '@/assets/images/sos/wsosShortageIcon.svg';
import WSosEmergencyIcon from '@/assets/images/sos/wsosEmergencyIcon.svg';
import type { SosSituation } from '@/types/emergency/sos.type';

export type EmergencyReason = 'lost' | 'police' | 'shortage' | 'symptom';
export type SosQuestionType = 'select' | 'location' | 'text';
export type EmergencyField =
  'trip' | 'medication' | 'location' | 'status' | 'request' | 'medicalHistory';

export interface EmergencyOption {
  value: string;
  label: string;
}

export type EmergencyAnswers = Partial<Record<EmergencyField, EmergencyOption>>;
export type EmergencyOptionMap = Partial<
  Record<EmergencyField, readonly EmergencyOption[]>
>;

export interface EmergencyConfig {
  icon: string;
  title: string;
  questions: Array<{
    field: EmergencyField;
    label: string;
    placeholder: string;
    type?: SosQuestionType;
  }>;
  steps: string[];
}

export interface EmergencyTranslationData {
  sourceLanguage: string;
  targetLanguage: string;
  sourceText: string;
  translatedText: string;
}

export const EMERGENCY_MOCK_OPTIONS: EmergencyOptionMap = {
  trip: [
    { value: '1', label: '일본 여행' },
    { value: '2', label: '미국 여행' },
  ],
};

export const SOS_SITUATION: Record<EmergencyReason, SosSituation> = {
  lost: 'MEDICATION_LOST',
  police: 'CUSTOMS_CHECK',
  shortage: 'MEDICATION_SHORTAGE',
  symptom: 'EMERGENCY_SYMPTOM',
};

const EMERGENCY_REASON_TEXT: Record<EmergencyReason, { text: string }> = {
  lost: {
    text: '여행 중 복용하던 약을 분실했습니다.',
  },
  police: {
    text: '현재 세관 혹은 경찰의 확인을 받고 있습니다.',
  },
  shortage: {
    text: '여행 중 복용할 약이 부족합니다.',
  },
  symptom: {
    text: '현재 응급 증상이 있습니다.',
  },
};

export const createEmergencyTranslation = (
  reason: EmergencyReason,
  answers: EmergencyAnswers
): EmergencyTranslationData => {
  const reasonText = EMERGENCY_REASON_TEXT[reason];
  const status = answers.status?.label.trim() || '괜찮음';

  return {
    sourceLanguage: '한국어',
    targetLanguage: '일본어',
    sourceText: [
      '안녕하세요. 저는 대한민국에서 온 여행객입니다.',
      reasonText.text,
      `지금 상황은 ‘${status}’ 상황입니다.`,
      '이 약은 제 건강 관리를 위해 복용하고 있는 약입니다.',
      '동일한 성분의 약을 구하거나 필요한 조치를 안내받고 싶습니다.',
      '제가 추가로 해당 약의 서류와 약 정보를 보여드릴게요.',
    ].join('\n'),
    translatedText: '',
  };
};

export const EMERGENCY_CONFIG: Record<EmergencyReason, EmergencyConfig> = {
  lost: {
    icon: WSosLostIcon,
    title: '약을 잃어버렸어요',
    questions: [
      {
        field: 'trip',
        label: '현재 어떤 여행지인가요?',
        placeholder: '선택해 주세요',
      },
      {
        field: 'medication',
        label: '어떤 약을 분실하셨나요?',
        placeholder: '선택해 주세요',
      },
      {
        field: 'location',
        label: '현재 위치가 어디인가요?',
        placeholder: '현위치 확인',
        type: 'location',
      },
      {
        field: 'status',
        label: '현재 상태는 어떠신가요?',
        placeholder: '직접 입력하기',
        type: 'text',
      },
    ],
    steps: [
      '현지 경찰에 신고하기',
      '신고 번호 · 확인서 요청하기',
      '여행자 보험사에 연락하기',
      '재외공관에 연락하기',
      '현지 의료기관 방문하기',
      '약 성분 및 처방 정보 등 서류 제시하기',
    ],
  },
  police: {
    icon: WSosPoliceIcon,
    title: '세관 혹은 경찰의 확인을 받고 있어요',
    questions: [
      {
        field: 'trip',
        label: '현재 어떤 여행지인가요?',
        placeholder: '선택해 주세요',
      },
      {
        field: 'medication',
        label: '어떤 약을 확인받으시나요?',
        placeholder: '선택해 주세요',
      },
      {
        field: 'status',
        label: '어떤 상황인가요?',
        placeholder: '직접 입력하기',
        type: 'text',
      },
      {
        field: 'request',
        label: '무엇을 요구받았나요?',
        placeholder: '직접 입력하기',
        type: 'text',
      },
    ],
    steps: [
      '서류함 이동',
      '현지어 설명문 열람하기',
      '임의 폐기 및 서명 전 내용 필수 확인',
      '재외공관에 도움 요청하기',
    ],
  },
  shortage: {
    icon: WSosShortageIcon,
    title: '가져온 약이 부족해요',
    questions: [
      {
        field: 'trip',
        label: '현재 어떤 여행지인가요?',
        placeholder: '선택해 주세요',
      },
      {
        field: 'medication',
        label: '어떤 약이 부족한가요?',
        placeholder: '선택해 주세요',
      },
      {
        field: 'location',
        label: '현재 위치가 어디인가요?',
        placeholder: '현위치 확인',
        type: 'location',
      },
      {
        field: 'status',
        label: '현재 상태는 어떠신가요?',
        placeholder: '직접 입력하기',
        type: 'text',
      },
    ],
    steps: [
      '임의로 동일 제품 구매 금지',
      '현지 의료기관 방문하기',
      '기존 복약 정보 제시하기',
      '국내 처방기관에 연락하기',
      '재외공관 의료기관 정보 확인하기',
      '약 성분 및 처방 정보 등 서류 제시하기',
    ],
  },
  symptom: {
    icon: WSosEmergencyIcon,
    title: '응급 증상이 있어요',
    questions: [
      {
        field: 'trip',
        label: '현재 어떤 여행지인가요?',
        placeholder: '선택해 주세요',
      },
      {
        field: 'medication',
        label: '어떤 약을 복용 중인가요?',
        placeholder: '선택해 주세요',
      },
      {
        field: 'location',
        label: '현재 위치가 어디인가요?',
        placeholder: '현위치 확인',
        type: 'location',
      },
      {
        field: 'status',
        label: '현재 상태는 어떠신가요?',
        placeholder: '직접 입력하기',
        type: 'text',
      },
      {
        field: 'medicalHistory',
        label: '알레르기나 기저질환이 있으신가요?',
        placeholder: '직접 입력하기',
        type: 'text',
      },
    ],
    steps: [
      '즉시 현지 응급번호로 연결하기',
      '현지 의료기관 방문하기',
      '서류함 이동하여 기존 복약정보 제시',
      '알레르기 · 기저질환 정보 함께 전달하기',
      '필요 시 재외공관에 연락하기',
    ],
  },
};

export const isEmergencyReason = (
  value: string | null
): value is EmergencyReason =>
  value === 'lost' ||
  value === 'police' ||
  value === 'shortage' ||
  value === 'symptom';
