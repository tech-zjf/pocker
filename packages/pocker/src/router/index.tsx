import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Home = lazy(() => import('@/pages/home'));
const Room = lazy(() => import('@/pages/room'));
const App = lazy(() => import('@/App'));
const Login = lazy(() => import('@/pages/login'));

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            }
        ]
    },
    {
        path: '/room',
        element: <Room />
    },
    {
        path: '/login',
        element: <Login />
    }
]);

export default router;
