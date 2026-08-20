import { useEffect, type ReactNode } from 'react';
import { useLocation } from 'react-router-dom';

interface ScreenContainerProps {
  children: ReactNode;
  hasBottomNav?: boolean;
}

const ScreenContainer = ({
  children,
  hasBottomNav = true,
}: ScreenContainerProps) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <div
      className={`relative flex min-h-dvh w-full flex-col items-start justify-start bg-[#FAFAF6] px-6.5 ${
        hasBottomNav
          ? 'pb-[calc(8.75rem+env(safe-area-inset-bottom))]'
          : 'pb-[max(1.5rem,env(safe-area-inset-bottom))]'
      }`}
    >
      <div className="flex w-full flex-1 flex-col">{children}</div>
    </div>
  );
};

export default ScreenContainer;
