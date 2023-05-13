import { Navigate, useRoutes } from 'react-router-dom';
import { Home } from '@mui/icons-material';

import { AdminUsers } from '../components/AdminComponents/AdminUsers';
import { AdminHome } from '../components/AdminComponents/AdminHome';
import { AdminGames } from '../components/AdminComponents/AdminGames';
import AdminLogin from '../components/AdminComponents/AdminLogin';
import Login from '../components/UserComponents/Login';
import Register from '../components/UserComponents/Register';
import AuthGuard from '../components/AuthComponents/AuthGuard';

export default function Router() {
  return useRoutes([
    {
      path: '/admin',
      element: (
        <AuthGuard>
          <AdminLogin></AdminLogin>
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
          <Login></Login>
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
