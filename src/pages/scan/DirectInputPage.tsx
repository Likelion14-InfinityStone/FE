import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import backIcon from '@/assets/images/register/medicineDetail/backIcon.svg';
import sameStopStemp from '@/assets/images/scan/sameStopStemp.svg';
import termStopStemp from '@/assets/images/scan/termStopStemp.svg';
import BottomButton from '@/components/button/BottomButton';
import { useSavedMedicines } from '@/hooks/useSavedMedicines';
import { findDuplicateMedicine, isMedicineExpired } from '@/utils/medicineChecks';
import MedicineExceptionPage from './components/MedicineExceptionPage';
import MedicineInputCard, {
  type MedicineFormFields,
} from './components/MedicineInputCard';
import SavePage from './SavePage';

type SaveException = 'duplicate' | 'expired' | null;

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
  const { savedMedicines, addMedicine } = useSavedMedicines();
  const [form, setForm] = useState<MedicineFormFields>(INITIAL_FORM);
  const [isSaved, setIsSaved] = useState(false);
  const [exception, setException] = useState<SaveException>(null);

  const handleChange = (field: keyof MedicineFormFields, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const isComplete = Object.values(form).every((value) => value.trim() !== '');

  const handleSave = () => {
    if (!isComplete) return;

    if (findDuplicateMedicine(savedMedicines, form.productInfo)) {
      setException('duplicate');
      return;
    }
    if (isMedicineExpired(form.dispensedDate, form.duration)) {
      setException('expired');
      return;
    }

    addMedicine(form);
    setIsSaved(true);
  };

  if (exception === 'duplicate') {
    return (
      <MedicineExceptionPage
        stamp={sameStopStemp}
        title={form.productInfo}
        subtitleLines={['이미 등록된 약이에요.', '복약 카드에서 확인할 수 있어요.']}
        onBack={() => setException(null)}
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
        title={form.productInfo}
        subtitleLines={['유효기간이 지난 약이에요.', '반입 금지로 처리돼요.']}
        onBack={() => setException(null)}
        buttons={[
          { text: '홈으로', onClick: () => navigate('/home'), primary: true },
        ]}
      />
    );
  }

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
