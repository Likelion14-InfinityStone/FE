import type React from 'react';

const ScreenContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex h-dvh w-full flex-col items-start justify-start overflow-y-auto px-6.5 pb-35 bg-[#FAFAF6]">
      <div className="w-full flex-1">{children}</div>
    </div>
  );
};

export default ScreenContainer;
