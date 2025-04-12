import { Toaster } from 'sonner';
import { RouterProvider } from 'react-router-dom';
import { browserRouter } from './routes/browserRouter';
import '@dillionmegida/react-tour/dist/style.css';
import { Tour } from '@dillionmegida/react-tour';

function App() {
  return (
    <div className="fade-in">
      <RouterProvider router={browserRouter} />
      <Toaster />
    </div>
  );
}

export default App;
