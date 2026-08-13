import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '@/components/layout/MainLayout';
import SubLayout from '@/components/layout/SubLayout';
import Splash from '@/components/splash/Splash';
import Onboard from '@/pages/onboard/Onboard';
import Terms from '@/pages/onboard/Terms';
import Login from '@/pages/login/Login';
import Home from '@/pages/home/Home';
import Documents from '@/pages/documents/Documents';
import MedicineDocuments from '@/pages/documents/MedicineDocuments';
import DocumentDetail from '@/pages/documents/DocumentDetail';
import Scan from '@/pages/scan/Scan';
import DirectInputPage from '@/pages/scan/DirectInputPage';
import ShootPage from '@/pages/scan/ShootPage';
import ScanResultPage from '@/pages/scan/ScanResultPage';
import Account from '@/pages/account/Account';
import Emergency from '@/pages/emergency/Emergency';
import NotFound from '@/pages/notFound/NotFound';
import Register from '@/pages/register/Register';
import MedicineDetailPage from '@/pages/register/components/medicineDetailPage/MedicineDetailPage';
import Medicine from '@/pages/register/components/tripRegistPage/Medicine';
import SelectMedicinePage from '@/pages/register/components/selectMedicinePage/SelectMedicinePage';
import ChoiceMedicinePage from '@/pages/register/components/selectMedicinePage/ChoiceMedicinePage';
import AirportSearchPage from '@/pages/register/components/selectMedicinePage/AirportSearchPage';
import LodingPage from '@/pages/register/components/lodingPage/LodingPage';
import MedicineResultPage from '@/pages/register/components/medicineResultPage/MedicineResultPage';
import SaveMedicinePage from '@/pages/register/components/saveMedicinePage/SaveMedicinePage';
import TermsPage from '@/pages/account/TermsPage';
import PrivacyPolicyPage from '@/pages/account/PrivacyPolicyPage';
import OpenSourceLicensePage from '@/pages/account/OpenSourceLicensePage';
import FaqPage from '@/pages/account/FaqPage';

const router = createBrowserRouter([
  { path: '/', element: <Splash /> },
  { path: '/scanCapture', element: <ShootPage /> },
  { path: '/manualInput', element: <DirectInputPage /> },
  { path: '/scanResult', element: <ScanResultPage /> },

  {
    element: <SubLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/onboard', element: <Onboard /> },
      { path: '/terms', element: <Terms /> },
      { path: '/medicineDetail', element: <MedicineDetailPage /> },
      { path: '/selectMedicine', element: <SelectMedicinePage /> },
      { path: '/choiceMedicine', element: <ChoiceMedicinePage /> },
      { path: '/loding', element: <LodingPage /> },
      { path: '/registerResult', element: <MedicineResultPage /> },
      { path: '/saveMedicine', element: <SaveMedicinePage /> },
      { path: '/airportSearch', element: <AirportSearchPage /> },
      { path: '/account/terms', element: <TermsPage /> },
      { path: '/account/privacy', element: <PrivacyPolicyPage /> },
      { path: '/account/license', element: <OpenSourceLicensePage /> },
      { path: '/account/faq', element: <FaqPage /> },
    ],
  },

  {
    element: <MainLayout />,
    children: [
      // { path: '/oauth/callback', element: <OAuthCallback /> },

      // 프라이빗 루트 설정
      { path: '/home', element: <Home /> },
      { path: '/register', element: <Register /> },
      { path: '/medicine', element: <Medicine /> },
      { path: '/documents', element: <Documents /> },
      {
        path: '/documents/:medicineName',
        element: <MedicineDocuments />,
      },
      {
        path: '/documents/:medicineName/:documentIndex',
        element: <DocumentDetail />,
      },
      { path: '/scan', element: <Scan /> },
      { path: '/emergency', element: <Emergency /> },
      { path: '/account', element: <Account /> },

      { path: '*', element: <NotFound /> },
    ],
  },
]);

export default router;
