import { lazy, Suspense } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import AuthGuard from '../components/AuthComponents/AuthGuard';

const LazyAdminHome = lazy(() => import('../components/AdminComponents/AdminHome'));
const LazyAdminUsers = lazy(() => import('../components/AdminComponents/AdminUsers'));
const LazyAdminGames = lazy(() => import('../components/AdminComponents/AdminGames'));
const LazyAdminLogin = lazy(() => import('../components/AdminComponents/AdminLogin'));
const LazyHome = lazy(() => import('../components/UserComponents/Home'));
const LazyLogin = lazy(() => import('../components/UserComponents/Login'));
const LazyRegister = lazy(() => import('../components/UserComponents/Register'));
const LazyResetPassword = lazy(() => import('../components/UserComponents/ResetPassword'));

export default function Router() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path='/admin/*'
          element={
            <AuthGuard>
              <Routes>
                <Route path='/' element={<LazyAdminHome />} />
                <Route path='/users' element={<LazyAdminUsers />} />
                <Route path='/games' element={<LazyAdminGames />} />
                <Route path='/login' element={<LazyAdminLogin />} />
              </Routes>
            </AuthGuard>
          }
        />
        <Route
          path='/*'
          element={
            <AuthGuard>
              <Routes>
                <Route path='/' element={<Navigate to='/home' replace />} />
                <Route path='/home' element={<LazyHome />} />
                <Route path='/login' element={<LazyLogin />} />
                <Route path='/register' element={<LazyRegister />} />
                <Route path='/resetPassword' element={<LazyResetPassword />} />
              </Routes>
            </AuthGuard>
          }
        />
      </Routes>
    </Suspense>
  );
}
