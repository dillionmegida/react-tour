import { Toaster } from 'sonner';
import { RouterProvider } from 'react-router-dom';
import { browserRouter } from './routes/browserRouter';
import '@dillionmegida/react-tour/dist/style.css';

function App() {
  return (
    <div className="fade-in">
      <RouterProvider router={browserRouter} />
      <Toaster />
    </div>
  );
}

export default App;
