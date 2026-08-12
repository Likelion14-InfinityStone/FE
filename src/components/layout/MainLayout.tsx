import { Outlet, useLocation } from 'react-router-dom';
import ScreenContainer from './ScreenContainer';
import BottomNavBar from './BottomNavBar';

const MainLayout = () => {
  const { pathname } = useLocation();
  const bottomNavPaths = ['/ready', '/home', '/scan', '/account'];
  const documentPathDepth = pathname.split('/').filter(Boolean).length;
  const hasBottomNav =
    bottomNavPaths.includes(pathname) ||
    (pathname.startsWith('/documents') && documentPathDepth <= 2);

  return (
    <ScreenContainer hasBottomNav={hasBottomNav}>
      <Outlet />
      {hasBottomNav && <BottomNavBar />}
    </ScreenContainer>
  );
};

export default MainLayout;
