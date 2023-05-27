import { gamesApi } from '../providers/GamesProvider';
import { libraryApi } from '../providers/LibraryProvider';
import { usersApi } from '../providers/UsersProvider';

export const usersMiddlewareApi = [usersApi.middleware, gamesApi.middleware, libraryApi.middleware];
