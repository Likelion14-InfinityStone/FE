import { useNavigate } from 'react-router-dom';

import LogoPiru from '@/assets/images/login/logoPIRU.svg';
import { useAuthStore } from '@/stores/useAuthStore';

const NotFound = () => {
  const navigate = useNavigate();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <main className="flex min-h-full flex-col items-center justify-center py-12 text-center">
      <img src={LogoPiru} alt="" className="w-25" />

      <p className="font-Pretendard text-[3.25rem] leading-none font-bold text-[#23408F]">
        404
      </p>
      <h1 className="mt-5 font-Pretendard text-[1.375rem] leading-7 font-semibold text-[#191919]">
        페이지를 찾을 수 없어요
      </h1>
      <p className="mt-2 font-Pretendard text-[0.938rem] leading-6 text-[#6D6D6D]">
        주소가 잘못되었거나 페이지가 이동되었어요.
        <br />
        홈으로 돌아가 다시 시작해 주세요.
      </p>

      <button
        type="button"
        onClick={() => navigate(isLoggedIn ? '/home' : '/', { replace: true })}
        className="mt-10 w-full rounded-[20px] bg-[#23408F] py-5 font-Pretendard text-[1.125rem] leading-6 font-semibold text-[#FAFAF6]"
      >
        홈으로 돌아가기
      </button>
    </main>
  );
};

export default NotFound;
