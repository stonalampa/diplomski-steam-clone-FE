import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Router from '../routes';
import { AuthProvider } from '../components/AuthComponents/JwtContext';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider as ReduxProvider } from 'react-redux';
import { createContext } from 'react';

import { persistor, store } from '../store/store';
import { SnackbarProvider } from 'notistack';
import { ThemeProvider, createTheme } from '@mui/material';
import TopMenu from '../components/Common/TopMenu';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
    secondary: {
      main: '#f44336',
    },
  },
});

export type AppContextType = {
  hideLayout: boolean;
};

export const AppContext = createContext<AppContextType>({
  hideLayout: false,
});

export default function App(appContext: AppContextType) {
  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider value={appContext}>
        <ReduxProvider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AuthProvider>
              <Helmet>
                <title>Steam clone</title>
                <meta name='description' content='Steam clone school project.' />
              </Helmet>
              <SnackbarProvider
                maxSnack={3}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
              >
                <BrowserRouter>
                  <TopMenu />
                  <Router />
                </BrowserRouter>
              </SnackbarProvider>
            </AuthProvider>
          </PersistGate>
        </ReduxProvider>
      </AppContext.Provider>
    </ThemeProvider>
  );
}
