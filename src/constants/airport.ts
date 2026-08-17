export type Airport = {
  code: string;
  name: string;
  country: string;
  location: string;
};

// ISO 3166-1 alpha-3 국가 코드
export const COUNTRY_ALPHA3: Record<string, string> = {
  프랑스: 'FRA',
  태국: 'THA',
  체코: 'CZE',
  대한민국: 'KOR',
  미국: 'USA',
  일본: 'JPN',
  중국: 'CHN',
};

export const AIRPORTS: Airport[] = [
  {
    code: 'CDG',
    name: '파리샤를드골',
    country: '프랑스',
    location: '프랑스 / 파리',
  },
  {
    code: 'ORY',
    name: '파리오를리',
    country: '프랑스',
    location: '프랑스 / 파리',
  },
  {
    code: 'BVA',
    name: '파리부바이스',
    country: '프랑스',
    location: '프랑스 / 파리',
  },
  { code: 'HKT', name: '푸켓', country: '태국', location: '태국 / 푸켓' },
  { code: 'PRG', name: '프라하', country: '체코', location: '체코 / 프라하' },
  {
    code: 'ICN',
    name: '인천',
    country: '대한민국',
    location: '서울 / 인천',
  },
  {
    code: 'GMP',
    name: '김포',
    country: '대한민국',
    location: '서울 / 김포',
  },
  {
    code: 'PUS',
    name: '김해',
    country: '대한민국',
    location: '부산 / 김해',
  },
  {
    code: 'JFK',
    name: '뉴욕존에프케네디',
    country: '미국',
    location: '미국 / 뉴욕',
  },
  {
    code: 'LAX',
    name: '로스앤젤레스',
    country: '미국',
    location: '미국 / 로스앤젤레스',
  },
  { code: 'NRT', name: '나리타', country: '일본', location: '일본 / 나리타' },
  { code: 'HND', name: '하네다', country: '일본', location: '일본 / 하네다' },
  { code: 'KIX', name: '간사이', country: '일본', location: '일본 / 간사이' },
  {
    code: 'PEK',
    name: '베이징서우두',
    country: '중국',
    location: '중국 / 베이징',
  },
  {
    code: 'PVG',
    name: '상하이푸둥',
    country: '중국',
    location: '중국 / 상하이',
  },
];
