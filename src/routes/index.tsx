import { Navigate, useRoutes } from 'react-router-dom';
import { Home } from '@mui/icons-material';

import { AdminUsers } from '../components/AdminComponents/AdminUsers';
import { AdminHome } from '../components/AdminComponents/AdminHome';
import { AdminGames } from '../components/AdminComponents/AdminGames';
import AdminLogin from '../components/AdminComponents/AdminLogin';
import Login from '../components/UserComponents/Login';

import AuthGuard from '../components/AuthComponents/AuthGuard';
import { Register } from '../components/UserComponents/Register';

export default function Router() {
  return useRoutes([
    {
      path: '/admin',
      element: (
        <AuthGuard>
          <AdminHome />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={'home'} replace />, index: true },
        { path: 'home', element: <AdminHome /> },
        { path: 'users', element: <AdminUsers /> },
        { path: 'games', element: <AdminGames /> },
        { path: 'login', element: <AdminLogin /> },
      ],
    },
    {
      path: '/',
      element: (
        <AuthGuard>
          <Home />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={''} replace />, index: true },
        { path: '/', element: <Home /> },
        { path: 'login', element: <Login /> },
        { path: 'register', element: <Register /> },
      ],
    },
  ]);
}
