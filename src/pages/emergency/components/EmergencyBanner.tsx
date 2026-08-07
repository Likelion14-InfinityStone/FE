interface EmergencyBannerProps {
  icon: string;
  title: string;
}

const EmergencyBanner = ({ icon, title }: EmergencyBannerProps) => {
  return (
    <div className="flex min-h-15 items-center justify-center gap-2 rounded-[20px] bg-[#EF5050] py-5 text-center">
      <img src={icon} alt="" />
      <p className="font-Pretendard text-[1.125rem] leading-6.3 font-semibold text-[#FAFAF6]">
        {title}
      </p>
    </div>
  );
};

export default EmergencyBanner;
