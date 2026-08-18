import { useNavigate } from 'react-router-dom';

import backIcon from '@/assets/images/register/medicineDetail/backIcon.svg';
import sameStopStemp from '@/assets/images/scan/sameStopStemp.svg';
import BottomButton from '@/components/button/BottomButton';
import AddMedicineButton from './components/AddMedicineButton';
import MedicineExceptionPage from './components/MedicineExceptionPage';
import ScanMedicineCard from './components/ScanMedicineCard';
import ScanPassportCard from './components/ScanPassportCard';
import SavePage from './SavePage';
import {
  EMPTY_MEDICATION_DRAFT,
  EMPTY_PASSPORT_DRAFT,
  useScanResultForm,
} from './services/useScanResultForm';

const DirectInputPage = () => {
  const navigate = useNavigate();
  const {
    passport,
    medicines,
    openIndexes,
    isComplete,
    isSaving,
    isSaved,
    savedMedicineNames,
    skippedMedicineNames,
    isDuplicate,
    saveError,
    updatePassport,
    updateMedicineQuantity,
    updateMedicineName,
    selectMedicineCandidate,
    updateMedicineDoseUnit,
    addMedicine,
    toggleMedicine,
    removeMedicine,
    clearDuplicate,
    save,
  } = useScanResultForm(EMPTY_PASSPORT_DRAFT, [EMPTY_MEDICATION_DRAFT]);

  if (isDuplicate) {
    return (
      <MedicineExceptionPage
        stamp={sameStopStemp}
        title="이미 등록된 의약품이 있어요"
        subtitleLines={[
          '복약 카드에서 확인할 수 있어요.',
          '내용을 확인하고 다시 시도해 주세요.',
        ]}
        onBack={clearDuplicate}
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

  if (isSaved) {
    return (
      <SavePage
        medicineNames={savedMedicineNames}
        skippedMedicineNames={skippedMedicineNames}
      />
    );
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
        <ScanPassportCard passport={passport} onChange={updatePassport} />
        {medicines.map((medicine, index) => (
          <ScanMedicineCard
            key={index}
            medicine={medicine}
            isOpen={openIndexes.has(index)}
            onToggle={() => toggleMedicine(index)}
            onChangeQuantity={(field, value) =>
              updateMedicineQuantity(index, field, value)
            }
            onChangeName={(text) => updateMedicineName(index, text)}
            onSelectCandidate={(candidate) =>
              selectMedicineCandidate(index, candidate)
            }
            onChangeDoseUnit={(unit) => updateMedicineDoseUnit(index, unit)}
            onRemove={
              medicines.length > 1 ? () => removeMedicine(index) : undefined
            }
          />
        ))}
        <AddMedicineButton onClick={addMedicine} />
      </div>

      {saveError && (
        <p className="mt-[12px] px-[26px] text-center font-Pretendard text-[14px] tracking-[0.336px] text-[#EF5050]">
          {saveError}
        </p>
      )}

      <div className="mt-auto px-[26px] pt-[40px] pb-[40px]">
        <BottomButton
          text={isSaving ? '저장 중...' : '저장하기'}
          onClick={save}
          disabled={!isComplete || isSaving}
        />
      </div>
    </div>
  );
};

export default DirectInputPage;
