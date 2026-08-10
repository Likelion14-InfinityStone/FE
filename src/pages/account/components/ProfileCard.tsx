import PIRUprofile from '@/assets/images/account/PIRUprofile.svg';

type ProfileCardProps = {
  name: string;
  email: string;
};

const ProfileCard = ({ name, email }: ProfileCardProps) => {
  return (
    <div className="flex w-full items-center gap-4 rounded-[20px] border border-[#23408F] bg-[#FCFCFC] px-4 py-1.5">
      <img src={PIRUprofile} alt="" className="h-[70px] w-[70px] shrink-0" />
      <div className="flex flex-col gap-2">
        <p className="font-Pretendard text-lg font-semibold tracking-[0.432px] text-[#282723]">
          {name}
        </p>
        <p className="font-Pretendard text-sm tracking-[0.336px] text-[#8E8B7E]">
          {email}
        </p>
      </div>
    </div>
  );
};

export default ProfileCard;
