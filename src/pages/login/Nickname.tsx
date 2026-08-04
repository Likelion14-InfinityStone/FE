import { useNavigate } from 'react-router-dom';
import BottomButton from '@/components/button/BottomButton';
import InputButton from '@/components/button/InputButton';
import LogoFIRU from '@/assets/images/login/logoPIRU.svg';
import { useNicknameCheck } from '@/hooks/login/useNicknameCheck';

const MESSAGE_COLOR = {
  default: 'text-[#848B9C]',
  success: 'text-[#23408F]',
  error: 'text-[#EF5050]',
} as const;

const Nickname = () => {
  const navigate = useNavigate();
  const {
    nickname,
    status,
    message,
    isCheckable,
    isVerified,
    handleChange,
    checkNickname,
  } = useNicknameCheck();

  // TODO: 회원가입 API 연동 (백엔드 준비 후 연결)
  const handleSubmit = () => {
    navigate('/home');
  };

  return (
    <div className="flex min-h-dvh w-full flex-col pb-10">
      <div className="flex flex-col items-center pt-[130px]">
        <img src={LogoFIRU} alt="MEDI PASS 로고" />
        <p className="font-sacheon text-[24px] leading-[1.4] tracking-[0.576px] text-[#23408F]">
          MEDI PASS
        </p>
      </div>

      <p className="font-pretendard mt-6 text-center text-[24px] font-semibold leading-[1.4] tracking-[0.576px] text-[#191919]">
        어떤 이름으로 부를까요?
      </p>

      <div className="mt-11">
        <InputButton
          value={nickname}
          onChange={handleChange}
          onCheck={checkNickname}
          status={status}
          checkable={isCheckable}
        />
      </div>

      <p
        className={`font-pretendard mt-1.5 pl-2.5 text-[12px] leading-[1.4] tracking-[0.288px] ${MESSAGE_COLOR[status]}`}
      >
        {message}
      </p>

      <div className="flex-1" />

      <BottomButton
        text="가입하기"
        disabled={!isVerified}
        onClick={handleSubmit}
      />
    </div>
  );
};

export default Nickname;
