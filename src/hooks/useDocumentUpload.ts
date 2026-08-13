import { useRef, useState } from 'react';

import {
  readStoredDocument,
  writeStoredDocument,
  type StoredDocument,
} from '@/utils/documentStorage';
import { isPdfDataUrl, openPdfDataUrlInNewTab } from '@/utils/pdfFile';

export const useDocumentUpload = <K extends string>(keys: readonly K[]) => {
  const [documents, setDocuments] = useState<Record<K, StoredDocument | null>>(
    () =>
      Object.fromEntries(
        keys.map((key) => [key, readStoredDocument(key)])
      ) as Record<K, StoredDocument | null>
  );

  const [errors, setErrors] = useState<Record<K, string | null>>(
    () =>
      Object.fromEntries(keys.map((key) => [key, null])) as Record<
        K,
        string | null
      >
  );

  const inputRefs = useRef<Record<K, HTMLInputElement | null>>(
    Object.fromEntries(keys.map((key) => [key, null])) as Record<
      K,
      HTMLInputElement | null
    >
  );

  const requestVersionRef = useRef<Record<K, number>>(
    Object.fromEntries(keys.map((key) => [key, 0])) as Record<K, number>
  );

  const registerInput = (key: K) => (el: HTMLInputElement | null) => {
    inputRefs.current[key] = el;
  };

  const openFilePicker = (key: K) => {
    inputRefs.current[key]?.click();
  };

  const handleFileSelected =
    (key: K) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0] ?? null;
      event.target.value = '';
      if (!file) return;

      const requestVersion = (requestVersionRef.current[key] += 1);
      setErrors((prev) => ({ ...prev, [key]: null }));

      const reader = new FileReader();
      reader.onload = () => {
        if (requestVersionRef.current[key] !== requestVersion) return;
        if (typeof reader.result !== 'string') return;

        if (!isPdfDataUrl(reader.result)) {
          setErrors((prev) => ({
            ...prev,
            [key]: 'PDF 파일만 업로드할 수 있습니다.',
          }));
          return;
        }

        const doc: StoredDocument = { name: file.name, dataUrl: reader.result };
        if (!writeStoredDocument(key, doc)) {
          setErrors((prev) => ({
            ...prev,
            [key]: '파일 저장에 실패했습니다. 다시 시도해 주세요.',
          }));
          return;
        }
        setDocuments((prev) => ({ ...prev, [key]: doc }));
      };
      reader.onerror = () => {
        if (requestVersionRef.current[key] !== requestVersion) return;
        setErrors((prev) => ({
          ...prev,
          [key]: '파일을 읽는 중 오류가 발생했습니다. 다시 시도해 주세요.',
        }));
      };
      reader.readAsDataURL(file);
    };

  const confirmDocument = (key: K) => () => {
    const doc = documents[key];
    if (doc) openPdfDataUrlInNewTab(doc.dataUrl);
  };

  const deleteDocument = (key: K) => () => {
    requestVersionRef.current[key] += 1;

    if (!writeStoredDocument(key, null)) {
      setErrors((prev) => ({
        ...prev,
        [key]: '파일 삭제에 실패했습니다. 다시 시도해 주세요.',
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, [key]: null }));
    setDocuments((prev) => ({ ...prev, [key]: null }));
  };

  return {
    documents,
    errors,
    registerInput,
    openFilePicker,
    handleFileSelected,
    confirmDocument,
    deleteDocument,
  };
};
