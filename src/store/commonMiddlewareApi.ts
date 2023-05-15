import { authenticationApi } from '../providers/AuthenticationProvider';

export const commonMiddlewareApi = [authenticationApi.middleware];
