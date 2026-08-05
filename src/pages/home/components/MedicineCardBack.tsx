import MedicineInfo from './MedicineInfo';

const MedicineCardBack = () => {
  return (
    <div className="h-full w-full pt-6 pb-5 px-5.5 rounded-[20px] shadow-[0_2px_2px_0_rgba(0,0,0,0.04)] bg-[#FCFCFC] border-2 border-[#23408F]">
      <div className="flex flex-col gap-6">
        <div className="flex justify-between">
          <p className="font-Pretendard text-[1rem] leading-5.6 tracking-[0.4px] font-semibold text-[#000000]">
            로라타딘 10mg
          </p>
          <div className="px-2 py-1.5 border border-[#23408F] rounded-xl">
            <p className="font-Pretendard text-[0.875rem] leading-4.9 tracking-[0.3px] font-semibold text-[#23408F]">
              KR
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3.5">
          <MedicineInfo label="성명" value="김피루" />
          <MedicineInfo label="조제 일자" value="2026. 07. 20." />
          <MedicineInfo label="발행기관" value="서울메디컬의원" />
          <MedicineInfo label="국제 성분명" value="Loratadine" />
          <MedicineInfo label="함량" value="10mg" />
          <MedicineInfo label="복용 횟수" value="1일 1회" />
          <MedicineInfo label="복용 일수" value="14일" />
          <MedicineInfo label="1회 복용량" value="1정" />
          <MedicineInfo label="처방일" value="2026. 07. 20." />
          <div className="flex flex-col gap-1.25">
            <p className="font-Pretendard text-[0.875rem] leading-4.9 tracking-[0.3px] font-medium text-[#767676]">
              연결된 여행
            </p>
            <div className="w-fit py-2 px-4 bg-[#EAF0FF] rounded-3xl">
              <p className="font-Pretendard text-[0.75rem] leading-4.2 tracking-[0.3px] font-semibold text-[#23408F]">
                일본
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineCardBack;
