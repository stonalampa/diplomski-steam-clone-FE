import { GAMES_API_REDUCER_KEY, gamesApi } from '../providers/GamesProvider';
import { LIBRARY_API_REDUCER_KEY, libraryApi } from '../providers/LibraryProvider';
import { USERS_API_REDUCER_KEY, usersApi } from '../providers/UsersProvider';

const userReducers = {
  [USERS_API_REDUCER_KEY]: usersApi.reducer,
  [GAMES_API_REDUCER_KEY]: gamesApi.reducer,
  [LIBRARY_API_REDUCER_KEY]: libraryApi.reducer,
};

export default userReducers;
