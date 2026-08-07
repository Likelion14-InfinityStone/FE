import WSosLostIcon from '@/assets/images/sos/wsosLostIcon.svg';
import WSosPoliceIcon from '@/assets/images/sos/wsosPoliceIcon.svg';
import WSosShortageIcon from '@/assets/images/sos/wsosShortageIcon.svg';
import WSosEmergencyIcon from '@/assets/images/sos/wsosEmergencyIcon.svg';

export type EmergencyReason = 'lost' | 'police' | 'shortage' | 'symptom';
export type SosQuestionType = 'select' | 'location' | 'text';

export interface EmergencyConfig {
  icon: string;
  title: string;
  questions: Array<{
    label: string;
    placeholder: string;
    type?: SosQuestionType;
  }>;
  steps: string[];
  contacts: Array<{ name: string; phone: string }>;
}

const COMMON_CONTACTS = [
  { name: '현지 경찰서', phone: '123-7899-4567' },
  { name: '재외공관', phone: '123-1567-1235' },
  { name: '국내 처방 기관', phone: '123-4568-1239' },
];

export const EMERGENCY_CONFIG: Record<EmergencyReason, EmergencyConfig> = {
  lost: {
    icon: WSosLostIcon,
    title: '약을 잃어버렸어요',
    questions: [
      { label: '현재 어떤 여행지인가요?', placeholder: '선택해 주세요' },
      { label: '어떤 약을 분실하셨나요?', placeholder: '선택해 주세요' },
      {
        label: '현재 위치가 어디인가요?',
        placeholder: '현위치 확인',
        type: 'location',
      },
      { label: '현재 상태는 어떠신가요?', placeholder: '선택해 주세요' },
    ],
    steps: [
      '현지 경찰에 신고하기',
      '신고 번호 · 확인서 요청하기',
      '여행자 보험사에 연락하기',
      '재외공관에 연락하기',
      '현지 의료기관 방문하기',
      '약 성분 및 처방 정보 등 서류 제시하기',
    ],
    contacts: COMMON_CONTACTS,
  },
  police: {
    icon: WSosPoliceIcon,
    title: '세관 혹은 경찰의 확인을 받고 있어요',
    questions: [
      { label: '현재 어떤 여행지인가요?', placeholder: '선택해 주세요' },
      { label: '어떤 약을 확인받으시나요?', placeholder: '선택해 주세요' },
      { label: '어떤 상황인가요?', placeholder: '선택해 주세요' },
      { label: '무엇을 요구받았나요?', placeholder: '선택해 주세요' },
    ],
    steps: [
      '서류함 이동',
      '현지어 설명문 열람하기',
      '임의 폐기 및 서명 전 내용 필수 확인',
      '재외공관에 도움 요청하기',
    ],
    contacts: COMMON_CONTACTS,
  },
  shortage: {
    icon: WSosShortageIcon,
    title: '가져온 약이 부족해요',
    questions: [
      { label: '현재 어떤 여행지인가요?', placeholder: '선택해 주세요' },
      { label: '어떤 약이 부족한가요?', placeholder: '선택해 주세요' },
      {
        label: '현재 위치가 어디인가요?',
        placeholder: '현위치 확인',
        type: 'location',
      },
      { label: '현재 상태는 어떠신가요?', placeholder: '선택해 주세요' },
    ],
    steps: [
      '임의로 동일 제품 구매 금지',
      '현지 의료기관 방문하기',
      '기존 복약 정보 제시하기',
      '국내 처방기관에 연락하기',
      '재외공관 의료기관 정보 확인하기',
      '약 성분 및 처방 정보 등 서류 제시하기',
    ],
    contacts: [
      { name: '현지 응급 번호', phone: '123-7899-4567' },
      { name: '재외공관', phone: '123-1567-1235' },
      { name: '국내 처방 기관', phone: '123-4568-1239' },
    ],
  },
  symptom: {
    icon: WSosEmergencyIcon,
    title: '응급 증상이 있어요',
    questions: [
      { label: '현재 어떤 여행지인가요?', placeholder: '선택해 주세요' },
      { label: '어떤 약을 복용 중인가요?', placeholder: '선택해 주세요' },
      {
        label: '현재 위치가 어디인가요?',
        placeholder: '현위치 확인',
        type: 'location',
      },
      { label: '현재 상태는 어떠신가요?', placeholder: '선택해 주세요' },
      {
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
    contacts: COMMON_CONTACTS,
  },
};

export const isEmergencyReason = (
  value: string | null
): value is EmergencyReason =>
  value === 'lost' ||
  value === 'police' ||
  value === 'shortage' ||
  value === 'symptom';
