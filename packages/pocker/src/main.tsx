import ReactDOM from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import 'antd/dist/reset.css';
import './index.less';
import router from './router';
import { Suspense } from 'react';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <Suspense fallback={<div>Loading...</div>}>
        <RouterProvider router={router}></RouterProvider>
    </Suspense>
);
