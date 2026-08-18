import { Outlet } from 'react-router-dom';
import ScreenContainer from './ScreenContainer';

const SubLayout = () => (
  <ScreenContainer hasBottomNav={false}>
    <Outlet />
  </ScreenContainer>
);

export default SubLayout;
