export type StoredDocument = { name: string; dataUrl: string };

const storageKeyFor = (key: string) => `medicineDetail:document:${key}`;

// TODO: 지금은 임시로 localStorage에 저장 - 추후 DB(백엔드) 연동되면 API 호출로 교체 예정
export const readStoredDocument = (key: string): StoredDocument | null => {
  try {
    const raw = localStorage.getItem(storageKeyFor(key));
    return raw ? (JSON.parse(raw) as StoredDocument) : null;
  } catch {
    return null;
  }
};

export const writeStoredDocument = (
  key: string,
  doc: StoredDocument | null
): boolean => {
  try {
    if (doc) {
      localStorage.setItem(storageKeyFor(key), JSON.stringify(doc));
    } else {
      localStorage.removeItem(storageKeyFor(key));
    }
    return true;
  } catch {
    return false;
  }
};
