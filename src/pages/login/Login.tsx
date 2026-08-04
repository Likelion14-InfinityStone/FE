import BottomButton from '@/components/button/BottomButton';
import LogoFIRU from '@/assets/images/login/logoPIRU.svg';
import KakaoTalk from '@/assets/images/login/KakaoTalk.svg';
import { useNavigate } from 'react-router-dom';

// TODO: 카카오 소셜 로그인 연동 (백엔드 OAuth 준비 후 연결)
// const handleKakaoLogin = () => {
//   window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth/kakao`;
// };

const Login = () => {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-dvh w-full flex-col pb-10">
      <div className="flex flex-1 flex-col items-center justify-center">
        <img src={LogoFIRU} alt="MEDI PASS 로고" />

        <p className="font-sacheon text-center text-[33.6px] tracking-[0.024em] leding-[1.4] text-[#23408F]">
          MEDI PASS
        </p>

        <p className="font-Pretendard text-[1rem] leading-[1.4] tracking-[0.384px] text-[#6D6D6D]">
          약 때문에, 여행을 망설이지 않도록
        </p>
      </div>

      <BottomButton
        text="카카오로 시작하기"
        icon={KakaoTalk}
        variant="kakao"
        // onClick={handleKakaoLogin}
        //임시로 /nickname과 연결함
        onClick={() => navigate('/nickname')}
      />
    </div>
  );
};

export default Login;
