import { Outlet } from 'react-router-dom';
import ScreenContainer from './ScreenContainer';

const MainLayout = () => {
  return (
    <ScreenContainer>
      <Outlet />
    </ScreenContainer>
  );
};

export default MainLayout;
