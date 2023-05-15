import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  TypedUseSelectorHook,
  useDispatch as useAppDispatch,
  useSelector as useAppSelector,
} from 'react-redux';
import commonReducers from './commonReducers';
import { commonMiddlewareApi } from './commonMiddlewareApi';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { adminMiddlewareApi } from './adminMiddlewareApi';
import adminReducers from './adminReducers';
import { usersApi } from '../providers/UsersProvider'; // Import usersApi
import { gamesApi } from '../providers/GamesProvider';

// ----------------------------------------------------------------------

export type AppDispatch = typeof store.dispatch;

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: [],
};

const rootReducer = combineReducers({
  ...commonReducers,
  ...adminReducers,
});
export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: persistReducer(rootPersistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }).concat([...commonMiddlewareApi, ...adminMiddlewareApi]),
});

const persistor = persistStore(store);

const { dispatch } = store;

const useSelector: TypedUseSelectorHook<RootState> = useAppSelector;

const useDispatch = () => useAppDispatch<AppDispatch>();

export { store, persistor, dispatch, useSelector, useDispatch };
