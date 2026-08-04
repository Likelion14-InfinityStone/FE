import KakaoIcon from '@/assets/images/login/kakaoIcon.svg';

type KakaoButtonProps = {
  onClick?: () => void;
};

const KakaoButton = ({ onClick }: KakaoButtonProps) => {
  return (
    <button
      type="button"
      className="flex w-full items-center justify-center gap-2 rounded-[20px] bg-[#FEE500] py-5"
      onClick={onClick}
    >
      <img src={KakaoIcon} alt="" />
      <span className="font-pretendard text-[1.125rem] leading-6.3 font-semibold tracking-[0.432px] text-[#191919]">
        카카오로 시작하기
      </span>
    </button>
  );
};

export default KakaoButton;
