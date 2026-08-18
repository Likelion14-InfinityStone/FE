import { isAxiosError } from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { scanMedicationEnvelope } from '@/apis/scan/scan.api';
import type { ScanResult } from '@/types/scan/scan.type';

const ERROR_MESSAGES: Record<string, string> = {
  OCR_400_2: 'JPG, JPEG, PNG 이미지만 업로드할 수 있어요.',
  OCR_400_3: '이미지 파일은 10MB 이하여야 해요.',
  OCR_502: 'OCR 서비스가 일시적으로 응답하지 않아요. 잠시 후 다시 시도해 주세요.',
};
const DEFAULT_ERROR_MESSAGE = '이미지를 처리하지 못했어요. 다시 시도해 주세요.';

export const useMedicationScan = () => {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const [scanError, setScanError] = useState<string | null>(null);

  const scan = async (file: File) => {
    setIsScanning(true);
    setScanError(null);

    try {
      const { result } = await scanMedicationEnvelope(file);
      navigate('/scanResult', { state: result satisfies ScanResult });
    } catch (error) {
      const code = isAxiosError<{ code?: string }>(error)
        ? error.response?.data?.code
        : undefined;

      if (code === 'OCR_422') {
        navigate('/scanResult', {
          state: { dispensedAt: null, issuer: null, medications: [] } satisfies ScanResult,
        });
        return;
      }

      setScanError((code && ERROR_MESSAGES[code]) || DEFAULT_ERROR_MESSAGE);
    } finally {
      setIsScanning(false);
    }
  };

  return {
    scan,
    isScanning,
    scanError,
    clearScanError: () => setScanError(null),
  };
};
