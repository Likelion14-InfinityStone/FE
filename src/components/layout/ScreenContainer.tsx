import type React from 'react';

const ScreenContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative flex w-full flex-col items-start justify-start px-6.5">
      <div className="w-full flex-1">{children}</div>
    </div>
  );
};

export default ScreenContainer;
