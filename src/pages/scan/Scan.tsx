import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ScanPUFIICon from '@/assets/images/scan/scanPUFIIcon.svg';

import BottomButton from '@/components/button/BottomButton';
import BottomButton2 from './components/BottomButton2';
import LoadMethodModal from './components/LoadMethodModal';
import GalleryModal from './components/GalleryModal';
import {
  MOCK_RECOGNIZED_MEDICINES,
  MOCK_RECOGNIZED_PASSPORT,
} from './mockRecognizedMedicine';

const Scan = () => {
  const navigate = useNavigate();
  const [isLoadMethodModalOpen, setIsLoadMethodModalOpen] = useState(false);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  return (
    <div className="flex h-full w-[350px] flex-col pt-[66px]">
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

      <div className="flex flex-col w-[350px] gap-[10px]">
        <BottomButton
          text="촬영하기"
          onClick={() => navigate('/scanCapture')}
        />
        <BottomButton2
          text="다른 방법으로 불러오기"
          onClick={() => setIsLoadMethodModalOpen(true)}
        />
      </div>

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
          onConfirm={() => {
            setIsGalleryModalOpen(false);
            // TODO: OCR API 연동 후 선택한 갤러리 파일을 전달하고 실제 인식 결과로 교체
            navigate('/scanResult', {
              state: {
                passport: MOCK_RECOGNIZED_PASSPORT,
                medicines: MOCK_RECOGNIZED_MEDICINES,
              },
            });
          }}
        />
      )}
    </div>
  );
};

export default Scan;
