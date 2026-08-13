import KakaoButton from '@/pages/login/components/KakaoButton';
import LogoFIRU from '@/assets/images/login/logoPIRU.svg';

const handleKakaoLogin = () => {
  window.location.href = `${import.meta.env.VITE_API_BASE_URL}/oauth2/authorization/kakao`;
};

const Login = () => {
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

      <KakaoButton onClick={handleKakaoLogin} />
    </div>
  );
};

export default Login;
