import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import backIcon from '@/assets/images/register/medicineDetail/backIcon.svg';
import {
  MOCK_RECOGNIZED_MEDICINES,
  MOCK_RECOGNIZED_PASSPORT,
} from './mockRecognizedMedicine';
import RecognitionHelpModal from './components/RecognitionHelpModal';

const HINT_DELAY_MS = 5000;
const HELP_MODAL_DELAY_MS = 15000;

const ShootPage = () => {
  const navigate = useNavigate();
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const [cameraError, setCameraError] = useState<string | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;

    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        });
        if (cancelled) {
          stream.getTracks().forEach((track) => track.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch {
        if (!cancelled) {
          setCameraError(
            '카메라를 사용할 수 없어요. 카메라 권한을 확인해 주세요.'
          );
        }
      }
    };

    startCamera();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    };
  }, []);

  useEffect(() => {
    const hintTimer = window.setTimeout(() => setShowHint(true), HINT_DELAY_MS);
    const helpTimer = window.setTimeout(
      () => setShowHelpModal(true),
      HELP_MODAL_DELAY_MS
    );

    return () => {
      window.clearTimeout(hintTimer);
      window.clearTimeout(helpTimer);
    };
  }, [attempt]);

  const handleRetry = () => {
    setShowHint(false);
    setShowHelpModal(false);
    setAttempt((prev) => prev + 1);
  };

  const handleCapture = () => {
    if (cameraError) return;

    const video = videoRef.current;
    if (video && video.videoWidth) {
      const canvas = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext('2d')?.drawImage(video, 0, 0);
    }

    // TODO: OCR API 연동 후 촬영 이미지를 전달하고 실제 인식 결과로 교체
    navigate('/scanResult', {
      state: {
        passport: MOCK_RECOGNIZED_PASSPORT,
        medicines: MOCK_RECOGNIZED_MEDICINES,
      },
    });
  };

  return (
    <div className="fixed inset-0 z-40 flex flex-col bg-[#5F5F5D]">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="absolute inset-0 h-full w-full object-cover"
      />

      <button
        type="button"
        aria-label="닫기"
        onClick={() => navigate(-1)}
        className="absolute left-[26px] top-[22px] z-10 flex h-8 w-8 items-center justify-center"
      >
        <img
          src={backIcon}
          alt=""
          className="h-5 w-[10px] brightness-0 invert"
        />
      </button>

      {cameraError && (
        <div className="absolute inset-0 flex items-center justify-center px-[40px]">
          <p className="text-center font-Pretendard text-[16px] leading-[1.4] tracking-[0.384px] text-[#FAFAF6]">
            {cameraError}
          </p>
        </div>
      )}

      <div className="relative flex flex-1 flex-col items-center justify-center gap-[20px]">
        <button
          type="button"
          onClick={handleCapture}
          aria-label="촬영하기"
          className="relative h-[224px] w-[310px]"
        >
          <svg
            viewBox="0 0 316 230"
            fill="none"
            className="absolute -inset-[3px] h-[calc(100%+6px)] w-[calc(100%+6px)]"
          >
            <path
              d="M3 187V227H43"
              stroke="#EF5050"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M273 227H313V187"
              stroke="#EF5050"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M43 3L3 3L3 43"
              stroke="#EF5050"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M313 43V3L273 3"
              stroke="#EF5050"
              strokeWidth="6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <p className="font-Pretendard text-[14px] tracking-[0.336px] text-[#FAFAF6]">
          가이드 안을 탭하면 촬영돼요
        </p>

        {showHint && (
          <button
            type="button"
            onClick={() => setShowHelpModal(true)}
            className="font-Pretendard text-[18px] tracking-[0.432px] text-[#FAFAF6] underline"
          >
            인식이 잘 안 되나요?
          </button>
        )}
      </div>

      {showHelpModal && <RecognitionHelpModal onRetry={handleRetry} />}
    </div>
  );
};

export default ShootPage;
