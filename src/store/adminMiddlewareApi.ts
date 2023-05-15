import { gamesApi } from '../providers/GamesProvider';
import { usersApi } from '../providers/UsersProvider';

export const adminMiddlewareApi = [usersApi.middleware, gamesApi.middleware];
