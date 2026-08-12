import { RouterProvider } from 'react-router-dom';
import router from './routes/router';

function App() {
  return (
    <div className="mx-auto w-full max-w-100.5 bg-[#FAFAF6]">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
