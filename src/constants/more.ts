export type MoreMenuItem = {
  label: string;
  path: string;
};

export type NoticeContent = {
  title: string;
  effectiveDate?: string;
  body: string[];
};

export type FaqItem = {
  question: string;
  answer: string[];
};

export const contents = {
  profile: {
    name: '피루피루',
    email: 'pirupiru@medipass.hs',
  },
  policies: [
    { label: '개인정보 처리방침', path: '/account/privacy' },
    { label: '이용 약관', path: '/account/terms' },
    { label: '오픈소스 라이선스', path: '/account/license' },
  ] as MoreMenuItem[],
  support: [
    { label: '자주 묻는 질문 (FAQ)', path: '/account/faq' },
  ] as MoreMenuItem[],
  version: 'Ver.1.1.0.',
  privacyPolicy: {
    title: '개인정보 처리방침',
    effectiveDate: '시행일 : 2026년 7월 29일',
    body: [
      '인피니티스톤(이하 "운영팀")은 이용자의 개인정보를 중요하게 생각하며, 「개인정보 보호법」 등 관련 법령을 준수하기 위해 최선을 다하고 있습니다.',
      '메디패스(MediPass)는 해외여행 시 의약품 관리 및 국가별 반입 규정 확인 서비스를 제공하기 위해 필요한 최소한의 개인정보를 수집·이용합니다.',
    ],
  } as NoticeContent,
  terms: {
    title: '이용 약관',
    effectiveDate: '시행일 : 2026년 7월 29일',
    body: [
      '인피니티스톤(이하 "운영팀")은 이용자의 개인정보를 중요하게 생각하며, 「개인정보 보호법」 등 관련 법령을 준수하기 위해 최선을 다하고 있습니다.',
      '메디패스(MediPass)는 해외여행 시 의약품 관리 및 국가별 반입 규정 확인 서비스를 제공하기 위해 필요한 최소한의 개인정보를 수집·이용합니다.',
    ],
  } as NoticeContent,
  openSourceLicense: {
    title: '오픈소스 라이선스',
    body: ['현재 등록된 오픈소스 라이선스 정보가 없습니다.'],
  } as NoticeContent,
  faq: [
    {
      question: 'Q. 메디패스는 어떤 앱인가요?',
      answer: [
        '메디패스는 해외여행 시 복용 중인 약의 국가별 반입 정보를 확인하고, 필요한 서류를 준비할 수 있도록 도와주는 의약품 여행 관리 앱입니다. 약 봉투를 촬영해 복약카드를 만들고, 여행 중 약을 분실하거나 부족한 상황에서는 SOS 기능을 통해 대응 방법과 현지어 설명문을 확인할 수 있습니다.',
      ],
    },
    {
      question: 'Q. 메디패스에서 제공하는 정보의 출처는 어디인가요?',
      answer: [
        '메디패스는 INCB, 국가별 세관·대사관, 식품의약품안전처 등 공식 기관에서 공개한 정보를 바탕으로 의약품 반입 정보를 제공합니다. 정보의 출처와 마지막 업데이트 날짜는 결과 화면에서 확인할 수 있습니다. 다만 국가별 규정은 변경될 수 있으므로 출국 전 해당 국가의 공식 기관을 통해 최신 정보를 다시 확인해 주세요.',
      ],
    },
    {
      question: 'Q. 메디패스가 약의 반입 가능 여부를 직접 판단하나요?',
      answer: [
        '아니요. 메디패스는 약의 반입 가능 여부를 임의로 판단하지 않습니다. 사용자가 등록한 약의 성분과 소지 수량을 국가별 공식 기관의 반입 규정과 비교하여 ‘가능·주의·제한’ 형태의 참고 정보를 제공합니다.',
        'AI는 약 봉투의 글자 인식과 정보 정리를 보조하며, 반입 가능 여부를 독자적으로 결정하지 않습니다. 실제 반입 여부는 현지 세관과 관계 기관이 최종적으로 판단하므로, 출국 전 반드시 해당 국가의 공식 기관을 통해 확인해 주세요.',
      ],
    },
  ] as FaqItem[],
};
