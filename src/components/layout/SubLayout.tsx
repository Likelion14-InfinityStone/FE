import { Outlet } from 'react-router-dom';
import ScreenContainer from './ScreenContainer';

const SubLayout = () => (
  <ScreenContainer>
    <Outlet />
  </ScreenContainer>
);

export default SubLayout;
