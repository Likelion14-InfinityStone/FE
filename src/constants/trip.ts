export type Trip = {
  id: number;
  country: string;
  title: string;
  departureCode: string;
  departureCountry: string;
  departureLocation: string;
  arrivalCode: string;
  arrivalCountry: string;
  arrivalLocation: string;
  departureDate: string;
};

export const TRIPS: Trip[] = [
  {
    id: 1,
    country: '일본',
    title: '인스톤 단체 여행',
    departureCode: 'ICN',
    departureCountry: 'KOR',
    departureLocation: '한국 / 인천',
    arrivalCode: 'NRT',
    arrivalCountry: 'JAP',
    arrivalLocation: '일본 / 나리타',
    departureDate: '26.08.21 - 26.08.24',
  },
  {
    id: 2,
    country: '일본',
    title: '도쿄 여행!',
    departureCode: 'ICN',
    departureCountry: 'KOR',
    departureLocation: '한국 / 인천',
    arrivalCode: 'NRT',
    arrivalCountry: 'JAP',
    arrivalLocation: '일본 / 나리타',
    departureDate: '26.09.21 - 26.09.24',
  },
];
