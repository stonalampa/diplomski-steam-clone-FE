import './App.css';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import Router from '../routes';
import { AuthProvider } from '../components/AuthComponents/JwtContext';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { Provider as ReduxProvider } from 'react-redux';
import { createContext } from 'react';
import { store } from './store';
import { persistor } from '../store/store';
export type AppContextType = {
  isInIframe: boolean;
  iframeData?: {
    jwtToken: string;
    lastLocaleUsedAdmin: string;
    tenantId: number;
  };
  hideLayout: boolean;
};
export const AppContext = createContext<AppContextType>({
  isInIframe: false,
  hideLayout: false,
});
function App(appContext: AppContextType) {
  return (
    <AppContext.Provider value={appContext}>
      <ReduxProvider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider>
            <Helmet>
              <title>Steam clone</title>
              <meta name='description' content='Steam clone school project.' />
            </Helmet>
            <BrowserRouter>
              <Router />
            </BrowserRouter>
          </AuthProvider>
        </PersistGate>
      </ReduxProvider>
    </AppContext.Provider>
  );
}

export default App;
