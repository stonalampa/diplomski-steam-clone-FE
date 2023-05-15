import { useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

import { useAuthContext } from './useAuthContext';
import LoadingScreen from '../Common/LoadingScreen';
import Login from '../UserComponents/Login';
import AdminLogin from '../AdminComponents/AdminLogin';
import { AuthGuardProps } from './AuthTypes';
import Home from '../UserComponents/Home';

export default function AuthGuard({ children }: AuthGuardProps) {
  const { isAuthenticated, isInitialized, isAdmin } = useAuthContext();
  const { pathname } = useLocation();
  const [requestedLocation, setRequestedLocation] = useState<string | null>(null);

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  if (!isAuthenticated) {
    if (pathname !== requestedLocation) {
      setRequestedLocation(pathname);
    }
    if (pathname.includes('admin')) {
      return <AdminLogin />;
    }
    return <Login />;
  }

  if (isAdmin) {
    if (pathname.includes('admin')) {
      return <>{children}</>;
    }

    return <Navigate to={'/'} />;
  }

  if (!isAdmin) {
    if (!pathname.includes('admin')) {
      return <>{children}</>;
    }
    return <Navigate to={'/home'} />;
  }

  if (requestedLocation && pathname !== requestedLocation) {
    setRequestedLocation(null);
    return <Navigate to={requestedLocation} />;
  }

  return <> {children} </>;
}
