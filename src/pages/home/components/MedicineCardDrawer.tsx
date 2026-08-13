import { useState } from 'react';
import MoreCardIcon from '@/assets/images/home/moreCardIcon.svg';
import RegisterButtonIcon from '@/assets/images/home/registerButtonIcon.svg';
import CardConnectIcon from '@/assets/images/home/cardConnectIcon.svg';
import DocumentsDetailArrowIcon from '@/assets/images/documents/documentsDetailArrowIcon.svg';

type Medicine = {
  id: number;
  medicineName: string;
};

type MedicineCardDrawerProps = {
  medicines: Medicine[];
  onClose: () => void;
  onRegister: () => void;
  onSelect: (id: number) => void;
};

const MedicineCardDrawer = ({
  medicines,
  onClose,
  onRegister,
  onSelect,
}: MedicineCardDrawerProps) => {
  const [keyword, setKeyword] = useState('');
  const filteredMedicines = medicines.filter(({ medicineName }) =>
    medicineName.toLowerCase().includes(keyword.trim().toLowerCase())
  );

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 mx-auto flex w-full max-w-100.5 justify-end bg-[rgba(22,22,21,0.51)]"
    >
      <div
        onClick={(event) => event.stopPropagation()}
        className="h-full w-[calc(100%-39px)] bg-[#FAFAF6] px-6.5 pt-10"
      >
        <div className="flex flex-col gap-7.5">
          <p className="font-Pretendard text-[1.375rem] leading-7.5 font-semibold text-[#42403A]">
            복약 카드 모아 보기
          </p>

          <div className="flex p-4 items-center gap-2 rounded-xl border border-[#23408F]">
            <img src={MoreCardIcon} alt="" />
            <input
              type="search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder="검색하기"
              className="min-w-0 flex-1 bg-transparent font-Pretendard text-[0.875rem] text-[#848B9C] outline-none placeholder:text-[#848B9C]"
            />
          </div>

          <div className="flex flex-col">
            <button
              type="button"
              onClick={onRegister}
              className="flex items-center gap-3.5 border-b border-[#D2D1CB] pl-4.5 pr-2.5 py-4 text-left"
            >
              <img src={RegisterButtonIcon} alt="" />
              <span className="font-Pretendard text-[1rem] font-regular text-[#3F3D38]">
                등록하기
              </span>
            </button>

            {filteredMedicines.map(({ id, medicineName }) => (
              <button
                key={id}
                type="button"
                onClick={() => onSelect(id)}
                className="flex h-16 items-center gap-4 border-b border-[#D2D1CB] pl-4.5 pr-2.5 py-4 text-left"
              >
                <img src={CardConnectIcon} alt="" />
                <span className="min-w-0 flex-1 truncate font-Pretendard text-[1rem] font-regular text-[#3F3D38]">
                  {medicineName}
                </span>
                <img src={DocumentsDetailArrowIcon} alt="" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicineCardDrawer;
