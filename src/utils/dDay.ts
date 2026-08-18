const parseTripDate = (value: string) => {
  const [year, month, day] = value.split('.').map(Number);
  if (!year || !month || !day) return null;

  return new Date(2000 + year, month - 1, day);
};

export const formatDDay = (dday: number) => (dday > 0 ? `D-${dday}` : 'D-DAY');

// ISO(YYYY-MM-DD) 날짜를 화면 표기용(YY.MM.DD)으로 변환
export const formatIsoDate = (isoDate: string) => {
  const [year, month, day] = isoDate.split('-');
  return `${year.slice(2)}.${month}.${day}`;
};

const toIsoDate = (value: string) => {
  const [year, month, day] = value.split('.').map(Number);
  if (!year || !month || !day) return null;

  return `${2000 + year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
};

export const parseTravelPeriod = (travelPeriod?: string) => {
  const [startRaw, endRaw] = travelPeriod?.split(' - ') ?? [];
  const departOn = toIsoDate(startRaw?.trim() ?? '');
  const returnOn = toIsoDate(endRaw?.trim() ?? '');
  if (!departOn || !returnOn) return null;

  return { departOn, returnOn };
};

export const computeDDay = (travelPeriod?: string) => {
  const startDate = parseTripDate(travelPeriod?.split(' - ')[0]?.trim() ?? '');
  if (!startDate) return 'D-DAY';

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  startDate.setHours(0, 0, 0, 0);

  const diffDays = Math.round(
    (startDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  return diffDays > 0 ? `D-${diffDays}` : 'D-DAY';
};
