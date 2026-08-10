import type React from 'react';

type ScreenContainerProps = {
  children: React.ReactNode;
  withBottomNav?: boolean;
};

const ScreenContainer = ({
  children,
  withBottomNav = false,
}: ScreenContainerProps) => {
  return (
    <div
      className={`relative flex h-dvh w-full flex-col items-start justify-start overflow-y-auto px-6.5 bg-[#FAFAF6] ${
        withBottomNav ? 'pb-35' : ''
      }`}
    >
      <div className="w-full flex-1">{children}</div>
    </div>
  );
};

export default ScreenContainer;
