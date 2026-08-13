import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';

import backButtonIcon from '@/assets/images/register/tripTicket/backButtonIcon.svg';
import checkIcon from '@/assets/images/register/tripTicket/checkIcon.svg';
import nonCheckIcon from '@/assets/images/register/tripTicket/nonCheckIcon.svg';
import readyIcon from '@/assets/images/register/medicineDetail/readyStemp.svg';
import downArrowIcon from '@/assets/images/register/medicineDetail/downArrowIcon.svg';
import ChecklistBox from '@/pages/register/components/medicineDetailPage/components/button/ChecklistBox';
import SmallButton from '@/pages/register/components/selectMedicinePage/components/SmallButton';
import type { AirportSelection } from '@/types/register';
import MedicineExplanationModal from './components/MedicineExplanationModal';

type MedicineResultState = {
  departure?: AirportSelection;
  arrival?: AirportSelection;
  travelPeriod?: string;
  medicineQuantities?: Record<string, number>;
};

const MedicineResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const navState = location.state as MedicineResultState | null;

  // 약별 선택 여부: 처음에는 아무것도 선택되지 않은 상태로 시작
  const [selectedItems, setSelectedItems] = useState<Record<string, boolean>>(
    {}
  );
  const [explanationTarget, setExplanationTarget] = useState<string | null>(
    null
  );

  if (!navState || !navState.arrival || !navState.medicineQuantities) {
    return <Navigate to="/register" replace />;
  }

  const medicines = Object.entries(navState.medicineQuantities);
  const hasSelection = Object.values(selectedItems).some(Boolean);

  const toggleSelected = (name: string) => {
    setSelectedItems((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const destinationLabel = navState.arrival
    ? `${navState.arrival.code}(${navState.arrival.location})`
    : '';

  return (
    <div className="flex min-h-dvh w-full flex-col bg-[#FAFAF6] pb-10">
      <div className="relative flex items-center pt-16.5">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={() => navigate('/choiceMedicine', { state: navState })}
          className="absolute left-0 flex h-6 w-6 items-center justify-center"
        >
          <img src={backButtonIcon} alt="" className="h-5 w-[10px]" />
        </button>

        <p className="font-Pretendard flex-1 text-center text-[1.375rem] font-semibold tracking-[0.528px] text-black">
          {destinationLabel}
        </p>
      </div>

      <p className="font-Pretendard mt-7.5 text-[1.5rem] leading-[1.4] font-semibold tracking-[0.576px] text-[#191919]">
        약 분석 결과
      </p>

      <div className="mt-7 flex flex-col gap-4.5">
        {medicines.map(([name, quantity]) => {
          const isSelected = Boolean(selectedItems[name]);

          return (
            <ChecklistBox
              key={name}
              title={
                <span className="flex items-center gap-2">
                  {/* TODO: API 연동 후 실제 반입 가능 여부(readyIcon/stopIcon)로 교체 */}
                  <img src={readyIcon} alt="" className="size-11.5 shrink-0" />
                  <span className="flex flex-col gap-1">
                    <span className="font-Pretendard text-base font-medium tracking-[0.384px] text-[#191919]">
                      {name}
                    </span>
                    <span className="font-Pretendard text-sm tracking-[0.336px] text-[#191919]">
                      소지 {quantity}정
                    </span>
                  </span>
                </span>
              }
              checked={isSelected}
              isOpen={explanationTarget === name}
              onToggle={() => toggleSelected(name)}
              onChevronClick={() => setExplanationTarget(name)}
              checkIcon={
                <img
                  src={isSelected ? checkIcon : nonCheckIcon}
                  alt=""
                  className="size-6"
                />
              }
              chevronIcon={
                <img src={downArrowIcon} alt="" className="size-6" />
              }
            />
          );
        })}
      </div>

      <div className="flex-1" />

      <div className="flex gap-2.5">
        <SmallButton
          text="나가기"
          variant="primary"
          onClick={() => navigate('/register')}
        />
        <SmallButton
          text="저장하기"
          variant="primary"
          disabled={!hasSelection}
          onClick={() =>
            navigate('/saveMedicine', {
              state: {
                ...navState,
                selectedMedicines: Object.keys(selectedItems).filter(
                  (name) => selectedItems[name]
                ),
              },
            })
          }
        />
      </div>

      {explanationTarget && (
        <MedicineExplanationModal
          medicineName={explanationTarget}
          onClose={() => setExplanationTarget(null)}
        />
      )}
    </div>
  );
};

export default MedicineResultPage;
