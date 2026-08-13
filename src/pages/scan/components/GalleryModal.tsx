import { useEffect, useRef, useState } from 'react';

import BottomButton from '@/components/button/BottomButton';

type GalleryModalProps = {
  onClose: () => void;
  onConfirm: (files: File[]) => void;
};

type SelectedImage = {
  file: File;
  previewUrl: string;
};

const GalleryModal = ({ onClose, onConfirm }: GalleryModalProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<SelectedImage[]>([]);
  const createdUrlsRef = useRef<string[]>([]);

  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps -- reads the accumulated URL list at unmount time, not a DOM node ref
      createdUrlsRef.current.forEach((url) => URL.revokeObjectURL(url));
    };
  }, []);

  const handleFilesSelected = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newImages = Array.from(files).map((file) => {
      const previewUrl = URL.createObjectURL(file);
      createdUrlsRef.current.push(previewUrl);
      return { file, previewUrl };
    });
    setImages((prev) => [...prev, ...newImages]);
    event.target.value = '';
  };

  const handleConfirm = () => {
    if (images.length === 0) return;
    onConfirm(images.map((image) => image.file));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-[#161615]/68"
      onClick={onClose}
    >
      <div
        className="flex h-[92vh] w-full max-w-[402px] flex-col rounded-t-[30px] bg-[#FCFCFC] pt-[22px]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex justify-center">
          <div className="h-[4px] w-[60px] rounded-[100px] bg-[#E2E2E2]" />
        </div>

        <h2 className="mt-[20px] text-center font-Pretendard text-[20px] font-semibold tracking-[0.024em] text-[#191919]">
          갤러리
        </h2>

        <div className="mt-[26px] flex-1 overflow-y-auto px-[26px]">
          <div className="grid grid-cols-3 gap-[8px]">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex aspect-square items-center justify-center rounded-[12px] border border-dashed border-[#848B9C] text-[28px] leading-none text-[#848B9C]"
            >
              +
            </button>
            {images.map((image, index) => (
              <img
                key={image.previewUrl}
                src={image.previewUrl}
                alt={`선택한 이미지 ${index + 1}`}
                className="aspect-square w-full rounded-[12px] object-cover"
              />
            ))}
          </div>
        </div>

        <div className="px-[26px] pt-[16px] pb-[30px]">
          <BottomButton
            text="선택 완료"
            onClick={handleConfirm}
            disabled={images.length === 0}
          />
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          multiple
          onChange={handleFilesSelected}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default GalleryModal;
