import { useNavigate } from 'react-router-dom';

import KakaoButton from '@/pages/login/components/KakaoButton';
import LogoFIRU from '@/assets/images/login/logoPIRU.svg';
import { useAuthStore } from '@/stores/useAuthStore';

const handleKakaoLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`;
};

const Login = () => {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);
  const demoAccessToken = import.meta.env.VITE_DEV_ACCESS_TOKEN?.trim();

  const handleDemoLogin = () => {
    if (!demoAccessToken) return;

    login(demoAccessToken);
    navigate('/terms', { replace: true });
  };

  return (
    <div className="flex min-h-dvh w-full flex-col pb-10">
      <div className="flex flex-1 flex-col items-center justify-center">
        <img src={LogoFIRU} alt="MEDI PASS 로고" />

        <p className="font-sacheon font-normal text-center text-[2.1rem] tracking-[0.8064px] leading-[1.4] text-[#23408F]">
          MEDI PASS
        </p>

        <p className="font-pretendard text-[1rem] leading-[1.4] tracking-[0.384px] text-[#6D6D6D]">
          약 때문에, 여행을 망설이지 않도록
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <KakaoButton onClick={handleKakaoLogin} />

        {demoAccessToken && (
          <button
            type="button"
            onClick={handleDemoLogin}
            className="flex w-full items-center justify-center rounded-[20px] border border-[#23408F] bg-[#FAFAF6] py-5 font-pretendard text-[1.125rem] leading-6.3 font-semibold tracking-[0.432px] text-[#23408F]"
          >
            테스트 계정으로 시작하기
          </button>
        )}
      </div>
    </div>
  );
};

export default Login;
