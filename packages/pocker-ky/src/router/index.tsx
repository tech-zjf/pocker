import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';

const Home = lazy(() => import('@/pages/home'));
const Room = lazy(() => import('@/pages/room'));
const App = lazy(() => import('@/App'));
const Login = lazy(() => import('@/pages/login'));
const ConnectTest = lazy(() => import('@/pages/connect-test'));
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: '/connect-test',
                element: <ConnectTest />
            }
        ]
    },
    {
        path: '/room/:roomNo',
        element: <Room />
    },
    {
        path: '/login',
        element: <Login />
    }
]);

export default router;
