import { adminGamesApi, gamesApi } from '../providers/GamesProvider';
import { adminUsersApi } from '../providers/UsersProvider';

export const adminMiddlewareApi = [adminUsersApi.middleware, adminGamesApi.middleware];
