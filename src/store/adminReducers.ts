import { ADMIN_GAMES_API_REDUCER_KEY, adminGamesApi } from '../providers/GamesProvider';
import { ADMIN_USERS_API_REDUCER_KEY, adminUsersApi } from '../providers/UsersProvider';

const adminReducers = {
  [ADMIN_USERS_API_REDUCER_KEY]: adminUsersApi.reducer,
  [ADMIN_GAMES_API_REDUCER_KEY]: adminGamesApi.reducer,
};

export default adminReducers;
