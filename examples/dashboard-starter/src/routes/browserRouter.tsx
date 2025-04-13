import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../components/errorPage';
import Layout from '../components/layout';
import NotFoundPage from '../components/notfoundPage';
import { webRoutes } from './web';
import loadable from '@loadable/component';
import ProgressBar from '../components/loader/progressBar';
import About from '../components/demo-pages/about';

const errorElement = <ErrorPage />;
const fallbackElement = <ProgressBar />;

const Dashboard = loadable(() => import('../components/dashboard'), {
  fallback: fallbackElement,
});
const Users = loadable(() => import('../components/users'), {
  fallback: fallbackElement,
});

export const browserRouter = createBrowserRouter([
  {
    element: <Layout />,
    errorElement: errorElement,
    children: [
      {
        path: webRoutes.home,
        element: <Dashboard />,
      },
      {
        path: webRoutes.users,
        element: <Users />,
      },
      {
        path: webRoutes.about,
        element: <About />,
      },
    ],
  },

  // 404
  {
    path: '*',
    element: <NotFoundPage />,
    errorElement: errorElement,
  },
]);
