import { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
// components

//
import { useAuthContext } from './useAuthContext';
import LoadingScreen from '../Common/LoadingScreen';

// ----------------------------------------------------------------------

type GuestGuardProps = {
  children: ReactNode;
};

export default function GuestGuard({ children }: GuestGuardProps) {
  const path = window.location.pathname;
  if (path && path.includes('admin')) {
    return <> {children} </>;
  }
  const { isAuthenticated, isInitialized } = useAuthContext();

  if (isAuthenticated) {
    return <Navigate to='/admin' />;
  }

  if (!isInitialized) {
    return <LoadingScreen />;
  }

  return <> {children} </>;
}
