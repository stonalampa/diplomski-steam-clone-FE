import {
  AUTHENTICATION_API_REDUCER_KEY,
  authenticationApi,
} from '../providers/AuthenticationProvider';
import authenticationReducer from './authentication/slices/authentication';
import userReducers from './user/slices/user';

const commonReducers = {
  [AUTHENTICATION_API_REDUCER_KEY]: authenticationApi.reducer,
  authentication: authenticationReducer,
  user: userReducers,
};

export default commonReducers;
