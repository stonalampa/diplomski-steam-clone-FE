import {
  AUTHENTICATION_API_REDUCER_KEY,
  authenticationApi,
} from '../providers/AuthenticationProvider';
import authenticationReducer from './authentication/slices/authentication';

const commonReducers = {
  [AUTHENTICATION_API_REDUCER_KEY]: authenticationApi.reducer,
  authentication: authenticationReducer,
};

export default commonReducers;
