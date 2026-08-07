import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import SubLayout from '@/components/layout/SubLayout';
import Splash from '@/components/splash/Splash';
import Onboard from '@/pages/onboard/Onboard';
import Terms from '@/pages/onboard/Terms';
import Login from '@/pages/login/Login';
import Home from '@/pages/home/Home';
import Ready from '@/pages/ready/Ready';
import Documents from '@/pages/documents/Documents';
import Scan from '@/pages/scan/Scan';
import Account from '@/pages/account/Account';
import Emergency from '@/pages/emergency/Emergency';
import NotFound from '@/pages/notFound/NotFound';
import Register from '@/pages/register/Register';

const router = createBrowserRouter([
  { path: '/', element: <Splash /> },

  {
    element: <SubLayout />,
    children: [
      { path: '/register', element: <Register /> },
      { path: '/login', element: <Login /> },
    ],
  },

  {
    element: <MainLayout />,
    children: [
      { path: '/onboard', element: <Onboard /> },
      { path: '/terms', element: <Terms /> },

      // { path: '/oauth/callback', element: <OAuthCallback /> },

      // 프라이빗 루트 설정
      { path: '/home', element: <Home /> },
      { path: '/ready', element: <Ready /> },
      { path: '/documents', element: <Documents /> },
      { path: '/scan', element: <Scan /> },
      { path: '/emergency', element: <Emergency /> },
      { path: '/account', element: <Account /> },

      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
