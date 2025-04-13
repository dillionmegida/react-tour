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
      <Tour
        stepObj={{
          onboardings: [
            {
              target: '.users-stat-card',
              content: 'Hello',
            },
            {
              target: '.ant-menu-item a[href="/users"]',
              content: 'You can find all users here.',
            },
            {
              target: '.posts-stat-card',
              content: 'Hello',
            },
            {
              target: '.users-list',
              content: 'Here you can find the users.',
            },
            {
              target: '.users-list',
              content: 'Also a few extra things.',
            },
            {
              target: '.reviews-table',
              content: 'Here you can find the reviews from everyone.',
            },
          ],
        }}
      />
    </div>
  );
}

export default App;
