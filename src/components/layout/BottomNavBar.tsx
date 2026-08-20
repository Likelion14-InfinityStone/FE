import { useNavigate, useLocation } from 'react-router-dom';

import ActiveReadyIcon from '@/assets/images/layout/activeReadyIcon.svg';
import InactiveReadyIcon from '@/assets/images/layout/inactiveReadyIcon.svg';
import ActiveDocumentsIcon from '@/assets/images/layout/activeDocumentsIcon.svg';
import InactiveDocumentsIcon from '@/assets/images/layout/inactiveDocumentsIcon.svg';
import ActiveHomeIcon from '@/assets/images/layout/activeHomeIcon.svg';
import InactiveHomeIcon from '@/assets/images/layout/inactiveHomeIcon.svg';
import ActiveScanIcon from '@/assets/images/layout/activeScanIcon.svg';
import InactiveScanIcon from '@/assets/images/layout/inactiveScanIcon.svg';
import ActiveAccountIcon from '@/assets/images/layout/activeAccountIcon.svg';
import InactiveAccountIcon from '@/assets/images/layout/inactiveAccountIcon.svg';

const tabs = [
  {
    path: '/register',
    label: '여행 준비',
    defaultIcon: InactiveReadyIcon,
    activeIcon: ActiveReadyIcon,
  },
  {
    path: '/documents',
    label: '서류함',
    defaultIcon: InactiveDocumentsIcon,
    activeIcon: ActiveDocumentsIcon,
  },
  {
    path: '/home',
    label: '홈',
    defaultIcon: InactiveHomeIcon,
    activeIcon: ActiveHomeIcon,
  },
  {
    path: '/scan',
    label: '약 스캔',
    defaultIcon: InactiveScanIcon,
    activeIcon: ActiveScanIcon,
  },
  {
    path: '/account',
    label: '더보기',
    defaultIcon: InactiveAccountIcon,
    activeIcon: ActiveAccountIcon,
  },
];

const BottomNavBar = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleTabClick = (path: string) => {
    navigate(path);
  };

  // 비로그인 시 및 홈만 접근 가능

  const getActiveTab = (pathname: string) => {
    if (pathname.startsWith('/register') || pathname.startsWith('/medicine'))
      return '/register';
    if (pathname.startsWith('/documents')) return '/documents';
    if (pathname.startsWith('/home')) return '/home';
    if (pathname.startsWith('/scan')) return '/scan';
    if (pathname.startsWith('/account')) return '/account';

    return null;
  };

  const activeTab = getActiveTab(pathname);

  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 mx-auto flex w-full max-w-100.5 items-end gap-[12.5px] overflow-visible rounded-t-[20px] bg-[#FCFCFC] px-10.5 pt-4.5 pb-[max(1rem,env(safe-area-inset-bottom))] shadow-[0_-4px_4px_0_rgba(0,0,0,0.04)]">
      {tabs.map(({ path, label, defaultIcon, activeIcon }) => {
        const isActive = activeTab === path;

        return (
          <button
            key={path}
            onClick={() => handleTabClick(path)}
            className="relative flex min-w-0 flex-1 flex-col items-center gap-4.5 text-xs"
          >
            <div className="relative flex w-7.25 h-7.25 justify-center items-center">
              {isActive ? (
                <div className="absolute -top-12 flex justify-center items-center w-18 h-18 rounded-full bg-[#FCFCFC] shadow-[0_-4px_4px_0_rgba(0,0,0,0.04)]">
                  <div className="flex justify-center items-center w-12 h-12 rounded-full bg-[#23408F]">
                    <img src={activeIcon} alt={label} />
                  </div>
                </div>
              ) : (
                <img src={defaultIcon} alt={label} />
              )}
            </div>
            <p className="font-normal font-Pretendard leading-4 text-[#191919]">
              {label}
            </p>
          </button>
        );
      })}
    </nav>
  );
};

export default BottomNavBar;
