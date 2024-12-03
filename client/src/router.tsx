/* eslint-disable react-refresh/only-export-components */
// src/router.tsx
import  { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import Loader from './components/common/Loader';
import Layout from './layout/layout';

const LandingPage = lazy(() => import('./pages/LandingPage'));
const AppEshop = lazy(() => import('./pages/AppEshop'));
const AppTrains = lazy(() => import('./pages/AppTrains'));

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loader fadeout />}>
        <LandingPage />
      </Suspense>
    ),
  },
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: 'eshop',
        element: (
            <Suspense fallback={<Loader fadeout/>}>
              <AppEshop />
            </Suspense>
        ),
      },
      {
        path: 'trains',
        element: (
            <Suspense fallback={<Loader fadeout/>}>
              <AppTrains />
            </Suspense>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    ],
  },
]);

export default router;
