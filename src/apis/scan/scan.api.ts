import { instance } from '@/apis/instance';
import type { ApiResultEnvelope } from '@/types/api.type';
import type { ScanResult } from '@/types/scan/scan.type';

export const scanMedicationEnvelope = async (
  file: File
): Promise<ApiResultEnvelope<ScanResult>> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await instance.post<ApiResultEnvelope<ScanResult>>(
    '/api/medications/scans',
    formData,
    // instance defaults Content-Type to application/json, which makes axios
    // JSON-stringify the FormData instead of sending it as multipart.
    // Clearing it lets the browser set multipart/form-data with the boundary.
    { headers: { 'Content-Type': null } }
  );

  return response.data;
};
