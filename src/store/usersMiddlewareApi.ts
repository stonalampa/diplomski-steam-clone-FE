import { gamesApi } from '../providers/GamesProvider';
import { usersApi } from '../providers/UsersProvider';

export const usersMiddlewareApi = [usersApi.middleware, gamesApi.middleware];
