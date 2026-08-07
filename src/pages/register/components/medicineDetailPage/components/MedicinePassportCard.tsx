type MedicationStat = {
  icon: React.ReactNode;
  label: string;
  value: string;
};

type MedicationPassportCardProps = {
  name: string;
  ingredient: string;
  stats: MedicationStat[];
  stampImage: React.ReactNode;
};

const MedicationPassportCard = ({
  name,
  ingredient,
  stats,
  stampImage,
}: MedicationPassportCardProps) => {
  return (
    <div className="w-[350px] box-border p-5 bg-[#FCFCFC] border-2 border-[#23408F] rounded-[20px] shadow-[0px_2px_2px_0px_rgba(113,112,113,0.2)]">
      <div className="flex items-start justify-between">
        <div>
          <p className="font-semibold text-xl tracking-[0.48px] text-[#191919]">
            {name}
          </p>
          <p className="mt-2 font-normal text-base tracking-[0.384px] text-[#848B9C]">
            {ingredient}
          </p>
        </div>
        <div className="w-[84px] h-[84px] shrink-0">{stampImage}</div>
      </div>

      <div className="mt-[30px] flex items-center justify-center gap-[29px]">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex items-center">
            {index > 0 && <div className="w-px h-6 bg-[#E2E2E2] mr-[29px]" />}
            <div className="flex flex-col items-center gap-[6px] w-[57px]">
              <span className="w-6 h-6 flex items-center justify-center">
                {stat.icon}
              </span>
              <p className="text-xs font-normal tracking-[0.288px] text-[#6D6D6D]">
                {stat.label}
              </p>
              <p className="text-base font-medium tracking-[0.384px] text-[#23408F]">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicationPassportCard;
