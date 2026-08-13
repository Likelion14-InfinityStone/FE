const parseTripDate = (value: string) => {
  const [year, month, day] = value.split('.').map(Number);
  if (!year || !month || !day) return null;

  return new Date(2000 + year, month - 1, day);
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
