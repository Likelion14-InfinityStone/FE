import { useNavigate } from 'react-router-dom';

import backIcon from '@/assets/images/register/medicineDetail/backIcon.svg';
import sameStopStemp from '@/assets/images/scan/sameStopStemp.svg';
import termStopStemp from '@/assets/images/scan/termStopStemp.svg';
import BottomButton from '@/components/button/BottomButton';
import AddMedicineButton from './components/AddMedicineButton';
import MedicineAccordionCard from './components/MedicineAccordionCard';
import MedicineExceptionPage from './components/MedicineExceptionPage';
import {
  EMPTY_MEDICINE_FIELDS,
  EMPTY_PASSPORT_FIELDS,
} from '@/types/scan/medicineFields';
import PassportInfoCard from './components/PassportInfoCard';
import SavePage from './SavePage';
import { useMedicineForm } from './services/useMedicineForm';

const DirectInputPage = () => {
  const navigate = useNavigate();
  const {
    passport,
    medicines,
    openIndexes,
    isComplete,
    isSaved,
    exception,
    exceptionMedicineName,
    updatePassport,
    updateMedicine,
    toggleMedicine,
    addMedicineRow,
    removeMedicineRow,
    resetException,
    save,
  } = useMedicineForm(EMPTY_PASSPORT_FIELDS, [EMPTY_MEDICINE_FIELDS]);

  if (exception === 'duplicate') {
    return (
      <MedicineExceptionPage
        stamp={sameStopStemp}
        title={exceptionMedicineName}
        subtitleLines={[
          '이미 등록된 약이에요.',
          '복약 카드에서 확인할 수 있어요.',
        ]}
        onBack={resetException}
        buttons={[
          { text: '홈으로', onClick: () => navigate('/home') },
          {
            text: '복약카드로 이동',
            onClick: () => navigate('/home'),
            primary: true,
          },
        ]}
      />
    );
  }

  if (exception === 'expired') {
    return (
      <MedicineExceptionPage
        stamp={termStopStemp}
        title={exceptionMedicineName}
        subtitleLines={['유효기간이 지난 약이에요.', '반입 금지로 처리돼요.']}
        onBack={resetException}
        buttons={[
          { text: '홈으로', onClick: () => navigate('/home'), primary: true },
        ]}
      />
    );
  }

  if (isSaved) {
    return <SavePage medicineNames={medicines.map((item) => item.productInfo)} />;
  }

  return (
    <div className="flex min-h-dvh w-full flex-col bg-[#FAFAF6]">
      <div className="relative flex items-center pt-[22px]">
        <button
          type="button"
          aria-label="뒤로가기"
          onClick={() => navigate(-1)}
          className="absolute left-[26px] flex h-6 w-6 items-center justify-center"
        >
          <img src={backIcon} alt="" className="h-5 w-[10px]" />
        </button>
        <p className="flex-1 text-center font-Pretendard text-[22px] font-semibold tracking-[0.528px] text-black">
          약 스캔
        </p>
      </div>

      <div className="mt-[44px] flex flex-col gap-[4px] px-[26px]">
        <h1 className="font-Pretendard text-[24px] font-semibold leading-[140%] tracking-[0.024em] text-[#191919]">
          직접 입력하기
        </h1>
        <p className="font-Pretendard text-[14px] leading-[140%] tracking-[0.024em] text-[#6D6D6D]">
          제품명, 복용 횟수, 1회 복용량은 꼭 입력해 주세요.
        </p>
      </div>

      <div className="mt-[22px] flex flex-col gap-[12px] px-[26px]">
        <PassportInfoCard passport={passport} onChange={updatePassport} />
        {medicines.map((medicine, index) => (
          <MedicineAccordionCard
            key={index}
            medicine={medicine}
            isOpen={openIndexes.has(index)}
            onToggle={() => toggleMedicine(index)}
            onChange={(field, value) => updateMedicine(index, field, value)}
            onRemove={
              medicines.length > 1 ? () => removeMedicineRow(index) : undefined
            }
          />
        ))}
        <AddMedicineButton onClick={addMedicineRow} />
      </div>

      <div className="mt-auto px-[26px] pt-[40px] pb-[40px]">
        <BottomButton text="저장하기" onClick={save} disabled={!isComplete} />
      </div>
    </div>
  );
};

export default DirectInputPage;
