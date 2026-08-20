import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ScanPUFIICon from '@/assets/images/scan/scanPUFIIcon.svg';

import BottomButton from '@/components/button/BottomButton';
import BottomButton2 from './components/BottomButton2';
import LoadMethodModal from './components/LoadMethodModal';
import GalleryModal from './components/GalleryModal';
import { useMedicationScan } from './services/useMedicationScan';

const Scan = () => {
  const navigate = useNavigate();
  const { scan, isScanning, scanError } = useMedicationScan();
  const [isLoadMethodModalOpen, setIsLoadMethodModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  return (
    <div className="flex w-full flex-1 flex-col pt-[66px]">
      <div className="flex w-[330px] h-[78px] flex-col gap-[4px] ">
        <h1 className="text-[24px] font-semibold leading-[140%] tracking-[0.024em] text-left text-[#191919]">
          스캔할 약 봉투를 준비해 주세요
        </h1>
        <p className="text-[14px] font-regular leading-[140%] tracking-[0.024em] text-left text-[#6D6D6D]">
          제품명 및 함량, 복용 횟수, 1회 복용량이 잘 보이게 촬영해 주세요.
        </p>
      </div>

      <div className="flex flex-1 items-center justify-center">
        <img
          src={ScanPUFIICon}
          alt="약 봉투 스캔 아이콘"
          className="w-[138px] h-[154px]"
        />
      </div>

      <div className="flex w-full flex-col gap-[10px]">
        <BottomButton
          text="촬영하기"
          onClick={() => navigate('/scanCapture')}
          disabled={isScanning}
        />
        <BottomButton2
          text="다른 방법으로 불러오기"
          onClick={() => setIsLoadMethodModalOpen(true)}
        />
      </div>

      {scanError && (
        <p className="mt-[10px] text-center font-Pretendard text-[14px] tracking-[0.336px] text-[#EF5050]">
          {scanError}
        </p>
      )}

      {isScanning && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161615]/60">
          <p className="font-Pretendard text-[16px] tracking-[0.384px] text-[#FAFAF6]">
            약 봉투를 분석하고 있어요...
          </p>
        </div>
      )}

      {isLoadMethodModalOpen && (
        <LoadMethodModal
          onClose={() => setIsLoadMethodModalOpen(false)}
          onSelectGallery={() => {
            setIsLoadMethodModalOpen(false);
            setIsGalleryModalOpen(true);
          }}
          onSelectManual={() => {
            setIsLoadMethodModalOpen(false);
            navigate('/manualInput');
          }}
        />
      )}

      {isGalleryModalOpen && (
        <GalleryModal
          onClose={() => setIsGalleryModalOpen(false)}
          onConfirm={(files) => {
            setIsGalleryModalOpen(false);
            scan(files[0]);
          }}
        />
      )}
    </div>
  );
};

export default Scan;
