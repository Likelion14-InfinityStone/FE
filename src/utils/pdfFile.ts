const PDF_HEADER_BYTES = [0x25, 0x50, 0x44, 0x46, 0x2d] as const;

export const isPdfDataUrl = (dataUrl: string): boolean => {
  const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1);
  try {
    const headerBytes = atob(base64.slice(0, 8));
    if (headerBytes.length < PDF_HEADER_BYTES.length) return false;
    return PDF_HEADER_BYTES.every(
      (byte, index) => headerBytes.charCodeAt(index) === byte
    );
  } catch {
    return false;
  }
};

const dataUrlToBlob = (dataUrl: string, mime: string): Blob => {
  const base64 = dataUrl.slice(dataUrl.indexOf(',') + 1);
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
};

export const openPdfDataUrlInNewTab = (dataUrl: string) => {
  const blobUrl = URL.createObjectURL(
    dataUrlToBlob(dataUrl, 'application/pdf')
  );
  window.open(blobUrl, '_blank', 'noopener,noreferrer');
};
