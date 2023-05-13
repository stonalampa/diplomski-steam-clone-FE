import { authenticationApi } from '../providers/AuthenticationProvider';

export const commonMiddlewaresApi = [authenticationApi.middleware];
