import { Outlet, useLocation } from 'react-router-dom';
import ScreenContainer from './ScreenContainer';
import BottomNavBar from './BottomNavBar';

const MainLayout = () => {
  const { pathname } = useLocation();
  const bottomNavPaths = ['/ready', '/documents', '/home', '/scan', '/account'];
  const hasBottomNav = bottomNavPaths.some((path) =>
    pathname.startsWith(path)
  );

  return (
    <ScreenContainer hasBottomNav={hasBottomNav}>
      <Outlet />
      {hasBottomNav && <BottomNavBar />}
    </ScreenContainer>
  );
};

export default MainLayout;
