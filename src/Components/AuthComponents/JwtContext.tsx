import { createContext, useEffect, useReducer, useCallback, useMemo } from 'react';
import { isValidToken, setSession } from './utils';
import { authenticationApi } from '../../providers/AuthenticationProvider';
import { IObject } from '../Common/CommonTypes';
import {
  ActionsType,
  AuthProviderProps,
  AuthStateType,
  JWTContextType,
  LoginParams,
  Types,
} from './AuthTypes';
import { setIsAdmin, setJwtToken } from '../../store/authentication/slices/authentication';
import { useDispatch } from 'react-redux';

const initialState: AuthStateType = {
  isInitialized: false,
  isAuthenticated: false,
  isAdmin: false,
  user: null,
};

const reducer = (state: AuthStateType, action: ActionsType) => {
  if (action.type === Types.INITIAL) {
    return {
      isInitialized: true,
      isAuthenticated: action.payload.isAuthenticated,
      isAdmin: action.payload.isAdmin,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGIN) {
    return {
      ...state,
      isAuthenticated: true,
      isAdmin: action.payload.isAdmin,
      user: action.payload.user,
    };
  }
  if (action.type === Types.LOGOUT) {
    return {
      ...state,
      isAuthenticated: false,
      isAdmin: false,
      user: null,
    };
  }
  return state;
};

export const AuthContext = createContext<JWTContextType | null>(null);

export default function localStorageAvailable() {
  try {
    // Incognito mode might reject access to the localStorage for security reasons.
    // window isn't defined on Node.js
    // https://stackoverflow.com/questions/16427636/check-if-localstorage-is-available
    const key = '__some_random_key_you_are_not_going_to_use__';
    window.localStorage.setItem(key, key);

    window.localStorage.removeItem(key);

    return true;
  } catch (err) {
    return false;
  }
}
export const { useUserLoginMutation, useAdminLoginMutation } = authenticationApi;

export function AuthProvider({ children }: AuthProviderProps) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const dispatchToStore = useDispatch();
  const storageAvailable = localStorageAvailable();
  const [loginUser] = useUserLoginMutation();
  const [loginAdmin] = useAdminLoginMutation();

  const initialize = useCallback(async () => {
    try {
      const accessToken = storageAvailable ? localStorage.getItem('accessToken') : '';
      const decodedValues = isValidToken(accessToken);

      if (accessToken && typeof decodedValues !== 'boolean') {
        setSession(accessToken);
        const user = {};
        dispatchToStore(setJwtToken(accessToken));
        dispatchToStore(setIsAdmin(decodedValues?.isAdmin));
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: true,
            isAdmin: decodedValues.isAdmin,
            user,
          },
        });
      } else {
        dispatch({
          type: Types.INITIAL,
          payload: {
            isAuthenticated: false,
            isAdmin: false,
            user: null,
          },
        });
      }
    } catch (error) {
      console.error(error);
      dispatch({
        type: Types.INITIAL,
        payload: {
          isAuthenticated: false,
          isAdmin: false,
          user: null,
        },
      });
    }
  }, [storageAvailable]);

  useEffect(() => {
    initialize();
  }, [initialize]);

  const login = useCallback(async (params: LoginParams, isAdminPath: boolean) => {
    let loginResult: IObject;
    if (isAdminPath) {
      loginResult = await loginAdmin(params);
    } else {
      loginResult = await loginUser(params);
    }

    if (loginResult?.error) {
      throw new Error(loginResult?.error?.data?.message);
    }

    setSession(loginResult.data.token);
    const decodedValues = isValidToken(loginResult.data.token);
    if (typeof decodedValues !== 'boolean') {
      dispatch({
        type: Types.LOGIN,
        payload: {
          isAuthenticated: !decodedValues.isExpired,
          isAdmin: decodedValues.isAdmin,
          user: {},
        },
      });
    }
  }, []);

  const logout = useCallback(async () => {
    setSession(null);
    dispatch({
      type: Types.LOGOUT,
    });
  }, []);

  const memoizedValue = useMemo(
    () => ({
      isInitialized: state.isInitialized,
      isAuthenticated: state.isAuthenticated,
      isAdmin: state.isAdmin,
      user: state.user,
      method: 'jwt',
      login,
      logout,
    }),
    [state.isAuthenticated, state.isInitialized, state.user, state.isAdmin, login, logout],
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
