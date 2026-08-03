import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import Splash from '@/components/splash/Splash';
import Onboard from '@/pages/onboard/Onboard';
import Login from '@/pages/login/Login';
import Home from '@/pages/home/Home';
import Register from '@/pages/register/Register';
import Documents from '@/pages/documents/Documents';
import Scan from '@/pages/scan/Scan';
import Account from '@/pages/account/Account';
import Emergency from '@/pages/emergency/Emergency';
import NotFound from '@/pages/notFound/NotFound';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Splash /> },
      { path: '/onboard', element: <Onboard /> },
      { path: '/login', element: <Login /> },
      // { path: '/oauth/callback', element: <OAuthCallback /> },

      // 프라이빗 루트 설정
      { path: '/home', element: <Home /> },
      { path: '/register', element: <Register /> },
      { path: '/documents', element: <Documents /> },
      { path: '/scan', element: <Scan /> },
      { path: '/emergency', element: <Emergency /> },
      { path: '/account', element: <Account /> },

      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
