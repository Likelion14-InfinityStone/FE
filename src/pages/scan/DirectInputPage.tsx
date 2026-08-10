import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import backIcon from '@/assets/images/register/medicineDetail/backIcon.svg';
import BottomButton from '@/components/button/BottomButton';
import { useSavedMedicines } from '@/hooks/useSavedMedicines';
import MedicineInputCard, {
  type MedicineFormFields,
} from './components/MedicineInputCard';
import SavePage from './SavePage';

const INITIAL_FORM: MedicineFormFields = {
  name: '',
  dispensedDate: '',
  issuer: '',
  productInfo: '',
  frequency: '',
  duration: '',
  dosePerTime: '',
};

const DirectInputPage = () => {
  const navigate = useNavigate();
  const { addMedicine } = useSavedMedicines();
  const [form, setForm] = useState<MedicineFormFields>(INITIAL_FORM);
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = (field: keyof MedicineFormFields, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isComplete = Object.values(form).every((value) => value.trim() !== '');

  const handleSave = () => {
    if (!isComplete) return;
    addMedicine(form);
    setIsSaved(true);
  };

  if (isSaved) {
    return <SavePage medicineName={form.productInfo} />;
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
          제품명 및 함량, 복용 횟수, 1회 복용량이 필수로 적혀 있어야 해요.
        </p>
      </div>

      <div className="mt-[22px] px-[26px]">
        <MedicineInputCard form={form} onChange={handleChange} />
      </div>

      <div className="mt-auto px-[26px] pt-[40px] pb-[40px]">
        <BottomButton
          text="저장하기"
          onClick={handleSave}
          disabled={!isComplete}
        />
      </div>
    </div>
  );
};

export default DirectInputPage;
