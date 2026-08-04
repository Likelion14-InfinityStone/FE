import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import BottomButton from '@/components/button/BottomButton';
import OnboardingFirstIcon from '@/assets/images/onboard/onboardingFirstIcon.svg';
import OnboardingSecondIcon from '@/assets/images/onboard/onboardingSecondIcon.svg';
import OnboardingThirdIcon from '@/assets/images/onboard/onboardingThirdIcon.svg';

const ONBOARDING_STEPS = [
  {
    icon: OnboardingFirstIcon,
    text: '메디패스는\n반입 가능 여부를\n법적으로 확정하지 않아요',
  },
  {
    icon: OnboardingSecondIcon,
    text: 'AI 인식 결과는\n완벽하지 않을 수 있어요\n꼭 직접 확인해 주세요',
  },
  {
    icon: OnboardingThirdIcon,
    text: '정확한 확인은\n공식 기관이나 의료진을 통해\n받아 주세요',
  },
] as const;

const Onboard = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();

  const currentStep = ONBOARDING_STEPS[step];
  const isLastStep = step === ONBOARDING_STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      navigate('/terms');
      return;
    }

    setStep((previousStep) => previousStep + 1);
  };

  return (
    <div className="flex min-h-dvh w-full flex-col pb-10">
      <div className="flex justify-center gap-4.5 mt-13">
        {ONBOARDING_STEPS.map((_, index) => (
          <span
            key={index}
            className={`font-Pretendard w-3 h-3 rounded-[100px] ${
              index == step ? 'bg-[#23408F]' : 'bg-gray-200'
            }`}
          />
        ))}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex flex-1 flex-col items-center justify-center gap-10">
          <img src={currentStep.icon} alt="단계별 이미지" />

          <p className="text-center text-[#000000] font-Pretendard font-semibold text-[1.375rem] leading-[normal] tracking-tighter whitespace-pre-line">
            {currentStep.text}
          </p>
        </div>

        <BottomButton text="다음" onClick={handleNext} />
      </div>
    </div>
  );
};

export default Onboard;
