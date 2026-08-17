import type React from 'react';

interface ScreenContainerProps {
  children: React.ReactNode;
  hasBottomNav?: boolean;
}

const ScreenContainer = ({
  children,
  hasBottomNav = true,
}: ScreenContainerProps) => {
  return (
    <div
      className={`relative flex min-h-dvh w-full flex-col items-start justify-start px-6.5 bg-[#FAFAF6] ${
        hasBottomNav ? 'pb-35' : 'pb-6'
      }`}
    >
      <div className="w-full flex-1">{children}</div>
    </div>
  );
};

export default ScreenContainer;
